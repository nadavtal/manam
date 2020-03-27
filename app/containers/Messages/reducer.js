
import produce from 'immer';
import { CREATE_MESSAGE } from './constants';

// The initial state of the App
export const initialState = {

  loading: false,
  error: false,
  currentUser: false,

};

/* eslint-disable default-case, no-param-reassign */
const projectReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {
      // case CREATE_MESSAGE:
      //   draft.loading = true;
      //   draft.error = false;
      //   console.log('CREATE_MESSAGE');

      //   break;

      // case CREATE_NEW_PROJECT:
      //   console.log('CREATE_NEW_PROJECT')
      //   draft.loading = false;
      //   draft.currentUser = action.username;
      //   break;


    }
  });

export default projectReducer;
