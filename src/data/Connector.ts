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
import EMenuLocation from '../contracts/EMenuLocation';
import Menu from '../models/Menu';
import IConnector from '../contracts/IConnector';

const domData: IWPResponseJson = window[ '__PORTFOLIO_DATA__' ];

export default class Connector implements IConnector {
    getTheme(): Promise<Theme> {
        return Promise.resolve( WPMapper.mapThemeJsonToTheme( domData.theme ) );
    }

    getPages(): Promise<Page[]> {
        return Promise.resolve( WPMapper.mapPageJsonsToPages( domData.pages, domData.theme ) );
    }

    getForms(): Promise<Map<number, Form>> {
        return Promise.resolve( WPMapper.mapFormJsonsToForms(
            domData.forms,
            domData.form_fields
        ));
    }

    getImages(): Promise<Map<number, Image>> {
        return Promise.resolve( WPMapper.mapImageJsonsToImages( domData.images ) );
    }

    getVideos(): Promise<Map<number, Video>> {
        return Promise.resolve( WPMapper.mapVideoJsonsToVideos( domData.videos ) );
    }

    getProjects(): Promise<Project[]> {
        const projects = WPMapper.mapProjectJsonsToProjects(
            domData.projects,
            domData.images,
            domData.videos,
            domData.project_categories
        );

        return Promise.resolve( projects );
    }

    getProjectCategories(): Promise<ProjectCategory[]> {
        const categories = WPMapper.mapProjectCategoryJsonsToProjectCategories(
            domData.project_categories,
            domData.images
        );

        return Promise.resolve( categories );
    }

    getMenus(): Promise<Map<EMenuLocation, Menu>> {
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