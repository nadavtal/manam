
import * as actionTypes from './constants';
import { browserHistory } from 'react-router'

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function login(user) {
  console.log(user)
  return {
    type: actionTypes.LOGIN,
    user: user
  };
}
export function logout() {
  console.log('logout')
  return {
    type: actionTypes.LOGOUT,
    
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: actionTypes.LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: actionTypes.LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function userLoaded(userData) {
  // browserHistory.push('/organizations')
  console.log(browserHistory)
  return {
    type: actionTypes.LOAD_USER_SUCCESS,
    userData,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_USERS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: actionTypes.LOAD_USERS_ERROR,
    error,
  };
}
export function loadError(error) {
  console.log(error)
  return {
    type: actionTypes.LOAD_ERROR,
    error,
  };
}

export function toggleModal(modalData) {
  // console.log('alskdjlaskdj')
  return {
    type: actionTypes.TOGGLE_MODAL,
    modalData: modalData
  };
}
export function toggleAlert(data) {
  // console.log('alskdjlaskdj')
  return {
    type: actionTypes.TOGGLE_ALERT,
    data: data
  };
}

export function showNotification(data) {
  // console.log(data)
  return {
    type: actionTypes.SHOW_NOTIFICATION,
    data: data
  };
}

export function registerUser(user) {
  
  return {
    type: actionTypes.REGISTER_USER,
    data: user
  };
}
export function registerUserResponse(data) {
  
  return {
    type: actionTypes.REGISTER_USER_RESPONSE,
    data
  };
}
export function registerProvider(provider) {
  console.log('registerProvider')
  return {
    type: actionTypes.REGISTER_PROVIDER,
    data: provider
  };
}
export function registerOrg(org) {
  console.log('registerOrg')
  return {
    type: actionTypes.REGISTER_ORG,
    data: org
  };
}

export function usersLoaded(data) {

  return {
    type: actionTypes.USERS_LOADED,
    data

  };
}
export function projectsLoaded(data) {

  return {
    type: actionTypes.PROJECTS_LOADED,
    data

  };
}

export function newProjectCreated(project) {

  return {
    type: actionTypes.NEW_PROJECT_CREATED,
    project
  };
}
export function closeNotification(project) {

  return {
    type: actionTypes.CLOSE_NOTIFICATION,
  };
}

export function rolesLoaded(roles) {

  return {
    type: actionTypes.ROLES_LOADED,
    roles: roles
  };
}

export function roleTypesLoaded(roleTypes) {

  return {
    type: actionTypes.ROLE_TYPES_LOADED,
    roleTypes: roleTypes
  };
}
export function providersLoaded(data) {

  return {
    type: actionTypes.PROVIDERS_LOADED,
    data: data
  };
}
export function organizationsLoaded(data) {

  return {
    type: actionTypes.ORGANIZATIONS_LOADED,
    data: data
  };
}

export function newProcessTemplateTaskCreated(data) {

  return {
    type: actionTypes.NEW_PROCESS_TEMPLATE_TASK_CREATED,
    data,
  };
}
export function processTemplatesTasksLoaded(data) {
  // console.log('Provider')
  return {
    type: actionTypes.PROCESS_TEMPLATE_LOADED,
    data,
  };
}
export function processTaskDeleted(id) {
  // console.log(id)
  return {
    type: actionTypes.PROCESS_TEMPLATE_TASK_DELETED,
    id,
  };
}
export function processTaskUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.PROCESS_TASK_UPDATED,
    data
  };
}
export function orgRegistered(data) {
  // console.log(data)
  return {
    type: actionTypes.ORG_REGISTERED,
    data
  };
}
export function keyPressed(data) {
  console.log(data)
  return {
    type: actionTypes.KEY_PRESSED,
    data
  };
}
export function sendEmail(data) {
  console.log(data)
  return {
    type: actionTypes.SEND_EMAIL,
    data
  };
}

export function allDataLoaded(data) {
  
  return {
    type: actionTypes.ALL_DATA_LOADED,
    data
  };
}

export function organizationAdded(org, users) {
  return {
    type: actionTypes.ORGANIZATION_ADDED,
    org,
    users
  };
}


