import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = ({ url }) => {
  const { scene } = useGLTF(url);
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={10} />
      <directionalLight position={[-10, -10, -5]} intensity={10} />
      <primitive object={scene} />
      <OrbitControls autoRotate />
    </Canvas>
  );
};

export default ModelViewer;
