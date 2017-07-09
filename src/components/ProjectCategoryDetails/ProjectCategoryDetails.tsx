import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import PortfolioStore from '../../stores/PortfolioStore';
import ProjectCategory from '../../models/ProjectCategory';
import Project from '../../models/Project';
import ProjectSummary from '../ProjectSummary/ProjectSummary';
import Page from '../../models/Page';
import Grid from '../primitives/Grid';
import Icon from '../Icon/Icon';
import { ANGLE_LEFT } from '../../contracts/EIcon';
import BackButton from './primitives/BackButton';

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
                <BackButton to={parentPage.url}>
                    <Icon icon={ANGLE_LEFT} /> Go Back
                </BackButton>
            </Grid>
            <Grid>
                {projects.map(( project: Project ) => (
                    <Link
                        to={{
                            pathname: project.url,
                            search: `?cat=${projectCategory.id}`
                        }}
                        key={project.id}
                    >
                        <ProjectSummary project={project} />
                    </Link>
                ))}
            </Grid>
        </div>
    );
};

export default inject( 'portfolioStore', 'parentPage' )( observer( ProjectCategoryDetails ) );