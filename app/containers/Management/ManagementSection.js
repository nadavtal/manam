import React, { useState, useMemo, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import Roles from '../../components/Roles';
import CompaniesTable from '../../components/CompaniesTable';
import {
  getRoleById,
  getUserById,
  getProviderById,
  getOrgById,
} from '../../utils/dataUtils';
import StyledTableHeader from '../../components/StyledTableHeader';
import action from '../Process/Action';
const ManagementSection = ({
  handleAction,
  users,
  roles,
  providers,
  company,
  organizations,
  organizationUsers,
  organizationsRoles,
  providersRoles,
  type,
}) => {
  // const [users, setOrgUsers] = useState(users)
  // const [selectedComponent, setSelectedComponent] = useState(
  //   localStorage.getItem('selectedComponent')
  //     ? localStorage.getItem('selectedComponent')
  //     : 'General roles',
  // );
  const [selectedComponent, setSelectedComponent] = useState('Roles');
  useEffect(() => {
    console.log('users', users)
        // users = users.map(connection => {
    //   // console.log(connection);
    //   const role = getRoleById(connection.role_id, roles);
    //   // const user = getUserById(connection.user_id, )
    //   connection = { ...connection, ...role };
    //   return connection;
    // });
    // console.log('users', users)
    // setOrgUsers(users)
    return () => {};
  }, [users]);
  //   const isSelected = selectedOrganization !== null && selectedOrganization !== undefined;
  const menuItems = [
    { name: 'Roles' },
    { name: 'In-house users' },

  ];
  const organizationMenuItems = [
    { name: 'Providers' },
    { name: 'Providers-users'}
  ]
  const providerMenuItems = [
    // { name: 'Organization-roles' },
    { name: 'Organization-users' }
  ]
  if (type === 'provider') menuItems.push(...providerMenuItems);
  if (type === 'organization') menuItems.push(...organizationMenuItems);

  const actions = {
    'Roles': [{ name: `Create new role`, icon: 'plus', type: 'info' }],
    'In-house users': [
      { name: `Create new user`, icon: 'user-plus', type: 'info' },
      {
        name: `Allocate user to in house user`,
        icon: 'plus-circle',
        type: 'info',
      },
    ],
    'Providers': [
      {
        name: `Create new provider`,
        icon: 'plus-square',
        type: 'info',
        restrictions: 'isAdmin',
      },
    ],
    'Organizations': [
      {
        name: `Allocate user to organization role`,
        icon: 'plus-square',
        type: 'info',
        restrictions: 'isAdmin',
      },
    ],
    'Providers-users': [
      {
        name: `Allocate user to organization`,
        icon: 'plus-circle',
        type: 'info',
        restrictions: 'isAdmin',
      },
    ],
    'Organization-users': [
      {
        name: `Allocate users to role`,
        icon: 'plus-circle',
        type: 'info',
        restrictions: '',
      },
    ],
  };

  const SelectedComponent = ({ componentName }) => {
    switch (componentName) {
      case 'Roles': 
        // console.log(roles)
        // console.log(providersRoles)
        // console.log(organizationsRoles)
        let allRoles = [];
        if (type === 'provider') allRoles = [...roles, ...organizationsRoles];
        if (type === 'organization') allRoles = [...roles, ...providersRoles];

        
        return (
          <>
            {/* {roles && roles.length ? (
              <Roles
                roles={
                  type === 'organization'
                    ? roles.filter(role => role.provider_id == null)
                    : roles.filter(role => role.organization_id == null)
                }
                type="roles"
                handleAction={(actionName, val) =>
                  handleAction(actionName, val)
                }
              />
            ) : (
              <div>There are no roles</div>
            )} */}
           
            {allRoles && allRoles.length ? (
              <Roles
                roles={allRoles}
                type="roles"
                handleAction={(actionName, val) =>
                  handleAction(actionName, val)
                }
              />
            ) : (
              <div>There are no Organization roles</div>
            )}
           
          </>
        );
      case 'Organization-roles':
        return organizationsRoles && organizationsRoles.length ? (
          <Roles
            roles={organizationsRoles}
            type="roles"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no Organization roles</div>
        );
      case 'Provider roles':
        return providersRoles && providersRoles.length ? (
          <Roles
            roles={providersRoles}
            type="roles"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no Provider roles</div>
        );

      case 'In-house users':
        let inhouseUsers = users.filter(user => user.from_provider_id == null);
        // inhouseUsers.map(user => {

        // })
        return inhouseUsers && inhouseUsers.length ? (
          <Roles
            roles={roles}
            users={inhouseUsers}
            type="inhouseUsers"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no in house users</div>
        );

      case 'Providers-users':
        let providerUsers = users.filter(
          user => user.from_provider_id !== null,
        );
        providerUsers.map(user => {
          console.log(user, providers)
          const provider = getProviderById(user.from_provider_id, providers);
          // console.log(provider)
          // if(provider && provider.name)
          user['companyName'] = provider.name;
        });
        // console.log(providerUsers)
        return providerUsers && providerUsers.length ? (
          <Roles
            roles={roles}
            users={providerUsers}
            type="providerUsers"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no user allocated</div>
        );
      case 'Organization-users':
        // console.log('organizationUsers', organizationUsers);
        // console.log('organizations', organizations);

        organizationUsers.map(user => {
          // console.log(user)
          if (organizations && organizations.length) {
            const org = getOrgById(user.organization_id, organizations);
            // console.log(org);
            user['companyName'] = org.name;
          }
        });
        // // console.log(organizationUsers)
        return organizationUsers && organizationUsers.length ? (
          <Roles
            roles={roles}
            users={organizationUsers}
            type="organizationUsers"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no user allocated</div>
        );

      case 'Providers':
        // console.log(providers)
        return providers && providers.length ? (
          <CompaniesTable
            companies={providers}
            // handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no providers</div>
        );
      case 'Organizations':
        return organizations && organizations.length ? (
          <CompaniesTable
            companies={organizations}
            // handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        ) : (
          <div>There are no providers</div>
        );

      default:
        return  <div>No menu item selected</div>
    }
  };
  return (
    <>
      <PageHeader
        text={'manage users & roles'}
        className="row pl-5 pt-1 pb-2 green-gradient text-white text-center"
        // actions={[
        //     { name: `Create new organization role`, icon: 'user-tie', type: 'info'},
        // ]}
      />
      <div className="row">
        <div className="col-2 border-right border-dark">
          {menuItems.map(item => (
            <h6
              key={item.name}
              className={`pl-5 py-3 ${
                selectedComponent === item.name
                  ? 'active border-bottom-turkize'
                  : 'faded border-bottom border-light'
              }`}
              onClick={() => {
                localStorage.setItem('selectedComponent', item.name);
                setSelectedComponent(item.name);
              }}
            >
              {item.name}
            </h6>
          ))}
        </div>
        <div className="col-10">
          <PageHeader
            text={selectedComponent}
            className="row pl-5 py-1"
            iconColor="black"
            actions={actions[selectedComponent]}
            handleAction={actionName => handleAction(actionName)}
          />
          <SelectedComponent componentName={selectedComponent} />
        </div>
      </div>
    </>
  );
};

export default ManagementSection;
