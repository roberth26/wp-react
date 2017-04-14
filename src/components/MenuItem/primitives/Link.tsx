import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface ILinkProps {
    url: string;
    children?: React.ReactChildren;
    className: string;
    external?: boolean;
}

function BaseLink( props: ILinkProps ) {
    const { url, children, className, external } = props;

    if ( external ) {
        return (
            <a href={url} className={className}>{children}</a>
        );
    } else {
        return (
            <NavLink to={url} className={className}>{children}</NavLink>
        );
    }
}

export default styled( BaseLink )`
    color: ${props => props.active ? 'red' : 'black'};
    display: flex;
    align-items: center;
    text-decoration: none;
`;