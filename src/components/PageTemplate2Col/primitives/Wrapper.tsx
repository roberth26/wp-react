import styled from 'styled-components';

export default styled.div`
    flex-direction: column-reverse;

    @media ( min-width: 768px ) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
`;