import React, {memo, useState} from 'react';

import UserRow from '../UserRow/UserRow'
import TableHeader from '../TableHeader';
import Status from 'components/Status'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Actions from '../Actions';
import Select from 'components/Select/Select';
import CompanyRow from 'components/CompanyRow'
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectStatuses
} from 'containers/App/selectors';


const CompaniesTable = ({
  companies, 
 
  statuses,
  
  currentUser}) => {
  
  return <div className="toggled">
    
    <TableHeader className="row py-1">
    
      <div className="col-1">
        Name
      </div>
      <div className="col-1">
        Contact name
      </div>
      <div className="col-3">
      remarks
      </div>
      <div className="col-2">
      email
      </div>
      <div className="col-2">
      phone
      </div>
      <div className="col-2">
        Status
      </div>
      <div className="col-1">
        {/* <Actions 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
        /> */}
        {/* <PopperMenu 
          actions={actions[activeItemClassicTabs3].ifSelectedActions}
          bgColor={'peach'}
          // selectedUser={selectedUser}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          /> */}
      </div>

  </TableHeader>
  {/* <DataTable
      displayEntries={false}
      paging={false}
      data={props.bridge3dImages}
      onRowClick={name => show3dImage(name)}
      dataType="images3dTable"
      className="bridgePageDataTable"
    /> */}
      {companies.map((company, index) => {
        // console.log(company)
        return <CompanyRow
         key={company.name} 
         company={company}
          
          />
      })}
      </div>
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  statuses: makeSelectStatuses(),
  
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompaniesTable);

