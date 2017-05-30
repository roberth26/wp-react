import * as React from 'react';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';
import Page from '../../../models/Page';
import Theme from '../../../models/Theme';

interface IDotProps {
    color?: Color;
    size?: number;
    parentPage?: Page;
    theme?: Theme;
}

const Div = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &:before {
        content: '';
        width: ${( props: IDotProps ) => `${props.size ? props.size : 16}px`};
        height: ${( props: IDotProps ) => `${props.size ? props.size : 16}px`};
        border-radius: 50%;
        margin-right: ${( props: IDotProps ) => `${props.size ? props.size : 16}px`};
        border: ${( props: IDotProps ) => {
            return `8px solid ${props.color ? props.color.toCss() : 'white'}`;
        }};
        transition: all .25s ease;
        transform: none;
    }

    & > div {
        pointer-events: none;
        opacity: 0;
        transition: all .25s ease;
        max-width: 0;
        overflow: visible;
        white-space: nowrap;
    }

    &:hover {
        &:before {
            transform: scale3d( 2, 2, 1 );
            background: transparent;
            border: ${( props: IDotProps ) => {
                return `1px solid ${props.color ? props.color.toCss() : 'white'}`;
            }};
        }

        & > div {
            opacity: 1;
        }
    }
`;

// strongly typed HOC
const Dot: React.SFC<IDotProps> = props => {
    const { parentPage, theme, children } = props;

    let { size } = props;
    if ( !size ) {
        size = theme.spacingUnit;
    }

    let { color } = props;
    if ( !color && theme && parentPage ) {
        const pageColor = parentPage.backgroundColor;
        const potentialColors = [ theme.primaryFontColor, theme.secondaryFontColor ];
        color = Color.findMostContrastingColor( potentialColors, pageColor );
        color = color ? color : theme.primaryFontColor;
    }

    return (
        <Div
            color={color}
            size={size}
        >
            <div>{children}</div>
        </Div>
    );
};

export default Dot;