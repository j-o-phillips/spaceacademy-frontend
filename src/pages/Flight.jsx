import { Canvas } from "@react-three/fiber";
import React from "react";
import FlightScene from "../components/FlightScene";
import ShipModel from "../components/ShipModel";

const Flight = () => {
  return (
    <Canvas>
      <FlightScene />
    </Canvas>
  );
};

export default Flight;
