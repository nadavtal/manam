/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import bridgePageReducer from './containers/BridgePage/reducer'
import rolesReducer from './containers/RolesPage/reducer'
import resiumReducer from './containers/Resium/reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    rolesReducer: rolesReducer,
    bridgePageReducer: bridgePageReducer,
    resiumReducer: resiumReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
