import styled from 'styled-components';

export default styled.div`
    background-color: rgba( 0, 0, 0, .1 );
    margin-bottom: 16px;
    
    &:after {
        content: '';
        display: table;
        clear: both;
    }
`;