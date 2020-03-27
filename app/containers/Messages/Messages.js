import React, { useEffect, memo } from 'react';

import ToolBar from '../../components/ToolBar/ToolBar';
import ButtonsSection from '../../components/ToolBar/ButtonsSection/ButtonsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Messages.css';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { makeSelectUsers } from '../App/selectors';
import { makeSelectRoles } from '../RolesPage/selectors'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as appSelectors from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga'
const key = 'messages';

import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';


export function Messages({
  project,
  currentUser,

}) {
  // console.log(localStorage)
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  // console.log(currentUser);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {


  }, []);

  const messages = [
    {subject: 'Subject', body: 'Body', sender: 'Nadi', sentAt: Date.now()},
    {subject: 'Subject', body: 'Body', sender: 'Nadi', sentAt: Date.now()},
    {subject: 'Subject', body: 'Body', sender: 'Nadi', sentAt: Date.now()},
  ],

  messagesBox = (messages) => {
    // console.log(messages);
    if (messages) {
      return messages.map(message => {

        return (
          <div className="message" key={message.sentAt}>
            <div className="row messageHeader">
              <div className="col-3">{message.sender}</div>
              <div className="col-6">{message.subject}</div>
              <div className="col-3">{message.sentAt}</div>

            </div>
            <div className="row messageBody">

              <div className="col-9">{message.body}</div>
              <div className="col-3">reply/forward</div>

            </div>
          </div>

        )
      })
    }


  }

  // const projectStagesHtml = Object.keys(projectStages).map(stage => {
  //   // console.log(projectStages[stage])
  //   return (
  //     <div className="stage" key={stage.name}>
  //       <div className="row">
  //          <div className="col-3">{stage}</div>
  //          <div className="col-6">{projectStages[stage].name}</div>
  //          <div className="col-3">{projectStages[stage].role}</div>
  //       </div>
  //       <div>{actions(projectStages[stage].actions)}</div>
  //     </div>
  //   )
  // })
  const messagesHtml = (
    <div className="messages">
         <div className="row">
            <div className="col-3">From</div>
             <div className="col-6">Subject</div>
             <div className="col-3">Date</div>
         </div>


         {messagesBox(messages)}
    </div>
  )

  return messagesHtml


}

const mapStateToProps = createStructuredSelector({
  currentUser: appSelectors.makeSelectCurrentUser(),
  users: makeSelectUsers(),
  roles: makeSelectRoles(),
  // permissions: makeSelectRoles(),
  loading: appSelectors.makeSelectLoading(),
  error: appSelectors.makeSelectError(),
  // showMessages: appSelectors.makeSelectShowMessages()
});

export function mapDispatchToProps(dispatch) {
  return {
    onUploadProject: () => dispatch({type: UPLOAD_PROJECT}),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Messages);
