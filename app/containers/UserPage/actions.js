import * as actionTypes from './constants';
import { REGISTER_USER } from '../App/constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function registerUser(user) {
  console.log('user')
  return {
    type: REGISTER_USER,
    user,
  };
}
// export function getUser(userId) {
//   console.log(userId)
//   return {
//     type: actionTypes.GET_USER,
//     userId,
//   };
// }
export function editUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}
export function deletUser(user) {
  return {
    type: DELETE_USER,
    user,
  };
}
