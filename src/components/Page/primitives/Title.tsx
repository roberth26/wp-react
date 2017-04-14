import * as React from 'react';
import styled from 'styled-components';
import { withProperties } from 'react-property-provider';
import Page from '../../../models/Page';

interface ITitleProps {
    children?: React.ReactChildren;
    parentPage?: Page;
    dark?: boolean;
}

const H1 = styled.h1`
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 32px;
    color: ${( props: ITitleProps ) => props.dark ? 'black' : 'white'};
`;

// strongly typed HOC
function Title( props: ITitleProps ) {
    const { children, parentPage } = props;
    const dark = parentPage.backgroundColor.luminosity() > .5;

    return (
        <H1
            dark={dark}
            children={children}
        />
    );
}

export default withProperties( Title, 'parentPage' );