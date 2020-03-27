
import produce from 'immer';

// The initial state of the App
export const initialState = {

  loading: false,
  error: false,
  currentUser: false,
  projectMainData: {
    projectName: '',
    generalLength: 0,
    maxSpanLength: 0,
    Spans: 0,
    maxWidth: 0,
    foundation: '',
    skethFileUrl: '',
    lat: 0,
    lon: 0,
    localX: 0,
    localY: 0,
    status: '',
    imageUrl: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const projectReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {



    }
  });

export default projectReducer;
