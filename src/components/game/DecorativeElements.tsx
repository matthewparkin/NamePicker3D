export const DecorativeElements = () => (
  <>
    <group position={[2.5, 0.8, -2]} rotation={[0.2, 0.9, 0.1]}>
      <mesh>
        <torusGeometry args={[1.2, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#6df0ff"
          emissive="#4f9fff"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>

    <group position={[-3.2, -0.2, -2]} rotation={[1.4, 0.2, 0.4]}>
      <mesh>
        <torusGeometry args={[0.8, 0.12, 16, 100]} />
        <meshStandardMaterial
          color="#ff7d9f"
          emissive="#ff4c7c"
          emissiveIntensity={0.15}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
    </group>
  </>
);
