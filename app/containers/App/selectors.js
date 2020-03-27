/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.users,
  );
const makeSelectOrganizations = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.organizations,
  );
const makeSelectProviders = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.providers,
  );
const makeSelectProjects = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.projects,
  );
const makeSelectRoles = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.roles,
  );
const makeSelectRoleTypes = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.roleTypes,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectModalOpen = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.modalOpen,
  );
const makeSelectModalData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.modalData,
    );

const makeSelectShowNotification = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.showNotification,
    );

const makeSelectNotificationData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notificationData,
    );
const makeSelectShowMessages = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notificationData,
  );

const makeSelectProvider = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedProvider,
  );
const makeSelectprocessTemplatesTasks = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.processTemplatesTasks,
  );
const makeSelectKeyPressed = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.geyPressed,
  );

const getModalOpen = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.modalOpen
  )
const getKeyPressed = createSelector(
     selectGlobal ,
    (selectGlobal) => selectGlobal.keyPressed
  )
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectModalOpen,
  makeSelectModalData,
  makeSelectUsers,
  makeSelectShowMessages,
  makeSelectProjects,
  makeSelectShowNotification,
  makeSelectNotificationData,
  makeSelectProviders,
  makeSelectRoles,
  makeSelectRoleTypes,
  makeSelectOrganizations,
  makeSelectProvider,
  makeSelectprocessTemplatesTasks,
  makeSelectKeyPressed,
  getModalOpen,
  getKeyPressed,
};
