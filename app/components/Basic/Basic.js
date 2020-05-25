import React from 'react';
import Form from '../../containers/Forms/Form';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBAvatar,
  MDBBtn
} from 'mdbreact';
import FilesUploadComponent from '../FilesUploadComponent'
// import './Basic.css';

const PV2 = (props) => {
  const image = props.item.profile_image;
  console.log(image)
  console.log(props.item)
  return (
    <div id="profile-v2" className="mb-5">
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol lg="4" className="mb-4">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">
                  Edit Photo
                </h5>
              </MDBView>
              <MDBCardBody className="text-center">
                
                <MDBAvatar
                  tag="img"
                  src={image && image !== 'undefined' ? 
                  require(`../../../resources/static/assets/tmp/${image}`) :
                  require(`../../images/LOGIN.jpg`)}
                  alt="User Photo"
                  className="z-depth-1 mb-3 mx-auto"
                />

                <p className="text-muted">
                  <small>Profile photo will be changed automatically</small>
                </p>
                <MDBRow center>
                  <FilesUploadComponent
                    onUploadImage={formData => props.uploadImage(formData)}
                    url={props.url}
                  />
                  {/* <MDBBtn color="info" rounded size="sm">
                    Upload New Photo
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm">
                    Delete
                  </MDBBtn> */}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8" className="mb-r">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">
                  Edit Account Details
                </h5>
              </MDBView>
              <MDBCardBody className="text-center">
                <Form
                  formType={props.dataType}
                  item={props.item}
                  editMode="edit"
                  // createFunction={(formData) => this.props.createNewProject(formData)}
                  editFunction={formData => props.updateItem(formData)}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default PV2;
