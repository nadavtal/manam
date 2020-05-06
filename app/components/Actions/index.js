import React, {useState} from 'react';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip';
const Actions = ({ 
    actions,
    className,
    iconColor,
    handleAction
}) => {

    return (
      <div className={`text-right d-flex p-2 ${className}`}>
        {actions &&
          actions.map(action => (
            <IconButtonToolTip
              key={action.name}
              iconName={action.icon}
              toolTipType={action.type}
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText={action.name}
              className={`mx-2 text-${iconColor}`}
              onClickFunction={() => handleAction(action.name)}
            />
          ))}
      </div>
    );
}

export default Actions