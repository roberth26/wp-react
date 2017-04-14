import styled from 'styled-components';
import Color from '../../../dataTypes/Color';

// TODO: fix this
const bgColor = Color.fromHex( '#ff7746' );

export default styled.button`
    display: block;
    width: 100%;
    height: 50px;
    appearance: none;
    border: 0;
    font-family: 'museo-slab';
    cursor: pointer;
    padding: 0;
    font-size: 1.8rem;
    text-align: center;
    color: white;
    background-color: ${bgColor.toCss()};
    outline: 0;
    box-shadow: none;
    transition: all .5s ease;

    &:focus {
        outline: 0;
        box-shadow: 0 3px 7px rgba( 0, 0, 0, .1 );
    }

    &:hover {
        box-shadow: 0 4px 9px rgba( 0, 0, 0, .15 );
        background-color: ${Color.darken( Color.saturate( bgColor, 5 ), 5 ).toCss()};
    }
`;