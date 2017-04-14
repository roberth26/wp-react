import * as React from 'react';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';

interface IPageProps {
    children?: React.ReactChildren;
    backgroundColor: Color;
}

const Section = styled.section`
    background-color: ${( props: IPageProps ) => props.backgroundColor.toCss()};
    transition: background-color .33s ease;
    position: relative;
    min-height: 100vh;
    color: white;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
`;

// stongly typed HOC
export default ( props: IPageProps ) => <Section {...props} />;
/*
interface IPageThemedProps extends IPageProps {
    theme?: ThemeJson; // injected
}

// theme adapted HOC
export const PageThemed = withTheme( ( props: IPageThemedProps ) => {
    const { theme } = props;
    return (
        <Page
            {...props}
            bg={new Color( 255, 0, 0 )}
        />
    );
});
*/