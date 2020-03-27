import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './constants';
import request from 'utils/request';
import { loadError, organizationsLoaded, projectsLoaded, usersLoaded, providersLoaded, rolesLoaded, roleTypesLoaded,
  processTemplatesTasksLoaded } from 'containers/App/actions';
import { organizationLoaded } from '../Organizations/Organization/actions'
import { providerOrganizationsLoaded } from 'containers/AppData/actions'
import { providerLoaded } from '../Providers/provider/actions'
import { orgTechInfoLoaded } from './actions'

import { apiUrl } from '../App/constants';


function* getUsers(action) {
  // console.log('getUsers')
  try {
    // Call our request helper (see 'utils/request')

    const users = yield call(request, apiUrl + 'users');
    // console.log(users)
    yield put(usersLoaded(users));
  } catch (err) {
    // yield put(console.log(err));
  }

}
function* getProjects(action) {
  // console.log('getProjects')
  try {
    // Call our request helper (see 'utils/request')

    const projects = yield call(request, apiUrl + 'projects');
    // console.log(projects)
    yield put(projectsLoaded(projects));
  } catch (err) {
    console.log(err)
    yield put(loadError(err));
  }

}

function* getProviders(action) {
  // console.log('getProviders')
  try {
    // Call our request helper (see 'utils/request')

    const projects = yield call(request, apiUrl + 'providers');

    yield put(providersLoaded(projects));
  } catch (err) {
    // yield put(console.log(err));
  }

}



function* getOrganizations(action) {
  // console.log('getting orgs')
  try {

    const orgs = yield call(request, apiUrl + 'organizations');
    // console.log(orgs)
    yield put(organizationsLoaded(orgs));
  } catch (err) {
    yield put(loadError(err));
  }

}

