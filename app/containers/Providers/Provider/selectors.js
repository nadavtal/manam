
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProvider = (state) =>
{

  return state.provider || initialState
};

const makeSelectProvider = () =>
  createSelector(
    selectProvider,
    providerState => providerState.provider,
  );
const makeSelectProviderProjects = () =>
  createSelector(
    selectProvider,
    providerState => providerState.projects,
  );
const makeSelectProviderBridges = () =>
  createSelector(
    selectProvider,
    providerState => providerState.bridges,
  );
const makeSelectProviderProcessesTemplates = () =>
  createSelector(
    selectProvider,
    providerState => providerState.processesTemplates,
  );
const makeSelectProviderProcesses = () =>
  createSelector(
    selectProvider,
    providerState => providerState.processes,
  );
const makeSelectProviderProcessesTasks = () =>
  createSelector(
    selectProvider,
    providerState => providerState.processesTasks,
  );
const makeSelectProviderOrganizations = () =>
  createSelector(
    selectProvider,
    providerState => providerState.organizations,
  );
const makeSelectProviderProjectsProcesses = () =>
  createSelector(
    selectProvider,
    providerState => providerState.projectsProcesses,
  );
const makeSelectProviderMessages = () =>
  createSelector(
    selectProvider,
    providerState => providerState.messages,
  );
const makeSelectProviderTasks = () =>
  createSelector(
    selectProvider,
    providerState => providerState.tasks,
  );
const makeSelectProviderUsers = () =>
  createSelector(
    selectProvider,
    providerState => providerState.providerUsers,
  );
const makeSelectProviderRoles = () =>
  createSelector(
    selectProvider,
    providerState => providerState.providerRoles,
  );
const makeSelectOrganizationUsers = () =>
  createSelector(
    selectProvider,
    providerState => providerState.organizationUsers,
  );
const makeSelectOrganizationRoles = () =>
  createSelector(
    selectProvider,
    providerState => providerState.organizationsRoles.filter(role => {
      return role.type !== 'Organization admin' && role.type !== 'General'
    }),
  );

export { selectProvider, makeSelectProvider, makeSelectProviderProjects, makeSelectProviderBridges,
  makeSelectProviderProcessesTemplates, makeSelectProviderOrganizations, makeSelectProviderProcessesTasks,
  makeSelectProviderMessages, makeSelectProviderProcesses, makeSelectProviderProjectsProcesses,
  makeSelectProviderTasks, makeSelectProviderUsers, makeSelectProviderRoles, makeSelectOrganizationUsers,
  makeSelectOrganizationRoles };
