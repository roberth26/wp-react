import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { withProperties } from 'react-property-provider';
import PortfolioStore from '../../stores/PortfolioStore';
import Project from '../../models/Project';
import ProjectCategory from '../../models/ProjectCategory';
import Page from '../../models/Page';
import Image from '../../models/Image';
import ThumbnailChooser from '../ThumbnailChooser/ThumbnailChooser';
import AppBar from './primitives/AppBar';
import Container from '../primitives/Container';
import StyledContainer from './primitives/StyledContainer';
import AppBarContainer from './primitives/AppBarContainer';
import Wrapper from './primitives/Wrapper';
import Viewport from './primitives/Viewport';
import ViewportOverlay from './primitives/ViewportOverlay';

interface IProps {
    portfolioStore?: PortfolioStore; // injected
    parentPage?: Page; // injected
    project: Project;
    projectCategory: ProjectCategory;
}

interface IState {
    activeImage: Image;
}

@inject( 'portfolioStore' )
@observer
class ProjectDetails extends React.Component<IProps, IState> {
    constructor( props ) {
        super( props );
        this.state = {
            activeImage: props.project.images[ 0 ]
        };
    }

    setActiveImage = ( image: Image ) => {
        this.setState({
            activeImage: image
        });
    }

    nextImage = ( event: React.MouseEvent<HTMLAnchorElement> ) => {
        event.preventDefault();
        const { project } = this.props;
        let index = project.images.indexOf( this.state.activeImage );
        if ( index >= project.images.length - 1 ) {
            index = 0;
        } else {
            index++;
        }
        this.setState({
            activeImage: project.images[ index ]
        });
    }

    previousImage = ( event: React.MouseEvent<HTMLAnchorElement> ) => {
        event.preventDefault();
        const { project } = this.props;
        let index = project.images.indexOf( this.state.activeImage );
        if ( index <= 0 ) {
            index = project.images.length - 1;
        } else {
            index--;
        }
        this.setState({
            activeImage: project.images[ index ]
        });
    }

    render() {
        const { portfolioStore, parentPage, project, projectCategory } = this.props;
        const { activeImage } = this.state;

        const previousUrl = parentPage.url + ( projectCategory ? projectCategory.url : '' );
        const queryParam = projectCategory ? `?cat=${projectCategory.id}` : '';

        const previousProject = portfolioStore.getPreviousProject( project, projectCategory );
        let previousProjectLink = null;
        if ( previousProject !== project ) {
            const previousProjectUrl = parentPage.url + previousProject.url;
            previousProjectLink = (
                <Link
                    to={{
                        pathname: previousProjectUrl,
                        search: queryParam
                    }}
                >
                    Previous Project
                </Link>
            );
        }

        const nextProject = portfolioStore.getNextProject( project, projectCategory );
        let nextProjectLink = null;
        if ( nextProject !== project ) {
            const nextProjectUrl = parentPage.url + nextProject.url;
            nextProjectLink = (
                <Link
                    to={{
                        pathname: nextProjectUrl,
                        search: queryParam
                    }}
                >
                    Next Project
                </Link>
            );
        }

        return (
            <div>
                <AppBar>
                    <AppBarContainer>
                        <Link to={previousUrl}>X Close</Link>
                        <h2>{project.title}</h2>
                    </AppBarContainer>
                </AppBar>
                <Wrapper backgroundColor={parentPage.backgroundColor}>
                    <StyledContainer>
                        <Viewport>
                            <a href={activeImage.urlFull} target="_blank">
                                <img
                                    src={activeImage.urlLarge}
                                    style={{ display: 'block', width: '100%' }}
                                />
                            </a>
                            <ViewportOverlay>
                                <a href="#" onClick={this.previousImage}>Previous</a>
                                <a href="#" onClick={this.nextImage}>Next</a>
                            </ViewportOverlay>
                        </Viewport>
                        <ThumbnailChooser
                            images={project.images}
                            activeImage={activeImage}
                            onChoose={this.setActiveImage}
                        />
                        <Container inner={true}>
                            <p>{project.date.toString()}</p>
                            <h2>Tools</h2>
                            <ul>
                                {project.tools.map(( tool: string ) => (
                                    <li key={tool}>{tool}</li>
                                ))}
                            </ul>
                            <h2>Categories</h2>
                            <ul>
                                {project.categories.map(( category: ProjectCategory ) => (
                                    <li key={category.id}>{category.name}</li>
                                ))}
                            </ul>
                            {project.description}
                        </Container>
                    </StyledContainer>
                </Wrapper>
                <AppBar onBottom={true}>
                    <AppBarContainer>
                        {previousProjectLink}
                        {nextProjectLink}
                    </AppBarContainer>
                </AppBar>
            </div>
        );
    }
}

export default withProperties( ProjectDetails, 'parentPage' );