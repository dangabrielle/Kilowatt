/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: moanatari (https://sketchfab.com/moanatari)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/litle-floating-island-in-low-poly-96bf4ef7cd6b40cf98fbc07d17e4abd4
Title: Litle floating island in low poly
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { a, useSpring, easings } from "@react-spring/three";

const Island = () => {
  const { scene } = useGLTF("/litle_floating_island_in_low_poly.glb");

  const { position } = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [0, Math.PI / 40, 0] },
    config: { duration: 5000, easing: easings.easeInOutCubic },
    loop: { reverse: true },
  });

  return (
    <a.mesh position={position}>
      <primitive object={scene} />
    </a.mesh>
  );
};

export default Island;
