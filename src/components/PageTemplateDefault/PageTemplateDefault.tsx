import * as React from 'react';
import Container from '../primitives/Container';

interface IPageTemplateDefaultProps {
    children?: React.ReactChildren;
}

export default function PageTemplateDefault( props: IPageTemplateDefaultProps ) {
    const { children } = props;

    return (
        <Container>
            {children}
        </Container>
    );
};