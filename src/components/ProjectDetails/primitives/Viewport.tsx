import styled from 'styled-components';

export default styled.div`
    position: relative;
    height: 0;
    padding-top: 56.25%;
    overflow: hidden;

    img,
    iframe {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d( -50%, -50%, 0 );
        height: 100%;
    }

    img {
        max-width: initial;
    }

    iframe {
        width: 100%;
    }

    .button {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY( -50% );
        z-index: 10;
        opacity: 0;
        transition: all .25s ease;
        background-color: rgba( 0, 0, 0, .75 );
        padding: 16px 16px 16px 12px;
        color: white;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:last-of-type {
            left: initial;
            right: 0;
            padding: 16px 12px 16px 16px;
        }
    }

    @media ( min-width: 768px ) {
        &:hover {        
            .button {
                opacity: 1;
            }
        }
    }
`;