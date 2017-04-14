import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { injectGlobal } from 'styled-components';
import 'reset-css/reset.css';
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

const domDataJson = window[ '__PORTFOLIO_DATA__' ];
const portfolioStore = new PortfolioStore( domDataJson );
const globalStore = new GlobalStore( portfolioStore, domDataJson );
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