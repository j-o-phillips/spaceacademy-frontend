import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet1 = () => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet1.jpg");
  const planet1Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet1Mesh.current.rotation.y += delta * 1;
    planet1Mesh.current.position.x = Math.sin(angle * 1) * 2;
    planet1Mesh.current.position.z = Math.cos(angle * 1) * 2;
  });

  return (
    <>
      <mesh
        ref={planet1Mesh}
        position-x={4}
        scale={0.3}
        onPointerEnter={() => {
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          gl.domElement.style.cursor = "default";
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
};

export default Planet1;
