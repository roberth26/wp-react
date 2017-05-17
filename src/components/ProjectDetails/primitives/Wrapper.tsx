import styled from 'styled-components';
import Color from '../../../dataTypes/Color';

interface IWrapperProps {
    backgroundColor: Color;
}

export default styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 100;
    background-color: ${( props: IWrapperProps ) => {
        return props.backgroundColor
            ? props.backgroundColor.toCss()
            : 'grey';
    }};
    // box-shadow: 0 8px rgba( 0, 0, 0, .25 );
`;