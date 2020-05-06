import React from 'react';
import RoleRow from '../RoleRow';
import UserRow from '../UserRow/UserRow'
import TableHeader from '../TableHeader'
const Roles = ({ roles, type, users, handleAction }) => {
  console.log(roles);
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
            <div className="col-1" />
    
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
          {users.length && users.map((user, index) => (
            <UserRow 
              className=""
              roles={roles} 
              key={index} 
              user={user}
              actions={actions} 
              // handleAction={(actionName, val) => handleAction(actionName, val)}
              />
          ))}
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
              return (
                <UserRow
                  className=""
                  roles={roles}
                  key={index}
                  user={user}
                  actions={actions}
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
