import * as React from 'react';
import { Route, Link, withRouter, Switch, Redirect } from 'react-router-dom';
import ProjectCategory from '../../models/ProjectCategory';
import ProjectCategorySummary from '../ProjectCategorySummary/ProjectCategorySummary';
import ProjectCategoryDetails from '../ProjectCategoryDetails/ProjectCategoryDetails';
import Project from '../../models/Project';
import Container from '../primitives/Container';
import Grid from '../primitives/Grid';

interface IPortfolioProps {
    match?: any; // injected
    location?: any; // injected
    projects: Project[];
    projectCategories: ProjectCategory[];
}

@withRouter
export default class Portfolio extends React.Component<IPortfolioProps, {}> {
    renderProjectCategorySummaries = () => {
        const { projectCategories, match } = this.props;

        return (
            <Grid>
                {projectCategories.map( projectCategory => (
                    <Link
                        to={`${match.path}${projectCategory.url}`}
                        key={projectCategory.id}
                    >
                        <ProjectCategorySummary projectCategory={projectCategory} />
                    </Link>
                ))}
            </Grid>
        );
    }

    renderProjectCategoryDetailRoutes = () => {
        const { projectCategories, match } = this.props;

        return projectCategories.map( projectCategory => (
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
        ));
    }

    render() {
        const { match } = this.props;

        return (
            <Container>
                <Switch>
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