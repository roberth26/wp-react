import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import { withProperties } from 'react-property-provider';
import PortfolioStore from '../../stores/PortfolioStore';
import ProjectCategory from '../../models/ProjectCategory';
import Project from '../../models/Project';
import ProjectSummary from '../ProjectSummary/ProjectSummary';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import Page from '../../models/Page';
import Grid from '../primitives/Grid';

interface IProjectCategoryDetails {
    portfolioStore?: PortfolioStore; // injected
    match?: any; // injected
    parentPage?: Page; // injected
    projectCategory: ProjectCategory;
}

function ProjectCategoryDetails( props: IProjectCategoryDetails ) {
    const { projectCategory, portfolioStore, match, parentPage } = props;
    const projects = portfolioStore.getProjectsByCategory( projectCategory );

    return (
        <Switch>
            <Route
                path={`${match.path}`}
                exact={true}
                render={() => (
                    <div>
                        <NavLink to={parentPage.url}>
                            &lt; Back to Portfolio
                        </NavLink>
                        <Grid>
                            {projects.map(( project: Project ) => (
                                <NavLink
                                    to={{
                                        pathname: `${parentPage.url}${project.url}`,
                                        search: `?cat=${projectCategory.id}`
                                    }}
                                    key={project.id}
                                >
                                    <ProjectSummary project={project} />
                                </NavLink>
                            ))}
                        </Grid>
                    </div>
                )}
            />
            {projects.map(( project: Project ) => (
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
            ))}
        </Switch>
    );
}

export default inject( 'portfolioStore' )(
    observer(
        withRouter(
            withProperties( ProjectCategoryDetails , 'parentPage' )
        )
    )
);