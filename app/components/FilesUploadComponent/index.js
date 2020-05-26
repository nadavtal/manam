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
  const [profileImg, setProfileImg] = useState()
  const [errMsg, setErrMsg] = useState('');
  const [valid, setValid] = useState(false);
  // console.log(apiUrl + url)
  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setProfileImg(e.target.files[0])
      setValid(true)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    // console.log(formData, typeof(formData))
    // console.log(profileImg)
    formData.append('profileImg', profileImg);
    
    console.log(formData)
    onUploadImage(formData)

  }
  return (
    <div className="container">
      <div className="row">
        <form onSubmit={onSubmit} encType="multipart/form-data" className="">
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="form-group">
            {valid ? 
              <button className="btn btn-primary" type="submit">
                  Upload
                </button>            
            : 
             <div>{errMsg}</div>
            }
            
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