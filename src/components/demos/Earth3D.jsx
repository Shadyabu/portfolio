import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Healing particles that emerge from Earth showing positive transformation
const HealingParticles = ({ transitionProgress }) => {
  const particlesRef = useRef();
  const particleCount = 200;

  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Start from Earth surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = 2.1 * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = 2.1 * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = 2.1 * Math.cos(phi);

      // Velocity pointing outward
      velocities.push({
        x: Math.sin(phi) * Math.cos(theta) * 0.01,
        y: Math.sin(phi) * Math.sin(theta) * 0.01,
        z: Math.cos(phi) * 0.01,
        life: Math.random() * 100
      });
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current && transitionProgress > 0.3) {
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const vel = particleData.velocities[i];

        // Move particles outward
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;

        vel.life += 1;

        // Reset particle when it's too far or old
        const distance = Math.sqrt(
          positions[i * 3] ** 2 +
          positions[i * 3 + 1] ** 2 +
          positions[i * 3 + 2] ** 2
        );

        if (distance > 4 || vel.life > 200) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);

          positions[i * 3] = 2.1 * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = 2.1 * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = 2.1 * Math.cos(phi);

          vel.x = Math.sin(phi) * Math.cos(theta) * 0.01;
          vel.y = Math.sin(phi) * Math.sin(theta) * 0.01;
          vel.z = Math.cos(phi) * 0.01;
          vel.life = 0;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particleData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#22c55e"
        transparent
        opacity={Math.min(transitionProgress, 0.8)}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Stats displayed outside the canvas
const StatsOverlay = ({ pollutionLevel, co2Level, temperature }) => {
  // Convert normalized values (0-1) to real-world ranges
  const co2PPM = Math.round(350 + (pollutionLevel * 70)); // 350-420 ppm
  const tempIncrease = (1.0 + (temperature * 0.5)).toFixed(1); // +1.0 to +1.5°C
  const airQualityIndex = Math.round(50 + (pollutionLevel * 200)); // 50-250 AQI

  return (
    <div className="absolute bottom-4 left-4 z-10 text-white text-xs space-y-1">
      <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded space-y-1">
        <div className={pollutionLevel < 0.4 ? "text-green-400" : "text-red-400"}>
          Air Quality: {airQualityIndex} AQI
        </div>
        <div className={co2Level < 0.4 ? "text-green-400" : "text-amber-400"}>
          CO₂: {co2PPM} ppm
        </div>
        <div className={temperature < 0.4 ? "text-green-400" : "text-red-400"}>
          Temp: +{tempIncrease}°C
        </div>
      </div>
    </div>
  );
};

