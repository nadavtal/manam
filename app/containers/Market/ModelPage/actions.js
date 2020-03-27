import * as actionTypes  from './constants';

// import {TOGGLE_MESSAGES} from 'containers/App/constants'

/**
 * Changes the input field of the form
 *
 * @param  {string} projectId the ID of the project
 *
 * @return {object} An action object with a type of UPLOAD_PROJECT
 */

export function createNewSurvey(survey) {

  return {
    type: actionTypes.CREATE_NEW_SURVEY,
    survey
  };
}

