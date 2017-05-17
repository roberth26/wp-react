import styled from 'styled-components';
import Container from '../../primitives/Container';

export default styled( Container )`
    box-shadow: 0 0 36px 4px rgba( 0, 0, 0, .4 );
    max-width: calc( 100% - 32px );
    padding: 0 0 1px 0;

    @media ( min-width: 768px ) {
        max-width: calc( 100% - 96px );
    }
`;