
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrganization = (state) =>
{

  return state.organization || initialState
};

const makeSelectOrganization = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.organization,
  );
const makeSelectOrganizationProjects = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.projects,
  );
const makeSelectOrganizationBridges = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.bridges,
  );
const makeSelectOrganizationProcessesTemplates = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processesTemplates,
  );
const makeSelectOrganizationProcesses = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processes,
  );
const makeSelectOrganizationProcessesTasks = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.processesTasks,
  );
const makeSelectOrganizationProviders = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.providers,
  );
const makeSelectOrganizationProjectsProcesses = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.projectsProcesses,
  );
const makeSelectOrganizationMessages = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.messages,
  );
const makeSelectOrganizationTasks = () =>
  createSelector(
    selectOrganization,
    organizationState => organizationState.tasks,
  );

export { selectOrganization, makeSelectOrganization, makeSelectOrganizationProjects, makeSelectOrganizationBridges,
  makeSelectOrganizationProcessesTemplates, makeSelectOrganizationProviders, makeSelectOrganizationProcessesTasks,
  makeSelectOrganizationMessages, makeSelectOrganizationProcesses, makeSelectOrganizationProjectsProcesses,
  makeSelectOrganizationTasks };
