import IThemeJson from '../contracts/IThemeJson';
import Theme from '../models/Theme';
import Color from '../dataTypes/Color';
import Page from '../models/Page';
import IPageJson from '../contracts/IPageJson';
import EFormFieldType from '../contracts/EFormFieldType';
import IFormFieldJson from '../contracts/IFormFieldJson';
import IFormJson from '../contracts/IFormJson';
import Form from '../models/Form';
import FormField from '../models/FormField';
import EMenuLocation from '../contracts/EMenuLocation';
import IMenuLocationJson from '../contracts/IMenuLocationJson';
import IMenuJson from '../contracts/IMenuJson';
import Menu from '../models/Menu';
import IWPPost from '../contracts/IWPPost';
import EMenuItemType from '../contracts/EMenuItemType';
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
import { formatUrl } from '../utils/Formatting';
import parse from '../utils/Parser';
import ETemplate from '../contracts/ETemplate';
import IThemeColorJson from '../contracts/IThemeColorJson';

export default class WPMapper {
    static mapJsonToTheme( themeJson: IThemeJson ): Theme {
        const theme = new Theme();
        theme.customColors = new Map<string, Color>(
            themeJson.colors.custom_colors.map(( themeColorJson: IThemeColorJson ) => {
                const color = Color.fromHex( themeColorJson.value );

                return [ themeColorJson.name, color ] as [ string, Color ];
            })
        );
        theme.footerColor = Color.fromHex( themeJson.colors.footer_color.value );

        return theme;
    }

    static mapJsonToPages(
        pageJsons: IPageJson[],
        themeJson: IThemeJson
    ): Page[] {
        const theme = WPMapper.mapJsonToTheme( themeJson );

        const pages = pageJsons
            .map(( pageJson: IPageJson ) => {
                const page = new Page();
                page.id = pageJson.ID;
                page.title = pageJson.post_title;
                page.content = parse( pageJson.post_content );
                page.leftContent = parse( pageJson.custom_fields.left_column );
                page.rightContent = parse( pageJson.custom_fields.right_column );
                page.url = pageJson.custom_fields.url;
                page.order = pageJson.menu_order;
                page.template = ETemplate.fromString( pageJson.template );
                page.showTitle = pageJson.custom_fields.show_title;
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
        const formFieldJsonMap = new Map<number, IFormFieldJson>(
            formFieldJsons.map(( formFieldJson: IFormFieldJson ) => {
                return [ formFieldJson.ID, formFieldJson ] as [ number, IFormFieldJson ];
            })
        );

        const map = new Map<number, Form>(
            formJsons.map(( formJson: IFormJson ) => {
                const form = new Form();
                form.id = formJson.ID;
                form.name = formJson.post_title;
                form.fields = formJson.custom_fields.form_fields
                    .map(( formFieldId: number ) => {
                        const formFieldJson = formFieldJsonMap.get( formFieldId );
                        const formField = new FormField();
                        formField.id = formFieldJson.ID;
                        formField.name = formFieldJson.post_title;
                        formField.label = formFieldJson.custom_fields.label;
                        formField.type = EFormFieldType.fromString(
                            formFieldJson.custom_fields.type
                        );
                        formField.required = formFieldJson.custom_fields.required;
                        formField.value = formFieldJson.custom_fields.default_value;
                        formField.placeholder = formFieldJson.custom_fields.placeholder;
                        formField.errorMessage = formFieldJson.custom_fields.error_message;
                        formField.valid = true;

                        return formField;
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
                const menu = new Menu();
                menu.id = menuJson.term_id;
                menu.name = menuJson.name;
                menu.location = menuLocationMap.get( menuJson.location_id );
                menu.items = menuJson.items.map(( menuItemJson: IMenuItemJson ) => {
                    const menuItem = new MenuItem();
                    menuItem.target = postsMap.get( Number.parseInt( menuItemJson.object_id ) );
                    menuItem.id = menuItemJson.ID;
                    menuItem.title = menuItemJson.title;
                    menuItem.order = menuItemJson.menu_order;
                    menuItem.url = menuItem.target ? menuItem.target.url : menuItemJson.url;
                    menuItem.type = EMenuItemType.fromString( menuItemJson.object );

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
                const image = new Image();
                image.id = imageJson.ID;
                image.title = imageJson.post_title;
                image.caption = imageJson.post_excerpt;
                image.urlThumbnail = imageJson.url.thumbnail;
                image.urlLarge = imageJson.url.large;
                image.urlFull = imageJson.guid;

                return [ image.id, image ] as [ number, Image ];
            })
        );

        return map;
    }

    static mapJsonToVideos( videoJsons: IVideoJson[] ): Map<number, Video> {
        const map = new Map<number, Video>(
            videoJsons.map(( videoJson: IVideoJson ) => {
                const video = new Video();
                video.id = videoJson.ID;
                video.title = videoJson.post_title;

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
                const projectCategory = new ProjectCategory();
                projectCategory.id = projectCategoryJson.term_id;
                projectCategory.name = projectCategoryJson.name;
                projectCategory.description = projectCategoryJson.description;
                projectCategory.url = formatUrl(
                    projectCategoryJson.custom_fields.project_category_url
                );
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
                const project = new Project();
                project.id = projectJson.ID;
                project.title = projectJson.post_title;
                project.description = parse( projectJson.post_content );
                project.excerpt = parse( projectJson.post_excerpt );
                project.date = new Date( projectJson.custom_fields.creation_date );
                project.tools = projectJson.custom_fields.tools.split( ',' ).map( t => t.trim() );
                project.url = projectJson.custom_fields.project_url
                    ? projectJson.custom_fields.project_url
                    : projectJson.post_name + '/';
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