import * as React from 'react';
import { withRouter } from 'react-router-dom';
import MenuItemModel from '../../models/MenuItem';
import Link from './primitives/Link';
import { CUSTOM } from '../../contracts/EMenuItemType';

interface IMenuItemProps {
    location?: any; // injected
    menuItem: MenuItemModel;
    children?: React.ReactChildren;
}

function MenuItem( props: IMenuItemProps ) {
    const { menuItem, location, children } = props;

    const active = location.pathname === menuItem.url;
    const external = menuItem.type === CUSTOM;

    return (
        <Link
            active={active}
            url={menuItem.url}
            external={external}
        >
            {children ? children : menuItem.title}
        </Link>
    );
}

export default withRouter( MenuItem );