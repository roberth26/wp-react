import * as React from 'react';
import { inject, observer } from 'mobx-react';
import GlobalStore from '../../stores/GlobalStore';
import { START_MENU } from '../../contracts/EThemeLocation';
import Menu from '../../components/Menu/Menu';
import Page, { IPageProps } from '../../components/Page/Page';
import BottomContent from './primitives/BottomContent';

interface IPageContainerProps extends IPageProps {
    globalStore?: GlobalStore; // injected
}

@inject( 'globalStore' )
@observer
export default class PageContainer extends React.Component<IPageContainerProps, {}> {
    render() {
        const { globalStore, page, innerRef } = this.props;
        let { oblique, zIndex } = this.props;

        const menuModel = globalStore.menus.find( m => m.themeLocation === START_MENU );
        const menu = page.order === 0
            ? <Menu menu={menuModel} />
            : null;

        const index = globalStore.pages.indexOf( page );
        zIndex = globalStore.pages.length - index;
        oblique = oblique
            ? oblique
            : index < globalStore.pages.length - 1;

        return (
            <Page
                page={page}
                zIndex={zIndex}
                innerRef={innerRef}
                oblique={oblique}
            >
                <BottomContent>
                    {menu}
                </BottomContent>
            </Page>
        );
    }
}