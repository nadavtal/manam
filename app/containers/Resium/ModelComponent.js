import React, { useRef, useEffect, memo, useState, useReducer, useMemo } from "react";
import { Cartesian3, Quaternion ,Transforms, Matrix4, Matrix3 } from "cesium";
import { Model, Entity, EntityDescription, EntityStaticDescription} from "resium";
import Polyline from './Polyline';
import { getColor, degreesToRadians } from './cesiumUtils'
import NameOverLay from './NameOverLay';
import { convertCartesianToDegrees } from './Resium';
import useHover from '../../utils/customHooks/useHover'
import { nodesLoadedFromModel, toggelFullPage } from '../BridgePage/actions';
Cesium.Ion.defaultAccessToken =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YTRiNDU3Yy0yY2QxLTQ1MDgtYWI4MS1jNTI4MDRmOTExOGEiLCJpZCI6MjExMzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODA3NjY5NDB9.Qh9GeO3SxngGTX-xvWbfyHQ3p5vNNQ3SgGlc2NgtDOg';

const reducer = (state, action) => {
  switch (action.type) {
    case 'NODES_LOADED':
      console.log('NODES_LOADED', action)
      return {
        ...state,
        nodes: action.data
      }
      break;

    default:
      break;
  }
  return state
}

const initialState = {
  nodes: []
}
const ModelComponent = (props) => {
  // console.log('ModelComponent RENDER - ', props);
  // console.log('selectedObjectIds', props.selectedObjectIds)

  const [state, dispatch] = useReducer(reducer, initialState)
  const [selected, setSelected] = useState({
    feature: undefined,
    originalColor: new Cesium.Color()
  });
  const [silhouetteBlue, setSilhouetteBlue] = useState();
  const [silhouetteGreen, setSilhouetteGreen] = useState();
  const [modelResource, setModelResource] = useState()
  
  const show = props.calibrationData.show
  const alpha = props.calibrationData.alpha

  useEffect(() => {
    // console.log('RUNING USEEFFECT', props.model)
    if (props.model.ion_id) {
      let promise = Cesium.IonResource.fromAssetId(props.model.ion_id)
        .then(function (resource) {
          console.log(resource)
          setModelResource(resource)
  
        })

    } else {
      setModelResource(props.model.url)
      // setModelResource(require('../../models/scene.gltf'))
    }
    // if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
    //   // Silhouettes are supported

    //   const blue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    //   blue.uniforms.color = Cesium.Color.BLUE;
    //   // blue.name = `${props.item.name} blue`
    //   blue.uniforms.length = 0.01;
    //   blue.selected = [];
    //   // console.log(blue);
    //   const green = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    //   green.uniforms.color = Cesium.Color.LIME;
    //   // green.name = `${props.item.name} green`
    //   green.uniforms.length = 0.01;
    //   green.selected = [];
    //   // console.log(green);
    //   let newSilhouette = Cesium.PostProcessStageLibrary.createSilhouetteStage([blue, green])
    //   setSilhouetteBlue(blue)
    //   setSilhouetteGreen(green)
    //   // console.log(newSilhouette)
    //   viewer.scene.postProcessStages.add(newSilhouette);

    // }

    return () => {
      console.log('cleanup')
    };
  }, [])

  // console.log(props.calibrationData)
  const modelRef = useRef(null);
  const cloneModelRef = useRef(null);
  const modelCenter = props.calibrationData.calibrationData ?
     Cartesian3.fromDegrees(props.calibrationData.calibrationData.lon, props.calibrationData.calibrationData.lat, props.calibrationData.calibrationData.height) :
     Cartesian3.fromDegrees(props.bridge.lon, props.bridge.lat, 0)
  const viewer = props.viewerRef.current.cesiumElement;
  const ellipsoid = props.viewerRef.current.cesiumElement.scene.globe.ellipsoid;
  const createModelMatrix = () => {
    // console.log('createModelMatrix')
    let modelMatrix
    let rotateMatrix
    let rotation4
    let rotatedModel
    if (props.calibrationData && props.calibrationData.calibrationData) {
      // console.log(props.calibrationData)
      const incomingCalibrationData = props.calibrationData.calibrationData;

      const offSetCartesian = Cesium.Cartesian3.fromDegrees(incomingCalibrationData.lon, incomingCalibrationData.lat, incomingCalibrationData.height, ellipsoid);
      modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(offSetCartesian);

      // const heading = Cesium.Math.toRadians(incomingCalibrationData.heading);
      // const pitch = Cesium.Math.toRadians(incomingCalibrationData.pitch);
      // const roll = Cesium.Math.toRadians(incomingCalibrationData.roll);
      // const orientation = Cesium.Transforms.headingPitchRollQuaternion(offSetCartesian, {heading, pitch, roll});
      // console.log(orientation)
      rotateMatrix = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(incomingCalibrationData['rotate-x']));
      rotation4 = Cesium.Matrix4.fromRotationTranslation(rotateMatrix, Cesium.Cartesian3.ZERO);
      rotatedModel = Cesium.Matrix4.multiply(modelMatrix, rotation4, modelMatrix);
      rotateMatrix = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(incomingCalibrationData['rotate-y']));
      rotation4 = Cesium.Matrix4.fromRotationTranslation(rotateMatrix, Cesium.Cartesian3.ZERO);
      rotatedModel = Cesium.Matrix4.multiply(modelMatrix, rotation4, modelMatrix);
      rotateMatrix = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(incomingCalibrationData['rotate-z']));
      rotation4 = Cesium.Matrix4.fromRotationTranslation(rotateMatrix, Cesium.Cartesian3.ZERO);
      rotatedModel = Cesium.Matrix4.multiply(modelMatrix, rotation4, modelMatrix);

    }
  return rotatedModel
  }
  const modelMatrix = useMemo(() => createModelMatrix(), props.calibrationData)


  const positionModel = (lon, lat, alt, heading, pitch, roll) => {
    console.log(lon, lat, alt, heading, pitch, roll)
    let point = Cesium.Cartographic.fromDegrees(lon, lat, alt / 3);
    let epoint = ellipsoid.cartographicToCartesian(point);

    heading = degreesToRadians((heading));
    pitch = degreesToRadians(pitch);
    roll = degreesToRadians(roll);

    let currentTranslation = new Cesium.Cartesian3();
    let currentRotation = new Cesium.Matrix3();

    let eastNorthUp = Cesium.Transforms.eastNorthUpToFixedFrame(epoint);
    let p = new Cesium.Cartesian3(lon, lat, alt);

    // Cesium.Matrix4.getRotation(eastNorthUp, currentRotation);
    Cesium.Matrix4.fromRotationTranslation(currentRotation, eastNorthUp)
    Cesium.Matrix4.getTranslation(eastNorthUp, currentTranslation);

    let headingQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, -heading);
    let pitchQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Y, -pitch);
    let rollQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_X, -roll);

    let headingPitchQuaternion = Cesium.Quaternion.multiply(headingQuaternion, pitchQuaternion, new Cesium.Quaternion());
    let finalQuaternion = new Cesium.Quaternion();
    Cesium.Quaternion.multiply(headingPitchQuaternion, rollQuaternion, finalQuaternion);

    let rM = new Cesium.Matrix3();
    Cesium.Matrix3.fromQuaternion(finalQuaternion, rM);

    Cesium.Matrix3.multiply(currentRotation, rM, currentRotation);

    modelMatrix = Cesium.Matrix4.fromRotationTranslation(
        currentRotation,
        currentTranslation,
        modelMatrix
    );
    console.log(modelMatrix)
  };

  

  const findNodeById = (id, nodes) => {

    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      // console.log(node)
      if(node.publicNode.id == id) {
        // console.log('clicked node', node)
        if ( !node.publicNode.name ) {
          // console.log('parent node', node.parents[0])
          if (node.parents[0].publicNode.name) {
            // setEntitySubTitle(node.parents[0].publicNode.name)
            return node.parents[0]
          }
        } else {
          return node
          // setEntitySubTitle(node.publicNode.name)
        }
      }
    }

  }



  const handleModelClick = (m, t, modelName) => {

  }

  const setAllNodesShowExceptId = (nodeId, nodes, show) => {
    // console.log(nodeId)
    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      if (node.publicNode.id !== 0) {
        // console.log(node.publicNode.id == nodeId)
        node.publicNode.show = node.publicNode.id == nodeId ? show : !show
      }
    }
  }
  const setAllNodesExceptIds = (nodeIds, nodes, show) => {
    
    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      if (node.publicNode.id !== 0) {
        node.publicNode.show = nodeIds.includes(node.publicNode.id) ? show : !show
      }
    }
  }

  const setAllNodes = (show, nodes) => {
    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      if (node.publicNode.id !== 0) node.publicNode.show = show
    }
  }

  const handleSelectedNodes = () => {
    // console.log('handleSelectedNodes', props.selectedObjectIds)
    if (modelRef.current && cloneModelRef.current) {
      // console.log(cloneModelRef)
      let modelNodes = modelRef.current.cesiumElement._runtime.nodes
      let cloneNodes = cloneModelRef.current.cesiumElement._runtime.nodes;
      switch (props.mode) {
        case 'Show only selected':
          setAllNodes(false, cloneNodes)
          setAllNodesShowExceptId(props.selectedObjectIds[0], modelNodes, true)
          break;
        case 'Select elements':
          setAllNodesExceptIds(props.selectedObjectIds, cloneNodes, true)
          break;
      
        default:
          if (!props.selectedObjectIds.length) setAllNodes(false, cloneNodes)
          else setAllNodesExceptIds(props.selectedObjectIds, cloneNodes, true)
          break;
      }
    }
  }

  const handleSelectedIds = useMemo(() => handleSelectedNodes(), [props.selectedObjectIds])
  const handleModelMouseDown = (m, t) => {
    // console.log(m)

  }
  // console.log(modelResource)
  // console.log(modelMatrix)
  if (modelResource) {
    handleSelectedIds

    return <>
    {/* CLONE */}
    <Model
        url={modelResource}
        ref={cloneModelRef}
        modelMatrix={modelMatrix}
        minimumPixelSize={128}
        maximumScale={20000}
        color={getColor(props.color, alpha)}
        // colorBlendMode="Highlight"
        colorBlendAmount={1}
        onClick={(movement, target) => handleModelClick(movement, target, 'clone')}
        onMouseDown={(movement, target) => props.handleModelMouseDown(movement, target, props.model.name)}
        // onMouseMove={(m, t) => console.log(m, t, props.model.name)}
        // silhouetteColor={props.silhouetteColor}
        // silhouetteColor={silhouetteColor ? getColor(silhouetteColor, silhouetteAlpha) : {}}
        // silhouetteSize={props.silhouetteSize}
        show={show}
        onReady={(model) => {
          console.log('Clone Model ready', model)
          // const namedNodes = model.gltf.nodes.filter(node => node.name !== undefined)
          const nodesByName = model._runtime.nodesByName;
          const nodes = model._runtime.nodes;
          // console.log(Object.keys(nodes))
          // console.log(nodes)
          const nodesData = Object.keys(nodes).map((key, index) => {
            // console.log(index)
            const node = nodes[index];
            // console.log(node)
            let nodeBoudingSphere
            if (node.commands && node.commands[0]) {
              nodeBoudingSphere = node.commands[0].boundingSphere
              // console.log('FOUND COMMAND', node)

            } else {
              // console.log('NOT FOUND COMMAND', node)
            }
            if (node.publicNode.id !== 0) node.publicNode.show = false
            return {
              bid: props.bridge.bid,
              span_id: null,
              object_id: node.publicNode.id,
              boundingSphere: nodeBoudingSphere,
              name: node.publicNode.name,
            }
          })

          props.onModelLoad(nodesData)
          
        }}
        // color={getColor('red', 1)}

      />
      <Model
        url={modelResource}
        ref={modelRef}
        modelMatrix={modelMatrix}
        minimumPixelSize={128}
        maximumScale={20000}
        color={getColor('white', alpha)}
        onClick={(movement, target) => handleModelClick(movement, target, props.model.name)}
        onMouseDown={(movement, target) => props.handleModelMouseDown(movement, target, props.model.name)}
        show={show}
        onReady={(model) => {
          console.log('Model ready', model)
          // // const namedNodes = model.gltf.nodes.filter(node => node.name !== undefined)
          // const nodesByName = model._runtime.nodesByName
          // const nodesData = Object.keys(nodesByName).map(key => {
          //   const node = nodesByName[key]
          //   console.log(node.publicNode.id == 11)
          //   if (node.publicNode.id !== 0) node.publicNode.show = false
          //   return {
          //     bid: props.bridge.bid,
          //     span_id: null,
          //     object_id: node.publicNode.id,
          //     boundingSphere: {
          //       center: node.commands[0].command.boundingVolume.center,
          //       radius: 50
          //     },
          //     name: node.publicNode.name,
          //   }
          // })

          // props.onModelLoad(nodesData)
        }}
      />



  </>

  } else {
    return <></>
  }





}

export default memo(ModelComponent)
