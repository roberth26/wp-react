import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Provider from 'react-property-provider';
import PageModel from '../../models/Page';
import TemplateDefault from '../PageTemplateDefault/PageTemplateDefault';
import Template2Col from '../PageTemplate2Col/PageTemplate2Col';
import PortfolioContainer from '../../containers/PortfolioContainer/PortfolioContainer';
import { PORTFOLIO, TWO_COLUMN } from '../../contracts/ETemplate';
import Wrapper from './primitives/Wrapper';
import GlobalStore from '../../stores/GlobalStore';
import { START } from '../../contracts/EThemeLocation';
import Menu from '../Menu/Menu';
import Title from './primitives/Title';
import Content from './primitives/Content';

interface IPageProps {
    globalStore?: GlobalStore; // injected
    page: PageModel;
    innerRef: ( el: HTMLElement ) => void;
}

@inject( 'globalStore' )
@observer
export default class Page extends React.Component<IPageProps, {}> {
    render() {
        const { page, globalStore, innerRef } = this.props;

        const menu = page.order === 0
            ? <Menu
                menu={globalStore.menus.find( m => m.themeLocation === START )}
                onBottom={true}
            />
            : null;

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
                        {menu}
                    </TemplateDefault>
                );
                break;
            }
        }

        return (
            <Provider parentPage={page}>
                <Wrapper
                    backgroundColor={page.backgroundColor}
                    innerRef={innerRef}
                >
                    {page.showTitle ? <Title>{page.title}</Title> : null}
                    <Content>                    
                            {template}
                    </Content>
                </Wrapper>
            </Provider>
        );
    }
}