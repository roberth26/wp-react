import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, NavLink, withRouter, Redirect } from 'react-router-dom';
import { withProperties } from 'react-property-provider';
import PortfolioStore from '../../stores/PortfolioStore';
import ProjectCategory from '../../models/ProjectCategory';
import Project from '../../models/Project';
import ProjectSummary from '../ProjectSummary/ProjectSummary';
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
    const projects = projectCategory.projects;

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
                                        pathname: project.url,
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
            <Redirect to={match.path} />
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