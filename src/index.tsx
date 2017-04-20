import * as React from 'react';
import { render } from 'react-dom';
import { runInAction } from 'mobx';
import { Provider } from 'mobx-react';
import { injectGlobal } from 'styled-components';
import 'reset-css/reset.css';
import WPConnector from './data/WPConnector';
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

Promise.all([
    WPConnector.getImages(),
    WPConnector.getVideos(),
    WPConnector.getProjects(),
    WPConnector.getProjectCategories(),
    WPConnector.getTheme(),
    WPConnector.getPages(),
    WPConnector.getForms(),
    WPConnector.getMenus()
]).then( values => {
    runInAction(() => {
        portfolioStore.images = values[ 0 ];
        portfolioStore.videos = values[ 1 ];
        portfolioStore.projects = values[ 2 ];
        portfolioStore.projectCategories = values[ 3 ];
        globalStore.theme = values[ 4 ];
        globalStore.pages = values[ 5 ];
        globalStore.forms = values[ 6 ];
        globalStore.menus = values[ 7 ];
    });
});

const stores = {
    globalStore,
    portfolioStore,
    theme: globalStore.theme
};
const rootComponent = (
    <Provider {...stores}>
        <App />
    </Provider>
);
const rootNode = document.getElementById( 'root' );

render( rootComponent, rootNode );