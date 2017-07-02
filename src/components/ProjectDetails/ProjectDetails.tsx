import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import * as AngleLeft from 'react-icons/lib/fa/angle-left';
import * as AngleRight from 'react-icons/lib/fa/angle-right';
import * as Tools from 'react-icons/lib/go/tools';
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
import AppBarContainer from './primitives/AppBarContainer';
import Wrapper from './primitives/Wrapper';
import Viewport from './primitives/Viewport';
import Content from './primitives/Content';
import Color from '../../dataTypes/Color';
import ITheme from '../../contracts/ITheme';
import Page from '../../models/Page';

interface IProjectDetailsProps {
    portfolioStore?: PortfolioStore; // injected
    theme?: ITheme; // injected
    project: Project;
    projectCategory?: ProjectCategory;
    previousUrl?: string;
    history?: History; // injected
    parentPage?: Page; // injected
}

interface IState {
    activeMediaItem: Image | Video;
}

@inject( 'portfolioStore', 'theme', 'parentPage' )
@withRouter
@observer
export default class ProjectDetails extends React.Component<IProjectDetailsProps, IState> {
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
        const { project, theme, history, parentPage } = this.props;
        const { activeMediaItem } = this.state;

        /*
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
        }*/

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

        return (
            <Wrapper backgroundColor={parentPage.backgroundColor}>
                <AppBar backgroundColor={appBarColor}>
                    <AppBarContainer>
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                history.goBack();
                            }}
                        >
                            X Close
                        </a>
                        <h2>{project.title}</h2>
                    </AppBarContainer>
                </AppBar>
                <Content>
                    <StyledContainer>
                        <Viewport>
                            {viewportContent}
                            <a
                                className="button"
                                href="#"
                                onClick={this.previousMediaItem}
                            >
                                <AngleLeft /> Previous
                            </a>
                            <a
                                className="button"
                                href="#"
                                onClick={this.nextMediaItem}
                            >
                                Next <AngleRight />
                            </a>
                        </Viewport>
                        <ThumbnailChooser
                            mediaItems={mediaItems}
                            activeMediaItem={activeMediaItem}
                            onChoose={this.setActiveMediaItem}
                        />
                        <Container inner={true}>
                            <p>{Moment( project.date ).format( 'MMM do YYYY' )}</p>
                            <h2>Tools</h2>
                            <Tools />
                            <ul>
                                {project.tools.map( tool => (
                                    <li key={tool}>{tool}</li>
                                ))}
                            </ul>
                            <h2>Categories</h2>
                            <ul>
                                {project.categories.map( category => (
                                    <li key={category.id}>{category.name}</li>
                                ))}
                            </ul>
                            {project.description}
                        </Container>
                    </StyledContainer>
                </Content>
                <AppBar
                    backgroundColor={appBarColor}
                    onBottom={true}
                >
                    <AppBarContainer />
                </AppBar>
            </Wrapper>
        );
    }
}