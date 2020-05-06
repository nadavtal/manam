import React, { Component, useEffect, memo} from 'react';
import { useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { makeSelectProjects } from '../App/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import * as actions from './actions'
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import GlobeProjects from '../Resium/GlobeProjects'
const key = 'appData';
import saga from './saga';
// localStorage.removeItem('currentUser')
export function AppData({

  currentUser,
  getProviders,
  getUsers,
  getOrganizations,
  getProjects,
  getRoles,
  getRoleTypes,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    // console.log('[AppData.js] useEffect');
    getProjects();
    getProviders();
    getUsers();
    getOrganizations();
    getRoles();
    getRoleTypes();
  }, []);


  return (
    <div></div>)

}

export function mapStateToProps(state) {
  return {}
}
export function mapDispatchToProps(dispatch) {
  return {
    getProjects: () => dispatch(actions.getProjects()),
    getProviders: () => dispatch(actions.getProviders()),
    getUsers: () => dispatch(actions.getUsers()),
    getOrganizations: () => dispatch(actions.getOrganizations()),
    getRoles: () => {dispatch(actions.getRoles())},
    getRoleTypes: () => {dispatch(actions.getRoleTypes())}
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AppData);

