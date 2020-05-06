import React, { Component, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAlertOpen, makeSelectAlertData } from '../App/selectors';
import { TOGGLE_ALERT } from '../App/constants';
import ReactDOM from 'react-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import { CSSTransition } from 'react-transition-group';

import './Alert.css';

const AlertComponent = ({
    alertOpen,
    alertData,
    onToggleAlert
}) => {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  return <>
   {alertOpen == true && <div className="overlapblackbgFullScreen" onClick={onToggleAlert}></div>}
      <CSSTransition
        in={alertOpen}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => console.log('ENTER')}
        onExited={() => console.log('EXIT')}
      >
        <Alert
          className="screenTopCenter"
          variant={alertData && alertData.alertType ? alertData.alertType : 'primary'}
          dismissible
          onClose={onToggleAlert}
        >
          {alertData && <>
            <Alert.Heading>
              <MDBIcon icon="exclamation"
                className={`mr-3`}/>
              {alertData ? alertData.title : ''}
            </Alert.Heading>
            <p>
              {alertData.text}
            </p>
            <Button 
              onClick={alertData.confirmFunction ? alertData.confirmFunction : onToggleAlert}
              variant={alertData.alertType}>
              {alertData.confirmButton}
            </Button>
            <Button onClick={onToggleAlert}>
              cancel
            </Button>
          
          </>
          }
        </Alert>
      </CSSTransition>
    
  </>
}
const mapStateToProps = createStructuredSelector({
    alertOpen: makeSelectAlertOpen(),
    alertData: makeSelectAlertData(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      onToggleAlert: () => dispatch({type: TOGGLE_ALERT}),
    }
  }
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(AlertComponent);
