import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateTask, registerNewOrgUser, addProvider, createNewRole, findEntityByEmail, logout,
 updateOrg } from '../../AppData/actions';
import { toggleModal, toggleAlert } from '../../App/actions';
import { createStructuredSelector } from 'reselect';
import {
  
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectCurrentUserRole,
  makeSelectRoleTypes
} from '../../App/selectors';
import * as selectors from './selectors';
import AccordionTable from '../../AccordionTable/AccordionTable';
import ManagementSection from '../../Management/ManagementSection';
import SideMenu from '../../../components/SideMenu/SideMenu';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../../Forms/Form';
import OrganizationProject from './OrganizationProject';
import BridgePage from 'containers/BridgePage/Loadable';
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip';
import Projects from '../../Projects/Projects';
import TableFilters from '../../TableFilters/TableFilters';
import Calender from '../../Calender/Calender';

import { convertToMySqlDateFormat } from '../../../utils/dateTimeUtils';
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBtn,
  MDBSwitch,
  MDBAnimation,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from 'mdbreact';
import './organization.css';
import Processes from '../../Processes/Processes';
import * as actions from './actions';
import ToolBar from '../../../components/ToolBar/ToolBar';
import Extended from '../../UserPage/Extended/Extended';
import Basic from '../../UserPage/Basic/Basic';
import { getOrganizationbyId } from '../../AppData/actions';
import { createNewBridge } from '../../BridgePage/actions';
import { createNewProject } from '../../Projects/actions';
import { addProviderToRoles, getRoleById, searchBy } from '../../../utils/dataUtils'
import reducer from './reducer';

import saga from './saga';
const key = 'organization';

