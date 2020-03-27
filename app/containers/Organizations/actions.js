import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} Organizationname The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_OrganizationNAME
 */
export function addOrganization(organization) {
  // console.log('organization')
  return {
    type: actionTypes.ADD_ORGANIZATION,
    organization,
  };
}
export function editOrganization(organization) {
  return {
    type: actionTypes.UPDATE_ORGANIZATION,
    organization,
  };
}
export function deleteOrganization(organization) {
  return {
    type: actionTypes.DELETE_ORGANIZATION,
    organization,
  };
}




