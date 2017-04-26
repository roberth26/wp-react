import Axios, { AxiosResponse } from 'axios';
import WPMapper from './WPMapper';
import Page from '../models/Page';
import IWPResponseJson from '../contracts/IWPResponseJson';
import Theme from '../models/Theme';
import Form from '../models/Form';
import Image from '../models/Image';
import Video from '../models/Video';
import Project from '../models/Project';
import ProjectCategory from '../models/ProjectCategory';
import Menu from '../models/Menu';
import EThemeLocation from '../contracts/EThemeLocation';
import IWPPost from '../contracts/IWPPost';
import IConnector from '../contracts/IConnector';

const domData: IWPResponseJson = window[ '__PORTFOLIO_DATA__' ];

export default class Connector implements IConnector {
    constructor(
        private delay = 0 // ms
     ) {}

    getTheme(): Promise<Theme> {
        const promise = new Promise( resolve => {
            const theme = WPMapper.mapThemeJsonToTheme( domData.theme );
            setTimeout( resolve.bind( null, theme ), this.delay ); // simulate latency
        });

        return promise;
    }

    getPages(): Promise<Page[]> {
        const promise = new Promise( resolve => {
            const pages = domData.pages.map( WPMapper.mapPageJsonToPage );
            setTimeout( resolve.bind( null, pages ), this.delay ); // simulate latency
        });

        return promise;
    }

    getMenus(): Promise<Menu[]> {
        const promise = new Promise( resolve => {
            const projects = domData.projects.map( WPMapper.mapProjectJsonToProject );
            const pages = domData.pages.map( WPMapper.mapPageJsonToPage );
            const posts = new Array<IWPPost>( ...projects, ...pages );
            const menus = WPMapper.mapMenuJsonsToMenus(
                domData.menus,
                domData.theme_locations,
                posts
            );
            setTimeout( resolve.bind( null, menus ), this.delay ); // simulate latency
        });

        return promise;
    }

    getThemeLocations(): Promise<Map<number, EThemeLocation>> {
        const promise = new Promise( resolve => {
            const themeLocations = WPMapper.mapThemeLocationJsonsToThemeLocationsMap(
                domData.theme_locations
            );
            setTimeout( resolve.bind( null, themeLocations ), this.delay ); // simulate latency
        });

        return promise;
    }

    getForms(): Promise<Form[]> {
        const promise = new Promise( resolve => {
            const forms = WPMapper.mapFormJsonsToForms( domData.forms, domData.form_fields );
            setTimeout( resolve.bind( null, forms ), this.delay ); // simulate latency
        });

        return promise;
    }

    getImages(): Promise<Image[]> {
        const promise = new Promise( resolve => {
            const images = domData.images.map( WPMapper.mapImageJsonToImage );
            setTimeout( resolve.bind( null, images ), this.delay ); // simulate latency
        });

        return promise;
    }

    getVideos(): Promise<Video[]> {
        const promise = new Promise( resolve => {
            const videos = domData.videos.map( WPMapper.mapVideoJsonToVideo );
            setTimeout( resolve.bind( null, videos ), this.delay ); // simulate latency
        });

        return promise;
    }

    getProjects(): Promise<Project[]> {
        const promise = new Promise( resolve => {
            const projects = domData.projects.map( WPMapper.mapProjectJsonToProject );
            setTimeout( resolve.bind( null, projects ), this.delay ); // simulate latency
        });

        return promise;
    }

    getProjectCategories(): Promise<ProjectCategory[]> {
        const promise = new Promise( resolve => {
            const categories = domData.project_categories.map(
                WPMapper.mapProjectCategoryJsonToProjectCategory
            );
            setTimeout( resolve.bind( null, categories ), this.delay ); // simulate latency
        });

        return promise;
    }

    submitForm( form: Form ): Promise<void> {
        if ( !form.validate() ) {
            return Promise.reject( 'Invalid Form' );
        }

        // prefix router base path for dev environment TODO: move to build process
        const basename = location.hostname === 'localhost' ? '/caitlyn' : '';

        const promise = Axios.post( `${basename}/email.php`, Form.serialize( form ) )
            .then(( response: AxiosResponse ) => {
                const json = response.data;
                if ( !json.hasErrors ) {
                    return;
                }

                // invalidate fields with errors
                json.fields.forEach( jsonField => {
                    const field = form.fields.find( f => f.id === jsonField.id );
                    if ( field && jsonField.error ) {
                        field.setInvalid();
                    }
                });
            });

        return promise as Promise<void>;
    }
}