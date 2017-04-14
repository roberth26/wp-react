import styled from 'styled-components';

export default styled.img`
    float: left;
    width: calc( 1 / 3 * 100% );
    height: auto;
    cursor: pointer;
    ${props => props.active ? 'border: 1px solid black;' : ''}

    @media ( min-width: 768px ) {
        width: calc( 1 / 6 * 100% );
    }
`;