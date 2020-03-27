import React from 'react';
import './IconButtonToolTip.css';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBIcon } from "mdbreact"

const IconButtonToolTip = (props) => {

  return (
    <div
      onClick={props.onClickFunction}
      className={props.className}

         >
      <a data-tip data-for={props.toolTipText}>
        <MDBIcon icon={props.iconName}
          size={props.size ? props.size : 'sm'}
          className={props.iconClassName}
          border={props.border}
          rotate={props.rotate}
          pulse={props.pulse}
          spin={props.spin}
          far={props.far}/>
        {/* <FontAwesomeIcon icon={props.iconName} /> */}
      </a>
      <ReactTooltip
        id={props.toolTipText}
        type={props.toolTipType}
        place={props.toolTipPosition}
        effect={props.toolTipEffect}>
        <span>{props.toolTipText}</span>
      </ReactTooltip>
    </div>
  )
}

export default IconButtonToolTip
