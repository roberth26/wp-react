import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import MenuItemModel from '../../models/MenuItem';
import Link from './primitives/Link';
import { CUSTOM, PROJECT } from '../../contracts/EMenuItemType';
import { PORTFOLIO } from '../../contracts/ETemplate';

interface IMenuItemProps {
    globalStore?: GlobalStore; // injected
    location?: any; // injected
    menuItem: MenuItemModel;
    children?: React.ReactChildren;
}

function MenuItem( props: IMenuItemProps ) {
    const { globalStore, menuItem, location, children } = props;
    const { pages } = globalStore;

    let external = false;
    let url;
    if ( menuItem.type === CUSTOM ) {
        external = true;
        url = menuItem.url;
    } else if ( menuItem.type === PROJECT ) {
        url = menuItem.target.url;
        const portfolioPage = pages.find( p => p.template === PORTFOLIO );
        if ( portfolioPage ) {
            url = portfolioPage.url + url;
        }
    } else {
        url = menuItem.target.url;
    }

    const active = location.pathname === url;

    return (
        <Link
            active={active}
            url={url}
            external={external}
        >
            {children ? children : menuItem.title}
        </Link>
    );
}

export default inject( 'globalStore' )( observer( withRouter( MenuItem ) ) );