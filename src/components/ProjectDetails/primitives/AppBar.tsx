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
    height: 50px;
    background-color: ${( props: IAppBarProps ) => {
        return props.backgroundColor ? props.backgroundColor.toCss() : 'grey';
    }};
    color: white;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;

    h2 {
        text-align: center;
        line-height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d( -50%, -50%, 0 );
        color: white;
    }

    a {
        cursor: pointer;
    }

    .close-btn svg {
        margin-left: -8px;
    }
`;

// strongly typed HOC
export default function AppBar( props: IAppBarProps ) {
    return <Div {...props} />;
}