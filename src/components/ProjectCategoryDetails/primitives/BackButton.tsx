import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled( Link )`
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    justify-content: center;
    color: black;

    svg {
        font-size: 1.2rem;
    }
`;