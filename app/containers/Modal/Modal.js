import React, { Component, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import { createStructuredSelector } from 'reselect';
import { makeSelectModalOpen, makeSelectModalData } from '../App/selectors';
import {TOGGLE_MODAL} from '../App/constants';
import  Dropdown  from '../../components/DropDown/Dropdown';
import Form from '../Forms/Form'

class ModalPage extends Component {
// state = {
//   modalOpen: false
// }

// toggle = () => {
//   this.setState({
//     modalOpen: !this.state.modalOpen
//   });
// }

confirm = (data, event) => {
  if(event) {
    // console.log('lalsdkjalskdjlaksjdlkasjdlkas')
    this.props.modalData.confirmFunction(data, event);

  }
  // this.props.onToggleModal()

}

render() {

  const modalData = this.props.modalData;
  console.log(modalData)
  return (
    <MDBContainer>
      {/* <MDBBtn onClick={this.props.onToggleModal}>Modal</MDBBtn> */}
      <MDBModal
        isOpen={this.props.modalOpen}
        toggle={this.toggle}
        disableFocusTrap >
        <MDBModalHeader
          className='light-blue darken-3 white-text'
          toggle={this.props.onToggleModal}>
            {modalData.title}
        </MDBModalHeader>
        <MDBModalBody>
          {modalData.text}
          {modalData.formType ?
            <Form
              formType={modalData.formType}
              editMode={modalData.editMode}
              {...modalData.data}
              createFunction= {(data, event) => this.confirm(data, event)}
              editFunction= {(data, event) => this.confirm(data, event)}
              users={this.props.users}
            />
            :
            modalData.body
          }
          {modalData.options ?

            <Dropdown
            mainText={modalData.options.buttonText}
            size="sm"
            options={modalData.options.options}
            selectFunction={() => console.log('aslkslksj')}>

            </Dropdown>
            : ''}

        </MDBModalBody>
        <MDBModalFooter>
          {modalData.cancelButton ? <MDBBtn color="secondary" onClick={this.props.onToggleModal}>{modalData.cancelButton}</MDBBtn> : '' }
          {modalData.confirmButton ? <MDBBtn color="primary" onClick={modalData.confirmFunction}>{modalData.confirmButton}</MDBBtn> : ''}
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  modalOpen: makeSelectModalOpen(),
  modalData: makeSelectModalData(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch({type: TOGGLE_MODAL}),
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ModalPage);
// export default connect(mapStateToProps, mapDispatchToProps)(ModalPage);
