"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function CoffeeCup() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.4;
      ref.current.rotation.x = Math.cos(clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* Cup body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[1, 0.7, 1.2, 64, 1, true]} />
          <meshStandardMaterial
            color="#1c1814"
            roughness={0.4}
            metalness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.55, 0]}>
          <circleGeometry args={[0.96, 64]} />
          <meshStandardMaterial
            color="#3a2419"
            roughness={0.2}
            metalness={0.6}
            emissive="#d97942"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Saucer */}
        <mesh position={[0, -0.65, 0]} receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 0.08, 64]} />
          <meshStandardMaterial color="#15110d" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Handle */}
        <mesh position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.08, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#1c1814" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Steam particles */}
        <Sparkles
          count={40}
          size={2}
          scale={[2, 3, 2]}
          position={[0, 2, 0]}
          color="#f4ead8"
          speed={0.4}
        />
      </Float>
    </group>
  );
}

function AmbientLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.intensity = 1.2 + Math.sin(clock.elapsedTime * 1.4) * 0.2;
    }
  });
  return (
    <pointLight
      ref={ref}
      position={[3, 4, 2]}
      color="#d97942"
      intensity={1.4}
      distance={12}
    />
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={0.6} color="#f4ead8" />
        <AmbientLight />
        <pointLight position={[-3, 2, -2]} color="#c9a86a" intensity={0.6} />

        <Suspense fallback={null}>
          <CoffeeCup />
          <Environment preset="night" />
        </Suspense>

        <Sparkles
          count={120}
          size={1.5}
          scale={10}
          color="#c9a86a"
          speed={0.2}
          opacity={0.4}
        />
      </Canvas>
    </div>
  );
}
