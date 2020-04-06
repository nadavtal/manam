import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} Providername The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_ProviderNAME
 */




export function addOrganization(data) {
  console.log('organization')
  return {
    type: actionTypes.ADD_ORGANIZATION,
    data,
  };
}
export function editOrganization(data) {
  return {
    type: actionTypes.UPDATE_ORGANIZATION,
    data,
  };
}
export function deleteOrganization(data) {
  return {
    type: actionTypes.DELETE_ORGANIZATION,
    data,
  };
}



export function getAllData() {
  
  return {
    type: actionTypes.GET_ALL_DATA,
    
  };
}

export function allocateUserToOrg(user, org, roletypeId, roleName) {
  
  return {
    type: actionTypes.ALLOCATE_USER_TO_ORG,
    user, 
    org, 
    roletypeId,
    roleName
  };
}







