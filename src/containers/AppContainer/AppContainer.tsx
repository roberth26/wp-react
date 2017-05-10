import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import PageScroller from '../../components/PageScroller/PageScroller';
import FixedNav from '../../components/FixedNav/FixedNav';
import { SIDE_MENU, FOOTER_MENU, SOCIAL_MENU, FOOTER_AREA } from '../../contracts/EThemeLocation';
import Footer from '../../components/primitives/Footer';
import ITheme from '../../contracts/ITheme';
import Container from '../../components/primitives/Container';
import Menu from '../../components/Menu/Menu';
import FooterContent from '../../components/primitives/FooterContent';
// import { leadingSlash } from '../../utils/Formatting';

interface IAppProps {
    globalStore?: GlobalStore; // injected
    theme?: ITheme;
}

@inject( 'globalStore' )
@observer
export default class AppContainer extends React.Component<IAppProps, {}> {
    render() {
        const { globalStore } = this.props;
        const { theme, pages } = globalStore;

        if ( !theme ) {
            return null;
        }

        if ( !pages ) {
            return null;
        }

        const fixedMenu = globalStore.menus
            ? globalStore.getMenuByThemeLocation( SIDE_MENU )
            : null;

        const footerWidgetArea = globalStore.getWidgetArea( FOOTER_AREA );
        const footerContent = footerWidgetArea ? footerWidgetArea.content : null;
        const footerMenu = globalStore.getMenuByThemeLocation( FOOTER_MENU );
        const socialMenu = globalStore.getMenuByThemeLocation( SOCIAL_MENU );

        return (
            <div>
                <Switch>
                    <Route
                        path={'/'}
                        exact={true}
                        component={PageScroller}
                    />
                    {pages.map( page => (
                        <Route
                            key={page.id}
                            path={page.url}
                            component={PageScroller}
                        />
                    ))}
                    {/*<Redirect to={'/'} />*/}
                </Switch>
                <Footer backgroundColor={theme.footerColor}>
                    <Container>
                        <Menu menu={footerMenu} />
                        <Menu menu={socialMenu} />
                        <FooterContent>
                            {footerContent}
                        </FooterContent>
                    </Container>
                </Footer>
                <FixedNav menu={fixedMenu} />
            </div>
        );
    }
}