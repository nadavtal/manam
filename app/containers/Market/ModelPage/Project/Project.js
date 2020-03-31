import React, { useEffect, useState, memo } from 'react';

import ToolBar from '../../../components/ToolBar/ToolBar';
import ButtonsSection from '../../../components/ToolBar/ButtonsSection/ButtonsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBSwitch,
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBCol,
} from 'mdbreact';
import Card from '../../../components/Cards/Cards';
import Tree from '../../../components/Tree/Tree';
import TreeCustom from '../../../components/Tree/TreeCustom';
import './Project.css';
import DataTable from '../../../components/DataTable/DataTable';
import DataTableCheckBox from '../../../components/DataTableCheckBox/DataTableCheckBox';
import TableFilters from '../../TableFilters/TableFilters';
import DataComponent from '../../../components/DataComponent/DataComponent';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getSurvey,
  updateSpan,
  showInMainView,
  updateElements,
  editElement,
  createNewBridgeModel,
} from '../actions';
import { toggleModal, showNotification } from '../../App/actions';
import { elementSelected, elementsSelected } from '../../Resium/actions';
import * as bridgePageSelectors from '../selectors';
import AccordionTable from '../../AccordionTable/AccordionTable';
import PhotoSphereViewer from '../PhotoSphereViewer/PhotoSphereViewer';
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip';
import NumbersWithCommas from '../../../components/NumbersWithCommas/NumbersWithCommas';
import RightClickMenu from '../../Resium/RightClickMenu';
import { updateTask } from '../../Organizations/Organization/actions';
import { convertToMySqlDateFormat } from '../../../utils/dateTimeUtils';
import { updateResiumMode } from '../../Resium/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { makeSelectUsers } from '../../App/selectors';
import { makeSelectRoles } from '../../RolesPage/selectors';
import { makeSelectProject } from '../selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import reducer from './reducer';
const key = 'project';
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzk5MDA1YS04OGM0LTQwYjEtYjhjZS1hN2I0MDczNWM0ZWUiLCJpZCI6MjExMzYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzkwMTExNTZ9.jMgFpduM1SaWmCbv_DdhTQjcjr5wsmX0Auc9XYJAMCg';

