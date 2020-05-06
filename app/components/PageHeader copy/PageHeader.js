import React, {useState} from 'react';

const PageHeader = ({ 
    text,
    className,
    textColor
}) => {

    return (
      <div className={className}>
        <div className="col-4">
          <div className="float-left" />
        </div>
        <div className="col-4  pt-2">
          {text.toUpperCase()}
        </div>
        <div className="col-4">
          <div className="float-right">
            {/* {actions[activeItemClassicTabs3] && (
              <Actions
                actions={actions[activeItemClassicTabs3].generalActions}
                iconColor="white"
              />
            )} */}
          </div>
        </div>
      </div>
    );
}

export default PageHeader