import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegistrationProcess = state => {
  
  return state.registrationProcess || initialState;
}
const makeSelectProviderOrganizations = () => {
  
  return createSelector(
    selectRegistrationProcess,
    registrationProcess => registrationProcess.providerOrganizations,
  );
}

  export { selectRegistrationProcess, makeSelectProviderOrganizations };