import React, { useState, memo, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HoverableWrapper from '../../components/Hoverable/Hoverable';
import { makeSelectProviderOrganizations } from './selectors'
import Form from '../Forms/Form';
import {
    getProviderOrganizations
  } from '../AppData/actions';
  import {
    registerUser,
    registerProvider,
    registerOrg,
    login,
    
  } from '../App/actions';
import './RegistrationProcess.css'
const key = 'registrationProcess';

const RegistrationProcess  = ({
    currentUser,
    onLoginUser,
    providerOrganizations,
    getProviderOrganizations,
    history = useHistory(),
}) => {
    useInjectReducer({ key, reducer });
    const [active, setActive] = useState({
        formActivePanel3: currentUser ? 2 : 1,
        formActivePanel1Changed: false,
        })
    const [hasAccount, sethasAccount] = useState(false);
    const [formModeState, setformModeState] = useState('login');
    const [formTypeState, setFormTypeState] = useState('loginUserForm');
    const [provider, setprovider] = useState({});
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
            if (currentUser.userProviderRoles && currentUser.userProviderRoles.length == 1) {
              setprovider(currentUser.userProviderRoles[0])
              getProviderOrganizations(currentUser.userProviderRoles[0].provider_id)
            }
            handleNextPrevClick2(3,2)
        }
        return 
    }, [currentUser])
    let steps;
    if (formModeState == 'register') {
        steps =  [
            {name: 'Registration',  icon: 'sign-in-alt'},
            {name: 'Choose account type',  icon: 'user-cog'},
            {name: 'Basic info',  icon: 'info'},
            {name: 'Registration complete',  icon: 'check-circle'},
        ]
    } else {
        steps = [
            {name: 'Login',  icon: 'sign-in-alt'},
            {name: 'Choose Work space',  icon: 'user-cog'},
            // {name: 'Choose organization',  icon: 'building'},
            // {name: 'Building your work space',  icon: 'check-circle'},
        ]

    }
    const accoutTypes = [
        { name: 'User', formType: 'userForm' },
        { name: 'Provider', formType: 'providerForm' },
        { name: 'Organization', formType: 'organizationForm'}
      ]
    const userOrgRoles = () => {
        let roles = [];
        currentUser.userOrganiztionRoles.map(role => {
            // console.log(role)
            roles.push({
            org_id: role.org_id,
            name: role.org_name,
            roleName: role.role_name,
            });
        });

    return roles;
    };
    const userProviderRoles = () => {
        console.log(currentUser)
        let roles = [];

        currentUser.userProviderRoles.map(role => {
            // console.log(role)
            roles.push({
            provider_id: role.provider_id,
            name: role.name,
            roleName: '',
            });
        });
        return roles;
    };
    const swapFormActive = (a) => (param) => (e) => {
    setActive({
        ['formActivePanel' + a]: param,
        ['formActivePanel' + a + 'Changed']: true
    });
    }
     
    const handleNextPrevClick = (a) => (param) => (e) => {
        console.log(a, param)
        setActive({
            ['formActivePanel' + a]: param,
            ['formActivePanel' + a + 'Changed']: true
        });
    }
    const handleNextPrevClick2 = (a, param) => {
        console.log(a, param)
        setActive({
            ['formActivePanel' + a]: param,
            ['formActivePanel' + a + 'Changed']: true
        });
    }

    const handleSelectProvider = () => {
        
    }
    const handleSelectAccountType = (account) => {
        console.log(account);
        handleNextPrevClick2(3, 3);
        setFormTypeState(account.formType)
    }

    const handleSubmission = () => {
    alert('Form submitted!');
    }

    const calculateAutofocus = (a) => {
    if (active['formActivePanel' + a + 'Changed']) {
    return true
    }
    }
    const Header = ({text}) => {
        return <h3 className="font-weight-bold pl-0 my-4">
        <strong>{text}</strong>
        </h3>
       
    }

    const UserOrgRoles = ({user}) => {
        // if (user.userOrganiztionRoles && user.userOrganiztionRoles.length){
            return <>
            <h5>Organizations</h5>
            {userOrgRoles().map(org => <HoverableWrapper
                key={org.id}
                bgColor="hsla(10, 100%, 48%, 0.343)"                      
                className="text-left p-3"
                style={{'height': '3.4rem'}}
                color="rgba(255, 140, 0, 1)"
                hoverColor="black"
                afterBgColor={"rgba(255, 140, 0, 0.335)"}
                useAfter={true}
                hoverEffect="backGroundEnterLeft"
                onClick={() => {
                    console.log(org)
                }}
                ><h5>
                {org.name}
            </h5>
            </HoverableWrapper>
            )} 
            </>
        // }
        
    }
    const UserProviderRoles = ({user}) => {
        
        // if (user.userProviderRoles && user.userProviderRoles.length){
            return <>
            <h5>Choose provider</h5>
            {userProviderRoles().map(prov => <>
            <HoverableWrapper
                key={prov.provider_id}
                bgColor="hsla(10, 100%, 48%, 0.343)"                      
                className="text-left p-3"
                style={{'height': '3.4rem'}}
                color="rgba(255, 140, 0, 1)"
                hoverColor="black"
                afterBgColor={"hsla(222, 23%, 45%, 0.397)"}
                useAfter={true}
                hoverEffect="backGroundEnterLeft"
                onClick={() => {
                    setprovider(prov)
                    getProviderOrganizations(prov.provider_id)
                }}
                ><h5>
                {prov.name}
            </h5>
            </HoverableWrapper>
            {/* {providerOrganizations.length && provider.name == prov.name ? 
                            
                providerOrganizations.map(org => <HoverableWrapper
                    key={org.id}
                    bgColor="hsla(10, 100%, 48%, 0.343)"                      
                    className="text-left p-2 ml-4"
                    style={{'height': '2.7rem', 'font-size': '1rem'}}
                    color="hsla(222, 23%, 45%, 1)"
                    hoverColor="black"
                    afterBgColor={"rgba(255, 140, 0, 0.335)"}
                    useAfter={true}
                    hoverEffect="backGroundEnterLeft"
                    onClick={() => {
                        history.push({
                            pathname: './providers/' + provider.provider_id,
                            search: '?query=abc',
                            state: { org_id: org.id }
                            })
                        
                    }}
                    ><div>
                    {org.name}
                    </div>
                    </HoverableWrapper>
                    ) 
                    : ''} */}
                </>
            )} 
            </>
        // }
    }
    
    return (
      <MDBContainer className="registrationProcess">
        <MDBCard>
          <MDBCardBody>
            <MDBRow className="pt-5 justify-content-center">
              <MDBCol md="2" className="pl-5 pl-md-0 pb-5">
                <MDBStepper icon vertical>
                    {steps.map((step, index) => <MDBStep
                        key={index}
                        className={active.formActivePanel3 == index + 1 ? 'active' : ''}
                        iconClass={'fadedasdsadsd'}
                        icon={step.icon}
                        stepName={step.name}
                        onClick={swapFormActive(3)(index+1)}
                        vertical
                    />)}
                </MDBStepper>
              </MDBCol>

              <MDBCol md="7">
                {active.formActivePanel3 === 1 && (
                  <MDBCol md="12" className="login">
                    <Header
                      text="Please sign in"
                    />
                    
                    {formModeState == 'register' ?
                     <Form
                        formType={'registerUserUserForm'}
                        editMode={formModeState}
                        colWidth={12}
                        editFunction={(data, event) =>
                            // onSubmitForm(data, event)
                            console.log(data, event)
                        }
                        />
                    :
                    <Form
                        formType={'loginUserForm'}
                        editMode={formModeState}
                        colWidth={12}
                        editFunction={(data, event) =>
                            onLoginUser(data)
                            // console.log(data, event)
                        }
                    />}
                    {formModeState !== 'register' && <>
                    <br/>
                    <br/>
                    <hr />
                    <h4>New User</h4>
                    <p>Create new account and register according to your role</p>
                    </>
                    }
                    <span className=""> 
                     
                      <MDBBtn
                        color="indigo"
                        rounded
                        className={formModeState === 'register' ? "float-left" : "float-right"}
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
                        {/* <strong>Create account
                        </strong> */}
                        <strong>
                          {formModeState === 'register'
                            ? 'Back to login'
                            : 'Create account'}
                        </strong>
                      </MDBBtn>
                    </span>
                   
                    
                   {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={handleNextPrevClick(3)(2)}
                    >
                      next
                    </MDBBtn> */}
                  </MDBCol>
                )}
                {active.formActivePanel3 === 2 && (
                  <MDBCol md="12" className="basic_info">
                    <Header
                      text={`${steps[1].name}`}
                    />
                    {formModeState == 'register' ? 
                        accoutTypes.map(account => <HoverableWrapper
                            key={account.formType}
                            bgColor="hsla(10, 100%, 48%, 0.343)"                      
                            className="text-left p-3"
                            style={{'height': '3.4rem'}}
                            color="rgba(255, 140, 0, 1)"
                            hoverColor="black"
                            afterBgColor={"rgba(255, 140, 0, 0.335)"}
                            useAfter={true}
                            hoverEffect="backGroundEnterLeft"
                            onClick={() => handleSelectAccountType(account)}
                            ><h5>
                            {account.name}
                        </h5>
                        </HoverableWrapper>
                        )
                        :
                        <>
                           {currentUser.userOrganiztionRoles && currentUser.userOrganiztionRoles.length ? 
                            <UserOrgRoles user={currentUser}/> : ''
                           } 
                           {currentUser.userProviderRoles && currentUser.userProviderRoles.length > 1 && (
                            <UserProviderRoles user={currentUser}/> 
                           )} 
                            {providerOrganizations.length ? <>
                            <h5>Choose organization you wish to work on</h5>
                            {providerOrganizations.map(org => <HoverableWrapper
                                key={org.id}
                                bgColor="hsla(10, 100%, 48%, 0.343)"                      
                                className="text-left p-3"
                                style={{'height': '3.4rem'}}
                                color="rgba(255, 140, 0, 1)"
                                hoverColor="black"
                                afterBgColor={"rgba(255, 140, 0, 0.335)"}
                                useAfter={true}
                                hoverEffect="backGroundEnterLeft"
                                onClick={() => {
                                    history.push({
                                        pathname: './providers/' + provider.provider_id,
                                        search: '?query=abc',
                                        state: { org_id: org.id }
                                      })
                                    
                                }}
                                ><h5>
                                {org.name}
                                </h5>
                                </HoverableWrapper>
                                ) }
                            </> : ''
                            }
                        </>
                        
                    }
                    
                    {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className=""
                      onClick={handleNextPrevClick(3)(1)}
                    >
                      previous
                    </MDBBtn> */}
                    {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={handleNextPrevClick(3)(3)}
                    >
                      next
                    </MDBBtn> */}
                  </MDBCol>
                )}
                {active.formActivePanel3 === 3 && (
                  <MDBCol md="12" className="basic_info">
                      <Header
                        text={`${steps[2].name}`}
                        />
                         {formModeState == 'register' ? 
                         <Form
                            formType={'basicInfoForm'}
                            editMode={formModeState}
                            colWidth={6}
                            editFunction={(data, event) =>
                                // onSubmitForm(data, event)
                                console.log(data, event)
                            }
                            />
                         :
                         <>
                         {providerOrganizations.length ? 
                            
                            providerOrganizations.map(org => <HoverableWrapper
                                key={org.id}
                                bgColor="hsla(10, 100%, 48%, 0.343)"                      
                                className="text-left p-3"
                                style={{'height': '3.4rem'}}
                                color="rgba(255, 140, 0, 1)"
                                hoverColor="black"
                                afterBgColor={"rgba(255, 140, 0, 0.335)"}
                                useAfter={true}
                                hoverEffect="backGroundEnterLeft"
                                onClick={() => {
                                    history.push({
                                        pathname: './providers/' + provider.provider_id,
                                        search: '?query=abc',
                                        state: { org_id: org.id }
                                      })
                                    
                                }}
                                ><h5>
                                {org.name}
                                </h5>
                                </HoverableWrapper>
                                ) 
                             : ''
                            }
                            </>

                        }
                      
                    
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-left"
                      onClick={handleNextPrevClick(3)(2)}
                    >
                      previous
                    </MDBBtn>
                    {/* <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-right"
                      onClick={handleNextPrevClick(3)(4)}
                    >
                      next
                    </MDBBtn> */}
                  </MDBCol>
                )}
                {active.formActivePanel3 === 4 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Finish</strong>
                    </h3>
                    <h2 className="text-center font-weight-bold my-4">
                      Registration completed!
                    </h2>
                    <MDBBtn
                      color="mdb-color"
                      rounded
                      className="float-left"
                      onClick={handleNextPrevClick(3)(3)}
                    >
                      previous
                    </MDBBtn>
                    <MDBBtn
                      color="success"
                      rounded
                      className="float-right"
                      onClick={handleSubmission}
                    >
                      submit
                    </MDBBtn>
                  </MDBCol>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    // currentUser: makeSelectCurrentUser(),
    // loading: makeSelectLoading(),
    // error: makeSelectError(),
    // roles: makeSelectRoles(),
    providerOrganizations: makeSelectProviderOrganizations(),
    // roles: makeSelectRoles(),
  });
// const mapStateToProps = (state) => {
//     console.log(state)
//     return {

//         providerOrganizations: makeSelectProviderOrganizations(),
//     }
//     // currentUser: makeSelectCurrentUser(),
//     // loading: makeSelectLoading(),
//     // error: makeSelectError(),
//     // roles: makeSelectRoles(),
//     // roles: makeSelectRoles(),
//   };
  
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
  )(RegistrationProcess);