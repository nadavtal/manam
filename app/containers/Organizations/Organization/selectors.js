
import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectOrganization = (state) =>
{

  return state.organization || initialState
};

export const makeSelectOrganization = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.organization,
  );
export const makeSelectOrganizationProjects = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.projects,
  );
export const makeSelectOrganizationBridges = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.bridges,
  );
export const makeSelectOrganizationProcessesTemplates = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processesTemplates,
  );
export const makeSelectOrganizationProcesses = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processes,
  );
export const makeSelectOrganizationProcessesTasks = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processesTasks,
  );
export const makeSelectOrganizationProviders = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.providers,
  );
export const makeSelectOrganizationProjectsProcesses = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.projectsProcesses,
  );
export const makeSelectOrganizationMessages = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.messages,
  );
export const makeSelectOrganizationTasks = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.tasks,
  );
export const makeSelectOrganizationUsers = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.organizationUsers,
  );
export const makeSelectOrganizationRoles = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.organizationRoles,
  );
export const makeSelectProvidersRoles = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.providersRoles,
  );

// export { selectOrganization, makeSelectOrganization, makeSelectOrganizationProjects, makeSelectOrganizationBridges,
//   makeSelectOrganizationProcessesTemplates, makeSelectOrganizationProviders, makeSelectOrganizationProcessesTasks,
//   makeSelectOrganizationMessages, makeSelectOrganizationProcesses, makeSelectOrganizationProjectsProcesses,
//   makeSelectOrganizationTasks };
