/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'App/LOAD_REPOS';
export const LOAD_ERROR = 'App/LOAD_ERROR';
export const LOAD_REPOS_SUCCESS = 'App/LOAD_REPOS_SUCCESS';
export const LOAD_USERS_ERROR = 'App/LOAD_USERS_ERROR';
export const LOGIN = 'App/LOGIN';
export const LOGOUT = 'App/LOGOUT';
export const REGISTER_USER = 'App/REGISTER_USER';
export const REGISTER_USER_RESPONSE = 'App/REGISTER_USER_RESPONSE';
export const REGISTER_PROVIDER = 'App/REGISTER_PROVIDER';
export const REGISTER_ORG = 'App/REGISTER_ORG';
export const LOAD_USER_SUCCESS = 'App/LOAD_USER_SUCCESS';
export const TOGGLE_MODAL = 'App/TOGGLE_MODAL';
export const SHOW_NOTIFICATION = 'App/SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'App/CLOSE_NOTIFICATION';
export const TOGGLE_APP_MESSAGES = 'App/TOGGLE_APP_MESSAGES';
export const KEY_PRESSED = 'App/KEY_PRESSED';
export const USERS_LOADED = 'App/USERS_LOADED';
export const PROJECTS_LOADED = 'App/PROJECTS_LOADED';
export const NEW_PROJECT_CREATED = 'App/NEW_PROJECT_CREATED';
export const ROLES_LOADED = 'App/ROLES_LOADED';
export const TOGGLE_ALERT = 'App/TOGGLE_ALERT';
export const SEND_EMAIL = 'App/SEND_EMAIL';
export const ORGANIZATION_ADDED = 'App/ORGANIZATION_ADDED';
export const ALL_DATA_LOADED = 'App/ALL_DATA_LOADED';
export const ROLE_TYPES_LOADED = 'App/ROLE_TYPES_LOADED';
export const PROVIDERS_LOADED = 'App/PROVIDERS_LOADED';
export const ORGANIZATIONS_LOADED = 'App/ORGANIZATIONS_LOADED';
export const PROCESS_TEMPLATE_LOADED = 'App/PROCESS_TEMPLATE_LOADED';
export const NEW_PROCESS_TEMPLATE_TASK_CREATED = 'App/NEW_PROCESS_TEMPLATE_TASK_CREATED';
export const PROCESS_TEMPLATE_TASK_DELETED = 'App/PROCESS_TEMPLATE_TASK_DELETED';
export const PROCESS_TASK_UPDATED = 'App/PROCESS_TASK_UPDATED';
export const ORG_REGISTERED = 'App/ORG_REGISTERED';

export const apiUrl = 'http://localhost:3000/api/v1/';
