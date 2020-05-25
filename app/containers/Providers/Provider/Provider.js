import React, {useState, memo, useEffect} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole} from '../../App/selectors';
import { makeSelectProvider, makeSelectProviderProjects, makeSelectProviderBridges,
  makeSelectProviderProcessesTemplates, makeSelectProviderOrganizations, makeSelectProviderProcessesTasks,
  makeSelectProviderMessages, makeSelectProviderProcesses, makeSelectProviderProjectsProcesses,
  makeSelectProviderTasks, makeSelectProviderUsers, getProviderBridges, makeSelectProviderRoles,
  makeSelectOrganizationUsers, makeSelectOrganizationRoles } from './selectors'
import TableFilters from '../../TableFilters/TableFilters';
import axios from 'axios';
import BridgePage from 'containers/BridgePage/Loadable'
import Processes from '../../Processes/Processes';
import Calender from '../../Calender/Calender';
import AccordionTable from '../../AccordionTable/AccordionTable';
import ManagementSection from '../../Management/ManagementSection';
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip'
import { convertToMySqlDateFormat } from '../../../utils/dateTimeUtils';
import { updateTask, createNewRole, registerNewProvUser, registerNewOrgUser, allocateUserToOrg, updateProvider,
  getProviderbyId, logout, findEntityBy, createNewProviderUserAndThenAllocateToOrganization, updatedUser } from '../../AppData/actions';
import { toggleModal, toggleAlert } from '../../App/actions';
import {apiUrl} from 'containers/App/constants'
import { createNewProject } from '../../Projects/actions';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../../Forms/Form';
import * as actions from './actions';
import Projects from '../../Projects/Projects';
import SideMenu from '../../../components/SideMenu/SideMenu';
import {  MDBTabPane,
  MDBTabContent,
  MDBIcon,
  MDBBtn,
  MDBSwitch,
  } from "mdbreact";


import { addOrganizationToRoles, getUserById, getRoleById, searchBy } from '../../../utils/dataUtils'
import reducer from './reducer';
import saga from './saga';
// import { selectOrganization } from "../../Organizations/Organization/selectors";
const key = "provider";

