import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import * as Moment from 'moment';
import PortfolioStore from '../../stores/PortfolioStore';
import Project from '../../models/Project';
import ProjectCategory from '../../models/ProjectCategory';
import Image from '../../models/Image';
import Video from '../../models/Video';
import ThumbnailChooser from '../ThumbnailChooser/ThumbnailChooser';
import AppBar from './primitives/AppBar';
import Container from '../primitives/Container';
import StyledContainer from './primitives/StyledContainer';
import Wrapper from './primitives/Wrapper';
import Viewport from './primitives/Viewport';
import Content from './primitives/Content';
import Color from '../../dataTypes/Color';
import ITheme from '../../contracts/ITheme';
import GlobalStore from '../../stores/GlobalStore';
import { PORTFOLIO } from '../../contracts/ETemplate';
import Icon from '../Icon/Icon';
import { ANGLE_LEFT, ANGLE_RIGHT, CLOSE } from '../../contracts/EIcon';
import TwoColumn from './primitives/TwoColumn';
import NavButton from './primitives/NavButton';

interface IProjectDetailsProps {
    portfolioStore?: PortfolioStore; // injected
    theme?: ITheme; // injected
    project: Project;
    projectCategory?: ProjectCategory;
    location?: Location; // injected
    history?: History; // injected
    globalStore?: GlobalStore; // injcted
}

interface IProjectDetailsState {
    activeMediaItem: Image | Video;
}

@inject( 'globalStore', 'portfolioStore', 'theme' )
@withRouter
@observer
export default class ProjectDetails extends React.Component<IProjectDetailsProps, IProjectDetailsState> {
    constructor( props ) {
        super( props );

        const mediaItems = [
            ...props.project.images,
            ...props.project.videos
        ];

        this.state = {
            activeMediaItem: mediaItems[ 0 ]
        };
    }

    setActiveMediaItem = ( mediaItem: Image | Video ) => {
        this.setState({
            activeMediaItem: mediaItem
        });
    }

    nextMediaItem = ( event: React.MouseEvent<HTMLAnchorElement> ) => {
        event.preventDefault();
        const { project } = this.props;
        const mediaItems = [
            ...project.images,
            ...project.videos
        ];
        let index = mediaItems.indexOf( this.state.activeMediaItem );
        if ( index >= mediaItems.length - 1 ) {
            index = 0;
        } else {
            index++;
        }
        this.setActiveMediaItem( mediaItems[ index ] );
    }

    previousMediaItem = ( event: React.MouseEvent<HTMLAnchorElement> ) => {
        event.preventDefault();
        const { project } = this.props;
        const mediaItems = [
            ...project.images,
            ...project.videos
        ];
        let index = mediaItems.indexOf( this.state.activeMediaItem );
        if ( index <= 0 ) {
            index = mediaItems.length - 1;
        } else {
            index--;
        }
        this.setActiveMediaItem( mediaItems[ index ] );
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'initial';
    }

    render() {
        const { project, theme, location, history, globalStore, portfolioStore } = this.props;
        const { activeMediaItem } = this.state;

        const projectCategoryId = Number.parseInt( location.search.split( '=' )[ 1 ] );
        const projectCategory = portfolioStore.projectCategories.find( p => p.id === projectCategoryId );
        const previousProject = portfolioStore.getPreviousProject( project, projectCategory );
        let previousProjectLink = null;
        if ( previousProject !== project ) {
            previousProjectLink = (
                <NavButton
                    onClick={() => {
                        history[ 'replace' ]( previousProject.url + location.search );
                    }}
                >
                    <Icon icon={ANGLE_LEFT} /> Previous Project
                </NavButton>
            );
        }

        const nextProject = portfolioStore.getNextProject( project, projectCategory );
        let nextProjectLink = null;
        if ( nextProject !== project ) {
            nextProjectLink = (
                <NavButton
                    onClick={() => {
                        history[ 'replace' ]( nextProject.url + location.search );
                    }}
                >
                    Next Project <Icon icon={ANGLE_RIGHT} />
                </NavButton>
            );
        }

        const appBarColor = theme ? theme.footerColor : new Color( 128, 128, 128 );
        const mediaItems = [
            ...project.images,
            ...project.videos
        ];

        let viewportContent = null;
        if ( activeMediaItem instanceof Image ) {
            viewportContent = (
                <a href={activeMediaItem.urlFull} target="_blank">
                    <img src={activeMediaItem.urlLarge} />
                </a>
            );
        } else if ( activeMediaItem instanceof Video ) {
            viewportContent = (
                <iframe
                    src={activeMediaItem.url}
                    frameBorder="0"
                    allowFullScreen
                />
            );
        }

        const portfolioPage = globalStore.pages.find( p => p.template === PORTFOLIO );

        return (
            <Wrapper backgroundColor={portfolioPage.backgroundColor}>
                <AppBar backgroundColor={appBarColor}>
                    <a
                        className="close-btn"
                        onClick={() => history[ 'goBack' ]()}
                    >
                        <Icon icon={CLOSE} />
                    </a>
                    <h2>{project.title}</h2>
                </AppBar>
                <Content>
                    <StyledContainer>
                        <Viewport>
                            {viewportContent}
                            <a
                                className="button"
                                onClick={this.previousMediaItem}
                            >
                                <Icon icon={ANGLE_LEFT} /> Previous
                            </a>
                            <a
                                className="button"
                                onClick={this.nextMediaItem}
                            >
                                Next <Icon icon={ANGLE_RIGHT} />
                            </a>
                        </Viewport>
                        <ThumbnailChooser
                            mediaItems={mediaItems}
                            activeMediaItem={activeMediaItem}
                            onChoose={this.setActiveMediaItem}
                        />
                        <Container inner={true}>
                            <TwoColumn>
                                <div>
                                    <h3>Tools</h3>
                                    <ul>
                                        {project.tools.map( tool => (
                                            <li key={tool}>{tool}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h3>Categories</h3>
                                    <ul>
                                        {project.categories.map( category => (
                                            <li key={category.id}>{category.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <h3 style={{ textAlign: 'right' }}>{Moment( project.date ).format( 'MMM Do YYYY' )}</h3>
                            </TwoColumn>
                            {project.description}
                        </Container>
                    </StyledContainer>
                </Content>
                <AppBar
                    backgroundColor={appBarColor}
                    onBottom={true}
                >
                    {previousProjectLink}
                    {nextProjectLink}
                </AppBar>
            </Wrapper>
        );
    }
}