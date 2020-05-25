import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TableRowWrapper from "../TableRow";
import IconButtonToolTip from "../IconButtonToolTip/IconButtonToolTip";
import Actions from '../Actions';
import { MDBInput, MDBBtn } from "mdbreact";

import { toggleAlert } from 'containers/App/actions';
import { updateRole } from 'containers/AppData/actions';
import {

  makeSelectCurrentUser,
} from 'containers/App/selectors';
const RoleRow = ({role, onUpdateRole}) => {
  const [editMode, setEditMode] = useState(false);
  const [roleName, setRoleName] = useState(role.name);
  const [roleDescription, setRoleDescription] = useState(role.description);

  useEffect(() => {
    setRoleName(role.name)

  }, [role])  
 const actions = [
    { name: `Edit role`, icon: 'edit', type: 'info'},
    // { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ]
  // console.log(roleName)
  const handleAction = (actionName, val) => {
    console.log(actionName, val)
    switch (actionName) {
      
      case 'Edit role':
        if (editMode) {
          console.log(roleName)
          role.name = roleName;
          role.description = roleDescription;
          onUpdateRole(role)
          setEditMode(!editMode)
        } else {
          setEditMode(!editMode)

        }
        break
 
      default:
        break
    }

  }
  return <TableRowWrapper className={`row text-center py-1 tableRow ${editMode && 'active'}`}>
    <div className="col-2">
      {editMode ? <MDBInput 
        value={roleName}
        onChange={val => setRoleName(val.target.value)}
        // onBlur={val => handleAction('editRole', val)}
        /> : roleName}
    </div>
    <div className="col-2">
      {role.companyName}
    </div>
    <div className="col-3">
      {editMode ? 
      <MDBInput 
        value={roleDescription}
        onChange={val => setRoleDescription(val.target.value)}
        // onBlur={val => handleAction('editRole', val)}
        /> 
        : roleDescription}
    
    </div>
    <div className="col-2">
      {role.type}
    </div>
    <div className="col-1">
      {role.visibility}
    </div>
    <div className="col-2">
      <Actions actions={actions} 
          handleAction={(actionName) => handleAction(actionName)}
      />
  
    </div>
    
  </TableRowWrapper>
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onUpdateRole: (role) => dispatch(updateRole(role)),
    
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RoleRow);