const ProviderPage = (props) => {
    
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState(
    localStorage.getItem('activeItemClassicTabs3')
      ? localStorage.getItem('activeItemClassicTabs3')
      : props.provider.general_status !== 'Active' ?
        'Info'
        :
        'Bridges'
  );
  const [showProviderProcesses, setsShowProviderProcesses] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [selectedbridge, setSelectedbridge] = useState();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  let hasBridges = props.bridges.length ? true : false;

  useEffect(() => {
    const providerId = props.match.params.id;
    props.getProvider(providerId)
    return () => localStorage.removeItem('activeItemClassicTabs3');
   
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.organizations && props.organizations.length) {
      if (localStorage.getItem('orgId')) {
        setSelectedOrganization(props.organizations.find(org => org.id == localStorage.getItem('orgId')))
      } 
      else if( props.location.state && props.location.state.org_id) {
        console.log(props.location.state.org_id);
        console.log(props.organizations)
        const org = props.organizations.find(org => org.id == props.location.state.org_id);
        console.log(org)
        setSelectedOrganization(
          props.organizations.find(org => org.id == props.location.state.org_id)
        )
      }
     
      addOrganizationToRoles(props.organizationsRoles, props.organizations)
      console.log('handleCurrentUserAndProviderStatus')
      // handleCurrentUserAndProviderStatus()
    }
    }, [props.provider]);
    useEffect(() => {
      hasBridges = props.bridges.length ? true : false;
      if (props.provider.general_status === 'Active') {
        if (hasBridges) setActiveItemClassicTabs3('Bridges');
        else setActiveItemClassicTabs3('Management');
      }
      // console.log('handleCurrentUserAndOrgStatus')
      // handleCurrentUserAndOrgStatus()
    }, [props.provider.general_status, props.bridges]);
  useEffect(() => {
    console.log('handleCurrentUserAndProviderStatus')
    handleCurrentUserAndProviderStatus();

    return () => {};
  }, [props.currentUser]);
  
  const toggleClassicTabs3 = (tab) => {
    console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
    setActiveItemClassicTabs3(tab)
    localStorage.setItem('activeItemClassicTabs3', tab)
    }
  }

  const handleCurrentUserAndProviderStatus = () => {
    if (props.currentUser && props.currentUser.userInfo.general_status !== 'Active') {
      setActiveItemClassicTabs3('Info')
      props.onToggleAlert({
        title: `Welcome ${props.currentUser.userInfo.first_name} ${
          props.currentUser.userInfo.last_name
        }`,
        // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
        confirmButton: 'Got it',
        // cancelButton: 'Cancel',
        alertType: 'success',
        icon: 'door-open',
        body: (
          <div className="ml-5">
            <h3 className="ml-5">
              This is you 'Info' tab. 
              Here you manage all you personal and provider information.
            </h3>
            <p className="ml-5">
              Please fill in your personal and provider info to activate your account
            </p>
          </div>
        ),
        onCloseFunction: () => {
          // setSideMenuOpen(true);
          // console.log(sideMenuOpen);
        },
        confirmFunction: () => {
          // setSideMenuOpen(true);
        },
      });
    }   
    // else if 
    //   (props.provider.name &&
    //   props.provider.general_status !== 'Active' && 
    //   props.currentUser && 
    //   props.currentUser.userInfo.general_status == 'Active'
    //   ) 
    //   {   
    //   setActiveItemClassicTabs3('Info')
    //   props.onToggleAlert({
    //     title: `Great! `,
    //     // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
    //     confirmButton: 'Got it',
    //     // cancelButton: 'Cancel',
    //     alertType: 'success',
    //     icon: 'check-circle',
    //     body: (
    //       <div className="ml-5">
    //         <h3 className="ml-5">
    //           {`This is the 'Info' tab. this is where you manage all your provider information`}
    //         </h3>
    //         {/* <p className="ml-5">
    //               You can allways access your provider info in the 'Info' tab in the side menu
    //             </p> */}
    //       </div>
    //     ),
    //     // onCloseFunction: () => {
    //     //   // setSideMenuOpen(true)

    //     //   // setActiveItemClassicTabs3('info')
    //     //   console.log(sideMenuOpen)
    //     // },
    //     confirmFunction: () => {
    //       // setSideMenuOpen(true);
    //       // setActiveItemClassicTabs3('info')
    //     },
    //   });

    // }
     else if (props.provider &&
       props.provider.general_status == 'Active' && 
       props.currentUser && 
       props.currentUser.userInfo.general_status == 'Active'
       ) 
       {  
       if (props.providerUsers.length == 1) {
         props.onToggleAlert({
           title: `All done! `,
           // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
           confirmButton: 'Got it',
           // cancelButton: 'Cancel',
           alertType: 'success',
           icon: 'check-circle',
           body: <div className="ml-5">
                   <h3 className="ml-5">
                     {`This is the 'Management' tab. this is where you manage all your users, roles and providers`} 
                   </h3>
 
                 </div>
           ,
 
           // confirmFunction: () => {
 
           // }
         });
       }
   
     }
     
  }
  const userOrgRoles = () => {
    let roles = []
    props.currentUser.userOrganiztionRoles.map(role =>  {
      // console.log(role)
      roles.push({
        org_id: role.org_id,
        name: role.org_name,
        roleName: role.role_name
      })
    })

    return roles
  }
  const userProviderRoles = () => {
    let roles = []

    props.currentUser.userProviderRoles.map(role =>  {
      // console.log(role)
      roles.push({
        provider_id: role.provider_id,
        name: role.name,
        roleName: ''
      })

    })

    return roles
  }

  const createProject = (data) => {
    data.organization_id = props.match.params.id;
    props.onCreateNewProject(data)
  }

  const linkToOrgPage = (id) => {
    console.log(props.history)
    props.history.push("../organizations/"+id);
  }

  const allocateUsers = (data) => {
    console.log(data, props.provider.id)
    const newProviderUser = {
      user_id: data.user_id,
      provider_id: props.provider.id,
      remarks: data.remarks,
      status: 'active'
    }
    console.log(newProviderUser)
    props.onAllocateUser(newProviderUser)
  }

  const changeTaskPercentage = (task, value) => {
    console.log('changeTaskPercentage',  value)
    if(value) {
      task.completed_percentage = parseInt(value);
      task.due_date = convertToMySqlDateFormat(task.due_date);
      task.last_update = convertToMySqlDateFormat(new Date)
      // console.log(task.due_date)
      // console.log(convertToMySqlDateFormat(task.due_date))
      // updateTask.due_date = convertToMySqlDateFormat(updateTask.due_date)
      // updateTask.last_update = convertToMySqlDateFormat(new Date)

      // console.log(task);
      props.onUpdateTask(task)

    }

  }
  const changeTaskDate = (task, value) => {
    console.log('changeTaskDate', value)
    if(value) {

      task.due_date = convertToMySqlDateFormat(value);
      task.last_update = convertToMySqlDateFormat(new Date)

      console.log(task);
      props.onUpdateTask(task)
    }

  }

  const toggleModal = (modalType) => {
    switch (modalType) {
      case 'allocateUsers':
        props.onToggleModal({
          title: 'Add User',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'allocateUserForm',
          users: props.providerUsers,
          // options: {
          //   buttonText: 'Add users',
          //   options: [props.users],
          // },
          confirmFunction: (data) => allocateUsers(data)
        });
        break
    }

  }

  const linkToBridgePage = (bridgeId, orgId) => {
    // console.log(orgId, bridgeId)
    console.log(props.history)
    props.history.push('../organizations/' + orgId + "/bridges/"+bridgeId);
  }
  const linkToProviderPage = (provider_id) => {
    console.log(provider_id)
    console.log(props.history)
    props.history.push('./'+provider_id);
  }

  const changeWorkSpace = (orgId) => {

    localStorage.setItem('orgId', orgId)
    setSelectedOrganization(orgId);
    setSelectedbridge(null)
  }
  const handleMenuClick = name => {
    toggleClassicTabs3(name);
    switch (name) {
      case 'Switch work space':
        props.history.push('/');
        break;
      case 'Sign out':
        props.onToggleAlert({
          title: `Are you sure you want to sign out?`,
          // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
          confirmButton: 'Sign out',
          cancelButton: 'Cancel',
          alertType: 'danger',
          confirmFunction: () => {
            
            props.onLogout();
            props.history.push('/');
          }
        });
        break;

      default:
        break;
    }
  };

  const handleAction = (name, value) => {
    console.log(name, value);
    let url;
    switch (name) {
      case 'Roles':
        toggleClassicTabs3(name);
        break;
      case 'Switch work space':
        props.history.push('/');
        break;

      case 'Create new role':
        props.onToggleModal({
          title: `Create new role `,
          text: 'Create new role for ' + props.provider.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'generalRoleForm',

          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: props.roleTypes,
          },
          confirmFunction: (data, event) => {
            data['provider_id'] = props.provider.id;
            // data['type'] = props.roleTypes.find(roleType => roleType.id === data.type).name;
            data['type'] = 'General';
            props.createNewRole(data)
          }
        });
        break;
        case 'Create new user':
          props.onToggleModal({
            title: 'Create new user',
            text: '',
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            data: {
              editMode: 'create',
              colWidth: 12,
              roles: [...props.providerRoles, ...orgRolesBySelectedOrg()],
            },
            formType: 'registerUserForm',
            confirmFunction: data => {
              console.log(data)
              let role = [...props.providerRoles, ...orgRolesBySelectedOrg()].find(role => role.id === data.role_id);
              console.log(role)
              data['roleName'] = role.name
              if (role.provider_id) {
                props.createNewProviderUser(data, props.provider, null);
              }
              else if (role.organization_id) {
                // data['from_provider_id'] = props.provider_id
                props.createNewProviderUser(data, props.provider, selectedOrganization)
              }
            },
            onBlurFunction: (value) => {
              console.log(value)
              const searchResults = searchBy(
                'email', 
                value.value, 
                [],
                [],
                [...props.organizationUsers, ...props.providerUsers],
                )
              console.log(searchResults)
              if (searchResults) {
                searchResults['allocated'] = true
                return searchResults
              }
               else {
                props.findEntity('email', value.value)
  
              }
            },
          });
          break;

      case 'Allocate user to in house user':
        props.onToggleModal({
          title: `Allocate user to ${selectedOrganization.name}`,
          text:
            'Choose user and role to allocate to ' + selectedOrganization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'organizaionUserAllocationForm',

          data: {
            // providerUsers: allProvidersUsers,
            users: props.organizationUsers,
            roles: props.organizationRoles,
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: (data, event) =>
            prepareUserAllocation(data, 'organization'),
        });
        break;
      case 'Allocate users to role':
        // console.log(props.providerUsers, typeof(props.providerUsers))
        props.onToggleModal({
          title: `Allocate user to ${selectedOrganization.name}`,
          text:
            'Choose users and role to allocate to ' + selectedOrganization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'organizaionUserAllocationForm',

          data: {
            // providerUsers: allProvidersUsers,
            users: props.providerUsers,
            roles: props.organizationsRoles.filter(orgRole => orgRole.organization_id === selectedOrganization.id),
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: (data, event) => {
            // console.log(data)
            prepareUserAllocation(data)
          }
        });
        break;
      case 'Update provider':
        value.general_status = 'Active'
        props.onUpdateProvider(value)
        break;
      case 'Update provider image':
        // console.log(value)
        url = `profile_images/provider/${props.provider.id}`;
        // props.onUpdateImage('organization', props.organization, value)
        let updatedProvider = {...props.provider}
        if (props.provider.profile_image) {
          axios.put(apiUrl + url, value, {
          }).then(res => {
              console.log(res)
              updatedProvider.profile_image = res.data.name
              props.onUpdateProvider(updatedProvider)
          })
        } else {
          axios.post(apiUrl + url, value, {
          }).then(res => {
              console.log(res)
              updatedProvider.profile_image = res.data.name
              props.onUpdateProvider(updatedProvider)
          })
        }
        break
      case 'Update user':
        value.general_status = 'Active'
        props.onUpdateUser(value)
        break;
      case 'Update user image':
        // console.log(value)
        url = `profile_images/user/${props.currentUser.userInfo.id}`
        let updatedUser = {...props.currentUser.userInfo}
        if (props.currentUser.userInfo.profile_image) {
          axios.put(apiUrl + url, value, {
          }).then(res => {
              console.log(res)
              updatedUser.profile_image = res.data.name
              props.onUpdateUser(updatedUser)
          })
        } else {
          axios.post(apiUrl + url, value, {
          }).then(res => {
              console.log(res)
              updatedUser.profile_image = res.data.name
              props.onUpdateUser(updatedUser)
          })
        }
        break;

      default:
        break;
    }
  };

  const prepareUserAllocation = (data) => {
    // console.log(data)
    const roleName = getRoleById(data.role_id, props.organizationsRoles).name;
    const org = props.organizations.find(org => org.id == selectedOrganization.id)
    if (data.user_id.length > 1) {
      data.user_id.forEach(user_id => {
        const user = props.providerUsers.find(provUser => provUser.user_id == +user_id);
      
        props.allocateUserToOrg(user, org, data.role_id, roleName, data.remarks, props.provider.id) ;
      });
    } else {
      const user = props.providerUsers.find(provUser => provUser.user_id == +data.user_id[0]);
      console.log(user)
      props.allocateUserToOrg(user, org, data.role_id, roleName, data.remarks, props.provider.id) ;
    }
  
   
  }

  const orgRolesBySelectedOrg = () => {
    return props.organizationsRoles.filter(orgRole => orgRole.organization_id == selectedOrganization.id)
  }
  console.log('selectedOrganization', selectedOrganization)
  if (!props.currentUser) 
    return <div>NO CURRENT USER</div> 
  else if (!selectedOrganization)
    return <div>NO SELECTED ORGNIZATION</div> 
  else return (
         <div className="position-relative">
           <SideMenu
             menuType="providerMenu"
             onMenuClick={name => handleMenuClick(name)}
             onSubMenuClick={name => handleSubMenuClick(name)}
             linkToProviderPage={provider_id =>
               linkToProviderPage(provider_id)
             }
             organization={selectedOrganization}
             company={props.provider ? props.provider : null}
             currentUser={props.currentUser}
             currentUserRole={props.currentUserRole}
             onFinalItemClick={(menuItem, menuType) => {
               if (menuItem.org_id) changeWorkSpace(menuItem.org_id);
               else if (menuItem.provider_id)
                 linkToProviderPage(menuItem.provider_id);
             }}
           />

           <div className="classic-tabs">
             {!props.loading ? (
               <MDBTabContent
                 className="pageContent"
                 activeItem={activeItemClassicTabs3}
               >
                 <MDBTabPane tabId={'Info'}>
                   <ManagementSection
                     handleAction={(actionName, value) =>
                       handleAction(actionName, value)
                     }
                     users={props.providerUsers}
                     roles={props.providerRoles}
                     company={props.provider}
                     organizations={props.organizations}
                     organizationsRoles={orgRolesBySelectedOrg()}
                     organizationUsers={props.organizationUsers.filter(
                       orgUser =>
                         orgUser.organization_id ==
                         selectedOrganization.id,
                     )}
                     type="generalProvider"
                     title="General info"
                     currentUser={props.currentUser}
                   />
                   {/* <Basic
                         item={props.provider}
                         updateItem={data =>
                           handleAction('Update provider', data)
                         }
                         dataType="updateProviderForm"
                       /> */}
                 </MDBTabPane>

                 {props.currentUser &&
                 props.currentUser.userInfo.general_status ===
                   'Active' && (
                    <>
                     <MDBTabPane tabId="Bridges">
                       {selectedbridge ? (
                         <>
                           <BridgePage
                             bridgeId={selectedbridge}
                             orgId={selectedOrganization.id}
                             type="providerPage"
                           />
                           <IconButtonToolTip
                             className="leftTopCorner text-white mt-2"
                             size="lg"
                             iconName="chevron-left"
                             toolTipType="info"
                             toolTipPosition="right"
                             // toolTipEffect="float"
                             toolTipText="Back to bridges"
                             onClickFunction={() =>
                               setSelectedbridge(null)
                             }
                           />
                         </>
                       ) : props.bridges && props.bridges.length ? (
                         <Projects
                           items={props.bridges.filter(
                             bridge =>
                               bridge.organization_id ==
                               selectedOrganization,
                           )}
                           rootLink={props.match.url}
                           // onProjectClick={(orgId, bridgeId) => linkToBridgePage(orgId, bridgeId)}
                           onProjectClick={bridgeId =>
                             setSelectedbridge(bridgeId)
                           }
                         />
                       ) : (
                         <div>No bridges yet...</div>
                       )}
                     </MDBTabPane>
                     <MDBTabPane tabId="Messages">
                       {/* <TableFilters
                dataType={'messagesTable'}
                data={props.messages}
                // checkBoxFunction={(item) => this.addRemoveItem(item, task.dataType)}
                // isChecked={(item) => this.isItemInArray(item, task.dataType)}
                // providers={this.props.providers}
                tableName={'Messages'}
                onRowClick={(id) => console.log(id)}
              /> */}
                     </MDBTabPane>
                     <MDBTabPane tabId="Schedule">
                       <Calender />
                     </MDBTabPane>

                     <MDBTabPane tabId="Management">
                       <ManagementSection
                         handleAction={(actionName, value) =>
                           handleAction(actionName, value)
                         }
                         users={props.providerUsers}
                         roles={props.providerRoles}
                         company={props.provider}
                         organizations={props.organizations}
                         organizationsRoles={orgRolesBySelectedOrg()}
                         organizationUsers={props.organizationUsers.filter(
                           orgUser =>
                             orgUser.organization_id ==
                             selectedOrganization.id,
                         )}
                         type="provider"
                         title="Manage user and roles"
                       />
                     </MDBTabPane>
                     <MDBTabPane tabId="Manage projects">
                       <div className="text-center mt-3 mb-5 d-flex justify-content-between">
                         <h4>
                           <strong>
                             {props.provider.name} projects
                           </strong>
                         </h4>
                         <MDBBtn
                           color="info"
                           rounded
                           className="ml-3"
                           onClick={() => toggleModal('createProject')}
                         >
                           Submit new project{' '}
                           <MDBIcon icon="image" className="ml-1" />
                         </MDBBtn>
                       </div>
                       {/* <Form
                formType="projectForm"
                editMode="create"
                createFunction= {(data) => createNewProject(data)}
              ></Form> */}
                       {/* <Projects></Projects> */}
                     </MDBTabPane>
                     <MDBTabPane tabId="Manage processes">
                       <MDBSwitch
                         checked={showProviderProcesses}
                         onChange={() =>
                           setsShowProviderProcesses(
                             !showProviderProcesses,
                           )
                         }
                         labelLeft=""
                         labelRight={`Show ${
                           showProviderProcesses
                             ? 'process templates'
                             : 'all processes'
                         }`}
                       />
                       {showProviderProcesses ? (
                         <AccordionTable
                           data={props.projectsProcesses.filter(
                             process =>
                               process.organization_id ==
                               selectedOrganization.id,
                           )}
                           rows={props.tasks}
                           dataType="processes"
                           // bridges={props.bridges}
                           changePercentage={(task, value) =>
                             changeTaskPercentage(task, value)
                           }
                           changeDate={(task, value) =>
                             changeTaskDate(task, value)
                           }
                         />
                       ) : (
                         <Processes provider={props.provider} />
                       )}
                     </MDBTabPane>
                     <MDBTabPane tabId="Organizations">
                       <br />
                       <TableFilters
                         dataType={'organizationsTable'}
                         data={props.organizations}
                         checkBoxFunction={item => console.log(item)}
                         isChecked={item => {
                           return false;
                         }}
                         // providers={this.props.providers}
                         tableName={'Organizations'}
                         onRowClick={id => console.log(id)}
                       />
                     </MDBTabPane>

                     <MDBTabPane tabId="Settings">
                       <br />
                       <TableFilters
                         dataType={'organizationsTable'}
                         data={props.organizations}
                         checkBoxFunction={item => console.log(item)}
                         isChecked={item => {
                           return false;
                         }}
                         // providers={this.props.providers}
                         tableName={'Organizations'}
                         onRowClick={id => linkToOrgPage(id)}
                       />
                     </MDBTabPane>
                   </>
                    )}
               </MDBTabContent>
             ) : (
               <strong>Getting {props.provider.name} data</strong>
             )}
           </div>
           <br />
         </div>
       );
}

