
export const getRoleById = (id, roles) => {
  // console.log(id, roles)
  return roles.find(role => role.id == id)
}

export const getUserById = (userId, users) => {
    // console.log(userId, users)
  return users.find(user => user.id === userId)
}
export const getProviderById = (provId, providers) => {

  return providers.find(prov => prov.id === provId)
}
export const getOrganizationUser = (user_id, organization_id, role_id, orgUsers) => {
  // console.log(user_id, organization_id, role_id, orgUsers)
  return orgUsers.find(orgUser => orgUser.user_id === user_id && orgUser.organization_id === organization_id && orgUser.role_id === role_id)
}
export const getOrganizationUsersByProvider = (provider_id, orgUsers) => {
  
  return orgUsers.filter(orgUser => orgUser.from_provider_id === provider_id)
}

export const getAllUsersByProvider = (providersUsers, provider) => {
    
  return providersUsers.filter(connection => connection.provider_id === provider.id)
}
export const getOrgById = (orgId, orgs) => {
    // console.log(orgId, orgs)
  return orgs.find(org => org.id === orgId)
}

export const getOrganizationbyId = (orgId, orgs) => {
  return orgs.find(org => org.id === orgId)
}

export const getAllProvidersUsers = (providers, providersUsers, users)  => {
  // console.log(providers, providersUsers, users)
  let providersUsersObject = {}
  providers.map(provider => {
    // console.log(provider)
    providersUsersObject[provider.name] = []
    const providersUsersConnections = getAllUsersByProvider(providersUsers, provider)
    providersUsersConnections
    .map(userConnection => providersUsersObject[provider.name].push(getUserById(userConnection.user_id, users)))

    
  })
  return providersUsersObject
}
export const addOrganizationToRoles = (orgRoles, orgs)  => {
  // console.log(providers, providersUsers, users)
  orgRoles.forEach(role => {
    role['orgName'] = orgs.find(org => org.id == role.organization_id).name
  })
  return orgRoles
}
export const addProviderToRoles = (providerRoles, providers)  => {
  // console.log('addProviderToRoles', providerRoles)
  // console.log('addProviderToRoles', providers)
  providerRoles.forEach(role => {
    role['provName'] = providers.find(prov => prov.id == role.provider_id).name
  })
  return providerRoles
}

export const searchBy = (fieldName, value, orgs, provs, usersArray) => {

  const organization = orgs.find(org => org[fieldName] === value);
  const provider = provs.find(prov => prov[fieldName] === value);
  const user = usersArray.find(user => user[fieldName] === value);

  let results = null;
  if (organization || provider || user) {
    results = {
      organization,
      provider,
      user
    }

  }
  return results
}

export const getRolesByUserId = (userId, userRoles, roles)  => {
  // console.log('addProviderToRoles', providerRoles)
  userRoles = userRoles.filter(userRole => userRole.user_id == userId)
    .map(userRole => roles.find(role => userRole.role_id == role.id))
  
  return userRoles
}

export const getAvailableRolesByUserId = (allRoles, accupiedRoles)  => {
  // console.log(allRoles, accupiedRoles)
  let availableRoles = allRoles.filter(role => !accupiedRoles.includes(role));
  return availableRoles
}
export const getAvailableUsersByRoleId = (roleId, userRoles)  => {
  // console.log(allRoles, accupiedRoles)
  let availableRoles = userRoles.filter(role => role.role_id !== roleId);
  return availableRoles
}

export const searchAll = (val, data) => {
  console.log(typeof(val))
  let results = []

  data.map(item => {
    // console.log(item)
    Object.keys(item).map(key => {
      // console.log(key, item[key])
      if ( typeof(val)  === 'string' 
        && typeof(item[key])  === 'string' 
        && item[key].includes(val)) {
          console.log('Found string', key)
          console.log(item)
          if (!results.includes(item))
          results.push(item)
        }
      if ( typeof(item[key])  === 'number') {
        
        // const strVal = JSON.stringify(val)
        const strKey = JSON.stringify(item[key])
        if (strKey.includes(val)) {
          console.log('Found numberp', key)
          console.log(item)
          if (!results.includes(item))
          results.push(item)
        }
      }
    })
  })
  return results
}
export const sortBy = (field, data, reverse) => {
  console.log(field, data)
  if (reverse) {
    data.sort((a,b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0)); 

  } else {
    data.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)); 
    
  }
  console.log(data)
  return data

}

