import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';
import ITheme from '../../../contracts/ITheme';

interface IDotProps {
    color?: Color;
}

const Div = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 16px;
    border: ${( props: IDotProps ) => {
        return `8px solid ${props.color ? props.color.toCss() : 'white'}`;
    }};
    transition: all .25s ease;

    &:hover {
        transform: scale( 2 );
        background: transparent;
        border: ${( props: IDotProps ) => {
            return `1px solid ${props.color ? props.color.toCss() : 'white'}`;
        }};
    }
`;

// strongly typed HOC
export default function Dot( props: IDotProps ) {
    return <Div {...props} />;
}

interface IDotThemedProps extends IDotProps {
    theme?: ITheme; // injected
}

// theme adapted HOC
export const DotThemed = inject( 'theme' )( observer(
    ( props: IDotThemedProps ) => {
        const { theme } = props;
        const color = theme ? theme.footerColor : new Color( 255, 255, 255 );

        return (
            <Dot
                color={color}
                {...props}
            />
        );
    }
));