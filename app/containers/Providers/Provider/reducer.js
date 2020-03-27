
import produce from 'immer';
import * as actionTypes from './constants';
import { TASK_UPDATED } from '../../AppData/constants'


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
  provider_users:[]



};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.PROVIDER_LOADED:
        console.log('PROVIDER_LOADED', action.data)
        draft.bridges = action.data.bridges;
        draft.provider = action.data.provider;
        draft.processesTemplates = action.data.processes;
        draft.processesTasks = action.data.processesTasks;
        draft.projectsProcesses = action.data.projectsProcesses;
        draft.tasks = action.data.tasks;
        draft.organizations = action.data.organizations;
        draft.provider_users = action.data.users;
        break;
      case TASK_UPDATED:
        console.log('TASK_UPDATED', action)
        let updatedTask = action.data;
        let updatedTasks = [...state.tasks]
        updatedTasks = updatedTasks.filter((task => task.id !== updatedTask.id));
        console.log(updatedTasks)
        console.log(updatedTask)
        updatedTasks.push(updatedTask);
        console.log(updatedTasks)
        draft.tasks = updatedTasks
        break;


      default:
        return state
    }
  // }
  });

export default organizationReducer;
