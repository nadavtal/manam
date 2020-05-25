import { createGlobalStyle } from 'styled-components';
import './animations.css';
export const theme = {
  green: '#79BC1E',
  greenLight: '#A2D868',
  yellow: '#FFFF81',
  orange: '#FF892F',
  orange_2: '#FFA159',
  orange_3: '#FFB882',
  orange_white: '#FED0AC',
  cream: '#FFE6D5',
  turkize: '#66BDC7',
  turkizeLight: '#B9E0E4',
  offWhite: '#F1F1F1',
}

// .green-light {
//   color: #A2D868;
// }
// .green {
//   color: #79BC1E;
// }
// .yellow {
//   color: #FFFF81;
// }

// .orange {
//   color: #FF892F;
// }
// .orange-faded {
//   color: #FFB882;
// }
// .orange-faded-plus {
//   color: #FED0AC;
// }

// .turkize {
//   color: #66BDC7
// }
const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  .tableRow .select-dropdown {
    font-size: .8rem !important;
    margin: 0 !important;
    border-bottom: 1px solid blue !important;
  }
  .tableRow .md-form {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
  }

  .tableRow.active {
      background-color: rgba(255, 140, 0, 0.26);
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .fullHeight{
    height: 100% !important;
  }
  .fullWidth{
    width: 100% !important;
  }

  .registrationProcess .Input{
    background-color: ${theme.offWhite};
    height: 3rem;
    margin-top: 3rem !important;
  }

  .registrationProcess .Input input {
    border-bottom: none !important;
    color: grey;
    margin-left: 4.5rem !important;
  }

  .registrationProcess .Input i {
    width: 3.5rem;
    margin: 6px;
    padding-right: .8rem;
    padding-left: .8rem;
    color: lightgrey;
    font-size: 1.7rem;
    border-right: 1px solid lightgrey
  }
  .registrationProcess button {
    position: relative !important;
    bottom: 0;
    left: 0;
    margin-top: 3rem;
    margin-left: 1rem !important; 
    width: 97%;
    height: 3rem;
    border-radius: 0 !important;
    background-color: ${theme.green} !important;
  }

  .managementSearch {
    position: absolute !important;
    top: -.5rem;
  }

  .leftTopCorner {
    position: absolute !important;
    top: 0;
    left: .5rem;
    z-index: 101;
  }
  .rightTopCorner {
    position: absolute !important;
    top: 0;
    right: .5rem;
    z-index: 101;
  }
  .leftBottomCorner {
    position: absolute !important;
    bottom: 0;
    left: .5rem;
    z-index: 101;
  }
  .rightBottomCorner {
    position: absolute !important;
    bottom: 0;
    right: .5rem;
    z-index: 101;
  }
  .rightMiddle {
    position: absolute !important;
    top: 45%;
    right: 1rem;
    z-index: 101;
  }
  .leftMiddle {
    position: absolute !important;
    top: 45%;
    left: 1rem;
    z-index: 101;
  }

  .absolute-right {
    position: absolute;
    right: 0;
  }

  .tab-content {
    padding: 0rem !important;
    padding-top: 0rem !important;
  }

  .steps-step-2 .far {
    color: orange;
    transform: scale(1.2);
  }
  .steps-step-2 i {
    transition: all .3s;
  }
  .modal-dialog {
    max-width: 50rem !important;
    margin: 1.75rem auto;
  }

  .transitioned {
    transition: .3s all;
  }

  .view {
    position: relative;
    overflow: visible;
    cursor: default;
  }

  .hoverScale {
    transition: .3s all
    :hover {
      transform: scale(1.2)
    }
  }
  .nav-link.disabled {
    opacity: .4
  }
  .nav-drop-down {
    border: none;

  }
  .classic-tabs .nav {
    height: 5rem;
    position: relative;
    overflow-x: visible;
    white-space: nowrap;
    border-radius: 0.3rem 0.3rem 0 0;
  }
  .classic-tabs .nav .logo-wrapper img{
    width: 3rem;
    height: 3rem;
  }

  .classic-tabs .nav li a {
    text-transform: none;
  }

  .tabs-orange {
    transition: all .3s;
    background-color: hsla(30, 100%, 48%, 0.562) !important;
  }
 

  .faded {
    opacity: 0.5;
  }

  .bold {
    font-weight: bold;
  }

  .background-orange {

    background-color: ${theme.orange} !important;
  }
  .background-orange2 {

    background-color: ${theme.orange_2} !important;
  }
  .background-white {

    background-color: ${theme.offWhite} !important;
  }
  .background-green {

    background-color: ${theme.green} !important;
  }
  .background-green-light {

    background-color: ${theme.greenLight} !important;
  }
  .background-turkize {

    background-color: ${theme.turkize} !important;
  }

  .green-gradient {
    background: linear-gradient(90deg, rgba(162,216,104,1) 0%, rgba(121,188,30,1) 50%);
  }

  .border-green {
    border-color: ${theme.green}
  }
  .border-bottom-turkize {
    border-bottom: 1px solid ${theme.turkizeLight}
  }
  .hide-content *{
    visibility: hidden;
    // background-color: #f57c00 !important;
  }
  .overlapblackbgFullScreen {
    right: 0;
    width: calc(100vw);
    height: 100vh;
    min-height: 100%;
    position: fixed;
    top: 0;
    // opacity: 0;
    // visibility: hidden;
    background-color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    z-index: 10;
  }

  .fullHeight{
    height: 90%;
  }
  .fullWidth{
    width: 100%;
  }
  .absCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .screenCenter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .screenTopCenter {
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .toggled {
    transition: .3s all;
 
  }

  .moveInRight-enter {
    margin-left: -240px !important;
  }
  // .moveInRight-enter-active {
  //   margin-left: 0 !important;
  //   transition: .3s all;
  // }
  .moveInRight-enter-done {
    margin-left: 0 !important;
    transition: .3s all;
  }
  .moveInRight-exit {
    margin-left: 0 !important;
    
  }
  .moveInRight-exit-active {
    margin-left: -240px !important;
    transition: .3s all;
  }
  .moveInRight-exit-done {
    margin-left: -240px !important;
    transition: .3s all;
  }

  .toggleAnimation {
    height: auto;
    max-height: 0;
    transition: .3s all;
  }
  
  .toggleAnimation-appear{
    opacity:0;
    max-height: 0;
  }
  .toggleAnimation-enter{
    opacity:0;
    max-height: 0;
  }
  
  .toggleAnimation-enter-done{
    /* transform: rotate(720deg) scale(3); */
    opacity:1;
    max-height: 60rem;
    /* transition: transform 1000ms, opacity 1000ms; */
  }
  
  .toggleAnimation-exit{
    
    opacity: 1;
    max-height: 60rem;
  }
  
  .toggleAnimation-exit-active{
    max-height: 0;
    /* transform:rotate(0deg) scale(1); */
    opacity: 0;
    /* transition: transform 1000ms, opacity 1000ms; */
  }



  
  
`;

export default GlobalStyle;
