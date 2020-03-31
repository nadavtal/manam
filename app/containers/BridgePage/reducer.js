
import produce from 'immer';
import * as actionTypes from './constants';
import { NODE_SELECTED, UPDATE_RESIUM_MODE, ON_RIGHT_MENU_OPTION_CLICK, ELEMENTS_SELECTED, MODEL_SELECTED } from '../Resium/constants';
import { ORG_TECH_INFO_LOADED } from '../appData/constants'
// The initial state of the App
// import { initialState } from 'containers/App/reducer'
export const initialState = {

    project: {},
    bridgeUsers: [],
    bridgeSurveys: [],
    bridge: {},
    actionGroups: [
      { groupName: 'Reports',
        actions: []
      },
      { groupName: 'Download',
      actions: [
        {name: 'Download images', actionType: 'download', icon: 'images', action: 'DOWNLOAD_IMAGES'},
        {name: 'Download cad model', actionType: 'download', icon: 'cube', action: 'DOWNLOAD_CAD_MODEL'},
        {name: 'Download 3d tileset', actionType: 'download', icon: 'cubes', action: 'DOWNLOAD_3D_TILESET'},
        {name: 'Download flight plan', actionType: 'download', icon: 'helicopter', action: 'DOWNLOAD_FLIGHT_PLANS'},
      ]
      },
      { groupName: 'Upload',
        actions: [
          {name: 'Upload images', actionType: 'upload', icon: 'images', action: 'UPLOAD_IMAGES'},
          {name: 'Upload cad model', actionType: 'upload', icon: 'cube', action: 'UPLOAD_CAD_MODEL'},
          {name: 'Upload 3d tileset', actionType: 'upload', icon: 'cubes', action: 'UPLOAD_3D_TILESET'},
          {name: 'Upload flight plan', actionType: 'upload', icon: 'helicopter', action: 'UPLOAD_FLIGHT_PLANS'},
        ]
      },
      { groupName: 'Export',
        actions: []
      },
      { groupName: 'Maps',
        actions: []
      },
      { groupName: 'Tags',
        actions: []
      },
      { groupName: 'Summary',
        actions: []
      },
      { groupName: 'Analyze',
        actions: []
      },
      { groupName: 'Layout',
        actions: []
      },
    ],
    bridgeLoaded: true,
    mainViewComponent: 'Resium',
    secondaryViewComponent: 'projectData',
    bottomViewComponent: 'elementForm',
    showBottomView: false,
    editMode: 'edit',
    selectedForm: {},
    selectedProcess: {},
    cadModelId: '',
    digitalTwinUrl: '',
    bridgeProcesses: [],
    bridgeTasks: [],
    mode: '',
    selectedElement: '',
    selectedObjectIds: [],
    selectedModels: [],
    boundingSphere: null,
    viewData: null,
    bridgeTiles: [
      // {ID: "1", name: 'Bridge9', url: 'http://vm1.manam.co.il/manam/3d/Bridge9/Scene/Production_2_cesium.json'},
      // {ID: "2", name: 'US_Bridge2', url: 'http://vm1.manam.co.il/manam/3d/US_Bridge2/Scene/Production_2_ces.json'},
      // {ID: "3", name: 'Arroyo', url: 'http://vm1.manam.co.il/manam/3d/Arroyo/Scene/Production_1_cesium.json'},
      // {ID: "4", name: 'Bridge_road6', url: 'http://vm1.manam.co.il/manam/3d/Bridge_road6/Scene/Production_2_cesium_1.json'},
    ],
    bridgeModels: [
      // {ID: "1", name: 'Road_9_Bridge_28_colors33', url: 'http://vm1.manam.co.il/manam/3d/GLB/Road_9_Bridge_28_colors33.glb', ion_id: 66750},
      // {ID: "2", name: 'Road6_v01', url: 'http://vm1.manam.co.il/manam/3d/GLB/Road6_v01.glb', ion_id: 68686},
      // {ID: "3", name: 'test_bridge9_200819', url: 'http://vm1.manam.co.il/manam/3d/GLB/test_bridge9_200819.glb'},
    ],
    bridgeSpans: [],
    bridgeElements: [],
    bridgeNodes: [

    ],
    bridgeImages: [
      {ID: "1", name: 'Road_9_Bridge_28_colors33', url: 'http://images.amcnetworks.com/bbcamerica.com/wp-content/uploads/2013/11/UK-Bridges-Forth-Bridge--1600x720.jpg'},
      {ID: "2", name: 'Road6_v01', url: 'https://d2qq3nlndk9vv6.cloudfront.net/images_dynam/image_zoomed/wb_bridge_theriverdonaustadtbrcke_bearb.jpg'},
      {ID: "3", name: 'test_bridge9_200819', url: 'https://media.buzzle.com/media/images-en/gallery/architecture/bridges/famous-bridges/1200-470676971-tower-bridge-in-london.jpg'},
      {ID: "4", name: 'Road_9_Bridge_28_colors33', url: 'https://twistedsifter.files.wordpress.com/2018/01/004_.jpg'},
      {ID: "5", name: 'Road6_v01', url: 'https://images.indianexpress.com/2018/02/howrah-bridge-pp-ie.jpg?w=759&h=314&imflag=true'},
      {ID: "6", name: 'test_bridge9_200819', url: 'http://www.ghafla.com/gh/wp-content/uploads/sites/6/2018/04/Banpo-Bridge-Seoul-South-Korea.jpg'},
      {ID: "7", name: 'Road_9_Bridge_28_colors33', url: 'https://www.puntcambridge.co.uk/wp-content/uploads/2016/12/kitchen_bridge.jpg'},
      {ID: "8", name: 'Road6_v01', url: 'https://www.puntcambridge.co.uk/wp-content/uploads/2016/12/kitchen_bridge.jpg'},
      {ID: "9", name: 'test_bridge9_200819', url: 'http://static-41.sinclairstoryline.com/resources/media/88d16968-48a6-4607-8480-9d323c73856e-large16x9_SkyBridge04648.jpg?1556735794171'},
      {ID: "10", name: 'Road_9_Bridge_28_colors33', url: 'https://3.bp.blogspot.com/-z66JdGTc38E/Tir4kwvP97I/AAAAAAAAAss/qx8lW2wh9Ag/s1600/sydney_harbour_bridge-wide.jpg'},
      {ID: "11", name: 'Road6_v01', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Edmund_Pettus_Bridge%2C_Selma_AL%2C_North_view_20160713_1.jpg/1024px-Edmund_Pettus_Bridge%2C_Selma_AL%2C_North_view_20160713_1.jpg'},
      {ID: "12", name: 'test_bridge9_200819', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Edmund_Pettus_Bridge%2C_Selma_AL%2C_North_view_20160713_1.jpg/1024px-Edmund_Pettus_Bridge%2C_Selma_AL%2C_North_view_20160713_1.jpg'},
    ],
    bridge3dImages: [
      {ID: "1", name: 'Bridge_9_1', url: 'Bridge_9_1.jpg'},
      {ID: "2", name: 'Bridge_9_2', url: 'Bridge_9_2.jpg'},
      {ID: "3", name: 'Bridge_9_3', url: 'Bridge_9_3.jpg'},
      {ID: "4", name: 'Bridge_9_4', url: 'Bridge_9_4.jpg'},
      {ID: "5", name: 'Bridge_9_5', url: 'Bridge_9_5.jpg'},
      {ID: "6", name: 'Bridge_9_6', url: 'Bridge_9_6.jpg'},
      {ID: "7", name: 'Bridge_9_7', url: 'Bridge_9_7.jpg'},
      {ID: "8", name: 'Bridge_9_8', url: 'Bridge_9_8.jpg'},
      {ID: "9", name: 'Bridge_9_9', url: 'Bridge_9_9.jpg'},
      {ID: "10", name: 'Bridge_9_10', url: 'Bridge_9_10.jpg'},
      {ID: "11", name: 'Bridge_9_11', url: 'Bridge_9_11.jpg'},
      ],
    fullPage: false,
    activeView: 'main',
    elementsGroups: [],
    structureTypes: [],
    elementsTypes: [],
    bridgeTypes: []

  };

const bridgePageReducer = (state = initialState, action) => {
  // produce(state, draft => {
  //   console.log(state)
    switch (action.type) {
      case actionTypes.SHOW_IN_MAIN_VIEW:
        // console.log(action.componentName)
        return {
          ...state,
          mainViewComponent: action.componentName,
          editMode: action.mode,
          selectedElement: action.id
        }
      case actionTypes.SHOW_IN_SECONDRY_VIEW:
        // console.log(action.componentName)
        return {
          ...state,
          secondaryViewComponent: action.componentName,
          editMode: action.mode
        }
      case actionTypes.SHOW_IN_BOTTOM_VIEW:
        // console.log(action.componentName)
        return {
          ...state,
          bottomViewComponent: action.componentName,
          editMode: action.mode
        }
      case actionTypes.PROJECT_LOADED:
        // console.log(action)
        return {
          ...state,
          project: action.project,

        };
      case actionTypes.SURVEY_LOADED:
        console.log('Survey loaded', action.survey)
        return {
          ...state,
          selectedForm: action.survey,
          mainViewComponent: 'BridgeInspectionForm',
          editMode: 'edit'
        };
      case actionTypes.PROJECT_UPDATED:
        // console.log(action.project)
        return {
          ...state,
          project: action.project
        };
      case actionTypes.PROJECT_USERS_LOADED:
        // console.log(action.users)
        return {
          ...state,
          projectUsers: action.users
        };
      case actionTypes.PROJECT_SURVEYS_LOADED:
        // console.log(action.surveys)
        return {
          ...state,
          projectSurveys: action.surveys
        };
      case actionTypes.BRIDGE_MODELS_LOADED:
        // console.log('BRIDGE_MODELS_LOADED', action)
        return {
          ...state,
          // bridgeModels: action.data
        };
      case actionTypes.GET_BRIDGE:
        // console.log('BRIDGE_LOADED', action.data)
        return {
          ...state,
          bridgeLoaded: false

        };
      case actionTypes.NEW_MODEL_CREATED:
        console.log('BRIDGE_LOADED', action.data)
        return {
          ...state,
          bridgeModels: [...state.bridgeModels, action.data]

        };
      case actionTypes.BRIDGE_LOADED:
        console.log('BRIDGE_LOADED', action.data.models)
        return {
          ...state,
          bridge: action.data.bridge,
          bridgeProcesses: action.data.processes,
          bridgeTasks: action.data.tasks,
          bridgeModels: action.data.models,
          bridgeSpans: action.data.spans,
          bridgeElements: action.data.elements,
          bridgeLoaded: true

        };
      case ORG_TECH_INFO_LOADED:
        // console.log('ORG_TECH_INFO_LOADED', action.data)
        return {
          ...state,
          elementsGroups: action.data.elementsGroups,
          structureTypes: action.data.structureTypes,
          bridgeTypes: action.data.bridgeTypes,
          elementsTypes: action.data.elementsTypes,

        };
      case actionTypes.TOGGLE_FULL_PAGE:
        // console.log(action.surveys)
        return {
          ...state,
          fullPage: !state.fullPage,
          activeView: action.view
        };
      case actionTypes.NODES_LOADED_FROM_MODEL:
        // console.log('NODES_LOADED_FROM_MODEL', action)
        // console.log('NODES_LOADED_FROM_MODEL', state.bridgeElements)

        if (!state.bridgeElements.length) {

          return {
            ...state,
            bridgeNodes: action.data,
            bridgeElements: action.data
          };
        } else {
          let updatedEls = [...state.bridgeElements]
          updatedEls.map(el => {
            el.name = action.data.find(node => node.object_id == el.object_id).name
          })
          return {
            ...state,
            bridgeNodes: action.data,
            bridgeElements: updatedEls
            // activeView: action.view
          };

        }
      case actionTypes.CREATE_BRIDGE_SPANS:
        // console.log(action)
        return {
          ...state,
          // bridgeSpans: action.data
          // fullPage: !state.fullPage,
          // activeView: action.view
        };
      case NODE_SELECTED:
        console.log('NODE_SELECTED BRIDGEPAGE', action.data)
        console.log(state.mode)
        const element = state.bridgeElements.find(el => el.object_id == action.data)
        const node = state.bridgeNodes.find(node => node.object_id == action.data)
        let updatedNodes
        let updatedSelectedObjectIds
        // let newSelectedElement
        if (state.mode === 'Select elements') {
          // if (state.selectedObjectIds.includes(action.data)) updatedNodes = state.selectedObjectIds.filter(node => node !== action.data)
          // else updatedNodes = [...state.selectedObjectIds, action.data]

          if (state.selectedObjectIds.includes(action.data)) updatedSelectedObjectIds = state.selectedObjectIds.filter(node => node !== action.data)
          else updatedSelectedObjectIds = [action.data, ...state.selectedObjectIds ]
        } else {
          if (state.selectedObjectIds[0] == action.data) updatedSelectedObjectIds = []
          else updatedSelectedObjectIds = [action.data]
        }
        // console.log(element)
        // console.log(node)
        // const boundingSphere = state.bridgeNodes.find(node => node.object_id == action.data).boundingSphere;
       
        let viewData = null
        if (element && element.default_view_data && element.default_view_data !== 'undefined') {
          console.log(element)
          viewData = JSON.parse(element.default_view_data)

        } 

        return {
          ...state,

          // selectedElement: newSelectedElement,
          // boundingSphere: boundingSphere,
          viewData: viewData,
          selectedObjectIds: updatedSelectedObjectIds,
        }
      case UPDATE_RESIUM_MODE:
        if (action.data === state.mode) {
          return {
            ...state,
            mode: ''
          }
        } else {
          return {
            ...state,
            mode: action.data
          }

        }
      case ELEMENTS_SELECTED:
        console.log('ELEMENTS_SELECTED', action)
        return {
          ...state,
          selectedObjectIds: action.data
        }
      case MODEL_SELECTED:
        console.log('MODEL_SELECTED', action);
        let selected 
        if (state.selectedModels == action.data) selected = []
        else selected = action.data
        return {
          ...state,
          selectedModels: selected
        }
      case ON_RIGHT_MENU_OPTION_CLICK:
        console.log(action)
        // console.log(state.elementsGroups.filter(group => group.id === action.elementGroupId)[0])
        // console.log(state.elementsTypes.filter(type => type.element_group_id === action.elementGroupId))
        // console.log(state.selectedObjectIds)
        // let updatedElements = [...state.bridgeElements]

        switch (action.action) {
          case "Allocate to Span":

            return {
              ...state,
              bridgeElements: action.data,
              // selectedElement: null
            }

          default:
            return {
              ...state,

              // selectedElement: null
            };
        }
      break
      case (actionTypes.ELEMENT_UPDATED):
        // console.log(action.data)
        let els = state.bridgeElements.filter(el => parseInt(el.object_id) !== parseInt(action.data.object_id))
        // console.log(els)
        els.push(action.data)
        return {
          ...state,
          bridgeElements: els,
          mainViewComponent: 'Resium'
        }
      case (actionTypes.ELEMENTS_UPDATED):
        console.log(action.data);

        let elsCopy = [...state.bridgeElements];
        action.data.forEach(element => {
          elsCopy.filter(el => parseInt(el.object_id) !== parseInt(element.object_id))
        // console.log(els)
          elsCopy.push(element)
        });
        // let els = state.bridgeElements.filter(el => parseInt(el.object_id) !== parseInt(action.data.object_id))
        
        // els.push(action.data)
        return {
          ...state,
          bridgeElements: elsCopy,
          // mainViewComponent: 'Resium'
        }
      case (actionTypes.SPAN_UPDATED):
        // console.log(action.data)
        let spans = state.bridgeSpans.filter(span => span.id !== action.data.id)
        // console.log(spans)
        spans.push(action.data)
        return {
          ...state,
          bridgeSpans: spans
        }
      default:
        return {
          ...state,

        }
    }
  }
export default bridgePageReducer;
