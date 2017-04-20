import { observable, useStrict } from 'mobx';
import Project from '../models/Project';
import Image from '../models/Image';
import Video from '../models/Video';
import ProjectCategory from '../models/ProjectCategory';

useStrict( true );

export default class PortfolioStore {
    @observable projects: Project[];
    @observable projectCategories: ProjectCategory[];
    @observable images: Map<number, Image>;
    @observable videos: Map<number, Video>;

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