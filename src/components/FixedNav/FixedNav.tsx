import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Menu from '../../models/Menu';
import MenuItem from '../MenuItem/MenuItem';
import Wrapper from './primitives/Wrapper';
import Dot from './primitives/Dot';
import List from './primitives/List';
import GlobalStore from '../../stores/GlobalStore';

interface INavProps {
    menu: Menu;
    globalStore?: GlobalStore; // injected
}

function FixedNav( { menu, globalStore }: INavProps ) {
    const { location } = globalStore;

    if ( !menu ) {
        return null;
    }

    const { items } = menu;

    return (
        <Wrapper>
            <List>
                {items.map( menuItem => (
                    <li key={menuItem.id}>
                        <MenuItem
                            location={location}
                            menuItem={menuItem}
                        >
                            <Dot />
                            <span>{menuItem.title}</span>
                        </MenuItem>
                    </li>
                ))}
            </List>
        </Wrapper>
    );
}

export default inject( 'globalStore' )( observer( FixedNav ) );