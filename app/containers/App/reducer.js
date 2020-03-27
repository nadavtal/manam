/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actionTypes, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import * as actionTypes from './constants';
import { GET_ORGANIZATION_BY_ID } from '../AppData/constants'
import { GET_PROVIDER_BY_ID } from '../AppData/constants'
import { ORGANIZATION_LOADED } from '../Organizations/Organization/constants'
import { PROVIDER_LOADED } from '../Providers/Provider/constants'
import { updateProcessTasks } from '../Processes/actions';


// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '',
  modalOpen: false,
  showNotification: false,
  showMessages: false,
  userData: {
    repositories: false,
  },
  modalData: {
    title: '',
    text: '',
    confirmButton: '',
    cancelButton: '',
    options: []
  },
  notificationData: {
    message: 'message',
    title: 'title',
    icon: 'bell',
    text: 'notificagtion text',
    autohide: 3000

  },
  users: [
    ],
  organizations: [],
  providers: [],
  projects: [],
  roles: [],
  roleTypes: [],
  selectedProvider: {},
  processTemplatesTasks: [],
  keyPressed: null

};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.KEY_PRESSED:
        console.log('KEY_PRESSED', action.data)
        draft.keyPressed = action.data;
        break;
      case actionTypes.USERS_LOADED:
        // console.log('USERS_LOADED', action)
        draft.loading = true;
        draft.error = false;
        draft.users = action.data;
        break;
      case actionTypes.PROJECTS_LOADED:
        // console.log('PROJECTS_LOADED', action)
        draft.loading = true;
        draft.error = false;
        draft.projects = action.data;
        break;

      case actionTypes.LOAD_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case actionTypes.LOAD_USERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case actionTypes.LOGIN:
        draft.loading = true;
        draft.error = false;
        break;
      case actionTypes.LOGOUT:
        localStorage.removeItem('currentUser')
        draft.currentUser = null;
        draft.modalOpen = false
        break;

      case actionTypes.LOAD_USER_SUCCESS:
        if (localStorage.getItem('currentUser')) localStorage.removeItem('currentUser')
        const user = {
          userInfo: action.userData.user,
          userOrganiztionRoles: action.userData.userOrganizationRoles,
          userProviderRoles: action.userData.userProviderRoles,

        }
        console.log(user);
        draft.currentUser = user
        draft.loading = false;
        // draft.currentUser = action.user;
        localStorage.setItem('currentUser', JSON.stringify(user))

        break;

      case actionTypes.TOGGLE_MODAL:
        // console.log('TOGGLE_MODAL', action)
        draft.modalOpen = !state.modalOpen;
        draft.modalData = {...action.modalData}

        break;
      case actionTypes.REGISTER_USER:
        // console.log('REGISTER_USER');
        // action.user.id = state.users.length + 1
        // console.log(action.user)
        // draft.users = state.users.concat(action.user);
        // console.log(draft.users)

        break;

      case actionTypes.TOGGLE_APP_MESSAGES:
        // console.log('TOGGLE_APP_MESSAGES');
        // console.log(!state.showMessages)
        draft.showMessages = !state.showMessages;
        // draft.currentUser = action.username;
        break;
      case actionTypes.NEW_PROJECT_CREATED:
        // console.log(action)

        // console.log(state.projects.concat(action.project));
        draft.projects = state.projects.concat(action.project);
        draft.showNotification = true;
        draft.notificationData.message = 'New project created: '+ action.project.projectName;

        break
      case actionTypes.SHOW_NOTIFICATION:
        console.log(action)
        draft.showNotification = true;
        draft.notificationData = action.data;
        break
      case actionTypes.CLOSE_NOTIFICATION:
        // console.log('CLOSE_NOTIFICATION', action)
        draft.showNotification = false;

        break
      case actionTypes.ROLES_LOADED:
        // console.log(action)
        draft.roles = action.roles;

        break
      case actionTypes.ROLE_TYPES_LOADED:
        // console.log(action)
        draft.roleTypes = action.roleTypes;

        break
      case actionTypes.PROVIDERS_LOADED:
        // console.log('PROVIDERS_LOADED', action)
        draft.providers = action.data;

        break
      case actionTypes.ORGANIZATIONS_LOADED:
        // console.log('ORGANIZATIONS_LOADED', action)
        draft.organizations = action.data;

        break

      case actionTypes.PROCESS_TEMPLATE_LOADED:
        // console.log('PROCESS_TEMPLATE_LOADED', action.data);

        draft.processTemplatesTasks = action.data
        break;
      case actionTypes.NEW_PROCESS_TEMPLATE_TASK_CREATED:
        console.log('NEW_PROCESS_TEMPLATE_TASK_CREATED', action.data);

        draft.processTemplatesTasks = [...state.processTemplatesTasks, action.data]
        break;
      case actionTypes.PROCESS_TEMPLATE_TASK_DELETED:
        console.log('PROCESS_TEMPLATE_TASK_DELETED', action.id);
        let updatedProcessTasks = [...state.processTemplatesTasks];
        updatedProcessTasks = updatedProcessTasks.filter(task => task.id !== parseInt(action.id));
        console.log(updatedProcessTasks)
        draft.processTemplatesTasks = updatedProcessTasks
        break;
      case actionTypes.PROCESS_TASK_UPDATED:
        console.log('PROCESS_TASK_UPDATED', action.data.id);
        let stateTasksCopy = [...state.processTemplatesTasks];
        stateTasksCopy = stateTasksCopy.filter(task => task.id !== parseInt(action.data.id));
        console.log(stateTasksCopy)

        stateTasksCopy.push(action.data)
        console.log(stateTasksCopy)
        draft.processTemplatesTasks = stateTasksCopy
        break;
      case actionTypes.ORG_REGISTERED:
        console.log('ORG_REGISTERED', action.data);
        let stateOrgsCopy = [...state.organizations];
        stateOrgsCopy.push(action.data)
        console.log(stateOrgsCopy)
        draft.organizations = stateOrgsCopy
        break;
      case GET_ORGANIZATION_BY_ID:
        draft.loading = true
        break;
      case ORGANIZATION_LOADED:
        draft.loading = false
        break;
      case GET_PROVIDER_BY_ID:
        draft.loading = true
        break;
      case PROVIDER_LOADED:
        draft.loading = false
        break;
    }
  });

export default appReducer;
