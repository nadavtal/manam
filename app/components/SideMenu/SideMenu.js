import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './webslidemenu.css';
import './webslidemenu02.css';
import './color-skins/white-red.css';
// import './color-skins/white-orange.css';
// import './dropdown-effects/fade-down.css';
import { MDBIcon, MDBBtn, MDBInput, MDBSwitch } from 'mdbreact';
import { menus } from '../../menu-templates';
import UserInfoBox from 'components/UserInfoBox'
// import CSSTransition from 'react-transition-group/CSSTransition';
import { Transition, CSSTransition } from 'react-transition-group';
const SideMenu = ({
  menuType,
  onMenuClick,
  onSubMenuClick,
  categories,
  linkToProviderPage,
  changeWorkSpace,
  organization,
  provider,
  currentUser,
  history = useHistory(),
  onFinalItemClick
}) => {
  const [active, setActive] = useState('Bridges')
  const [showSideMenu, setShowSideMenu] = useState(false)
  const menu = menus[menuType];
  console.log(currentUser)
  const defaultStyle = {
    transition: `transform 200ms, opacity 200ms ease`,
    opacity: 1
  };


  const transitionStyles = {
    entering: { transform: 'scale(0.5)', opacity: 0 }, 
    entered: { transform: 'scale(2.0)', opacity: 1},
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };
  const MenuItem = ({ item }) => {

    return <span onClick={() => {
        // console.log(item.name)
        onMenuClick(item.name);
        active == item.name ? setActive() : setActive(item.name);
        !item.children && toggleSideNav()
        }}
        className={active == item.name ? 'active' : ''}
        >
        <MDBIcon  icon={item.icon} size="2x" className="" />
        {item.counter && <span className="counter mt-4">2</span>}
        {item.name}
        
        {item.children && <MDBIcon rotate={active == item.name ? '180' : ''} icon={'chevron-down'} size="1x" className="float-right mt-1" />}
      </span>     
   
  };

  const SubMenuItem = ({ parent, item }) => {
    return (
      <span 
        className="pl-3"
        onClick={() => {
          onSubMenuClick(item.name)
          !item.children && toggleSideNav()
        }}
        >
        {item.children && <i
          className={`fas fa-angle-${
            parent.float === 'right' ? 'left' : 'right'
          }`}
        />}
        {item.name}{' '}
         {item.counter && <span className="counter float-right">2</span>}
      </span>
    );
  };

  const toggleSideNav = () => {
    setShowSideMenu(!showSideMenu)
  }
  return (
    <div className={showSideMenu ? 'wsactive' : ''}>
      {/* <!-- Mobile Header --> */}
      <div className="wsmobileheader clearfix">
        <span
          id="wsnavtoggle"
          className="wsanimated-arrow"
          onClick={toggleSideNav}
        >
          <span />
        </span>
        <span className="smllogo">
          <img src={require('../../images/manamapps_logo_300x100.png')} />
        </span>
        <span id="wsnavtoggle02" className="wsanimated-arrow02">
          <span />
        </span>
      </div>
      {/* <!-- Mobile Header --> */}

      <div className="wsmenu02 clearfix">
        <div className="wsmenu02-list">
          <div className="wsmenu02-title">Section Header Style</div>

          <div className="wsmenu02text clearfix">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recentlywith desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. orem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recentlywith desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. orem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and specimen
              book. It has survived not only five centuries,cluding versions
              of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <nav className="wsmenu clearfix">
        <div className="overlapblackbg" onClick={toggleSideNav} />
        <CSSTransition
          in={showSideMenu}
          timeout={300}
          classNames="moveInRight"
          // unmountOnExit
          // onEnter={() => console.log('ENTER')}
          // onExited={() => console.log('EXIT')}
        >
          <ul className="wsmenu-list">
            <li className="">
              <UserInfoBox 
                organization={organization ? organization : null}
                provider={provider ? provider : null}
                handleAction={toggleSideNav} 
                />
            </li>
            {currentUser.userInfo.general_status == 'Active' &&<li className="">
              <MenuItem
                item={{
                  name: 'Info',
                  icon: 'info',
                  type: 'sub-menu',
                  float: 'left',
                }}
              />
            </li>}
            {currentUser.userInfo.general_status == 'Active' &&
              organization && organization.general_status == 'Active' && 
              menu.map(item => {
              switch (item.type) {
                case 'icon-menu':
                  return (
                    <li
                      key={item.name}
                      aria-haspopup="false"
                      className={`float-${item.float} iconMenu`}
                    >
                      <span onClick={() => onMenuClick(item.name)}>
                        {item.counter && (
                          <span className="counter mt-4">2</span>
                        )}
                        <MDBIcon icon={item.icon} size="2x" className="" />
                      </span>
                    </li>
                  );
                case 'sub-menu':
                  return (
                    <li
                      key={item.name}
                      aria-haspopup="true"
                      // className={`float-${item.float}`}
                    >
                      <MenuItem item={item} />
                      {item.children && (
                        // <CSSTransition
                        //   unmountOnExit
                        //   in={active == item.name}
                        //   timeout={{ appear: 0, enter: 500, exit: 300 }}
                        //   classNames='toggleAnimation'
                        //   appear
                        // >
                        <CSSTransition
                          in={active == item.name}
                          timeout={{
                            appear: 0,
                            enter: 0,
                            exit: 300,
                          }}
                          classNames="toggleAnimation"
                          unmountOnExit
                          // onEnter={() => console.log(false)}
                          // onExited={() => console.log(true)}
                          appear
                        >
                          <ul className={`sub-menu `}>
                            {item.children.map(child => (
                              <li aria-haspopup="true" key={child.name}>
                                <SubMenuItem parent={item} item={child} />

                                {child.children && child.children.length && (
                                  <ul className="sub-menu">
                                    {child.children.map(subChild => (
                                      <li
                                        aria-haspopup="true"
                                        key={subChild.name}
                                      >
                                        <SubMenuItem
                                          parent={item}
                                          item={subChild}
                                        />
                                        {subChild.children &&
                                          subChild.children.length && (
                                            <ul className="sub-menu">
                                              {subChild.children.map(
                                                finalItem => {
                                                  return (
                                                    <li
                                                      onClick={() =>
                                                        onFinalItemClick(
                                                          finalItem,
                                                          menuType,
                                                        )
                                                      }
                                                    >
                                                      <span>
                                                        {finalItem.name}{' '}
                                                      </span>
                                                    </li>
                                                  );
                                                },
                                              )}
                                            </ul>
                                          )}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </CSSTransition>
                      )
                      //   <Transition
                      //   in={active == item.name}
                      //   timeout={{
                      //     appear: 100,
                      //     enter: 300,
                      //     exit: 300
                      //   }}
                      //   appear
                      //   unmountOnExit
                      // >
                      //   {state => (
                      //     <div
                      //       style={{
                      //         ...defaultStyle,
                      //         ...transitionStyles[state]
                      //       }}
                      //     >
                      //       I am {state}
                      //     </div>
                      //   )}
                      // </Transition>
                      }
                    </li>
                  );
                case 'featured-menu':
                  return (
                    <li
                      aria-haspopup="true"
                      className={`float-${item.float}`}
                    >
                      <MenuItem item={item} />
                      <div className="wsmegamenu clearfix ">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-4 col-md-12 col-xs-12">
                              <h3 className="title">Product Features</h3>
                              <div className="fluid-width-video-wrapper">
                                <img
                                  src={require('../../images/LOGIN.jpg')}
                                  alt=""
                                />{' '}
                              </div>
                              <p className="wsmwnutxt">
                                Lorem Ipsum is dummy text of the printing
                                specimen book. It has survived not only five
                                centuries, but also typesetting in the the
                                contantly with desktoncluding.
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-12 col-xs-12">
                              <h3 className="title">Blog Article </h3>
                              <div className="fluid-width-video-wrapper">
                                <img
                                  src={require('../../images/LOGIN.jpg')}
                                  alt=""
                                />{' '}
                              </div>
                              <p className="wsmwnutxt">
                                Lorem Ipsum is dummy text of the printing
                                specimen book. It has survived not only five
                                centuries, but also typesetting in the the
                                contantly with desktoncluding.
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-12 col-xs-12">
                              <h3 className="title">
                                Highlight Your Services
                              </h3>
                              <div className="fluid-width-video-wrapper">
                                <span>
                                  <img
                                    src={require('../../images/LOGIN.jpg')}
                                    alt=""
                                  />
                                </span>{' '}
                              </div>
                              <p className="wsmwnutxt">
                                Lorem Ipsum is dummy text of the printing
                                specimen book. It has survived not only five
                                centuries, but also typesetting in the the
                                contantly with desktoncluding.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                case 'form-menu':
                  return (
                    <li
                      aria-haspopup="true"
                      className={`float-${item.float}`}
                    >
                      <span onClick={() => onMenuClick(item.name)}>
                        <MDBIcon icon="cog" size="2x" className={``} />
                        {item.name}

                        <span className="wsarrow" />
                      </span>
                      <div className="wsmegamenu halfdiv">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-12">
                              {/* <RolesDropDown
                        userData={currentUser}
                        onProviderClick={(provider_id) => linkToProviderPage(provider_id)}
                        onOrganizationClick={(orgId) => changeWorkSpace(orgId)}
                        /> */}

                              <h3 className="title">Contact Form</h3>
                              <form name="contact_name" className="menu_form">
                                <input type="text" placeholder="Name" />
                                <input type="text" placeholder="Email" />
                                <textarea placeholder="Your message..." />
                                <input type="button" value="Reset" />
                                <input type="submit" value="Send" />
                              </form>
                              <div className="cl" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                case 'category-menu':
                  return (
                    <li aria-haspopup="true" className="float-left">
                      <MenuItem item={item} />
                      <div className="wsmegamenu clearfix">
                        <div className="container-fluid">
                          <div className="row">
                            {item.categories.map(category => {
                              const children = item.categories.filter(
                                subCategory =>
                                  subCategory.parentCategories.includes(
                                    category.id,
                                  ),
                              );
                              //   console.log(children)
                              if (!category.parentCategories.length) {
                                return (
                                  <ul
                                    className="col-lg-2 col-md-12 col-xs-12 link-list"
                                    key={category.id}
                                  >
                                    <li className="title" key={category.name}>
                                      {category.name}
                                    </li>
                                    {children.length &&
                                      children.map(child => (
                                        <li key={child.id}>
                                          <span
                                            onClick={() =>
                                              history.push(
                                                `./categories/${child.name}`,
                                              )
                                            }
                                          >
                                            <MDBIcon
                                              icon={child.icon}
                                              size={'sm'}
                                              className={''}
                                              // border={props.border}
                                              // rotate={props.rotate}
                                              // pulse={props.pulse}
                                              // spin={props.spin}
                                              // far={'arrow-circle-right'}
                                            />
                                            {child.name}
                                          </span>
                                        </li>
                                      ))}
                                  </ul>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                default:
                  break;
              }
            })}
      
            <li className="">
              <MenuItem
                item={{
                  name: 'Switch work space',
                  icon: 'random',
                  type: 'sub-menu',
                  float: 'left'
                }}
              />
            </li>
            <li className="">
              <MenuItem
                item={{
                  name: 'Sign out',
                  icon: 'sign-out-alt',
                  type: 'sub-menu',
                  float: 'right'
                }}
              />
            </li>
          </ul>
        </CSSTransition>
      </nav>

      {/* } */}
    </div>
  );
};

export default memo(SideMenu);

/* <li aria-haspopup="true" className="float-left">
<span  className="wshomeico active">
  <i className="fas fa-home" />
  <span className="hometext">&nbsp;&nbsp;Home</span>
</span>
</li>
<li aria-haspopup="true" className="float-left">
<span >
  <i className="fas fa-align-justify" />Projects<span className="wsarrow" />
</span>
<ul className="sub-menu">
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />My projects{' '}
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Create news project
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Browse projects
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Publish project
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Open Source Development
    </span>
    <ul className="sub-menu">
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 1
        </span>
      </li>
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 2
        </span>
      </li>
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 3
        </span>
      </li>
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 4
        </span>
        <ul className="sub-menu">
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 1 Sub
            </span>
          </li>
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 2 Sub
            </span>
          </li>
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 3 Sub
            </span>
          </li>
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 4 Sub
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</li>
<li aria-haspopup="true" className="float-left">
<span onClick={() => history.push('market/categories')}>
  <i className="fas fa-list-ul" />Categories <span className="wsarrow" />
</span>
<div className="wsmegamenu clearfix">
  <div className="container-fluid">
    <div className="row">
        {categories.map(category => {
            const children = categories.filter(subCategory => subCategory.parentCategories.includes(category.id))
          //   console.log(children)
            if (!category.parentCategories.length) {
                return <ul className="col-lg-2 col-md-12 col-xs-12 link-list" key={category.id}>
                <li className="title">{category.name}</li>
                {children.length && children.map(child => <li key={child.id}>
                  <span onClick={() => history.push(`./categories/${child.name}`)}>
                   
                    <MDBIcon icon={child.icon}
                      size={'sm'}
                      className={''}
                      // border={props.border}
                      // rotate={props.rotate}
                      // pulse={props.pulse}
                      // spin={props.spin}
                      // far={'arrow-circle-right'}
                      />
                    {child.name}
                  </span>
                </li>)}
              </ul>

            }
        })}
     
    </div>
  </div>
</div>
</li>
<li aria-haspopup="true" className="float-left">
<span >
  <i className="fas fa-th-large" />Featured <span className="wsarrow" />
</span>
<div className="wsmegamenu clearfix ">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-12 col-xs-12">
        <h3 className="title">Product Features</h3>
        <div className="fluid-width-video-wrapper">
          <img src={require('../../images/LOGIN.jpg')} alt="" />{' '}
        </div>
        <p className="wsmwnutxt">
          Lorem Ipsum is dummy text of the printing specimen book. It
          has survived not only five centuries, but also typesetting
          in the the contantly with desktoncluding.
        </p>
      </div>
      <div className="col-lg-4 col-md-12 col-xs-12">
        <h3 className="title">Blog Article </h3>
        <div className="fluid-width-video-wrapper">
          <img src={require('../../images/LOGIN.jpg')} alt="" />{' '}
        </div>
        <p className="wsmwnutxt">
          Lorem Ipsum is dummy text of the printing specimen book. It
          has survived not only five centuries, but also typesetting
          in the the contantly with desktoncluding.
        </p>
      </div>
      <div className="col-lg-4 col-md-12 col-xs-12">
        <h3 className="title">Highlight Your Services</h3>
        <div className="fluid-width-video-wrapper">
          <span >
            <img src={require('../../images/LOGIN.jpg')} alt="" />
          </span>{' '}
        </div>
        <p className="wsmwnutxt">
          Lorem Ipsum is dummy text of the printing specimen book. It
          has survived not only five centuries, but also typesetting
          in the the contantly with desktoncluding.
        </p>
      </div>
    </div>
  </div>
</div>
</li>
<li aria-haspopup="true" className="float-left">
<span >
  <i className="fas fa-paragraph" />Services <span className="wsarrow" />
</span>
<div className="wsmegamenu clearfix">
  <div className="typography-text clearfix">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <h3 className="title">3D Development</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took span galley of type and scrambled it to make span
            type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the
            1960s Ipsum more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Intergrations</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in span piece of classical Latin
            literature from 45 BC, making it over 2000 years old.
            Richard McClintock, span Latin professor at Hampden-Sydney
            College in Virginia.
          </p>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Storage</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in span piece of classical Latin
            literature from 45 BC, making it over 2000 years old.
            Richard McClintock, span Latin professor at Hampden-Sydney
            College in Virginia.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="cl" />

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Other Services</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-wordpress" />Wordpress Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-drupal" />Drupal Development
              </span>
            </li>
            <li>
              <span >
                <i className="fas fa-shopping-cart" />Shoping Cart
                Development
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">More Services</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-android" /> Android App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-apple" />iPhone App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-windows" />Windows App Development
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Other Products</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-wordpress" />Wordpress Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-drupal" />Drupal Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-joomla" />Joomla Development
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">More Services</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-android" /> Android App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-html5" />HTML5 App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-paypal" />Paypal Store Integration
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</li>

<li aria-haspopup="true" className="float-right">
<MDBIcon icon="settings" size="2x" className='float-right' />
<span >
  <i className="fas fa-paper-plane" />Contact Us <span className="wsarrow" />
</span>
<div className="wsmegamenu halfdiv">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <h3 className="title">Contact Form</h3>
        <form name="contact_name" className="menu_form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <textarea placeholder="Your message..." />
          <input type="button" value="Reset" />
          <input type="submit" value="Send" />
        </form>
        <div className="cl" />
      </div>
    </div>
  </div>
</div>
</li>
<li aria-haspopup="false" className="float-right">
<span >
  <i className="fas fa-paper-plane" />Search <span className="wsarrow" />
</span>
<input type="text" placeholder="Search models" className="white p-1 mt-2"/>
{/* <i className="fas fa-search float-left" /> 
</li>
<li aria-haspopup="false" className="float-right iconMenu">
<span >
<span className='counter mt-4' >6</span>
<MDBIcon icon="envelope" size="2x" className='float-right' />
</span>
</li>
<li aria-haspopup="false" className="float-right iconMenu">
<span >
<span className='counter mt-4' >2</span>
<MDBIcon icon="shopping-cart" size="2x" className='float-right' />
</span>
</li>
<li aria-haspopup="false" className="float-right iconMenu">
<span >
<span className='counter mt-4' >2</span>
<MDBIcon icon="bell" size="2x" className='float-right' />
</span>
</li> */
