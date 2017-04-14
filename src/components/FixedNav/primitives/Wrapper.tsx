import styled from 'styled-components';

export default styled.nav`
    display: none;

    @media ( min-width: 768px ) {
        display: block;
        position: fixed;
        top: 50%;
        left: 16px;
        transform: translateY( -50% );
    }
`;