import Page from '../models/Page';
import Theme from '../models/Theme';
import Form from '../models/Form';
import Image from '../models/Image';
import Video from '../models/Video';
import Project from '../models/Project';
import ProjectCategory from '../models/ProjectCategory';
import EMenuLocation from '../contracts/EMenuLocation';
import Menu from '../models/Menu';

interface IConnector {
    getTheme(): Promise<Theme>;
    getPages(): Promise<Page[]>;
    getForms(): Promise<Map<number, Form>>;
    getImages(): Promise<Map<number, Image>>;
    getVideos(): Promise<Map<number, Video>>;
    getProjects(): Promise<Project[]>;
    getProjectCategories(): Promise<ProjectCategory[]>;
    getMenus(): Promise<Map<EMenuLocation, Menu>>;
    submitForm( form: Form ): Promise<void>;
}

export default IConnector;