const OrganizationPage = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState(
    localStorage.getItem('activeItemClassicTabs3')
      ? localStorage.getItem('activeItemClassicTabs3')
      : props.organization.general_status !== 'Active' ?
        'Info'
        :
        'Bridges'
  );
  const [showProject, setShowProject] = useState(false);
  const [showOrganizationProcesses, setsShowOrganizationProcesses] = useState();
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedbridge, setSelectedbridge] = useState();
  let hasBridges = props.bridges.length ? true : false;
  let hasProcessesTemplates = props.processesTemplates.length ? true : false;
  let hasProcesses = props.projectsProcesses.length ? true : false;
  let hasProjects = props.projects.length ? true : false;
  let orgId;

  useEffect(() => {
    orgId = props.match.params.id;
    props.getOrganizationbyId(orgId);
    return () => localStorage.removeItem('activeItemClassicTabs3');
  }, []);

  useEffect(() => {
    console.log(props);
    hasBridges = props.bridges.length ? true : false;
    hasProcesses = props.projectsProcesses.length ? true : false;
    hasProcessesTemplates = props.processesTemplates.length ? true : false;
    hasProjects = props.projects.length ? true : false;
  }, [props.organization]);

  useEffect(() => {
    console.log(props.providersRoles, props.providers)
    if (props.providersRoles.length && props.providers.length)
    addProviderToRoles(props.providersRoles, props.providers)

  }, [props.providersRoles, props.providers]);
  useEffect(() => {
    console.log('props.organizationUsers', props.organizationUsers);
    props.organizationUsers.map(orgUser => {
      
      if (orgUser.role_id && !orgUser.roleName) {
        const role = getRoleById(orgUser.role_id, props.organizationRoles)
        console.log(role)
        orgUser['roleName'] = role.name;
        orgUser['description'] = role.description;

      }
    })

  }, [props.organizationUsers]);
  const toggleClassicTabs3 = tab => {
    // console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
      setActiveItemClassicTabs3(tab);
    }
    localStorage.setItem('activeItemClassicTabs3', tab);
  };

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
  const handleSubMenuClick = name => {
    console.log(name);
    switch (name) {
      case 'Roles':
        toggleClassicTabs3(name);
        break;
      case 'Switch work space':
        props.history.push('/');
        break;
      case 'Sign out':
        props.onToggleModal({
          title: 'Are you sure you want to log out?',
          text: '',
          confirmButton: 'Log out',
          cancelButton: 'Cancel',

          confirmFunction: data => {
            props.onLogout();
            props.history.push('/');
          },
        });

        break;

      default:
        break;
    }
  };

  const handleAction = (name, value) => {
    
    switch (name) {
      case 'Roles':
        toggleClassicTabs3(name);
        break;
      
      case 'Create new role':
        props.onToggleModal({
          title: `Create new role `,
          text: 'Create new role for ' + props.organization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'roleForm',

          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: props.roleTypes,
          },
          confirmFunction: (data, event) => {
            data['organization_id'] = props.organization.id;
            data['type'] = props.roleTypes.find(roleType => roleType.id === data.type).name;
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
            roles: props.organizationRoles,
          },
          formType: 'registerUserForm',
          confirmFunction: data => {
            console.log(data)
            props.createNewOrganizationUser(data, props.organization);
          },
          onBlurFunction: (value) => {
            
            const searchResults = searchBy(
              'email', 
              value, 
              [],
              props.providers,
              props.organizationUsers,
              )
            console.log(searchResults)
            if (searchResults) {
              searchResults['allocated'] = true
              return searchResults
            }
             else {
              props.findEntityByEmail(value)

            }
          },
        });
        break;
      case 'Create new provider':
        props.onToggleModal({
          title: 'Create new provider',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'create',
            colWidth: 6,
          },
          formType: 'providerForm',
          confirmFunction: data => {
            console.log(data)
            data['general_status'] = 'Awaiting confirmation'
            props.createNewOrganizationProvider(data, props.organization);
          },
          onBlurFunction: (value) => {
  
            console.log('onBlurFunction', props.organizationUsers)
            const searchResults = searchBy(
              'email', 
              value, 
              [],
              props.providers,
              props.organizationUsers,
              )
            console.log(searchResults)
            if (searchResults) {
              searchResults['allocated'] = true
              return searchResults
            }
             else {
              props.findEntityByEmail(value)

            }
          },
        });
        break;
      case 'Update organization':
        value.general_status = 'Active'
        props.updateOrganization(value, props.organization.id)
        break;
      case 'Allocate user to in house user':
        
        // const allProvidersUsers = getAllProvidersUsers(orgProviders);
 
        props.onToggleModal({
          title: `Allocate user to ${props.organization.name}`,
          text:
            'Choose user and role to allocate to ' + props.organization.name,
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
      default:
        break;
    }
  };
  const createProject = (data, event) => {
    console.log(data);
    if (event) {
      data.organization_id = props.match.params.id;
      data.due_date = convertToMySqlDateFormat(data.due_date);
      data.date_created = convertToMySqlDateFormat(Date.now());
      props.onCreateNewProject(data);
    }
  };
  const createBridge = data => {
    data.organization_id = props.match.params.id;
    data.project_id = null;
    props.onCreateNewBridge(data);
  };

  const linkToBridgePage = id => {
    props.history.push(props.history.location.pathname + '/bridges/' + id);
  };

  const toggleModal = modalType => {
    switch (modalType) {
      case 'createProject':
        props.onToggleModal({
          title: 'Create new project',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'projectForm',
          data: {
            editMode: 'Create',
          },
          confirmFunction: (data, event) => createProject(data, event),
        });
        break;
      case 'createBridge':
        props.onToggleModal({
          title: 'Create new bridge',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'bridgeForm',
          data: {
            editMode: 'Create',
          },
          confirmFunction: (data, event) => createBridge(data, event),
        });
        break;
    }
  };

  const changeTaskPercentage = (task, value) => {
    console.log('changeTaskPercentage', value);
    if (value) {
      task.completed_percentage = parseInt(value);
      task.due_date = convertToMySqlDateFormat(task.due_date);
      task.last_update = convertToMySqlDateFormat(new Date());
      // console.log(task.due_date)
      // console.log(convertToMySqlDateFormat(task.due_date))
      // updateTask.due_date = convertToMySqlDateFormat(updateTask.due_date)
      // updateTask.last_update = convertToMySqlDateFormat(new Date)

      // console.log(task);
      props.onUpdateTask(task);
    }
  };
  const changeTaskDate = (task, value) => {
    console.log('changeTaskDate', value);
    if (value) {
      task.due_date = convertToMySqlDateFormat(value);
      task.last_update = convertToMySqlDateFormat(new Date());

      console.log(task);
      props.onUpdateTask(task);
    }
  };

  const showProjectById = id => {
    // console.log(id)
    const project = props.projects.filter(project => project.id == id)[0];
    setSelectedProject(project);

    setShowProject(true);
  };
  console.log(props.currentUser)
  if (!props.currentUser) 
    return <div>NO CURRENT USER</div> 
  else
  return (
    <div className="position-relative">
      <SideMenu
        menuType="organizationMenu"
        onMenuClick={name => handleMenuClick(name)}
        onSubMenuClick={name => handleSubMenuClick(name)}
        company={props.organization}
        currentUser={props.currentUser}
        currentUserRole={props.currentUserRole}
        onFinalItemClick={(menuItem, menuType) => {
        }}
      />
      <div className="classic-tabs">
        {!props.loading ? (
          <MDBTabContent
            className="pageContent"
            activeItem={activeItemClassicTabs3}
          >
            {props.currentUser && props.currentUser.userInfo.general_status !== 'Active' ?
            <div className="ml-5">
              <h3 className="ml-5">
                Please activate your user and organization accounts  
              </h3>
              <p className="ml-5">
                fill in your personal info and organization info in the main menu
              </p>
            </div>
            :
            // props.organization && props.organization.general_status !== 'Active' ?
            // <div className="ml-5">
            //   <h3 className="ml-5">
            //     Please activate your organization account 
            //   </h3>
            //   <p className="ml-5">
            //    fill in your organization info and organization info in the main menu
            //   </p>
            // </div>
            // :
            <>
            {/* INFO */}
            {activeItemClassicTabs3 == 'Info' && (
              <MDBTabPane tabId={'Info'}>
                <Basic
                  item={props.organization}
                  updateItem={data => handleAction('Update organization', data) }
                  dataType="updateOrganizationForm"
                />
              </MDBTabPane>
            )}
            {/* BRIDGES */}
            {activeItemClassicTabs3 == 'Bridges' && (
              <MDBTabPane tabId="Bridges">
                {selectedbridge ? (
                  <>
                    <BridgePage
                      bridgeId={selectedbridge}
                      orgId={props.match.params.id}
                    />
                    <IconButtonToolTip
                      className="leftTopCorner text-white mt-2"
                      size="lg"
                      iconName="chevron-left"
                      toolTipType="info"
                      toolTipPosition="right"
                      // toolTipEffect="float"
                      toolTipText="Back to bridges"
                      onClickFunction={() => setSelectedbridge(null)}
                    />
                  </>
                ) : (
                  <>
                    <div className="text-center mt-3 mb-2 d-flex justify-content-between">
                      <h4>
                        {hasBridges ? (
                          <strong>
                            {props.organization.name} bridges (
                            {props.bridges.length})
                          </strong>
                        ) : (
                          <strong>
                            You dont have any bridges. please create a bridge
                          </strong>
                        )}
                      </h4>
                      {/* <MDBAnimation type="pulse" infinite>
                  <MDBBtn
                    color='info'
                    rounded
                    className='ml-3'
                    onClick={() => toggleModal('createBridge')}
                  >
                    Create new bridge <MDBIcon icon='image' className='ml-1' />
                  </MDBBtn>
                </MDBAnimation> */}
                    </div>
                    <Projects
                      items={props.bridges}
                      rootLink={props.match.url}
                      onProjectClick={bridgeId => setSelectedbridge(bridgeId)}
                    />
                  </>
                )}
              </MDBTabPane>
            )}
            {/* PROJECTS */}
            <MDBTabPane tabId="3">
              {showProject ? (
                <>
                  <IconButtonToolTip
                    className="leftTopCorner m-2"
                    size="lg"
                    iconName="chevron-left"
                    toolTipType="info"
                    toolTipPosition="right"
                    toolTipEffect="float"
                    toolTipText="Show all projects"
                    onClickFunction={() => setShowProject(false)}
                  />
                  <OrganizationProject
                    processName="Organization project"
                    project={selectedProject}
                    projectProcesses={props.projectsProcesses.filter(
                      process => process.project_id === selectedProject.id,
                    )}
                    projectTasks={props.tasks.filter(
                      task => task.project_id === selectedProject.id,
                    )}
                  />
                </>
              ) : (
                <div>
                  <div className="text-center mt-3 mb-5 d-flex justify-content-between">
                    <h4>
                      {hasProcessesTemplates ? (
                        <strong>
                          {props.organization.name} projects (
                          {props.projects.length})
                        </strong>
                      ) : (
                        <strong>
                          You dont have any processes. please create a process
                          in processes tab
                        </strong>
                      )}
                    </h4>
                    {/* <MDBAnimation type="pulse" infinite> */}
                    <MDBBtn
                      color="info"
                      rounded
                      className="ml-3"
                      onClick={() => toggleModal('createProject')}
                      disabled={!hasProcessesTemplates}
                    >
                      Create new project{' '}
                      <MDBIcon icon="image" className="ml-1" />
                    </MDBBtn>

                    {/* </MDBAnimation> */}
                  </div>
                  <TableFilters
                    dataType={'projectsTable'}
                    data={props.projects}
                    // checkBoxFunction={(item) => this.addRemoveItem(item, task.dataType)}
                    // isChecked={(item) => this.isItemInArray(item, task.dataType)}
                    // providers={this.props.providers}
                    tableName={'Projects'}
                    onRowClick={id => showProjectById(id)}
                  />
                </div>
              )}
            </MDBTabPane>
            {/* PROCESSES */}
            <MDBTabPane tabId="4">
              {hasProcessesTemplates && hasProcesses && (
                <MDBSwitch
                  checked={!showOrganizationProcesses}
                  onChange={() =>
                    setsShowOrganizationProcesses(!showOrganizationProcesses)
                  }
                  labelLeft=""
                  labelRight={`Show ${
                    showOrganizationProcesses
                      ? 'processes templates'
                      : 'all processes'
                  }`}
                />
              )}
              {showOrganizationProcesses ? (
                <AccordionTable
                  data={props.projectsProcesses}
                  rows={props.tasks}
                  dataType="processes"
                  bridges={props.bridges}
                  changePercentage={(task, value) =>
                    changeTaskPercentage(task, value)
                  }
                  changeDate={(task, value) => changeTaskDate(task, value)}
                />
              ) : (
                <Processes organization={props.organization} />
              )}
            </MDBTabPane>
            {/* PROVIDERS */}
            <MDBTabPane tabId="5">
              <TableFilters
                dataType={'providersTable'}
                data={props.providers}
                // checkBoxFunction={(item) => this.addRemoveItem(item, task.dataType)}
                // isChecked={(item) => this.isItemInArray(item, task.dataType)}
                // providers={this.props.providers}
                tableName={'Providers'}
                onRowClick={id => console.log(id)}
              />
            </MDBTabPane>
            {/* MESSAGES */}
            <MDBTabPane tabId="6">
              <TableFilters
                dataType={'messagesTable'}
                data={props.messages}
                // checkBoxFunction={(item) => this.addRemoveItem(item, task.dataType)}
                // isChecked={(item) => this.isItemInArray(item, task.dataType)}
                // providers={this.props.providers}
                tableName={'Messages'}
                onRowClick={id => console.log(id)}
              />
            </MDBTabPane>
            {/* CALENGER */}
            <MDBTabPane tabId="7">
              <Calender events={props.tasks} />
            </MDBTabPane>
            {/* REPORTS */}
            <MDBTabPane tabId="Management">
              <ManagementSection
                handleAction={(actionName, value) => handleAction(actionName, value)}
                company={props.organization}
                users={props.organizationUsers}
                roles={props.organizationRoles}
                providers={props.providers}
                providersRoles={props.providersRoles}
                type="organization"
              />
            </MDBTabPane>
            </>
            }
          </MDBTabContent>
        ) : (
          <strong>Getting {props.organization.name} data</strong>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  projects: selectors.makeSelectOrganizationProjects(),
  organization: selectors.makeSelectOrganization(),
  organizationUsers: selectors.makeSelectOrganizationUsers(),
  organizationRoles: selectors.makeSelectOrganizationRoles(),
  providersRoles: selectors.makeSelectProvidersRoles(),
  bridges: selectors.makeSelectOrganizationBridges(),
  processesTemplates: selectors.makeSelectOrganizationProcessesTemplates(),
  processes: selectors.makeSelectOrganizationProcesses(),
  projectsProcesses: selectors.makeSelectOrganizationProjectsProcesses(),
  processesTasks: selectors.makeSelectOrganizationProcessesTasks(),
  providers: selectors.makeSelectOrganizationProviders(),
  messages: selectors.makeSelectOrganizationMessages(),
  tasks: selectors.makeSelectOrganizationTasks(),
  loading: makeSelectLoading(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
});

const mapDispatchToProps = dispatch => {
  return {
    addProvider: (data) => dispatch(addProvider(data)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewProject: data => dispatch(createNewProject(data)),
    onCreateNewBridge: data => dispatch(createNewBridge(data)),
    getOrganizationbyId: id => dispatch(getOrganizationbyId(id)),
    updateOrganization: (data, id) => dispatch(updateOrg(data, id)),
    createNewRole: (data) => dispatch(createNewRole(data)),
    onUpdateTask: task => dispatch(updateTask(task)),
    createNewOrganizationUser: (newUser, organization) => dispatch(registerNewOrgUser(newUser, organization)),
    createNewOrganizationProvider: (provider, organization) => dispatch(addProvider(provider, organization)),
    onLogout: () => dispatch(logout()),
    findEntityByEmail: email => dispatch(findEntityByEmail(email)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationPage);
