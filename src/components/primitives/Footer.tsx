import * as React from 'react';
import styled from 'styled-components';
import Color from '../../dataTypes/Color';

interface IFooterProps {
    children?: React.ReactChildren;
    backgroundColor?: Color;
}

const FooterStyles = styled.footer`
    display: block;
    background-color: ${( props: IFooterProps ) => {
        return `${props.backgroundColor ? props.backgroundColor.toCss() : 'grey'}`;
    }};
    padding: 32px 0 16px 0;
    box-shadow: inset 0 8px 16px -8px rgba( 0, 0, 0, .4 );
    text-align: center;
    color: white;

    @media ( min-width: 768px ) {
        padding: 64px 0 16px 0;
    }
`;

// strongly typed HOC
export default function Footer( props: IFooterProps ) {
    return <FooterStyles {...props} />;
}