import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet2 = () => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet2.jpg");
  const planet2Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet2Mesh.current.rotation.y += delta * 0.8;
    planet2Mesh.current.position.x = Math.sin(angle * 0.7) * 5;
    planet2Mesh.current.position.z = Math.cos(angle * 0.7) * 5;
  });

  return (
    <>
      <mesh
        ref={planet2Mesh}
        scale={0.6}
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

export default Planet2;
