import React, { memo } from 'react';
import { useHistory} from 'react-router-dom';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox"; 
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBCardBody,
  MDBCardFooter,
  MDBCard,
  MDBBadge
} from 'mdbreact';

const Category = (props) => {
  console.log(props)
  const cards = props.items.map((item, index) => {

    return (
      <MDBCol md="3" key={index}>
        <MDBCard className='mb-5' narrow >
          <MDBView cascade hover>
            
            <img
              onClick={() => props.onItemClick(item.id)}
              src={item.image_url.length > 0 ? require('../../../images/'+item.image_url) : require('../../../images/LOGIN.jpg')}
              className='img-fluid projectImage'
              alt={item.name}
            />

          </MDBView>
          <MDBCardBody
            onClick={() => props.onItemClick(item.id)}>
              <div className="d-flex justify-content-between">
                <h4 className='card-title'>{item.name}</h4>
                
                <p className='card-text float-right'>
                  {item.price}$
                </p>
              </div>
            <p className='card-text'>
            {item.description}
            </p>
            
          </MDBCardBody>
          <MDBCardFooter className='links-light'>
            <span className='pull-left pt-2'>
              
                <MDBIcon icon='share-alt' className='mr-2' />
                <MDBBadge color="primary" className="mr-1">New</MDBBadge>
                <MDBBadge color="secondary" className="mr-1">-30%</MDBBadge>
                <MDBBadge color="red">
                  <MDBIcon far icon="heart" />
                </MDBBadge>

            </span>
            <span className='float-right'>
              <div
                className='waves-effect'
                onClick={() => props.onItemClick(item.id)}>
                View item <MDBIcon icon='image' className='ml-1' />
              </div>
            </span>
          </MDBCardFooter>
        </MDBCard>

      </MDBCol>

    )
  })
  return (
    // <MDBContainer className="mt-5">
    <SRLWrapper>
      <MDBRow className="mt-4">
        {cards} 

      </MDBRow>

    </SRLWrapper>

    // </MDBContainer>
  );
};

export default memo(Category);
