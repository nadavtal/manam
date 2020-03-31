import React, { useState, useRef, memo, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader/root';
import {
  makeSelectRoles,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import {
  BoundingSphere,
  Cartesian3,
  ArcGisMapServerImageryProvider,
  createOpenStreetMapImageryProvider,
  createWorldImagery,
  Color,
} from 'cesium';
import * as actions from './actions';
import { editElement, updateElements } from '../BridgePage/actions';
import {
  Viewer,
  Entity,
  EntityDescription,
  PointGraphics,
  PointPrimitiveCollection,
  PointPrimitive,
  LabelCollection,
  Camera,
  Label,
  ImageryLayer,
  Cesium3DTileset,
  KmlDataSource,
  CesiumWidget,
} from 'resium';
import { getColor } from './cesiumUtils';
import {
  getSelectedElements,
  getElementsGroups,
  getBridgeElements,
  getBridge,
  getSelectedObjectIds,
  getElementsTypes,
  getBridgeSpans,
  getBridgeModels,
  getMode
} from '../BridgePage/selectors';
import  useKey  from '../../utils/customHooks/useKey';
import useHover from '../../utils/customHooks/useHover'
import CustomSlider from '../../components/Slider/Slider';
import Polyline from './Polyline';
import Polygone from './Polygone';
import TileSet from './TileSet';
import NameOverLay from './NameOverLay';
import RightClickMenu from './RightClickMenu';
import MeasureLine from './MeasureLine';
import ModelComponent from './ModelComponent';
// import PointPrimitive from './PointPrimitive';
import GeoJsonMarker from './GeoJsonMarker';
import ResiumToolBar from '../../components/ResiumToolBar/ResiumToolBar';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import Input from '../../components/Input/Input';
import './Resium.css';
const key = 'resium';

export const convertCartesianToDegrees = (point, ellipsoid) => {
  // console.log(point)
  const cartographic = ellipsoid.cartesianToCartographic(point);
  const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
    10,
  );
  const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
    10,
  );
  const heightString = cartographic.height.toFixed(2);
  return {
    lon: parseFloat(longitudeString),
    lat: parseFloat(latitudeString),
    height: parseFloat(heightString),
  };
};
const resium = props => {
  
  // console.log(Camera)

  useInjectReducer({ key, reducer });

  const [selectedItem, setSelectedItem] = useState(
    props.models.length ? props.models[0].name : '',
  );
  const [labels, setLabels] = useState([]);
  const [points, setPoints] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [polygones, setPolygones] = useState([]);
  const [movingPolylinePositions, setmovingPolylinePositions] = useState();
  const [closingPolylinePositions, setclosingPolylinePositions] = useState();
  const [pointsCollection, setPointsCollection] = useState(null);
  const [pointsPrimitives, setPointsPrimitives] = useState([]);
  const [color, setColor] = useState('red');
  const [silhouetteColor, setSilhouetteColor] = useState('red');
  const [silhouetteSize, setSilhouetteSize] = useState(1);
  const [silhouetteAlpha, setSilhouetteAlpha] = useState(1);
  const [degrees3dArray, setDegrees3dArray] = useState([])
  const [degrees2dArray, setDegrees2dArray] = useState([])
  const [alpha, setAlpha] = useState(1);
  const [calibrationState, setCalibrationState] = useState(null);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [multiplier, setMultiplier] = useState(100000);
  const [step, setStep] = useState(5);
  const [rotationStep, setRotationStep] = useState(1);
  const [rotationMultiplier, setRotationMultiplier] = useState(1);
  const [tileSetBoundingSphere, setTileSetBoundingSphere] = useState();
  const [showOverLay, setShowOverLay] = useState(false);
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [overLayName, setOverLayName] = useState('');
  const [overLayPosition, setOverLayPosition] = useState({});
  const [toolBarOpen, settoolBarOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({});
  const [entityTitle, setEntityTitle] = useState(props.bridge.name);
  const [entitySubTitle, setEntitySubTitle] = useState('');
  const [entityDescription, setEntityDescription] = useState('');
  let viewer, camera, scene, globe, geodesic, ellipsoid;
  
 
  let distanceLabel, verticalLabel, horizontalLabel;

  let LINEPOINTCOLOR = Cesium.Color.RED;
  let CENTERPOINTCOLOR = Cesium.Color.GREEN;
  let CLOSINGLINECOLOR = Cesium.Color.GREEN;
  let LINECOLOR = Cesium.Color.WHITE;
  let label = {
    font: '12px sans-serif',
    showBackground: true,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.CENTER,
    pixelOffset: new Cesium.Cartesian2(0, 0),
    eyeOffset: new Cesium.Cartesian3(0, 0, -0.5),
    fillColor: Cesium.Color.WHITE,
  };
  const viewerRef = useRef(null);
  // let viewer
  useEffect(() => {
    viewer = viewerRef.current.cesiumElement;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    scene = viewer.scene;
    setPointsCollection(
      scene.primitives.add(new Cesium.PointPrimitiveCollection()),
    );
    setPolylines(
      scene.primitives.add(new Cesium.PolylineCollection()),
    );

    document.addEventListener('contextmenu', function(e) {
      // e.preventDefault()
    });
    if (props.background) {
      const point = Cesium.Cartesian3.fromDegrees(props.background.lon, props.background.lat)
      zoomToPoint(point, 100);
      // if (props.models.length) setModelsControlerStates(props.models)
    }
  }, [viewerRef]);

  useEffect(() => {
    
    let calibrationObj = {};
    // console.log(props.models);
    if (props.models.length) setModelsControlerStates(props.models);
  }, [props.models]);
  useEffect(() => {
    // const computeViewRectangle = viewerRef.current.cesiumElement.scene.camera.computeViewRectangle(
    //   ellipsoid,
    // );
    // // console.log(pitch)
    // const rectangleCameraCoordinates = viewerRef.current.cesiumElement.scene.camera.getRectangleCameraCoordinates(
    //   computeViewRectangle,
    // );
    // console.log(props.boundingSphere)
    if (props.boundingSphere && viewerRef && props.mode === 'Zoom to element') {
      console.log('BOUDINGSPHERE CHANGED!!!', props.boundingSphere.center);
      const distanceToBoundingSphere = viewerRef.current.cesiumElement.scene.camera.distanceToBoundingSphere(
        props.boundingSphere,
      );
      // addPoint(props.boundingSphere.center)
      // console.log('alksjdlaskjdlakjsldkjalkdsjdl')
      // viewerRef.current.cesiumElement.scene.camera.viewBoundingSphere(props.boundingSphere);
      // viewerRef.current.cesiumElement.scene.camera.lookAt(props.boundingSphere.center, rectangleCameraCoordinates);
      const currentView = getCurrentViewData();
      // console.log(currentView)
      const center = Cesium.Cartesian3.fromDegrees(-72.0, 40.0);
      const heading = Cesium.Math.toRadians(50);
      const pitch = Cesium.Math.toRadians(-50);
      const range = 20.0;
      // const boundintSphereCenterPoint = pointsCollection.add({
      //   position: new Cesium.Cartesian3(
      //     props.boundingSphere.center.x,
      //     props.boundingSphere.center.y,
      //     props.boundingSphere.center.z,
      //   ),
      //   color: CENTERPOINTCOLOR,
      // });
      viewerRef.current.cesiumElement.scene.camera.lookAt(
        props.boundingSphere.center,
        new Cesium.HeadingPitchRange(
          currentView.heading,
          currentView.pitch,
          range,
        ),
      );
    }
  }, [props.boundingSphere]);
  useEffect(() => {
    const camera = viewerRef.current.cesiumElement.scene.camera;
    // console.log(props.viewData)
    // const heading = viewerRef.current.cesiumElement.scene.camera.heading
    // const pitch = viewerRef.current.cesiumElement.scene.camera.pitch
    // const computeViewRectangle = viewerRef.current.cesiumElement.scene.camera.computeViewRectangle(ellipsoid)
    // // console.log(pitch)
    // const rectangleCameraCoordinates = viewerRef.current.cesiumElement.scene.camera.getRectangleCameraCoordinates(computeViewRectangle)
    // console.log(props.boundingSphere)
    if (props.viewData && viewerRef && props.mode == 'Zoom to element') {
      console.log(props.viewData);
      console.log(props.boundingSphere.center);
      camera.lookAt(
        props.boundingSphere.center,
        new Cesium.HeadingPitchRange(
          props.viewData.heading,
          props.viewData.pitch,
          20,
        ),
      );
      // camera.viewRectangle(props.viewData, ellipsoid)
    }
  }, [props.viewData]);
  useEffect(() => {
    // if (points.length >= 3 && degrees3d && degrees3d.length) {
      console.log(polygones)
      polygones.length && polygones.map((polygonePoints, index) => {
        const polygone = addPolygoneEntity(polygonePoints, `Polygone ${index+1}`)
        // const degrees3d = createDegrees3dArray(polygonePoints)
        // console.log(degrees3d)
        // const cyanPolygon = viewer.entities.add({
        //   name: 'Cyan vertical polygon with per-position heights and outline',
        //   polygon: {
        //     hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(degrees3d),
        //     perPositionHeight: true,
        //     material: Cesium.Color.CYAN.withAlpha(0.5),
            
        //     outline: true,
        //     outlineColor: Cesium.Color.BLACK,
        //   },
        // });
    
        console.log(polygone)
      })
      // }
    return () => {
      
    }
  }, [polygones])
  useEffect(() => {
    console.log('selectedModels', props.selectedModels)
    console.log(calibrationState);
    if (calibrationState) {
      let updatedCalibrationState = {...calibrationState}
      let updatedItem = updatedCalibrationState[props.selectedModels];
      updatedItem.show = !updatedItem.show;
      updatedCalibrationState[props.selectedModels] = updatedItem;
      setCalibrationState(updatedCalibrationState);

    }
  }, [props.selectedModels])
  useEffect(() => {
    console.log('escape changed')
    setmovingPolylinePositions();
    setclosingPolylinePositions();
    setPolygones([]);
    setLabels([])
    setPointsPrimitives([]);
    if (pointsCollection && pointsCollection.length) pointsCollection.removeAll()
    if (viewer) viewer.entities.removeAll()
  }, [esc]);

  useEffect(() => {
    console.log('control changed')
    if (keyA === true) props.updateMode("Select elements");
    else {
      props.updateMode('')
    }
  }, [keyA]);
  const pickedEntities = new Cesium.EntityCollection();
  const pickColor = Cesium.Color.YELLOW.withAlpha(0.5);
  const shift = useKey('shift')
  const ctrl = useKey('control')
  const esc = useKey('escape');
  const keyA = useKey('a')  
  
  // const [polygoneRef, polygoneHovered] = useHover()
  if (viewerRef.current) {
    viewer = viewerRef.current.cesiumElement;
    camera = viewer.camera;
    scene = viewer.scene;
    globe = scene.globe;
    geodesic = new Cesium.EllipsoidGeodesic();
    ellipsoid = viewer.scene.globe.ellipsoid;
    
  }
  

  const setModelsControlerStates = models => {
    console.log('SETTING DATA', models)
    let calibrationObj = {};
    models.map((model, index) => {
      let calibrationData = null;
      let center = null;
      if (model.calibration_data && model.calibration_data !== 'undefined') {
        calibrationData = JSON.parse(model.calibration_data);
        center = JSON.parse(model.calibration_data);
      } else {
        calibrationData = {
          lon: props.bridge && props.bridge.lon? props.bridge.lon : props.background.lon, 
          lat: props.bridge && props.bridge.lat? props.bridge.lat : props.background.lat,
          height: props.bridge && props.bridge.height? props.bridge.height : props.background.height,
          'rotate-x': 0,
          'rotate-y': 0,
          'rotate-z': 0,
        };
        center = {
          lon: props.bridge && props.bridge.lon? props.bridge.lon : 0,
          lat: props.bridge && props.bridge.lat? props.bridge.lat : 0,
          height: 0,
        };
      }
      calibrationObj[`${model.name}`] = {
        calibrationData,
        center,
        show: true,
        alpha: 1,
      };
    });

    setCalibrationState(calibrationObj);
  };

  const getItem = (itemType, itemName) => {
    switch (itemType) {
      case 'models':
        return props.models.filter(model => model.name === itemName)[0];
      case 'tiles':
        return props.tiles.filter(tileSet => tileSet.name === itemName)[0];
    }
  };

  const handleSelectedEntityChanged = () => {
    if (!viewer || !viewerRef.current.cesiumElement) {
      return;
    }

    const selectedEntity = viewer.selectedEntity;

    if (selectedEntity) {
      // console.log('akjsdhkajshdkjasdh')
      // viewer.camera.flyToBoundingSphere(
      //   new BoundingSphere(selectedEntity.position.getValue(viewer.clock.currentTime), 1000),
      //   { duration: 1 }
      // );
    }
  };

  const handleActionFromResiumToolBar = (value, actionGroup, actionName, modelName,) => {
    console.log(
      'handleActionFromResiumToolBar',
      value,
      actionGroup,
      actionName,
      modelName,
    );
    switch (actionGroup) {

      case 'Models':
        let updatedCalibrationState = { ...calibrationState };
        let updatedItem;
        if (actionName === 'Alpha') {
          console.log('setting alpha ', value);
          updatedItem = { ...updatedCalibrationState[modelName] };
          updatedItem.alpha = value;
          console.log(updatedItem);
          updatedCalibrationState[modelName] = updatedItem;
          setCalibrationState(updatedCalibrationState);
          break;
        } else {
          updatedItem = { ...updatedCalibrationState[actionName] };
          updatedItem.show = value === 'true' || value == true ? false : true;
          updatedCalibrationState[actionName] = updatedItem;
          setCalibrationState(updatedCalibrationState);
          break;
        }
      case 'Views': 
        
        let heading
        let pitch
        let range
        switch (actionName) {
          case 'Top':
            heading = Cesium.Math.toRadians(-90);
            pitch = Cesium.Math.toRadians(-90.0);
            range = 130
            // camera.lookAt(
            //   tileSetBoundingCenter,
            //   new Cesium.HeadingPitchRange(
            //     heading,
            //     pitch,
            //     50,
            //   ),
            // );
            camera.flyToBoundingSphere(
              tileSetBoundingSphere,
              {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 0.5
              },
            );
            break;
          case 'Bottom':
            // heading = 0.2667257632392488;
            heading = Cesium.Math.toRadians(90);
            pitch = Cesium.Math.toRadians(90.0);
            range = 130
            camera.flyToBoundingSphere(
              tileSetBoundingSphere,
              {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 0.5
              },
            );
            break;
          case 'Front':
            heading = Cesium.Math.toRadians(0.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150
            camera.flyToBoundingSphere(
              tileSetBoundingSphere,
              {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 0.5
              },
            );
            break;
          case 'Back':
            heading = Cesium.Math.toRadians(180.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150
            camera.flyToBoundingSphere(
              tileSetBoundingSphere,
              {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 0.5
              },
            );
            break;
          case 'Left':
            heading = Cesium.Math.toRadians(90.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150
            camera.flyToBoundingSphere(
              tileSetBoundingSphere,
              {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 0.5
              },
            );
            break;
          case 'Right':
            heading = Cesium.Math.toRadians(270.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150
            camera.flyToBoundingSphere(
              tileSetBoundingSphere,
              {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 0.5
              },
            );
            break;
          
          default:
        
            break;
        }
      case 'Calibration':
        switch (actionName) {
          case 'Select entity':
            console.log(value);
            setSelectedItem(value);
            break;
          case 'Adust Accuracy':
            console.log(Math.pow(10, value));
            setMultiplier(Math.pow(10, value));
            setStep(value);
          default:
            let updatedCalibrationState = { ...calibrationState };
            let updatedItem = { ...updatedCalibrationState[selectedItem] };
            updatedItem.calibrationData[actionName.toLowerCase()] = value;
            // console.log(updatedItem, selectedItem)
            updatedCalibrationState[selectedItem] = updatedItem;
            console.log(updatedCalibrationState[selectedItem]);
            setCalibrationState(updatedCalibrationState);
            break;
        }
        break;
      case 'Rotate':
        switch (actionName) {
          case 'Select entity':
            // console.log(value)
            setSelectedItem(value);
            break;
          case 'Adust Accuracy':
            // console.log(Math.pow(10, value))
            console.log(value);
            setRotationMultiplier(Math.pow(10, value) / 10);
            setRotationStep(value);
            break;
          default:
            let updatedCalibrationState = { ...calibrationState };
            let updatedItem = { ...updatedCalibrationState[selectedItem] };
            console.log(updatedItem.calibrationData[actionName.toLowerCase()]);
            updatedItem.calibrationData[actionName.toLowerCase()] = value;
            // console.log(updatedItem, selectedItem)
            updatedCalibrationState[selectedItem] = updatedItem;
            console.log(updatedCalibrationState[selectedItem]);
            setCalibrationState(updatedCalibrationState);
            break;
        }
        break;
      case 'Colors':
        switch (actionName) {
          case 'Colors':
            if (value) {
              setColor(value);
            }

            break;
          case 'Alpha':
            setAlpha(value);

            // console.log(color)
            break;
          case 'Border Color':
            if (value) {
              setSilhouetteColor(value);
            }

            break;

          case 'Border alpha':
            setSilhouetteAlpha(value);

            // console.log(color)
            break;
          case 'Border size':
            setSilhouetteSize(value);

            // console.log(color)
            break;

          default:
            break;
        }
        break;
      case 'accuracy':
        console.log(Math.pow(10, value));
        setMultiplier(Math.pow(10, value));
        setStep(value);
        break;
      case 'sideAction':
        pointsCollection.removeAll();
        // viewer.entities.removeAll();
        props.updateMode(actionName);
        // setLabels([])
        break;
      case 'ResetView':
        //   camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.2, boundingSphere.radius * 4.0));
        // camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        //   viewer.zoomTo(tileCenter);
        break;
    }
  };

  const save = actionGroup => {
    let model = props.models.filter(model => model.name == selectedItem)[0];
    console.log(model);
    console.log(actionGroup);
    let calibrationData = calibrationState[selectedItem].calibrationData;
    console.log(calibrationData);

    model.calibration_data = JSON.stringify(calibrationData);
    props.save(model);
  };

  const reset = actionGroup => {
    // let model = props.models.filter(model => model.name == selectedItem)[0];

    // console.log(calibrationState[selectedItem].center)
    const updatedState = { ...calibrationState };
    const updatedItem = { ...updatedState[selectedItem] };
    updatedItem.calibrationData = { ...updatedItem.center };
    updatedState[selectedItem] = updatedItem;
    // console.log(updatedState)
    setCalibrationState(updatedState);
  };

  const handleTileSetReady = (tileset, modelName) => {
    console.log('TILE SET READY', tileset);
    setTileSetBoundingSphere(tileset.boundingSphere)
    viewerRef.current.cesiumElement.zoomTo(tileset);
    // setEllipsoid(tileset.ellipsoid);
    // addPoint(tileSetBoundingCenter);
    // console.log(Cartesian3.fromDegrees(-25.3994064331055, -31.7970504760742, 27.3268871307373))

    // addPoint(Cartesian3.fromDegrees(-25.3994064331055, -31.7970504760742, 27.3268871307373));
    //   tileset.style = new Cesium.Cesium3DTileStyle({
    //     color : {
    //         conditions : [
    //             // ['${Height} >= 100', 'color("purple", 0.5)'],
    //             // ['${Height} >= 50', 'color("red")'],
    //             ['true', 'color("blue")']
    //         ]
    //     },
    //     // show : '${Height} > 0',
    //     meta : {
    //         description : '"Building id ${id} has height ${Height}."'
    //     }
    // });
    // if (!calibrationState[modelName].calibrationData) {

    //   const ellipsoid = viewerRef.current.cesiumElement.scene.globe.ellipsoid;
    //   const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    //   // const centerCartesian = Cesium.Cartesian3.fromRadians(tileset.boundingSphere.center.x, tileset.boundingSphere.center.y, tileset.boundingSphere.center.z, ellipsoid);

    //   const calibrationData = {
    //     lon: Cesium.Math.toDegrees(cartographic.longitude),
    //     lat: Cesium.Math.toDegrees(cartographic.latitude),
    //     height: Cesium.Math.toDegrees(cartographic.height),
    //   }
    //   const updatedCalibrationState = {...calibrationState};
    //   updatedCalibrationState[modelName].calibrationData = calibrationData
    //   updatedCalibrationState[modelName].center = calibrationData;
    //   // console.log(updatedCalibrationState);
    //   // console.log(viewer.scene.primitives)
    //   // setCalibrationState(updatedCalibrationState)
    // }
  };

  // const pointsHtml = useMemo(
  //   () =>
  //     points.map((point, index) => {
  //       console.log(point);
  //       const ellipsoid = Cesium.Ellipsoid.WGS84;
  //       const position = convertCartesianToDegrees(point, ellipsoid);
  //       return (
  //         <Entity
  //           key={index}
  //           name={`Entity ${index + 1}`}
  //           position={point}
  //           selected={false}
  //         >
  //           <PointGraphics pixelSize={10} color={Color.GREEN} />

  //           <EntityDescription>
  //             {/* <h1>Hello world</h1> */}
  //             <p>X: {point.x}</p>
  //             <p>Y: {point.y}</p>
  //             <p>Z: {point.z}</p>
  //             <p>Lat: {position.lon}</p>
  //             <p>Lon: {position.lat}</p>
  //             <p>Height: {position.height}</p>
  //           </EntityDescription>
  //         </Entity>
  //       );
  //     }),
  //   points,
  // );

  const addPoint = point => {
    // console.log(m.position.x, m.position.y)
    // const viewer = viewerRef.current.cesiumElement

    // const cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(m.position.x, m.position.y), ellipsoid);
    console.log(point);
    setPoints([...points, point]);
  };

  const zoomToPoint = (point, range) => {
    const currentView = getCurrentViewData();
    console.log(point)
    viewerRef.current.cesiumElement.scene.camera.lookAt(
      point,
      new Cesium.HeadingPitchRange(
        currentView.heading,
        currentView.pitch,
        range,
      ),
    );
  };

  const handleViewerClick = (m, t) => {
    // setShowOverLay(true);
    // console.log(toolBarOpen)
    // if (toolBarOpen) 
    settoolBarOpen(!toolBarOpen)
    const cartesian = viewer.scene.pickPosition(m.position);
    const pickedFeature = viewer.scene.pick(m.position);
    // console.log(cartesian)
    switch (props.mode) {
      case 'Add entities':
        addPoint(cartesian);
        break;
      case 'Measure line':
        if (pickedFeature) {
            // console.log(props.boundingSphere)
            const initialGeoPosition = Cesium.Cartographic.fromCartesian(
              cartesian,
            );
            const lastGeoPosition = Cesium.Cartographic.fromCartesian(
              cartesian,
            );

            const newPositions = [
              new Cesium.Cartesian3.fromRadians(
                initialGeoPosition.longitude,
                initialGeoPosition.latitude,
                initialGeoPosition.height,
              ),
              new Cesium.Cartesian3.fromRadians(
                lastGeoPosition.longitude,
                lastGeoPosition.latitude,
                lastGeoPosition.height,
              ),
            ];
            setmovingPolylinePositions([cartesian, cartesian]);

          }
        drawMeasureLine(scene, viewer, pickedFeature, cartesian);

        break;
      case 'Measure polyline':
        if (pickedFeature) {
            // console.log(props.boundingSphere)
            setmovingPolylinePositions([cartesian, cartesian]);
            drawMeasurePolygone(scene, viewer, pickedFeature, cartesian);

          }
        

        break;
      case 'Measure polygone':
        if (pickedFeature) {
          setmovingPolylinePositions([cartesian, cartesian]);
          drawMeasurePolygone(scene, viewer, pickedFeature, cartesian);

        }
        break;
      case 'Zoom to element':

        if (pickedFeature) zoomToPoint(cartesian, 20)
        break;
      default:
        if (pickedFeature && pickedFeature.node) {
          props.onNodeSelected(pickedFeature.node, props.mode);
        }
        break;
    }
    setShowRightClickMenu(false);
    // if (props.addEntityMode) {
    //   // const cartesianPoint = viewer.camera.pickEllipsoid(
    //   //   new Cesium.Cartesian3(m.position.x, m.position.y),
    //   //   ellipsoid,
    //   // );
    //   console.log(m)
    //   const cartesian = viewer.scene.pickPosition(m.position);

    //   addPoint(cartesian);
    // } else {
    //   const pickedFeature = viewer.scene.pick(m.position);
    //   console.log(pickedFeature);
    //   if (pickedFeature && pickedFeature.node) {
    //     props.onNodeSelected(pickedFeature.node, props.selectNodesMode);
    //   }

    // }
  };

  const handleViewerRightClick = (m, t) => {
    setShowOverLay(false);
    // console.log(getCurrentViewData())
    const pickedFeature = viewer.scene.pick(m.position);
    const cartesian = viewer.scene.pickPosition(m.position);
    const degrees = convertCartesianToDegrees(cartesian, ellipsoid);
    if (!Cesium.defined(pickedFeature)) {
      setShowRightClickMenu(false);
    } else {
      setOverLayPosition({
        bottom: viewer.canvas.clientHeight - m.position.y,
        left: m.position.x,
        // lon: degrees.lon,
        // lat: degrees.lat,
        // height: degrees.height,
      });
      switch (props.mode) {
        case 'Add entities':
          
          break;
        case 'Measure line':
          
          if (!polylines.length) {
            // console.log(props.boundingSphere)
            
            setmovingPolylinePositions();
            break
          }
         
  
          break;
        case 'Measure polygone':
          // if (pickedFeature) {
            setmovingPolylinePositions();
            setclosingPolylinePositions();
            if (pointsPrimitives.length > 2)
            drawMeasurePolygone(scene, viewer, pickedFeature, pointsPrimitives[0].position);
           
            let polygonePoints = [];
            pointsPrimitives.map(point => polygonePoints.push(point.position))
            
            setPolygones([...polygones, polygonePoints]);
            setPointsPrimitives([]);
            pointsCollection.removeAll()
          // }
          break;
        case 'Select elements':
          if (!props.selectedObjectIds.length)
            setOverLayName('Id ' + pickedFeature.node.id);

          if (props.selectedObjectIds.includes(pickedFeature.node.id))
            setOverLayName('Ids ' + props.selectedObjectIds);
          else
            setOverLayName(
              'Ids ' + [...props.selectedObjectIds, pickedFeature.node.id],
            );
          
          setShowRightClickMenu(true);
          
          break;
        default:
          if (pickedFeature) {
            if (
              pickedFeature.node &&
              !props.selectedObjectIds.includes(pickedFeature.node.id)
            ) {
              props.onNodeSelected(pickedFeature.node);
            } else setOverLayName('No node');
            setOverLayName('Id ' + pickedFeature.node.id);
            setShowRightClickMenu(true);
            break;

          }
      }
      // if (m.position.x && m.position.y) {
        
      //   const degrees = convertCartesianToDegrees(cartesian3, ellipsoid);
      //   setOverLayPosition({
      //     bottom: viewer.canvas.clientHeight - m.position.y,
      //     left: m.position.x,
      //     // lon: degrees.lon,
      //     // lat: degrees.lat,
      //     // height: degrees.height,
      //   });
      //   if (
      //     pickedFeature.node &&
      //     !props.selectedObjectIds.includes(pickedFeature.node.id)
      //   ) {
      //     props.onNodeSelected(pickedFeature.node);
      //   } else setOverLayName('No node');
      //   if (props.selectNodesMode) {
      //     if (!props.selectedObjectIds.length)
      //       setOverLayName('Id ' + pickedFeature.node.id);

      //     if (props.selectedObjectIds.includes(pickedFeature.node.id))
      //       setOverLayName('Ids ' + props.selectedObjectIds);
      //     else
      //       setOverLayName(
      //         'Ids ' + [...props.selectedObjectIds, pickedFeature.node.id],
      //       );
           
      //     setShowRightClickMenu(true);
      //     return;
      //   } else if (props.selectNodeMode) {
      //     setOverLayName('Id ' + pickedFeature.node.id);
          
      //     setShowRightClickMenu(true);
      //   }
      // }
    }
    
    
    
  };

  const handleViewerMouseMove = (movement, t) => {
    // console.log(movement.endPosition.x)
    // console.log(movement.startPosition.x)

    const pickedFeature = viewerRef.current.cesiumElement.scene.pick(
      movement.startPosition,
    );
    // console.log(pickedFeature)
    if (!Cesium.defined(pickedFeature)) {
      document.getElementById('app').style.cursor = 'default';
      if (showOverLay) setShowOverLay(false);
    } else {
      document.getElementById('app').style.cursor = 'pointer';
      const cartesianEndposition = viewerRef.current.cesiumElement.scene.pickPosition(
        movement.endPosition,
      );
      const ellipsoid = Cesium.Ellipsoid.WGS84;
      const degrees = convertCartesianToDegrees(
        cartesianEndposition,
        ellipsoid,
      );
      
      if (movingPolylinePositions) {
        const newPositions = [movingPolylinePositions[0], cartesianEndposition];
        setmovingPolylinePositions(newPositions);
      }
      if (closingPolylinePositions) {
        const newPositions = [closingPolylinePositions[0], cartesianEndposition];
        setclosingPolylinePositions(newPositions);
      }

      setOverLayPosition({
        bottom:
          viewerRef.current.cesiumElement.canvas.clientHeight -
          movement.endPosition.y,
        left: movement.endPosition.x,
        lon: degrees.lon,
        lat: degrees.lat,
        height: degrees.height,
      });
      if (pickedFeature.node && pickedFeature.node.name) {
        if (pickedFeature.node.name !== overLayName)
          setOverLayName(pickedFeature.node.name);
      } else setOverLayName('No node');
      if (!showOverLay) setShowOverLay(true);
    }
  };

  const handleViewerMouseDown = (m, t) => {
    // console.log('handleViewerMouseDown', m, t)
  };

  const handleViewerMouseUp = (m, t) => {
    // console.log('handleViewerMouseUp', m, t)
  };

  const addCartasianToPointsCollection = (cartesian, pointCollection, color) => {
    
    return pointCollection.add({
      position: new Cesium.Cartesian3(
        cartesian.x,
        cartesian.y,
        cartesian.z,
      ),
      color: color,
    });
  }

  const addLineEntity = (positions) => {
    return viewer.entities.add({
      polyline: {
        positions: positions,
        followSurface: false,
        width: 3,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.ORANGE,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK,
        }),
        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.RED,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK,
        }),
      },
    });
  }
  const addPolygoneEntity = (polygonePoints, title) => {
    const degrees3d = createDegrees3dArray(polygonePoints)
    console.log(degrees3d)
    const cyanPolygon = viewer.entities.add({
      name: title,
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(degrees3d),
        perPositionHeight: true,
        material: Cesium.Color.CYAN.withAlpha(0.5),
        
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    return cyanPolygon
  }
  const getCartesianPositionsFromTwoCartographicPoints = (cartographic1, cartographic2) => {
    let positions = {
      distanceLinePositions: [
        new Cesium.Cartesian3.fromRadians(
          cartographic1.longitude,
          cartographic1.latitude,
          cartographic1.height,
        ),
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic2.height,
        ),
      ],
      horizontalLinePositions: [
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic2.height,
        ),
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic1.height,
        )
      ],
      verticalLinePositions: [
        new Cesium.Cartesian3.fromRadians(
          cartographic1.longitude,
          cartographic1.latitude,
          cartographic1.height,
        ),
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic1.height,
        ),
      ]
    }
    return positions
  }
  const getCartographicDistanceFromTwoCartasians = (cartesian1, cartesian2) => {

  }
  const drawMeasureLine = (scene, viewer, pickedFeature, cartesian) => {
    
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      if (scene.pickPositionSupported && Cesium.defined(pickedFeature)) {
        if (Cesium.defined(cartesian)) {          
          if (pointsCollection.length === 2) {
            
            pointsCollection.removeAll();
            
          }
          //add first point
          if (pointsCollection.length === 0) {
            const point1 = addCartasianToPointsCollection(cartesian, pointsCollection, LINEPOINTCOLOR)
            // console.log(point1)
            setPointsPrimitives([point1]);
            
          } //add second point and lines
          else if (pointsCollection.length === 1) {

            const point2 = addCartasianToPointsCollection(cartesian, pointsCollection, LINEPOINTCOLOR)
            
            const point1GeoPosition = Cesium.Cartographic.fromCartesian(pointsPrimitives[0].position);
            const point2GeoPosition = Cesium.Cartographic.fromCartesian(point2.position);
            const point3GeoPosition = Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(
                point2.position.x,
                point2.position.y,
                pointsPrimitives[0].position.z,
              ),
            );
            const positions = getCartesianPositionsFromTwoCartographicPoints(point1GeoPosition, point2GeoPosition)
            const distanceLine = addLineEntity(positions.distanceLinePositions)
            // const verticalLine = addLineEntity(positions.horizontalLinePositions)
            // const horizontalLine = addLineEntity(positions.verticalLinePositions)
            
            let labelZ;
            if (point2GeoPosition.height >= point1GeoPosition.height) {
              labelZ =
                point1GeoPosition.height +
                (point2GeoPosition.height - point1GeoPosition.height) / 2.0;
            } else {
              labelZ =
                point2GeoPosition.height +
                (point1GeoPosition.height - point2GeoPosition.height) / 2.0;
            }
            // console.log(point1GeoPosition);
            addDistanceLabel(
              pointsPrimitives[0],
              point2,
              labelZ,
              point1GeoPosition,
              point2GeoPosition,
            );
          }
        }
      }
    }
  };

  const drawMeasurePolygone = (scene, viewer, pickedFeature, cartesian) => {
    
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      if (scene.pickPositionSupported && Cesium.defined(pickedFeature)) {
        // console.log(cartesian);
        if (Cesium.defined(cartesian)) {
         
          if (pointsCollection.length === 0) {
            const point1 = addCartasianToPointsCollection(cartesian, pointsCollection, LINEPOINTCOLOR)
            setPointsPrimitives([point1]);
          } else {
            
            const point = addCartasianToPointsCollection(cartesian, pointsCollection, LINEPOINTCOLOR)
            const newPointsPrimitives = [...pointsPrimitives, point]
            
            setPointsPrimitives([...pointsPrimitives, point]);
            
            
            const firstPoint = pointsPrimitives[0];
            const firstPointGeoPosition = Cesium.Cartographic.fromCartesian(
              firstPoint.position,
            );
            const lastPoint = pointsPrimitives[pointsPrimitives.length - 1];
            const lastPointGeoPosition = Cesium.Cartographic.fromCartesian(
              lastPoint.position,
            );
            const newPointGeoPosition = Cesium.Cartographic.fromCartesian(
              point.position,
            );
            const heightGeoPosition = Cesium.Cartographic.fromCartesian(
              new Cesium.Cartesian3(
                point.position.x,
                point.position.y,
                lastPoint.position.z,
              ),
            );
            const positions = getCartesianPositionsFromTwoCartographicPoints(lastPointGeoPosition, newPointGeoPosition)
     
            const closingLinePositions = [
              new Cesium.Cartesian3.fromRadians(
                lastPointGeoPosition.longitude,
                lastPointGeoPosition.latitude,
                lastPointGeoPosition.height,
              ),
              new Cesium.Cartesian3.fromRadians(
                firstPointGeoPosition.longitude,
                firstPointGeoPosition.latitude,
                firstPointGeoPosition.height,
              ),
            ];
            const newLine = addLineEntity(positions.distanceLinePositions)
            console.log(newLine)
            let labelZ;
            if (newPointGeoPosition.height >= lastPointGeoPosition.height) {
              labelZ =
                lastPointGeoPosition.height +
                (newPointGeoPosition.height - lastPointGeoPosition.height) /
                  2.0;
            } else {
              labelZ =
                newPointGeoPosition.height +
                (lastPointGeoPosition.height - newPointGeoPosition.height) /
                  2.0;
            }
            
            if (newPointsPrimitives.length > 2) {
              
              setclosingPolylinePositions([firstPoint.position, point.position]);
              if (labels.length == polygones.length) {
                createLabel(newPointsPrimitives)
                
              } else {
                updateLabel(newPointsPrimitives);
              }
              
            }
            // if (props.mode == 'Measure polyline') 
            addDistanceLabel(
              lastPoint,
              point,
              labelZ,
              lastPointGeoPosition,
              newPointGeoPosition,
            );
          }
        }
      }
    }
  };

  const getAvg = (nums) => {
    // console.log(nums)
    var total = 0;
    for(var i = 0; i < nums.length; i++) {
        total += nums[i];
    }
   
    return total / nums.length;
  }

  const getCenterCartesian = (pointsPrimitives) => {
    let positionsX = [];
    let positionsY = [];
    let positionsZ = [];
    let avgX, avgY, avgZ;
    pointsPrimitives.forEach(point => {
      positionsX.push(point.position.x);
      positionsY.push(point.position.y);
      positionsZ.push(point.position.z);
    })
    const centerCartesian = {
      x: getAvg(positionsX),
      y: getAvg(positionsY),
      z: getAvg(positionsZ),
    }

    return centerCartesian
  }
  const getPolylineLength = (pointsPrimitives) => {
    let length = 0;
    for (let index = 0; index < pointsPrimitives.length; index++) {
      if (index !== 0) {
        const point1 = pointsPrimitives[index-1]
        const point2 = pointsPrimitives[index];
        point1.cartographic = ellipsoid.cartesianToCartographic(point1.position);
        point2.cartographic = ellipsoid.cartesianToCartographic(point2.position);
        const point1GeoPosition = Cesium.Cartographic.fromCartesian(
          point1.position,
        );
        const point2GeoPosition = Cesium.Cartographic.fromCartesian(
          point2.position,
        );
        console.log(point1, point2)
        const distance = getDistance(point1, point2, point1GeoPosition, point2GeoPosition);
        console.log(distance, typeof(distance))
        length += +distance
      }
      
    }
    
    return length.toFixed(2)
  }

  const updateLabel = (pointsPrimitives) => {
    let allLabels = [...labels]
    let currentLabel = allLabels[labels.length-1]
    const centerCartesian = getCenterCartesian(pointsPrimitives)
    currentLabel.position = centerCartesian;
    console.log(currentLabel)
    let text
    switch (props.mode) {
      case 'Measure polygone':
        text = `Area: `
        break;
      case 'Measure polyline':
        text = `Length: ${getPolylineLength(pointsPrimitives)}`
        break;
    
      default:
        break;
    }
    currentLabel.text = text
    setLabels(allLabels)
    
    
    // console.log(centerCartesian)
    // label.text = `Area: : `;
    // // 'Distance: ' +
    // // getDistance(point1, point2, point1GeoPosition, point2GeoPosition);
    // const centerLabel = viewer.entities.add({
    //   position: centerCartesian,
    //   label: label,
    // });
    
  }

  const createLabel = (pointsPrimitives) => {
    
    const centerCartesian = getCenterCartesian(pointsPrimitives)
    let text = ''
    switch (props.mode) {
      case 'Measure polygone':
        text = `Area: `
        break;
      case 'Measure polyline':
        text = `Length: ${getPolylineLength(pointsPrimitives)}`
        break;
    
      default:
        break;
    }
    
    setLabels([...labels, {text: text,  position: centerCartesian}])
    
    
    // console.log(centerCartesian)
    // label.text = `Area: : `;
    // // 'Distance: ' +
    // // getDistance(point1, point2, point1GeoPosition, point2GeoPosition);
    // const centerLabel = viewer.entities.add({
    //   position: centerCartesian,
    //   label: label,
    // });
    
  }
  
  function addDistanceLabel(point1, point2, height, point1GeoPosition, point2GeoPosition,
  ) {
    
    point1.cartographic = ellipsoid.cartesianToCartographic(point1.position);
    point2.cartographic = ellipsoid.cartesianToCartographic(point2.position);
    point1.longitude = parseFloat(Cesium.Math.toDegrees(point1.position.x));
    point1.latitude = parseFloat(Cesium.Math.toDegrees(point1.position.y));
    point2.longitude = parseFloat(Cesium.Math.toDegrees(point2.position.x));
    point2.latitude = parseFloat(Cesium.Math.toDegrees(point2.position.y));

    // label.text = 'Horizontal: ' + getHorizontalDistanceString(point1, point2);
    // horizontalLabel = viewer.entities.add({
    //   position: getMidpoint(point1, point2, point1GeoPosition.height),
    //   label: label,
    // });
    // console.log(Number.POSITIVE_INFINITY)
    label.disableDepthTestDistance = Number.POSITIVE_INFINITY;
    if (props.mode == 'Measure line') {
      label.text = `Distance: ${getDistance(point1,point2, point1GeoPosition, point2GeoPosition,
      )}
         Height difference: ${getVerticalDistanceString(point1GeoPosition, point2GeoPosition)}`;

    } else {
      label.text = getDistance(
        point1,
        point2,
        point1GeoPosition,
        point2GeoPosition,
      )
    }
    
    distanceLabel = viewer.entities.add({
      position: getMidpoint(point1, point2, height),
      label: label,
    });
    // console.log(label)
    // label.text =
    //   'Vertical: ' +
    //   getVerticalDistanceString(point1GeoPosition, point2GeoPosition);
    // verticalLabel = viewer.entities.add({
    //   position: getMidpoint(point2, point2, height),
    //   label: label,
    // });
  }

  function getHorizontalDistanceString(point1, point2) {
    geodesic.setEndPoints(point1.cartographic, point2.cartographic);
    const meters = geodesic.surfaceDistance.toFixed(2);
    if (meters >= 1000) {
      return (meters / 1000).toFixed(1) + ' км';
    }
    return meters + ' м';
  }

  function getVerticalDistanceString(point1GeoPosition, point2GeoPosition) {
    const heights = [point1GeoPosition.height, point2GeoPosition.height];
    const meters =
      Math.max.apply(Math, heights) - Math.min.apply(Math, heights);
    if (meters >= 1000) {
      return (meters / 1000).toFixed(1) + ' км';
    }
    return meters.toFixed(2) + ' м';
  }

  function getDistance(
    point1,
    point2,
    point1GeoPosition,
    point2GeoPosition,
  ) {
    geodesic.setEndPoints(point1.cartographic, point2.cartographic);
    const horizontalMeters = geodesic.surfaceDistance.toFixed(2);
    const heights = [point1GeoPosition.height, point2GeoPosition.height];
    const verticalMeters =
      Math.max.apply(Math, heights) - Math.min.apply(Math, heights);
    const meters = Math.pow(
      Math.pow(horizontalMeters, 2) + Math.pow(verticalMeters, 2),
      0.5,
    );

    if (meters >= 1000) {
      // return (meters / 1000).toFixed(1) + ' км';
      return (meters / 1000).toFixed(2);
    }
    // return meters.toFixed(2) + ' м';
    return meters.toFixed(2);
  }

  function getMidpoint(point1, point2, height) {
    
    const scratch = new Cesium.Cartographic();
    geodesic.setEndPoints(point1.cartographic, point2.cartographic);
    const midpointCartographic = geodesic.interpolateUsingFraction(
      0.5,
      scratch,
    );
    return Cesium.Cartesian3.fromRadians(
      midpointCartographic.longitude,
      midpointCartographic.latitude,
      height,
    );
  }

  const getCameraDistanceFromBoundingSphere = (boundingSphere) => {
    return viewerRef.current.cesiumElement.scene.camera.distanceToBoundingSphere(
      boundingSphere,
    );
  }

  const getCurrentViewData = () => {
    const heading = viewerRef.current.cesiumElement.scene.camera.heading;
    const pitch = viewerRef.current.cesiumElement.scene.camera.pitch;
    // console.log(camera)
    // console.log(Cesium.Math.fromRadians(heading))
    // console.log(Cesium.Math.fromRadians(pitch))
    const computeViewRectangle = viewerRef.current.cesiumElement.scene.camera.computeViewRectangle(
      ellipsoid,
    );
    return { heading, pitch };
    // return computeViewRectangle
  };
  const handleRightMenuClick = (
    action,
    elementType,
    elementGroupId,
    spanId,
  ) => {
    console.log(action, elementType, elementGroupId, spanId);
    let updatedElements = [...props.bridgeElements];
    switch (action) {
      case 'Allocate to Span':
        let elementsToUpdate = [];
        for (const id of props.selectedObjectIds) {
          let updatedElement = updatedElements.find(el => el.object_id == id);
          updatedElement.span_id = spanId;
          updatedElement.element_group_id = elementGroupId;
          updatedElement.element_type_id = elementType.id;
          updatedElement.primary_unit = elementType.primary_unit;
          updatedElement.secondary_unit = elementType.secondary_unit;
          updatedElement.importance = elementType.importance;
          updatedElement.detailed_evaluation_required =
            elementType.detailed_evaluation_required;
          updatedElement.remarks = elementType.remarks;

          console.log(updatedElement);
          elementsToUpdate.push(updatedElement);
        }
        // console.log(updatedElements)
        props.updateElements(elementsToUpdate);
        break;
      case 'Set view to element':
        const viewData = getCurrentViewData();
        console.log(viewData);
        let updatedElement = updatedElements.find(
          el => el.object_id == props.selectedObjectIds[0],
        );
        updatedElement.default_view_data = JSON.stringify(viewData);
        console.log(updatedElement);
        props.editElement(updatedElement);
        break;
      default:
        break;
    }
    setShowRightClickMenu(false);
  };

  const setViewToElement = objecId => {
    console.log(objecId);
  };

  const makeProperty = (entity, color) => {
    const colorProperty = new Cesium.CallbackProperty(function(time, result) {
        if (pickedEntities.contains(entity)) {
            return pickColor.clone(result);
        }
        return color.clone(result);
    }, false);

    entity.polygon.material = new Cesium.ColorMaterialProperty(colorProperty);
  }

  const createDegrees3dArray = (points) => {
    let degrees = []
    points.map(point => {
      // console.log(point)
      const pointDegrees = convertCartesianToDegrees(point, Cesium.Ellipsoid.WGS84);
      degrees.push(pointDegrees.lon)
      degrees.push(pointDegrees.lat)
      degrees.push(pointDegrees.height)
    })
    return degrees
    // setDegrees3dArray(degrees)
  }
  const createDegrees2dArray = (points) => {
    let degrees = []
    return points.map(point => {
      const pointDegrees = convertCartesianToDegrees(point, Cesium.Ellipsoid.WGS84);
      degrees.push(pointDegrees.lon)
      degrees.push(pointDegrees.lat)
      setDegrees2dArray(degrees)
    })
  }

  const models = props.models.map(model => {
    if (model.type === 'cad') {
      // console.log('running models', calibrationState)
      
      if (calibrationState) {
        const center = calibrationState[model.name].center;
        const alpha = calibrationState[model.name].alpha;

        return (
          <ModelComponent
            key={model.id}
            model={model}
            mode={props.mode}
            bridge={props.bridge}
            onModelLoad={nodes => {props.onModelLoad(nodes)}}
            calibrationData={calibrationState[model.name]}
            viewerRef={viewerRef}
            silhouetteColor={getColor(silhouetteColor, silhouetteAlpha)}
            silhouetteSize={silhouetteSize}
            color={color}
            selectedObjectIds={props.selectedObjectIds}
            handleModelClick={(m, t, modelName) =>
              handleModelClick(m, t, modelName)
            }
            handleModelMouseMove={(m, t, modelName) =>
              handleModelMouseMove(m, t, modelName)
            }
            handleModelMouseDown={(m, t, modelName) =>
              setSelectedItem(modelName)
            }
          />
        );
      } else {
        return <></>;
      }
    }
  });

  const tiles = props.models.map(model => {
    // console.log('running tiles')
    if (calibrationState) {
      if (model.type === 'model') {
       
        return (
          <TileSet
            key={model.name}
            item={model}
            viewerRef={viewerRef}
            onReady={tileSet => handleTileSetReady(tileSet, model.name)}
            calibrationData={calibrationState[model.name]}
            tileType={model.type}
            colorBlendAmount={1}
            colorBlendMode={Cesium.Cesium3DTileColorBlendMode.MIX}
            handleModelMouseDown={(m, t, modelName) =>
              setSelectedItem(modelName)
            }
            addPoint={point => console.log(point)}
          />
        );
      }
    } else {
      return <></>;
    }
  });
  
