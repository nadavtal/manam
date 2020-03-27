import * as actionTypes from './constants';

export const addRole = (newRole) => {

  return {
    type: actionTypes.ADD_ROLE,
    newRole: newRole

  };
};
export const deleteRole = (name) => {

  return {
    type: actionTypes.DELETE_ROLE,
    name: name

  };
};

export const addPermission = (newPermission, role) => {

  return {
    type: actionTypes.ADD_PERMISSION,
    newPermission: newPermission,
    role: role

  };
};

export const deletePermission = (name) => {

  return {
    type: actionTypes.DELETE_PERMISSION,
    name: name

  };
};

export const searchPermissions = (searchTerm) => {

  return {
    type: actionTypes.SEARCH_PERMISSIONS,
    searchTerm: searchTerm

  };
};

export const addRoleSucceed = () => {
  console.log('ROLE ADDED')
}


export const updateRole = (role) => {

  return {
    type: actionTypes.UPDATE_ROLE,
    role: role
  };
};
export const searchRole = () => {
  return {
    type: actionTypes.SEARCH_ROLE
  };
};
