import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet1 = ({ setCurrentPlanet }) => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet1.jpg");
  const planet1Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet1Mesh.current.rotation.y += delta * 1;
    planet1Mesh.current.position.x = Math.sin(angle * 0.7) * 2;
    planet1Mesh.current.position.z = Math.cos(angle * 0.7) * 2;
  });

  const handleSelect = () => {
    setCurrentPlanet({
      frontendName: "Mathematics Planet",
      djangoName: "mathematics",
    });
  };
  return (
    <>
      <mesh
        ref={planet1Mesh}
        position-x={4}
        scale={0.3}
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

export default Planet1;
