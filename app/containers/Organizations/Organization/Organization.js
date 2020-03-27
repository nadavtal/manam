import React, {useState, memo, useEffect} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateTask } from '../../AppData/actions'
import { createStructuredSelector } from 'reselect';
import { makeSelectUsers, makeSelectLoading, makeSelectCurrentUser} from '../../App/selectors';
import { makeSelectOrganization, makeSelectOrganizationProjects, makeSelectOrganizationBridges, makeSelectOrganizationProcessesTemplates,
  makeSelectOrganizationProviders, makeSelectOrganizationProcessesTasks, makeSelectOrganizationMessages, makeSelectOrganizationProcesses,
  makeSelectOrganizationProjectsProcesses, makeSelectOrganizationTasks } from './selectors';
import AccordionTable from '../../AccordionTable/AccordionTable';
import RolesDropDown from '../../../components/RolesDropDown/RolesDropDown'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../../Forms/Form';
import OrganizationProject from './OrganizationProject';
import BridgePage from 'containers/BridgePage/Loadable'
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip'
import Projects from '../../Projects/Projects';
import TableFilters from '../../TableFilters/TableFilters';
import Calender from '../../Calender/Calender';
import Admin from '../../Admin/Admin';
import { convertToMySqlDateFormat } from '../../../utils/dateTimeUtils'
import {  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBtn,
  MDBSwitch,
  MDBAnimation ,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  } from "mdbreact";
import './organization.css'
import Processes from '../../Processes/Processes';
import * as actions from "./actions";
import ToolBar from '../../../components/ToolBar/ToolBar';
import Extended from '../../UserPage/Extended/Extended';
import Basic from '../../UserPage/Basic/Basic';
import { toggleModal } from '../../App/actions';
import { getOrganizationbyId } from '../../AppData/actions';
import {createNewBridge} from '../../BridgePage/actions'
import { createNewProject } from '../../Projects/actions';
import reducer from './reducer';

import saga from './saga';
const key = "organization"

