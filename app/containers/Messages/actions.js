import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function createMessage(message) {
  console.log(message)
  return {
    type: actionTypes.CREATE_MESSAGE,
    message,
  };
}



