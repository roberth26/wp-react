import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';
import ITheme from '../../../contracts/ITheme';

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

interface IAppBarThemedProps extends IAppBarProps {
    theme?: ITheme; // injected
}

// theme adapted HOC
export const AppBarThemed = inject( 'theme' )( observer(
    ( props: IAppBarThemedProps ) => {
        const { theme } = props;

        return (
            <AppBar
                backgroundColor={theme.footerColor}
                {...props}
            />
        );
    }
));