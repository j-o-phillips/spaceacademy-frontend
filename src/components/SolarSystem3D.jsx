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

const SolarSystem3D = () => {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <ambientLight intensity={0.7} />
      <pointLight intensity={7} decay={0.2} />
      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={6}
        saturation={0}
        fade
      />
      <Sun />
      <Planet1 />
      <Planet2 />
      <Planet3 />
      <Planet4 />
      <Planet5 />
      <Planet7 />
      <Planet6 />
    </>
  );
};

export default SolarSystem3D;
