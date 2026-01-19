'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float, ContactShadows, SpotLight } from '@react-three/drei'
import * as THREE from 'three'

function CameraModel(props: any) {
    const group = useRef<THREE.Group>(null)

    // Auto-rotate with complex motion
    useFrame((state) => {
        if (group.current) {
            const t = state.clock.getElapsedTime()
            group.current.rotation.y = Math.sin(t * 0.2) * 0.3
            group.current.rotation.x = Math.cos(t * 0.3) * 0.1
            group.current.position.y = Math.sin(t * 0.5) * 0.1
        }
    })

    // Premium Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 1,
        roughness: 0.15,
    })

    const blackMaterial = new THREE.MeshStandardMaterial({
        color: '#222222', // Lighter grey to be visible against black bg
        metalness: 0.8,
        roughness: 0.2, // Smoother for more reflections
    })

    const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0,
        transmission: 0.95,
        thickness: 1.5,
        clearcoat: 1,
        ior: 1.5,
    })

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Main Body */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow material={blackMaterial}>
                <boxGeometry args={[2, 2.2, 3.5]} />
            </mesh>

            {/* Top Handle */}
            <mesh position={[0, 1.3, 0]} castShadow material={blackMaterial}>
                <boxGeometry args={[0.5, 0.4, 2.5]} />
            </mesh>

            {/* Lens System */}
            <mesh position={[0, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
                <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
            </mesh>
            <mesh position={[0, 0, 2.2]} rotation={[Math.PI / 2, 0, 0]} material={blackMaterial}>
                <cylinderGeometry args={[0.8, 0.85, 0.8, 32]} />
            </mesh>
            <mesh position={[0, 0, 2.65]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
                <cylinderGeometry args={[0.82, 0.82, 0.1, 32]} />
            </mesh>
            <mesh position={[0, 0, 2.6]} rotation={[Math.PI / 2, 0, 0]} material={lensMaterial}>
                <sphereGeometry args={[0.75, 32, 32]} />
            </mesh>

            {/* Film Reels */}
            <group position={[0, 1.8, -1]}>
                <mesh position={[-0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={blackMaterial}>
                    <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
                </mesh>
                <mesh position={[0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={blackMaterial}>
                    <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
                </mesh>
                <mesh position={[-0.8, 0, 0.21]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
                    <torusGeometry args={[0.5, 0.05, 16, 100]} />
                </mesh>
                <mesh position={[0.8, 0, 0.21]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
                    <torusGeometry args={[0.5, 0.05, 16, 100]} />
                </mesh>
            </group>

            {/* Viewfinder */}
            <mesh position={[-1.2, 0.5, 0]} material={blackMaterial}>
                <boxGeometry args={[0.4, 0.4, 1.5]} />
            </mesh>
            <mesh position={[-1.2, 0.5, 0.8]} material={lensMaterial}>
                <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
        </group>
    )
}

function MovingLights() {
    const lightRef = useRef<THREE.SpotLight>(null)
    useFrame((state) => {
        if (lightRef.current) {
            const t = state.clock.getElapsedTime()
            lightRef.current.position.x = Math.sin(t) * 10
            lightRef.current.position.z = Math.cos(t) * 10
        }
    })

    return (
        <SpotLight
            ref={lightRef}
            position={[10, 10, 10]}
            angle={0.2}
            penumbra={1}
            intensity={20} // High intensity for dramatic effect
            color="#D4AF37"
            castShadow
            distance={50}
        />
    )
}

function FloatingParticles() {
    return (
        <group>
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[3, 1, -2]} scale={0.3}>
                    <icosahedronGeometry />
                    <meshStandardMaterial color="#D4AF37" wireframe emissive="#D4AF37" emissiveIntensity={0.5} />
                </mesh>
            </Float>
            <Float speed={5} rotationIntensity={1.5} floatIntensity={1}>
                <mesh position={[-3, -2, 1]} scale={0.2}>
                    <octahedronGeometry />
                    <meshStandardMaterial color="#ffffff" wireframe />
                </mesh>
            </Float>
            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                {/* A framing element */}
                <mesh position={[0, 0, 0]} scale={6}>
                    <ringGeometry args={[1, 1.01, 64]} />
                    <meshBasicMaterial color="#333" transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>
            </Float>
        </group>
    )
}

export default function AestheticCameraScene() {
    return (
        <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
                {/* Adjusted Camera Position to fill the frame */}
                <PerspectiveCamera makeDefault position={[3.5, 1.5, 4.5]} fov={40} />

                {/* Cinematic Lighting - Enhanced for visibility */}
                <ambientLight intensity={0.8} /> {/* Increased ambient */}
                <MovingLights />
                <pointLight position={[-5, 2, 5]} intensity={8} color="#ffffff" /> {/* Front fill light */}
                <pointLight position={[-10, 0, -10]} intensity={10} color="#0044ff" /> {/* Stronger rim light */}
                <directionalLight position={[0, 5, 0]} intensity={2} color="#D4AF37" /> {/* Top gold highlight */}

                {/* Scene */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    {/* Increased scale */}
                    <CameraModel scale={1.3} />
                </Float>

                <FloatingParticles />

                {/* Environment for reflections */}
                <Environment preset="city" />

                {/* Soft Contact Shadow - Adjusted scale */}
                <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={20} blur={3} far={4} color="#000" />
            </Canvas>
        </div>
    )
}
