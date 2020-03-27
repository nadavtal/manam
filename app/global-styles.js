import { createGlobalStyle } from 'styled-components';

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
  .tabs-orange .active {

    background-color: #f57c00 !important;
  }

  .faded {
    opacity: 0.5;
  }
`;

export default GlobalStyle;