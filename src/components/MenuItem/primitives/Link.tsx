import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Color from '../../../dataTypes/Color';
import GlobalStore from '../../../stores/GlobalStore';

interface IBaseLinkProps {
    url: string;
    className?: string;
    external?: boolean;
    active: boolean;
}

const BaseLink: React.SFC<IBaseLinkProps> = props => {
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
};

interface IStyledBaseLinkProps extends IBaseLinkProps {
    color: Color;
}

const StyledBaseLink = styled( BaseLink )`
    color: ${( props: IStyledBaseLinkProps ) => props.color.toCss()};
    display: flex;
    align-items: center;
    text-decoration: none !important;
    transition: all .25s ease;
    opacity: ${( props: IStyledBaseLinkProps ) => props.active ? 1 : .5 };

    &:hover {
        opacity: 1;
    }
`;

interface ILinkProps extends IBaseLinkProps {
    active: boolean;
    globalStore?: GlobalStore; // injected
}

const Link: React.SFC<ILinkProps> = props => {
    const { globalStore, active = true } = props;

    if ( !globalStore ) {
        return null;
    }

    const { currentPage, theme } = globalStore;
    let color;
    if ( theme && currentPage ) {
        const pageColor = currentPage.backgroundColor;
        const potentialColors = [ theme.primaryFontColor, theme.secondaryFontColor ];
        color = Color.findMostContrastingColor( potentialColors, pageColor );
        color = color ? color :  new Color( 255, 255, 255 );
    } else {
        color = new Color( 255, 255, 255 );
    }

    return (
        <StyledBaseLink
            {...props}
            color={color}
            active={active}
        />
    );
};

export default inject( 'globalStore', 'theme' )( observer( Link ) );