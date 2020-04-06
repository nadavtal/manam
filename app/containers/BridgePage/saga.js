import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from '../../utils/request';
import { apiUrl } from '../App/constants';
import {loadError, toggleModal, showNotification} from '../App/actions';
import { elementUpdated, spanUpdated } from '../BridgePage/actions'
import { getModalOpen } from '../App/selectors'

function* getProject(action) {

  try {
    // Call our request helper (see 'utils/request')
    const project = yield call(request, apiUrl + 'projects/' + action.id);
    console.log(project);
    // yield getProjectUsers(action);
    // yield getProjectSurveys(action)
    yield getBridge(action)
    yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(loadError(err));
  }

}

function* getSurvey(action) {

  try {
    // Call our request helper (see 'utils/request')
    const survey = yield call(request, apiUrl + 'surveys/' + action.id);
    // console.log(survey);

    yield put(actions.surveyLoaded(survey[0]));
  } catch (err) {
    yield put(loadError(err));
  }

}

function* getProjectUsers(action) {
  try {
    // console.log(action)
    // Call our request helper (see 'utils/request')
    const projectSurveys = yield call(request, apiUrl + 'project-users/' + action.id);
    // console.log(projectSurveys);

    yield put(actions.projectUsersLoaded(projectSurveys));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getProjectSurveys(action) {
  try {
    // console.log(action)
    // Call our request helper (see 'utils/request')
    const projectUsers = yield call(request, apiUrl + 'project-surveys/' + action.id);
    // console.log(projectUsers);

    yield put(actions.projectSurveysLoaded(projectUsers));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getBridge(action) {
  // console.log(action.id)
  try {
    // Call our request helper (see 'utils/request')
    const bridge = yield call(request, apiUrl + 'bridges/' + action.id);
    const models = yield call(request, apiUrl + 'bridges-models/' + action.id);
    const processes = yield call(request, apiUrl + 'bridges/' + action.id + '/processes');
    const tasks = yield call(request, apiUrl + 'bridges/' + action.id + '/tasks');
    const spans = yield call(request, apiUrl + 'bridges/' + action.id + '/spans');
    // console.log(spans)
    const elements = yield call(request, apiUrl + 'bridges/' + action.id + '/elements');
    // console.log(elements)

    const bridgeInfo = {
      bridge: bridge[0],
      models,
      processes,
      tasks,
      spans,
      elements,
    }
    console.log(bridgeInfo)
    yield put(actions.bridgeLoaded(bridgeInfo));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* getBridgeModels(action) {
  try {
    // console.log(action)
    // Call our request helper (see 'utils/request')
    const models = yield call(request, apiUrl + 'bridges-models/' + action.id);
    // console.log(models);

    yield put(actions.bridgeModelsLoaded(models));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* getBridgeProcesses(action) {
  try {
    // console.log(action)
    // Call our request helper (see 'utils/request')
    const processes = yield call(request, apiUrl + 'bridges/' + action.id + '/processes');
    console.log(processes);

    // yield put(actions.bridgeModelsLoaded(processes));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* editProject(action) {
  // console.log(action.project)
  try {
    const args = {
      url: apiUrl + 'projects/',
      method: 'POST'
    }
    const project = yield call(request, args);
    // console.log(project)
    yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }

}

function* editSurvey(action) {
  console.log(action.survey)
  // try {
  //   const args = {
  //     url: apiUrl + 'projects/',
  //     method: 'POST'
  //   }
  //   const project = yield call(request, args);
  //   console.log(project)
  //   yield put(actions.projectLoaded(project[0]));
  // } catch (err) {
  //   yield put(console.log(err));
  // }

}



function* createNewSurvey(action) {
  console.log(action.survey)
  var survey = action.survey;
  // console.log(survey)
  // action.project.projectStatus = 'bridge basic done';
  const url = apiUrl + 'surveys';
  const args = {
    method: 'POST',
    body: JSON.stringify(survey),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    // console.log(requestResults);
    action.survey.ID = requestResults.newSurveyId
    const projectSurveys = yield updateProjectSurveys(action);
    // console.log(projectSurveys)
    // yield put(newProjectCreated(action.project));

  } catch (err) {
    yield put(console.log(err));
  }

}
function* createNewProcess(action) {
  console.log(action)
  var process = action.data;
  // console.log(survey)
  // action.project.projectStatus = 'bridge basic done';
  const url = apiUrl + 'processes';
  const args = {
    method: 'POST',
    body: JSON.stringify(process),
  }

  // try {
  //   // Call our request helper (see 'utils/request')
  //   const requestResults = yield call(request, url, args);
  //   console.log(requestResults);
  //   action.survey.ID = requestResults.newSurveyId
  //   const projectSurveys = yield updateProjectSurveys(action);
  //   // console.log(projectSurveys)
  //   // yield put(newProjectCreated(action.project));

  // } catch (err) {
  //   yield put(console.log(err));
  // }

}
function* createNewBridge(action) {
  console.log(action)
  var bridge = action.data;
  // console.log(survey)
  // action.project.projectStatus = 'bridge basic done';
  const url = apiUrl + 'bridges';
  const args = {
    method: 'POST',
    body: JSON.stringify(bridge),
  }
  
  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(actions.newBridgeCreated(bridge, requestResults.newBridgeId));
    if (modalOpen) yield put(toggleModal())
    yield put(toggleModal())

  } catch (err) {
    yield put(console.log(err));
  }

}
function* createNewBridgeModel(action) {
  console.log(action)
  var model = action.data;
  console.log(model)
  const modalOpen = yield select(getModalOpen);
  // action.project.projectStatus = 'model basic done';
  const url = apiUrl + 'bridges-models';
  const args = {
    method: 'POST',
    body: JSON.stringify(model),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    
    if (modalOpen) yield put(toggleModal())
    yield put(showNotification({
      message: ``,
      title: `${model.name} created`,
      icon: 'bell',
      text: '',
      autohide: 3000

    })
    )
    yield put(actions.newBridgeModelCreated(bridge));



  } catch (err) {
    yield put(loadError(err));
    yield put(showNotification({
      message: ``,
      title: `Error in creating model`,
      icon: 'error',
      text: '',
      autohide: 3000

    })
    )
  }

}

function* editBridge(action) {
  console.log('UPDATING bridge ', action)
  let bridge = action.data;

  const url = apiUrl + 'bridges/'+action.bid;
  const args = {
    method: 'PUT',
    body: JSON.stringify(bridge),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(showNotification({
      message: ``,
      title: `${bridge.name} updated`,
      icon: 'bell',
      text: '',
      autohide: 3000

    })
    )
    // yield put(getprocessTemplatesTasks());

  } catch (err) {
    yield put(loadError(err));
  }

}
function* updateModel(action) {
  console.log('UPDATING model ', action)
  let model = action.data;

  const url = apiUrl + 'bridges-models/'+action.bid;
  const args = {
    method: 'PUT',
    body: JSON.stringify(model),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(showNotification({
      message:`${model.name} updated`,
      title: `Success`,
      icon: 'check-circle',
      text: '',
      autohide: 3000

    })
    )
    // yield put(getprocessTemplatesTasks());

  } catch (err) {
    yield put(loadError(err));
  }

}


function* updateSpan(action) {
  console.log('UPDATING span ', action)
  let span = action.data;

  const url = apiUrl + 'bridges-spans/'+action.data.id;
  const args = {
    method: 'PUT',
    body: JSON.stringify(span),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    // console.log(requestResults);
    yield put(toggleModal())
    yield put(showNotification({
      message:`Span ${action.data.id} updated`,
      title: `Success`,
      icon: 'check-circle',
      text: '',
      autohide: 3000

    })
    )
    yield put(spanUpdated(span));

  } catch (err) {
    yield put(loadError(err));
  }

}

function* editElement(action) {
  console.log('UPDATING element ',)
  let element = action.data;
  const modalOpen = yield select(getModalOpen);
  // console.log(modalOpen)
  const url = apiUrl + 'bridges-elements/'+element.object_id;
  const args = {
    method: 'PUT',
    body: JSON.stringify(element),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    if (modalOpen) yield put(toggleModal())
    yield put(showNotification({
      message:`Element ${element.object_id} updated`,
      title: `Success`,
      icon: 'check-circle',
      text: '',
      autohide: 3000

    })
    )
    yield put(elementUpdated(element));

  } catch (err) {
    yield put(loadError(err));
  }

}
function* updateElements(action) {
  console.log('UPDATING elements ', action)
  let elements = action.data;
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'bridges-elements';
  const args = {
    method: 'PUT',
    body: JSON.stringify(elements),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    if (modalOpen) yield put(toggleModal())
    yield put(showNotification({
      message:`${elements.length} elements updated`,
      title: `Success`,
      icon: 'check-circle',
      text: '',
      autohide: 3000

    })
    )
    yield put(actions.elementsUpdated(elements));

  } catch (err) {
    yield put(loadError(err));
  }

}


function* updateProjectSurveys(action) {
  // console.log(action.survey.BID, action.survey.ID);
  const url = apiUrl + 'project-surveys';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.survey),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    // const projectUsers =
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }
}


function* updateProjectUsers(action) {
  // console.log(action.project);
  const url = apiUrl + 'project-users';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.project),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    // console.log(result);
    // const projectUsers =
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }
}
function* createBridgeSpans(action) {
  console.log(action);
  const url = apiUrl + 'bridges/'+action.data[0].bid + '/spans';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    // const projectUsers =
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }
}
function* createBridgeElements(action) {
  console.log(action);
  const url = apiUrl + 'bridges/'+action.data[0].bid + '/elements';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    // const projectUsers =
    yield put(actions.bridgeElementsCreated(action.data));
  } catch (err) {
    yield put(console.log(err));
  }
}


export default function* projectSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(actionTypes.GET_PROJECT, getProject);
  yield takeLatest(actionTypes.GET_BRIDGE, getBridge);
  yield takeLatest(actionTypes.GET_BRIDGE_MODELS, getBridgeModels);
  yield takeLatest(actionTypes.GET_SURVEY, getSurvey);
  yield takeLatest(actionTypes.EDIT_PROJECT, editProject);
  yield takeLatest(actionTypes.EDIT_SURVEY, editSurvey);

  yield takeLatest(actionTypes.CREATE_NEW_SURVEY, createNewSurvey);
  yield takeLatest(actionTypes.CREATE_NEW_PROCESS, createNewProcess);
  yield takeLatest(actionTypes.CREATE_NEW_BRIDGE, createNewBridge);
  yield takeLatest(actionTypes.CREATE_NEW_BRIDGE_MODEL, createNewBridgeModel);
  yield takeLatest(actionTypes.EDIT_BRIDGE, editBridge);
  yield takeLatest(actionTypes.GET_BRIDGE_PROCESSES, getBridgeProcesses);
  yield takeLatest(actionTypes.UPDATE_MODEL, updateModel);
  yield takeLatest(actionTypes.CREATE_BRIDGE_SPANS, createBridgeSpans);
  yield takeLatest(actionTypes.CREATE_BRIDGE_ELEMENTS, createBridgeElements);
  yield takeLatest(actionTypes.EDIT_ELEMENT, editElement);
  yield takeLatest(actionTypes.UPDATE_SPAN, updateSpan);
  yield takeLatest(actionTypes.UPDATE_ELEMENTS, updateElements);
  // yield takeLatest(actionTypes.NEW_PROJECT_CREATED, newProjectCreated);
}
