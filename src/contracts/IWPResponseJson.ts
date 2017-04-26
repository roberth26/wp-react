import IPageJson from './IPageJson';
import IProjectJson from './IProjectJson';
import IProjectCategoryJson from './IProjectCategoryJson';
import IImageJson from './IImageJson';
import IVideoJson from './IVideoJson';
import IFormJson from './IFormJson';
import IFormFieldJson from './IFormFieldJson';
import IMenuJson from './IMenuJson';
import IThemeLocationJson from './IThemeLocationJson';
import IThemeJson from './IThemeJson';

interface IWPResponseJson {
    pages: IPageJson[];
    projects: IProjectJson[];
    project_categories: IProjectCategoryJson[];
    images: IImageJson[];
    videos: IVideoJson[];
    forms: IFormJson[];
    form_fields: IFormFieldJson[];
    menus: IMenuJson[];
    theme_locations: IThemeLocationJson[];
    theme: IThemeJson;
}

export default IWPResponseJson;