const OrganizationPage = (props) => {
  useInjectReducer({key, reducer});;
  useInjectSaga({key, saga});

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState(localStorage.getItem('activeItemClassicTabs3') ? localStorage.getItem('activeItemClassicTabs3') : '1');
  const [showProject, setShowProject] = useState(false);
  const [showOrganizationProcesses, setsShowOrganizationProcesses] = useState();
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedbridge, setSelectedbridge] = useState();
  let hasBridges = props.bridges.length ? true : false;
  let hasProcessesTemplates = props.processesTemplates.length ? true : false;
  let hasProcesses = props.projectsProcesses.length ? true : false;
  let hasProjects = props.projects.length ? true : false;
  let orgId

  useEffect(() => {
    orgId = props.match.params.id;
    props.getOrganizationbyId(orgId);

  }, []);

  useEffect(() => {
    console.log(props)
    hasBridges = props.bridges.length ? true : false;
    hasProcesses = props.projectsProcesses.length ? true : false;
    hasProcessesTemplates = props.processesTemplates.length ? true : false;
    hasProjects = props.projects.length ? true : false;
    console.log(hasProcesses)
    if (!hasBridges) toggleClassicTabs3('2');
    if (!hasProcesses) {
      console.log('alksdjlaskjdlakjsdlkasljd')
      setsShowOrganizationProcesses(false);
    }
  }, [props.organization]);

  const toggleClassicTabs3 = (tab) => {
    // console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
    setActiveItemClassicTabs3(tab)
    }
    localStorage.setItem('activeItemClassicTabs3', tab)
  }


  const createProject = (data, event) => {
    console.log(data)
    if (event) {
      data.organization_id = props.match.params.id;
      data.due_date = convertToMySqlDateFormat(data.due_date);
      data.date_created = convertToMySqlDateFormat(Date.now());
      props.onCreateNewProject(data)

    }
  }
  const createBridge = (data) => {
    data.organization_id = props.match.params.id;
    data.project_id = null;
    props.onCreateNewBridge(data)
  }

  const linkToBridgePage = (id) => {

    props.history.push(props.history.location.pathname + "/bridges/"+id);
  }

  const toggleModal = (modalType) => {
    switch (modalType) {
      case 'createProject':
        props.onToggleModal({
          title: 'Create new project',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'projectForm',
          data: {
            editMode: 'Create'
          },
          confirmFunction: (data, event) => createProject(data, event)
        });
        break
      case 'createBridge':
        props.onToggleModal({
          title: 'Create new bridge',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'bridgeForm',
          data: {
            editMode: 'Create'
          },
          confirmFunction: (data, event) => createBridge(data, event)
        });
        break
    }

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

  const showProjectById = (id) => {
    // console.log(id)
    const project = props.projects.filter(project => project.id == id)[0]
    setSelectedProject(project);

    setShowProject(true)
  }

  return (

    <div className="userPage">
      <div className="classic-tabs">
      
        <MDBNav classicTabs color="orange" className="">
          {/* <MDBNavItem active={activeItemClassicTabs3==="1"}>
            <MDBNavLink link to="#" active={activeItemClassicTabs3==="1"} onClick={() => toggleClassicTabs3("1")}>
              <MDBIcon icon="info" size="1x" />
              <br />
              Info
            </MDBNavLink>
          </MDBNavItem> */}
          <MDBNavItem>
            <div className="logo-wrapper sn-ad-avatar-wrapper">
              <a href="#!">
                <img alt="" src={require('../../../images/gilad.jpg')} className="rounded-circle" />
                {/* <span>Gilad</span> */}
              </a>
            </div>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="2"} onClick={() => toggleClassicTabs3("2")}>
              <MDBIcon icon="road" size="1x" />
              <br />
              Bridges
            </MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="3"} onClick={() => toggleClassicTabs3("3")}
              disabled={!hasBridges}>
              <MDBIcon icon="project-diagram" size="1x" />
              <br />
              Projects
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="4"} onClick={() => toggleClassicTabs3("4")}
              disabled={!hasBridges}>
              <MDBIcon icon="chart-line" size="1x" />
              <br />
              Processes
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="5"} onClick={() => toggleClassicTabs3("5")}
              disabled={!hasBridges}>
              <MDBIcon icon="users" size="1x" />
              <br />
              Providers
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link  to="#" active={activeItemClassicTabs3==="8"} onClick={() => toggleClassicTabs3("8")}
              disabled={!hasBridges}>
              <MDBIcon icon="chart-pie" size="1x" />
              <br />
              Reports
            </MDBNavLink>
          </MDBNavItem>

          <div className="absolute-right d-flex align-items-center" >
            <MDBNavItem className="" >
              <RolesDropDown userData={props.currentUser}/>
              {/* <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">

                    Work space
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="nav-drop-down tabs-orange">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown> */}

            </MDBNavItem>
            <MDBNavItem >
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="6"} onClick={() => toggleClassicTabs3("6")}
                disabled={!hasBridges}>

                <span className='counter mt-2' >6</span>
                <MDBIcon icon="envelope" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="" >
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="7"} onClick={() => toggleClassicTabs3("7")}
                disabled={!hasBridges}>

                <span className='counter mt-2' >22</span>
                <MDBIcon icon="calendar-alt" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="" >
              <MDBNavLink link to="#" active={activeItemClassicTabs3==="7"} onClick={() => toggleClassicTabs3("7")}
                >

                <MDBIcon icon="cog" size="2x" className='mt-2' />

              </MDBNavLink>
            </MDBNavItem>


            {/* <img alt="" src={require('../../../images/ManamAppsLogo.jpg')} className="navbarLogo" /> */}
          </div>

        </MDBNav>

        {!props.loading ? <MDBTabContent className="card" activeItem={activeItemClassicTabs3}>
          {/* INFO */}
          <MDBTabPane tabId="1">

              <Basic
                item={props.organization}
                updateItem={(data) => props.updateOrganization(data, props.organization.id)}
                dataType="organization"
                ></Basic>
              </MDBTabPane>
          {/* BRIDGES */}
          <MDBTabPane tabId="2">
            
            {selectedbridge ?
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
                :
              <>
              <div className='text-center mt-3 mb-2 d-flex justify-content-between'>
                <h4>
                  {hasBridges ?
                    <strong>{props.organization.name} bridges ({props.bridges.length})</strong>
                    :
                    <strong>You dont have any bridges. please create a bridge</strong>
                  }
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
                onProjectClick={bridgeId => setSelectedbridge(bridgeId)} />
                </>
            }



          </MDBTabPane>
          {/* PROJECTS */}
          <MDBTabPane tabId="3">

          {showProject ?
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
                projectProcesses={props.projectsProcesses.filter(process => process.project_id === selectedProject.id)}
                projectTasks={props.tasks.filter(task => task.project_id === selectedProject.id)}
              />
            </>
            :

            <div>

              <div className='text-center mt-3 mb-5 d-flex justify-content-between'>
                <h4>
                  {hasProcessesTemplates ?
                    <strong>{props.organization.name} projects ({props.projects.length})</strong>
                    :
                    <strong>You dont have any processes. please create a process in processes tab</strong>
                  }
                </h4>
                {/* <MDBAnimation type="pulse" infinite> */}
                  <MDBBtn
                    color='info'
                    rounded
                    className='ml-3'
                    onClick={() => toggleModal('createProject')}
                    disabled={!hasProcessesTemplates}
                  >
                    Create new project <MDBIcon icon='image' className='ml-1' />
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
            }



          </MDBTabPane>
          {/* PROCESSES */}
          <MDBTabPane tabId="4">

            {(hasProcessesTemplates && hasProcesses) && <MDBSwitch
              checked={!showOrganizationProcesses}
              onChange={() => setsShowOrganizationProcesses(!showOrganizationProcesses)}
              labelLeft=""
              labelRight={`Show ${showOrganizationProcesses ? 'processes templates' : 'all processes'}`}
              />}
            {showOrganizationProcesses ?
             <AccordionTable
                data={props.projectsProcesses}
                rows={props.tasks}
                dataType="processes"
                bridges={props.bridges}
                changePercentage={(task, value) => changeTaskPercentage(task, value)}
                changeDate={(task, value) => changeTaskDate(task, value)}
                />
             :
            <Processes
              organization={props.organization}
              />}


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
              onRowClick={(id) => console.log(id)}
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
              onRowClick={(id) => console.log(id)}
            />

              </MDBTabPane>
          {/* CALENGER */}
          <MDBTabPane tabId="7">
            <Calender events={props.tasks}/>

          </MDBTabPane>
          {/* REPORTS */}
          <MDBTabPane tabId="8">
              <Admin />

          </MDBTabPane>

        </MDBTabContent>
        : <strong>Getting {props.organization.name} data</strong>}
      </div>



    </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  users: makeSelectUsers(),
  projects: makeSelectOrganizationProjects(),
  organization: makeSelectOrganization(),
  bridges: makeSelectOrganizationBridges(),
  processesTemplates: makeSelectOrganizationProcessesTemplates(),
  processes: makeSelectOrganizationProcesses(),
  projectsProcesses: makeSelectOrganizationProjectsProcesses(),
  processesTasks: makeSelectOrganizationProcessesTasks(),
  providers: makeSelectOrganizationProviders(),
  messages: makeSelectOrganizationMessages(),
  tasks: makeSelectOrganizationTasks(),
  loading: makeSelectLoading()


});

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => dispatch(toggleModal(modalData)),
    onCreateNewProject: (data)=> dispatch(createNewProject(data)),
    onCreateNewBridge: data => dispatch(createNewBridge(data)),
    getOrganizationbyId: id => dispatch(getOrganizationbyId(id)),
    updateOrganization: (data, id) => dispatch(actions.updateOrg(data, id)),
    onUpdateTask: (task) => dispatch(updateTask(task)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationPage);


