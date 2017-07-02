import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 -16px;

    & > * {
        flex-basis: calc( 1 / 3 * 100% - ( 64px / 2 ) );
        margin: 0 16px;
    }
`;