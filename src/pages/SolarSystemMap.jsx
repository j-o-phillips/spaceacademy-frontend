import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import "../assets/css/SolarSystemMap.css";
import SolarSystem3D from "../components/SolarSystem3D";
import SolarOverlay from "../components/SolarOverlay";

const SolarSystemMap = () => {
  return (
    <>
      <div className="solar-three">
        <SolarOverlay />
        <Canvas camera={{ position: [50, 40, 0], fov: 25 }}>
          <SolarSystem3D />
        </Canvas>
      </div>
    </>
  );
};

export default SolarSystemMap;
