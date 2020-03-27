/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import * as actionTypes from './constants';
import { PROVIDER_ORGANIZATIONS_LOADED } from '../AppData/constants'
// The initial state of the App
export const initialState = {
  // username: '',
  // formMode: 'login',
  // formType: 'user',
  providerOrganizations: []

};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case actionTypes.CHANGE_FORM_MODE:
        console.log(action.mode)
        draft.formMode = action.mode
        break;
      case actionTypes.CHANGE_FORM_MODE:
        console.log(action.mode)
        draft.formMode = action.mode
        break;
      // case PROVIDER_ORGANIZATIONS_LOADED:
      //   console.log(action.data)
      //   draft.providerOrganizations = action.data
      //   break;
    }
  });

export default homeReducer;