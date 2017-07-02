import * as React from 'react';
import styled from 'styled-components';

interface IColumnProps {
    children?: React.ReactChildren;
    width?: number; // percent
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;

    @media ( min-width: 768px ) {
        margin-bottom: 0;
        width: ${( props: IColumnProps ) => {
            return props.width
                ? `calc( ${props.width}% - 16px )`
                : 'calc( 100% - 16px )';
        }};
    }
`;

// strongly typed HOC
export default function Column( props: IColumnProps ) {
    return <Div {...props} />;
}