const projectData = props => {
  // console.log(props)
  const toggleClassicTabs3 = tab => {
    // console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
      setActiveItemClassicTabs3(tab);
    }
  };

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState('1');
  const [showInfo, setShowInfo] = useState(false);
  const [showSphere, setShowSphere] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  let projectStages = {
    stage1: {
      name: 'Create project',
      role: 'Survey manager',
      user: '',
      actions: [
        { name: 'Insert general project info', role: '', user: '' },
        { name: 'Allocate user to role', role: '', user: '' },
      ],
    },
    stage2: {
      name: 'Create surveys',
      role: 'Survey manager',
      user: '',
      actions: [
        { name: 'Allocate UAV operator', role: '', user: '' },
        { name: 'Prepare flight plan', role: 'UAV operator', user: '' },
        { name: 'Upload surveys', role: 'UAV operator', user: '' },
      ],
    },
    stage3: {
      name: 'Create model',
      role: 'CAD technician',
      user: '',
    },
    stage4: {
      name: 'Queality asurance',
      role: 'QC enginner',
      user: '',
    },
    stage5: {
      name: 'Encoding',
      role: 'QC enginner',
      user: '',
      actions: [{ name: 'Aprove survey', role: '', user: '' }],
    },
  };

  const actions = actions => {
    // console.log(actions);
    if (actions) {
      return actions.map(action => {
        return (
          <div className="row action" key={action.name}>
            <div className="col-3" />
            <div className="col-6">{action.name}</div>
            <div className="col-3">{action.role}</div>
          </div>
        );
      });
    }
  };

  const show3dImage = image => {
    setSelectedImage(image);
    setShowSphere(true);
  };

  const projectStagesHtml = Object.keys(projectStages).map(stage => {
    // console.log(projectStages[stage])
    return (
      <div className="stage" key={stage}>
        <div className="row">
          <div className="col-3">{stage}</div>
          <div className="col-6">{projectStages[stage].name}</div>
          <div className="col-3">{projectStages[stage].role}</div>
        </div>
        <div>{actions(projectStages[stage].actions)}</div>
      </div>
    );
  });

  const showNextPreviousImage = direction => {
    let preiousImage;
    let nextImage;
    for (let i = 0; i < props.bridge3dImages.length; i++) {
      if (props.bridge3dImages[i].name === selectedImage) {
        preiousImage = props.bridge3dImages[i - 1];
        nextImage = props.bridge3dImages[i + 1];
      }
    }

    console.log('preiousImage', preiousImage);
    console.log('nextImage', nextImage);
    if (direction === 'next') setSelectedImage(nextImage.name);
    else setSelectedImage(preiousImage.name);
  };

  const changeTaskPercentage = (task, value) => {
    // let updatedTask = this.state.projectTasks.filter(t => t.id == task.id)[0];
    // console.log(task)
    // console.log(updatedTask)
    task.completed_percentage = parseInt(value);
    task.due_date = convertToMySqlDateFormat(task.due_date);
    task.last_update = convertToMySqlDateFormat(new Date());
    // console.log(task.due_date)
    // console.log(convertToMySqlDateFormat(task.due_date))
    // updateTask.due_date = convertToMySqlDateFormat(updateTask.due_date)
    // updateTask.last_update = convertToMySqlDateFormat(new Date)

    console.log('changeTaskPercentage', task);
    props.updateTask(task);
  };
  const changeTaskDate = (task, value) => {
    task.completed_percentage = parseInt(value);
    task.due_date = convertToMySqlDateFormat(value);
    task.last_update = convertToMySqlDateFormat(new Date());

    console.log('changeTaskDate', task);
    props.updateTask(task);
  };

  const Sphere = () => {
    console.log(selectedImage);
    let preiousImage;
    let nextImage;
    let image;
    for (let i = 0; i < props.bridge3dImages.length; i++) {
      if (props.bridge3dImages[i].name === selectedImage) {
        image = preiousImage = props.bridge3dImages[i];
        preiousImage = props.bridge3dImages[i - 1];
        nextImage = props.bridge3dImages[i + 1];
      }
    }
    // const image = props.bridge3dImages.filter(image => image.name === selectedImage)[0];
    // console.log(image)
    return (
      <>
        <IconButtonToolTip
          className="leftTopCorner m-2 hoverScale"
          iconClassName="text-white"
          size="lg"
          iconName="times-circle"
          toolTipType="info"
          toolTipPosition="right"
          toolTipEffect="float"
          toolTipText=""
          onClickFunction={() => setShowSphere(false)}
        />
        {preiousImage && (
          <IconButtonToolTip
            className="leftMiddle m-2 hoverScale"
            iconClassName="text-white"
            size="lg"
            iconName="chevron-circle-left"
            toolTipType="info"
            toolTipPosition="right"
            toolTipEffect="float"
            toolTipText=""
            onClickFunction={() => showNextPreviousImage('previous')}
          />
        )}
        {nextImage && (
          <IconButtonToolTip
            className="rightMiddle m-2 hoverScale"
            iconClassName="text-white border-black"
            size="lg"
            iconName="chevron-circle-right"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText=""
            onClickFunction={() => showNextPreviousImage('next')}
          />
        )}

        <PhotoSphereViewer
          url={require('../../../images/images3D/' + image.url)}
        />
      </>
    );
  };
  const isItemInSelecedItems = object_id => {
    return props.selectedObjectIds.includes(object_id);
  };

  const handleRightMenuClick = (
    action,
    elementType,
    elementGroupId,
    spanId,
  ) => {
    console.log(action, elementType, elementGroupId, spanId);

    // props.onRightMenuOptionClick(action, elementType, elementGroupId, spanId)
  };

  const prepareUpdateElements = data => {
    console.log(data);
    const type = props.elementsTypes.find(
      type => type.id == data.element_type_id,
    );
    console.log(type);
    let updatedElements = [];
    for (const id of props.selectedObjectIds) {
      let updatedElement = props.bridgeElements.find(el => el.object_id == id);
      updatedElement.span_id = data.span_id;
      updatedElement.element_group_id = data.element_group_id;
      updatedElement.element_type_id = data.element_type_id;
      updatedElement.primary_unit = type.primary_unit;
      updatedElement.secondary_unit = type.secondary_unit;
      updatedElement.importance = type.importance;
      updatedElement.detailed_evaluation_required =
        type.detailed_evaluation_required;
      updatedElement.remarks = type.remarks;

      updatedElements.push(updatedElement);
    }
    console.log(updatedElements);
    props.updateElements(updatedElements);
  };

  const prepareNewBridgeModel = formData => {
    console.log(formData);
    const promise = Cesium.IonResource.fromAssetId(formData.ion_id)
      .then(function(resource) {
        // console.log(resource);
        let newBridgeModel = {
          ...formData,
          models_task_id: null,
          bid: props.bridge.bid,
          created_by:
            props.currentUser.first_name + ' ' + props.currentUser.last_name,
        };
        console.log(newBridgeModel);
        props.createNewBridgeModel(newBridgeModel);
      })
      .otherwise(function(error) {
        console.log(error);
        props.showNotification({
          message: ``,
          title: `${formData.ion_id} resource not found`,
          icon: 'error',
          text: '',
          autohide: 3000
    
        })
      });
    // let newBridgeModel = {
    //   ...formData,
    //   models_task_id: null,
    //   bid: props.bridge.bid,
    //   created_by: props.currentUser.first_name + ' ' + props.currentUser.last_name
    // }
    // console.log(newBridgeModel);
    // props.createNewBridgeModel(newBridgeModel)
  };
  const toggleModal = (modalType, objectId) => {
    console.log(props.selectedObjectIdsString);
    switch (modalType) {
      case 'allocateToSpan':
        props.onToggleModal({
          title: `Allocate ${props.selectedObjectIdsString} to span`,
          text:
            'Choose span name, element group and element type to allocate properties to element',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'spanAllocationForm',
          data: {
            spans: props.bridgeSpans,
            elementsGroups: props.elementsGroups,
            elementsTypes: props.elementsTypes,
            editMode: 'Allocate',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => prepareUpdateElements(data),
        });
        break;
      case 'editElement':
        props.onToggleModal({
          title: `Edit element: ${objectId}`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'elementForm',
          data: {
            spans: props.bridgeSpans,
            elementsGroups: props.elementsGroups,
            elementsTypes: props.elementsTypes,
            item: props.bridgeElements.find(el => el.object_id == objectId),
            editMode: 'edit',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => props.editElement(data),
        });
        break;
      case 'editSpan':
        props.onToggleModal({
          title: `Edit span`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'spansForm',
          data: {
            structureTypes: props.structureTypes,
            // elementsGroups: props.elementsGroups,
            // elementsTypes: props.elementsTypes,
            item: props.bridgeSpans.find(span => span.id == objectId),
            editMode: 'edit',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => props.editSpan(data),
        });
        break;
      case 'editModel':
        props.onToggleModal({
          title: `Edit model`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'modelForm',
          data: {
            item: props.bridgeModels.find(model => model.id == objectId),
            editMode: 'edit',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => props.editSpan(data),
        });
        break;
      case 'Import model':
        props.onToggleModal({
          title: 'Import model',
          text: '',
          // confirmButton: 'Import',
          cancelButton: 'Cancel',
          formType: 'modelForm',
          data: {
            editMode: 'Import',
          },
          // createFunction={(formData) => this.prepareNewBridgeModel(formData)}
          // editFunction={(formData) => this.props.editBridge(formData, this.props.bridge.bid)}
          confirmFunction: formData => prepareNewBridgeModel(formData),
        });
        break;
    }
  };

  const findElementByNodeObjectId = objectId => {
    return props.bridgeElements.find(el => el.object_id == objectId);
  };
  const checkIfElementHasSpanId = objectId => {
    return (
      props.bridgeElements.find(el => el.object_id == objectId).span_id !== null
    );
  };

  const getElements = (array, id, identifier) => {
    // console.log(array, id)
    return array.filter(item => item[identifier] == id);
  };
  return (
    <div className="projectTabs">
      <div className="classic-tabs">
        <MDBNav classicTabs color="pink" className="nav-justified">
          <MDBNavItem active={activeItemClassicTabs3 === '1'}>
            <MDBNavLink
              link
              active={activeItemClassicTabs3 === '1'}
              onClick={() => toggleClassicTabs3('1')}
            >
              <MDBIcon icon="info" size="1x" />
              <br />
              Info
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              active={activeItemClassicTabs3 === '2'}
              onClick={() => toggleClassicTabs3('2')}
            >
              <MDBIcon icon="cubes" size="1x" />
              <br />
              Models
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              active={activeItemClassicTabs3 === '3'}
              onClick={() => toggleClassicTabs3('3')}
            >
              <MDBIcon icon="users" size="1x" />
              <br />
              Processes
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              active={activeItemClassicTabs3 === '4'}
              onClick={() => toggleClassicTabs3('4')}
            >
              <MDBIcon icon="clipboard" size="1x" />
              <br />
              3D images
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              active={activeItemClassicTabs3 === '5'}
              onClick={() => toggleClassicTabs3('5')}
            >
              <MDBIcon icon="cube" size="1x" />
              <br />
              Spans
            </MDBNavLink>
          </MDBNavItem>
          {/* <MDBNavItem>
            <MDBNavLink link to="#" active={activeItemClassicTabs3==="5"} onClick={() => toggleClassicTabs3("5")}>
              <MDBIcon icon="cubes" size="1x" />
              <br />
              Nodes
            </MDBNavLink>
          </MDBNavItem> */}
        </MDBNav>

        <MDBTabContent className="card" activeItem={activeItemClassicTabs3}>
          {activeItemClassicTabs3 === '1' && (
            <MDBTabPane tabId="1">
              <Card
                //  title={props.bridge.name}
                //  data={props.bridge.bridge_type}
                showButton={false}
                imageUrl={
                  props.bridge.image_url
                    ? require('../../../images/' + props.bridge.image_url)
                    : require('../../../images/LOGIN.jpg')
                }
              />
              {/* <IconButtonToolTip
                className=""
                iconClassName={`text-${props.textColor}`}
                size="sm"
                iconName="edit"
                toolTipType="info"
                toolTipPosition="left"
                toolTipEffect="float"
                toolTipText={`Edit model info`}
                onClickFunction={() => toggleModal(item.id)}
              /> */}
              <DataComponent data={props.bridge} />
            </MDBTabPane>
          )}

          {activeItemClassicTabs3 === '2' && (
            <MDBTabPane tabId="2">
              {console.log(props.bridgeModels)}
              <IconButtonToolTip
                className=""
                iconClassName={`text-${props.textColor}`}
                size="sm"
                iconName="plus"
                toolTipType="info"
                toolTipPosition="right"
                toolTipEffect="float"
                toolTipText={`Create new bridge model`}
                onClickFunction={() => toggleModal('Import model')}
              />
              <AccordionTable
                data={props.bridgeModels}
                rows={props.bridgeModels}
                dataType="models"
                color="blue"
                textColor="white"
                toggleModal={modelId => toggleModal('editModel', modelId)}
                changeDate={(task, value) => console.log(task, value)}
              />
            </MDBTabPane>
          )}

          {activeItemClassicTabs3 === '3' && (
            <MDBTabPane tabId="3">
              <AccordionTable
                data={props.bridgeProcesses}
                rows={props.bridgeTasks}
                dataType="processes"
                // bridges={props.bridges}
                changePercentage={(task, value) =>
                  changeTaskPercentage(task, value)
                }
                changeDate={(task, value) => changeTaskDate(task, value)}
              />
            </MDBTabPane>
          )}
          {activeItemClassicTabs3 === '4' && (
            <MDBTabPane tabId="4">
              {showSphere ? (
                <div className="fullWidth fullHeight">
                  <Sphere />
                </div>
              ) : (
                <DataTable
                  displayEntries={false}
                  paging={false}
                  data={props.bridge3dImages}
                  onRowClick={name => show3dImage(name)}
                  dataType="images3dTable"
                  className="bridgePageDataTable"
                />
              )}
            </MDBTabPane>
          )}
          {activeItemClassicTabs3 === '5' && (
            <MDBTabPane tabId="5">
              <div className="d-flex justify-content-between mb-1">
                {/* <MDBSwitch
                checked={showInfo}
                onChange={() => setShowInfo(!showInfo)}
                labelLeft=""
                labelRight={`Show ${showInfo ? 'tree' : 'info'}`}
                /> */}
                <span className="projectTabsHeader my-2">
                  {props.selectedObjectIds.length
                    ? `Selected Id's: ` + props.selectedObjectIdsString
                    : `No selected id's`}
                </span>
                {props.selectedObjectIds.length ? (
                  <IconButtonToolTip
                    className="mt-2"
                    iconClassName="text-blue"
                    size="lg"
                    iconName="plus"
                    toolTipType="info"
                    toolTipPosition="left"
                    toolTipEffect="float"
                    toolTipText={`Allocate ${props.selectedObjectIds} to span`}
                    onClickFunction={() => toggleModal('allocateToSpan')}
                  />
                ) : (
                  ''
                )}
              </div>

              {showInfo ? (
                <>
                  <AccordionTable
                    data={props.bridgeSpans}
                    onTitleClick={rows =>
                      props.elementsSelected(
                        rows.map(row => parseInt(row.object_id)),
                      )
                    }
                    rows={props.bridgeElements}
                    onRowClick={id => props.elementSelected(id)}
                    structureTypes={props.structureTypes}
                    dataType="spans"
                    selectedObjectIds={props.selectedObjectIds}
                    saveSpan={formData => props.updateSpan(formData)}
                    updateResiumMode={mode => props.updateResiumMode(mode)}
                    showInMainView={objectId => props.showInMainView(objectId)}
                  >
                    <AccordionTable
                      data={props.elementsGroups}
                      onTitleClick={rows =>
                        props.elementsSelected(
                          rows.map(row => parseInt(row.object_id)),
                        )
                      }
                      rows={props.bridgeElements}
                      onRowClick={id => props.elementSelected(id)}
                      structureTypes={props.structureTypes}
                      dataType="spans"
                      selectedObjectIds={props.selectedObjectIds}
                      saveSpan={formData => props.updateSpan(formData)}
                      updateResiumMode={mode => props.updateResiumMode(mode)}
                      showInMainView={objectId =>
                        props.showInMainView(objectId)
                      }
                    />
                  </AccordionTable>
                </>
              ) : (
                <>
                  <TreeCustom
                    header="Spans"
                    className="customTreeView"
                    P
                    data={{
                      level_1: props.bridgeSpans,
                      level_2: props.elementsGroups,
                      level_3: props.elementsTypes,
                      level_4: props.bridgeElements,
                    }}
                    selectNodesMode={props.selectNodesMode}
                    selectedObjectIds={props.selectedObjectIds}
                    onClick={(id, selecteMultiple) =>
                      props.elementSelected(id, selecteMultiple)
                    }
                    editElement={(modalType, objectId) =>
                      toggleModal(modalType, objectId)
                    }
                    showElements={elements => props.elementsSelected(elements)}
                  />
                  <div className="projectTabsHeader mt-2">
                    Un allocated elements:
                  </div>
                  {props.unAllocatedElements.map(
                    el => (
                      <MDBInput
                       
                        label={el.name}
                        key={el.name + el.id}
                        checked={props.selectedObjectIds.includes(
                          parseInt(el.object_id),
                        )}
                        type="checkbox"
                        id={`checkBox${el.object_id}`}
                        onChange={() =>
                          props.elementSelected(parseInt(el.object_id), true)
                        }
                      />
                    ),
                    // <MDBInput
                    //   key={el.object_id}
                    //   label={el.name}
                    //   type="checkbox"
                    //   id={`checkBox${el.object_id}`}
                    //   checked={props.selectedObjectIds.includes(parseInt(el.object_id))}
                    //   onChange={() => props.elementSelected(el.object_id, selecteMultiple)}
                    //   />
                  )}

                  {/* <AccordionTable

                  data={props.unAllocatedElements}
                  rows={props.bridgeElements}
                  dataType="nodes"
                  onTitleClick={(id, selecteMultiple) => props.elementSelected(id, selecteMultiple)}
                  onRowClick={(id, selecteMultiple) => props.elementSelected(id, selecteMultiple)}
                  checkBox={true}
                  selectedObjectIds={props.selectedObjectIds}
                  selectNodesMode={props.selectNodesMode}
                  changePercentage={(task, value) => changeTaskPercentage(task, value)}
                  updateResiumMode={(mode) => props.updateResiumMode(mode)}
                  editElement={(objectId) =>  toggleModal('editElement', objectId)}
                  color="blue"
                  textColor="white"
                /> */}
                </>
              )}
            </MDBTabPane>
          )}
        </MDBTabContent>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    bridgeElements: bridgePageSelectors.getBridgeElements(state),
    bridgeModels: bridgePageSelectors.getBridgeModels(state),
    bridge: bridgePageSelectors.getBridge(state),
    elementsGroups: bridgePageSelectors.getElementsGroups(state),
    selectedObjectIds: bridgePageSelectors.getSelectedObjectIds(state),
    selectedObjectIdsString: bridgePageSelectors.getSelectedIdsString(state),
    selectedElement: bridgePageSelectors.getElement(state),
    elementsTypes: bridgePageSelectors.getElementsTypes(state),
    bridgeSpans: bridgePageSelectors.getBridgeSpans(state),
    unAllocatedElements: bridgePageSelectors.getUnAllocatedElements(state),
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getSurvey: id => dispatch(getSurvey(id)),
    updateTask: task => dispatch(updateTask(task)),
    // updateResiumMode: (mode) => dispatch(updateResiumMode(mode)),
    elementSelected: (id, mode) => dispatch(elementSelected(id, mode)),
    elementsSelected: ids => dispatch(elementsSelected(ids)),
    updateSpan: formData => dispatch(updateSpan(formData)),
    showInMainView: objectId =>
      dispatch(showInMainView('ElementForm', 'edit', objectId)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    updateElements: elements => dispatch(updateElements(elements)),
    editElement: element => dispatch(editElement(element)),
    editSpan: span => dispatch(updateSpan(span)),
    createNewBridgeModel: model => dispatch(createNewBridgeModel(model)),
    showNotification: (data) => dispatch(showNotification(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(projectData);
