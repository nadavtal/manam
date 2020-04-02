import React, { useEffect, memo, Component } from 'react';
import Resium from '../Resium/Resium'
import StyledMainView from './MainView/MainView';
import SecondaryView from './SecondaryView/SecondaryView';
import BottomView from './BottomView/BottomView';
import ToolBar from '../../components/ToolBar/ToolBar';
import ButtonsSection from '../../components/ToolBar/ButtonsSection/ButtonsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from '../../components/Toggle';
import './BridgePage.css';
import CustomSlider from '../../components/Slider/Slider'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateResiumMode } from '../Resium/actions'
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectUsers, makeSelectLoading, makeSelectError, getKeyPressed, getModalOpen } 
  from 'containers/App/selectors';
import { toggleModal, keyPressed, toggleAlert } from 'containers/App/actions';
import { getOrgTechnicalInfo } from '../AppData/actions'
import { makeSelectRoles } from '../RolesPage/selectors'
import * as bridgePageSelectors from './selectors'
import * as projectPageSelectors from './selectors'
import * as actions from './actions';
import { createMessage } from '../Messages/actions';
import Notification from '../../components/Toast/Toast'
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import ProjectData from './Project/Project';
import Messages from '../Messages/Messages';
import PhotoSphereViewer from './PhotoSphereViewer/PhotoSphereViewer'
import Process from '../Process/Process'
import DataTable from '../../components/DataTable/DataTable';
import Carousel from '../../components/Carousel/Carousel';
import Form from '../Forms/Form';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select'
import Survey from '../Survey/Survey';
import Gallery from '../../components/Gallery/Gallery';
import { MDBAnimation, MDBBtn, MDBIcon } from 'mdbreact';
// import Stepper from '../Stepper/Stepper';
const key = 'bridgePage';


class BridgePage extends Component {


  showInMainView = (component, mode = null) => {

    switch (component) {
      case 'Messages':
        return <Messages></Messages>;
      case 'ProjectForm':
        // console.log(component, mode)
        return <Form
          formType="projectForm"
          item={this.props.project}
          editMode={mode}
          // createFunction={(formData) => this.props.createNewProject(formData)}
          editFunction={(formData) => this.props.editProject(formData)}
          ></Form>
      case 'BridgeForm':
        // console.log(component, mode)
        return <Form
          formType="bridgeForm"
          item={this.props.bridge}
          editMode={mode}
          createFunction={(formData) => this.prepareNewBridge(formData)}
          editFunction={(formData) => this.prepareEditBridge(formData, this.props.bridge.bid)}
          ></Form>
      case 'ElementForm':

        return <Form
        className="MainViewForm p-1"
        formType="elementForm"
        editMode="save"
        colWidth={6}
        item={this.props.selectedElement}
        nodes={this.props.bridgeNodes}
        spans={this.props.bridgeSpans}
        elementsGroups={this.props.elementsGroups}
        elementsTypes={this.props.elementsTypes}
        createFunction={formData => console.log(formData)}
        editFunction={formData => this.prepareEditElement(formData)}
      />

      case 'Process':
        // console.log(component, mode)
        return <div>
          {/* <Form
          formType="processForm"
          item={this.props.project}
          editMode={mode}
          createFunction={(formData) => this.props.createNewProcess(formData)}
          editFunction={(formData) => this.props.editProcess(formData)}
          /> */}
          <Process
            processName="Initial survey UAV"></Process>
          </div>
      case 'BridgeInspectionForm':
        // console.log(this.props.selectedForm);
        return <Survey
                  bridgeUsers={this.props.bridgeUsers}
                  survey={this.props.selectedForm}
                  editMode={mode}></Survey>
        // return <Form
        //   formType="BridgeInspectionForm"
        //   item={this.props.selectedForm}
        //   editMode={mode}
        //   createFunction={(formData) => this.props.createSurvey(formData)}
        //   editFunction={(formData) => this.props.editSurvey(formData)}></Form>

      case 'Resium':

        if(this.props.bridgeLoaded) {
          // console.log(this.props.type)
          let models;
          if (this.props.type === 'modelPage') {
            models = this.props.models
          } else {
            models = this.props.bridgeModels

          }
          console.log(this.props.selectedModels)
          return <Resium
                  tiles={this.props.bridgeTiles}
                  models={models}
                  save={(model) =>this.save(model)}
                  onModelLoad={(nodes) => this.handleNodesLoaded(nodes)}
                  boundingSphere={this.props.boundingSphere}
                  viewData={this.props.viewData}
                  background={{lon: -123.0744619, lat: 44.0503706, height: 0}}
                  selectedModels={this.props.selectedModels}
                  />
                  

        } else {
          return <div>Loading bridge...</div>
        }
      case 'ProjectData':
        return <ProjectData project={this.props.project}></ProjectData>

      default:
        return <ProjectData project={this.props.project}></ProjectData>
    }

  }

