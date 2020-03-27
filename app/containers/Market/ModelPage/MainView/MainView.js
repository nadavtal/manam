
import React from 'react';
import styled from 'styled-components';

import mainViewStyles from './MainViewStyles';
const StyledMainView = props => {
  const MainViewStyles = styled.div`
    width: 70%;
    height: 60vh;
    transition: .3s all;
    position: relative;
    float: right;
    padding: 1rem;
    background-color: white;
    border-bottom: 1px solid lightgrey;
    overflow: hidden;
    // &:active {
    //   // background: #41addd;
    //   color: #fff;
    // }
    `;
  return <MainViewStyles />;
};

const MainViewStyles = styled.div`
    width: 70%;
    height: 90vh;
    transition: .3s all;
    position: relative;
    float: right;
    padding: 1rem;
    background-color: white;
    border-bottom: 1px solid lightgrey;
    overflow: hidden;
    // &:active {
    //   // background: #41addd;
    //   color: #fff;
    // }
    `;
export default MainViewStyles;


