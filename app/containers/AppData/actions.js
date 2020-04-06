import * as actionTypes  from './constants';



export function getUsers() {
  // console.log('getUsers')
  return {
    type: actionTypes.GET_USERS,

  };
}
export function getUser(id) {
  console.log(id)
  return {
    type: actionTypes.GET_USER,
    id
  };
}

export function getProviders() {
  // console.log('getProviders')
  return {
    type: actionTypes.GET_PROVIDERS,

  };
}


export function getOrganizations() {
  // console.log('getOrganizations')
  return {
    type: actionTypes.GET_ORGANIZATIONS,

  };
}

export function getProjects() {

  return {
    type: actionTypes.GET_PROJECTS,

  };
}

export function getRoles() {

  return {
    type: actionTypes.GET_ROLES,
  };
}
export function getRoleTypes() {

  return {
    type: actionTypes.GET_ROLE_TYPES,
  };
}



export function getprocessTemplatesTasks() {
  // console.log('user')
  return {
    type: actionTypes.GET_PROCESS_TEMPLATES,

  };
}

export function getOrganizationbyId(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_ORGANIZATION_BY_ID,
    id,
  };
}
export function getProviderbyId(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_PROVIDER_BY_ID,
    id,
  };
}
export function getProviderOrganizations(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_PROVIDER_ORGANIZATIONS,
    id,
  };
}
export function providerOrganizationsLoaded(data) {
  // console.log(data)
  return {
    type: actionTypes.PROVIDER_ORGANIZATIONS_LOADED,
    data,
  };
}


export function updateTask(data) {

  return {
    type: actionTypes.UPDATE_TASK,
    data,

  };
}

export function taskUpdated(data) {

  return {
    type: actionTypes.TASK_UPDATED,
    data,

  };
}

export function getOrgTechnicalInfo(data) {
  console.log('getOrgTechnicalInfo', data)
  return {
    type: actionTypes.GET_ORG_TECH_INFO,
    data,
  };
}

export function orgTechInfoLoaded(data) {
    // console.log('organization')
  return {
    type: actionTypes.ORG_TECH_INFO_LOADED,
    data,
  };
}
export function findEntityByEmail(data) {
    // console.log('organization')
  return {
    type: actionTypes.FIND_ENTITY_BY_EMAIL,
    data,
  };
}
export function foundResults(data) {
    // console.log('organization')
  return {
    type: actionTypes.FOUND_RESULTS,
    data,
  };
}