  showInSecondaryView = (component, mode = null) => {
    // console.log(component, mode)
    switch (component) {
      case 'Messages':
        return <Messages></Messages>;
      case 'Sphere':
        return <PhotoSphereViewer
                  url="https://photo-sphere-viewer.js.org/assets/Bryce-Canyon-National-Park-Mark-Doliner.jpg"
                  />;
      case 'ProjectForm':
        return <ProjectForm
                project={this.props.project}
                editMode={mode}
                />;
      case 'MessageForm':
        return <Form
                users={this.props.bridgeUsers}
                projectId={this.props.project.ID}
                dataType={'messageForm'}
                >
                </Form>;
      case 'surveys':
        return <DataTable
                  displayEntries={false}
                  paging={false}
                  data={this.props.bridgeSurveys}
                  onRowClick={(surveyId) => this.showSurveyInMainScreen(surveyId)}
                  dataType="surveyShortTable">

                </DataTable>
      case 'projectData':
        return <>
          <ProjectData
            project={this.props.project}
            bridgeSurveys={this.props.bridgeSurveys}
            bridgeUsers={this.props.bridgeUsers}
            bridgeProcesses={this.props.bridgeProcesses}
            bridgeTasks={this.props.bridgeTasks}
            bridge3dImages={this.props.bridge3dImages}
            // bridgeSpans={this.props.bridgeSpans}
            bridgeNodes={this.props.bridgeNodes}
            structureTypes={this.props.structureTypes}
            bridgeTypes={this.props.bridgeTypes}
            updateResiumMode={(mode) => this.props.updateResiumMode(mode)}
            />
            {/* <IconButtonToolTip
            className="leftTopCorner m-1 text-white mt-3"
            size="lg"
            iconName="chevron-left"
            toolTipType="info"
            toolTipPosition="right"
            toolTipEffect="float"
            toolTipText="Show all bridges"
            onClickFunction={() => console.log('aksjhdkasjhsdk')}
            /> */}
          </>


      case 'modelForm':
        // console.log(component, mode)
        return <Form
          formType="modelForm"
          item={this.props.bridge}
          editMode={mode}
          createFunction={(formData) => this.prepareNewBridgeModel(formData)}
          editFunction={(formData) => this.props.editBridge(formData, this.props.bridge.bid)}
          colWidth={12}
          ></Form>
      case 'ProcessForm':
        // console.log(component, mode)
        return <Form
          formType="processForm"
          item={this.props.project}
          editMode={mode}
          createFunction={(formData) => this.prepareNewProcess(formData)}
          editFunction={(formData) => this.props.editProcess(formData)}
          />
      default:
        return <ProjectData></ProjectData>
    }

  }
  showInBottomView = (component, mode = null) => {
    // console.log(component, mode)
    switch (component) {

      case 'elementForm':

        return <>
          <h6 className="p-1">{this.props.selectedObjectIds[0] ? `Object Id: ${this.props.selectedObjectIds[0]}` : 'No element selected'}</h6>

        </>

      default:
        return <Form
          formType="elementForm"
          editMode="create"
          colWidth={3}
          nodes={this.props.bridgeNodes}
          editFunction={formData => console.log(formData)}
          className="bottomViewForm"
        />
    }

  }

