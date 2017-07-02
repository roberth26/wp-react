import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import ProjectCategory from '../../models/ProjectCategory';
import ProjectCategorySummary from '../ProjectCategorySummary/ProjectCategorySummary';
import ProjectCategoryDetails from '../ProjectCategoryDetails/ProjectCategoryDetails';
import Project from '../../models/Project';
import Container from '../primitives/Container';
import Grid from '../primitives/Grid';

interface IPortfolioProps {
    projects: Project[];
    projectCategories: ProjectCategory[];
}

export default class Portfolio extends React.Component<IPortfolioProps, {}> {
    renderProjectCategorySummaries = () => {
        const { projectCategories} = this.props;

        return (
            <Grid>
                {projectCategories.map( projectCategory => (
                    <Link
                        to={projectCategory.url}
                        key={projectCategory.id}
                    >
                        <ProjectCategorySummary projectCategory={projectCategory} />
                    </Link>
                ))}
            </Grid>
        );
    }

    renderProjectCategoryDetailRoutes = () => {
        const { projectCategories } = this.props;

        return projectCategories.map( projectCategory => (
            <Route
                path={projectCategory.url}
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
        return (
            <Container>
                {this.renderProjectCategorySummaries()}
                {this.renderProjectCategoryDetailRoutes()}
            </Container>
        );
    }
}