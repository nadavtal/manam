import React, {useState, memo, useEffect} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectUsers, makeSelectCurrentUser,
  makeSelectOrganizations, makeSelectProviders, makeSelectProjects,  makeSelectRoles,
  makeSelectRoleTypes, makeSelectprocessTemplatesTasks,makeSelectProcesses, makeSelectTasks,
  makeSelectNewOrg
  } from '../App/selectors';

import TableFilters from '../TableFilters/TableFilters';

import Processes from '../Processes/Processes';
import Calender from '../Calender/Calender';
import AccordionTable from '../AccordionTable/AccordionTable';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip'
import { convertToMySqlDateFormat } from '../../utils/dateTimeUtils';
import { updateTask } from '../AppData/actions'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../Forms/Form';
import * as actions from './actions';
import Projects from '../Projects/Projects';
import MegaMenu from '../../components/MegaMenu/MegaMenu';
import SideMenu from '../../components/SideMenu/SideMenu';
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
import ToolBar from '../../components/ToolBar/ToolBar';
import Extended from '../UserPage/Extended/Extended';
import Basic from '../UserPage/Basic/Basic';
import UsersPage from '../Users/index';
import RolesDropDown from '../../components/RolesDropDown/RolesDropDown'
import { toggleModal, logout } from '../App/actions';
import { getProviderbyId } from '../AppData/actions';
import { createNewProject } from '../Projects/actions';
import reducer from './reducer';
import saga from './saga';
// import { selectOrganization } from "../../Organizations/Organization/selectors";
const key = "admin";

const AdminModule = (props) => {
  
  
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState('Bridges');
  const [showProviderProcesses, setsShowProviderProcesses] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem('orgId') ? localStorage.getItem('orgId') : null);
  const [selectedbridge, setSelectedbridge] = useState();

  useEffect(() => {
    props.getAllData()
  }, []);
  useEffect(() => {
    console.log(props)
    if (props.newOrg) {
      if(props.newOrg.users && props.newOrg.users.length) {
        
        props.onToggleModal({
          title: 'A user has been found with this email adrress',
          text: `Do you want to allocate ${props.newOrg.users[0].first_name} ${props.newOrg.users[0].last_name} 
            to ${props.newOrg.org.name} admin?`,
          confirmButton: 'Allocate',
          cancelButton: 'Cancel',
          
          confirmFunction: () => props.allocateUserToOrg(props.newOrg.users[0], props.newOrg.org, 2, "Organization admin")
        })
      } else {
          props.onToggleModal({
            title: 'No user has been found with this email adrress',
            text: `Create a new user for ${props.newOrg.org.name} admin?`,
            
            formType: 'registerUserForm',
            data: {
              editMode: 'create',
              colWidth: 12
            },
            cancelButton: 'Cancel',
            
            confirmFunction: (data) => console.log(data)
          })
      }

    }
  }, [props.newOrg]);


  const toggleClassicTabs3 = (tab) => {
    console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
    setActiveItemClassicTabs3(tab)
    localStorage.setItem('activeItemClassicTabs3', tab)
    }
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
    console.log(name)
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
      case 'Create new organization':
        props.onToggleModal({
          title: 'Create new organization',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'create'
          },
          formType:'organizationForm',
          confirmFunction: (data) => {
            props.addOrganization(data)
          }
        });
        break;
    
      default:
        break;
    }
  }
  return (

    <div className="position-relative">

        <SideMenu
          menuType="adminMenu"
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
             
        <MDBTabContent className="pageContent" activeItem={activeItemClassicTabs3}>
          <MDBTabPane tabId={props.currentUser.userInfo.first_name}>
            <Basic
              item={props.provider}
              updateItem={(data) => props.updateProvider(data, props.provider.id)}
              dataType="provider"
              />
          </MDBTabPane>
            <MDBTabPane tabId="Bridges">
              
            </MDBTabPane>
            <MDBTabPane tabId="Messages">
         
            </MDBTabPane>
            <MDBTabPane tabId="Schedule">
              <Calender />

            </MDBTabPane>
         
            <MDBTabPane tabId="Manage roles">
              {/* <MDBBtn
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
                /> */}
            </MDBTabPane>
            <MDBTabPane tabId="Manage projects">
              
            </MDBTabPane>
            <MDBTabPane tabId="Manage processes">

            {/* <MDBSwitch
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
                />} */}

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
  organizations: makeSelectOrganizations(),
  providers: makeSelectProviders(),
  projects: makeSelectProjects(),
  roleTypes: makeSelectRoleTypes(),
  roles: makeSelectRoles(),
  processTemplatesTasks: makeSelectprocessTemplatesTasks(),
  processes: makeSelectProcesses(),
  tasks: makeSelectTasks(),
  newOrg: makeSelectNewOrg(),

});

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {
//     currentUser: state.global.currentUser,
//     currentUser: state.global.currentUser,
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onCreateNewProject: data => {dispatch(createNewProject(data))},
    getProvider: (id) => dispatch(getProviderbyId(id)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    updateProvider: (data, id) => dispatch(actions.updateProvider(data,id)),
    onUpdateTask: (task) => dispatch(updateTask(task)),
    addOrganization: (data) => dispatch(actions.addOrganization(data)),
    onLogout: () => dispatch(logout()),
    getAllData: () => dispatch(actions.getAllData()),
    allocateUserToOrg: (user, org, roletypeId, roleName) => dispatch(actions.allocateUserToOrg(user, org, roletypeId, roleName)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminModule);



