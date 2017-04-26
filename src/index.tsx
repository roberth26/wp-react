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

const portfolioStore = new PortfolioStore();
const globalStore = new GlobalStore();
const connector = new Connector( 1000 ); // 1s delay

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