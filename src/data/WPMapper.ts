import IThemeJson from '../contracts/IThemeJson';
import Theme from '../models/Theme';
import Color from '../dataTypes/Color';
import Page from '../models/Page';
import IPageJson from '../contracts/IPageJson';
import IFormFieldJson from '../contracts/IFormFieldJson';
import IFormJson from '../contracts/IFormJson';
import Form from '../models/Form';
import FormField from '../models/FormField';
import EMenuLocation from '../contracts/EMenuLocation';
import IMenuLocationJson from '../contracts/IMenuLocationJson';
import IMenuJson from '../contracts/IMenuJson';
import Menu from '../models/Menu';
import IWPPost from '../contracts/IWPPost';
import MenuItem from '../models/MenuItem';
import IMenuItemJson from '../contracts/IMenuItemJson';
import IImageJson from '../contracts/IImageJson';
import Image from '../models/Image';
import IVideoJson from '../contracts/IVideoJson';
import Video from '../models/Video';
import IProjectCategoryJson from '../contracts/IProjectCategoryJson';
import ProjectCategory from '../models/ProjectCategory';
import IProjectJson from '../contracts/IProjectJson';
import Project from '../models/Project';

export default class WPMapper {
    static mapJsonToPages( pageJsons: IPageJson[], themeJson: IThemeJson ): Page[] {
        const theme = new Theme( themeJson );

        const pages = pageJsons
            .map(( pageJson: IPageJson ) => {
                const page = new Page( pageJson );
                const bgColorName = pageJson.custom_fields.background_color;
                const bgColor = theme.getColorByName( bgColorName );
                if ( bgColor ) {
                    page.backgroundColor = bgColor;
                } else {
                    page.backgroundColor = new Color( 100, 100, 100 );
                }

                return page;
            }).sort(( a: Page, b: Page ) => a.order - b.order );

        return pages;
    }

    static mapJsonToForms(
        formJsons: IFormJson[],
        formFieldJsons: IFormFieldJson[]
    ): Map<number, Form> {
        const formFieldMap = new Map<number, IFormFieldJson>(
            formFieldJsons.map(( formFieldJson: IFormFieldJson ) => {
                return [ formFieldJson.ID, formFieldJson ] as [ number, IFormFieldJson ];
            })
        );

        const map = new Map<number, Form>(
            formJsons.map(( formJson: IFormJson ) => {
                const form = new Form( formJson );
                form.fields = formJson.custom_fields.form_fields
                    .map(( formFieldId: number ) => {
                        return new FormField( formFieldMap.get( formFieldId ) );
                    });

                return [ form.id, form ] as [ number, Form ];
            })
        );

        return map;
    }

    static mapJsonToMenuLocations(
        menuLocationJsons: IMenuLocationJson[]
    ): Map<number, EMenuLocation> {
        const map = new Map<number, EMenuLocation>(
            menuLocationJsons.map(( locationJson: IMenuLocationJson ) => {
                const menuLocation = EMenuLocation.fromString( locationJson.name );

                return [ locationJson.id, menuLocation ] as [ number, EMenuLocation ];
            })
        );

        return map;
    }

    static mapJsonToMenus(
        menuJsons: IMenuJson[],
        menuLocationJsons: IMenuLocationJson[],
        posts: IWPPost[]
    ): Map<EMenuLocation, Menu> {
        const menuLocationMap = WPMapper.mapJsonToMenuLocations( menuLocationJsons );

        const postsMap = new Map<number, IWPPost>(
            [ ...posts ].map(( post: IWPPost ) => [ post.id, post ] as [ number, IWPPost ])
        );

        const map = new Map<EMenuLocation, Menu>(
            menuJsons.map(( menuJson: IMenuJson ) => {
                const menu = new Menu( menuJson );
                menu.location = menuLocationMap.get( menuJson.location_id );
                menu.items = menuJson.items.map(( menuItemJson: IMenuItemJson ) => {
                    const menuItem = new MenuItem( menuItemJson );
                    menuItem.target = postsMap.get( Number.parseInt( menuItemJson.object_id ) );

                    return menuItem;
                });

                return [ menu.location, menu ] as [ EMenuLocation, Menu ];
            })
        );

        return map;
    }

    static mapJsonToImages( imageJsons: IImageJson[] ): Map<number, Image> {
        const map = new Map<number, Image>(
            imageJsons.map(( imageJson: IImageJson ) => {
                const image = new Image( imageJson );

                return [ image.id, image ] as [ number, Image ];
            })
        );

        return map;
    }

    static mapJsonToVideos( videoJsons: IVideoJson[] ): Map<number, Video> {
        const map = new Map<number, Video>(
            videoJsons.map(( videoJson: IVideoJson ) => {
                const video = new Video( videoJson );

                return [ video.id, video ] as [ number, Video ];
            })
        );

        return map;
    }

    static mapJsonToProjectCategories(
        projectCategoryJsons: IProjectCategoryJson[],
        imageJsons: IImageJson[]
    ): ProjectCategory[] {
        const imagesMap = WPMapper.mapJsonToImages( imageJsons );
        const projectCategories = projectCategoryJsons
            .map(( projectCategoryJson: IProjectCategoryJson ) => {
                const projectCategory = new ProjectCategory( projectCategoryJson );
                const customFields = projectCategoryJson.custom_fields;
                const imageId = Number.parseInt( customFields.project_category_image );
                projectCategory.image = imagesMap.get( imageId );

                return projectCategory;
            });

        return projectCategories;
    }

    static mapJsonToProjects(
        projectJsons: IProjectJson[],
        imageJsons: IImageJson[],
        videoJsons: IVideoJson[],
        projectCategoryJsons: IProjectCategoryJson[]
    ): Project[] {
        const imagesMap = WPMapper.mapJsonToImages( imageJsons );
        const videosMap = WPMapper.mapJsonToVideos( videoJsons );
        const projectCategories = WPMapper.mapJsonToProjectCategories(
            projectCategoryJsons,
            imageJsons
        );
        const projects = projectJsons
            .map(( projectJson: IProjectJson ) => {
                const project = new Project( projectJson );
                project.images = projectJson.custom_fields.images.map(
                    ( imageId: number ) => imagesMap.get( imageId )
                );
                const jsonVideos = projectJson.custom_fields.videos;
                if ( jsonVideos && Array.isArray( jsonVideos ) ) {
                    project.videos = projectJson.custom_fields.videos.map(
                        ( videoId: number ) => videosMap.get( videoId )
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

        return projects;
    }
}