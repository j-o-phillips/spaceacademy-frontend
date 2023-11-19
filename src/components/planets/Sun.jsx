import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Sun = () => {
  const colorMap = useLoader(TextureLoader, "solarsystem/sun.jpg");
  const sunMesh = useRef();

  return (
    <>
      <mesh ref={sunMesh}>
        <sphereGeometry />
        <meshStandardMaterial
          map={colorMap}
          emissive={0xfcba03}
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
};

export default Sun;
