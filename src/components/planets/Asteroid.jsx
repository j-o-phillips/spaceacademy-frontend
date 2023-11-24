import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";

const Asteroid = ({ position, scale, segments }) => {
  const asteroidMesh = useRef();

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
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Asteroid;
