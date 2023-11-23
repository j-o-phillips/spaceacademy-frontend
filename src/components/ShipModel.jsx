import { useGLTF } from "@react-three/drei";

const ShipModel = () => {
  const ship = useGLTF("./ship/scene.gltf");
  console.log(ship);
  return <primitive object={ship.scene} />;
};

export default ShipModel;
