import * as actionTypes  from './constants';



export function updateResiumMode(data) {
  
  return {
    type: actionTypes.UPDATE_RESIUM_MODE,
    data: data
  };
}

export function elementSelected(data, selectMultuple) {
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
export function receiveAction(actionType, data) {
  console.log(actionType, data)
  switch (actionType) {
    case 'selectModel':
      return {
        type: actionTypes.MODEL_SELECTED,
        data,
    
      };
      break;
  
    default:
      break;
  }

}

export function onRightMenuOptionClick(action, data) {
  // console.log(data)
  return {
    type: actionTypes.ON_RIGHT_MENU_OPTION_CLICK,
    action,
    data
  };
}

