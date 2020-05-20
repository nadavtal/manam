import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from './constants';
import request from 'utils/request';
import {
  loadError,
  organizationsLoaded,
  projectsLoaded,
  usersLoaded,
  providersLoaded,
  rolesLoaded,
  roleTypesLoaded,
  processTemplatesTasksLoaded,
  foundResults,
  orgRegistered,
  userLoaded,
  loginFail,
  toggleModal,
  sendEmail,
  userAllocated,
  showNotification,
  toggleAlert,
  providerAllocated,
  newRoleTypeCreated,
  providerAdded,
  organizationAdded,
  organizationUpdated,
  newRoleCreated,
  providerUpdated,
  allDataLoaded,
  organizationUserUpdated,
  providerOrganizationConnectionUpdated,
  providerUserUpdated,
  userUpdated
} from 'containers/App/actions';

import { apiUrl, SEND_CONFIRMATION } from 'containers/App/constants';
import { organizationLoaded } from '../Organizations/Organization/actions';
import { providerOrganizationsLoaded } from 'containers/AppData/actions';
import { providerLoaded } from '../Providers/provider/actions';
import {
  orgTechInfoLoaded,
  registerUserResponse,
  allocateProviderToOrganization,
  createNewRole,
  registerNewOrgUser,
  registerNewProvUser,
} from './actions';
import { getModalOpen, getAlertOpen, getStatuses } from '../App/selectors';

function* getUsers(action) {
  // console.log('getUsers')
  try {
    // Call our request helper (see 'utils/request')

    const users = yield call(request, apiUrl + 'users');
    // console.log(users)
    yield put(usersLoaded(users));
  } catch (err) {
    // yield put(console.log(err));
  }
}
function* getProjects(action) {
  // console.log('getProjects')
  try {
    // Call our request helper (see 'utils/request')

    const projects = yield call(request, apiUrl + 'projects');
    // console.log(projects)
    yield put(projectsLoaded(projects));
  } catch (err) {
    console.log(err);
    yield put(loadError(err));
  }
}

function* getProviders(action) {
  // console.log('getProviders')
  try {
    // Call our request helper (see 'utils/request')

    const projects = yield call(request, apiUrl + 'providers');

    yield put(providersLoaded(projects));
  } catch (err) {
    // yield put(console.log(err));
  }
}

function* getOrganizations(action) {
  // console.log('getting orgs')
  try {
    const orgs = yield call(request, apiUrl + 'organizations');
    // console.log(orgs)
    yield put(organizationsLoaded(orgs));
  } catch (err) {
    yield put(loadError(err));
  }
}

