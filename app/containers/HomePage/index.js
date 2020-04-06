/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRoles,
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBInput,
  MDBIcon,
  MDBView,
  MDBBtn,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from 'mdbreact';
import Select from '../../components/Select/Select';
import Form from '../Forms/Form';
import HoverableWrapper from '../../components/Hoverable/Hoverable';
import RegistrationProcess from '../RegistrationProcess/RegistrationProcess'
import styled from 'styled-components';
import {
  registerUser,
  registerProvider,
  registerOrg,
  login,
} from '../App/actions';
import {
  getProviderOrganizations
} from '../AppData/actions';
import reducer from './reducer';
import saga from './saga';
import './Register.css';

// import { makeSelectRoles } from '../RolesPage/selectors';
const key = 'home';

export function HomePage({
  loading,
  error,
  onSubmitForm,
  onLoginUser,
  onRegisterUser,
  onRegisterProvider,
  onRegisterOrg,
  currentUser,
  providerOrganizations,
  getProviderOrganizations,
  history = useHistory(),
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    // console.log(formModeState)
  }, []);
  const [formTypeState, setFormTypeState] = useState('loginUserForm');
  const [formModeState, setformModeState] = useState('login');
  const [provider, setprovider] = useState({});
  const reposListProps = {
    loading,
    error,
  };

  

  onSubmitForm = (data, event) => {
    // if (data !== undefined && event.preventDefault) event.preventDefault();
    if (event) {
      console.log('onSubmitForm fired', data, event);
      console.log(formTypeState);

      switch (formTypeState) {
        case 'loginUserForm':
          onLoginUser(data);
          break;
        case 'userForm':
          onRegisterUser(data);
          break;
        case 'providerForm':
          onRegisterProvider(data);
          break;
        case 'organizationForm':
          onRegisterOrg(data);
          break;
      }
    }
  };

  // const HoverableWrapper = (props) => {

  //   const Div = styled.div`
  //   // color: ${active ? 'white' : 'black'};
  //   transition: all .3s;
  //   opacity: ${props.opacity ? props.opacity : 1};     
  //   background-color: transparent;
  //   // border-bottom: ${active ? '2px solid black' : ''};
  //   &:hover {
  //       // color: ${active ? '' : '#6cc0e5'};
  //       background-color: ${props.bgColor ? props.bgColor : 'transparent'};
  //       opacity: 1;
  //   }
  //   `
  //   return <Div 
  //     className={props.className}
  //     style={props.style} 
  //     onClick={props.onClick}>{props.children}</Div>
  //     }; 
  
  const WorkSpaceSelect = ({user}) => {
    
    console.log(providerOrganizations)
    return (
      <>
        <h4 className="text-center">Choose you work space</h4>
        <MDBRow className="">
          <MDBCol md="3" className="">
            {currentUser.userProviderRoles &&
              currentUser.userProviderRoles.length && (
                
                <HoverableWrapper 
                  bgColor="hsla(30, 100%, 48%, 0.043)" 
                  style={{'min-height' : '10rem'}}
                  opacity={0.5}
                  useAfter={false}
                  >
                  <h6 className="border-bottom py-1 mb-2 text-center">Providers</h6>
                  {userProviderRoles().map((role, index) => (
                    <HoverableWrapper bgColor="hsla(10, 100%, 48%, 0.343)"
                      key={role.name}
                      className="text-left pt-1"
                      style={{'height': '2rem'}}
                      color="orange"
                      hoverColor="black"
                      afterBgColor={"hsla(20, 100%, 48%, 0.343)"}
                      useAfter={true}
                      hoverEffect="backGroundEnterLeft"
                      onClick={() => {
                        console.log(role)
                        setprovider(role)
                        // history.push('./providers/' + role.provider_id)
                        getProviderOrganizations(role.provider_id)

                        }
                      }
                    >
                      <span className="mr-2">{index+1}.</span>{role.name}
                    </HoverableWrapper>
                  ))}
                  
                </HoverableWrapper>
               
              )}
          </MDBCol>
          <MDBCol md="3" className="">
            {provider.name && <h6 className="border-bottom py-1 mb-2 text-center">Choose organizations</h6>}
            {provider.name && providerOrganizations.length && providerOrganizations.map(org => (
              <HoverableWrapper bgColor="hsla(10, 100%, 48%, 0.343)"
                key={org.name}
                className="text-left ml-3"
                
                onClick={() =>
                  // setprovider(role.name)
                  // history.push('./providers/' + provider)
                  history.push({
                    pathname: './providers/' + provider.provider_id,
                    search: '?query=abc',
                    state: { org_id: org.id }
                  })
                  
                  // getProviderOrganizations(role.provider_id)
                }
              >
                <span>- {org.name}</span>
              </HoverableWrapper>
            ))}
          </MDBCol>
          <MDBCol md="6" className="">
            {currentUser.userOrganiztionRoles && 
              currentUser.userOrganiztionRoles.length && (
                <HoverableWrapper 
                  bgColor="hsla(29, 100%, 48%, 0.343)" 
                  style={{'min-height' : '10rem'}}
                  opacity={0.5}
                  >
                  <h6 className="border-bottom py-1 mb-2 text-center">Organizations</h6>
                  {userOrgRoles().map(role => (
                    <p
                      key={role.name}
                      className="text-left"
                      onClick={e =>
                        history.push('./organizations/' + role.org_id)
                      }
                    >
                      - {role.name}
                    </p>
                  ))}
                </HoverableWrapper>
              )}
          </MDBCol>
        </MDBRow>
      </>
    );
  }
  const RegisterLogin = () => {

    return <>
    <h4>
      "Portal name"{' '}
      {formModeState === 'register'
        ? 'registration'
        : 'login'}
    </h4>
    <span className="loginButtons">
      {/* <span>Create account</span> */}
      <MDBBtn
        color="indigo"
        rounded
        className=""
        onClick={() =>
          formModeState === 'register'
            ? [
                setformModeState('login'),
                setFormTypeState('loginUserForm'),
              ]
            : [
                setformModeState('register'),
                setFormTypeState('userForm'),
              ]
        }
      >
        <strong>
          {formModeState === 'register'
            ? 'Back to login'
            : 'Create account'}
        </strong>
      </MDBBtn>
    </span>
    <div>
      {formModeState === 'register' && (
        <Select
          label="Choose account type"
          options={[
            { name: 'User', id: 'userForm' },
            { name: 'Provider', id: 'providerForm' },
            {
              name: 'Organization',
              id: 'organizationForm',
            },
          ]}
          onChange={formType =>
            setFormTypeState(formType)
          }
        />
      )}
    </div>
    <hr />
    {/* {formTypeState === 'userForm' || formTypeState === 'userForm' || } */}

    <Form
      formType={formTypeState}
      editMode={formModeState}
      editFunction={(data, event) =>
        onSubmitForm(data, event)
      }
    />
  </>
  }

  const centerSection =  <MDBMask className="d-flex justify-content-center" overlay="gradient">
  <MDBContainer className="h-100 d-flex justify-content-center">
    <MDBRow className="homepageFormWrapper">
      <MDBCol md="12" className="mt-5 mx-auto ">
        <MDBCard>
          <MDBCardBody className="">
            <div className="login_header">
              
              {currentUser ? 
                <WorkSpaceSelect user={currentUser}/> 
                : 
                <RegisterLogin />}
            </div>

            {/* / */}
            {/* <MDBBtn color='green' rounded
                onClick={() => [setformModeState('login'), setFormTypeState('loginUserForm')]}>
                <strong>LOGIN</strong>
              </MDBBtn> */}

            {formModeState === 'register' && (
              <p>
                By creating an account, I acknowledge that I have read
                and agree with the Terms of Use.
              </p>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</MDBMask>
  return (
    <div id="register">
      <MDBView>
        <MDBMask className="d-flex justify-content-center" overlay="gradient">
          <MDBContainer className="h-100 d-flex justify-content-center mt-5">
            <RegistrationProcess />

          </MDBContainer>

        </MDBMask>
      </MDBView>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  roles: makeSelectRoles(),
  // providerOrganizations: makeSelectProviderOrganizations(),
  // roles: makeSelectRoles(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoginUser: userData => {
      dispatch(login(userData));
    },
    onRegisterUser: data => {
      dispatch(registerUser(data));
    },
    onRegisterProvider: data => {
      dispatch(registerProvider(data));
    },
    onRegisterOrg: data => {
      dispatch(registerOrg(data));
    },
    getProviderOrganizations: providerId => dispatch(getProviderOrganizations(providerId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
