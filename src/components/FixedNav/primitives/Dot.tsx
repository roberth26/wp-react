import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';
import GlobalStore from '../../../stores/GlobalStore';

interface IDotProps {
    color?: Color;
    size?: number;
    globalStore?: GlobalStore; // injected;
}

const Div = styled.div`
    width: ${( props: IDotProps ) => `${props.size ? props.size : 16}px`};
    width: ${( props: IDotProps ) => `${props.size ? props.size : 16}px`};
    border-radius: 50%;
    margin-right: ${( props: IDotProps ) => `${props.size ? props.size : 16}px`};
    border: ${( props: IDotProps ) => {
        return `8px solid ${props.color ? props.color.toCss() : 'white'}`;
    }};
    transition: all .25s ease;
    transform: none;

    &:hover {
        transform: scale3d( 2, 2, 1 );
        background: transparent;
        border: ${( props: IDotProps ) => {
            return `1px solid ${props.color ? props.color.toCss() : 'white'}`;
        }};
    }
`;

// strongly typed HOC
function Dot( props: IDotProps ) {
    const { globalStore } = props;
    const currentPage = globalStore.currentPage;
    const theme = globalStore.theme;

    let { size } = props;
    if ( !size ) {
        size = theme.spacingUnit;
    }

    let { color } = props;
    if ( !color && theme && currentPage ) {
        const pageColor = currentPage.backgroundColor;
        const potentialColors = [ theme.primaryFontColor, theme.secondaryFontColor ];
        color = Color.findMostContrastingColor( potentialColors, pageColor );
    }

    return <Div color={color} size={size} />;
}

export default inject( 'globalStore' )( observer( Dot ) );