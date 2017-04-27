import * as React from 'react';
import Menu from '../../models/Menu';
import MenuItemModel from '../../models/MenuItem';
import MenuItem from '../MenuItem/MenuItem';
import Wrapper from './primitives/Wrapper';
import Dot from './primitives/Dot';
import List from './primitives/List';

interface INavProps {
    menu: Menu;
}

export default function FixedNav( { menu }: INavProps ) {
    if ( !menu ) {
        return null;
    }

    const { items } = menu;

    return (
        <Wrapper>
            <List>
                {items.map(( menuItem: MenuItemModel ) => (
                    <li key={menuItem.id}>
                        <MenuItem menuItem={menuItem}>
                            <Dot />
                            <span>{menuItem.title}</span>
                        </MenuItem>
                    </li>
                ))}
            </List>
        </Wrapper>
    );
}