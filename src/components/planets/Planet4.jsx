import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Planet4 = ({ setCurrentPlanet }) => {
  const colorMap = useLoader(TextureLoader, "solarsystem/planet4.jpg");
  const planet4Mesh = useRef();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    planet4Mesh.current.rotation.y += delta * 0.8;
    planet4Mesh.current.position.x = Math.sin(angle * 0.3 + 5) * 11;
    planet4Mesh.current.position.z = Math.cos(angle * 0.3 + 5) * 11;
  });

  const handleSelect = () => {
    setCurrentPlanet({
      frontendName: "Geography Planet",
      djangoName: "geography",
    });
  };

  return (
    <>
      <mesh
        ref={planet4Mesh}
        scale={0.2}
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

export default Planet4;
