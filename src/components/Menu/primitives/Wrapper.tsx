import * as React from 'react';
import styled from 'styled-components';

interface IWrapperProps {
    onBottom?: boolean;
}

const StyledNav = styled.nav`
    ${( props: IWrapperProps ) => {
        return props.onBottom ? `
            position: absolute;
            bottom: 32px;
            left: 0;
            right: 0;
            margin: 0 auto;
        ` : '';
    }}
`;

// strongly typed HOC
export default function Wrapper( props: IWrapperProps ) {
    return <StyledNav {...props} />;
}