import styled from 'styled-components';

export default styled.div`
    position: relative;
    float: left;
    width: calc( 1 / 3 * 100% );
    padding-top: calc( 1 / 3 * 100% );
    height: 0;
    cursor: pointer;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        ${props => props.active ? 'border: 2px solid black;' : ''}
    }

    img {
        max-width: initial;
    }

    & > * {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d( -50%, -50%, 0 );
        height: 100%;
    }

    @media ( min-width: 768px ) {
        width: calc( 1 / 6 * 100% );
        padding-top: calc( 1 / 6 * 100% );
    }
`;