
import produce from 'immer';
import * as actionTypes from './constants';
import { ORGANIZATION_ADDED } from '../App/constants'


export const initialState = {
  provider: {},
  bridges: [],
  projects: [],
  processes: [],
  processesTemplates: [],
  processesTasks: [],
  organizations: [],
  messages: [],
  projectsProcesses: [],
  tasks: [],
  provider_users:[],
 
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.ADD_ORGANIZATION:
        // console.log('ADD_ORGANIZATION', action.data)
        // draft.bridges = action.data.bridges;
        
        break;
      case ORGANIZATION_ADDED:
        console.log('ORGANIZATION_ADDED', action)
        
        
        break;
      case actionTypes.ALL_DATA_LOADED:
        console.log('ALL_DATA_LOADED', action.data)
        draft.organizations = action.data.organizations;
        draft.providers = action.data.providers;
        draft.users = action.data.users;
        draft.projects = action.data.projects;
        draft.processes = action.data.processes;
        draft.tasks = action.data.tasks;
        
        break;
   


      default:
        return state
    }
  // }
  });

export default adminReducer;
