import React, { Suspense } from "react";
import ShipDetails from "../components/ShipDetails";
import ShipModel from "../components/ShipModel";
import { Canvas } from "@react-three/fiber";

import "../assets/css/MyShip.css";
import { OrbitControls } from "@react-three/drei";
import CanvasLoader from "../components/Loader";

import stars from "../assets/img/Stars.png";

const MyShip = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-around align-items-center h-100 my-4"
      style={{ flexWrap: "wrap-reverse", backgroundImage: `url(${stars})` }}
    >
      <ShipDetails />
      <div className="canvas-container ">
        <Canvas camera={{ position: [-263, 513, 318], fov: 25 }}>
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls />
            <ambientLight intensity={1} />
            <directionalLight intensity={10} />
            <ShipModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default MyShip;
