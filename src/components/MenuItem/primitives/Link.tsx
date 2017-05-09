import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';
import GlobalStore from '../../../stores/GlobalStore';

interface IBaseLinkProps {
    url: string;
    children?: React.ReactChildren;
    className?: string;
    external?: boolean;
}

function BaseLink( props: IBaseLinkProps ) {
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

interface IStyledBaseLinkProps {
    color: Color;
}

const StyledBaseLink = styled( BaseLink )`
    color: ${( props: IStyledBaseLinkProps ) => props.color.toCss()};
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all .25s ease;
    
`;

interface ILinkProps extends IBaseLinkProps {
    active: boolean;
    globalStore?: GlobalStore; // injected
}

function Link( props: ILinkProps ) {
    const { active, globalStore, children } = props;
    if ( !globalStore ) {
        return null;
    }
    const { currentPage, theme } = globalStore;
    let color = new Color( 255, 255, 255 );
    if ( globalStore.theme && currentPage ) {
        const pageColor = currentPage.backgroundColor;
        const potentialColors = [ theme.primaryFontColor, theme.secondaryFontColor ];
        color = Color.findMostContrastingColor( potentialColors, pageColor );
    }

    return <StyledBaseLink {...props} color={color} />;
}

export default inject( 'globalStore', 'theme' )( observer( Link ) );