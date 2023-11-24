import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import planet1text from "../../assets/planetText/planet1.jpg";
import planet2text from "../../assets/planetText/planet2.jpg";
import planet3text from "../../assets/planetText/planet3.jpg";
import planet4text from "../../assets/planetText/planet4.jpg";
import planet5text from "../../assets/planetText/planet5.jpg";
import planet6text from "../../assets/planetText/planet6.jpg";
import planet7text from "../../assets/planetText/planet7.jpg";

const Planet1 = ({ planetName }) => {
  let chosenPlanetText;
  switch (planetName) {
    case "mathematics":
      chosenPlanetText = planet1text;
      break;
    case "history":
      chosenPlanetText = planet2text;
      break;
    case "physics":
      chosenPlanetText = planet3text;
      break;
    case "geography":
      chosenPlanetText = planet4text;
      break;
    case "computer_science":
      chosenPlanetText = planet5text;
      break;
    case "biology":
      chosenPlanetText = planet6text;
      break;
    case "music":
      chosenPlanetText = planet7text;
      break;
  }

  const colorMap = useLoader(TextureLoader, chosenPlanetText);
  const planetMesh = useRef();

  useFrame((state, delta) => {
    planetMesh.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <mesh ref={planetMesh} scale={3}>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
};

export default Planet1;
