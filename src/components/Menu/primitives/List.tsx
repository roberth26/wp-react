import styled from 'styled-components';

export default styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    ${props => props.vertical ? 'flex-direction: column;' : ''}

    li {
        margin: ${props => props.vertical ? '16px 0' : '0 16px'};
    }

    svg {
        height: 24px !important;
        width: auto !important;
    }
`;