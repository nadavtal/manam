/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */


export const ORGANIZATION_LOADED = 'organization/ORGANIZATION_LOADED';
export const ORGANIZATION_PROJECT_CREATED = 'organization/ORGANIZATION_PROJECT_CREATED';
export const PROCESSES_CREATED = 'organization/PROCESSES_CREATED';
export const UPDATE_ORGANIZATION = 'organization/UPDATE_ORGANIZATION';
export const CREATE_PROCESSES_IN_DB = 'organization/CREATE_PROCESSES_IN_DB';
export const CREATE_TASKS_IN_DB = 'organization/CREATE_TASKS_IN_DB';
export const GET_PROCESSES_BY_PROJECT_ID = 'organization/GET_PROCESSES_BY_PROJECT_ID';
export const PROJECT_PROCESSES_LOADED = 'organization/PROJECT_PROCESSES_LOADED';




