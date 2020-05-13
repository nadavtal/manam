
import produce from 'immer';
import * as actionTypes from './constants';
import { NEW_BRIDGE_CREATED } from '../../BridgePage/constants';
import { TASK_UPDATED } from '../../AppData/constants';
import { USER_ALLOCATED, ORG_USER_UPDATED, PROVIDER_ALLOCATED, NEW_ROLE_CREATED, PROV_ORG_CONNECTION_UPDATED,
  ORGANIZATION_UPDATED } from '../../App/constants';
import { addProviderToRoles, getRoleById } from '../../../utils/dataUtils';
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
  tasks: [],
  organizationUsers: [],
  organizationRoles: [],
  providersRoles:[],


};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.ORGANIZATION_LOADED:
        console.log('ORGANIZATION_LOADED', action.data)
        draft.organization = action.data.organization[0];
        draft.organizationUsers = action.data.organizationUsers;
        draft.organizationRoles = action.data.organizationRoles;
        draft.bridges = action.data.bridges;
        draft.projects = action.data.projects;
        draft.processesTemplates = action.data.processes;
        draft.providers = action.data.providers;
        draft.processesTasks = action.data.processesTasks;
        draft.projectsProcesses = action.data.projectsProcesses;
        draft.tasks = action.data.tasks;
        draft.providersRoles = action.data.providersRoles;
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
      case USER_ALLOCATED:
        console.log('USER_ALLOCATED', action)
        if (action.data.role_id && !action.data.roleName) {
          // console.log([...state.organizationRoles, ...state.providersRoles])
          // console.log(state.organizationRoles, state.providersRoles)
          const role = getRoleById(action.data.role_id, state.organizationRoles)
          console.log(role)
          action.data['roleName'] = role.name;
          // action.data['description'] = role.description;
  
        }
        if (!action.data.date_created) {
          action.data['date_created'] = Date.now();
        }
        draft.organizationUsers = [...state.organizationUsers, action.data];

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
      case ORG_USER_UPDATED:
        console.log('ORG_USER_UPDATED', action.data)
        console.log(state.organizationUsers);
        let orgUsers = [...state.organizationUsers];
        const userToUpdate = orgUsers.find(orgUser => orgUser.user_id == action.data.user_id && orgUser.role_id == action.data.old_role_id) 
        console.log(userToUpdate);
        userToUpdate.role_id = action.data.new_role_id;
        userToUpdate.status = action.data.new_status;
        draft.organizationUsers = orgUsers
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

      case PROVIDER_ALLOCATED:
        console.log('PROVIDER_ALLOCATED', action.data)

        draft.providers = [...state.providers, {...action.data.provider, ...action.data.connection }]
        
        
        break;
      case NEW_ROLE_CREATED:
        console.log('NEW_ROLE_CREATED', action)
        draft.organizationRoles = [...state.organizationRoles, action.newRole];
        
        break;
      case ORGANIZATION_UPDATED:
        console.log(action)
        
        draft.organization = action.org;
        
        break;
      case PROV_ORG_CONNECTION_UPDATED:
        console.log('PROV_ORG_CONNECTION_UPDATED', action.data);
        console.log(state.organizations);
        const updatedState = [...state.providers];
        let updatedConnection = updatedState.find(
          connection => connection.organization_id === action.data.organization_id 
          && 
          connection.provider_id === action.data.provider_id)
        // draft.providerRoles = [...state.providerRoles, action.newRole];
        updatedConnection.organization_id = action.data.organization_id;
        updatedConnection.provider_id = action.data.provider_id;
        updatedConnection.status = action.data.new_status;
        updatedConnection.remarks = action.data.remarks;
        updatedConnection.provider_code = action.data.provider_code;
        console.log(updatedConnection);
        console.log(updatedState);
        draft.providers = updatedState
        break;
      default:
        return state
    }
  // }
  });

export default organizationReducer;
