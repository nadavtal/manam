import React, {useState, memo, useEffect} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory, BrowserRouter } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as selectors from './selectors';
import BridgePage from '../BridgePage/index';
import SimpleReactLightbox from "simple-react-lightbox"
import { makeSelectLoading, makeSelectError, makeSelectUsers, makeSelectCurrentUser, makeSelectProjects
} from '../App/selectors';
import MegaMenu from '../../components/MegaMenu/MegaMenu';
import UsersPage from '../Users/index';
import ModelPage from './ModelPage/ModelPage'
import Projects from '../Projects/Projects'
import Categories from './Categories/Categories'
import Category from './Category/Category'
import reducer from './reducer';
import saga from './saga';
const key = "market"

const Market = (props) => {
  useInjectReducer({key, reducer});;
  useInjectSaga({key, saga});
  const [page, setpage] = useState('home')
  useEffect(() => {
    console.log(props.match)
    // return () => {
      
    // }
  }, [props.match])

  
  return <SimpleReactLightbox>
      <>
        <MegaMenu 
          menuType="marketMenu"
          onMenuClick={(name) => {
            setpage(name)
            props.history.push(`/market/${name}`)
          }}
          // linkToProviderPage={(provider_id) => linkToProviderPage(provider_id)}
          // changeWorkSpace={(orgId) => changeWorkSpace(orgId)}
          currentUser={props.currentUser}
          />
          
        {/* <Switch> */}
            <Route 
              path={`${props.match.url}/categories/:name`}
              render={(routeProps) => <Category 
                {...routeProps}
                items={props.models} 
                categories={props.categories}
                onItemClick={id => props.history.push(`../Models/${id}`)}
                />} 
                
              // component={Categories} 
              />
            <Route 
              path={`${props.match.url}/Models/:id`}
              render={(routeProps) => <BridgePage 
                {...routeProps}
                models={props.models}
                type="modelPage"

              />} 
                
              // component={Categories} 
              />
            <Route 
              path={`${props.match.url}/Models`}
              render={(routeProps) => <Categories {...routeProps} categories={props.categories}/>} 
              exact
              // component={Categories} 
              />
            
            <Route 
              path={`${props.match.url}/Users/`}
              render={(routeProps) => <UsersPage
                users={props.users}
                {...routeProps}
                // provider={props.provider}
                />} 
              // component={Categories} 
              />
            <Route 
              path={`${props.match.url}/Projects/`}
              render={(routeProps) =><Projects
                items={props.projects}
                rootLink={props.match.url}
                // onProjectClick={(orgId, bridgeId) => linkToBridgePage(orgId, bridgeId)}
                onProjectClick={bridgeId => console.log(bridgeId)}
                />} 
              // component={Categories} 
              />
            
            
            
        {/* </Switch> */}
      </>
      

  </SimpleReactLightbox>
}

const mapStateToProps = createStructuredSelector({
  categories: selectors.makeSelectCategories(),
  currentUser: makeSelectCurrentUser(),
  users: makeSelectUsers(),
  projects: selectors.makeSelectProjects(),
  models: selectors.makeSelectModels(),
  // messages: makeSelectOrganizationMessages(),
  // tasks: makeSelectOrganizationTasks(),
  // loading: makeSelectLoading()


});

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => dispatch(toggleModal(modalData)),
    onCreateNewProject: (data)=> dispatch(createNewProject(data)),

    onUpdateTask: (task) => dispatch(updateTask(task)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Market);


