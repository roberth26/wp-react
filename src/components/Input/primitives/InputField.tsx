import styled from 'styled-components';
import Color from '../../../dataTypes/Color';

// TODO: strong type props
export default styled.input`
    display: block;
    width: 100%;
    appearance: none;
    border: 0;
    border-bottom: 2px solid transparent;
    ${props => props.valid ? '' : 'border-bottom-color: #ff2517'};
    border-radius: 0;
    height: 50px;
    font-family: 'museo-slab';
    background-color: ${( props ) => {
        return Color.lighten( Color.saturate( props.baseColor, 20 ), 2 ).toCss();
    }};
    padding: 2px 16px 0 16px;
    color: white;
    font-size: 1.8rem;
    box-shadow: none;
    transition: all .75s ease;
    font-weight: 300;
    cursor: pointer;

    &:focus {
        outline: 0;
        box-shadow: 0 3px 7px rgba( 0, 0, 0, .1 );
    }

    &:hover {
        box-shadow: 0 4px 9px rgba( 0, 0, 0, .15 );
    }

    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: ${props => props.valid ? 'rgba( 0, 0, 0, .25 )' : 'rgba( 255, 37, 23, .5 )'};
    }

    &::-moz-placeholder { /* Firefox 19+ */
        color: ${props => props.valid ? 'rgba( 0, 0, 0, .25 )' : 'rgba( 255, 37, 23, .5 )'};
    }

    &:-ms-input-placeholder { /* IE 10+ */
        color: ${props => props.valid ? 'rgba( 0, 0, 0, .25 )' : 'rgba( 255, 37, 23, .5 )'};
    }

    &:-moz-placeholder { /* Firefox 18- */
        color: ${props => props.valid ? 'rgba( 0, 0, 0, .25 )' : 'rgba( 255, 37, 23, .5 )'};
    }
`;