import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import PageScroller from '../../components/PageScroller/PageScroller';
import FixedNav from '../../components/FixedNav/FixedNav';
import { SIDE } from '../../contracts/EThemeLocation';
import Footer from '../../components/primitives/Footer';
import ITheme from '../../contracts/ITheme';
import Container from '../../components/primitives/Container';

// prefix router base path for dev environment TODO: move to build process
const basename = location.hostname === 'localhost' ? '/caitlyn' : '';

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
            <Router basename={basename}>
                <div>
                    <Switch>
                        {pages.map( page => (
                            <Route
                                key={page.id}
                                path={page.url}
                                render={() => (
                                    <PageScroller
                                        pages={pages}
                                        activePage={page}
                                    />
                                )}
                            />
                        ))}
                        <Route
                            path={'/'}
                            exact={true}
                            render={() => (
                                <PageScroller
                                    pages={pages}
                                    activePage={pages[ 0 ]}
                                />
                            )}
                        />
                        <Redirect to={'/'} />
                    </Switch>
                    <Footer backgroundColor={theme.footerColor}>
                        <Container>
                            <h1>Footer</h1>
                        </Container>
                    </Footer>
                    <FixedNav menu={fixedMenu} />
                </div>
            </Router>
        );
    }
}