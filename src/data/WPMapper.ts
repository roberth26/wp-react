import * as slug from 'slug';
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
import IMenuJson from '../contracts/IMenuJson';
import Menu from '../models/Menu';
import EThemeLocation from '../contracts/EThemeLocation';
import IThemeLocationJson from '../contracts/IThemeLocationJson';
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
import parse from '../utils/Parser';
import ETemplate from '../contracts/ETemplate';
import IThemeColorJson from '../contracts/IThemeColorJson';
import IWPPost from '../contracts/IWPPost';
import IWidgetAreaJson from '../contracts/IWidgetAreaJson';
import WidgetArea from '../models/WidgetArea';
import { leadingSlash, trailingSlash } from '../utils/Formatting';

export default class WPMapper {
    static mapThemeJsonToTheme( themeJson: IThemeJson ): Theme {
        const theme = new Theme();
        theme.customColors = new Map<string, Color>(
            themeJson.colors.custom_colors.map(( themeColorJson: IThemeColorJson ) => {
                const color = Color.fromHex( themeColorJson.value );

                return [ themeColorJson.name, color ] as [ string, Color ];
            })
        );
        theme.footerColor = Color.fromHex( themeJson.colors.footer_color.value );
        theme.primaryFontColor = Color.fromHex( themeJson.colors.primary_font_color.value );
        theme.secondaryFontColor = Color.fromHex( themeJson.colors.secondary_font_color.value );
        theme.fontSizeUnit = themeJson.units.find(
            themeUnitJson => themeUnitJson.name === 'Font Size'
        ).value;
        theme.spacingUnit = themeJson.units.find(
            themeUnitJson => themeUnitJson.name === 'Spacing'
        ).value;

        return theme;
    }

    static mapPageJsonToPage( pageJson: IPageJson ): Page {
        const page = new Page();
        page.id = pageJson.ID;
        page.title = pageJson.post_title;
        page.content = parse( pageJson.post_content );
        page.leftContent = parse( pageJson.custom_fields.left_column );
        page.rightContent = parse( pageJson.custom_fields.right_column );
        page.url = pageJson.custom_fields.url
            ? leadingSlash( trailingSlash( pageJson.custom_fields.url ) )
            : leadingSlash( trailingSlash( slug( page.title ) ) );
        page.order = pageJson.menu_order;
        page.template = ETemplate.fromString( pageJson.template );
        page.showTitle = pageJson.custom_fields.show_title;
        page.backgroundColorName = pageJson.custom_fields.background_color;

        return page;
    }

    static mapFormFieldJsonToFormField( formFieldJson: IFormFieldJson ): FormField {
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

        return formField;
    }

    static mapFormJsonsToForms(
        formJsons: IFormJson[],
        formFieldJsons: IFormFieldJson[]
    ): Form[] {
        const formFieldJsonMap = new Map<number, IFormFieldJson>(
            formFieldJsons.map( formFieldJson => {
                return [ formFieldJson.ID, formFieldJson ] as [ number, IFormFieldJson ];
            })
        );

        const forms = formJsons.map( formJson => {
            const form = new Form();
            form.id = formJson.ID;
            form.name = formJson.post_title;
            form.fields = formJson.custom_fields.form_fields
                .map(( formFieldId: number ) => {
                    const formFieldJson = formFieldJsonMap.get( formFieldId );

                    return WPMapper.mapFormFieldJsonToFormField( formFieldJson );
                });

            return form;
        });

        return forms;
    }

    static mapThemeLocationJsonsToThemeLocationsMap(
        themeLocationJsons: IThemeLocationJson[]
    ): Map<number, EThemeLocation> {
        const map = new Map<number, EThemeLocation>(
            themeLocationJsons.map(( locationJson: IThemeLocationJson ) => {
                const themeLocation = EThemeLocation.fromString( locationJson.name );

                return [ locationJson.id, themeLocation ] as [ number, EThemeLocation ];
            })
        );

        return map;
    }

    static mapMenuItemJsonToMenuItem(
        menuItemJson: IMenuItemJson,
        target: IWPPost
    ): MenuItem {
        const menuItem = new MenuItem();
        menuItem.id = menuItemJson.ID;
        menuItem.title = parse( menuItemJson.title );
        menuItem.order = menuItemJson.menu_order;
        menuItem.url = target ? target.url : menuItemJson.url;
        menuItem.type = EMenuItemType.fromString( menuItemJson.object );

        return menuItem;
    }

    static mapMenuJsonsToMenus(
        menuJsons: IMenuJson[],
        themeLocationJsons: IThemeLocationJson[],
        posts: IWPPost[]
    ): Menu[] {
        const themeLocationMap = new Map<number, EThemeLocation>(
            themeLocationJsons.map( themeLocationJson => {
                const themeLocation = EThemeLocation.fromString( themeLocationJson.name );

                return [ themeLocationJson.id, themeLocation ] as [ number, EThemeLocation ];
            })
        );

        const postMap = new Map<number, IWPPost>(
            posts.map( post => {
                return [ post.id, post ] as [ number, IWPPost ];
            })
        );

        const menus = menuJsons.map( menuJson => {
            const menu = new Menu();
            menu.id = menuJson.term_id;
            menu.name = menuJson.name;
            menu.themeLocation = themeLocationMap.get( menuJson.location_id );
            menu.items = menuJson.items.map( menuItemJson => {
                return WPMapper.mapMenuItemJsonToMenuItem(
                    menuItemJson,
                    postMap.get( Number.parseInt( menuItemJson.object_id ) )
                );
            });

            return menu;
        });

        return menus;
    }

