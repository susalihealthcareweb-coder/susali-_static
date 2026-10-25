
'use client';

import {
  Suspense,
  useMemo,
  useRef,
} from 'react';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import {
  Float,
  useGLTF,
} from '@react-three/drei';

import * as THREE from 'three';

function Organ({
  file,
  position,
  maxSize,
  rotationSpeed,
  reduceMotion,
}) {
  const { scene } = useGLTF(file);

  const spinRef = useRef(null);

  const normalized = useMemo(() => {
    const copy = scene.clone(true);

    const bounds = new THREE.Box3()
      .setFromObject(copy);

    const center = bounds.getCenter(
      new THREE.Vector3()
    );

    const dimensions = bounds.getSize(
      new THREE.Vector3()
    );

    const longestSide =
      Math.max(
        dimensions.x,
        dimensions.y,
        dimensions.z
      ) || 1;

    copy.position.sub(center);

    const holder = new THREE.Group();

    holder.add(copy);

    holder.scale.setScalar(
      maxSize / longestSide
    );

    return holder;
  }, [scene, maxSize]);

  useFrame((_, delta) => {
    if (reduceMotion || !spinRef.current) {
      return;
    }

    spinRef.current.rotation.y +=
      delta * rotationSpeed;
  });

  return (
    <group
      ref={spinRef}
      position={position}
    >
      <Float
        speed={reduceMotion ? 0 : 1.25}
        floatIntensity={reduceMotion ? 0 : 0.28}
        rotationIntensity={reduceMotion ? 0 : 0.12}
        floatingRange={[-0.13, 0.13]}
      >
        <primitive object={normalized} />
      </Float>
    </group>
  );
}

export default function HeroOrgansScene({
  available,
  reduceMotion = false,
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 9.5],
        fov: 37,
        near: 0.1,
        far: 60,
      }}
      dpr={[1, 1.5]}
      frameloop={
        reduceMotion ? 'demand' : 'always'
      }
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      {/* General lighting */}
      <ambientLight intensity={2.3} />

      {/* Main studio light */}
      <directionalLight
        position={[3, 5, 7]}
        intensity={2.6}
      />

      {/* Medical cyan rim light */}
      <directionalLight
        position={[-5, 1, 3]}
        intensity={1.4}
        color="#a9e8eb"
      />

      {/* Soft purple accent */}
      <directionalLight
        position={[3, -3, -2]}
        intensity={1.6}
        color="#d8a2ca"
      />

      <Suspense fallback={null}>
        {/* HEART */}
        {available.heart && (
          <Organ
            file="/organs/heart.glb"
            position={[0.12, 0.47, 0.75]}
            maxSize={2.3}
            rotationSpeed={0.17}
            reduceMotion={reduceMotion}
          />
        )}

        {/* KIDNEYS */}
        {available.kidney && (
          <Organ
            file="/organs/kidney.glb"
            position={[-1.98, -1.01, -0.3]}
            maxSize={1.6}
            rotationSpeed={-0.14}
            reduceMotion={reduceMotion}
          />
        )}

        {/* LIVER */}
        {available.liver && (
          <Organ
            file="/organs/liver.glb"
            position={[1.96, -0.87, -0.25]}
            maxSize={1.85}
            rotationSpeed={0.12}
            reduceMotion={reduceMotion}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
