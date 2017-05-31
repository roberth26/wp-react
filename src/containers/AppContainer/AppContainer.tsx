import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom';
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

        return (
            <div>
                <PageScroller />
                {projects.map( project => {
                    console.log( project );

                    return (
                        <Route
                            key={project.id}
                            path={project.url}
                            exact={true}
                            render={({ match: m }) => {
                                console.log( m );
                                return (
                                    <ProjectDetails
                                        project={project}
                                        projectCategory={project.categories[ 0 ]}
                                    />
                                );
                            }}
                        />
                    );
                })}
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