import styled from 'styled-components';

export default styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    
    & > * {
        flex: 1;
    }

    h3 {
        font-size: 1.8rem;
        margin-bottom: 8px;
        font-weight: bold;
    }

    li {
        margin-bottom: 8px;
    }
`;