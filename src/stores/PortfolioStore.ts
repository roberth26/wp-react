import { observable, useStrict, action, runInAction } from 'mobx';
import IProjectJson from '../contracts/IProjectJson';
import Project from '../models/Project';
import IImageJson from '../contracts/IImageJson';
import Image from '../models/Image';
import IVideoJson from '../contracts/IVideoJson';
import Video from '../models/Video';
import IProjectCategoryJson from '../contracts/IProjectCategoryJson';
import ProjectCategory from '../models/ProjectCategory';
import IDataJson from '../contracts/IDataJson';

useStrict( true );

export default class PortfolioStore {
    @observable projects: Project[];
    @observable projectCategories: ProjectCategory[];
    @observable images: Map<number, Image>;
    @observable videos: Map<number, Video>;

    constructor( dataJson: IDataJson ) {
        this.loadData( dataJson );
    }

    @action loadData( dataJson: IDataJson ) {
        const images = new Map<number, Image>(
            dataJson.images.map(( imageJson: IImageJson ) => {
                const image = new Image( imageJson );
                return [ image.id, image ] as [ number, Image ];
            })
        );

        const videos = new Map<number, Video>(
            dataJson.videos.map(( videoJson: IVideoJson ) => {
                const video = new Video( videoJson );
                return [ video.id, video ] as [ number, Video ];
            })
        );

        const projectCategories = dataJson.project_categories
            .map(( projectCategoryJson: IProjectCategoryJson ) => {
                const projectCategory = new ProjectCategory( projectCategoryJson );
                const customFields = projectCategoryJson.custom_fields;
                const imageId = Number.parseInt( customFields.project_category_image );
                projectCategory.image = images.get( imageId );

                return projectCategory;
            });

        const projects = dataJson.projects
            .map(( projectJson: IProjectJson ) => {
                const project = new Project( projectJson );
                project.images = projectJson.custom_fields.images.map(
                    ( imageId: number ) => images.get( imageId )
                );
                const jsonVideos = projectJson.custom_fields.videos;
                if ( jsonVideos && Array.isArray( jsonVideos ) ) {
                    project.videos = projectJson.custom_fields.videos.map(
                        ( videoId: number ) => videos.get( videoId )
                    );
                }
                project.categories = projectCategories.filter(
                    ( projectCategory: ProjectCategory) => {
                        return projectJson.category_ids.indexOf( projectCategory.id ) > -1;
                    }
                );
                return project;
            })
            .sort(( a: Project, b: Project ) => b.date.getTime() - a.date.getTime() );

        runInAction(() => {
            this.images = images;
            this.videos = videos;
            this.projects = projects;
            this.projectCategories = projectCategories;
        });
    }

    getProjectCategoryById( id: number ): ProjectCategory {
        return this.projectCategories.find(( projectCategory: ProjectCategory ) => {
            return projectCategory.id === id;
        });
    }

    getProjectsByCategory( projectCategory: ProjectCategory ): Project[] {
        return this.projects.filter(( project: Project ) => {
            return project.categories.indexOf( projectCategory ) > -1;
        });
    }

    getPreviousProject( project: Project, projectCategory?: ProjectCategory ): Project {
        let projects = this.projects;
        if ( projectCategory ) {
            projects = this.getProjectsByCategory( projectCategory );
        }
        const index = projects.indexOf( project );
        if ( index <= 0 ) {
            return projects[ projects.length - 1 ];
        }

        return projects[ index - 1 ];
    }

    getNextProject( project: Project, projectCategory?: ProjectCategory ): Project {
        let projects = this.projects;
        if ( projectCategory ) {
            projects = this.getProjectsByCategory( projectCategory );
        }
        const index = projects.indexOf( project );
        if ( index >= projects.length - 1 ) {
            return projects[ 0 ];
        }

        return projects[ index + 1 ];
    }
}