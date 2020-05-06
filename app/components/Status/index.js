import React, { memo } from 'react'
import styled from 'styled-components';
import { MDBBadge } from "mdbreact";

const Status = ({status}) => {
    const Wrapper = styled.span`
        background-color: ${status.color};
    
        // &:hover {
        // color: #6cc0e5;
        // }
    `;
    return <MDBBadge
    className="p-1" 
    pill
    color={status.color}>
        {status.name}
    </MDBBadge>
}

export default Status