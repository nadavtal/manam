import React, { memo } from 'react';
import { useHistory} from 'react-router-dom';
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBView,
  MDBMask,
  MDBContainer,
} from 'mdbreact';

const Categories = ({ 
    categories,
    history = useHistory() }) => {
  console.log(categories);
  return (
    // <MDBContainer className="mt-5">
    <MDBRow>
      {categories && categories.length ?
        categories.map(category => {
          const children = categories.filter(subCategory =>
            subCategory.parentCategories.includes(category.id),
          );
          return !category.parentCategories.length && (
            <MDBCol md="4" key={category.id}>
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
            </MDBCol>
          )
        })
        :
      
        <h1>No Categories</h1>
       }
      </MDBRow>
      
    // </MDBContainer>
  );
};

export default memo(Categories);
