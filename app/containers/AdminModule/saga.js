import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { showNotification, toggleModal, loadError, allDataLoaded, organizationAdded } from 'containers/App/actions';
import { findEntityByEmail } from 'containers/AppData/actions'
import { getModalOpen } from '../App/selectors';
import { apiUrl } from '../App/constants';



function* getAllData(action) {
  try {
    const organizations = yield call(request, apiUrl + 'organizations');
    const providers = yield call(request, apiUrl + 'providers');
    const users = yield call(request, apiUrl + 'users');
    const projects = yield call(request, apiUrl + 'projects');
    const processes = yield call(request, apiUrl + 'processes');
    const tasks = yield call(request, apiUrl + 'tasks');
    // const messages = yield call(request, apiUrl + 'messages');
    const data = {
      organizations,
      providers,
      users,
      projects,
      processes,
      tasks,
      // messages,
    }
    yield put(allDataLoaded(data))
    
  } catch (err) {
    yield put(loadError(err))
    yield put(showNotification({
      message: `There was an erro `,
      title: `Error `,
      icon: 'error',
      text: '',
      autohide: 3000

    }));
  }
  
}
function* addOrganization(action) {
  console.log(action);
  let organization = action.data
  const url = apiUrl + 'organizations';
  const args = {
    method: 'POST',
    body: JSON.stringify(organization),
  }
  const modalOpen = yield select(getModalOpen);
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    if (result.insertId) {
      organization.id = result.insertId;
      //Find users with this mail
      const users = yield call(request, apiUrl + 'users/email/'+ organization.email);
      if (modalOpen) yield put(toggleModal())
      yield put(organizationAdded(organization, users))
      
      yield put(showNotification({
        message: `Organization created`,
        title: `Organization created`,
        icon: 'bell',
        text: '',
        autohide: 3000
  
       })
      )
      
      // const users = yield call(request, apiUrl + 'users/email/'+ organization.email);
      // console.log(users);
      // if(users.length) {
      //   yield put(toggleModal({
      //     title: 'A user has been found with this email adrress',
      //     text: `Do you want to allocate ${users[0].first_name} ${users[0].last_name} to ${organization.name} admin?`,
      //     confirmButton: 'Allocate',
      //     cancelButton: 'Cancel',
          
      //     confirmFunction: () => call(request, apiUrl + 'users/email/'+ organization.email)
      //   }))
      // } else {
      //   yield put(toggleModal({
      //     title: 'No user has been found with this email adrress',
      //     text: `Do you want to create a new user for ${organization.name} admin?`,
      //     confirmButton: 'Create',
      //     cancelButton: 'Cancel',
          
      //     confirmFunction: () => console.log('Create')
      //   }))
      // }
    }
    
    
  } catch (err) {
    yield put(loadError(err))
    yield put(showNotification({
      message: `There was an erro`,
      title: `Error `,
      icon: 'error',
      text: '',
      autohide: 3000

    }));
  }
}

function* allocateUserToOrganization(action) {
  console.log(action)
  const args = {
    method: 'POST',
    body: JSON.stringify({
      userId: action.user.id, 
      roleTypeId: action.roletypeId,
      orgId: action.org.id
    }),
  }
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl+'organization-users'
  try {
    const result = yield call(request, url, args);
    console.log(result);
    if (modalOpen) yield put(toggleModal())
    if (result.results.insertId) {
      yield put(showNotification({
      message: `User allocated`,
      title: `Error `,
      icon: 'bell',
      text: 'A confirmation mail has been sent to '+ action.user.first_name,
      autohide: 3000

     })
     );
     const emailData = {
      recipientEmail: action.org.email,
      subject: `User allocation message`,
      subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      message: `Please cpnfirm by clicking this link`,
      link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

    }
    const args = {
      method: 'POST',
      body: JSON.stringify(emailData),
    }
    const email = yield call(request, apiUrl + 'email/send', args);
    console.log(email)
    //  yield put(sendEmail())
    };

  } catch (err) {
    console.log(err)
  }
}



export default function* adminSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount


  yield takeLatest(actionTypes.GET_ALL_DATA, getAllData);
  yield takeLatest(actionTypes.ADD_ORGANIZATION, addOrganization);
  yield takeLatest(actionTypes.ALLOCATE_USER_TO_ORG, allocateUserToOrganization);

}
