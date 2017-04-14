import styled from 'styled-components';

export default styled.div`
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    height: calc( 100vh - 100px );
	width: 100vw;
	margin: 0 auto;
    background-color: ${props => props.backgroundColor.toCss()};
    box-shadow: 0 8px rgba( 0, 0, 0, .25 );
    overflow-y: auto;
    color: black;
`;