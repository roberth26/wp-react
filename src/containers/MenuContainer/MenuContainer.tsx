import * as React from 'react';
import { inject, observer } from 'mobx-react';
import GlobalStore from '../../stores/GlobalStore';
import Menu from '../../components/Menu/Menu';

interface IMenuContainer {
    globalStore?: GlobalStore; // injected
    menuId: number;
    vertical?: boolean;
}

@inject( 'globalStore' )
@observer
export default class MenuContainer extends React.Component<IMenuContainer, {}> {
    render() {
        const { globalStore, menuId, vertical } = this.props;
        const menu = globalStore.getMenuById( menuId );

        return (
            <Menu
                menu={menu}
                vertical={vertical}
            />
        );
    }
}