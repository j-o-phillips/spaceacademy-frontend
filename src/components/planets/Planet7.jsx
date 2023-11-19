import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet7 = () => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet7.jpg");
  const planet7Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet7Mesh.current.rotation.y += delta * 0.5;
    planet7Mesh.current.position.x = Math.sin(angle * 0.1) * 20;
    planet7Mesh.current.position.z = Math.cos(angle * 0.1) * 20;
  });

  return (
    <>
      <mesh
        ref={planet7Mesh}
        scale={0.4}
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

export default Planet7;
