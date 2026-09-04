import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive hero 3D object: a faceted "core" with an orbiting wireframe shell
 * and code-bracket-like torus rings. Reacts subtly to pointer movement.
 * Rendered client-side only (see Hero.tsx) and skipped when WebGL is missing.
 */

function DeveloperCore({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!group.current) return;

    // Subtle mouse parallax with exponential damping (frame-rate independent).
    const targetY = pointer.x * 0.5;
    const targetX = -pointer.y * 0.35;
    const k = 1 - Math.exp(-3 * dt);
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetX - group.current.rotation.x) * k;

    if (!reduced && shell.current) {
      shell.current.rotation.y += dt * 0.35;
      shell.current.rotation.x += dt * 0.12;
      const t = state.clock.elapsedTime;
      shell.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.03);
    }
  });

  const ringGeometry = useMemo(() => new THREE.TorusGeometry(2.1, 0.035, 12, 128), []);

  return (
    <group ref={group}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.9}
      >
        {/* Solid inner core */}
        <mesh castShadow>
          <icosahedronGeometry args={[1.15, 0]} />
          <meshPhysicalMaterial
            color="#B98954"
            roughness={0.42}
            metalness={0.55}
            clearcoat={0.35}
            clearcoatRoughness={0.4}
            emissive="#704B32"
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Wireframe shell */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#704B32" wireframe transparent opacity={0.34} />
        </mesh>

        {/* Orbiting rings */}
        <mesh geometry={ringGeometry} rotation={[Math.PI / 2.2, 0, 0]}>
          <meshStandardMaterial
            color="#B98954"
            emissive="#704B32"
            emissiveIntensity={0.08}
            roughness={0.5}
            metalness={0.45}
          />
        </mesh>
        <mesh geometry={ringGeometry} rotation={[Math.PI / 2.2, Math.PI / 2.6, 0.6]} scale={0.82}>
          <meshStandardMaterial
            color="#704B32"
            emissive="#704B32"
            emissiveIntensity={0.06}
            roughness={0.5}
            metalness={0.45}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Sparks({ count = 60 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (points.current) points.current.rotation.y += dt * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#B98954" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={2} color="#FFF5E5" />
      <pointLight position={[-5, -3, 2]} intensity={18} color="#B98954" distance={12} />
      <pointLight position={[5, 3, -2]} intensity={14} color="#704B32" distance={12} />

      {/* Local lightformers — no CDN HDR fetch */}
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 8, 1]} color="#FFF8EC" />
        <Lightformer
          intensity={1.4}
          color="#D8B98D"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[16, 2, 1]}
        />
        <Lightformer
          intensity={1.2}
          color="#8A6247"
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[16, 2, 1]}
        />
      </Environment>

      <DeveloperCore reduced={reduced} />
      {!reduced && <Sparks />}
    </Canvas>
  );
}