// Main Earth component with actual textures
const Earth = ({ transitionProgress, pollutionLevel, co2Level, temperature, environmentalHealth }) => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();
  const pollutionRef = useRef();

  // Load real Earth textures
  const [earthMap, earthNormalMap, earthSpecularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
    ]
  );

  useFrame((state, delta) => {
    // Rotate Earth
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }

    // Rotate clouds slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.07;
    }

    // Pulse atmosphere based on health
    if (atmosphereRef.current) {
      const healthyPulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      atmosphereRef.current.scale.setScalar(healthyPulse);
    }
  });

  // Atmosphere color based on environmental health
  const atmosphereColor = new THREE.Color().lerpColors(
    new THREE.Color('#9ca3af'), // Polluted gray
    new THREE.Color('#22c55e'), // Healthy green
    environmentalHealth
  );

  return (
    <group>
      {/* Main Earth sphere with real textures */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={10 + transitionProgress * 10}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.3 + transitionProgress * 0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Pollution layer (controlled by pollution level) */}
      <mesh ref={pollutionRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshBasicMaterial
          color="#4b5563"
          transparent
          opacity={0.5 * pollutionLevel}
          depthWrite={false}
        />
      </mesh>

      {/* CO2/Smog layer (brown haze based on CO2 level) */}
      <mesh>
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshBasicMaterial
          color="#8b7355"
          transparent
          opacity={0.3 * co2Level}
          depthWrite={false}
        />
      </mesh>

      {/* Heat distortion layer (based on temperature) */}
      <mesh>
        <sphereGeometry args={[2.04, 64, 64]} />
        <meshBasicMaterial
          color="#ff4500"
          transparent
          opacity={0.15 * temperature}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.1}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.1 + environmentalHealth * 0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh scale={1.15}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.05 + environmentalHealth * 0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Scene manager that handles transition progress
const SceneManager = ({ onProgressChange, pollutionLevel, co2Level, temperature }) => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const brightness = 1.8; // Fixed brightness

  // Calculate health based on environmental parameters
  const environmentalHealth = 1 - ((pollutionLevel + co2Level + temperature) / 3);

  // Auto-progress transition over time
  useFrame((state) => {
    const cycleTime = 10; // 10 second cycle
    const progress = (Math.sin(state.clock.elapsedTime / cycleTime) + 1) / 2;
    setTransitionProgress(progress);
    onProgressChange(progress, environmentalHealth);
  });

  return (
    <>
      {/* Lighting - fixed brightness */}
      <ambientLight intensity={0.5 * brightness} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={(2.0 + transitionProgress * 0.5) * brightness}
        color={environmentalHealth > 0.5 ? "#ffffff" : "#fef3c7"}
      />
      <pointLight position={[-5, -3, -5]} intensity={0.8 * brightness} color="#4299e1" />

      {/* Background stars */}
      <Stars radius={300} depth={50} count={3000} factor={4} fade speed={1} />

      {/* Earth with dynamic states */}
      <Suspense fallback={null}>
        <Earth
          transitionProgress={transitionProgress}
          pollutionLevel={pollutionLevel}
          co2Level={co2Level}
          temperature={temperature}
          environmentalHealth={environmentalHealth}
        />
      </Suspense>

      {/* Healing particles - appear when environmental health improves */}
      {environmentalHealth > 0.3 && (
        <HealingParticles transitionProgress={transitionProgress * environmentalHealth} />
      )}

      {/* Interactive controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

// Main component
const Earth3D = () => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [environmentalHealth, setEnvironmentalHealth] = useState(0);
  const [pollutionLevel, setPollutionLevel] = useState(0.7);
  const [co2Level, setCo2Level] = useState(0.7);
  const [temperature, setTemperature] = useState(0.7);
  const [showControls, setShowControls] = useState(false);

  const handleProgressChange = (progress, health) => {
    setTransitionProgress(progress);
    setEnvironmentalHealth(health);
  };

  return (
    <div className="w-full h-full relative">
      {/* Info text */}
      <div className="absolute top-4 left-4 z-10 text-white text-sm">
        <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded">
          <div className="font-semibold">AI-Driven Transformation</div>
          <div className="text-xs text-gray-300 mt-1">
            {environmentalHealth < 0.3 ? '🔴 Critical' :
             environmentalHealth < 0.7 ? '🟡 Warning' :
             '🟢 Healthy'}
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <StatsOverlay pollutionLevel={pollutionLevel} co2Level={co2Level} temperature={temperature} />

      {/* Controls toggle button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm px-3 py-2 rounded text-white text-xs hover:bg-black/60 transition-colors"
      >
        {showControls ? '✕ Hide Controls' : '🌍 Environmental Controls'}
      </button>

      {/* Environmental controls panel */}
      {showControls && (
        <div className="absolute top-16 right-4 z-10 bg-black/60 backdrop-blur-sm px-4 py-3 rounded text-white text-xs space-y-3 w-64">
          <div className="text-center text-gray-300 mb-2">Adjust environmental parameters</div>

          <div>
            <label className="flex items-center justify-between mb-1">
              <span>Air Pollution</span>
              <span className={pollutionLevel < 0.4 ? "text-green-400" : "text-red-400"}>
                {pollutionLevel < 0.4 ? 'Clean' : pollutionLevel < 0.7 ? 'Moderate' : 'Severe'}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={pollutionLevel}
              onChange={(e) => setPollutionLevel(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between mb-1">
              <span>CO₂ Emissions</span>
              <span className={co2Level < 0.4 ? "text-green-400" : "text-amber-400"}>
                {Math.round(350 + (co2Level * 70))} ppm
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={co2Level}
              onChange={(e) => setCo2Level(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between mb-1">
              <span>Temperature Rise</span>
              <span className={temperature < 0.4 ? "text-green-400" : "text-red-400"}>
                +{(1.0 + (temperature * 0.5)).toFixed(1)}°C
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div className="pt-2 border-t border-gray-500">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Environmental Health</span>
              <span className={environmentalHealth > 0.7 ? "text-green-400" : environmentalHealth > 0.3 ? "text-amber-400" : "text-red-400"}>
                {Math.round(environmentalHealth * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  environmentalHealth > 0.7 ? 'bg-green-500' :
                  environmentalHealth > 0.3 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${environmentalHealth * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              setPollutionLevel(0.7);
              setCo2Level(0.7);
              setTemperature(0.7);
            }}
            className="w-full mt-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 rounded text-white text-xs transition-colors"
          >
            Reset to Current State
          </button>

          <button
            onClick={() => {
              setPollutionLevel(0.1);
              setCo2Level(0.1);
              setTemperature(0.1);
            }}
            className="w-full px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-white text-xs transition-colors"
          >
            Apply AI Solutions ✨
          </button>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneManager
          onProgressChange={handleProgressChange}
          pollutionLevel={pollutionLevel}
          co2Level={co2Level}
          temperature={temperature}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;
