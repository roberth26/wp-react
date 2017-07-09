import styled from 'styled-components';

export default styled.a`
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        margin-left: -8px;
        font-size: 1.2rem;
    }

    &:last-of-type svg {
        margin: 0 -8px 0 0;
    }
`;