    static mapImageJsonToImage( imageJson: IImageJson ): Image {
        const image = new Image();
        image.id = imageJson.ID;
        image.title = imageJson.post_title;
        image.caption = imageJson.post_excerpt;
        image.urlThumbnail = imageJson.url.thumbnail;
        image.urlLarge = imageJson.url.large;
        image.urlFull = imageJson.guid;

        return image;
    }

    static getVimeoIdFromUrl( url: string ): number {
        /* tslint:disable */
        const regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
        /* tslint:enable */
        return Number.parseInt( url.match( regex )[ 3 ] );
    }

    static mapVideoJsonToVideo( videoJson: IVideoJson ): Video {
        const video = new Video();
        video.id = videoJson.ID;
        video.title = videoJson.post_title;
        video.url = videoJson.custom_fields.url;
        // TODO: this is janky
        const thumbnail = new Image();
        if ( video.url.indexOf( 'youtube' ) > -1 ) {
            let id = video.url.split( 'v=' )[ 1 ];
            const ampersandPosition = id.indexOf ('&' );
            if ( ampersandPosition > -1 ) {
                id = id.substring( 0, ampersandPosition );
            }
            thumbnail.urlThumbnail = `http://img.youtube.com/vi/${id}/mqdefault.jpg`;
        } else if ( video.url.indexOf( 'vimeo' ) > -1 ) {
            const id = WPMapper.getVimeoIdFromUrl( video.url );
            thumbnail.urlThumbnail = `https://i.vimeocdn.com/video/${id}_320x320.jpg`;
        }
        video.thumbnail = thumbnail;

        return video;
    }

    static mapProjectCategoryJsonsToProjectCategories(
        projectCategoryJsons: IProjectCategoryJson[],
        imageJsons: IImageJson[]
    ): ProjectCategory[] {
        const imageMap = new Map(
            imageJsons.map( imageJson => {
                const image = WPMapper.mapImageJsonToImage( imageJson );

                return [ image.id, image ] as [ number, Image ];
            })
        );

        const projectCategories = projectCategoryJsons.map( projectCategoryJson => {
            const projectCategory = new ProjectCategory();
            projectCategory.id = projectCategoryJson.term_id;
            projectCategory.name = projectCategoryJson.name;
            projectCategory.description = projectCategoryJson.description;
            const customFields = projectCategoryJson.custom_fields;
            projectCategory.url = customFields.project_category_url
                ? customFields.project_category_url
                : slug( projectCategory.name );
            projectCategory.image = imageMap.get(
                Number.parseInt( customFields.project_category_image )
            );

            return projectCategory;
        });

        return projectCategories;
    }

    static mapProjectJsonsToProjects(
        projectJsons: IProjectJson[],
        imageJsons: IImageJson[],
        videoJsons: IVideoJson[]
    ): Project[] {
        const imageJsonMap = new Map(
            imageJsons.map( imageJson => {
                return [ imageJson.ID, imageJson ] as [ number, IImageJson ];
            })
        );

        const videoJsonMap = new Map(
            videoJsons.map( videoJson => {
                return [ videoJson.ID, videoJson ] as [ number, IVideoJson ];
            })
        );

        const projects = projectJsons.map( projectJson => {
            const project = new Project();
            project.id = projectJson.ID;
            project.title = projectJson.post_title;
            project.description = parse( projectJson.post_content );
            project.excerpt = parse( projectJson.post_excerpt );
            project.date = new Date( projectJson.custom_fields.creation_date );
            project.tools = projectJson.custom_fields.tools.split( ',' ).map( t => t.trim() );
            project.url = projectJson.custom_fields.project_url
                ? leadingSlash( trailingSlash( projectJson.custom_fields.project_url ) )
                : leadingSlash( trailingSlash( slug( projectJson.post_name ) ) );
            project.categoryMap = new Map(
                projectJson.category_ids.map( catId => {
                    return [ catId, null ] as [ number, ProjectCategory ];
                })
            );
            project.imageMap = new Map(
                ( projectJson.custom_fields.images || [] ).map( imageId => {
                    const image = WPMapper.mapImageJsonToImage( imageJsonMap.get( imageId ) );

                    return [ image.id, image ] as [ number, Image ];
                })
            );
            project.videoMap = new Map(
                ( projectJson.custom_fields.videos || [] ).map( videoId => {
                    const video = WPMapper.mapVideoJsonToVideo( videoJsonMap.get( videoId ) );

                    return [ video.id, video ] as [ number, Video ];
                })
            );

            return project;
        });

        return projects;
    }

    static mapWidgetAreaJsonsToWidgetAreas( widgetAreaJsons: IWidgetAreaJson[] ): WidgetArea[] {
        const widgetAreas = widgetAreaJsons.map( widgetAreaJson => {
            const widgetArea = new WidgetArea();
            widgetArea.themeLocation = EThemeLocation.fromString( widgetAreaJson.id );
            widgetArea.content = parse( widgetAreaJson.content );

            return widgetArea;
        });

        return widgetAreas;
    }
}