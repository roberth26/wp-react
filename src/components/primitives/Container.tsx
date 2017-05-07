import * as React from 'react';
import styled from 'styled-components';

interface IContainerProps {
    inner?: boolean;
}

const Div = styled.div`
    max-width: 100%;
    width: ${( props: IContainerProps ) => props.inner ? '798px' : '960px'};
    padding: 0 16px;
    margin: 0 auto;

    @media ( min-width: 768px ) {
        max-width: calc( 100% - 64px );
    }
`;

// strongly typed HOC
export default function Container( props: IContainerProps ) {
    return <Div {...props} />;
}