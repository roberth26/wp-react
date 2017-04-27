import * as React from 'react';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';

interface IAppBarProps {
    children?: React.ReactChildren;
    onBottom?: boolean;
    backgroundColor?: Color;
}

const Div = styled.div`
    position: fixed;
    ${( props: IAppBarProps ) => props.onBottom ? 'bottom: 0' : 'top: 0'};
    left: 0;
    width: 100%;
    background-color: ${( props: IAppBarProps ) => {
        return props.backgroundColor ? props.backgroundColor.toCss() : 'grey';
    }};
    color: white;
`;

// strongly typed HOC
export default function AppBar( props: IAppBarProps ) {
    return <Div {...props} />;
}