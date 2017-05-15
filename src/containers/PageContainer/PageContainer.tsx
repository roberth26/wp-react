import * as React from 'react';
import { inject, observer } from 'mobx-react';
import GlobalStore from '../../stores/GlobalStore';
import { START_MENU } from '../../contracts/EThemeLocation';
import Menu from '../../components/Menu/Menu';
import Page, { IPageProps } from '../../components/Page/Page';

interface IPageContainerProps extends IPageProps {
    globalStore?: GlobalStore; // injected
}

@inject( 'globalStore' )
@observer
export default class PageContainer extends React.Component<IPageContainerProps, {}> {
    render() {
        const { globalStore, page, children, innerRef } = this.props;
        let { oblique, zIndex } = this.props;

        const menu = page.order === 0
            ? <Menu
                menu={globalStore.menus.find( m => m.themeLocation === START_MENU )}
                onBottom={true}
            />
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
                {menu}
                {children}
            </Page>
        );
    }
}