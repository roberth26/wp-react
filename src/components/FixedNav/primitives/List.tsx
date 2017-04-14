import styled from 'styled-components';

export default styled.ul`
    list-style: none;

    li {
        display: flex;
        margin-bottom: 16px;

        &:last-of-type {
            margin-bottom: 0;
        }
    }
`;