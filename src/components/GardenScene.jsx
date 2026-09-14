import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches

function Terrain() {
  const geo = useMemo(() => {
    const segs = isMobile() ? 36 : 70
    const g = new THREE.PlaneGeometry(48, 48, segs, segs)
    g.rotateX(-Math.PI / 2)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      pos.setY(i, Math.sin(x * 0.22) * 0.45 + Math.cos(z * 0.18) * 0.55)
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial color="#4e6a2a" roughness={0.92} metalness={0.04} />
    </mesh>
  )
}

function Grove() {
  const group = useRef()
  const count = isMobile() ? 14 : 32
  const trees = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: ((i * 97) % 34) - 17,
        z: ((i * 53) % 28) - 14,
        s: 0.7 + (i % 5) * 0.18,
        h: 1.6 + (i % 4) * 0.35,
      })),
    [count],
  )

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.1
  })

  return (
    <group ref={group}>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0.2, t.z]} scale={t.s}>
          <mesh position={[0, t.h * 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.14, t.h * 0.7, 6]} />
            <meshStandardMaterial color="#5b3a24" />
          </mesh>
          <mesh position={[0, t.h, 0]} castShadow>
            <icosahedronGeometry args={[0.7 + (i % 3) * 0.12, 0]} />
            <meshStandardMaterial color={i % 2 ? '#6f9a3a' : '#3f6b28'} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Pollen() {
  const ref = useRef()
  const count = isMobile() ? 120 : 380
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = Math.random() * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.05
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.35
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e8d7a3" size={0.07} transparent opacity={0.7} />
    </points>
  )
}

function OrbitRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.35
    ref.current.rotation.z = clock.elapsedTime * 0.22
  })
  return (
    <mesh ref={ref} position={[4.8, 2.6, -1.4]}>
      <torusGeometry args={[1.05, 0.045, 12, 80]} />
      <meshStandardMaterial color="#8db33a" emissive="#5d7a22" emissiveIntensity={0.85} />
    </mesh>
  )
}

function PhotoCard({ url, position, rot }) {
  const tex = useTexture(url)
  tex.colorSpace = THREE.SRGBColorSpace
  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh position={position} rotation={rot}>
        <planeGeometry args={[2.6, 1.7]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </Float>
  )
}

function CameraRig() {
  const light = useRef()
  useFrame(({ camera, pointer, clock }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2.6, 0.045)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.2 + pointer.y * 1.1, 0.045)
    camera.lookAt(0, 1.2, 0)
    if (light.current) {
      light.current.position.x = Math.sin(clock.elapsedTime * 0.25) * 9
      light.current.position.z = 6 + Math.cos(clock.elapsedTime * 0.2) * 2
    }
  })
  return (
    <directionalLight ref={light} position={[8, 12, 6]} intensity={1.45} castShadow color="#fff1d0" />
  )
}

export default function GardenScene() {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return null

  return (
    <Canvas
      className="hero-canvas"
      shadows={!isMobile()}
      dpr={isMobile() ? [1, 1.1] : [1, 1.6]}
      camera={{ position: [0, 4.6, 11], fov: isMobile() ? 48 : 42 }}
      gl={{ antialias: !isMobile(), alpha: true }}
    >
      <color attach="background" args={['#0d120d']} />
      <fog attach="fog" args={['#0d120d', 10, 26]} />
      <ambientLight intensity={0.4} />
      <CameraRig />
      <Terrain />
      <Grove />
      <Pollen />
      <OrbitRing />
      {!isMobile() && (
        <Suspense fallback={null}>
          <PhotoCard url="/media/hero-5.jpg" position={[-5.2, 3.1, -3]} rot={[0.05, 0.4, 0.04]} />
          <PhotoCard url="/media/hero-6.jpg" position={[6.2, 1.8, -4]} rot={[0.08, -0.35, -0.05]} />
        </Suspense>
      )}
    </Canvas>
  )
}
