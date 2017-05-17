import { injectGlobal } from 'styled-components';

injectGlobal`
    html {
        font-size: 62.5%; // 10px
        height: 100%;
    }

    body {
        font-size: 1.6rem; // 16px
        font-family: 'museo-slab';
        height: 100%;
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