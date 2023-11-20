import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet3 = ({ setCurrentPlanet }) => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet3.jpg");
  const planet3Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet3Mesh.current.rotation.y += delta * 0.8;
    planet3Mesh.current.position.x = Math.sin(angle * 0.65) * 8;
    planet3Mesh.current.position.z = Math.cos(angle * 0.65) * 8;
  });

  const handleSelect = () => {
    setCurrentPlanet({
      frontendName: "Physics Planet",
      djangoName: "physics",
    });
  };

  return (
    <>
      <mesh
        ref={planet3Mesh}
        scale={0.4}
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

export default Planet3;
