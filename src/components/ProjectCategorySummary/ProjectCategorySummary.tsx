import * as React from 'react';
import ProjectCategory from '../../models/ProjectCategory';
import Title from '../primitives/SummaryTitle';
import Wrapper from '../primitives/SummaryWrapper';

interface IProjectCategorySummaryProps {
    projectCategory: ProjectCategory;
}

export default function ProjectCategorySummary( props: IProjectCategorySummaryProps ) {
    const { projectCategory } = props;

    return (
        <Wrapper>
            <img src={projectCategory.image.urlThumbnail} />
            <Title>{projectCategory.name}</Title>
        </Wrapper>
    );
}