import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './node_modules/utils/injectReducer';
import { useInjectSaga } from './node_modules/utils/injectSaga';
import { getRoleById, getOrganizationUser } from './node_modules/utils/dataUtils'
import {
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectStatuses
} from './node_modules/containers/App/selectors';
import { makeSelectOrganizationUsers } from './node_modules/containers/Organizations/Organization/selectors'
import { toggleAlert } from './node_modules/containers/App/actions';
import { updateOrgUser, updateProvUser } from './node_modules/containers/AppData/actions';
import PropTypes from 'prop-types';
import { MDBInput } from 'mdbreact';
import styled from 'styled-components';
import Select from './node_modules/components/Select/Select';
import Status from './node_modules/components/Status';
import DateField from '../DateField/DateField';
import Actions from '../Actions'
import TableRow from './node_modules/components/TableRow';

import PopperMenu from '../PopperMenu/PopperMenu';
import './UserRow.css'
const key = 'userRow';

function UserRow({
  user,
  orgUsers,
  checked,
  onClick,
  // actions,
  // handleAction,
  statuses,
  roles,
  onToggleAlert,
  onUpdateOrgUser,
  onUpdateProvUser
}) {
  // console.log(user);
  const [editMode, setEditMode] = useState(false);
  // console.log(user, roles)
  // const role = getRoleById(user.role_id, roles);
  // const getStatusByName = statusName => {
  //   Object.keys(statuses)
  //   statuses.find(status => status.name === statusName)
  // }
  // console.log('role', role)
  const actions = [
    // { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
    // { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
    { name: `Edit role`, icon: 'edit', type: 'info'},
    { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ]
  const handleAction = (actionName, val) => {
    // console.log(actionName, val)
    switch (actionName) {
      case 'Switch roles':
        const role = getRoleById(val, roles)
        const existingOrgUser = getOrganizationUser(user.user_id, user.organization_id, val, orgUsers);
        console.log(existingOrgUser)
        if (existingOrgUser) {
          onToggleAlert({
            title: `Oops...`,
            text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
            confirmButton: 'Got it',
            cancelButton: 'Cancel',
            alertType: 'danger',
            confirmFunction: () => onToggleAlert()
          });
          break
        } else {
          onToggleAlert({
            title: `${actionName} for ${user.first_name} ${user.last_name}`,
            text: `Are you sure you want to switch to ${role.name} ?`,
            confirmButton: 'Yes',
            cancelButton: 'Cancel',
            
            confirmFunction: () => onUpdateOrgUser(user, role, {})
          });
          break

        }
      case 'Change status':
        // const status = statuses.find(status => status.id === val)
        const status = statuses[val]
        
        onToggleAlert({
          title: `${actionName} for ${user.first_name} ${user.last_name}`,
          text: `Are you sure you want to switch to ${status.name} ?`,
          confirmButton: 'Yes',
          cancelButton: 'Cancel',
          
          confirmFunction: () => {
            console.log(user)
            if (user.organization_id && user.provider_id || !user.provider_id && user.organization_id) onUpdateOrgUser(user, {}, status)
            else if (user.provider_id && !user.organization_id) onUpdateProvUser(user, {}, status)
           
          }
        });
        break
        
      case 'Edit role':
        setEditMode(!editMode)
        break
      default:
        break
    }

  }
  return (
    
      <TableRow className={`row py-2 tableRow ${editMode && 'active'}`} onClick={onClick} >
        <div className="col-2">
          <MDBInput
            label={`${user.first_name} ${user.last_name}`}
            filled
            type="checkbox"
            id={`"checkbox${user.id}"`}
            containerClass=""
            checked={checked}
            // onChange={() =>
            //   selectedUser.id === user.id
            //     ? setSelectedUser()
            //     : setSelectedUser(user)
            // }
          />
        </div>
        {user.companyName && (
          <div className="col-1">{user.companyName}</div>
        )}
        {user.roleName ? <div className="col-2">
          {editMode ? (
            <Select
              value={user.roleName}
              options={roles}
              onChange={val => handleAction('Switch roles', val)}
            />
          ) : (
            user.roleName
          )}
        </div>
        : ''}
        {/* <div className="col-3">{user.email}</div> */}
        <div className={"col-2"}>{user.description}</div>
        <div className="col-2">{user.remarks}</div>
        <div className="col-1">
          <DateField date={user.date_created} />
        </div>
        <div className="col-1">
          {editMode ? (
            <Select
              value={user.status}
              className="fullWidth"
              options={statuses}
              onChange={val => handleAction('Change status', val)}
            />
          ) : (
            <Status status={statuses[user.status]} />
          
     
          )}
        </div>
        <div className="col-1">
          <Actions actions={actions} 
            handleAction={(actionName) => handleAction(actionName)}/>
          {/* <PopperMenu
            actions={actions}
            roles={roles}
            bgColor={'blue'}
            handleAction={(actionName, val) => handleAction(actionName, val, user)}
          /> */}
        </div>
      </TableRow>

 
  );
}

UserRow.propTypes = {
  user: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  statuses: makeSelectStatuses(),
  orgUsers: makeSelectOrganizationUsers()
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onUpdateOrgUser: (user, role, status) => dispatch(updateOrgUser(user,role, status)),
    onUpdateProvUser: (user, role, status) => dispatch(updateProvUser(user,role, status)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserRow);
