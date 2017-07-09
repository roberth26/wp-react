import * as React from 'react';
import styled from 'styled-components';

interface IContainerProps {
    inner?: boolean;
}

const Div = styled.div`
    max-width: calc( 100% - 32px );
    width: ${( props: IContainerProps ) => props.inner ? '798px' : '960px'};
    margin: 0 auto;

    @media ( min-width: 768px ) {
        max-width: 100%;
    }
`;

// strongly typed HOC
export default function Container( props: IContainerProps ) {
    return <Div {...props} />;
}