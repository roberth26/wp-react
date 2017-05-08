import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { createBrowserHistory, Location } from 'history';
import 'reset-css/reset.css';
import './global-styles';
import Connector from './data/WPDOMConnector';
import GlobalStore from './stores/GlobalStore';
import PortfolioStore from './stores/PortfolioStore';
import AppContainer from './containers/AppContainer/AppContainer';
import basename from './utils/basename';

const portfolioStore = new PortfolioStore();
const globalStore = new GlobalStore();

const browserHistory = createBrowserHistory({ basename });
browserHistory.listen( ( location: Location ) => {
    globalStore.setLocation( location );
});

// simulate latency during testing
// const delay = location.hostname === 'localhost' ? 1000 : 0;
const delay = 0;
const connector = new Connector();

// ordered roughly by importance
connector.getTheme( delay )
    .then( theme => globalStore.setTheme( theme ) );
connector.getPages( delay * 1.25 )
    .then( pages => globalStore.addPage( ...pages ) );
connector.getProjectCategories( delay * 1.5 )
    .then( projectCategories => portfolioStore.addProjectCategory( ...projectCategories ) );
connector.getMenus( delay * 1.75 )
    .then( menus => globalStore.addMenu( ...menus ) );
connector.getProjectCategories( delay * 2 )
    .then( projectCategories => portfolioStore.addProjectCategory( ...projectCategories ) );
connector.getProjects( delay * 2.25 )
    .then( projects => portfolioStore.addProject( ...projects ) );
connector.getImages( delay * 2.5 )
    .then( images => portfolioStore.addImage( ...images ) );
connector.getVideos( delay * 2.75 )
    .then( videos => portfolioStore.addVideo( ...videos ) );
connector.getForms( delay * 3 )
    .then( forms => globalStore.addForm( ...forms ) );

const injected = {
    theme: globalStore.theme,
    connector,
    globalStore,
    portfolioStore
};

const rootComponent = (
    <Provider {...injected}>
        <Router
            basename={basename}
            history={browserHistory}
        >
            <AppContainer />
        </Router>
    </Provider>
);
const rootNode = document.getElementById( 'root' );

render( rootComponent, rootNode );