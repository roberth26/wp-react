import { injectGlobal } from 'styled-components';

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
        height: auto;
    }

    a {
        text-decoration: none;
    }

    small {
        font-size: .75em;
    }
`;