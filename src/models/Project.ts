import Image from './Image';
import Video from './Video';
import IProjectJson from '../contracts/IProjectJson';
import ProjectCategory from './ProjectCategory';
import parse from '../utils/Parser';
import IWPPost from '../contracts/IWPPost';

export default class Project implements IWPPost {
    id: number;
    title: string;
    description: React.ReactElement<any>;
    excerpt: React.ReactElement<any>;
    date: Date;
    tools: string[];
    images = new Array<Image>();
    videos = new Array<Video>();
    url: string;
    categories = new Array<ProjectCategory>();

    constructor( project?: IProjectJson ) {
        if ( !project ) {
            return;
        }
        this.id = project.ID;
        this.title = project.post_title;
        this.description = parse( project.post_content );
        this.excerpt = parse( project.post_excerpt );
        this.date = new Date( project.custom_fields.creation_date );
        this.tools = project.custom_fields.tools.split( ',' ).map( t => t.trim() );
        this.url = project.custom_fields.project_url
            ? project.custom_fields.project_url
            : project.post_name + '/';
    }
}