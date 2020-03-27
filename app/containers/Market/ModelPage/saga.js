import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from '../../utils/request';
import { apiUrl } from '../../App/constants';
import {loadError, toggleModal, showNotification} from '../../App/actions';

import { getModalOpen } from '../../App/selectors'




export default function* projectSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // yield takeLatest(actionTypes.NEW_PROJECT_CREATED, newProjectCreated);
}
