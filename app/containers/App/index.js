/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import BridgePage from 'containers/BridgePage/Loadable'
import HomePage from 'containers/HomePage/Loadable';
import RolesPage from '../RolesPage/index'
import UsersPage from 'containers/Users';
import UserPage from 'containers/UserPage/index';
import ProvidersPage from 'containers/Providers/Providers';
import ProviderPage from 'containers/Providers/Provider/Loadable';
import OrganizationsPage from 'containers/Organizations/Organizations';
import OrganizationPage from 'containers/Organizations/Organization/Loadable';
import Market from '../Market/Loadable'
import Projects from 'containers/Projects/Projects';
import Processes from '../Processes/Processes';
import Process from '../Process/Process';
import AppData from '../AppData/AppData'
import Admin from '../Admin/Admin';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Modal from '../Modal/Modal'
import Messages from '../Messages/Messages';
import Notification from '../../components/Toast/Toast';
import GlobalStyle from '../../global-styles';
import Categories from '../Market/Categories/Categories'
import SideNav from '../SideNav/SideNav';


const AppWrapper = styled.div`
  // max-width: calc(768px + 16px * 2);
  // margin: 0 auto;
  display: flex;
  min-height: 100%;
  // padding: 0 16px;
  flex-direction: column;
`;

const dynamicLeftPadding = {
  paddingLeft: '0'
    // this.state.windowWidth > this.state.breakWidth ? '240px' : '0'
}

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Manam-portal"
        defaultTitle="Manam-portal"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
        {/* <div className=''> */}
          {/* <SideNav></SideNav> */}
        {/* </div> */}
        <AppData></AppData>
        <main style={{ ...dynamicLeftPadding, margin: '0 0 0 0' }}>
          <Switch>
            
            <Route path="/users/:id" component={UserPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/organizations/:id/bridges/:bridgeId" render={(routeProps) => <BridgePage 
              {...routeProps}
              // models={props.models}
            />}
             />
            <Route path="/organizations/:id" component={OrganizationPage} />
            <Route path="/organizations" component={OrganizationsPage} />
            <Route path="/providers/:id" component={ProviderPage} />
            <Route path="/providers" component={ProvidersPage} />
            <Route path="/roles" component={RolesPage} />
            <Route path="/projects/1" component={BridgePage} />
            <Route path="/projects" component={Projects} />
            <Route path="/proccesses/:id" component={Process} />
            <Route path="/proccesses" component={Processes} />
            <Route path="/messages" component={Messages} />
            <Route path="/admin" component={Admin} />
            <Route path="/market" component={Market} />
            <Route path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>

        </main>
        <Modal></Modal>
        <Notification
          type="info"/>
      <GlobalStyle />
    </AppWrapper>
  );
}