  handleNodesLoaded = (nodes) => {
    // console.log(nodes);
    // console.log(this.props.bridgeElements);
    if (this.props.bridge && this.props.type !== 'modelPage' && !this.props.bridgeElements.length) {

      this.props.createNewBridgeElements(nodes)
    }
    this.props.nodesLoaded(nodes)
  }
  showSurveyInMainScreen = (surveyId) => {
    // const selectedSurvey = this.props.bridgeSurveys.filter(survey => survey.surveyId === surveyId);
    // console.log(selectedSurvey)
    this.props.getSurvey(surveyId)
  }

  openNewProcess = () => {
    this.props.showMainViewComponent('Process')
    this.props.showSecondaryViewComponent('ProcessForm', 'create')
  }

  prepareNewProcess = (formData) => {
    let newProcess = formData;
    console.log(newProcess);
    this.props.onCreateNewProcess(newProcess)
  }
  prepareNewBridge = (formData) => {
    let newBridge = formData;
    newBridge.organization_id = this.props.project.organization_id;
    newBridge.project_id = this.props.project.id;
    console.log(newBridge);
    this.createBridgeSpans(newBridge.spans)
    this.props.createNewBridge(newBridge)
  }
  prepareEditBridge = (formData) => {

    if(formData.spans > this.props.bridge.spans) {

      this.createBridgeSpans(formData.spans-this.props.bridge.spans)
    }
    this.props.editBridge(formData, this.props.bridge.bid)
  }
  prepareEditElement = (formData) => {
    console.log(this.props.selectedElement)
    let updatedElement = formData
    updatedElement.bid = this.props.bridge.bid
    updatedElement.object_id = this.props.selectedElement.object_id
    this.props.editElement(updatedElement)
  }

  prepareNewBridgeModel = (formData) => {
    console.log(formData)
    console.log(this.props.currentUser)
    let newBridgeModel = {
      ...formData,
      models_task_id: null,
      bid: this.props.bridge.bid,
      created_by: this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name
    }
    console.log(newBridgeModel);
    this.props.createNewBridgeModel(newBridgeModel)
  }

  createBridgeSpans = (num) => {
    console.log(this.props.bridge);
    const spans = []
    for (let index = 1; index <= num; index++) {
      const span = {
        bid: this.props.bridge.bid,
        structure_type_id: null,
        name: `span_${index}`,
        // description: '',
        span_order: index
      };
      spans.push(span)

    }
    this.props.createBridgeSpans(spans)
  };

  actionGroupButtonClicked = (action) => {
    console.log(action)
  }

  actionGroupsHtml = this.props.actionGroups.map(group => {
        return (
          <ButtonsSection
            key={group.groupName}
            title={group.groupName}
            displayClass="block"

            >
            {group.actions.map(action => {
              return (
                <IconButtonToolTip
                  key={action.name}
                  iconName={action.icon}
                  toolTipType="info"
                  toolTipPosition="left"
                  toolTipEffect="float"
                  toolTipText={action.name}
                  className="mt-1"
                  onClickFunction={() => this.actionGroupButtonClicked(action)}
                >

                </IconButtonToolTip>
              )
            })}

          </ButtonsSection>

        )
      });
  

  componentDidMount() {
    console.log('componentDidMount', this.props.models)
    // const bridgeId = this.props.match.params.bridgeId;
    // const orgId = this.props.match.params.id;
    if (this.props.bridgeId) this.props.getBridge(this.props.bridgeId);
    if (this.props.orgId) this.props.getOrgTechnicalInfo(this.props.orgId)

  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    this.setState({bridgeLoaded: false})
    // this.props.bridgeLoaded = false
  }

