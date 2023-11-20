import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet5 = ({ setCurrentPlanet }) => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet5.jpg");
  const planet5Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet5Mesh.current.rotation.y += delta * 0.8;
    planet5Mesh.current.position.x = Math.sin(angle * 0.3) * 14;
    planet5Mesh.current.position.z = Math.cos(angle * 0.3) * 14;
  });

  const handleSelect = () => {
    setCurrentPlanet({
      frontendName: "CS Planet",
      djangoName: "computer_science",
    });
  };

  return (
    <>
      <mesh
        ref={planet5Mesh}
        scale={0.8}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
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

export default Planet5;
