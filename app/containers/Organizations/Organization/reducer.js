
import produce from 'immer';
import * as actionTypes from './constants';
import { NEW_BRIDGE_CREATED } from '../../BridgePage/constants';
import { TASK_UPDATED } from '../../AppData/constants'

export const initialState = {
  organization: {},
  bridges: [],
  projects: [],
  processes: [],
  processesTemplates: [],
  processesTasks: [],
  providers: [],
  messages: [],
  projectsProcesses: [],
  tasks: []



};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.ORGANIZATION_LOADED:
        console.log('ORGANIZATION_LOADED', action.data)
        draft.organization = action.data.organization[0];
        draft.bridges = action.data.bridges;
        draft.projects = action.data.projects;
        draft.processesTemplates = action.data.processes;
        draft.providers = action.data.providers;
        draft.processesTasks = action.data.processesTasks;
        draft.projectsProcesses = action.data.projectsProcesses;
        draft.tasks = action.data.tasks;
        break;
      case actionTypes.ORGANIZATION_PROJECT_CREATED:
        console.log('ORGANIZATION_PROJECT_CREATED', action)
        let newProject = action.project;
        newProject.id = action.id;
        console.log(newProject)
        draft.projects = [...state.projects, newProject];

        break;
      case actionTypes.PROJECT_PROCESSES_LOADED:
        console.log('PROJECT_PROCESSES_LOADED', action)

        draft.processes = data;

        break;
      case actionTypes.PROCESSES_CREATED:
        console.log('PROCESSES_CREATED', action)

        draft.processes = [...state.processes, ...action.data];

        break;
      case NEW_BRIDGE_CREATED:
        console.log('NEW_BRIDGE_CREATED', action)
        let newBridge = action.data;
        newBridge.id = action.id;
        console.log(newBridge)
        draft.bridges = [...state.bridges, newBridge];

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
