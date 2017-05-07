import * as React from 'react';
import { Route, Link, withRouter, Switch, Redirect } from 'react-router-dom';
import ProjectCategory from '../../models/ProjectCategory';
import ProjectCategorySummary from '../ProjectCategorySummary/ProjectCategorySummary';
import ProjectCategoryDetails from '../ProjectCategoryDetails/ProjectCategoryDetails';
import Project from '../../models/Project';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import Container from '../primitives/Container';
import Grid from '../primitives/Grid';
import { trailingSlash } from '../../utils/Formatting';

interface IPortfolioProps {
    match?: any; // injected
    location?: any; // injected
    projects: Project[];
    projectCategories: ProjectCategory[];
}

@withRouter
export default class Portfolio extends React.Component<IPortfolioProps, {}> {
    renderProjectDetailRoutes =  () => {
        const { projects } = this.props;

        return projects.map( project => (
            <Route
                path={project.url}
                key={project.id}
                render={({ location }) => {
                    const projectCategoryId = Number.parseInt( location.search.split( '=' )[ 1 ] );
                    const projectCategory = project.categoryMap.get( projectCategoryId );

                    return (
                        <ProjectDetails
                            project={project}
                            projectCategory={projectCategory}
                            previousUrl={''} // TODO:
                        />
                    );
                }}
            />
        ));
    }

    renderProjectCategorySummaries = () => {
        const { projectCategories, match } = this.props;

        return (
            <Grid>
                {projectCategories.map( projectCategory => {
                    const projectUrl = trailingSlash( projectCategory.url );

                    return (
                        <Link
                            to={`${match.path}${projectUrl}`}
                            key={projectCategory.id}
                        >
                            <ProjectCategorySummary projectCategory={projectCategory} />
                        </Link>
                    );
                })}
            </Grid>
        );
    }

    renderProjectCategoryDetailRoutes = () => {
        const { projectCategories, match } = this.props;

        return projectCategories.map( projectCategory => {
            const categoryUrl = trailingSlash( projectCategory.url );

            return (
                <Route
                    path={`${match.path}${categoryUrl}`}
                    key={projectCategory.id}
                    render={() => (
                        <ProjectCategoryDetails
                            projectCategory={projectCategory}
                            key={projectCategory.id}
                        />
                    )}
                />
            );
        });
    }

    render() {
        const { match } = this.props;

        return (
            <Container>
                <Switch>
                    {this.renderProjectDetailRoutes()}
                    {this.renderProjectCategoryDetailRoutes()}
                    <Route
                        path={match.path}
                        exact={true}
                        render={this.renderProjectCategorySummaries}
                    />
                    <Redirect to={match.path} />
                </Switch>
            </Container>
        );
    }
}