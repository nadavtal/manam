
import produce from 'immer';
import * as actionTypes from './constants';

// The initial state of the App
// import { initialState } from 'containers/App/reducer'
export const initialState = {

    

  };

const modelPageReducer = (state = initialState, action) => {
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
      
      case actionTypes.MODELS_LOADED:
        // console.log('BRIDGE_MODELS_LOADED', action)
        return {
          ...state,
          // bridgeModels: action.data
        };
      case actionTypes.GET_MODEL:
        // console.log('BRIDGE_LOADED', action.data)
        return {
          ...state,
          bridgeLoaded: false

        };
      
      case actionTypes.TOGGLE_FULL_PAGE:
        // console.log(action.surveys)
        return {
          ...state,
          fullPage: !state.fullPage,
          activeView: action.view
        };
      
      case UPDATE_RESIUM_MODE:
        // if (action.data === state.mode) {
        //   return {
        //     ...state,
        //     mode: ''
        //   }
        // } else {
        //   return {
        //     ...state,
        //     mode: action.data
        //   }

        // }
      case ELEMENTS_SELECTED:
        console.log('ELEMENTS_SELECTED', action)
        return {
          ...state,
          selectedObjectIds: action.data
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
      
      default:
        return {
          ...state,

        }
    }
  }
export default modelPageReducer;
