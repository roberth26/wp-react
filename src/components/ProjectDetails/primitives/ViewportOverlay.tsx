import styled from 'styled-components';

export default styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
        display: none;
    }

    @media ( min-width: 768px ) {
        &:hover {
            & > * {
                display: block;
            }
        }
    }
`;