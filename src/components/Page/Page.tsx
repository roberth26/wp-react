import * as React from 'react';
import { Provider } from 'mobx-react';
import PageModel from '../../models/Page';
import TemplateDefault from '../PageTemplateDefault/PageTemplateDefault';
import Template2Col from '../PageTemplate2Col/PageTemplate2Col';
import PortfolioContainer from '../../containers/PortfolioContainer/PortfolioContainer';
import { PORTFOLIO, TWO_COLUMN } from '../../contracts/ETemplate';
import Wrapper from './primitives/Wrapper';
import Title from './primitives/Title';
import Content from './primitives/Content';
import Slice from './primitives/Slice';

export interface IPageProps {
    page: PageModel;
    zIndex?: number;
    innerRef: ( el: HTMLElement ) => void;
    oblique?: boolean;
}

const Page: React.SFC<IPageProps> = props => {
    const {
        page,
        zIndex = 0,
        innerRef,
        children,
        oblique = true
    } = props;

    let template;
    switch ( page.template ) {
        case TWO_COLUMN: {
            template = (
                <Template2Col
                    leftContent={page.leftContent}
                    rightContent={page.rightContent}
                />
            );
            break;
        }
        case PORTFOLIO: {
            template = <PortfolioContainer />;
            break;
        }
        default: {
            template = (
                <TemplateDefault>
                    {page.content}
                </TemplateDefault>
            );
        }
    }

    const titleShouldBeDark = page.backgroundColor.luminosity() > .5;
    const title = page.showTitle
        ? <Title dark={titleShouldBeDark}>{page.title}</Title>
        : null;

    return (
        <Wrapper
            backgroundColor={page.backgroundColor}
            innerRef={innerRef}
            zIndex={zIndex}
        >
            {title}
            <Content>
                <Provider parentPage={page}>              
                    {template}
                </Provider>
                <Provider parentPage={page}>
                    <div>            
                        {children}
                    </div>
                </Provider>
            </Content>
            {!oblique ? null : (
                <Slice
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <polygon
                        points="0,0 100,0 0,100"
                        fill={page.backgroundColor.toCss()}
                    />
                </Slice>
            )}
        </Wrapper>
    );
};

export default Page;