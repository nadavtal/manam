import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { UPDATE_TASK } from '../../AppData/constants'

import { taskUpdated } from '../../AppData/actions'
import * as actions from './actions';
import request from 'utils/request';
import { loadError } from 'containers/App/actions';

import { apiUrl } from '../../App/constants';

function* updateOrganization(action) {
  console.log(action);
  const url = apiUrl + 'organizations/'+action.id
  try {
    const args = {

      method: 'PUT',
      body: JSON.stringify(action.data),
    }
    const org = yield call(request, url, args);
    console.log(org)
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* updateTask(action) {
  // console.log(action);
  const url = apiUrl + 'tasks/'+action.data.id
  try {
    const args = {

      method: 'PUT',
      body: JSON.stringify(action.data),
    }
    const updatedTask = yield call(request, url, args);
    // console.log(updatedTask)
    yield put(taskUpdated(updatedTask));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* createProcessesInDB(action) {
  // console.log(action);
  const url = apiUrl + 'processes/'
  try {
    const args = {

      method: 'POST',
      body: JSON.stringify(action.data),
    }
    const processes = yield call(request, url, args);
    console.log(processes)
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* createTasksInDB(action) {
  console.log(action);
  const url = apiUrl + 'tasks/'
  try {
    const args = {

      method: 'POST',
      body: JSON.stringify(action.data),
    }
    const tasks = yield call(request, url, args);
    console.log(tasks)
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getProcessesByProjectId(action) {
  // console.log('getProcessesByProjectId')
  try {
    // Call our request helper (see 'utils/request')

    const processes = yield call(request, apiUrl + 'projects/'+ action.id +'/processes');
    // console.log(processes)
    yield put(actions.projectProcessesLoaded(processes));
  } catch (err) {
    yield put(loadError(err));
  }

}



export default function* organizationsSaga() {

  yield takeLatest(actionTypes.UPDATE_ORGANIZATION, updateOrganization);
  yield takeLatest(actionTypes.CREATE_PROCESSES_IN_DB, createProcessesInDB);
  yield takeLatest(actionTypes.GET_PROCESSES_BY_PROJECT_ID, getProcessesByProjectId);
  yield takeLatest(actionTypes.CREATE_TASKS_IN_DB, createTasksInDB);
  yield takeLatest(UPDATE_TASK, updateTask);

}
