import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
            ? globalStore.menus.find( m => m.themeLocation === SIDE )
            : null;

        return (
            <Router basename={basename}>
                <div>
                    <Route
                        path={'/:pageUrl'}
                        render={({ match }) => {
                            const activePage = pages.find( p => {
                                return p.url.indexOf( match.params.pageUrl ) > -1;
                            });

                            return (
                                <PageScroller
                                    pages={pages}
                                    activePage={activePage}
                                />
                            );
                        }}
                    />
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