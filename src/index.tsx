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

const connector = new Connector();

// ordered roughly by importance
connector.getTheme()
    .then( theme => globalStore.setTheme( theme ) );
connector.getPages()
    .then( pages => globalStore.addPage( ...pages ) );
connector.getProjectCategories()
    .then( projectCategories => portfolioStore.addProjectCategory( ...projectCategories ) );
connector.getMenus()
    .then( menus => globalStore.addMenu( ...menus ) );
connector.getProjectCategories()
    .then( projectCategories => portfolioStore.addProjectCategory( ...projectCategories ) );
connector.getProjects()
    .then( projects => portfolioStore.addProject( ...projects ) );
connector.getImages()
    .then( images => portfolioStore.addImage( ...images ) );
connector.getVideos()
    .then( videos => portfolioStore.addVideo( ...videos ) );
connector.getForms()
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