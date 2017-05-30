import * as React from 'react';
import MenuItemModel from '../../models/MenuItem';
import Link from './primitives/Link';
import { CUSTOM } from '../../contracts/EMenuItemType';

interface IMenuItemProps {
    menuItem: MenuItemModel;
    active: boolean;
}

const MenuItem: React.SFC<IMenuItemProps> = props => {
    const { menuItem, active, children } = props;
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
};

export default MenuItem;