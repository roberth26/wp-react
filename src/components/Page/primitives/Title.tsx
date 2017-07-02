import * as React from 'react';
import styled from 'styled-components';

interface ITitleProps {
    children?: React.ReactChildren;
    dark?: boolean;
}

const Title = styled.h1`
    font-size: 2.2rem;
    text-align: center;
    margin: 16px 0;
    color: ${( props: ITitleProps ) => props.dark ? 'black' : 'white'};

    @media ( min-width: 768px ) {
        font-size: 3.6rem;
        margin: 32px 0;
    }
`;

export default ( props: ITitleProps ) => <Title {...props} />;