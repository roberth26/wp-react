import * as React from 'react';
import Project from '../../models/Project';
import Wrapper from '../primitives/SummaryWrapper';
import Title from '../primitives/SummaryTitle';

interface IProjectSummaryProps {
    project: Project;
}

const ProjectSummary: React.SFC<IProjectSummaryProps> = props => {
    const { project } = props;

    return (
        <Wrapper>
            <img src={project.images[ 0 ].urlThumbnail} />
            <Title>{project.title}</Title>
        </Wrapper>
    );
};

export default ProjectSummary;