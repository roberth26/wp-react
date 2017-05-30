import * as React from 'react';
import { Route } from 'react-router-dom';
import MenuItemModel from '../../models/MenuItem';
import MenuModel from '../../models/Menu';
import MenuItem from '../MenuItem/MenuItem';
import Wrapper from './primitives/Wrapper';
import List from './primitives/List';
import ListItem from './primitives/ListItem';

interface IMenuProps {
    menu: MenuModel;
    onBottom?: boolean;
}

const Menu: React.SFC<IMenuProps> = props => {
    const { menu, onBottom } = props;

    if ( !menu ) {
        return null;
    }

    return (
        <Wrapper onBottom={onBottom}>
            <List>
                {menu.items.map(( menuItem: MenuItemModel ) => (
                    <ListItem key={menuItem.id}>
                        <Route
                            path={menuItem.url}
                            children={({ location }) => (
                                <MenuItem
                                    menuItem={menuItem}
                                    active={location.pathname === menuItem.url}
                                />
                            )}
                        />
                    </ListItem>
                ))}
            </List>
        </Wrapper>
    );
};

export default Menu;