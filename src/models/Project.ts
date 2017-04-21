import Image from './Image';
import Video from './Video';
import ProjectCategory from './ProjectCategory';
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
}