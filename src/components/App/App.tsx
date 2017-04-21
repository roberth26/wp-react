import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import PageScroller from '../PageScroller/PageScroller';
import FixedNav from '../FixedNav/FixedNav';
import { SIDE } from '../../contracts/EMenuLocation';

// prefix router base path for dev environment TODO: move to build process
const basename = location.hostname === 'localhost' ? '/caitlyn' : '';

interface IAppProps {
    globalStore?: GlobalStore; // injected
}

@inject( 'globalStore' )
@observer
export default class App extends React.Component<IAppProps, {}> {
    render() {
        const { globalStore } = this.props;
        const { pages } = globalStore;

        if ( !pages ) {
            return null;
        }

        const fixedMenu = globalStore.menus
            ? globalStore.menus.get( SIDE )
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
                    <FixedNav menu={fixedMenu} />
                </div>
            </Router>
        );
    }
}