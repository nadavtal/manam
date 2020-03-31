import React, { memo, useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transitioned from '../../../components/Transitioned/Transitioned'
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBBtn,
} from 'mdbreact';

const animationTimings = {
  enter: 1000,
  exit: 500
}

const Categories = ({ 
    categories,
    history = useHistory() }) => {
  // console.log(categories);
  const [showBlock, setshowBlock] = useState(false)
  // useEffect(() => {
  //   console.log('laksjdlkasjdsd')
  //   return () => {
      
  //   }
  // }, [showBlock])
  return (
    // <MDBContainer className="mt-5">
    <>
      <MDBBtn onClick={() => setshowBlock(!showBlock)}>TOGGLE</MDBBtn>
      <div style={{
              height: '200px',
              width:  '200px'
            }}>
        <Transitioned
          inProp={showBlock}
          inClass="boxAnimation_1_top_in"
          outClass="boxAnimation_1_top_out"
          animationTimings={animationTimings}
        >
          <MDBView
            hover
            className=""
            // onClick={() => history.push(`./categories/${category.name}`)}
          >
            <img
              src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
              className="img-fluid mx-auto"
              alt=""
            />
            <MDBMask className="flex-center" overlay="red-light">
              <p className="white-text">{'aksjhdkajshdkjashkjdh'}</p>
            </MDBMask>
          </MDBView>
        </Transitioned>

      </div>
      {/* } */}
    {/* <MDBRow>
      {categories && categories.length ?
        categories.map(category => {
          const children = categories.filter(subCategory =>
            subCategory.parentCategories.includes(category.id),
          );
          return !category.parentCategories.length && (
            <MDBCol md="4" key={category.id}>
                <div style={{
                  height: '100%',
                  width:  '100%'
                }}>
                <Transitioned
                  inProp={true}
                  inClass="boxAnimation_1_top_in"
                  outClass="boxAnimation_1_top_out"
                  animationTimings={animationTimings}
                >
                  <MDBView hover className=""
                    onClick={() => history.push(`./categories/${category.name}`)}>
                    <img
                      src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
                      className="img-fluid mx-auto"
                      alt=""
                    />
                    <MDBMask className="flex-center" overlay="red-light">
                      <p className="white-text">{category.name}</p>
                    </MDBMask>
                  </MDBView>
                  <div className="d-flex justify-content-between">
                    {children.map(child => (
                      <div onClick={() => history.push(`./categories/${category.name}/${child.name}`)} className="iconSquare mx-auto ">
                        <div className='mx-auto ' style={{'width': '1rem'}}>
                          <MDBIcon icon={child.icon} size={'sm'} className='mx-auto' />
                        </div>

                        {child.name}
                      </div>
                    ))}

                  </div>
                </Transitioned>
              </div>  
            </MDBCol>


          )
        })
        :

        <h1>No Categories</h1>
       }
      </MDBRow> */}
    </>

    // </MDBContainer>
  );
};

export default memo(Categories);
