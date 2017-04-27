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
`;

// strongly typed HOC
export default function Footer( props: IFooterProps ) {
    return <FooterStyles {...props} />;
}