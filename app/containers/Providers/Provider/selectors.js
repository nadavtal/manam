
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
    providerState => providerState.provider_users,
  );

export { selectProvider, makeSelectProvider, makeSelectProviderProjects, makeSelectProviderBridges,
  makeSelectProviderProcessesTemplates, makeSelectProviderOrganizations, makeSelectProviderProcessesTasks,
  makeSelectProviderMessages, makeSelectProviderProcesses, makeSelectProviderProjectsProcesses,
  makeSelectProviderTasks, makeSelectProviderUsers };
