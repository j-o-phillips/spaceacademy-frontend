import { FlyControls, OrbitControls, Stars } from "@react-three/drei";
import React, { Suspense } from "react";
import Asteroid from "./planets/Asteroid";
import ShipModel from "./ShipModel";
import Planet1 from "./planets/Planet1";

const FlightScene = () => {
  const numOfAsteroids = [15];
  const roidArray = Array.from({ length: numOfAsteroids }, () => 1);

  console.log(roidArray);
  return (
    <>
      {/* <FlyControls movementSpeed={20} rollSpeed={0.3} /> */}
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight intensity={10} />
      <Stars
        radius={300}
        depth={100}
        count={8000}
        factor={4}
        saturation={0}
        fade
      />

      {roidArray.map((roid) => {
        const posX = (Math.random() - 0.5) * 1000;
        const posY = (Math.random() - 0.5) * 1000;
        const posZ = (Math.random() - 0.5) * 1000;
        const scale = Math.random() * 9;
        const wSeg = Math.random() * 10;
        const hSeg = Math.random() * 10;

        return (
          <Asteroid
            position={[posX, posY, posZ]}
            scale={scale}
            segments={[wSeg, hSeg]}
          />
        );
      })}
    </>
  );
};

export default FlightScene;
