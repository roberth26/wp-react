import * as React from 'react';
import { Location } from 'history';
import MenuItemModel from '../../models/MenuItem';
import Link from './primitives/Link';
import { CUSTOM } from '../../contracts/EMenuItemType';

interface IMenuItemProps {
    location: Location;
    menuItem: MenuItemModel;
    children?: React.ReactChildren;
}

export default function MenuItem( props: IMenuItemProps ) {
    const { menuItem, location, children } = props;

    if ( !location ) {
        return null;
    }

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