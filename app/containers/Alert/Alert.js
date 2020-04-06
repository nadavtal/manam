import React, { Component, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAlertOpen, makeSelectAlertData } from '../App/selectors';
import { TOGGLE_ALERT } from '../App/constants';
import ReactDOM from 'react-dom';
import { Container, Button, Alert } from 'react-bootstrap';
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
   {alertOpen && <div className="overlapblackbgFullScreen" onClick={onToggleAlert}></div>}
      <CSSTransition
        in={alertOpen}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => console.log('ENTER')}
        onExited={() => console.log('EXIT')}
      >
        <Alert
          className="screenCenter"
          variant="primary"
          dismissible
          onClose={onToggleAlert}
        >
          <Alert.Heading>
            Animated alert message
          </Alert.Heading>
          <p>
            This alert message is being transitioned in and
            out of the DOM.
          </p>
          <Button onClick={onToggleAlert}>
            Close
          </Button>
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
