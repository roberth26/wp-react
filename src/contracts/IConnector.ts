import Page from '../models/Page';
import Theme from '../models/Theme';
import Form from '../models/Form';
import Image from '../models/Image';
import Video from '../models/Video';
import Project from '../models/Project';
import ProjectCategory from '../models/ProjectCategory';
import EThemeLocation from '../contracts/EThemeLocation';
import Menu from '../models/Menu';

interface IConnector {
    getTheme(): Promise<Theme>;
    getPages(): Promise<Page[]>;
    getForms(): Promise<Form[]>;
    getImages(): Promise<Image[]>;
    getVideos(): Promise<Video[]>;
    getProjects(): Promise<Project[]>;
    getProjectCategories(): Promise<ProjectCategory[]>;
    getMenus(): Promise<Menu[]>;
    getThemeLocations(): Promise<Map<number, EThemeLocation>>;
    submitForm( form: Form ): Promise<void>;
}

export default IConnector;