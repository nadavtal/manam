import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} Organizationname The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_OrganizationNAME
 */
// export function getOrganizationbyId(id) {
//   console.log(id)
//   return {
//     type: actionTypes.GET_ORGANIZATION_BY_ID,
//     id,
//   };
// }
export function organizationLoaded(data) {
  // console.log('organization')
  return {
    type: actionTypes.ORGANIZATION_LOADED,
    data,
  };
}



export function processesCreated(data) {
  // console.log('organization')
  return {
    type: actionTypes.PROCESSES_CREATED,
    data,
  };
}
export function createProcessesInDB(data) {
  // console.log('organization')
  return {
    type: actionTypes.CREATE_PROCESSES_IN_DB,
    data,
  };
}
export function createTasksInDB(data) {
  // console.log('organization')
  return {
    type: actionTypes.CREATE_TASKS_IN_DB,
    data,
  };
}

export function organizationProjectCreated(project, id) {

  return {
    type: actionTypes.ORGANIZATION_PROJECT_CREATED,
    project,
    id
  };
}
export function getProcessesByProjectId(id) {

  return {
    type: actionTypes.GET_PROCESSES_BY_PROJECT_ID,
    id
  };
}




export function projectProcessesLoaded(data) {

  return {
    type: actionTypes.PROJECT_PROCESSES_LOADED,
    data,

  };
}





