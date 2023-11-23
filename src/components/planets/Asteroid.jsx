import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";
import texture from "../../assets/planet2.jpg";

const Asteroid = ({ position, scale, segments }) => {
  const asteroidMesh = useRef();
  const colorMap = useLoader(TextureLoader, texture);
  return (
    <>
      <mesh
        ref={asteroidMesh}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        scale={scale}
      >
        <sphereGeometry args={[scale, segments[0], segments[1]]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
};

export default Asteroid;
