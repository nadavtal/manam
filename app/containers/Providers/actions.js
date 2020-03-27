import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} Providername The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_ProviderNAME
 */
export function addProvider(Provider) {
  // console.log('Provider')
  return {
    type: actionTypes.ADD_PROVIDER,
    Provider,
  };
}
export function editProvider(Provider) {
  return {
    type: actionTypes.UPDATE_PROVIDER,
    Provider,
  };
}
export function deleteProvider(Provider) {
  return {
    type: actionTypes.DELETE_PROVIDER,
    Provider,
  };
}




