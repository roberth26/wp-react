import IPageJson from './IPageJson';
import IProjectJson from './IProjectJson';
import IProjectCategoryJson from './IProjectCategoryJson';
import IImageJson from './IImageJson';
import IVideoJson from './IVideoJson';
import IFormJson from './IFormJson';
import IFormFieldJson from './IFormFieldJson';
import IMenuJson from './IMenuJson';
import IMenuLocationJson from './IMenuLocationJson';
import IThemeJson from './IThemeJson';

interface IDataJson {
    pages: IPageJson[];
    projects: IProjectJson[];
    project_categories: IProjectCategoryJson[];
    images: IImageJson[];
    videos: IVideoJson[];
    forms: IFormJson[];
    form_fields: IFormFieldJson[];
    menus: IMenuJson[];
    menu_locations: IMenuLocationJson[];
    theme: IThemeJson;
}

export default IDataJson;