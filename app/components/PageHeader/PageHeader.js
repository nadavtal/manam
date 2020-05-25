import React, {useState} from 'react';
import Actions from '../Actions';
import TextSearch from '../../components/TextSearch/TextSearch'

const PageHeader = ({ 
    text,
    className,
    actions,
    iconColor,
    handleAction
}) => {

    return (
      <div className={className}>
        <div className="col-4">
          {/* <TextSearch
            className="ml-3 mt-0"
            value=""
            onChange={val => handleAction('search', val)}
          /> */}
        </div>
        <div className="col-4  pt-2">{text.toUpperCase()}</div>
        <div className="col-4">
          <div className="float-right">
            {actions && (
              <Actions
                actions={actions ? actions : []}
                iconColor={iconColor ? iconColor : 'default'}
                handleAction={actionName => handleAction(actionName)}
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default PageHeader