export function* getRoles() {
  // console.log('Getting roles')

  try {
    const roles = yield call(request, apiUrl + 'roles');
    // console.log(roles)
    yield put(rolesLoaded(roles));
  } catch (err) {
    yield put(loadError(err));
  }
}
export function* getRoleTypes() {
  try {
    const roleTypes = yield call(request, apiUrl + 'roleTypes');
    // console.log(roleTypes)
    yield put(roleTypesLoaded(roleTypes));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}

function* getProviderInfo(action) {
  console.log('getProvider');
  try {
    // Call our request helper (see 'utils/request')

    const provider = yield call(request, apiUrl + 'providers/' + action.id);

    yield put(providerLoaded(provider[0]));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getprocessTemplatesTasks(action) {
  
  try {
    // Call our request helper (see 'utils/request')

    const processTemplatesTasks = yield call(
      request,
      apiUrl + 'process-template-tasks',
    );
    // console.log(processTemplatesTasks)
    yield put(processTemplatesTasksLoaded(processTemplatesTasks));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getUserById(action) {
  console.log(action);
  try {
    const user = yield call(request, apiUrl + 'users/' + action.id);

    const userProviderRoles = yield call(
      request,
      apiUrl + 'users/' + user.id + '/provider-roles',
    );
    console.log(userProviderRoles);
    const userOrganizationRoles = yield call(
      request,
      apiUrl + 'users/' + user.id + '/organization-roles',
    );
    console.log(userOrganizationRoles);
    const userData = {
      user,
      userProviderRoles,
      userOrganizationRoles,
    };
    console.log(userData);
    // yield put(userLoaded(userData));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getOrganizationById(action) {
  try {
    // Call our request helper (see 'utils/request')
    const organization = yield call(
      request,
      apiUrl + 'organizations/' + action.id,
    );
    console.log(organization);
    const organizationUsers = yield call(
      request,
      apiUrl + 'organization-users/' + action.id,
    );

    const organizationRoles = yield call(
      request,
      apiUrl + 'organizations/' + action.id + '/roles',
    );
    // console.log('organizationRoles', organizationRoles);
    const bridges = yield call(
      request,
      apiUrl + 'organizations/' + action.id + '/bridges',
    );
    // console.log(bridges);
    const projects = yield call(
      request,
      apiUrl + 'organizations/' + action.id + '/projects',
    );
    // console.log(projects);
    // const processes = yield call(
    //   request,
    //   apiUrl +
    //     'organizations/' +
    //     action.id +
    //     '/processes/' +
    //     organization[0].name,
    // );
    const processes = []
    const projectsProcesses = []
    // console.log(processes);
    // const projectsProcesses = yield call(
    //   request,
    //   apiUrl + 'organizations/' + action.id + '/project-processes',
    // );
    // console.log(projectsProcesses);
    const tasks = yield call(
      request,
      apiUrl + 'organizations/' + action.id + '/tasks',
    );
    // console.log(projectsProcesses);
    const processesTasks = []
    // const processesTasks = yield call(
    //   request,
    //   apiUrl +
    //     'organizations/' +
    //     action.id +
    //     '/processes-tasks/' +
    //     organization[0].name,
    // );
    // console.log(processes);
    const providers = yield call(
      request,
      apiUrl + 'organizations/' + action.id + '/providers',
    );
    let providersIds;
    let providersRoles = [];
    if (providers && providers.length) {
      providersIds = providers.map(prov => prov.id);
      providersRoles = yield call(
        request,
        apiUrl + `roles?fields[provider_id]=${providersIds}`,
      );
      console.log('providersRoles', providersRoles);

    }
    
    yield put(
      organizationLoaded({
        organization,
        organizationUsers,
        organizationRoles,
        bridges,
        projects,
        processes,
        providers,
        processesTasks,
        projectsProcesses,
        tasks,
        providersRoles
      }),
    );
  } catch (err) {
    yield put(loadError(err));
  }
}
const getProviderBridgesIds = processes => {
  let ids = [];
  processes.forEach(process => {
    if (!ids.includes(process.bid)) ids.push(process.bid);
  });
  return ids;
};

function* getProviderBridges(ids) {
  // console.log(ids);
  const url = apiUrl + 'provider-bridges';
  const args = {
    method: 'POST',
    body: JSON.stringify(ids),
  };

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    return result;
  } catch (err) {
    return err;
  }
}
function* getProviderOrganizations(action) {
  try {
    // Call our request helper (see 'utils/request')
    const organizations = yield call(
      request,
      apiUrl + 'providers/' + action.id + '/organizations',
    );
    // console.log(organizations);
    yield put(providerOrganizationsLoaded(organizations));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* getProviderbyId(action) {
  try {
    // Call our request helper (see 'utils/request')
    const provider = yield call(request, apiUrl + 'providers/' + action.id);
    const processes = []
    // const processes = yield call(
    //   request,
    //   apiUrl + 'providers/' + provider[0].name + '/processes',
    // );
    const projectsProcesses = []
    // const projectsProcesses = yield call(
    //   request,
    //   apiUrl + 'providers/' + provider[0].name + '/project-processes',
    // );
    const bridges = yield getProviderBridges(
      getProviderBridgesIds(projectsProcesses),
    );

    // const bridges = yield call(request, apiUrl + 'providers/' + action.id +'/organizations');getProviderBridgesIds(projectsProcesses)
    const tasks = yield call(
      request,
      apiUrl + 'providers/' + provider[0].name + '/tasks',
    );

    const processesTasks = []
    // const processesTasks = yield call(
    //   request,
    //   apiUrl + 'providers/' + provider[0].name + '/processes-tasks',
    // );
    const organizations = yield call(
      request,
      apiUrl + 'providers/' + action.id + '/organizations',
    );

    const orgsIds = organizations.map(org => org.id);
    // console.log(orgsIds)
    const organizationsRoles = yield call(
      request,
      apiUrl + `roles?fields[organization_id]=${orgsIds}&[visibility]=public`,
    );

    // const providerUsers = yield call(request, apiUrl + 'providers/' + action.id +'/users');
    const providerUsers = yield call(
      request,
      apiUrl + 'provider-users/' + action.id,
    );
    console.log(providerUsers)
    const organizationUsers = yield call(
      request,
      apiUrl + 'organization-users/provider/' + action.id,
    );
    const providerRoles = yield call(
      request,
      apiUrl + 'providers/' + action.id + '/roles',
    );
    // console.log(users)
    // const arrangedUsers = arrangeUsersRoles(users)
    // console.log(arrangedUsers)
    // console.log(arrangeUsersRoles(users))
    yield put(
      providerLoaded({
        provider: provider[0],
        bridges,
        // projects,
        processes,
        organizations,
        processesTasks,
        projectsProcesses,
        tasks,
        providerUsers,
        organizationUsers,
        organizationsRoles,
        providerRoles,
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(loadError(err));
  }
}

function arrangeUsersRoles(users) {
  let arrangedUsers = [];
  let userIds = [];
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const role = user.name;
    if (!userIds.includes(user.id)) {
      userIds.push(user.id);

      user.roleTypes = role ? [role] : [];
      arrangedUsers.push(user);
    } else {
      // console.log(arrangedUsers.filter(u => u.id = user.id))
      arrangedUsers.find(u => (u.id = user.id)).roleTypes.push(role);
    }
  }
  return arrangedUsers;
}

function* getOrgTechnicalInfo(action) {
  // console.log('getOrgTechnicalInfo', action.data)

  try {
    // Call our request helper (see 'utils/request')

    const elementsGroups = yield call(
      request,
      apiUrl + 'organizations/' + action.data + '/elements-groups',
    );
    const structureTypes = yield call(
      request,
      apiUrl + 'organizations/' + action.data + '/structure-types',
    );
    const elementsTypes = yield call(
      request,
      apiUrl + 'organizations/' + action.data + '/elements-types',
    );
    const bridgeTypes = yield call(
      request,
      apiUrl + 'organizations/' + action.data + '/bridge-types',
    );
    // console.log(structureTypes)
    yield put(
      orgTechInfoLoaded({
        elementsGroups,
        structureTypes,
        elementsTypes,
        bridgeTypes,
      }),
    );
  } catch (err) {
    yield put(loadError(err));
  }
}
function* findEntityBy(action) {
  console.log('findEntityBy', action);
  const emailResults = {};
  try {
    // Call our request helper (see 'utils/request')
    
    const user = yield call(request, apiUrl + `users/${action.element}/${action.value}`);
    if (user && user.length) emailResults['user'] = user[0];
    const provider = yield call(
      request,
      apiUrl + `providers/${action.element}/${action.value}`,
    );
    if (provider && provider.length) emailResults['provider'] = provider[0];
    const organization = yield call(
      request,
      apiUrl + `organizations/${action.element}/${action.value}`,
    );
    if (organization && organization.length)
      emailResults['organization'] = organization[0];

    // console.log(Object.keys(emailResults).length)
    if (Object.keys(emailResults).length) {
      emailResults['element'] = action.element
      yield put(foundResults(emailResults));
    }
  } catch (err) {
    yield put(loadError(err));
  }
}

export function* login(action) {
  // const username = yield select(makeSelectUsername());
  console.log(action);
  let user = yield call(
    request,
    apiUrl + 'users/login/' + action.user.email + '/' + action.user.password,
  );
  console.log(user);
  if (user.user) {
    user = user.user;
    const userSystemRoles = yield call(
      request,
      apiUrl + 'users/' + user.id + '/system-roles',
    );
    console.log('userSystemRoles', userSystemRoles);
    let userData
    if (userSystemRoles && userSystemRoles.length) {
      userData = {
          user,
          userSystemRoles
        };
        console.log(userData);
        yield put(userLoaded(userData));
    }else {
  
      const userProviderRoles = yield call(
        request,
        apiUrl + 'users/' + user.id + '/provider-roles',
      );
      // console.log(userProviderRoles);
      // const organizations = yield call(request, apiUrl + 'providers/' + action.id +'/organizations');
      const userOrganizationRoles = yield call(
        request,
        apiUrl + 'users/' + user.id + '/organization-roles',
      );
      // console.log(userOrganizationRoles);
      userData = {
        user,
        userProviderRoles,
        userOrganizationRoles,
      };
      console.log(userData);
      yield put(userLoaded(userData));

    }

  } else {
    console.log('user login fail');
    yield put(loginFail(user));
  }
}




function* updateUserRoles(userId, rolesIds) {
  console.log(userId, rolesIds);
  const url = apiUrl + 'users/' + userId + '/roles';
  const args = {
    method: 'POST',
    body: JSON.stringify(rolesIds),
  };

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}
function* registerProvider(action) {
  console.log(action);
  const url = apiUrl + 'providers';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  };

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}
function* registerOrg(action) {
  console.log(action);
  const url = apiUrl + 'organizations';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  };

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(orgRegistered(requestResults));
    yield put(push('/organizations/' + requestResults.insertId));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}
function* sendConfirmation(action) {
  console.log(action);
  const url = apiUrl + 'users/confirmation';
  const args = {
    method: 'POST',
    body: JSON.stringify({ token: action.token }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);

    // yield put(push('/organizations/'+requestResults.insertId));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}

function* getAllData(action) {
  try {
    const organizations = yield call(request, apiUrl + 'organizations');
    const providers = yield call(request, apiUrl + 'providers');
    const users = yield call(request, apiUrl + 'users');
    const projects = yield call(request, apiUrl + 'projects');
    const processes = yield call(request, apiUrl + 'processes');
    const tasks = yield call(request, apiUrl + 'tasks');
    const organizationsUsers = yield call(
      request,
      apiUrl + 'organization-users',
    );
    const providersUsers = yield call(request, apiUrl + 'provider-users');
    const organizationProviders = yield call(
      request,
      apiUrl + 'organization-providers',
    );

    // const messages = yield call(request, apiUrl + 'messages');
    const data = {
      organizations,
      providers,
      users,
      projects,
      processes,
      tasks,
      organizationsUsers,
      providersUsers,
      organizationProviders,
    };
    yield put(allDataLoaded(data));
  } catch (err) {
    yield put(loadError(err));
    yield put(
      showNotification({
        message: `There was an erro `,
        title: `Error `,
        icon: 'error',
        text: '',
        autohide: 3000,
      }),
    );
  }
}

function* addProvider(action) {
  console.log(action);
  const provider = action.provider;
  const org = action.organization;
  const modalOpen = yield select(getModalOpen);
  if (!provider.id) {
    const args = {
      method: 'POST',
      body: JSON.stringify(provider),
    };

    try {
      // Create new provider
      const result = yield call(request, apiUrl + 'providers', args);

      if (result.insertId) {
        provider.id = result.insertId;

        yield put(
          allocateProviderToOrganization({ org, provider, remarks: '' }),
        );
        //Create new Role
        // const newRole = {
        //   name: 'Provider administrator',
        //   description:
        //     'Automatic user generated when a new organization is created',
        //   provider_id: result.insertId,
        //   type: 'Provider admin',
        // };
        // const args = {
        //   method: 'POST',
        //   body: JSON.stringify(newRole),
        // };
        const generalRoleData = {
          name: 'General role',
          description:
            'Automatic general role created when a new provider is created',
          provider_id: result.insertId,
          type: 'General',
          visibility: 'private'
        };
        const newGeneralRole = {
          method: 'POST',
          body: JSON.stringify(generalRoleData),
        };
        const providerAdminRoleData = {
          name: 'Provider administrator',
          description:
            'Automatic role generated when a new provider is created',
          provider_id: result.insertId,
          type: 'Provider admin',
          visibility: 'public'
        };
        const newProviderAdminRole = {
          method: 'POST',
          body: JSON.stringify(providerAdminRoleData),
        };
        // const modalOpen = yield select(getModalOpen);
  
        try {
          const generalRole = yield call(request, apiUrl + 'roles', newGeneralRole);
          if (generalRole.insertId) {
            generalRoleData.id = generalRole.insertId;
            yield put(newRoleCreated(generalRoleData));
            yield put(
              showNotification({
                title: `New role created `,
                message: `${generalRoleData.name} created `,
                icon: 'bell',
                text: 'You can allocate users to this role',
                autohide: 3000,
              }),
            );
          }
          const providerAdminRole = yield call(request, apiUrl + 'roles', newProviderAdminRole);
          console.log(providerAdminRole)
          if (providerAdminRole.insertId) {
            providerAdminRoleData.id = providerAdminRole.insertId;
            yield put(newRoleCreated(providerAdminRoleData));
            //Create new User
            yield put(
              registerNewOrgUser(
                {
                  email: provider.adminEmail,
                  first_name: provider.first_name,
                  last_name: provider.last_name,
                  password: '',
                  general_status: 'Awaiting confirmation',
                  role_id: providerAdminRole.insertId,
                  from_provider_id: provider.id,
                  roleName: providerAdminRoleData.name
                },
                org,
              ),
            );
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      yield put(loadError(err));
      yield put(
        showNotification({
          title: `Error `,
          message: `There was an erro`,
          icon: 'error',
          text: 'There was an error creating procider',
          autohide: 3000,
        }),
      );
    }
  } else {

    yield put(allocateProviderToOrganization({ org, provider, remarks: '' }));
    //Get providers admins
    const roleUrl = `roles/provider/${provider.id}/Provider admin`;
    const providerAdminRole = yield call(request, apiUrl + roleUrl);
    console.log(providerAdminRole)
    if (providerAdminRole.length) {
      const providerAdminUsers = yield call(request, apiUrl + `provider-users/${provider.id}/${providerAdminRole[0].id}`)
      console.log(providerAdminUsers)
      const [users] = yield all(
        providerAdminUsers.map(user => put(
          registerNewOrgUser(
            { 
              id: user.user_id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role_id: user.role_id,
              general_status: 'Awaiting approvement',
              from_provider_id: provider.id,
              roleName: user.roleName
            },
            org
          ) 
        ))
      );
      console.log(users)

    }
  }
}

function* addOrganization(action) {
  console.log(action);

  let organization = action.data;
  const url = apiUrl + 'organizations';
  const args = {
    method: 'POST',
    body: JSON.stringify(organization),
  };
  const modalOpen = yield select(getModalOpen);
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    if (result.insertId) {
      organization.id = result.insertId;
      //Find users with this mail
      // const users = yield call(request, apiUrl + 'users/email/'+ organization.email);

      yield put(organizationAdded(organization));
      const generalRoleData = {
        name: 'General role',
        description:
          'Automatic role generated when a new organization is created',
        organization_id: result.insertId,
        type: 'General',
        visibility: 'private'
      };
      const newGeneralRole = {
        method: 'POST',
        body: JSON.stringify(generalRoleData),
      };
      const orgAdminRoleData = {
        name: 'Organization administrator',
        description:
          'Automatic role generated when a new organization is created',
        organization_id: result.insertId,
        type: 'Organization admin',
        visibility: 'private'
      };
      const newAdminRole = {
        method: 'POST',
        body: JSON.stringify(orgAdminRoleData),
      };
      // const modalOpen = yield select(getModalOpen);

      try {
        const generalRole = yield call(request, apiUrl + 'roles', newGeneralRole);
        if (generalRole.insertId) {
          generalRoleData.id = generalRole.insertId;
          yield put(newRoleCreated(generalRoleData));
          yield put(
            showNotification({
              title: `New role created `,
              message: `${generalRoleData.name} created `,
              icon: 'bell',
              text: 'You can allocate users to this role',
              autohide: 3000,
            }),
          );
        }
        const orgAdminRole = yield call(request, apiUrl + 'roles', newAdminRole);
        console.log(orgAdminRole)
        if (orgAdminRole.insertId) {
          orgAdminRoleData.id = orgAdminRole.insertId;
          
          yield put(newRoleCreated(orgAdminRoleData));
          yield put(
            showNotification({
              title: `New role created `,
              message: `${orgAdminRoleData.name} created `,
              icon: 'bell',
              text: 'You can allocate users to this role',
              autohide: 3000,
            }),
          );
       
          yield put(
            registerNewOrgUser(
              { 
                id: organization.user_id,
                email: organization.adminEmail,
                first_name: organization.first_name,
                last_name: organization.last_name,
                role_id: orgAdminRoleData.id,
                general_status: 'Awaiting confirmation',
                from_provider_id: null,
                roleName: orgAdminRoleData.name
              },
              organization,
            ),
          );

          //  const emailData = {
          //   recipientEmail: action.org.email,
          //   subject: `User allocation message`,
          //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
          //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
          //   message: `Please cpnfirm by clicking this link`,
          //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

          // }
          // const args = {
          //   method: 'POST',
          //   body: JSON.stringify(emailData),
          // }
          // const email = yield call(request, apiUrl + 'email/send', args);
          // console.log(email)
          //  yield put(sendEmail())
        }
      } catch (err) {
        console.log(err);
      }
      yield put(
        showNotification({
          message: `Organization created`,
          title: `Organization created`,
          icon: 'bell',
          text: '',
          autohide: 3000,
        }),
      );
    }
  } catch (err) {
    yield put(loadError(err));
    yield put(
      showNotification({
        message: `There was an erro`,
        title: `Error `,
        icon: 'error',
        text: '',
        autohide: 3000,
      }),
    );
  }
}
function* registerOrgUser(action) {
  console.log('registerOrgUser', action);
  const user = action.user;
  const organization = action.company;
  const statuses = yield select(getStatuses);


  const modalOpen = yield select(getModalOpen);

  if (!user.id) {
    console.log('CREATING NEW ORG_USER')
    const url = apiUrl + 'users';
    const args = {
      method: 'POST',
      body: JSON.stringify(user),
    };
    try {
      // Create new user
      const requestResults = yield call(request, url, args);

      if (requestResults.user) {
        const newUser = requestResults.user;
        //add to organization users
        if (organization) {
          let userRoleData = {
            user_id: newUser.id,
            role_id: user.role_id,
            organization_id: organization.id,
            remarks: user.remarks,
            status: 'Approved',
            from_provider_id: user.from_provider_id
              ? user.from_provider_id
              : null,
          };
          const args = {
            method: 'POST',
            body: JSON.stringify(userRoleData),
          };

          const url = apiUrl + 'organization-users';
          // console.log(userRoleData);
          try {
            const result = yield call(request, url, args);
 
            // if (modalOpen) yield put(toggleModal());
            yield put(
              showNotification({
                title: `User created & allocated to organization`,
                message: `${newUser.email} has been created and allocated to ${
                  organization.name
                } `,
                icon: 'bell',
                text: '',
                autohide: 3000,
              }),
            );
            yield put(userAllocated({ ...userRoleData, ...newUser }));
          } catch (err) {
            // console.log(err)
            yield put(loadError(err));
          }
        }
        if (requestResults.user.from_provider_id) {
          let userRoleData = {
            user_id: newUser.id,
            role_id: user.role_id,
            provider_id: requestResults.user.from_provider_id,
            remarks: user.remarks ? user.remarks : '',
            status: 'Awaiting approvement',
          };
          const args = {
            method: 'POST',
            body: JSON.stringify(userRoleData),
          };

          const url = apiUrl + 'provider-users';

          try {
            const result = yield call(request, url, args);
 
            yield put(
              showNotification({
                title: `User created & allocated to provider`,
                message: '',
                icon: 'bell',
                text: `a confirmation email has been sent to ${newUser.email} `,
                autohide: 3000,
              }),
            );
            // yield put(userAllocated({ ...userRoleData, ...newUser }));
          } catch (err) {
            // console.log(err)
            yield put(loadError(err));
          }
        }
        // const emailData = {
        //   recipientEmail: newUser.email,
        //   subject: `Email confirmation`,
        //   subjectText: `PLease confirm your email`,
        //   header: `New user email confirmation `,
        //   message: `Please confirm your email by click on this link`,
        //   link: `http://localhost:3000/confirmation/newUserConfirmation/${requestResults.token}`,

        // }
        // const args = {
        //   method: 'POST',
        //   body: JSON.stringify(emailData),
        // }
        // const email = yield call(request, apiUrl + 'email/send', args);
        // console.log(email)
        //  yield put(sendEmail())
        if (modalOpen == true) yield put(toggleModal());
        yield put(
          registerUserResponse({
            msg: 'Email confirmation mail has been sent',
          }),
        );
      }
      //Add to provider-users
    } catch (err) {
      // console.log(err)
      yield put(loadError(err));
    }
  } 
  else {
    if (organization) {
      console.log('ADDING TO ORG_USERS')
      let userRoleData = {
        user_id: user.id,
        role_id: user.role_id,
        organization_id: organization.id,
        remarks: user.remarks,
        status: 'Awaiting approvement',
        from_provider_id: user.from_provider_id ? user.from_provider_id : null,
        roleName: user.roleName
      };
      const args = {
        method: 'POST',
        body: JSON.stringify(userRoleData),
      };

      const url = apiUrl + 'organization-users';
      console.log(userRoleData);
      try {
        const result = yield call(request, url, args);
        console.log(result);
        if (modalOpen == true) yield put(toggleModal());
        yield put(
          showNotification({
            title: `User created & allocated`,
            message: `${organization.email} has been created and allocated to ${
              organization.name
            } `,
            icon: 'bell',
            text: '',
            autohide: 3000,
          }),
        );
        yield put(userAllocated({ ...userRoleData, ...user }));
      } catch (err) {
        // console.log(err)
        yield put(loadError(err));
      }
    }
    // const emailData = {
    //   recipientEmail: newUser.email,
    //   subject: `Email confirmation`,
    //   subjectText: `PLease confirm your email`,
    //   header: `New user email confirmation `,
    //   message: `Please confirm your email by click on this link`,
    //   link: `http://localhost:3000/confirmation/newUserConfirmation/${requestResults.token}`,

    // }
    // const args = {
    //   method: 'POST',
    //   body: JSON.stringify(emailData),
    // }
    // const email = yield call(request, apiUrl + 'email/send', args);
    // console.log(email)
    //  yield put(sendEmail())
    yield put(
      registerUserResponse({ msg: 'Email confirmation mail has been sent' }),
    );
  }

}
function* registerProvUser(action) {
  console.log('registerProvUser', action);
  const user = action.user;
  const provider = action.provider;
  const org = action.org;
  const modalOpen = yield select(getModalOpen);

  if (!user.id) {
    const args = {
      method: 'POST',
      body: JSON.stringify(user),
    };
    try {
      // Create new user
      const requestResults = yield call(request, apiUrl + 'users', args);
      console.log(requestResults);
      if (requestResults.user) {
        const newUser = requestResults.user;
        //add to organization users
        if (provider) {
          let providerUserData = {
            user_id: newUser.id,
            role_id: user.role_id,
            provider_id: provider.id,
            remarks: user.remarks,
            status: 'Awaiting approvement',
          };
          const args = {
            method: 'POST',
            body: JSON.stringify(providerUserData),
          };
          console.log('providerUserData', providerUserData);
          try {
            const result = yield call(request, apiUrl + 'provider-users', args);
            console.log(result);
            if (org) {

            }
            // if (modalOpen) yield put(toggleModal());
            // yield put(
            //   showNotification({
            //     title: `User created & allocated to provider`,
            //     message: `${newUser.email} has been created and allocated to ${
            //       provider.name
            //     } `,
            //     icon: 'bell',
            //     text: '',
            //     autohide: 3000,
            //   }),
            // );
            yield put(userAllocated({ ...providerUserData, ...newUser }));
          } catch (err) {
            // console.log(err)
            yield put(loadError(err));
          }
        }
        if (org && provider) {
          let orgUserData = {
            user_id: newUser.id,
            role_id: user.role_id,
            organization_id: org.id,
            from_provider_id: provider.id,
            remarks: user.remarks,
            status: 'Awaiting approvement',
          };
          const args = {
            method: 'POST',
            body: JSON.stringify(orgUserData),
          };
          console.log('orgUserData', orgUserData);
          try {
            const result = yield call(request, apiUrl + 'organization-users', args);
            console.log(result);
        
            // if (modalOpen) yield put(toggleModal());
            // yield put(
            //   showNotification({
            //     title: `User created & allocated to provider`,
            //     message: `${newUser.email} has been created and allocated to ${
            //       provider.name
            //     } `,
            //     icon: 'bell',
            //     text: '',
            //     autohide: 3000,
            //   }),
            // );
            yield put(userAllocated({ ...orgUserData, ...newUser }));
          } catch (err) {
            // console.log(err)
            yield put(loadError(err));
          }
        }
        // const emailData = {
        //   recipientEmail: newUser.email,
        //   subject: `Email confirmation`,
        //   subjectText: `PLease confirm your email`,
        //   header: `New user email confirmation `,
        //   message: `Please confirm your email by click on this link`,
        //   link: `http://localhost:3000/confirmation/newUserConfirmation/${requestResults.token}`,

        // }
        // const args = {
        //   method: 'POST',
        //   body: JSON.stringify(emailData),
        // }
        // const email = yield call(request, apiUrl + 'email/send', args);
        // console.log(email)
        //  yield put(sendEmail())
        if (modalOpen) yield put(toggleModal());
        yield put(
          registerUserResponse({
            msg: 'Email confirmation mail has been sent',
          }),
        );
      }
      //Add to provider-users
    } catch (err) {
      // console.log(err)
      yield put(loadError(err));
    }
  } else {
    if (provider) {
      // yield put(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id}))
      let userRoleData = {
        user_id: user.id,
        role_id: user.role_id,
        provider_id: provider.id,
        remarks: user.remarks,
        status: 'Awaiting approvement',
      };
      const args = {
        method: 'POST',
        body: JSON.stringify(userRoleData),
      };

      const url = apiUrl + 'provider-users';
      console.log(userRoleData);
      try {
        const result = yield call(request, url, args);
        console.log(result);
        if (modalOpen) yield put(toggleModal());
        yield put(
          showNotification({
            title: `User created & allocated`,
            message: `${user.email} has been created and allocated to ${
              provider.name
            } `,
            icon: 'bell',
            text: '',
            autohide: 3000,
          }),
        );
        yield put(userAllocated({ ...userRoleData, ...user }));
      } catch (err) {
        // console.log(err)
        yield put(loadError(err));
      }
    }
    // const emailData = {
    //   recipientEmail: newUser.email,
    //   subject: `Email confirmation`,
    //   subjectText: `PLease confirm your email`,
    //   header: `New user email confirmation `,
    //   message: `Please confirm your email by click on this link`,
    //   link: `http://localhost:3000/confirmation/newUserConfirmation/${requestResults.token}`,

    // }
    // const args = {
    //   method: 'POST',
    //   body: JSON.stringify(emailData),
    // }
    // const email = yield call(request, apiUrl + 'email/send', args);
    // console.log(email)
    //  yield put(sendEmail())
    yield put(
      registerUserResponse({ msg: 'Email confirmation mail has been sent' }),
    );
  }
  // if(action.data.roles.length) {
  //   const args = {method: 'POST', body: JSON.stringify(action.data.roles)}
  //   console.log('updateing user roles')
  //   const userRoles = yield call(request, apiUrl + 'users/'+ requestResults.insertId +'/roles', args)
  //   console.log(userRoles)
  //   yield put(push('/users/'+ requestResults.insertId));
  //   // updateUserRoles(requestResults.insertId, action.data.roles)
  // }
}
function* createNewProviderUserAndThenAllocateToOrganization(action) {
  console.log(action)
  let user = action.newUser;
  let role_id = user.role_id;
  let roleName = user.roleName;
  let provider_id = action.provider.id
  let remarks = ''
  let org = action.organization;
  try {
    const newProvUser = yield put(registerNewProvUser(action.newUser, action.provider))
    console.log(newProvUser);
    if (newProvUser.insertId) {
      user.id = newProvUser.insertId;
      const newOrgUser = yield put(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id}));
      console.log(newOrgUser)
    }

  }
  catch (err) {
    console.log(err)
  }
}
function* addProviderUser(action) {
  console.log('addProviderUser', action);
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  };

  const url = apiUrl + 'provider-users';
  
  try {
    const result = yield call(request, url, args);
    console.log(result);
    // if (modalOpen) yield put(toggleModal());
    yield put(
      showNotification({
        title: `Role added`,
        message: ``,
        icon: 'bell',
        text: '',
        autohide: 3000,
      }),
    );
    yield put(userAllocated({ ...action.data, ...action.user }));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}
function* addOrganizationUser(action) {
  console.log('addOrganizationUser', action);
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  };

  const url = apiUrl + 'organization-users';
  
  try {
    const result = yield call(request, url, args);
    console.log(result);
    // if (modalOpen) yield put(toggleModal());
    yield put(
      showNotification({
        title: `Role added`,
        message: ``,
        icon: 'bell',
        text: '',
        autohide: 3000,
      }),
    );
    yield put(userAllocated({ ...action.data, ...action.user }));
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }
}
//(user, role_id, org)
function* allocateUserToOrganization(action) {
  console.log(action);
  const statuses = yield select(getStatuses);
  console.log(statuses);
  let userRoleData = {
    user_id: action.data.user.user_id ? action.data.user.user_id : action.data.user.id,
    role_id: action.data.role_id,
    organization_id: action.data.org.id,
    remarks: action.data.remarks,
    status: 'Awaiting approvement',
    from_provider_id: action.data.provider_id,
    first_name: action.data.user.first_name,
    last_name: action.data.user.last_name,
  };
  const args = {
    method: 'POST',
    body: JSON.stringify(userRoleData),
  };
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'organization-users';
  try {
    const result = yield call(request, url, args);
    console.log(result);
    if (modalOpen == true) yield put(toggleModal());
    if (result.results) {
      userRoleData.id = result.results.insertId;
      yield put(userAllocated(userRoleData));
      yield put(
        showNotification({
          title: `User allocated`,
          message: `${action.data.roleName} allocated`,
          icon: 'bell',
          text: `${action.data.roleName}`,
          autohide: 3000,
        }),
      );
    }
  } catch (err) {
    console.log(err);
  }
}
function* allocateProviderToOrg(action) {

  let connection = {
    organization_id: action.data.org.id,
    provider_id: action.data.provider.id,
    remarks: action.data.remarks,
    status: 'Awaiting approvement',
    provider_code: 'code',
  };
  const args = {
    method: 'POST',
    body: JSON.stringify(connection),
  };
  
  const modalOpen = yield select(getModalOpen);
  const alertOpen = yield select(getAlertOpen);

  const url = apiUrl + 'organization-providers';
  try {
    const result = yield call(request, url, args);
    
    if (modalOpen == true) yield put(toggleModal());
    if (result.affectedRows) {
      yield put(
        providerAllocated({ connection, provider: action.data.provider }),
      );
      yield put(
        showNotification({
          title: `${action.data.provider.name} allocated`,
          message: ` ${action.data.provider.name} allocated to ${
            action.data.org.name
          }`,
          icon: 'bell',
          text: `${action.data.roleName}`,
          autohide: 3000,
        }),
      );
    } else {
      if (alertOpen == false)
        yield put(
          toggleAlert({
            title: `Oops...`,
            text: `${action.data.provider.name} is allready allocated to ${
              action.data.org.name
            }`,
            confirmButton: 'Got it',
            cancelButton: 'Cancel',
            alertType: 'danger',
            // confirmFunction: () => console.log('')
          }),
        );
    }

    //  );
    //  const emailData = {
    //   recipientEmail: action.data.org.email,
    //   subject: `User allocation message`,
    //   subjectText: `You were allocated as ${action.data.roleName} to ${action.data.org.name}`,
    //   header: `A new ${action.data.roleName} role is allocated for you by ${action.data.org.name}`,
    //   message: `Please cpnfirm by clicking this link`,
    //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

    // }
    // const args = {
    //   method: 'POST',
    //   body: JSON.stringify(emailData),
    // }
    // // const email = yield call(request, apiUrl + 'email/send', args);
    // // console.log(email)
    // //  yield put(sendEmail())
    // };
  } catch (err) {
    console.log(err);
  }
}
function* allocateUserToProvider(action) {
  const statuses = yield select(getStatuses);

  console.log(action);
  let userRoleData = {
    user_id: action.user.id,
    role_id: action.role_id,
    provider_id: action.prov.id,
    remarks: action.remarks,
    status: 'Awaiting approvement',
  };
  const args = {
    method: 'POST',
    body: JSON.stringify(userRoleData),
  };
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'provider-users';
  try {
    const result = yield call(request, url, args);
    console.log(result);
    if (modalOpen) yield put(toggleModal());
    if (result.results.insertId) {
      userRoleData.id = result.results.insertId;
      yield put(userAllocated(userRoleData));
      yield put(
        showNotification({
          title: `User allocated`,
          message: `${action.roleName} allocated`,
          icon: 'bell',
          text: `${action.roleName}`,
          autohide: 3000,
        }),
      );
      //  const emailData = {
      //   recipientEmail: action.prov.email,
      //   subject: `User allocation message`,
      //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      //   message: `Please cpnfirm by clicking this link`,
      //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

      // }
      // const args = {
      //   method: 'POST',
      //   body: JSON.stringify(emailData),
      // }
      // const email = yield call(request, apiUrl + 'email/send', args);
      // console.log(email)
      //  yield put(sendEmail())
    }
  } catch (err) {
    console.log(err);
  }
}
function* addNewRole(action) {
  console.log(action);
  const newRole = action.data;
  newRole.visibility = newRole.visibility == true ? 'public' : 'private';
  console.log(newRole)
  const args = {
    method: 'POST',
    body: JSON.stringify(newRole),
  };
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'roles';
  try {
    const results = yield call(request, url, args);
    console.log(results);
    if (modalOpen) yield put(toggleModal());
    if (results.insertId) {
      newRole.id = results.insertId;
      yield put(newRoleCreated(newRole));
      yield put(
        showNotification({
          title: `New role created `,
          message: `${newRole.name} created `,
          icon: 'bell',
          text: 'You can allocate users to this role',
          autohide: 3000,
        }),
      );

      //  const emailData = {
      //   recipientEmail: action.org.email,
      //   subject: `User allocation message`,
      //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      //   message: `Please cpnfirm by clicking this link`,
      //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

      // }
      // const args = {
      //   method: 'POST',
      //   body: JSON.stringify(emailData),
      // }
      // const email = yield call(request, apiUrl + 'email/send', args);
      // console.log(email)
      //  yield put(sendEmail())
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateRole(action) {
  console.log(action);
  // const userRoleData = {
  //   user_id: action.user.user_id,
  //   old_role_id: action.user.role_id,
  //   new_role_id: action.role.id ? action.role.id : action.user.role_id,
  //   provider_id: action.user.provider_id,
  //   remarks: action.user.remarks,
  //   old_status: action.user.status,
  //   new_status: action.status.name ? action.status.name : action.user.status,
  // };
  const args = {
    method: 'PUT',
    body: JSON.stringify(action.role),
  };
  // const alertOpen = yield select(getAlertOpen);
  const url = apiUrl + 'roles/'+ action.role.id;

  try {
    const results = yield call(request, url, args);
    console.log(results);
    if (results) {

      // yield put(providerUserUpdated(userRoleData));
      yield put(
        showNotification({
          title: `Role updated `,
          message: ``,
          icon: 'bell',
          // text: 'A confimation email has been sent',
          autohide: 3000,
        }),
      );
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateOrganization(action) {
  console.log(action);
  const url = apiUrl + 'organizations/' + action.data.id;
  const modalOpen = yield select(getModalOpen);
  try {
    const args = {
      method: 'PUT',
      body: JSON.stringify(action.data),
    };
    const org = yield call(request, url, args);
    console.log(org);
    if (modalOpen) yield put(toggleModal());
    yield put(
      showNotification({
        message: `${action.data.name} updated`,
        title: `Success`,
        icon: 'bell',
        text: '',
        autohide: 3000,
      }),
    );
    yield put(organizationUpdated(action.data));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* updateProvider(action) {
  console.log(action);
  const url = apiUrl + 'providers/' + action.data.id;
  const modalOpen = yield select(getModalOpen);
  try {
    const args = {
      method: 'PUT',
      body: JSON.stringify(action.data),
    };
    const org = yield call(request, url, args);
    console.log(org);
    if (modalOpen) yield put(toggleModal());
    yield put(
      showNotification({
        message: `${action.data.name} updated`,
        title: `Success`,
        icon: 'bell',
        text: '',
        autohide: 3000,
      }),
    );
    yield put(providerUpdated(action.data));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* createRoleType(action) {
  console.log(action);
  let newRoleType = action.data;
  const args = {
    method: 'POST',
    body: JSON.stringify(newRoleType),
  };
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'roleTypes';
  try {
    const results = yield call(request, url, args);
    console.log(results);
    if (modalOpen) yield put(toggleModal());
    if (results.insertId) {
      newRoleType.id = results.insertId;
      yield put(newRoleTypeCreated(newRoleType));
      yield put(
        showNotification({
          title: `New role type created `,
          message: `${newRoleType.name} created `,
          icon: 'bell',
          text: 'You can create role with this role type',
          autohide: 3000,
        }),
      );

      //  const emailData = {
      //   recipientEmail: action.org.email,
      //   subject: `User allocation message`,
      //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      //   message: `Please cpnfirm by clicking this link`,
      //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

      // }
      // const args = {
      //   method: 'POST',
      //   body: JSON.stringify(emailData),
      // }
      // const email = yield call(request, apiUrl + 'email/send', args);
      // console.log(email)
      //  yield put(sendEmail())
    }
  } catch (err) {
    console.log(err);
  }
}
function* updateOrganizationUser(action) {
  console.log(action);
  const userRoleData = {
    user_id: action.user.user_id,
    old_role_id: action.user.role_id,
    new_role_id: action.role.id ? action.role.id : action.user.role_id,
    organization_id: action.user.organization_id,
    remarks: action.user.remarks,
    old_status: action.user.status,
    new_status: action.status.name ? action.status.name : action.user.status,
    from_provider_id: action.user.from_provider_id,
  };
  const args = {
    method: 'PUT',
    body: JSON.stringify(userRoleData),
  };
  const alertOpen = yield select(getAlertOpen);
  const url = apiUrl + 'organization-users';

  try {
    const results = yield call(request, url, args);
    console.log(results);
    // if (alertOpen) yield put(toggleAlert());
    if (results) {
      yield put(organizationUserUpdated(userRoleData));
      yield put(
        showNotification({
          title: `${action.user.first_name} ${action.user.last_name} updated `,
          message: ``,
          icon: 'bell',
          text: 'A confimation email has been sent',
          autohide: 3000,
        }),
      );

      //  const emailData = {
      //   recipientEmail: action.org.email,
      //   subject: `User allocation message`,
      //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      //   message: `Please cpnfirm by clicking this link`,
      //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

      // }
      // const args = {
      //   method: 'POST',
      //   body: JSON.stringify(emailData),
      // }
      // const email = yield call(request, apiUrl + 'email/send', args);
      // console.log(email)
      //  yield put(sendEmail())
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateProviderUser(action) {
  console.log(action);
  const userRoleData = {
    user_id: action.user.user_id,
    old_role_id: action.user.role_id,
    new_role_id: action.role.id ? action.role.id : action.user.role_id,
    provider_id: action.user.provider_id,
    remarks: action.user.remarks,
    old_status: action.user.status,
    new_status: action.status.name ? action.status.name : action.user.status,
  };
  const args = {
    method: 'PUT',
    body: JSON.stringify(userRoleData),
  };
  const alertOpen = yield select(getAlertOpen);
  const url = apiUrl + 'provider-users';

  try {
    const results = yield call(request, url, args);
    console.log(results);
    // if (alertOpen) yield put(toggleAlert());
    if (results) {
      // const updatedOrgUser = {
      //   ...action.user,
      //   user_id: action.user.user_id,
      //   role_id: action.role.id,
      //   organization_id: action.user.organization_id,
      //   remarks: action.user.remarks,
      //   status: action.status? action.status.id : action.user.status,
      //   from_provider_id: action.user.from_provider_id,
      // };

      yield put(providerUserUpdated(userRoleData));
      yield put(
        showNotification({
          title: `${action.user.first_name} ${action.user.last_name} updated `,
          message: ``,
          icon: 'bell',
          text: 'A confimation email has been sent',
          autohide: 3000,
        }),
      );

      //  const emailData = {
      //   recipientEmail: action.org.email,
      //   subject: `User allocation message`,
      //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      //   message: `Please cpnfirm by clicking this link`,
      //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

      // }
      // const args = {
      //   method: 'POST',
      //   body: JSON.stringify(emailData),
      // }
      // const email = yield call(request, apiUrl + 'email/send', args);
      // console.log(email)
      //  yield put(sendEmail())
    }
  } catch (err) {
    console.log(err);
  }
}
function* updateProviderOrgConnection(action) {
  console.log(action);
  const updatedConnection = {
    organization_id: action.company.organization_id,
    provider_id: action.company.provider_id,
    remarks: action.company.remarks,
    old_status: action.company.status,
    new_status: action.status.name,
    provider_code: null,
  };
  const args = {
    method: 'PUT',
    body: JSON.stringify(updatedConnection),
  };
  const alertOpen = yield select(getAlertOpen);
  const url = apiUrl + 'organization-providers';

  try {
    const results = yield call(request, url, args);
    console.log(results);
    // if (alertOpen) yield put(toggleAlert());
    if (results) {
      // const updatedOrgUser = {
      //   ...action.user,
      //   user_id: action.user.user_id,
      //   role_id: action.role.id,
      //   organization_id: action.user.organization_id,
      //   remarks: action.user.remarks,
      //   status: action.status? action.status.id : action.user.status,
      //   from_provider_id: action.user.from_provider_id,
      // };

      yield put(providerOrganizationConnectionUpdated(updatedConnection));
      yield put(
        showNotification({
          title: `${action.company.name} updated `,
          message: ``,
          icon: 'bell',
          text: 'A confimation email has been sent',
          autohide: 3000,
        }),
      );

      //  const emailData = {
      //   recipientEmail: action.org.email,
      //   subject: `User allocation message`,
      //   subjectText: `You were allocated as ${action.roleName} to ${action.org.name}`,
      //   header: `A new ${action.roleName} role is allocated for you by ${action.org.name}`,
      //   message: `Please cpnfirm by clicking this link`,
      //   link: 'http://localhost:3000/confirmation/organizationUserAllocation/'+result.token,

      // }
      // const args = {
      //   method: 'POST',
      //   body: JSON.stringify(emailData),
      // }
      // const email = yield call(request, apiUrl + 'email/send', args);
      // console.log(email)
      //  yield put(sendEmail())
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateUser(action) {
  console.log(action);
  
  const args = {
    method: 'PUT',
    body: JSON.stringify(action.user),
  };
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'users/'+ action.user.id;

  try {
    const results = yield call(request, url, args);
    console.log(results);
    if (modalOpen) yield put(toggleModal());
    if (results) {
      // const updatedOrgUser = {
      //   ...action.user,
      //   user_id: action.user.user_id,
      //   role_id: action.role.id,
      //   organization_id: action.user.organization_id,
      //   remarks: action.user.remarks,
      //   status: action.status? action.status.id : action.user.status,
      //   from_provider_id: action.user.from_provider_id,
      // };

      yield put(userUpdated(action.user));
      yield put(
        showNotification({
          title: `${action.user.first_name} ${action.user.last_name} updated `,
          message: ``,
          icon: 'bell',
          text: '',
          autohide: 3000,
        }),
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* addDataSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actionTypes.GET_USERS, getUsers);
  yield takeLatest(actionTypes.GET_PROJECTS, getProjects);
  yield takeLatest(actionTypes.GET_PROVIDERS, getProviders);
  yield takeLatest(actionTypes.GET_ORGANIZATIONS, getOrganizations);
  yield takeLatest(actionTypes.GET_ROLES, getRoles);
  yield takeLatest(actionTypes.GET_ROLE_TYPES, getRoleTypes);
  yield takeLatest(actionTypes.GET_PROCESS_TEMPLATES, getprocessTemplatesTasks);
  yield takeLatest(actionTypes.GET_ORGANIZATION_BY_ID, getOrganizationById);
  yield takeLatest(actionTypes.GET_PROVIDER_BY_ID, getProviderbyId);
  yield takeLatest(
    actionTypes.GET_PROVIDER_ORGANIZATIONS,
    getProviderOrganizations,
  );
  yield takeLatest(actionTypes.GET_ORG_TECH_INFO, getOrgTechnicalInfo);
  yield takeLatest(actionTypes.GET_USER, getUserById);
  yield takeLatest(actionTypes.FIND_ENTITY_BY_EMAIL, findEntityBy);
  yield takeLatest(actionTypes.REGISTER_ORG_USER, registerOrgUser);
  yield takeLatest(actionTypes.REGISTER_PROV_USER, registerProvUser);
  yield takeLatest(actionTypes.ADD_PROVIDER_USER, addProviderUser);
  yield takeLatest(actionTypes.ADD_ORGANIZATTION_USER, addOrganizationUser);
  yield takeLatest(actionTypes.REGISTER_PROVIDER, registerProvider);
  yield takeLatest(actionTypes.REGISTER_ORG, registerOrg);
  yield takeLatest(actionTypes.LOGIN, login);
  yield takeLatest(
    actionTypes.ALLOCATE_USER_TO_ORG,
    allocateUserToOrganization,
  );
  yield takeLatest(actionTypes.GET_ALL_DATA, getAllData);
  yield takeLatest(actionTypes.ADD_ORGANIZATION, addOrganization);
  yield takeLatest(actionTypes.UPDATE_ORGANIZATION, updateOrganization);
  yield takeLatest(actionTypes.ADD_PROVIDER, addProvider);
  yield takeLatest(actionTypes.UPDATE_PROVIDER, updateProvider);
  // yield takeLatest(actionTypes.DELETE_PROVIDER, addOrganization);
  // yield takeLatest(actionTypes.UPDATE_PROVIDER, addOrganization);

  yield takeLatest(actionTypes.ALLOCATE_USER_TO_PROV, allocateUserToProvider);
  yield takeLatest(actionTypes.ADD_NEW_ROLE, addNewRole);
  yield takeLatest(actionTypes.UPDATE_ROLE, updateRole);
  yield takeLatest(actionTypes.CREATE_ROLE_TYPE, createRoleType);
  yield takeLatest(actionTypes.ALLOCATE_PROVIDER_TO_ORG, allocateProviderToOrg);
  yield takeLatest(actionTypes.UPDATE_ORG_USER, updateOrganizationUser);
  yield takeLatest(actionTypes.UPDATE_USER, updateUser);
  yield takeLatest(actionTypes.UPDATE_PROV_USER, updateProviderUser);
  yield takeLatest(actionTypes.UPDATE_PROV_ORG_CONNECTION, updateProviderOrgConnection);
  yield takeLatest(actionTypes.CREATE_PROV_USER_AND_ALLOCATE_TO_ORGANIZATION_USER, createNewProviderUserAndThenAllocateToOrganization);
}
