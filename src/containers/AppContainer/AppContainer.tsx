import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import GlobalStore from '../../stores/GlobalStore';
import PortfolioStore from '../../stores/PortfolioStore';
import PageScroller from '../../components/PageScroller/PageScroller';
import FixedNav from '../../components/FixedNav/FixedNav';
import { SIDE_MENU, FOOTER_AREA } from '../../contracts/EThemeLocation';
import Footer from '../../components/primitives/Footer';
import ITheme from '../../contracts/ITheme';
import Container from '../../components/primitives/Container';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';

interface IAppProps {
    globalStore?: GlobalStore; // injected
    portfolioStore?: PortfolioStore; // injected
    theme?: ITheme;
}

@inject( 'globalStore', 'portfolioStore' )
@withRouter
@observer
export default class AppContainer extends React.Component<IAppProps, {}> {
    render() {
        const { globalStore, portfolioStore } = this.props;
        const { theme, pages } = globalStore;
        const { projects, projectCategories } = portfolioStore;

        if ( !theme || !pages || !projects || !projects.length ) {
            return null;
        }

        const fixedMenu = globalStore.menus
            ? globalStore.getMenuByThemeLocation( SIDE_MENU )
            : null;

        const footerWidgetArea = globalStore.getWidgetArea( FOOTER_AREA );
        const footerContent = footerWidgetArea ? footerWidgetArea.content : null;

        return (
            <div>
                <PageScroller />
                <Switch>
                    {projects.map( project => (
                        <Route
                            key={project.id}
                            path={project.url}
                            render={() => (
                                <ProjectDetails
                                    project={project}
                                />
                            )}
                        />
                    ))}
                    {pages.map( page => (
                        <Route
                            key={page.id}
                            path={page.url}
                        />
                    ))}
                    {projectCategories.map( projectCategory => (
                        <Route
                            key={projectCategory.id}
                            path={projectCategory.url}
                        />
                    ))}
                </Switch>
                <Footer backgroundColor={theme.footerColor}>
                    <Container>
                        {footerContent}
                    </Container>
                </Footer>
                <FixedNav menu={fixedMenu} />
            </div>
        );
    }
}