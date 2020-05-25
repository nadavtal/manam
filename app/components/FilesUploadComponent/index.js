import React, {useState, memo} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { uploadFile } from 'containers/AppData/actions';
import {apiUrl} from 'containers/App/constants'

import {
  makeSelectCurrentUser,
} from 'containers/App/selectors';
const FilesUploadComponent = ({
  onUploadImage,
  url
}) => {
  const [profileImg, setProfileImg] = useState('')
  // console.log(apiUrl + url)
  const onFileChange = (e) => {
    setProfileImg(e.target.files[0])
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    // console.log(formData, typeof(formData))
    
    formData.append('profileImg', profileImg);
    
    console.log(formData)
    onUploadImage(formData)

  }
  return (
    <div className="container">
      <div className="row">
        <form 
          onSubmit={onSubmit}
          enctype="multipart/form-data">
     
          <div className="form-group">
            <input type="file" 
            onChange={onFileChange}/>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({

});
export function mapDispatchToProps(dispatch) {
  return {
    // onUploadImage: file => dispatch(uploadFile(file)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FilesUploadComponent);
// export default FilesUploadComponent