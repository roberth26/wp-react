import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import PortfolioStore from '../../stores/PortfolioStore';
import ProjectCategory from '../../models/ProjectCategory';
import ProjectCategorySummary from '../ProjectCategorySummary/ProjectCategorySummary';
import ProjectCategoryDetails from '../ProjectCategoryDetails/ProjectCategoryDetails';
import Project from '../../models/Project';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import Container from '../primitives/Container';
import Grid from '../primitives/Grid';

interface IPortfolioProps {
    portfolioStore?: PortfolioStore; // injected
    match?: any; // injected
    location?: any; // injected
}

@inject( 'portfolioStore' )
@observer
@withRouter
export default class Portfolio extends React.Component<IPortfolioProps, {}> {
    constructor( props: IPortfolioProps ) {
        super( props );
    }

    renderProjectCategorySummaries = (): React.ReactElement<any> => {
        const { match, portfolioStore } = this.props;
        const { projectCategories } = portfolioStore;

        const links = projectCategories.map(( projectCategory: ProjectCategory ) => (
            <Link
                to={`${match.path}${projectCategory.url}`}
                key={projectCategory.id}
            >
                <ProjectCategorySummary projectCategory={projectCategory} />
            </Link>
        ));

        return <Grid>{links}</Grid>;
    }

    renderProjectDetailRoutes = (): Array<React.ReactElement<any>> => {
        const { portfolioStore, match, location } = this.props;
        const { projects } = portfolioStore;
        const projectCategoryId = Number.parseInt( location.search.split( '=' )[ 1 ] );
        const projectCategory = portfolioStore.getProjectCategoryById( projectCategoryId );

        return (
            projects.map(( project: Project ) => (
                <Route
                    path={`${match.path}${project.url}`}
                    key={project.id}
                    render={() => (
                        <ProjectDetails
                            project={project}
                            projectCategory={projectCategory}
                            previousUrl={match.path}
                        />
                    )}
                />
            ))
        );
    }

    renderProjectCategoryDetailRoutes = (): Array<React.ReactElement<any>> => {
        const { portfolioStore, match } = this.props;
        const { projectCategories } = portfolioStore;

        return (
            projectCategories.map(( projectCategory: ProjectCategory ) => (
                <Route
                    path={`${match.path}${projectCategory.url}`}
                    key={projectCategory.id}
                    render={() => (
                        <ProjectCategoryDetails
                            projectCategory={projectCategory}
                            key={projectCategory.id}
                        />
                    )}
                />
            ))
        );
    }

    render() {
        const { portfolioStore } = this.props;
        const { projectCategories } = portfolioStore;

        if ( !projectCategories || !projectCategories.length ) {
            return (
                <h1>Loading...</h1>
            );
        }

        return (
            <Container>
                <Switch>
                    {this.renderProjectDetailRoutes()}
                    {this.renderProjectCategoryDetailRoutes()}
                    <Route render={this.renderProjectCategorySummaries} />
                </Switch>
            </Container>
        );
    }
}