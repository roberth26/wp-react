import * as React from 'react';
import Container from '../primitives/Container';
import Wrapper from './primitives/Wrapper';
import Column from './primitives/Column';

interface IPageTemplate2ColProps {
    leftContent?: React.ReactElement<any>;
    rightContent?: React.ReactElement<any>;
}

export default function PageTemplate2Col( props: IPageTemplate2ColProps ) {
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
}