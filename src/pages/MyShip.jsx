import React from "react";
import ShipDetails from "../components/ShipDetails";
import ShipModel from "../components/ShipModel";
import { Canvas } from "@react-three/fiber";

import "../assets/css/MyShip.css";
import { OrbitControls } from "@react-three/drei";

const MyShip = () => {
  return (
    <div className="container d-flex justify-content-around align-items-center h-100">
      <ShipDetails />
      <div className="canvas-container">
        <Canvas camera={{ position: [-263, 513, 318], fov: 25 }}>
          <OrbitControls />
          <ambientLight intensity={1} />
          <directionalLight intensity={10} />
          <ShipModel />
        </Canvas>
      </div>
    </div>
  );
};

export default MyShip;