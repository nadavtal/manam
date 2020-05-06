
import produce from 'immer';
import * as actionTypes from './constants';
import { TASK_UPDATED } from '../../AppData/constants';
import { USER_ALLOCATED, NEW_ROLE_CREATED, PROV_ORG_CONNECTION_UPDATED, ORG_USER_UPDATED,
  PROV_USER_UPDATED } from '../../App/constants';
import { addProviderToRoles, getRoleById } from '../../../utils/dataUtils';

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
  providerUsers:[],
  providerRoles:[],
  organizationUsers:[],
  organizationsRoles:[]
};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.PROVIDER_LOADED:
        // console.log('PROVIDER_LOADED', action.data)
        draft.bridges = action.data.bridges;
        draft.provider = action.data.provider;
        draft.processesTemplates = action.data.processes;
        draft.processesTasks = action.data.processesTasks;
        draft.projectsProcesses = action.data.projectsProcesses;
        draft.tasks = action.data.tasks;
        draft.organizations = action.data.organizations;
        draft.providerUsers = action.data.providerUsers;
        draft.providerRoles = action.data.providerRoles;
        draft.organizationUsers = action.data.organizationUsers;
        draft.organizationsRoles = action.data.organizationsRoles;
        break;
      case TASK_UPDATED:
        // console.log('TASK_UPDATED', action)
        let updatedTask = action.data;
        let updatedTasks = [...state.tasks]
        updatedTasks = updatedTasks.filter((task => task.id !== updatedTask.id));
        console.log(updatedTasks)
        console.log(updatedTask)
        updatedTasks.push(updatedTask);
        console.log(updatedTasks)
        draft.tasks = updatedTasks
        break;

      case USER_ALLOCATED:
        // console.log('USER_ALLOCATED', action.data)
        // console.log('USER_ALLOCATED', state.providerUsers)
        // console.log('USER_ALLOCATED', state.organizationUsers)
        if (action.data.role_id && !action.data.roleName) {
          let role
          if (action.data.from_provider_id) {
            role = getRoleById(action.data.role_id, state.organizationsRoles)
          } else role = getRoleById(action.data.role_id, state.providerRoles)
          console.log(role)
          action.data['roleName'] = role.name;
          action.data['description'] = role.description;
  
        }
        if (!action.data.date_created) {
          action.data['date_created'] = Date.now();
        }
        if (action.data.provider_id)  {
          draft.providerUsers = [...state.providerUsers, action.data]
        } else {
          draft.organizationUsers = [...state.organizationUsers, action.data]
        };
        draft.foundResults = null
        
        break;
      case ORG_USER_UPDATED:
        // console.log('ORG_USER_UPDATED', action.data)
        // console.log(state.organizationUsers);
        let orgUsers = [...state.organizationUsers];
        const userToUpdate = orgUsers.find(orgUser => orgUser.user_id == action.data.user_id && orgUser.role_id == action.data.old_role_id) 
        // console.log(userToUpdate);
        userToUpdate.role_id = action.data.new_role_id;
        userToUpdate.status = action.data.new_status;
        draft.organizationUsers = orgUsers;
        break
      case NEW_ROLE_CREATED:
        console.log('NEW_ROLE_CREATED')
        draft.providerRoles = [...state.providerRoles, action.newRole];
        
        break;
      case PROV_USER_UPDATED:
        // console.log('ORG_USER_UPDATED', action.data)
        // console.log(state.organizationUsers);
        let provUsers = [...state.providerUsers];
        const provUserToUpdate = provUsers.find(provUser => provUser.user_id == action.data.user_id && provUser.role_id == action.data.old_role_id) 
        // console.log(provUserToUpdate);
        provUserToUpdate.role_id = action.data.new_role_id;
        provUserToUpdate.status = action.data.new_status;
        console.log(provUsers)
        draft.providerUsers = provUsers
        break
      case NEW_ROLE_CREATED:
        console.log('NEW_ROLE_CREATED')
        draft.providerRoles = [...state.providerRoles, action.newRole];
        
        break;
      case PROV_ORG_CONNECTION_UPDATED:
        console.log('PROV_ORG_CONNECTION_UPDATED', action.data);
        console.log(state.organizations);
        const updatedState = [...state.organizations];
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
        draft.organizations = updatedState
        break;
        
      default:
        return state
    }
  // }
  });

export default organizationReducer;
