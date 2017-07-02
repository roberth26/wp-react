import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import PortfolioStore from '../../stores/PortfolioStore';
import ProjectCategory from '../../models/ProjectCategory';
import Project from '../../models/Project';
import ProjectSummary from '../ProjectSummary/ProjectSummary';
import Page from '../../models/Page';
import Grid from '../primitives/Grid';

interface IProjectCategoryDetails {
    portfolioStore?: PortfolioStore; // injected
    parentPage?: Page; // injected
    projectCategory: ProjectCategory;
}

const ProjectCategoryDetails: React.SFC<IProjectCategoryDetails> = props => {
    const { projectCategory, parentPage } = props;
    const projects = projectCategory.projects;

    return (
        <div>
            <Grid>
                <NavLink to={parentPage.url}>
                    &lt; Back to Portfolio
                </NavLink>
            </Grid>
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
    );
};

export default inject( 'portfolioStore', 'parentPage' )( observer( ProjectCategoryDetails ) );