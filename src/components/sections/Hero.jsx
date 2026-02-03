import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import { Camera, X, AlertCircle, Loader2 } from 'lucide-react';
import emotionGif from '../../assets/emotion recognition.webp';

// Emotion labels in correct order matching trained model output
const EMOTIONS = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise'];

// Processing constants
const DISPLAY_WIDTH = 1280;
const DISPLAY_HEIGHT = 720;
const PROCESS_WIDTH = 320;
const PROCESS_HEIGHT = 240;
// Adaptive frame skip: higher on mobile to reduce load
const IS_MOBILE = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const FRAME_SKIP = IS_MOBILE ? 6 : 3; // Process every Nth frame for performance

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [error, setError] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('prompt');

  const videoRef = useRef(null);
  const processingCanvasRef = useRef(null); // Hidden 320x240 canvas for ML processing
  const overlayCanvasRef = useRef(null); // Visible canvas for face box overlay
  const streamRef = useRef(null);
  const modelRef = useRef(null);
  const faceDetectorRef = useRef(null); // BlazeFace model
  const animationRef = useRef(null);
  const modalRef = useRef(null);
  const modelsLoadedRef = useRef(false); // Ref to avoid stale closure issues

  // Helper to yield to main thread (prevents UI freeze)
  const yieldToMain = () => new Promise(resolve => setTimeout(resolve, 0));

  // Load BlazeFace and emotion models
  const loadModels = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Give UI time to render loading state before heavy TF.js operations
      await new Promise(resolve => setTimeout(resolve, 100));

      // Initialize TensorFlow.js backend
      // Force CPU on mobile to avoid WebGL context limits (especially Safari)
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const shouldUseCPU = IS_MOBILE || isSafari;

      try {
        if (shouldUseCPU) {
          console.log('Using CPU backend for mobile/Safari compatibility');
          await tf.setBackend('cpu');
        } else {
          await tf.setBackend('webgl');
        }
        await tf.ready();
      } catch (backendErr) {
        console.warn('Backend initialization failed, trying CPU:', backendErr);
        await tf.setBackend('cpu');
        await tf.ready();
      }

      await yieldToMain(); // Let UI update

      // Load BlazeFace for face detection (~200KB, fast)
      faceDetectorRef.current = await blazeface.load();

      await yieldToMain(); // Let UI update

      // Load emotion model
      try {
        const modelPath = `${import.meta.env.BASE_URL}models/emotion_model/model.json`;
        modelRef.current = await tf.loadGraphModel(modelPath);

        await yieldToMain(); // Let UI update before warm-up

        // Warm up emotion model to prevent first-frame lag
        // Skip intensive warm-up on mobile to prevent freeze
        if (!IS_MOBILE) {
          const dummyInput = tf.zeros([1, 224, 224, 3]);
          const dummyOutput = modelRef.current.predict(dummyInput);
          // Use async data() instead of blocking dataSync()
          if (Array.isArray(dummyOutput)) {
            await Promise.all(dummyOutput.map(t => t.data()));
            dummyOutput.forEach(t => t.dispose());
          } else {
            await dummyOutput.data();
            dummyOutput.dispose();
          }
          dummyInput.dispose();
        }
      } catch (modelError) {
        console.warn('Custom emotion model not found, using demo mode:', modelError);
        modelRef.current = null;
      }

      await yieldToMain(); // Let UI update

      // Warm up BlazeFace
      const warmupCanvas = document.createElement('canvas');
      warmupCanvas.width = PROCESS_WIDTH;
      warmupCanvas.height = PROCESS_HEIGHT;
      await faceDetectorRef.current.estimateFaces(warmupCanvas, false);

      modelsLoadedRef.current = true;
      setModelsLoaded(true);
    } catch (err) {
      console.error('Error loading models:', err);
      setError('Failed to load AI models. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start webcam at high resolution for display
  const startCamera = useCallback(async () => {
    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: DISPLAY_WIDTH },
          height: { ideal: DISPLAY_HEIGHT },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;
      setCameraPermission('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      return true;
    } catch (err) {
      console.error('Camera error:', err);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraPermission('denied');
        setError('Camera access was denied. Please enable camera permissions in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else if (err.name === 'NotReadableError') {
        setError('Camera is in use by another application. Please close other apps using the camera.');
      } else {
        setError('Unable to access camera. Please check your permissions and try again.');
      }

      return false;
    }
  }, []);

  // Stop webcam
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Frame counter for frame skipping
  const frameCountRef = useRef(0);
  const videoReadyRef = useRef(false);
  const predictionHistoryRef = useRef([]); // For temporal smoothing
  const lastFaceRef = useRef(null); // Store last face position
  const lastBarsRef = useRef(null); // Store last emotion bars (persists independently)
  const noFaceCountRef = useRef(0); // Count frames without face before clearing bars
  const isProcessingRef = useRef(false); // Prevent concurrent async processing

  // Process video frame with dual resolution and frame skipping
  const processFrame = useCallback(async () => {
    if (!videoRef.current || !overlayCanvasRef.current || !processingCanvasRef.current || !modelsLoadedRef.current) {
      animationRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const video = videoRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    const processingCanvas = processingCanvasRef.current;
    const overlayCtx = overlayCanvas.getContext('2d');
    const processingCtx = processingCanvas.getContext('2d');

    // Wait for video to be ready with valid dimensions
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      animationRef.current = requestAnimationFrame(processFrame);
      return;
    }

    // Mark video as ready once it's fully loaded
    if (!videoReadyRef.current) {
      videoReadyRef.current = true;
      setIsVideoReady(true);
    }

    // Set overlay canvas size to match video for proper face box display
    if (overlayCanvas.width !== video.videoWidth || overlayCanvas.height !== video.videoHeight) {
      overlayCanvas.width = video.videoWidth;
      overlayCanvas.height = video.videoHeight;
    }

    // Ensure processing canvas is set to low resolution
    if (processingCanvas.width !== PROCESS_WIDTH || processingCanvas.height !== PROCESS_HEIGHT) {
      processingCanvas.width = PROCESS_WIDTH;
      processingCanvas.height = PROCESS_HEIGHT;
    }

    frameCountRef.current++;

    // Always request next frame to keep video smooth
    animationRef.current = requestAnimationFrame(processFrame);

    // Clear overlay canvas every frame
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Helper function to draw emotion bars (independent of face box)
    const drawEmotionBars = () => {
      const bars = lastBarsRef.current;
      if (!bars) return;

      const { barBoxX, barBoxY, smoothed } = bars;
      const barBoxWidth = 350;
      const rowHeight = 38;
      const barBoxHeight = EMOTIONS.length * rowHeight + 24;
      const barMaxWidth = 300;

      // Draw background box with rounded corners
      overlayCtx.fillStyle = 'rgba(55, 65, 81, 0.92)';
      overlayCtx.beginPath();
      overlayCtx.roundRect(barBoxX, barBoxY, barBoxWidth, barBoxHeight, 12);
      overlayCtx.fill();

      // Find max prediction index
      const maxIdx = smoothed.indexOf(Math.max(...smoothed));

      // Draw each emotion bar
      EMOTIONS.forEach((label, i) => {
        const prob = smoothed[i];
        const rowY = barBoxY + 28 + i * rowHeight;

        // Emotion label - larger font
        overlayCtx.fillStyle = '#FFFFFF';
        overlayCtx.font = 'bold 16px system-ui, -apple-system, sans-serif';
        overlayCtx.fillText(label, barBoxX + 16, rowY + 5);

        // Probability bar (no background bar, just the filled portion)
        const barX = barBoxX + 110;
        const barWidth = Math.max(2, barMaxWidth * prob);
        const barHeight = 12;

        // Green color, brighter for max
        overlayCtx.fillStyle = i === maxIdx ? '#4ADE80' : '#22C55E';

        // Draw rounded bar
        overlayCtx.beginPath();
        overlayCtx.roundRect(barX, rowY - 4, barWidth, barHeight, 6);
        overlayCtx.fill();
      });
    };

    // Helper function to draw face box
    const drawFaceBox = (face) => {
      if (!face) return;

      const { mirroredX, displayY, displayWidth, displayHeight } = face;

      // Draw face box with prominent styling
      overlayCtx.strokeStyle = '#D6C9A1';
      overlayCtx.lineWidth = 4;
      overlayCtx.strokeRect(mirroredX, displayY, displayWidth, displayHeight);

      // Add corner accents
      const cornerSize = 15;
      overlayCtx.strokeStyle = '#F59E0B';
      overlayCtx.lineWidth = 4;

      // Top-left corner
      overlayCtx.beginPath();
      overlayCtx.moveTo(mirroredX, displayY + cornerSize);
      overlayCtx.lineTo(mirroredX, displayY);
      overlayCtx.lineTo(mirroredX + cornerSize, displayY);
      overlayCtx.stroke();

      // Top-right corner
      overlayCtx.beginPath();
      overlayCtx.moveTo(mirroredX + displayWidth - cornerSize, displayY);
      overlayCtx.lineTo(mirroredX + displayWidth, displayY);
      overlayCtx.lineTo(mirroredX + displayWidth, displayY + cornerSize);
      overlayCtx.stroke();

      // Bottom-left corner
      overlayCtx.beginPath();
      overlayCtx.moveTo(mirroredX, displayY + displayHeight - cornerSize);
      overlayCtx.lineTo(mirroredX, displayY + displayHeight);
      overlayCtx.lineTo(mirroredX + cornerSize, displayY + displayHeight);
      overlayCtx.stroke();

      // Bottom-right corner
      overlayCtx.beginPath();
      overlayCtx.moveTo(mirroredX + displayWidth - cornerSize, displayY + displayHeight);
      overlayCtx.lineTo(mirroredX + displayWidth, displayY + displayHeight);
      overlayCtx.lineTo(mirroredX + displayWidth, displayY + displayHeight - cornerSize);
      overlayCtx.stroke();
    };

    // Always draw cached overlays first (prevents flashing)
    drawFaceBox(lastFaceRef.current);
    drawEmotionBars();

    // Only run ML processing on every Nth frame for performance
    // Also skip if already processing (prevents async overlap)
    if (frameCountRef.current % FRAME_SKIP !== 0 || isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    try {
      // Draw video to low-resolution processing canvas
      processingCtx.drawImage(video, 0, 0, PROCESS_WIDTH, PROCESS_HEIGHT);

      // Run BlazeFace on the small processing canvas
      const predictions = await faceDetectorRef.current.estimateFaces(processingCanvas, false);

      if (predictions.length > 0) {
        const prediction = predictions[0];

        // Get face box in processing canvas coordinates
        const procX = prediction.topLeft[0];
        const procY = prediction.topLeft[1];
        const procWidth = prediction.bottomRight[0] - prediction.topLeft[0];
        const procHeight = prediction.bottomRight[1] - prediction.topLeft[1];

        // Scale coordinates from processing canvas to display canvas
        const scaleX = video.videoWidth / PROCESS_WIDTH;
        const scaleY = video.videoHeight / PROCESS_HEIGHT;

        const displayX = procX * scaleX;
        const displayY = procY * scaleY;
        const displayWidth = procWidth * scaleX;
        const displayHeight = procHeight * scaleY;

        // Mirror the x coordinate since the video display is mirrored
        const mirroredX = overlayCanvas.width - displayX - displayWidth;

        // Run emotion prediction if model is loaded
        if (modelRef.current) {
          // BlazeFace gives tight face crops, added padding to simulate train/test data
          const paddingX = -0.06;
          const paddingY = 0.47;
          const padX = procWidth * paddingX;
          const padY = procHeight * paddingY;

          const cropX = Math.max(0, procX - padX);
          const cropY = Math.max(0, procY - padY);
          const cropWidth = Math.min(PROCESS_WIDTH - cropX, procWidth + padX * 2);
          const cropHeight = Math.min(PROCESS_HEIGHT - cropY, procHeight + padY * 2);

          // Step 1: Resize face to 48x48 (matching FER2013/Python preprocessing)
          const face48Canvas = document.createElement('canvas');
          face48Canvas.width = 48;
          face48Canvas.height = 48;
          const face48Ctx = face48Canvas.getContext('2d');
          face48Ctx.imageSmoothingEnabled = true;
          face48Ctx.drawImage(
            processingCanvas,
            cropX, cropY, cropWidth, cropHeight,
            0, 0, 48, 48
          );

          // Step 2: Upscale to 224x224 (MobileNet input size)
          const face224Canvas = document.createElement('canvas');
          face224Canvas.width = 224;
          face224Canvas.height = 224;
          const face224Ctx = face224Canvas.getContext('2d');
          face224Ctx.imageSmoothingEnabled = true;
          face224Ctx.drawImage(face48Canvas, 0, 0, 224, 224);

          // Step 3: Convert to tensor and normalize (RGB, /255, matching Python)
          const tensor = tf.browser.fromPixels(face224Canvas)
            .toFloat()
            .div(255.0)
            .expandDims(0);

          // Run prediction
          const emotionPrediction = modelRef.current.predict(tensor);
          const probabilities = await emotionPrediction.data();

          // Clean up tensors
          tensor.dispose();
          emotionPrediction.dispose();

          // Temporal smoothing: average over last N frames
          const currentProbs = Array.from(probabilities);
          predictionHistoryRef.current.push(currentProbs);
          if (predictionHistoryRef.current.length > 5) {
            predictionHistoryRef.current.shift();
          }

          // Calculate smoothed average
          const smoothed = currentProbs.map((_, i) => {
            const sum = predictionHistoryRef.current.reduce((acc, probs) => acc + probs[i], 0);
            return sum / predictionHistoryRef.current.length;
          });

          // Store face position and bar data separately
          lastFaceRef.current = { mirroredX, displayY, displayWidth, displayHeight };
          noFaceCountRef.current = 0;

          // Calculate bar position and store (using larger dimensions)
          const barBoxWidth = 220;
          const rowHeight = 38;
          const barBoxHeight = EMOTIONS.length * rowHeight + 24;
          let barBoxX = mirroredX + displayWidth + 16;
          if (barBoxX + barBoxWidth > overlayCanvas.width) {
            barBoxX = mirroredX - barBoxWidth - 16;
          }
          // Clamp to canvas bounds
          barBoxX = Math.max(8, Math.min(barBoxX, overlayCanvas.width - barBoxWidth - 8));
          const barBoxY = Math.max(8, Math.min(displayY, overlayCanvas.height - barBoxHeight - 8));
          lastBarsRef.current = { barBoxX, barBoxY, smoothed };
          setPredictions(smoothed);
        } else {
          // Demo mode - just update face position
          lastFaceRef.current = { mirroredX, displayY, displayWidth, displayHeight };
          noFaceCountRef.current = 0;
        }
      } else {
        // No face detected - clear face box but keep bars for many frames
        lastFaceRef.current = null;
        noFaceCountRef.current++;
        // Only clear bars after 30 frames (about 1 second) without a face
        if (noFaceCountRef.current > 30) {
          lastBarsRef.current = null;
          setPredictions(null);
        }
      }
    } catch (err) {
      console.error('Frame processing error:', err);
    } finally {
      isProcessingRef.current = false;
    }
  }, []); // Using refs instead of state to avoid stale closures

  // Handle modal open
  const openModal = () => {
    setIsModalOpen(true);
    setError(null);
    setPredictions(null);
    setIsVideoReady(false);
    videoReadyRef.current = false;
  };

  // Load models and start camera after modal is visible
  useEffect(() => {
    if (!isModalOpen) return;

    let cancelled = false;

    const initDemo = async () => {
      // Wait for modal to render before starting heavy operations
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      if (cancelled) return;

      if (!modelsLoaded) {
        await loadModels();
      }

      if (cancelled) return;

      const cameraStarted = await startCamera();
      if (cameraStarted && !cancelled) {
        animationRef.current = requestAnimationFrame(processFrame);
      }
    };

    initDemo();

    return () => {
      cancelled = true;
    };
  }, [isModalOpen, modelsLoaded, loadModels, startCamera, processFrame]);

  // Handle modal close
  const closeModal = useCallback(() => {
    stopCamera();
    setIsModalOpen(false);
    setPredictions(null);
    setError(null);
    setIsVideoReady(false);
    videoReadyRef.current = false;
    lastFaceRef.current = null;
    lastBarsRef.current = null;
    noFaceCountRef.current = 0;
    predictionHistoryRef.current = [];
  }, [stopCamera]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape, true);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, true);
    };
  }, [isModalOpen, closeModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FAF5F0' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-16">
          {/* GIF on the left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 max-w-xs lg:max-w-md"
          >
            <div
              style={{
                border: '2px solid #D6C9A1',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.1)'
              }}
            >
              <img
                src={emotionGif}
                alt="Emotion Recognition Video of my face"
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
            {/* Try it yourself button - Desktop only */}
            <motion.button
              onClick={openModal}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:flex"
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0.75rem',
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: '1.25rem',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px rgba(214, 201, 161, 0.5)',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Camera size={20} />
              Try it yourself!
            </motion.button>
          </motion.div>

          {/* Mobile arrow - left-aligned, between image and text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:hidden w-full flex justify-start pl-4"
            style={{ marginLeft: '-70px' , marginBottom:'-23px' , marginTop:'-50px' }}
          >
            <svg
              viewBox="90 135 85 215"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '50px', height: '110px' }}
            >
              {/* Curved arrow pointing upward to image */}
              <motion.path
                d="M 131.41 344.017 C 113.5 340.435 102.414 315.417 96.154 300.214 C 77.956 256.018 98.308 208.316 130.342 176.282 C 141.994 164.63 157.482 156.62 168.803 145.299"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                style={{
                  filter: 'url(#roughen-mobile)',
                }}
              />
              {/* Arrow head pointing upward */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2.3 }}
              >
                <path
                  d="M 134.615 139.957 C 140.67 139.957 146.724 139.957 152.778 139.957 C 177.4 139.957 177.02 136.676 168.803 161.325 C 166.675 167.709 165.598 172.823 165.598 179.487"
                  stroke="#0F172A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
              <defs>
                <filter id="roughen-mobile">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Desktop curved arrow - hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block relative self-start"
            style={{ width: '220px', height: '220px', marginRight: '-130px' , marginTop:'-30px'}}
          >
            <svg
              viewBox="40 60 380 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Curved handdrawn arrow pointing right */}
              <motion.path
                d="M 365.365 304.287 C 365.365 272.304 371.207 234.119 359.37 203.869 C 340.598 155.896 268.733 126.485 222.981 115.441 C 190.762 107.664 159.659 109.57 128.558 119.937 C 123.649 121.574 98.583 136.424 98.583 136.424 C 97.064 138.702 77.6 149.913 77.6 149.913"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                style={{
                  filter: 'url(#roughen-desktop)',
                }}
              />
              {/* Arrow head pointing right */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2 }}
              >
                <path
                  d="M 85.094 91.461 C 85.094 107.964 74.603 123.228 74.603 139.421 C 74.603 139.727 71.492 155.908 71.605 155.908 C 81.586 155.908 92.841 151.375 103.079 149.913 C 112.988 148.497 123.588 147.073 133.055 143.918"
                  stroke="#0F172A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
              <defs>
                <filter id="roughen-desktop">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Text on the right with Mouse Memoirs font */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-auto text-center lg:text-left"
          >
            <h1
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#0F172A',
                lineHeight: '1.2',
                marginBottom: '0.5rem'
              }}
            >
              This is me, Shady Abushady
            </h1>
            <p
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                color: '#0F172A',
                opacity: 0.8
              }}
            >
              AI/ML Engineer
            </p>
            {/* Try it yourself button - Mobile only */}
            <motion.button
              onClick={openModal}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileTap={{ scale: 0.97 }}
              className="flex lg:hidden items-center justify-center gap-2 mx-auto"
              style={{
                marginTop: '1rem',
                marginBottom:'1rem',
                width: '100%',
                maxWidth: '280px',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0.75rem',
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: '1.25rem',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px rgba(214, 201, 161, 0.5)'
              }}
            >
              <Camera size={20} />
              Try it yourself!
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 lg:bottom-1 left-1/2 transform -translate-x-1/2"
        >
          <a
            href="#about"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#0F172A',
              opacity: 0.5,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
          >
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              Scroll to explore
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: 'bounce 2s infinite' }}
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>

      {/* Emotion Detection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '1rem',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                outline: 'none'
              }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                aria-label="Close demo"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #D6C9A1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>

              {/* Modal content */}
              <div style={{ padding: '2rem' }}>
                <h3
                  id="demo-modal-title"
                  className="hidden lg:block"
                  style={{
                    fontFamily: "'Mouse Memoirs', cursive",
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    color: '#0F172A',
                    marginBottom: '1.5rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  Emotion Detection
                </h3>

                {/* Error state */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      backgroundColor: '#FEE2E2',
                      border: '2px solid #EF4444',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <AlertCircle size={24} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p style={{ color: '#DC2626', fontWeight: 500, marginBottom: '0.25rem' }}>
                        {cameraPermission === 'denied' ? 'Camera Permission Required' : 'Error'}
                      </p>
                      <p style={{ color: '#7F1D1D', fontSize: '0.9rem' }}>{error}</p>
                      {cameraPermission === 'denied' && (
                        <button
                          onClick={startCamera}
                          style={{
                            marginTop: '0.75rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#0F172A',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Loading state */}
                {isLoading && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '3rem',
                      gap: '1rem'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 size={40} color="#0F172A" />
                    </motion.div>
                    <p style={{ color: '#0F172A', opacity: 0.7 }}>Loading AI models...</p>
                  </div>
                )}

                {/* Video with overlay */}
                {!isLoading && !error && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
                      <div
                        style={{
                          position: 'relative',
                          backgroundColor: '#0F172A',
                          borderRadius: '0.75rem',
                          overflow: 'hidden',
                          aspectRatio: '4/3'
                        }}
                      >
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: 'scaleX(-1)'
                        }}
                      />
                      {/* Hidden processing canvas for ML (320x240) */}
                      <canvas
                        ref={processingCanvasRef}
                        width={PROCESS_WIDTH}
                        height={PROCESS_HEIGHT}
                        style={{ display: 'none' }}
                      />
                      {/* Visible overlay canvas for face box (matches video size) */}
                      <canvas
                        ref={overlayCanvasRef}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none'
                        }}
                      />

                      {/* Loading overlay while video initializes */}
                      {!isVideoReady && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#0F172A',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem'
                          }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Loader2 size={32} color="#FFFFFF" />
                          </motion.div>
                          <p style={{ color: '#FFFFFF', opacity: 0.7, fontSize: '0.9rem' }}>
                            Starting camera...
                          </p>
                        </div>
                      )}

                      {isVideoReady && modelsLoaded && !predictions && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            color: '#FFFFFF',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          Position your face in the frame
                        </div>
                      )}
                      </div>
                      {isVideoReady && (
                        <p
                          className="text-sm lg:text-2xl"
                          style={{
                            color: '#0F172A',
                            opacity: 0.6,
                            textAlign: 'center',
                            fontFamily:"'Mouse Memoirs'"
                          }}
                        >
                          Tip: Happy, surprised, neutral and angry (like you are screaming) work best with the webcam. Keep in mind that humans only agree to 65% on emotion labels!
                        </p>
                      )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
