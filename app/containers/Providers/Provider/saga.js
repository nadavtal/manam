import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { loadError } from 'containers/App/actions';
import { showNotification, toggleModal } from '../../App/actions'
import { apiUrl } from '../../App/constants';



function* allocateUserToProvider(action) {
  // console.log(action.project);
  const url = apiUrl + 'provider-users';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    toggleModal();
    yield put(showNotification({
      message: `asdasdas`,
      title: `User added`,
      icon: 'bell',
      text: '',
      autohide: 3000

    })
    )
  } catch (err) {
    yield put(showNotification({
      message: `There was an erro`,
      title: `Error `,
      icon: 'error',
      text: '',
      autohide: 3000

    }));
  }
}

function* updateProvider(action) {
  console.log(action);
  // const url = apiUrl + 'organizations/'+action.id
  // try {
  //   const args = {

  //     method: 'PUT',
  //     body: JSON.stringify(action.data),
  //   }
  //   const org = yield call(request, url, args);
  //   console.log(org)
  //   // yield put(actions.projectLoaded(project[0]));
  // } catch (err) {
  //   yield put(console.log(err));
  // }
}


export default function* providerSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(actionTypes.ALLOCATE_USER_TO_PROVIDER, allocateUserToProvider);
  yield takeLatest(actionTypes.UPDATE_PROVIDER, updateProvider);

}