// console.log(calibrationState)
  return (
    <Viewer
      full
      ref={viewerRef}
      timeline={false}
      baseLayerPicker={false}
      onSelectedEntityChange={handleSelectedEntityChanged}
      selectionIndicator={false}
      animation={false}
      fullscreenButton={false}
      onClick={(m, t) => handleViewerClick(m, t)}
      onRightClick={(m, t) => handleViewerRightClick(m, t)}
      onMouseMove={(m, t) => handleViewerMouseMove(m, t)}
      onMouseDown={(m, t) => handleViewerMouseDown(m, t)}
      onMouseUp={(m, t) => handleViewerMouseUp(m, t)}
    >
      
      {calibrationState && (
        <>
          {props.models.length && models}
          {props.models.length && tiles}
          <div id="measureContainer" />
          <ResiumToolBar
            toolBarOpen={toolBarOpen}
            bridge={props.bridge}
            models={props.models}
            calibrationData={calibrationState}
            mode={props.mode}
            multiplier={multiplier}
            step={step}
            rotationMultiplier={rotationMultiplier}
            rotationStep={rotationStep}
            selectedItem={selectedItem}
            selectedColor={color}
            position="top"
            onAction={(event, actionGroup, actionName, modelName) =>
              handleActionFromResiumToolBar(
                event,
                actionGroup,
                actionName,
                modelName,
              )
            }
            save={actionGroup => save(actionGroup)}
            reset={actionGroup => reset(actionGroup)}
          />

          {/* <PointPrimitiveCollection modelMatrix={Transforms.eastNorthUpToFixedFrame(center)}> */}
          {/* {pointsHtml} */}
          {/* {polygones.length && polygones.map((polygonePoints, index) => {
            // const degreesArray = createDegrees3dArray(polygonePoints);
            // const polygone = viewer.entities.add({
            //   name: 'Cyan vertical polygon with per-position heights and outline',
            //   polygon: {
            //     hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(degreesArray),
            //     perPositionHeight: true,
            //     material: Cesium.Color.CYAN.withAlpha(0.5),
                
            //     outline: true,
            //     outlineColor: Cesium.Color.BLACK,
            //   },
            // });
            // console.log(polygone)
            return  <Polygone
              // ref={polygoneRef}
              key={index}
              viewer={viewerRef.current.cesiumElement}
              type="3D"
              points={polygonePoints}
            />
          })} */}
          {(movingPolylinePositions && 
            (props.mode === 'Measure line' || props.mode === 'Measure polygone' || props.mode === 'Measure polyline')) && (
            <Polyline
              flyTo={false}
              center={Cesium.Cartesian3.fromDegrees(34.91307, 32.41295)}
              viewer={viewerRef.current.cesiumElement}
              color={LINECOLOR}
              positions={movingPolylinePositions}
              // points={points.map(point =>
              //   convertCartesianToDegrees(point, ellipsoid),
              // )}
            />
          )}
          {(closingPolylinePositions && props.mode === 'Measure polygone' && (
            <Polyline
              flyTo={false}
              center={Cesium.Cartesian3.fromDegrees(34.91307, 32.41295)}
              viewer={viewerRef.current.cesiumElement}
              color={CLOSINGLINECOLOR}
              positions={closingPolylinePositions}
              // points={points.map(point =>
              //   convertCartesianToDegrees(point, ellipsoid),
              // )}
            />
          ))}
          <LabelCollection modelMatrix={viewer.scene.primitives._primitives[1].modelMatrix}>
            {labels.map((label, index) => <Label 
              key={index}
              fillColor={Color.ORANGE} 
              position={label.position} 
              text={label.text} 
              font='12px sans-serif'
              showBackground= {true}
              disableDepthTestDistance={Number.POSITIVE_INFINITY}
              // distanceDisplayCondition={0.5}
              horizontalOrigin= {Cesium.HorizontalOrigin.CENTER}
              verticalOrigin= {Cesium.VerticalOrigin.CENTER}
              pixelOffset= {new Cesium.Cartesian2(0, 0)}
              eyeOffset= {new Cesium.Cartesian3(0, 0, -0.5)}
              fillColor= {Cesium.Color.WHITE}/>)}
            

          </LabelCollection>
          <MeasureLine />
          <NameOverLay
            name={overLayName}
            show={showOverLay}
            position={overLayPosition}
          />
          <RightClickMenu
            name={overLayName}
            menuOptions={props.bridgeSpans}
            menuSubOptions={props.elementsGroups}
            menuSubSubOptions={props.elementsTypes}
            onOptionClick={(elementType, elementGroup, spanId) =>
              handleRightMenuClick(
                'Allocate to Span',
                elementType,
                elementGroup,
                spanId,
              )
            }
            setViewToElement={() =>
              handleRightMenuClick(
                'Set view to element',
                props.selectedObjectIds[0],
              )
            }
            show={showRightClickMenu}
            position={overLayPosition}
            onLeave={() => setShowRightClickMenu(false)}
          />
          <Camera flyToBoundingSphere={props.boundingSphere} />
          {/* <CameraFlyTo
              duration={5}
              destination={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
              // flyToBoundingSphere={props.boundingSphere, {}}
              /> */}
        </>
      )}

      {/* </PointPrimitiveCollection> */}
    </Viewer>
  );
};

const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return {
    currentUser: state.global.currentUser,
    mode: getMode(state),
    selectedObjectIds: getSelectedObjectIds(state),
    elementsGroups: getElementsGroups(state),
    elementsTypes: getElementsTypes(state),
    bridgeSpans: getBridgeSpans(state),
    bridgeElements: getBridgeElements(state),
    bridge: getBridge(state),
    // models: getBridgeModels(state),
    // boundingSphere: state.resiumReducer.boundingSphere,
    // showRightClickMenu: state.resiumReducer.showRightClickMenu,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    updateMode: mode => dispatch(actions.updateResiumMode(mode)),
    onNodeSelected: (node, selectMultiple) =>
      dispatch(actions.elementSelected(node.id, selectMultiple)),
    onRightMenuOptionClick: (action, data) =>
      dispatch(actions.onRightMenuOptionClick(action, data)),
    editElement: element => dispatch(editElement(element)),
    updateElements: element => dispatch(updateElements(element)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  hot,
)(resium);
// export default hot(memo(resium))
