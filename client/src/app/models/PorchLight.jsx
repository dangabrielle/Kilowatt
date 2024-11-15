/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: ramos301 (https://sketchfab.com/ramos301)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/light-fixture-2da4cca1c6054952a4cfffa6011ab0f9
Title: light fixture
*/

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

const PorchLight = ({ status }) => {
  const { nodes, materials } = useGLTF("/light_fixture.glb");
  const lightRef = useRef(null);
  const lightMaterial = materials.material;

  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: status ? [0, Math.PI / 2, 0] : [0, 0, 0] },
    config: { duration: 5000 },
    loop: true,
  });

  useEffect(() => {
    if (lightMaterial) {
      if (status) {
        lightMaterial.emissive = new THREE.Color(1, 1, 0); // Yellow light
        lightMaterial.emissiveIntensity = 2;
      } else {
        lightMaterial.emissiveIntensity = 0;
      }
    }
  }, [status, lightMaterial]);
  return (
    <a.group ref={lightRef} rotation={rotation} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_Lustre_0.geometry}
          material={materials.Lustre}
          position={[0.716, 0, -1.117]}
          rotation={[-Math.PI / 2, 0, -2.79]}
          scale={[55.695, 55.695, 5.336]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_Luz_0.geometry}
          material={materials.material}
          position={[-57.533, 89.749, 20.238]}
          rotation={[0.42, -1.189, -1.178]}
          scale={70.185}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_Luz_0.geometry}
          material={materials.material}
          position={[20.71, 89.749, 58.004]}
          rotation={[0.162, 0.347, -1.626]}
          scale={70.185}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_Luz_0.geometry}
          material={materials.material}
          position={[58.723, 89.749, -19.894]}
          rotation={[2.722, 1.189, 1.963]}
          scale={70.185}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_Luz_0.geometry}
          material={materials.material}
          position={[-20.33, 89.749, -59.706]}
          rotation={[2.979, -0.347, 1.515]}
          scale={70.185}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_Preto_0.geometry}
          material={materials.Preto}
          position={[0, 209.306, 0]}
          rotation={[-Math.PI / 2, 0, -2.732]}
          scale={8.785}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004_Lustre_0.geometry}
          material={materials.Lustre}
          position={[-60.983, 255.991, -147.215]}
          rotation={[-Math.PI, -0.398, Math.PI / 2]}
          scale={32.528}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_Preto_0.geometry}
          material={materials.Preto}
          position={[0.716, 0.185, -1.117]}
          rotation={[-Math.PI / 2, 0, -2.79]}
          scale={[55.695, 55.695, 5.336]}
        />
      </group>
    </a.group>
  );
};

useGLTF.preload("/light_fixture.glb");
export default PorchLight;
