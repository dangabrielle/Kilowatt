/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Nommoc (https://sketchfab.com/kikumi)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/refrigerator-9eeff266683a464a9a3cc1e6a2f8af28
Title: Refrigerator
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Refrigerator = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/refrigerator.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Plane001_0" position={[-2.995, 8.083, 1.02]}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_5.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_7"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="Plane005_1" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_10.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials.wihte}
                />
              </group>
              <group name="Plane007_2" position={[9.864, 8.083, 1.02]}>
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_15"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_15.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="Plane013_3" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_18"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_18.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_19"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_19.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_20"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_20.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_21"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_21.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="Plane016_4" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_23"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_23.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_24"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_24.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_25"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_25.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_26"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_26.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="Plane019_5" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_28"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_28.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_29"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_29.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_30"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_30.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_31"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_31.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="Plane021_6" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_33"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_33.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_34"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_34.geometry}
                  material={materials.glass}
                />
                <mesh
                  name="Object_35"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_35.geometry}
                  material={materials.inside}
                />
              </group>
              <group name="Plane027_7" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_37"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_37.geometry}
                  material={materials.glass}
                />
              </group>
              <group name="Plane028_8" position={[3.246, -6.089, -2.382]}>
                <mesh
                  name="Object_39"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_39.geometry}
                  material={materials.mainc}
                />
                <mesh
                  name="Object_40"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_40.geometry}
                  material={materials.plastic01}
                />
                <mesh
                  name="Object_41"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_41.geometry}
                  material={materials.wihte}
                />
                <mesh
                  name="Object_42"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_42.geometry}
                  material={materials.glass}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/refrigerator.glb");
export default Refrigerator;
