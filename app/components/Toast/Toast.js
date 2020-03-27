import React, { useEffect } from "react";
import { MDBNotification, toast, ToastContainer, MDBBtn } from "mdbreact";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectShowNotification, makeSelectNotificationData } from '../../containers/App/selectors';
import {closeNotification} from '../../containers/App/actions'
import './Toast.css';

const Notification = (props) => {


  useEffect(() => {
    // console.log('Use Effect Notification', props)
    // notify('info', 'top-right')
    setTimeout(() => {
      props.closeNotification();
    }, 5000);
  }, [props]);
  // useEffect(() => {
  //   // console.log('Use Effect Notification', props)
  //   // notify('info', 'top-right')
  //   setTimeout(() => {
  //     console.log('Use Effect show changed', props.show)
  //   }, 5000);
  // }, [props.show]);

  const notify = (type, position = 'top-right') => {
    console.log(type)
    return () => {
      switch (type) {
        case 'info':
          toast.info('Hi! I am an info message!', {
            autoClose: 3000,
            position: position
          });
          break;
        case 'success':
          toast.success('Hi! I am a success message', {
            position: position
          });
          break;
        case 'warning':
          toast.warn('Hi! I am a warning message', {
            position: position
          });
          break;
        case 'error':
          toast.error('Well, I am an error message', {
            position: position
          });
          break;
        default:
      }
    };
  }
  return (
    <>
      {props.show && (
        <MDBNotification
            // autohide={props.notificationData.autohide} // by default = ∞ ms
            bodyClassName="p-5 font-weight-bold white-text"
            className="stylish-color-dark"
            closeClassName="blue-grey-text"
            // fade
            icon={props.notificationData.icon}
            iconClassName="blue-grey-text"
            message={props.notificationData.message}
            show={props.show}
            text={props.notificationData.text}
            title={props.notificationData.title}
            titleClassName="elegant-color-dark white-text"
          />

      )}
      {/* <MDBBtn color='indigo' onClick={notify('warning')}>
          Top right
        </MDBBtn> */}
      <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </>
    );
  }



const mapStateToProps = createStructuredSelector({
  show: makeSelectShowNotification(),
  notificationData: makeSelectNotificationData(),
});

const mapDispatchToProps = dispatch => {
  return {
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
