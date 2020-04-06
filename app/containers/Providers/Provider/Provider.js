import React, {useState, memo, useEffect} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectUsers, makeSelectCurrentUser
  } from '../../App/selectors';
import { makeSelectProvider, makeSelectProviderProjects, makeSelectProviderBridges,
  makeSelectProviderProcessesTemplates, makeSelectProviderOrganizations, makeSelectProviderProcessesTasks,
  makeSelectProviderMessages, makeSelectProviderProcesses, makeSelectProviderProjectsProcesses,
  makeSelectProviderTasks, makeSelectProviderUsers, getProviderBridges } from './selectors'
import TableFilters from '../../TableFilters/TableFilters';
import BridgePage from 'containers/BridgePage/Loadable'
import Processes from '../../Processes/Processes';
import Calender from '../../Calender/Calender';
import AccordionTable from '../../AccordionTable/AccordionTable';
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip'
import { convertToMySqlDateFormat } from '../../../utils/dateTimeUtils';
import { updateTask } from '../../AppData/actions'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../../Forms/Form';
import * as actions from './actions';
import Projects from '../../Projects/Projects';
import MegaMenu from '../../../components/MegaMenu/MegaMenu';
import SideMenu from '../../../components/SideMenu/SideMenu';
import {  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBtn,
  MDBSwitch,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  } from "mdbreact";
import ToolBar from '../../../components/ToolBar/ToolBar';
import Extended from '../../UserPage/Extended/Extended';
import Basic from '../../UserPage/Basic/Basic';
import UsersPage from '../../Users/index';
import RolesDropDown from '../../../components/RolesDropDown/RolesDropDown'
import { toggleModal, logout } from '../../App/actions';
import { getProviderbyId } from '../../AppData/actions';
import { createNewProject } from '../../Projects/actions';
import reducer from './reducer';
import saga from './saga';
// import { selectOrganization } from "../../Organizations/Organization/selectors";
const key = "provider";

