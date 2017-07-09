import styled from 'styled-components';

export default styled.div`
    flex: 1 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;

    @media ( min-width: 768px ) {
        max-width: calc( 100% - 96px );
    }
`;