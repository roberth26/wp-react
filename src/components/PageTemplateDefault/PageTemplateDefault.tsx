import * as React from 'react';
import Container from '../primitives/Container';

interface IPageTemplateDefaultProps {
    children?: React.ReactChildren;
}

const PageTemplateDefault: React.SFC<IPageTemplateDefaultProps> = props => {
    const { children } = props;

    return (
        <Container>
            {children}
        </Container>
    );
};

export default PageTemplateDefault;