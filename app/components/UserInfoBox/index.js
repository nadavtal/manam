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
import { MDBIcon, MDBBtn, MDBAvatar } from 'mdbreact';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import { updatedUser, uploadFile } from 'containers/AppData/actions';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Status from 'components/Status';
import FilesUploadComponent from 'components/FilesUploadComponent'

import './UserInfoBox.css'


function UserInfoBox({
  currentUser,
  organization,
  company,
  statuses,
  history = useHistory(),
  onToggleModal,
  handleAction,
  onUpdatedUser,
  onUploadImage,
  currentUserRole
}) {
  
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(statuses[currentUser.userInfo.general_status])
  useEffect(() => {
    setStatus(statuses[currentUser.userInfo.general_status])
  }, [currentUser])
  useEffect(() => {
    console.log('organization', organization)
  }, [currentUserRole])
  const actions = [
    // { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
    // { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
    { name: `Edit role`, icon: 'edit', type: 'info'},
    { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ]
  console.log(organization)
  const onHandleAction = (actionName, val) => {
    // console.log(actionName, val)
    switch (actionName) {
      case 'Edit user info':
        handleAction();
        editProfile();
        
        break
      case 'Show user info':
        handleAction();
        showProfile();
        
        break
      case 'Upload image':
        console.log(val)
        break
      default:
        break
    }

  }
  const editProfile = () => onToggleModal({
    title: 'Edit profile info',
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
      console.log(data)
      data['general_status'] = 'Active'
      onUpdatedUser(data)
      // onUploadImage(data.user_image[0])
      
    },
  })
  const showProfile = () => onToggleModal({
    title: `${currentUser.userInfo.first_name} ${currentUser.userInfo.last_name} info` ,
    text: '',
    // confirmButton: 'Create',
    cancelButton: 'Close',
    body : <UserRolesInfo />,
    confirmButton: 'Switch roles',
    confirmFunction: () => {
      onToggleModal()
      history.push('/')
    }
  })
  const linkToProfilePage = () => {
    history.push('/users/'+currentUser.userInfo.id)
  }
  // const editProfile = () => {
  //   history.push('/users/'+currentUser.userInfo.id)
  // }
  const Wrapper = styled.div`
    height: 9.5rem;
    position: relative;
    padding: .7rem;
    font-size: .8rem;
  `

  const image = currentUser.userInfo.profile_image
  const UserRolesInfo = () => {

    return <div>
      {currentUser.userOrganiztionRoles && currentUser.userOrganiztionRoles.length ? <>
        <h5>Organizations</h5>
          {currentUser.userOrganiztionRoles.map(role => {
            // const org = 
            return <div key={role.role_id}>{`${role.org_name} - ${role.role_name}`}</div>})
          }
      
      </>: ''}
      {currentUser.userProviderRoles && currentUser.userProviderRoles.length ? <>
        <h5 className="mt-3">Providers</h5>
          {currentUser.userProviderRoles.map(role => {
              // const org = 
              return <div key={role.role_id}>{`${role.provider_name} - ${role.role_name}`}</div>})
            }

      </>: ''}
    </div>
  }
  return (
    <Wrapper className={`border border-${status.color}`}>
      {/* {status.name == 'Active' && (
        <div className="rightTopCorner d-flex ">
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
            onClickFunction={() => onHandleAction('Show user info')}
          />
        </div>
      )} */}
      <div className="text-left">
        <div className="d-flex align-items-center mb-2"> 
          <MDBAvatar
            tag="img"
            src={
              image && image !== 'undefined' ?
              require(`../../../resources/static/assets/tmp/${image}`) :
              require(`../../images/LOGIN.jpg`)
            }
            alt="User Photo"
            className="z-depth-1"
          />
          <span className="bold userInfoBoxTitle ml-2">
          {currentUser.userInfo.first_name +
            ' ' +
            currentUser.userInfo.last_name}
            </span>
        </div>

        {organization ? (
          <>
            <div>
              <span className="bold">Organization: </span> {organization.name}
            </div>
            <div>
              <span className="bold">Provider:</span> {company.name}
            </div>
          </>
        ) : (
          <div>
            <span className="bold">Organization:</span> {company.name}
          </div>
        )}

        {/* {organization && (
          <div>
            <span className="bold">Organization: </span> {organization.name}
          </div>
        )}
        {company && (
          <div>
            <span className="bold">Provider:</span> {company.name}
          </div>
        )} */}
        <div>
          <span className="bold"> Role: </span>
          {currentUserRole.role_name}
        </div>
      </div>
      {/* <div>
        {status.name !== 'Active' ? (
          <MDBBtn 
            size="sm"
            onClick={() => onHandleAction('Edit user info')}>
            My Profile
          </MDBBtn>
        ) : <div className="text-left">
          <div >
            <span className="bold">Name: </span> {currentUser.userInfo.first_name + ' ' + currentUser.userInfo.last_name}</div>
          {organization && <div>
            <span className="bold">Organization: </span> {organization.name}</div>}
          {company && <div>
            <span className="bold">Provider:</span> {company.name}</div>}
          <div ><span className="bold"> Role:  </span>{currentUserRole.role_name}
           
           </div>
        </div>
          
        }
      </div> */}
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
    onUploadImage: file => dispatch(uploadFile(file)),
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
