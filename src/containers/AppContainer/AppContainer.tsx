import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import PortfolioStore from '../../stores/PortfolioStore';
import PageScroller from '../../components/PageScroller/PageScroller';
import FixedNav from '../../components/FixedNav/FixedNav';
import { SIDE_MENU, FOOTER_MENU, SOCIAL_MENU, FOOTER_AREA } from '../../contracts/EThemeLocation';
import Footer from '../../components/primitives/Footer';
import ITheme from '../../contracts/ITheme';
import Container from '../../components/primitives/Container';
import Menu from '../../components/Menu/Menu';
import FooterContent from '../../components/primitives/FooterContent';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';

interface IAppProps {
    globalStore?: GlobalStore; // injected
    portfolioStore?: PortfolioStore; // injected
    theme?: ITheme;
}

@inject( 'globalStore', 'portfolioStore' )
@observer
export default class AppContainer extends React.Component<IAppProps, {}> {
    render() {
        const { globalStore, portfolioStore } = this.props;
        const { theme, pages } = globalStore;
        const { projects } = portfolioStore;

        if ( !theme || !pages || !projects || !projects.length ) {
            return null;
        }

        const fixedMenu = globalStore.menus
            ? globalStore.getMenuByThemeLocation( SIDE_MENU )
            : null;

        const footerWidgetArea = globalStore.getWidgetArea( FOOTER_AREA );
        const footerContent = footerWidgetArea ? footerWidgetArea.content : null;
        const footerMenu = globalStore.getMenuByThemeLocation( FOOTER_MENU );
        const socialMenu = globalStore.getMenuByThemeLocation( SOCIAL_MENU );

        return (
            <div>
                <PageScroller />
                {projects.map( project => (
                    <Route
                        key={project.id}
                        exact={true}
                        path={project.url}
                        render={({ match }) => {
                            console.log( match );
                            return (
                                <ProjectDetails
                                    project={project}
                                    projectCategory={project.categories[ 0 ]}
                                />
                            );
                        }}
                    />
                ))}
                <Footer backgroundColor={theme.footerColor}>
                    <Container>
                        <Menu menu={footerMenu} />
                        <Menu menu={socialMenu} />
                        <FooterContent>
                            {footerContent}
                        </FooterContent>
                    </Container>
                </Footer>
                <FixedNav menu={fixedMenu} />
            </div>
        );
    }
}