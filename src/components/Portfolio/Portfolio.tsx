import * as React from 'react';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import ProjectCategory from '../../models/ProjectCategory';
import ProjectCategorySummary from '../ProjectCategorySummary/ProjectCategorySummary';
import ProjectCategoryDetails from '../ProjectCategoryDetails/ProjectCategoryDetails';
import Project from '../../models/Project';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import Container from '../primitives/Container';
import Grid from '../primitives/Grid';

interface IPortfolioProps {
    match?: any; // injected
    location?: any; // injected
    projects: Project[];
    projectCategories: ProjectCategory[];
}

function renderProjectCategorySummaries( projectCategories: ProjectCategory[], pathname: string ) {
    return (
        <Grid>
            {projectCategories.map(( projectCategory: ProjectCategory ) => (
                <Link
                    to={`${pathname}${projectCategory.url}`}
                    key={projectCategory.id}
                >
                    <ProjectCategorySummary projectCategory={projectCategory} />
                </Link>
            ))}}
        </Grid>
    );
}

function renderProjectDetailRoutes( projects: Project[], query: string ) {
    // const projectCategoryId = Number.parseInt( location.search.split( '=' )[ 1 ] );
    // const projectCategory = portfolioStore.getProjectCategoryById( projectCategoryId );
    const projectCategory = null;

    return (
        projects.map(( project: Project ) => (
            <Route
                path={project.url}
                key={project.id}
                render={() => (
                    <ProjectDetails
                        project={project}
                        projectCategory={projectCategory}
                        previousUrl={''} // TODO:
                    />
                )}
            />
        ))
    );
}

function renderProjectCategoryDetailRoutes( projectCategories: ProjectCategory[] ) {
    return (
        projectCategories.map(( projectCategory: ProjectCategory ) => (
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
        ))
    );
}

function Portfolio( props: IPortfolioProps) {
    const { projects, projectCategories, match } = props;

    return (
        <Container>
            <Switch>
                {projects && renderProjectDetailRoutes( projects, match.path)}
                {renderProjectCategoryDetailRoutes( projectCategories )}
                <Route
                    render={() => {
                        return renderProjectCategorySummaries( projectCategories, location.search );
                    }}
                />
            </Switch>
        </Container>
    );
}

export default withRouter( Portfolio );