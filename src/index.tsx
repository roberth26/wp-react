import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { injectGlobal } from 'styled-components';
import 'reset-css/reset.css';
import Connector from './data/WPDOMConnector';
import GlobalStore from './stores/GlobalStore';
import PortfolioStore from './stores/PortfolioStore';
import App from './components/App/App';

injectGlobal`
    html {
        font-size: 62.5%; // 10px
    }

    body {
        font-size: 1.6rem; // 16px
        font-family: 'museo-slab';
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
    }

    a {
        text-decoration: none;
    }
`;

// TODO: move to build process
// simulate latency during testing
const delay = location.hostname === 'localhost' ? 1000 : 0;
const portfolioStore = new PortfolioStore();
const globalStore = new GlobalStore();
const connector = new Connector();

// ordered roughly by importance
connector.getTheme( delay )
    .then( theme => globalStore.setTheme( theme ) );
connector.getPages( delay * 2 )
    .then( pages => globalStore.addPage( ...pages ) );
connector.getProjectCategories( delay * 3 )
    .then( projectCategories => portfolioStore.addProjectCategory( ...projectCategories ) );
connector.getMenus( delay * 4 )
    .then( menus => globalStore.addMenu( ...menus ) );
connector.getProjectCategories( delay * 5 )
    .then( projectCategories => portfolioStore.addProjectCategory( ...projectCategories ) );
connector.getProjects( delay * 6 )
    .then( projects => portfolioStore.addProject( ...projects ) );
connector.getImages( delay * 7 )
    .then( images => portfolioStore.addImage( ...images ) );
connector.getVideos( delay * 8 )
    .then( videos => portfolioStore.addVideo( ...videos ) );
connector.getForms( delay * 9 )
    .then( forms => globalStore.addForm( ...forms ) );

const injected = {
    connector,
    globalStore,
    portfolioStore,
    theme: globalStore.theme
};
const rootComponent = (
    <Provider {...injected}>
        <App />
    </Provider>
);
const rootNode = document.getElementById( 'root' );

render( rootComponent, rootNode );