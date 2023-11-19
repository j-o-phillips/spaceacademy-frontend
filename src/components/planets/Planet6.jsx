import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet6 = () => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet6.jpg");
  const planet6Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet6Mesh.current.rotation.y += delta * 0.6;
    planet6Mesh.current.position.x = Math.sin(angle * 0.2) * 17;
    planet6Mesh.current.position.z = Math.cos(angle * 0.2) * 17;
  });

  return (
    <>
      <mesh
        ref={planet6Mesh}
        scale={0.5}
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

export default Planet6;
