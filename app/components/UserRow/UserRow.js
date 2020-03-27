import React from 'react';
import PropTypes from 'prop-types';
import './UserRow.css'

function UserRow (props) {
  const user = props.user;

  return (
    <div className="userRow row">
      <div className="col-3">
        {user.firstName}
      </div>
      <div className="col-3">
        {user.lastName}
      </div>
      <div className="col-3">
        {user.email}
      </div>
      <div className="col-3">
        {user.role}
      </div>


    </div>
  )
}

UserRow.propTypes = {
  item: PropTypes.any,
};

export default UserRow;
