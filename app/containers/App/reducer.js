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
import { GET_PROVIDER_BY_ID, LOGIN, LOGOUT } from '../AppData/constants'
import { ORGANIZATION_LOADED } from '../Organizations/Organization/constants'
import { PROVIDER_LOADED } from '../Providers/Provider/constants'
import { updateProcessTasks } from '../Processes/actions';
// The initial state of the App
export const initialState = {
  loading: false,
  loadingMessage: '',
  error: false,
  currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '',
  currentUserRole: localStorage.getItem('currentUserRole') ? JSON.parse(localStorage.getItem('currentUserRole')) : '',
  modalOpen: false,
  showNotification: false,
  showMessages: false,
  alertOpen: false,
  alertData:  {
    title: '',
    text: '',
    confirmButton: '',
    cancelButton: '',
    options: []
  },
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
  statuses: {
    'Active': {id: 1, name: 'Active', color: 'primary'},
    'Created': {id: 2, name: 'Created', color: 'default'},
    'Awaiting confirmation': {id: 3, name: 'Awaiting confirmation', color: 'danger'},
    'Confirmend': {id: 4, name: 'Confirmend', color: 'success'},
    'Inactive': {id: 5, name: 'Inactive', color: 'light'},
    

  },
  connectionStatuses: {
    'Awaiting approvement': {id: 11, name: 'Awaiting approvement', color: 'danger'},
    'Approved': {id: 13, name: 'Approved', color: 'success'},
    'Unapproved': {id: 23, name: 'Unapproved', color: 'dark'},
  },
  // statuses: [
  //   {id: 'Active', name: 'Active', color: 'orange'},
  //   {id: 'Created', name: 'Created', color: 'grey'},
  //   {id: 'Awaiting confirmation', name: 'Awaiting confirmation', color: 'red'},
  //   {id: 'Confirmend', name: 'Confirmend', color: 'green'},
  //   {id: 'On Hold', name: 'On Hold', color: 'blue'},
  //   {id: 'Inactive', name: 'Inactive', color: 'faded'},
  // ],
  users: [],
  organizations: [],
  providers: [],
  projects: [],
  processes: [],
  tasks: [],
  providersUsers:[],
  organizationsUsers:[],
  organizationProviders:[],
  roles: [],
  roleTypes: [],
  selectedProvider: {},
  processTemplatesTasks: [],
  keyPressed: null,
  newOrg: null,
  newProvider: null,
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
      case actionTypes.ROLE_SELECTED:
        // console.log('USERS_LOADED', action)
        
        localStorage.removeItem('currentUserRole');
        localStorage.setItem('currentUserRole', JSON.stringify(action.role))
        draft.currentUserRole = action.role
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
      case actionTypes.FOUND_RESULTS:
        console.log('FOUND_RESULTS', action)
        // draft.modalOpen = false
        draft.loading = false;
        draft.foundResults = action.data
        break;

      case LOGIN:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGOUT:
        console.log('LOGOUT', state.alertOpen)
        localStorage.removeItem('currentUser')
        draft.currentUser = null;
        draft.modalOpen = false;
        // draft.alertOpen = false;

        break;

      case actionTypes.LOAD_USER_SUCCESS:
        console.log(action)
        if (localStorage.getItem('currentUser')) localStorage.removeItem('currentUser')
        const user = {
          userInfo: action.userData.user,
               
        }
        if (action.userData.userSystemRoles) {
          user['userSystemRoles'] =  action.userData.userSystemRoles
          // draft.currentUserRole = action.userData.userSystemRole[0].role_name;
          
        } else {
          user['userOrganiztionRoles'] =  action.userData.userOrganizationRoles
          user['userProviderRoles'] =  action.userData.userProviderRoles
        }
        draft.currentUser = user;
        draft.loading = false;
        localStorage.setItem('currentUser', JSON.stringify(user));

        break;

      case actionTypes.TOGGLE_MODAL:
        // console.log('TOGGLE_MODAL', state.modalOpen)
        draft.modalData = {...action.modalData}
        draft.modalOpen = !state.modalOpen;

        break;
      case actionTypes.TOGGLE_ALERT:
        // console.log('TOGGLE_ALERT', action)
        draft.alertData = action.data
        draft.alertOpen = !state.alertOpen;

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
      case actionTypes.USER_UPDATED:
        console.log('USER_UPDATED', action)
        console.log('USER_UPDATED', state.currentUser.userInfo);
        const updatedUser = {...state.currentUser}
        updatedUser.userInfo = {...updatedUser.userInfo, ...action.data}
        console.log('updatedUser', updatedUser)
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        draft.currentUser = updatedUser;

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
        // console.log('NEW_PROCESS_TEMPLATE_TASK_CREATED', action.data);

        draft.processTemplatesTasks = [...state.processTemplatesTasks, action.data]
        break;
      case actionTypes.PROCESS_TEMPLATE_TASK_DELETED:
        // console.log('PROCESS_TEMPLATE_TASK_DELETED', action.id);
        let updatedProcessTasks = [...state.processTemplatesTasks];
        updatedProcessTasks = updatedProcessTasks.filter(task => task.id !== parseInt(action.id));
        console.log(updatedProcessTasks)
        draft.processTemplatesTasks = updatedProcessTasks
        break;
      case actionTypes.PROCESS_TASK_UPDATED:
        // console.log('PROCESS_TASK_UPDATED', action.data.id);
        let stateTasksCopy = [...state.processTemplatesTasks];
        stateTasksCopy = stateTasksCopy.filter(task => task.id !== parseInt(action.data.id));
        console.log(stateTasksCopy)

        stateTasksCopy.push(action.data)
        console.log(stateTasksCopy)
        draft.processTemplatesTasks = stateTasksCopy
        break;
      case actionTypes.ORG_REGISTERED:
        // console.log('ORG_REGISTERED', action.data);
        let stateOrgsCopy = [...state.organizations];
        stateOrgsCopy.push(action.data)
        console.log(stateOrgsCopy)
        draft.organizations = stateOrgsCopy
        break;
      case GET_ORGANIZATION_BY_ID:
        draft.loading = true
        draft.loadingMessage = 'Getting Organization data'
        break;
      case ORGANIZATION_LOADED:
        draft.loading = false
        break;
      case GET_PROVIDER_BY_ID:
        draft.loading = true;
        draft.loadingMessage = 'Getting Provider data'
        break;
      case PROVIDER_LOADED:
        draft.loading = false
        break;
      case actionTypes.ORGANIZATION_ADDED:
        // draft.newOrg = {org: action.org, users: action.users};
        draft.organizations = [...state.organizations,action.org];
        
        break;
      case actionTypes.TOGGLE_LOADING:
        // draft.newOrg = {org: action.org, users: action.users};
        draft.loading = !state.loading;
        draft.loadingMessage = action.msg
        
        break;
      case actionTypes.ORGANIZATION_UPDATED:
        console.log(action)
        const newOrg = action.org;
        draft.organizations = [...state.organizations.filter(org => org.id !== newOrg.id),newOrg];
        
        break;
      case actionTypes.PROVIDER_UPDATED:
        console.log(action)
        const newProvider = action.data;
        draft.providers = [...state.providers.filter(prov => prov.id !== newProvider.id),newProvider];
        
        break;
      case actionTypes.PROVIDER_ADDED:
        draft.newProvider = {provider: action.provider, users: action.users};
        draft.providers = [...state.providers, action.provider];
        
        break;
      case actionTypes.NEW_ROLE_CREATED:
        // console.log('NEW_ROLE_CREATED')
        draft.roles = [...state.roles, action.newRole];
        
        break;
      case actionTypes.USER_ALLOCATED:
        // console.log('USER_ALLOCATED', action.data)
        if (action.data.organization_id) draft.organizationsUsers = [...state.organizationsUsers, action.data];
        if (action.data.provider_id) draft.providersUsers = [...state.providersUsers, action.data];
        draft.foundResults = null
        
        break;
      case actionTypes.ROLE_TYPE_CREATED:
        // console.log('USER_ALLOCATED', action.data)
        draft.roleTypes = [...state.roleTypes, action.data]
        
        
        break;
      case actionTypes.PROVIDER_ALLOCATED:
        // console.log('PROVIDER_ALLOCATED', action.data)
        // console.log('PROVIDER_ALLOCATED', state.organizationProviders)
        draft.organizationProviders = [...state.organizationProviders, action.data.connection]
        
        
        break;
      case actionTypes.ORG_USER_UPDATED:
        // console.log('ORG_USER_UPDATED', action.data)
        // console.log(state.organizationsUsers)
        // draft.organizationProviders = [...state.organizationProviders, action.data]
        
        
        break;
      case actionTypes.ALL_DATA_LOADED:
        console.log('ALL_DATA_LOADED', action.data)
        draft.organizations = action.data.organizations;
        draft.providers = action.data.providers;
        draft.users = action.data.users;
        draft.projects = action.data.projects;
        draft.processes = action.data.processes;
        draft.tasks = action.data.tasks;
        draft.organizationsUsers = action.data.organizationsUsers;
        draft.providersUsers = action.data.providersUsers;
        draft.organizationProviders = action.data.organizationProviders;
        break;
    }
  });

export default appReducer;
