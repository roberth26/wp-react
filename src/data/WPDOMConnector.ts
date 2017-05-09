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
import basename from '../utils/basename';

const domData: IWPResponseJson = window[ '__PORTFOLIO_DATA__' ];

export default class Connector implements IConnector {
    getTheme( delay = 0 ): Promise<Theme> {
        const promise = new Promise( resolve => {
            const theme = WPMapper.mapThemeJsonToTheme( domData.theme );
            setTimeout( resolve.bind( null, theme ), delay ); // simulate latency
        });

        return promise;
    }

    getPages( delay = 0 ): Promise<Page[]> {
        const promise = new Promise( resolve => {
            const pages = domData.pages.map( WPMapper.mapPageJsonToPage );
            setTimeout( resolve.bind( null, pages ), delay ); // simulate latency
        });

        return promise;
    }

    getMenus( delay = 0 ): Promise<Menu[]> {
        const promise = new Promise( resolve => {
            const projects = WPMapper.mapProjectJsonsToProjects(
                domData.projects,
                domData.images,
                domData.videos
            );
            const pages = domData.pages.map( WPMapper.mapPageJsonToPage );
            const posts = new Array<IWPPost>( ...projects, ...pages );
            const menus = WPMapper.mapMenuJsonsToMenus(
                domData.menus,
                domData.theme_locations,
                posts
            );
            setTimeout( resolve.bind( null, menus ), delay ); // simulate latency
        });

        return promise;
    }

    getThemeLocations( delay = 0 ): Promise<Map<number, EThemeLocation>> {
        const promise = new Promise( resolve => {
            const themeLocations = WPMapper.mapThemeLocationJsonsToThemeLocationsMap(
                domData.theme_locations
            );
            setTimeout( resolve.bind( null, themeLocations ), delay ); // simulate latency
        });

        return promise;
    }

    getForms( delay = 0 ): Promise<Form[]> {
        const promise = new Promise( resolve => {
            const forms = WPMapper.mapFormJsonsToForms( domData.forms, domData.form_fields );
            setTimeout( resolve.bind( null, forms ), delay ); // simulate latency
        });

        return promise;
    }

    getImages( delay = 0 ): Promise<Image[]> {
        const promise = new Promise( resolve => {
            const images = domData.images.map( WPMapper.mapImageJsonToImage );
            setTimeout( resolve.bind( null, images ), delay ); // simulate latency
        });

        return promise;
    }

    getVideos( delay = 0 ): Promise<Video[]> {
        const promise = new Promise( resolve => {
            const videos = domData.videos.map( WPMapper.mapVideoJsonToVideo );
            setTimeout( resolve.bind( null, videos ), delay ); // simulate latency
        });

        return promise;
    }

    getProjects( delay = 0 ): Promise<Project[]> {
        const promise = new Promise( resolve => {
            const projects = WPMapper.mapProjectJsonsToProjects(
                domData.projects,
                domData.images,
                domData.videos
            );
            setTimeout( resolve.bind( null, projects ), delay ); // simulate latency
        });

        return promise;
    }

    getProjectCategories( delay = 0 ): Promise<ProjectCategory[]> {
        const promise = new Promise( resolve => {
            const categories = WPMapper.mapProjectCategoryJsonsToProjectCategories(
                domData.project_categories,
                domData.images
            );
            setTimeout( resolve.bind( null, categories ), delay ); // simulate latency
        });

        return promise;
    }

    submitForm( form: Form ): Promise<void> {
        if ( !form.validate() ) {
            return Promise.reject( 'Invalid Form' );
        }

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