const mapStateToProps = createStructuredSelector({
  // users: makeSelectUsers(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  provider: makeSelectProvider(),
  // bridges: getProviderBridges(),
  bridges: makeSelectProviderBridges(),
  projects: makeSelectProviderProjects(),
  processes: makeSelectProviderProcesses(),
  processesTemplates: makeSelectProviderProcessesTemplates(),
  processesTasks: makeSelectProviderProcessesTasks(),
  organizations: makeSelectProviderOrganizations(),
  messages: makeSelectProviderMessages(),
  projectsProcesses: makeSelectProviderProjectsProcesses(),
  tasks: makeSelectProviderTasks(),
  providerUsers: makeSelectProviderUsers(),
  providerRoles: makeSelectProviderRoles(),
  organizationUsers: makeSelectOrganizationUsers(),
  organizationsRoles: makeSelectOrganizationRoles(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewProject: data => {dispatch(createNewProject(data))},
    getProvider: (id) => dispatch(getProviderbyId(id)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    onUpdateProvider: (data, id) => dispatch(updateProvider(data,id)),
    onUpdateUser: user => dispatch(updatedUser(user)),
    onUpdateTask: (task) => dispatch(updateTask(task)),
    onLogout: () => dispatch(logout()),
    createNewRole: (data) => dispatch(createNewRole(data)),
    createNewProviderUser: (newUser, provider, org) => dispatch(registerNewProvUser(newUser, provider, org)),
    createNewOrganizationUser: (newUser, organization) => dispatch(registerNewOrgUser(newUser, organization)),
    onCreateNewProviderUserAndOrganizationUser: (newUser, organization, provider) => dispatch(createNewProviderUserAndThenAllocateToOrganization(newUser, organization, provider)),
    allocateUserToOrg: (user, org, role_id, roleName, remarks, provider_id) => dispatch(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id})),
    findEntity: (type, value) => dispatch(findEntityBy(type, value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProviderPage);




