import * as actionTypes  from './constants';

// import {TOGGLE_MESSAGES} from 'containers/App/constants'

/**
 * Changes the input field of the form
 *
 * @param  {string} projectId the ID of the project
 *
 * @return {object} An action object with a type of UPLOAD_PROJECT
 */

export function createNewSurvey(survey) {

  return {
    type: actionTypes.CREATE_NEW_SURVEY,
    survey
  };
}
export function createNewProcess(data) {

  return {
    type: actionTypes.CREATE_NEW_PROCESS,
    data
  };
}
export function editProcess(data) {

  return {
    type: actionTypes.EDIT_PROCESS,
    data
  };
}
export function createNewBridge(data) {

  return {
    type: actionTypes.CREATE_NEW_BRIDGE,
    data
  };
}
export function createNewBridgeModel(data) {

  return {
    type: actionTypes.CREATE_NEW_BRIDGE_MODEL,
    data
  };
}
export function newBridgeCreated(data, id) {

  return {
    type: actionTypes.NEW_BRIDGE_CREATED,
    data,
    id
  };
}
export function newModelCreated(data) {

  return {
    type: actionTypes.NEW_MODEL_CREATED,
    data,
    
  };
}
export function editBridge(data, bid) {
  if(data.main_image && data.main_image.length) {
    console.log(typeof(data.main_image))
    const file = data.main_image[0]
    console.log(file.name)
    data.main_image_name = file.name;
    data.main_image_type = file.type;
    data.main_image_size = file.size;
    // console.log(JSON.stringify(file))
    // return {
    //   type: actionTypes.EDIT_BRIDGE_MAIN_IMAGE,
    //   data: data.main_image[0],
    //   bid
    // }
  }
  return {
    type: actionTypes.EDIT_BRIDGE,
    data,
    bid
  };
}

export function getProject(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_PROJECT,
    id
  }
}
export function getBridge(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_BRIDGE,
    id
  }
}
export function getBridgeModels(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_BRIDGE_MODELS,
    id
  }
}
export function getBridgeProcesses(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_BRIDGE_PROCESSES,
    id
  }
}
export function getSurvey(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_SURVEY,
    id
  }
}
export function projectLoaded(project) {
  // console.log(project)
  return {
    type: actionTypes.PROJECT_LOADED,
    project
  }
}
export function surveyLoaded(survey) {

  return {
    type: actionTypes.SURVEY_LOADED,
    survey
  }
}
export function projectUsersLoaded(users) {

  return {
    type: actionTypes.PROJECT_USERS_LOADED,
    users
  }
}
export function projectSurveysLoaded(surveys) {

  return {
    type: actionTypes.PROJECT_SURVEYS_LOADED,
    surveys
  }
}
export function bridgeLoaded(data) {

  return {
    type: actionTypes.BRIDGE_LOADED,
    data
  }
}
export function bridgeModelsLoaded(data) {

  return {
    type: actionTypes.BRIDGE_MODELS_LOADED,
    data
  }
}

export function editProject(project) {
  console.log(project)
  return {
    type: actionTypes.EDIT_PROJECT,
    project
  };
}
export function editSurvey(survey) {
  console.log(survey)
  return {
    type: actionTypes.EDIT_SURVEY,
    survey
  };
}

export function toggleMessages() {
  return {
    type: actionTypes.TOGGLE_MESSAGES,

  };
}
export function toggleProjectForm() {
  return {
    type: actionTypes.TOGGLE_PROJECT_FORM,

  };
}
export function showInSeondaryView(componentName, mode) {
  return {
    type: actionTypes.SHOW_IN_SECONDRY_VIEW,
    componentName: componentName,
    mode

  };
}
export function showInMainView(componentName, mode, id=null) {
  // console.log(componentName)
  return {
    type: actionTypes.SHOW_IN_MAIN_VIEW,
    componentName,
    mode,
    id

  };
}
export function showInBottomView(componentName, mode) {
  // console.log(componentName)
  return {
    type: actionTypes.SHOW_IN_BOTTOM_VIEW,
    componentName,
    mode,

  };
}
export function toggelFullPage(view) {
  // console.log(componentName)
  return {
    type: actionTypes.TOGGLE_FULL_PAGE,
    view
  };
}
export function updateModel(data) {
  // console.log(componentName)
  return {
    type: actionTypes.UPDATE_MODEL,
    data
  };
}
export function nodesLoadedFromModel(data) {
  console.log('NODES_LOADED_FROM_MODEL')

  return {
    type: actionTypes.NODES_LOADED_FROM_MODEL,
    data
  };
}
export function createNewBridgeElements(data) {
  console.log('CREATE_BRIDGE_ELEMENTS', data)
  data = data.map(node => {
    return {
      bid: node.bid,
      span_id: node.span_id,
      object_id: node.object_id
    }
  })
  return {
    type: actionTypes.CREATE_BRIDGE_ELEMENTS,
    data
  };
}
export function createBridgeSpans(data) {
  // console.log(data)
  return {
    type: actionTypes.CREATE_BRIDGE_SPANS,
    data
  };
}
export function editElement(data) {
  // console.log(data)
  return {
    type: actionTypes.EDIT_ELEMENT,
    data,

  };
}

export function elementUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.ELEMENT_UPDATED,
    data,

  };
}
export function updateSpan(data) {
  console.log(data)
  return {
    type: actionTypes.UPDATE_SPAN,
    data,

  };
}
export function spanUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.SPAN_UPDATED,
    data,

  };
}
export function updateElements(data) {
  // console.log(data)
  return {
    type: actionTypes.UPDATE_ELEMENTS,
    data,

  };
}
export function elementsUpdated(data) {
  console.log('elementsUpdated', data)
  return {
    type: actionTypes.ELEMENTS_UPDATED,
    data,

  };
}
export function bridgeElementsCreated(data) {
  // console.log(data)
  return {
    type: actionTypes.BRIDGE_ELEMENTS_CREATED,
    data,

  };
}

