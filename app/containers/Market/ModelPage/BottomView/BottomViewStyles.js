import { css } from 'styled-components';

const bottomViewStyles = css`
  width: calc(100%);
  height: calc(40vh - 5rem);;
  position: absolute;
  left: 0;
  top: calc(60vh + 5rem);
  // border: 1px solid green;
  transition: .3s all;
  background-color: white;
  // &:active {
  //   // background: #41addd;
  //   color: #fff;
  // }
`;

export default bottomViewStyles;
