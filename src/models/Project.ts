import { computed, observable } from 'mobx';
import Image from './Image';
import Video from './Video';
import ProjectCategory from './ProjectCategory';
import IWPPost from '../contracts/IWPPost';

export default class Project implements IWPPost {
    id: string;
    title: string;
    description: React.ReactNode;
    excerpt: React.ReactNode;
    date: Date;
    tools: string[];
    url: string;
    @observable imageMap: Map<string, Image> = new Map();
    @observable videoMap: Map<string, Video> = new Map();
    @observable categoryMap: Map<string, ProjectCategory> = new Map();

    @computed get images(): Image[] {
        return Array.from( this.imageMap.values() );
    }

    @computed get videos(): Video[] {
        return Array.from( this.videoMap.values() );
    }

    @computed get categories(): ProjectCategory[] {
        return Array.from( this.categoryMap.values() );
    }
}