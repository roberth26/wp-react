import * as React from 'react';
import styled from 'styled-components';

interface ITitleProps {
    children?: React.ReactChildren;
    dark?: boolean;
}

const Title = styled.h1`
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 32px;
    color: ${( props: ITitleProps ) => props.dark ? 'black' : 'white'};
`;

export default ( props: ITitleProps ) => <Title {...props} />;