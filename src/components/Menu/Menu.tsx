import * as React from 'react';
import { Route } from 'react-router-dom';
import MenuItemModel from '../../models/MenuItem';
import MenuModel from '../../models/Menu';
import MenuItem from '../MenuItem/MenuItem';
import List from './primitives/List';

interface IMenuProps {
    menu: MenuModel;
    vertical?: boolean;
}

const Menu: React.SFC<IMenuProps> = props => {
    const { menu, vertical = false } = props;

    if ( !menu ) {
        return null;
    }

    return (
        <nav>
            <List vertical={vertical}>
                {menu.items.map(( menuItem: MenuItemModel ) => (
                    <li key={menuItem.id}>
                        <Route
                            path={menuItem.url}
                            children={({ location }) => (
                                <MenuItem
                                    menuItem={menuItem}
                                    active={location.pathname === menuItem.url}
                                />
                            )}
                        />
                    </li>
                ))}
            </List>
        </nav>
    );
};

export default Menu;