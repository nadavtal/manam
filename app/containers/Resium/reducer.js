
import produce from 'immer';
import * as actionTypes from './constants';
// import { NODE_SELECTED_FROM_PROJECT } from '../BridgePage/constants'
// The initial state of the App
// import { initialState } from 'containers/App/reducer'
export const initialState = {

  mode: '',
  // boundingSphere: null,

};
/* eslint-disable default-case, no-param-reassign */
const resiumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case(actionTypes.UPDATE_RESIUM_MODE):
        // console.log(action)
        draft.mode = state.mode === action.data ? '' : action.data;
        break
      case(actionTypes.NODE_SELECTED):
      // console.log(state)
      //  const boundingSphere = state.bridgeNodes.filter(node => node.object_id == action.data)[0].boundingSphere
      //   console.log(boundingSphere)


        break
      case(actionTypes.ELEMENTS_SELECTED):
      // console.log('ELEMENTS_SELECTED')
      return {
        ...state,
        selectNodesMode: true
      }

      default:
        return {...state}
    }
  // }
  });

export default resiumReducer;
