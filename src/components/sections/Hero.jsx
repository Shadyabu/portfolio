import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';
import { Camera, X, AlertCircle, Loader2 } from 'lucide-react';
import emotionGif from '../../assets/emotion recognition.webp';

const EMOTIONS = ['angry', 'disgusted', 'neutral', 'happy', 'fearful', 'sad', 'surprised'];

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('prompt');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);
  const modalRef = useRef(null);
  const modelsLoadedRef = useRef(false); // Ref to avoid stale closure issues

  // Load face-api models
  const loadModels = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      
      try {
        const modelPath = `${import.meta.env.BASE_URL}models/emotion_model/model.json`;
        modelRef.current = await tf.loadGraphModel(modelPath);
      } catch (modelError) {
        console.warn('Custom emotion model not found, using demo mode:', modelError);
        modelRef.current = null;
      }

      modelsLoadedRef.current = true; // Update ref synchronously
      setModelsLoaded(true);
    } catch (err) {
      console.error('Error loading models:', err);
      setError('Failed to load AI models. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start webcam
  const startCamera = useCallback(async () => {
    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
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

  // Debug frame counter
  const frameCountRef = useRef(0);
  const lastPredictionUpdateRef = useRef(0);

  // Process video frame
  const processFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoadedRef.current) {
      animationRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Wait for video to be ready with valid dimensions
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      // Log only once every 60 frames to avoid flooding console
      if (frameCountRef.current % 60 === 0) {
      }
      frameCountRef.current++;
      animationRef.current = requestAnimationFrame(processFrame);
      return;
    }

    // Set canvas size to match video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Clear canvas (transparent overlay)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.2 })
      );

      // Log detection results periodically
      if (frameCountRef.current % 30 === 0) {
      }
      frameCountRef.current++;

      if (detections.length > 0) {
        const detection = detections[0];
        const box = detection.box;

        // Mirror the x coordinate since the video display is mirrored
        const mirroredX = canvas.width - box.x - box.width;

        // Draw face box with prominent styling
        ctx.strokeStyle = '#D6C9A1';
        ctx.lineWidth = 4;
        ctx.strokeRect(mirroredX, box.y, box.width, box.height);

        // Add corner accents
        const cornerSize = 15;
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 4;

        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(mirroredX, box.y + cornerSize);
        ctx.lineTo(mirroredX, box.y);
        ctx.lineTo(mirroredX + cornerSize, box.y);
        ctx.stroke();

        // Top-right corner
        ctx.beginPath();
        ctx.moveTo(mirroredX + box.width - cornerSize, box.y);
        ctx.lineTo(mirroredX + box.width, box.y);
        ctx.lineTo(mirroredX + box.width, box.y + cornerSize);
        ctx.stroke();

        // Bottom-left corner
        ctx.beginPath();
        ctx.moveTo(mirroredX, box.y + box.height - cornerSize);
        ctx.lineTo(mirroredX, box.y + box.height);
        ctx.lineTo(mirroredX + cornerSize, box.y + box.height);
        ctx.stroke();

        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(mirroredX + box.width - cornerSize, box.y + box.height);
        ctx.lineTo(mirroredX + box.width, box.y + box.height);
        ctx.lineTo(mirroredX + box.width, box.y + box.height - cornerSize);
        ctx.stroke();

        if (modelRef.current) {
          const faceCanvas = document.createElement('canvas');
          faceCanvas.width = 48;
          faceCanvas.height = 48;
          const faceCtx = faceCanvas.getContext('2d');

          faceCtx.drawImage(
            video,
            box.x, box.y, box.width, box.height,
            0, 0, 48, 48
          );

          const resizeCanvas = document.createElement('canvas');
          resizeCanvas.width = 224;
          resizeCanvas.height = 224;
          const resizeCtx = resizeCanvas.getContext('2d');
          resizeCtx.drawImage(faceCanvas, 0, 0, 224, 224);

          const tensor = tf.browser.fromPixels(resizeCanvas)
            .toFloat()
            .div(255.0)
            .expandDims(0);
          
          const prediction = await modelRef.current.predict(tensor).data();
          tensor.dispose();

          const now = Date.now();
          if (now - lastPredictionUpdateRef.current >= 300) {
            lastPredictionUpdateRef.current = now;
            setPredictions(Array.from(prediction));
          }
        } else {
          const now = Date.now();
          if (now - lastPredictionUpdateRef.current >= 1000) {
            lastPredictionUpdateRef.current = now;
            const demoProbs = EMOTIONS.map((_, i) => {
              const base = Math.sin(now / 1000 + i * 0.8) * 0.3 + 0.5;
              return Math.max(0.05, Math.min(0.95, base * (0.5 + Math.random() * 0.5)));
            });
            const sum = demoProbs.reduce((a, b) => a + b, 0);
            setPredictions(demoProbs.map(p => p / sum));
          }
        }
      } else {
        setPredictions(null);
      }
    } catch (err) {
      console.error('Frame processing error:', err);
    }

    animationRef.current = requestAnimationFrame(processFrame);
  }, []); // Using refs instead of state to avoid stale closures

  // Handle modal open
  const openModal = async () => {
    setIsModalOpen(true);
    setError(null);
    setPredictions(null);

    if (!modelsLoaded) {
      await loadModels();
    }

    const cameraStarted = await startCamera();
    if (cameraStarted) {
      animationRef.current = requestAnimationFrame(processFrame);
    }
  };

  // Handle modal close
  const closeModal = useCallback(() => {
    stopCamera();
    setIsModalOpen(false);
    setPredictions(null);
    setError(null);
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

                {/* Video and predictions */}
                {!isLoading && !error && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '1.5rem'
                    }}
                  >
                    {/* Video container wrapper */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                      <canvas
                        ref={canvasRef}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none'
                        }}
                      />

                      {modelsLoaded && !predictions && (
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
                      <p style={{
                        fontSize: '1.5rem',
                        color: '#0F172A',
                        opacity: 0.6,
                        textAlign: 'center',
                        fontFamily:"'Mouse Memoirs'"
                      }}>
                        Tip: Happy, sad, and neutral work best with the webcam
                      </p>
                    </div>

                    {/* Predictions panel */}
                    <div
                      style={{
                        backgroundColor: '#FAF5F0',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        border: '2px solid #D6C9A1'
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "'Mouse Memoirs', cursive",
                          fontSize: '1.5rem',
                          color: '#0F172A',
                          marginBottom: '1rem',
                          letterSpacing: '0.02em'
                        }}
                      >
                        Detected Emotions
                      </h4>

                      {predictions ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {EMOTIONS.map((emotion, index) => {
                            const prob = predictions[index] || 0;
                            const isMax = predictions.indexOf(Math.max(...predictions)) === index;

                            return (
                              <div key={emotion}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.25rem'
                                  }}
                                >
                                  <span
                                    style={{
                                      color: '#0F172A',
                                      fontWeight: isMax ? 600 : 400,
                                      fontSize: '0.95rem'
                                    }}
                                  >
                                    {emotion}
                                  </span>
                                  <span
                                    style={{
                                      color: '#0F172A',
                                      opacity: 0.7,
                                      fontSize: '0.85rem'
                                    }}
                                  >
                                    {(prob * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <div
                                  style={{
                                    height: '8px',
                                    backgroundColor: '#E5E5E5',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                  }}
                                >
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prob * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                      height: '100%',
                                      backgroundColor: isMax ? '#F59E0B' : '#0F172A',
                                      borderRadius: '4px'
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p style={{ color: '#0F172A', opacity: 0.5, textAlign: 'center', padding: '2rem 0' }}>
                          Waiting for face detection...
                        </p>
                      )}

                      <div
                        style={{
                          marginTop: '1.5rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid #D6C9A1',
                          fontSize: '0.8rem',
                          color: '#0F172A',
                          opacity: 0.6
                        }}
                      >
                        {modelRef.current ? (
                          <p>Using custom MobileNet model trained on FER2013</p>
                        ) : (
                          <p>Demo mode - Add your converted model for real predictions</p>
                        )}
                      </div>
                    </div>
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
