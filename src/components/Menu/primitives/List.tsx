import * as React from 'react';
import styled from 'styled-components';

interface IListProps {
    onBottom?: boolean;
}

const UnorderedList = styled.ul`
    list-style: none;
    ${( props: IListProps ) => {
        return props.onBottom ? `
            position: absolute;
            bottom: 32px;
            left: 0;
            right: 0;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        ` : '';
    }}
`;

// strongly typed HOC
export default function List( props: IListProps ) {
    return <UnorderedList {...props} />;
}