  toggleAlert = (alertType) => {
    switch (alertType) {
      case 'delete':
        this.props.onToggleAlert({
          title: 'Are you sure',
          text: 'blah blah blah blah',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          
          confirmFunction: () => console.log('delete')
        });
        break
      case 'Import model':
        this.props.onToggleModal({
          title: 'Import model',
          text: '',
          // confirmButton: 'Import',
          cancelButton: 'Cancel',
          formType: 'modelForm',
          data: {
            editMode: 'Import'
          },
          // createFunction={(formData) => this.prepareNewBridgeModel(formData)}
          // editFunction={(formData) => this.props.editBridge(formData, this.props.bridge.bid)}
          confirmFunction: (formData) => this.prepareNewBridgeModel(formData)
        });
        break
    }

  }
  toggleModal = (modalType, editMode) => {
    switch (modalType) {
      case 'createProject':
        this.props.onToggleModal({
          title: 'Create new project',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'projectForm',
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data) => this.createProject(data)
        });
        break
      case 'Import model':
        this.props.onToggleModal({
          title: 'Import model',
          text: '',
          // confirmButton: 'Import',
          cancelButton: 'Cancel',
          formType: 'modelForm',
          data: {
            editMode: 'Import'
          },
          // createFunction={(formData) => this.prepareNewBridgeModel(formData)}
          // editFunction={(formData) => this.props.editBridge(formData, this.props.bridge.bid)}
          confirmFunction: (formData) => this.prepareNewBridgeModel(formData)
        });
        break
    }

  }


  toggelFullPage = (view) => {
    console.log(view, this.props.activeView);
    this.props.toggelFullPage(view)

  }

  fullPageButton = (view) => {

    return <IconButtonToolTip
      className="topCornerRightButton"
      iconName={this.props.fullPage? 'compress-arrows-alt' : "arrows-alt"}
      toolTipType="info"
      toolTipPosition="bottom"
      toolTipEffect="float"
      toolTipText='Full page'
      onClickFunction={() => this.toggelFullPage(view)}
    />

  };

  getModelsOfType = (type) => {
    // console.log(this.props.bridgeModels.map(model => model.type == type))
    return this.props.bridgeModels.map(model => model.type == type)
  }

  save = (model) => {
    console.log(model)
    this.props.onUpdateModel(model)
  }
  render(){
    // console.log('bridgePage render props:', this.props.boundingSphere)
    // console.log('selectedElements', this.props.selectedElements)

    return (
      <div className="bridgePage" >
        <div className="innerPage">
          {this.props.bridgeLoaded ?
            <>
            <SecondaryView
              className={this.props.fullPage && this.props.activeView === 'secondary'? 'fullPage' : ''}
              showBottomView={this.props.showBottomView}>
              <span className={this.props.fullPage && this.props.activeView !== 'secondary'? 'd-none' : 'd-inline'}>
                {this.fullPageButton('secondary')}

              </span>
              {this.showInSecondaryView(this.props.secondaryViewComponent, this.props.editMode)}


            </SecondaryView>
            <StyledMainView
              showBottomView={this.props.showBottomView}
              className={this.props.fullPage && this.props.activeView === 'main'? 'fullPage' : ''}>
              <div className={this.props.fullPage && this.props.activeView !== 'main'? 'd-none' : 'd-block text-light'}>
                {this.fullPageButton('main')}

              </div>

              {this.showInMainView(this.props.mainViewComponent, this.props.editMode)}
            </StyledMainView>
            {this.props.showBottomView && <BottomView
              className={this.props.fullPage && this.props.activeView === 'bottom'? 'fullPage' : ''}>
              {/* <div className={this.props.fullPage && this.props.activeView !== 'bottom'? 'd-none' : 'd-block text-light'}>
                {this.fullPageButton('bottom')}

              </div> */}
              {this.showInBottomView(this.props.bottomViewComponent, this.props.editMode)}

            </BottomView>
            }
            </>
            :
            <div>Loading bridge assets...</div>
          }

        </div>
      </div>
    )
  }
}

// const mapStateToProps = createStructuredSelector({

//   users: makeSelectUsers(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),

// });

