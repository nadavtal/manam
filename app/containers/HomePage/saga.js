/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { loadError, orgRegistered, userLoaded, toggleModal } from 'containers/App/actions';
import { push } from "react-router-redux";
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { apiUrl, LOGIN, REGISTER_USER, REGISTER_PROVIDER, REGISTER_ORG } from '../App/constants';
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// console.log = function() {}

// function redirectByRole(roles, user) {
//   for (const roleType of roles) {
//     // console.log(roleType.roletypeId)
//     switch (roleType.roletypeId) {
//       case 1:
//         yield put(push('/admin/'));
//         break;
//       case 2:
//         yield put(push('/organizations/'+ userOrganizationRoles[0].organization_id));
//         break;
//       case 3:
//         yield put(push('/providers/'+ userProviderRoles[0].provider_id));
//         break;

//       default:
//         yield put(push('/users/'+ user.id));
//       break;
//     }
//   }
// }
export function* login(action) {
  // const username = yield select(makeSelectUsername());
  // console.log(action);
  const user = yield call(request, apiUrl + 'users/'+ action.user.userName + '/' + action.user.password);
  // console.log(user);
  const userRolesTypes = yield call(request, apiUrl + 'users/'+ user.id + '/roles-types');
  // console.log(userRolesTypes);

  const userProviderRoles = yield call(request, apiUrl + 'users/'+ user.id + '/provider-roles');
  console.log(userProviderRoles);
  // const organizations = yield call(request, apiUrl + 'providers/' + action.id +'/organizations');
  const userOrganizationRoles = yield call(request, apiUrl + 'users/'+ user.id + '/organization-roles');
  // console.log(userOrganizationRoles);
  const userData = {
    user,
    userRolesTypes,
    userProviderRoles,
    userOrganizationRoles
  }
  console.log(userData)
  yield put(userLoaded(userData));
  // if (userProviderRoles.length || userOrganizationRoles.length) {
  //   // yield put(toggleModal({
  //   //   title: `Hello ${user.first_name}`,
  //   //   text: 'Please choose your work space',
  //   //   // confirmButton: 'Create',
  //   //   cancelButton: 'Cancel',
  //   //   formType: 'workSpaceForm',
  //   //   data: {
  //   //     userData,
  //   //     editMode: 'Go'
  //   //   },
  //   //   // options: {
  //   //   //   buttonText: 'Add users',
  //   //   //   options: [],
  //   //   // },
  //   //   confirmFunction: (data, event) => console.log(data)
  //   // }))

  // } else {
  //   try {

  //     for (const roleType of userRolesTypes) {
  //       // console.log(roleType.roletypeId)
  //       switch (roleType.roletypeId) {
  //         case 1:
  //           yield put(push('/admin/'));
  //           break;
  //         case 2:
  //           yield put(push('/organizations/'+ userOrganizationRoles[0].organization_id));
  //           break;
  //         case 3:
  //           yield put(push('/providers/'+ userProviderRoles[0].provider_id));
  //           break;

  //         default:
  //           yield put(push('/users/'+ user.id));
  //         break;
  //       }
  //     }

  //   } catch (err) {
  //     console.log(err)
  //   }

  // }

}
function* registerUser(action) {
  console.log(action.data)
  const url = apiUrl + 'users';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    if(action.data.roles.length) {
      console.log('updateing user roles')
      const userRoles = yield call(request, apiUrl + 'users/'+ requestResults.insertId +'/roles', {method: 'POST', body: JSON.stringify(action.data.roles)})
      console.log(userRoles)
      yield put(push('/users/'+ requestResults.insertId));
      // updateUserRoles(requestResults.insertId, action.data.roles)
    }

  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }

}

function* updateUserRoles(userId, rolesIds) {
   console.log(userId, rolesIds);
   const url = apiUrl + 'users/'+ userId +'/roles';
   const args = {
    method: 'POST',
    body: JSON.stringify(rolesIds),
   }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);

  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}
function* registerProvider(action) {
  console.log(action)
  const url = apiUrl + 'providers';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);

  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }

}
function* registerOrg(action) {
  console.log(action)
  const url = apiUrl + 'organizations';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(orgRegistered(requestResults));
    yield put(push('/organizations/'+requestResults.insertId));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }

}



/**
 * Root saga manages watcher lifecycle
 */
export default function* homepageData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(REGISTER_USER, registerUser);
  yield takeLatest(REGISTER_PROVIDER, registerProvider);
  yield takeLatest(REGISTER_ORG, registerOrg);
  yield takeLatest(LOGIN, login);


}
