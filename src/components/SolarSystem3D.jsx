import { OrbitControls, Stars } from "@react-three/drei";
import Sun from "./planets/Sun";
import Planet1 from "./planets/Planet1";
import { Perf } from "r3f-perf";
import Planet2 from "./planets/Planet2";
import Planet3 from "./planets/Planet3";
import Planet4 from "./planets/Planet4";
import Planet5 from "./planets/Planet5";
import Planet6 from "./planets/Planet6";
import Planet7 from "./planets/Planet7";
import ShipModel from "./ShipModel";

const SolarSystem3D = ({ setCurrentPlanet }) => {
  return (
    <>
      {/* <Perf position="top-left" /> */}
      <OrbitControls />
      <ambientLight intensity={0.7} />
      <pointLight intensity={7} decay={0.2} />
      <Stars
        radius={80}
        depth={50}
        count={5000}
        factor={6}
        saturation={0}
        fade
      />
      <Sun />
      <Planet1 setCurrentPlanet={setCurrentPlanet} />
      <Planet2 setCurrentPlanet={setCurrentPlanet} />
      <Planet3 setCurrentPlanet={setCurrentPlanet} />
      <Planet4 setCurrentPlanet={setCurrentPlanet} />
      <Planet5 setCurrentPlanet={setCurrentPlanet} />
      <Planet7 setCurrentPlanet={setCurrentPlanet} />
      <Planet6 setCurrentPlanet={setCurrentPlanet} />
    </>
  );
};

export default SolarSystem3D;
