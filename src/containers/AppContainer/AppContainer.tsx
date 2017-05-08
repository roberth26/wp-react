import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import PageScroller from '../../components/PageScroller/PageScroller';
import FixedNav from '../../components/FixedNav/FixedNav';
import { SIDE, FOOTER } from '../../contracts/EThemeLocation';
import Footer from '../../components/primitives/Footer';
import ITheme from '../../contracts/ITheme';
import Container from '../../components/primitives/Container';
import Menu from '../../components/Menu/Menu';
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
            ? globalStore.getMenuByThemeLocation( SIDE )
            : null;

        return (
            <div>
                <Switch>
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
                        <h1>Footer</h1>
                        <Menu menu={globalStore.getMenuByThemeLocation( FOOTER )} />
                    </Container>
                </Footer>
                <FixedNav menu={fixedMenu} />
            </div>
        );
    }
}