const mapStateToProps = (state) => {
  // console.log('mapStateToProps', state)
  return {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    // keyPressed: getKeyPressed(),
    keyPressed: state.global.keyPressed,
    mainViewComponent: state.bridgePageReducer.mainViewComponent,
    secondaryViewComponent: state.bridgePageReducer.secondaryViewComponent,
    bottomViewComponent: state.bridgePageReducer.bottomViewComponent,
    showBottomView: state.bridgePageReducer.showBottomView,
    project: state.bridgePageReducer.project,
    selectedForm: state.bridgePageReducer.selectedForm,
    bridgeLoaded: state.bridgePageReducer.bridgeLoaded,
    bridgeUsers: state.bridgePageReducer.bridgeUsers,
    bridgeSurveys: state.bridgePageReducer.bridgeSurveys,
    bridge: bridgePageSelectors.getBridge(state),
    bridgeProcesses: state.bridgePageReducer.bridgeProcesses,
    bridgeTasks: state.bridgePageReducer.bridgeTasks,
    bridgeTiles: state.bridgePageReducer.bridgeTiles,
    bridgeImages: state.bridgePageReducer.bridgeImages,
    bridge3dImages: state.bridgePageReducer.bridge3dImages,
    bridgeSpans: bridgePageSelectors.getBridgeSpans(state),
    bridgeElements: bridgePageSelectors.getBridgeElements(state),
    unAllocatedElements: bridgePageSelectors.getUnAllocatedElements(state),
    bridgeNodes: state.bridgePageReducer.bridgeNodes,
    selectedModels: state.bridgePageReducer.selectedModels,
    // selectedNodes: state.bridgePageReducer.selectedNodes,
    selectedElements: bridgePageSelectors.getSelectedElements(state),
    selectedObjectIds: bridgePageSelectors.getSelectedObjectIds(state),
    bridgeModels: bridgePageSelectors.getBridgeModels(state),
    actionGroups: state.bridgePageReducer.actionGroups,
    editMode: state.bridgePageReducer.editMode,
    fullPage: state.bridgePageReducer.fullPage,
    activeView: state.bridgePageReducer.activeView,
    selectedElement: bridgePageSelectors.getElement(state),
    boundingSphere: state.bridgePageReducer.boundingSphere,
    viewData: state.bridgePageReducer.viewData,
    elementsGroups: bridgePageSelectors.getElementsGroups(state),
    structureTypes: state.bridgePageReducer.structureTypes,
    bridgeTypes: state.bridgePageReducer.bridgeTypes,
    elementsTypes: bridgePageSelectors.getElementsTypes(state),
    mode: state.resiumReducer.mode
  }


};


const mapDispatchToProps = dispatch => {
  return {
    getBridge: (id) => dispatch(actions.getBridge(id)),
    getOrgTechnicalInfo: (id) => dispatch(getOrgTechnicalInfo(id)),
    getBridgeModels: (id) => dispatch(actions.getBridgeModels(id)),
    getBridgeProcesses: (id) => dispatch(actions.getBridgeProcesses(id)),
    getSurvey: (id) => dispatch(actions.getSurvey(id)),
    sendMessage: (message) => dispatch(createMessage(message)),
    showSecondaryViewComponent: (component, mode) => dispatch(actions.showInSeondaryView(component, mode)),
    showMainViewComponent: (component, mode) => dispatch(actions.showInMainView(component, mode)),
    showBottomViewComponent: (component, mode) => dispatch(actions.showInBottomView(component, mode)),
    createSurvey: (survey) => dispatch(actions.createNewSurvey(survey)),
    // createProject: (project) => dispatch(actions.createNewProject(project)),
    editProject: (project) => dispatch(actions.editProject(project)),
    createNewBridge: (bridge) => dispatch(actions.createNewBridge(bridge)),
    createNewBridgeModel: (model) => dispatch(actions.createNewBridgeModel(model)),
    editBridge: (formData, bid) => dispatch(actions.editBridge(formData, bid)),
    editSurvey: (survey) => dispatch(actions.editSurvey(survey)),
    editSpans: (spans) => console.log(spans),
    editElement: (element) => dispatch(actions.editElement(element)),
    onCreateNewProcess: (process) => dispatch(actions.createNewProcess(process)),
    onEditProcess: (process) => dispatch(actions.editProcess(process)),
    onToggleModal: (modalData) => dispatch(toggleModal(modalData)),
    onToggleAlert: (data) => dispatch(toggleAlert(data)),
    onUpdateModel: (model) => dispatch(actions.updateModel(model)),
    nodesLoaded: (nodes) => dispatch(actions.nodesLoadedFromModel(nodes)),
    createNewBridgeElements: (nodes) => dispatch(actions.createNewBridgeElements(nodes)),
    createBridgeSpans: (spans) => dispatch(actions.createBridgeSpans(spans)),
    updateResiumMode: (mode) => dispatch(updateResiumMode(mode)),
    onKeyPress: (key) => dispatch(keyPressed(key)),
    // openModal: (modalData) => dispatch()
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BridgePage);



