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


export const ALLOCATE_USER_TO_PROVIDER = 'provider/ALLOCATE_USER_TO_PROVIDER';
export const PROVIDER_LOADED = 'provider/PROVIDER_LOADED';
export const UPDATE_PROVIDER = 'provider/UPDATE_PROVIDER';


