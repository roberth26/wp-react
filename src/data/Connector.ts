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
        return Promise.resolve( WPMapper.mapThemeJsonToTheme( domData.theme ) );
    }

    static getPages(): Promise<Page[]> {
        return Promise.resolve( WPMapper.mapPageJsonsToPages( domData.pages, domData.theme ) );
    }

    static getForms(): Promise<Map<number, Form>> {
        return Promise.resolve( WPMapper.mapFormJsonsToForms(
            domData.forms,
            domData.form_fields
        ));
    }

    static getImages(): Promise<Map<number, Image>> {
        return Promise.resolve( WPMapper.mapImageJsonsToImages( domData.images ) );
    }

    static getVideos(): Promise<Map<number, Video>> {
        return Promise.resolve( WPMapper.mapVideoJsonsToVideos( domData.videos ) );
    }

    static getProjects(): Promise<Project[]> {
        const projects = WPMapper.mapProjectJsonsToProjects(
            domData.projects,
            domData.images,
            domData.videos,
            domData.project_categories
        );

        return Promise.resolve( projects );
    }

    static getProjectCategories(): Promise<ProjectCategory[]> {
        const categories = WPMapper.mapProjectCategoryJsonsToProjectCategories(
            domData.project_categories,
            domData.images
        );

        return Promise.resolve( categories );
    }

    static getMenus(): Promise<Map<EMenuLocation, Menu>> {
        const images = WPMapper.mapPageJsonsToPages( domData.pages, domData.theme );
        const projects = WPMapper.mapProjectJsonsToProjects(
            domData.projects,
            domData.images,
            domData.videos,
            domData.project_categories
        );

        const posts = [ ...images, ...projects ];

        const menus = WPMapper.mapMenuJsonsToMenus(
            domData.menus,
            domData.menu_locations,
            posts
        );

        return Promise.resolve( menus );
    }
}