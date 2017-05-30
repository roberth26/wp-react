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

const FixedNav: React.SFC<INavProps> = props => {
    const { globalStore, menu } = props;

    if ( !menu || !globalStore ) {
        return null;
    }

    const { location, currentPage, theme } = globalStore;

    if ( !location ) {
        return null;
    }

    const { items } = menu;

    return (
        <Wrapper>
            <List>
                {items.map( menuItem => (
                    <li key={menuItem.id}>
                        <MenuItem
                            active={location.pathname === menuItem.url}
                            menuItem={menuItem}
                        >
                            <Dot
                                parentPage={currentPage}
                                theme={theme}
                            >
                                {menuItem.title}
                            </Dot>
                        </MenuItem>
                    </li>
                ))}
            </List>
        </Wrapper>
    );
};

export default inject( 'globalStore' )( observer( FixedNav ) );