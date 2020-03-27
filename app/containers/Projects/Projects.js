import React, { useState, useEffect, memo} from 'react';
import { useHistory} from 'react-router-dom';

import {  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBCol ,
  MDBIcon,
  MDBCardGroup,
  MDBCard,
  MDBView,
  MDBCardFooter,
  MDBPagination,
  MDBBtn,
  MDBMask,
  MDBCardBody,
  MDBPageItem,
  MDBPageNav,
  MDBSwitch
  } from "mdbreact";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import DataTable from '../../components/DataTable/DataTable';
import { makeSelectLoading, makeSelectError,} from 'containers/App/selectors';

import * as actions from './actions'
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';

const key = 'projectsPage';
import saga from './saga';
import './Projects.css';


export function Projects(props) {

  useInjectSaga({ key, saga });
  const [tableMode, setTableMode] = useState(false)
  useEffect(() => {
    // console.log('[ProjectwPage.js] useEffect', props.projects);

  }, [tableMode]);

  const history = useHistory()

  const projectsCards = props.items.map((item, index) => {

    return (
      <MDBCol md="4" key={index}>
        <MDBCard className='mb-5' narrow >
          <MDBView cascade hover>
            <img
              onClick={() => props.onProjectClick(item.bid? item.bid : item.id, item.organization_id)}
              src={item.image_url.length > 0 ? require('../../images/'+item.image_url) : require('../../images/LOGIN.jpg')}
              className='img-fluid projectImage'
              alt={item.name}
            />

          </MDBView>
          <MDBCardBody
            onClick={() => props.onProjectClick(item.bid? item.bid : item.id, item.organization_id)}>
            <h4 className='card-title'>{item.name}</h4>
            <p className='card-text'>
            {item.description}
            </p>
          </MDBCardBody>
          <MDBCardFooter className='links-light'>
            <span className='pull-left pt-2'>
              <a href='#!'>
                <MDBIcon icon='share-alt' className='mr-2' />
              </a>

            </span>
            <span className='float-right'>
              <div
                className='waves-effect p-2'
                onClick={() => props.onProjectClick(item.bid? item.bid : item.id, item.organization_id)}>
                View item <MDBIcon icon='image' className='ml-1' />
              </div>
            </span>
          </MDBCardFooter>
        </MDBCard>

      </MDBCol>

    )
  })

  return (
    <div className="projects">
      <MDBSwitch
        checked={tableMode}
        onChange={() => setTableMode(!tableMode)}
        labelLeft=""
        labelRight={`Display as ${tableMode ? 'cards' : 'table'}`}
        />

        {tableMode ?
          <DataTable
            className="fullWidth"
            dataType="bridgesTable"
            displayEntries={false}
            paging={false}
            data={props.items}
            onRowClick={(id) => props.onProjectClick(id)}
          >

        </DataTable>
        :
        <MDBCardGroup deck>
          <MDBRow>
            {projectsCards}

          </MDBRow>
        </MDBCardGroup>
        }


      {/* <MDBPagination circle className='my-4 float-right'>
        <li className='page-item disabled clearfix d-none d-md-block'>
          <a className='page-link' href='#!'>
            First
          </a>
        </li>
        <MDBPageItem disabled>
          <MDBPageNav className='page-link' aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>Previous</span>
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active>
          <MDBPageNav className='page-link'>
            1 <span className='sr-only'>(current)</span>
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav className='page-link'>2</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav className='page-link'>3</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav className='page-link'>4</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav className='page-link'>5</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav className='page-link' aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
            <span className='sr-only'>Next</span>
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination> */}

    </div>
  )

}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),


});

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Projects);

