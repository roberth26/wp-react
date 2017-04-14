import * as React from 'react';
import Menu from '../../models/Menu';
import MenuItemModel from '../../models/MenuItem';
import MenuItem from '../MenuItem/MenuItem';
import Wrapper from './primitives/Wrapper';
import { DotThemed } from './primitives/Dot';
import List from './primitives/List';

interface INavProps {
    menu: Menu;
}

export default function FixedNav( { menu }: INavProps ) {
    const { items } = menu;

    return (
        <Wrapper>
            <List>
                {items.map(( menuItem: MenuItemModel ) => (
                    <li key={menuItem.id}>
                        <MenuItem menuItem={menuItem}>
                            <DotThemed />
                            <span>{menuItem.title}</span>
                        </MenuItem>
                    </li>
                ))}
            </List>
        </Wrapper>
    );
}