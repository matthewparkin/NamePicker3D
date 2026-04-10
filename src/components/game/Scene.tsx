import { Plane, Sparkles, Stars } from '@react-three/drei';

export const Scene = () => (
  <>
    <color attach="background" args={[0.02, 0.03, 0.08]} />
    <ambientLight intensity={0.25} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} color="#9ad3bc" />
    <pointLight position={[-4, 2, 6]} intensity={0.6} color="#ffbb7a" />
    <pointLight position={[4, -2, 5]} intensity={0.45} color="#6b6cff" />

    <Stars radius={120} depth={40} count={4000} factor={4} saturation={0} fade speed={1} />
    <Sparkles count={180} scale={8} size={2.2} speed={0.5} color="#a5f3fc" />

    <Plane args={[60, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.3, 0]}>
      <meshStandardMaterial color="#acacac" metalness={0.2} roughness={0.6} />
    </Plane>
  </>
);
