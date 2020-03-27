import React, { useEffect, memo, Component } from 'react';
import Resium from '../../Resium/Resium'
import StyledMainView from './MainView/MainView';
import SecondaryView from './SecondaryView/SecondaryView';
import BottomView from './BottomView/BottomView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModelPage.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectUsers, makeSelectLoading, makeSelectError, getKeyPressed, getModalOpen } 
  from 'containers/App/selectors';
import { toggleModal, keyPressed } from 'containers/App/actions';

import * as modelPageSelectors from './selectors'
import * as actions from './actions';
import Notification from '../../../components/Toast/Toast'
import IconButtonToolTip from '../../../components/IconButtonToolTip/IconButtonToolTip';
import PhotoSphereViewer from './PhotoSphereViewer/PhotoSphereViewer'
import DataTable from '../../../components/DataTable/DataTable';
import Carousel from '../../../components/Carousel/Carousel';
import Form from '../../Forms/Form';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select'

import Gallery from '../../../components/Gallery/Gallery';
import { MDBAnimation, MDBBtn, MDBIcon } from 'mdbreact';
// import Stepper from '../Stepper/Stepper';
const key = 'modelPage';

const ModelPage = ({
  models
}) => {
  // console.log(models);

  const handleNodesLoaded = (nodes) => {
    console.log(nodes);
    // console.log(this.props.bridgeElements);
    // if (!this.props.bridgeElements.length) {

    //   this.props.createNewBridgeElements(nodes)
    // }
    // this.props.nodesLoaded(nodes)
  }
  return <div className="innerPage">
    <SecondaryView
      showBottomView={true}
      // className={this.props.fullPage && this.props.activeView === 'secondary'? 'fullPage' : ''}
      showBottomView={true}
      >
      1
      {/* {this.showInSecondaryView(this.props.secondaryViewComponent, this.props.editMode)} */}


    </SecondaryView>
    <StyledMainView
      showBottomView={true}
      // className={this.props.fullPage && this.props.activeView === 'main'? 'fullPage' : ''}
      >
      <Resium 
        models={models}
        onModelLoad={(nodes) => handleNodesLoaded(nodes)}
        background={{lon: -123.0744619, lat: 44.0503706, height: 0}}/>
      {/* <div className={this.props.fullPage && this.props.activeView !== 'main'? 'd-none' : 'd-block text-light'}>
        {this.fullPageButton('main')}

      </div> */}

      {/* {this.showInMainView(this.props.mainViewComponent, this.props.editMode)} */}
    </StyledMainView>
    


  </div>
}




const mapStateToProps = createStructuredSelector({
  

});


const mapDispatchToProps = dispatch => {
  return {
    
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
)(ModelPage);



