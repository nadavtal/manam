import React, { memo, useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getRoleById, getOrganizationUser } from 'utils/dataUtils'
import {
  makeSelectCurrentUser,
  makeSelectStatuses,
  makeSelectCurrentUserRole
} from 'containers/App/selectors';
import { MDBIcon, MDBBtn } from 'mdbreact';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import { updatedUser } from 'containers/AppData/actions';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Status from 'components/Status';


import './UserInfoBox.css'


function UserInfoBox({
  currentUser,
  company,
  statuses,
  history = useHistory(),
  onToggleModal,
  handleAction,
  onUpdatedUser,
  currentUserRole
}) {
  
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(statuses[currentUser.userInfo.general_status])
  useEffect(() => {
    setStatus(statuses[currentUser.userInfo.general_status])
  }, [currentUser])
  useEffect(() => {
    console.log(currentUserRole)
  }, [currentUserRole])
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
  const onHandleAction = (actionName, val) => {
    // console.log(actionName, val)
    switch (actionName) {
      case 'Edit user info':
        handleAction();
        editProfile();
        
        break
      default:
        break
    }

  }
  const editProfile = () => onToggleModal({
    title: 'Create new organization',
    text: '',
    // confirmButton: 'Create',
    cancelButton: 'Cancel',
    data: {
      editMode: 'edit',
      item: currentUser.userInfo
    },
    colWidth: 6,
    formType:'userForm',
    confirmFunction: (data) => {
      data['general_status'] = 'Active'
      onUpdatedUser(data)
    },
  })
  const linkToProfilePage = () => {
    history.push('/users/'+currentUser.userInfo.id)
  }
  // const editProfile = () => {
  //   history.push('/users/'+currentUser.userInfo.id)
  // }
  const Wrapper = styled.div`
    height: 8rem;
    position: relative;
    padding: 1rem;
  `
  return (
    <Wrapper className={`border border-${status.color}`}>
      {status.name == 'Active' && (
        <div className="rightTopCorner d-flex">
          <IconButtonToolTip
            className="mr-2"
            iconName="edit"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Edit profile"
            onClickFunction={() => onHandleAction('Edit user info')}
          />
          <IconButtonToolTip
            
            iconName="info"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="My info"
            onClickFunction={() => onHandleAction('Edit user info')}
          />
        </div>
      )}
      {/* <MDBIcon icon={'user'} size="2x" className="" /> */}
      <h1>
        {status.name !== 'Active' ? (
          <MDBBtn 
            size="sm"
            onClick={() => onHandleAction('Edit user info')}>
            My Profile
          </MDBBtn>
        ) : (
          currentUser.userInfo.first_name +
          ' ' +
          currentUser.userInfo.last_name
        )}
      </h1>
      {company && <h3>{company.name}</h3>}
      {currentUserRole && <h3>{currentUserRole}</h3>}
      {/* {currentUser && currentUser.userInfo ?  */}

      {/* <img src={require('../../images/manamapps_logo_300x100.png')}/>   */}
      {}
      <Status status={status} />
    </Wrapper>
  );
}

UserInfoBox.propTypes = {
  currentUser: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  statuses: makeSelectStatuses(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onUpdatedUser: user => dispatch(updatedUser(user)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserInfoBox);
