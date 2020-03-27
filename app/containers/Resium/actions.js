import * as actionTypes  from './constants';



export function updateResiumMode(data) {
  
  return {
    type: actionTypes.UPDATE_RESIUM_MODE,
    data: data
  };
}

export function nodeSelected(data, selectMultuple) {
  // console.log(data)
  return {
    type: actionTypes.NODE_SELECTED,
    data,
    selectMultuple
  };
}
export function elementsSelected(data) {
  // console.log(data)
  return {
    type: actionTypes.ELEMENTS_SELECTED,
    data,

  };
}

export function onRightMenuOptionClick(action, data) {
  // console.log(data)
  return {
    type: actionTypes.ON_RIGHT_MENU_OPTION_CLICK,
    action,
    data
  };
}

