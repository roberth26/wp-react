import * as React from 'react';
import Container from '../primitives/Container';
import Wrapper from './primitives/Wrapper';
import Column from './primitives/Column';

interface IPageTemplate2ColProps {
    leftContent?: React.ReactElement<any>;
    rightContent?: React.ReactElement<any>;
}

const PageTemplate2Col: React.SFC<IPageTemplate2ColProps> = props => {
    const { leftContent, rightContent } = props;

    return (
        <Container>
            <Wrapper>
                <Column width={50}>
                    {leftContent}
                </Column>
                <Column width={50}>
                    {rightContent}
                </Column>
            </Wrapper>
        </Container>
    );
};

export default PageTemplate2Col;