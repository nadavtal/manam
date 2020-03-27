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

export const DELETE_ORGANIZATION = 'boilerplate/organizations/DELETE_ORGANIZATION';
export const UPDATE_ORGANIZATION = 'boilerplate/organizations/UPDATE_ORGANIZATION';
export const ADD_ORGANIZATION = 'boilerplate/organizations/ADD_ORGANIZATION';


