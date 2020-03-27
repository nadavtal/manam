import { createSelector } from 'reselect';
import  {initialState}  from './reducer';


const selectProjects = state =>
  state.projects || initialState
;
// const makeSelectProjects = () =>
//   createSelector(
//     selectProjects,
//     projectsPageState => projectsPageState.projects,
//   );
const makeSelectProject = () =>
  createSelector(
    selectProjects,
    projectsPageState => projectsPageState.selectedProject,
  );


export {
  // selectProjects,
  // makeSelectProjects,
  makeSelectProject
};
