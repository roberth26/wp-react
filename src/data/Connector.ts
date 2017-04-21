import WPMapper from './WPMapper';
import Page from '../models/Page';
import IWPResponseJson from '../contracts/IWPResponseJson';
import Theme from '../models/Theme';
import Form from '../models/Form';
import Image from '../models/Image';
import Video from '../models/Video';
import Project from '../models/Project';
import ProjectCategory from '../models/ProjectCategory';
import EMenuLocation from '../contracts/EMenuLocation';
import Menu from '../models/Menu';

const domData: IWPResponseJson = window[ '__PORTFOLIO_DATA__' ];

export default class Connector {
    static getTheme(): Promise<Theme> {
        return Promise.resolve( WPMapper.mapJsonToTheme( domData.theme ) );
    }

    static getPages(): Promise<Page[]> {
        return Promise.resolve( WPMapper.mapJsonToPages( domData.pages, domData.theme ) );
    }

    static getForms(): Promise<Map<number, Form>> {
        return Promise.resolve( WPMapper.mapJsonToForms( domData.forms, domData.form_fields ) );
    }

    static getImages(): Promise<Map<number, Image>> {
        return Promise.resolve( WPMapper.mapJsonToImages( domData.images ) );
    }

    static getVideos(): Promise<Map<number, Video>> {
        return Promise.resolve( WPMapper.mapJsonToVideos( domData.videos ) );
    }

    static getProjects(): Promise<Project[]> {
        const projects = WPMapper.mapJsonToProjects(
            domData.projects,
            domData.images,
            domData.videos,
            domData.project_categories
        );

        return Promise.resolve( projects );
    }

    static getProjectCategories(): Promise<ProjectCategory[]> {
        const categories = WPMapper.mapJsonToProjectCategories(
            domData.project_categories,
            domData.images
        );

        return Promise.resolve( categories );
    }

    static getMenus(): Promise<Map<EMenuLocation, Menu>> {
        const images = WPMapper.mapJsonToPages( domData.pages, domData.theme );
        const projects = WPMapper.mapJsonToProjects(
            domData.projects,
            domData.images,
            domData.videos,
            domData.project_categories
        );

        const posts = [ ...images, ...projects ];

        const menus = WPMapper.mapJsonToMenus(
            domData.menus,
            domData.menu_locations,
            posts
        );

        return Promise.resolve( menus );
    }
}