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

// The initial state of the App
export const initialState = {
  users: [],
  searchTerm: '',

};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.DELETE_PROVIDER:

        console.log('DELETE_PROVIDER')
        break;
      case actionTypes.UPDATE_PROVIDER:

        console.log('UPDATE_PROVIDER')
        break;


      default:
        return {...state}
    }
  // }
  });

export default usersReducer;