const ProviderPage = (props) => {
  
  
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState('Bridges');
  const [showProviderProcesses, setsShowProviderProcesses] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem('orgId') ? localStorage.getItem('orgId') : null);
  const [selectedbridge, setSelectedbridge] = useState();

  useEffect(() => {
    const providerId = props.match.params.id;
    props.getProvider(providerId)
    console.log('[ProviderPage] all', props.location.state.org_name)
    setSelectedOrganization(props.location.state.org_id)
  }, [props.match.params.id]);

  useEffect(() => {

    console.log('[ProviderPage] props', props)
  }, [props]);

  const toggleClassicTabs3 = (tab) => {
    console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
    setActiveItemClassicTabs3(tab)
    localStorage.setItem('activeItemClassicTabs3', tab)
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
          users: props.users,
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

  const handleMenuClick = (name) => {
    toggleClassicTabs3(name)
    switch (name) {
      case 'Switch work space':
          props.history.push('/')
        break;
        case 'Sign out':
          props.onToggleModal({
            title: 'Are you sure you want to log out?',
            text: '',
            confirmButton: 'Log out',
            cancelButton: 'Cancel',
            
            confirmFunction: (data) => {
              props.onLogout()
              props.history.push('/')
            }
          });
          
        break;
    
      default:
        break;
    }
  }
  const handleSubMenuClick = (name) => {
    switch (name) {
      case 'Switch work space':
          props.history.push('/')
        break;
        case 'Sign out':
          props.onToggleModal({
            title: 'Are you sure you want to log out?',
            text: '',
            confirmButton: 'Log out',
            cancelButton: 'Cancel',
            
            confirmFunction: (data) => {
              props.onLogout()
              props.history.push('/')
            }
          });
          
        break;
    
      default:
        break;
    }
  }
  return (

    <div className="position-relative">
        {/* <MegaMenu
          menuType="providerMenu"
          onMenuClick={(name) => toggleClassicTabs3(name)}
          onSubMenuClick={(name) => handleSubMenuClick(name)}
          linkToProviderPage={(provider_id) => linkToProviderPage(provider_id)}
          // changeWorkSpace={(orgId) => changeWorkSpace(orgId)}
          currentUser={props.currentUser}
          onFinalItemClick={(menuItem, menuType) => {
            if (menuItem.org_id) changeWorkSpace(menuItem.org_id)
            else if (menuItem.provider_id) linkToProviderPage(menuItem.provider_id)
          }}
 
          >
        
        </MegaMenu> */}
        <SideMenu
          menuType="providerMenu"
          onMenuClick={(name) => handleMenuClick(name)}
          onSubMenuClick={(name) => handleSubMenuClick(name)}
          linkToProviderPage={(provider_id) => linkToProviderPage(provider_id)}
          // changeWorkSpace={(orgId) => changeWorkSpace(orgId)}
          currentUser={props.currentUser}
          onFinalItemClick={(menuItem, menuType) => {
            if (menuItem.org_id) changeWorkSpace(menuItem.org_id)
            else if (menuItem.provider_id) linkToProviderPage(menuItem.provider_id)
          }}
          // onProviderClick={(provider_id) => linkToProviderPage(provider_id)}
          // onOrganizationClick={(orgId) => changeWorkSpace(orgId)}
          />
        
        
      <div className="classic-tabs">
        {console.log(activeItemClassicTabs3)}
        {!props.loading ? <MDBTabContent className="pageContent" activeItem={activeItemClassicTabs3}>
          <MDBTabPane tabId={props.currentUser.userInfo.first_name}>
            <Basic
              item={props.provider}
              updateItem={(data) => props.updateProvider(data, props.provider.id)}
              dataType="provider"
              />
          </MDBTabPane>
            <MDBTabPane tabId="Bridges">
              {selectedbridge ?
              <>
              <BridgePage
                bridgeId={selectedbridge}
                orgId={selectedOrganization}
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
                  onClickFunction={() => setSelectedbridge(null)}
                  />
              </>
              :
              props.bridges && props.bridges.length ?
              <Projects
                items={props.bridges.filter(bridge => bridge.organization_id == selectedOrganization)}
                rootLink={props.match.url}
                // onProjectClick={(orgId, bridgeId) => linkToBridgePage(orgId, bridgeId)}
                onProjectClick={bridgeId => setSelectedbridge(bridgeId)}
                />
              : <div>No bridges yet...</div>
              }
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
         
            <MDBTabPane tabId="Manage roles">
              <MDBBtn
                color='info'
                rounded
                className='ml-3 leftTopCorner mt-4'
                onClick={() => toggleModal('allocateUsers')}
              >
                Add user <MDBIcon icon='user' className='ml-1' />
              </MDBBtn>
              <UsersPage
                users={props.provider_users}
                provider={props.provider}
                />
            </MDBTabPane>
            <MDBTabPane tabId="Manage projects">
              <div className='text-center mt-3 mb-5 d-flex justify-content-between'>
                <h4>
                  <strong>{props.provider.name} projects</strong>
                </h4>
                <MDBBtn
                  color='info'
                  rounded
                  className='ml-3'
                  onClick={() => toggleModal('createProject')}
                >
                  Submit new project <MDBIcon icon='image' className='ml-1' />
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
                onChange={() => setsShowProviderProcesses(!showProviderProcesses)}
                labelLeft=""
                labelRight={`Show ${showProviderProcesses ? 'process templates' : 'all processes'}`}
                />
              {showProviderProcesses?
              <AccordionTable
                  data={props.projectsProcesses.filter(process => process.organization_id == selectedOrganization)}
                  rows={props.tasks}
                  dataType="processes"
                  // bridges={props.bridges}
                  changePercentage={(task, value) => changeTaskPercentage(task, value)}
                  changeDate={(task, value) => changeTaskDate(task, value)}
                  />
              :
              <Processes
                provider={props.provider}
                />}

            </MDBTabPane>
            <MDBTabPane tabId="Organizations">
              <br />
              <TableFilters
                dataType={'organizationsTable'}
                data={props.organizations}
                checkBoxFunction={(item) => console.log(item)}
                isChecked={(item) => {return false}}
                // providers={this.props.providers}
                tableName={'Organizations'}
                onRowClick={(id) => linkToOrgPage(id)}
              />

                </MDBTabPane>
          
            <MDBTabPane tabId="Settings">
              <br />
              <TableFilters
                dataType={'organizationsTable'}
                data={props.organizations}
                checkBoxFunction={(item) => console.log(item)}
                isChecked={(item) => {return false}}
                // providers={this.props.providers}
                tableName={'Organizations'}
                onRowClick={(id) => linkToOrgPage(id)}
              />

                </MDBTabPane>
          
          </MDBTabContent>
           : <strong>Getting {props.provider.name} data</strong>}
      </div>
      <br></br>


    </div>
    );
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
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
  provider_users: makeSelectProviderUsers(),


});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onCreateNewProject: data => {dispatch(createNewProject(data))},
    getProvider: (id) => dispatch(getProviderbyId(id)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    updateProvider: (data, id) => dispatch(actions.updateProvider(data,id)),
    onUpdateTask: (task) => dispatch(updateTask(task)),
    onLogout: () => dispatch(logout()),
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

 {/* <MDBNav classicTabs color="orange" className="">
          <MDBNavItem >
            <div className="logo-wrapper sn-ad-avatar-wrapper d-flex">
              <a href="#!">
                <img alt="" src={require('../../../images/gilad.jpg')} className="rounded-circle" />
                <span>Gilad</span>
              </a>
              {selectedOrganization}
            </div>

          </MDBNavItem>
          <MDBNavItem active={activeItemClassicTabs3==="1"}>
            <MDBNavLink link to="#" active={activeItemClassicTabs3==="1"} onClick={() => toggleClassicTabs3("1")}>
              <MDBIcon icon="info" size="1x" />
              <br />
              Bridges
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="2"} onClick={() => toggleClassicTabs3("2")}>
              <MDBIcon icon="users" size="1x" />
              <br />
              Users
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="3"} onClick={() => toggleClassicTabs3("3")}>
              <MDBIcon icon="project-diagram" size="1x" />
              <br />
              Projects
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="4"} onClick={() => toggleClassicTabs3("4")}>
              <MDBIcon icon="users" size="1x" />
              <br />
              Processes
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="5"} onClick={() => toggleClassicTabs3("5")}>
              <MDBIcon icon="users" size="1x" />
              <br />
              Organizations
            </MDBNavLink>
          </MDBNavItem>
          <div className="absolute-right d-flex align-items-center">
            <MDBNavItem className="" >
              <RolesDropDown
                userData={props.currentUser}
                onProviderClick={(provider_id) => linkToProviderPage(provider_id)}
                onOrganizationClick={(orgId) => changeWorkSpace(orgId)}
                />
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">

                    Work space
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="nav-drop-down tabs-orange active"
                  right style={{ top: '20px !important' }}>
                  <MDBDropdownItem header>Organizations</MDBDropdownItem>
                  {props.currentUser && userOrgRoles().map(role => <MDBDropdownItem href="#!" className="text-left"
                    onClick={(e) =>  setSelectedOrganization(role.org_id)}>
                      {role.name}
                      </MDBDropdownItem>)}
                  <MDBDropdownItem header>Providers</MDBDropdownItem>
                  {props.currentUser && userProviderRoles().map(role => <MDBDropdownItem href="#!" className="text-left"
                    onClick={(e) =>  linkToProviderPage(role.provider_id)}>
                      {role.name}
                      </MDBDropdownItem>)}

                </MDBDropdownMenu>
              </MDBDropdown>

            </MDBNavItem>
            <MDBNavItem >

              <MDBNavLink link to="#" active={activeItemClassicTabs3==="6"} onClick={() => toggleClassicTabs3("6")}
                >

                <span className='counter mt-2' >6</span>
                <MDBIcon icon="envelope" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="" >
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="7"} onClick={() => toggleClassicTabs3("7")}
                >

                <span className='counter mt-2' >22</span>
                <MDBIcon icon="calendar-alt" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="" >
            <MDBDropdown>
              <MDBDropdownToggle nav>
                <MDBIcon icon="cog" size="2x" className='mt-2' />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="nav-drop-down tabs-orange active"
                right style={{ top: '10px !important' }}>
                <MDBDropdownItem className="text-left text-white"
                  onClick={() => localStorage.removeItem('currentUser')}>Log out</MDBDropdownItem>

              </MDBDropdownMenu>
            </MDBDropdown>
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="8"} onClick={() => toggleClassicTabs3("8")}
                >

                <MDBIcon icon="cog" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>
          </div>

        </MDBNav> */}