export function* getRoles() {
  // console.log('Getting roles')

  try {

    const roles = yield call(request, apiUrl+'roles');
    // console.log(roles)
    yield put(rolesLoaded(roles));
  } catch (err) {
    yield put(loadError(err));
  }
}
export function* getRoleTypes() {


  try {

    const roleTypes = yield call(request, apiUrl+'roleTypes');
    // console.log(roleTypes)
    yield put(roleTypesLoaded(roleTypes));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}

function* getProviderInfo(action) {
  console.log('getProvider')
  try {
    // Call our request helper (see 'utils/request')

    const provider = yield call(request, apiUrl + 'providers/'+ action.id);

    yield put(providerLoaded(provider[0]));
  } catch (err) {
    yield put(loadError(err));
  }

}

function* getprocessTemplatesTasks(action) {
  // console.log('getUsers')
  try {
    // Call our request helper (see 'utils/request')

    const processTemplatesTasks = yield call(request, apiUrl + 'process-template-tasks');
    // console.log(processTemplatesTasks)
    yield put(processTemplatesTasksLoaded(processTemplatesTasks));
  } catch (err) {
    yield put(loadError(err));
  }

}

function* getUserById(action) {
  console.log(action)
  try {
    const user = yield call(request, apiUrl + 'users/'+ action.id);
    console.log(user);
    const userRolesTypes = yield call(request, apiUrl + 'users/'+ user.id + '/roles-types');
    console.log(userRolesTypes);

    const userProviderRoles = yield call(request, apiUrl + 'users/'+ user.id + '/provider-roles');
    console.log(userProviderRoles);
    const userOrganizationRoles = yield call(request, apiUrl + 'users/'+ user.id + '/organization-roles');
    console.log(userOrganizationRoles);
    const userData = {
      user,
      userRolesTypes,
      userProviderRoles,
      userOrganizationRoles
    }
    console.log(userData)
    // yield put(userLoaded(userData));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* getOrganizationById(action) {
  try {
    // Call our request helper (see 'utils/request')
    const organization = yield call(request, apiUrl + 'organizations/' + action.id);
    // console.log(organization);
    const bridges = yield call(request, apiUrl + 'organizations/' + action.id +'/bridges');
    // console.log(bridges);
    const projects = yield call(request, apiUrl + 'organizations/' + action.id +'/projects');
    // console.log(projects);
    const processes = yield call(request, apiUrl + 'organizations/' + action.id +'/processes/'+organization[0].name);
    // console.log(processes);
    const projectsProcesses = yield call(request, apiUrl + 'organizations/' + action.id +'/project-processes');
    // console.log(projectsProcesses);
    const tasks = yield call(request, apiUrl + 'organizations/' + action.id +'/tasks');
    // console.log(projectsProcesses);

    const processesTasks = yield call(request, apiUrl + 'organizations/' + action.id +'/processes-tasks/'+organization[0].name);
    // console.log(processes);
    const providers = yield call(request, apiUrl + 'organizations/' + action.id +'/providers');
    // console.log(providers);
    yield put(organizationLoaded({
      organization,
      bridges,
      projects,
      processes,
      providers,
      processesTasks,
      projectsProcesses,
      tasks
    }));
  } catch (err) {
    yield put(loadError(err));
  }
}
const getProviderBridgesIds = (processes) => {
  let ids = []
  processes.forEach(process => {
    if (!ids.includes(process.bid)) ids.push(process.bid)
  });
  return ids
}

function* getBroviderBridges(ids) {
  // console.log(ids);
  const url = apiUrl + 'provider-bridges';
  const args = {
    method: 'POST',
    body: JSON.stringify(ids),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    return result;

  } catch (err) {
    return err
  }
}
function* getProviderOrganizations(action) {

  try {
    // Call our request helper (see 'utils/request')
    const organizations = yield call(request, apiUrl + 'providers/' + action.id +'/organizations');
    // console.log(organizations);
    yield put(providerOrganizationsLoaded(organizations));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* getProviderbyId(action) {
  try {
    // Call our request helper (see 'utils/request')
    const provider = yield call(request, apiUrl + 'providers/' + action.id);
    const processes = yield call(request, apiUrl + 'providers/' + provider[0].name +'/processes');
    const projectsProcesses = yield call(request, apiUrl + 'providers/' + provider[0].name +'/project-processes');
    const bridges = yield getBroviderBridges(getProviderBridgesIds(projectsProcesses));
    // console.log(bridges)
    // const bridges = yield call(request, apiUrl + 'providers/' + action.id +'/organizations');getProviderBridgesIds(projectsProcesses)
    const tasks = yield call(request, apiUrl + 'providers/' + provider[0].name +'/tasks');
    const processesTasks = yield call(request, apiUrl + 'providers/' + provider[0].name +'/processes-tasks');
    const organizations = yield call(request, apiUrl + 'providers/' + action.id +'/organizations');
    const users = yield call(request, apiUrl + 'providers/' + action.id +'/users');
    // console.log(users)
    const arrangedUsers = arrangeUsersRoles(users)
    // console.log(arrangedUsers)
    // console.log(arrangeUsersRoles(users))
    yield put(providerLoaded({
      provider: provider[0],
      bridges,
      // projects,
      processes,
      organizations,
      processesTasks,
      projectsProcesses,
      tasks,
      users: arrangedUsers
    }));
  } catch (err) {
    console.log(err)
    yield put(loadError(err));
  }
}

function arrangeUsersRoles(users) {
  let arrangedUsers = []
  let userIds = []
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const role = user.name
    if(!userIds.includes(user.id)) {
      userIds.push(user.id)

      user.roleTypes = role ? [role] : []
      arrangedUsers.push(user)
    } else {
      // console.log(arrangedUsers.filter(u => u.id = user.id))
      arrangedUsers.find(u => u.id = user.id).roleTypes.push(role)
    }
  }
  return arrangedUsers
}

function* getOrgTechnicalInfo(action) {
  // console.log('getOrgTechnicalInfo', action.data)

  try {
    // Call our request helper (see 'utils/request')

    const elementsGroups = yield call(request, apiUrl + 'organizations/'+ action.data +'/elements-groups');
    const structureTypes = yield call(request, apiUrl + 'organizations/'+ action.data +'/structure-types');
    const elementsTypes = yield call(request, apiUrl + 'organizations/'+ action.data +'/elements-types');
    const bridgeTypes = yield call(request, apiUrl + 'organizations/'+ action.data +'/bridge-types');
    // console.log(structureTypes)
    yield put(orgTechInfoLoaded({
      elementsGroups,
      structureTypes,
      elementsTypes,
      bridgeTypes
    }));
  } catch (err) {
    yield put(loadError(err));
  }

}



export default function* addDataSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actionTypes.GET_USERS, getUsers);
  yield takeLatest(actionTypes.GET_PROJECTS, getProjects);
  yield takeLatest(actionTypes.GET_PROVIDERS, getProviders);
  yield takeLatest(actionTypes.GET_ORGANIZATIONS, getOrganizations);
  yield takeLatest(actionTypes.GET_ROLES, getRoles);
  yield takeLatest(actionTypes.GET_ROLE_TYPES, getRoleTypes);
  yield takeLatest(actionTypes.GET_PROCESS_TEMPLATES, getprocessTemplatesTasks);
  yield takeLatest(actionTypes.GET_ORGANIZATION_BY_ID, getOrganizationById);
  yield takeLatest(actionTypes.GET_PROVIDER_BY_ID, getProviderbyId);
  yield takeLatest(actionTypes.GET_PROVIDER_ORGANIZATIONS, getProviderOrganizations);
  yield takeLatest(actionTypes.GET_ORG_TECH_INFO, getOrgTechnicalInfo);
  yield takeLatest(actionTypes.GET_USER, getUserById);
}
