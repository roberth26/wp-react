import * as React from 'react';
import ProjectCategory from '../../models/ProjectCategory';
import Title from '../primitives/SummaryTitle';
import Wrapper from '../primitives/SummaryWrapper';

interface IProjectCategorySummaryProps {
    projectCategory: ProjectCategory;
}

export default function ProjectCategorySummary( props: IProjectCategorySummaryProps ) {
    const { projectCategory } = props;

    const src = projectCategory.image
        ? projectCategory.image.urlThumbnail
        : '//:0';

    return (
        <Wrapper>
            <img src={src} />
            <Title>{projectCategory.name}</Title>
        </Wrapper>
    );
}