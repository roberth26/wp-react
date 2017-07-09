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
import WidgetArea from '../models/WidgetArea';
import IConnector from '../contracts/IConnector';
import basename from '../utils/basename';

const domData: IWPResponseJson = window[ '__PORTFOLIO_DATA__' ];

export default class WPDOMConnector implements IConnector {
    getTheme(): Promise<Theme> {
        const promise = new Promise( resolve => {
            const theme = WPMapper.mapThemeJsonToTheme( domData.theme );
            resolve( theme );
        });

        return promise;
    }

    getPages(): Promise<Page[]> {
        const promise = new Promise( resolve => {
            const pages = domData.pages.map( WPMapper.mapPageJsonToPage );
            resolve( pages );
        });

        return promise;
    }

    getMenus(): Promise<Menu[]> {
        const promise = new Promise( resolve => {
            const projects = WPMapper.mapProjectJsonsToProjects(
                domData.projects,
                domData.images,
                domData.videos
            );
            const pages = domData.pages.map( WPMapper.mapPageJsonToPage );
            const projectCategories = WPMapper.mapProjectCategoryJsonsToProjectCategories(
                domData.project_categories,
                domData.images
            );
            const posts = new Array<IWPPost>( ...projects, ...pages, ...projectCategories );
            const menus = WPMapper.mapMenuJsonsToMenus(
                domData.menus,
                domData.theme_locations,
                posts,
                pages
            );
            resolve( menus );
        });

        return promise;
    }

    getThemeLocations(): Promise<Map<number, EThemeLocation>> {
        const promise = new Promise( resolve => {
            const themeLocations = WPMapper.mapThemeLocationJsonsToThemeLocationsMap(
                domData.theme_locations
            );
            resolve( themeLocations );
        });

        return promise;
    }

    getForms(): Promise<Form[]> {
        const promise = new Promise( resolve => {
            const forms = WPMapper.mapFormJsonsToForms( domData.forms, domData.form_fields );
            resolve( forms );
        });

        return promise;
    }

    getImages(): Promise<Image[]> {
        const promise = new Promise( resolve => {
            const images = domData.images.map( WPMapper.mapImageJsonToImage );
            resolve( images );
        });

        return promise;
    }

    getVideos(): Promise<Video[]> {
        const promise = new Promise( resolve => {
            const videos = domData.videos.map( WPMapper.mapVideoJsonToVideo );
            resolve( videos );
        });

        return promise;
    }

    getProjects(): Promise<Project[]> {
        const promise = new Promise( resolve => {
            const projects = WPMapper.mapProjectJsonsToProjects(
                domData.projects,
                domData.images,
                domData.videos
            );
            resolve( projects );
        });

        return promise;
    }

    getProjectCategories(): Promise<ProjectCategory[]> {
        const promise = new Promise( resolve => {
            const categories = WPMapper.mapProjectCategoryJsonsToProjectCategories(
                domData.project_categories,
                domData.images
            );
            resolve( categories );
        });

        return promise;
    }

    getWidgetAreas(): Promise<WidgetArea[]> {
        const promise = new Promise( resolve => {
            const widgetAreas = WPMapper.mapWidgetAreaJsonsToWidgetAreas(
                domData.widget_areas
            );
            resolve( widgetAreas );
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