import React from 'react';
import RoleRow from '../RoleRow';
import UserRow from '../UserRow/UserRow'
import TableHeader from '../TableHeader';
import { getRolesByUserId, getAvailableRolesByUserId } from 'utils/dataUtils'
const Roles = ({ roles, type, users, handleAction, handleChecked }) => {
  // console.log(roles);
  // console.log(users);
  let actions = []
  switch (type) {
    case 'roles':
      return (
        <div className="toggled">
          <TableHeader className="row pl-5 py-1">
            <div className="col-2">Role name</div>
            <div className="col-2">{'Company name' }</div>
            <div className="col-3">description</div>
            <div className="col-2">Type</div>
            <div className="col-1" >
              Visibility
            </div>
    
            <div className="col-2">
              {/* <Actions 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
        /> */}
              {/* <PopperMenu 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
          bgColor={'peach'}
          // selectedUser={selectedUser}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          /> */}
            </div>
          </TableHeader>
          {roles.map((role, index) => (
            <RoleRow className="" key={index} role={role} />
          ))}
        </div>
      );
    case 'users':
      console.log(roles)
      actions = [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
      ]
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2">Name</div>
            <div className="col-2">Email</div>
            <div className="col-3">Remarks</div>
            <div className="col-1">Create at</div>
            <div className="col-2">Status</div>
            <div className="col-2">
              {/* <Actions 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
        /> */}
              {/* <PopperMenu 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
          bgColor={'peach'}
          // selectedUser={selectedUser}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          /> */}
            </div>
          </TableHeader>
          {users.length && users.map((user, index) => (
            <UserRow 
              className=""
              index={index}
              roles={roles} 
              key={index} 
              user={user}
              actions={actions} 
              type="simple"
              // handleAction={(actionName, val) => handleAction(actionName, val)}
              />
          ))}
        </div>
      );
    case 'inhouseUsers':
      console.log(users)
      actions = [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
      ]
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2">Name</div>
            <div className="col-2">Role name</div>
            <div className="col-2">description</div>
            <div className="col-2">Remarks</div>
            <div className="col-1">Created at</div>
            <div className="col-1">Status</div>
            <div className="col-1">
              {/* <Actions 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
        /> */}
              {/* <PopperMenu 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
          bgColor={'peach'}
          // selectedUser={selectedUser}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          /> */}
            </div>
          </TableHeader>
          {users.length && users.map((user, index) => {
            
            getRolesByUser(user.user_id, users, roles)
            return <UserRow 
              className=""
              roles={roles} 
              key={index} 
              user={user}
              actions={actions} 
              type="extended"
              // handleAction={(actionName, val) => handleAction(actionName, val)}
              />
        })}
        </div>
      );
    case 'providerUsers':
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2">Name</div>
            <div className="col-1">Provider</div>
            <div className="col-2">Role name</div>
            <div className="col-2">description</div>
            <div className="col-2">Remarks</div>
            <div className="col-1">Created at</div>
            <div className="col-1">Status</div>
            <div className="col-1">
              {/* <Actions 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
      /> */}
              {/* <PopperMenu 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
        bgColor={'peach'}
        // selectedUser={selectedUser}
        handleAction={(actionName, val) => handleAction(actionName, val)}
        /> */}
            </div>
          </TableHeader>
          {users.map((user, index) => {              
              return (
                <UserRow
                  className=""
                  roles={roles}
                  key={index}
                  user={user}
                  actions={actions}
                  type="extended"
                  // handleAction={actionName => handleAction(actionName)}
                />
                // <OrgProviderUserRow
                //   className=""
                //   key={index}
                //   role={role}
                // />
              );
          })}
        </div>
      );
    case 'organizationUsers':
      actions = [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
      ]
      return (
        <div className="toggled">
          <TableHeader className="row py-1">
            <div className="col-2">Name</div>
            <div className="col-1">Organization</div>
            <div className="col-2">Role name</div>
            <div className="col-2">description</div>
            <div className="col-2">Remarks</div>
            <div className="col-1">Created at</div>
            <div className="col-1">Status</div>
            <div className="col-1">
              {/* <Actions 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
      /> */}
              {/* <PopperMenu 
        actions={actions[activeItemClassicTabs3].ifSelectedActions}
        bgColor={'peach'}
        // selectedUser={selectedUser}
        handleAction={(actionName, val) => handleAction(actionName, val)}
        /> */}
            </div>
          </TableHeader>
          {users.map((user, index) => { 

            const userRoles = getRolesByUserId(user.user_id, users, roles);
            const availableRoles = getAvailableRolesByUserId(roles, userRoles) 
            // console.log(availableRoles)       
            return (
              <UserRow
                className=""
                roles={availableRoles}
                key={index}
                user={user}
                actions={actions}
                type="extended"
                index={index}
                handleChecked={user => handleChecked(user)}
              />
              // <OrgProviderUserRow
              //   className=""
              //   key={index}
              //   role={role}
              // />
            );
          })}
        </div>
      );
    // case 'organizationRoles':
    //   return (
    //     <div className="toggled">
    //       <TableHeader className="row py-1">
    //         <div className="col-2">Role name</div>
    //         <div className="col-2">Organization</div>
    //         <div className="col-3">description</div>
    //         <div className="col-2">Type</div>
    //         <div className="col-2" />

    //         <div className="col-1" />
    //       </TableHeader>
    //       {roles.map((role, index) => (
    //         <RoleRow className="" key={index} role={role} />
    //       ))}
    //       })}
    //     </div>
    //   );
      
  
    default:
      return null;
  }

};

export default Roles;
