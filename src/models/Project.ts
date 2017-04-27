import { computed, observable } from 'mobx';
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
    url: string;
    @observable imageMap: Map<number, Image> = new Map();
    @observable videoMap: Map<number, Video> = new Map();
    @observable categoryMap: Map<number, ProjectCategory> = new Map();

    @computed get images(): Image[] {
        return Array.from( this.imageMap, value => value[ 1 ] );
    }

    @computed get videos(): Video[] {
        return Array.from( this.videoMap, value => value[ 1 ] );
    }

    @computed get categories(): ProjectCategory[] {
        return Array.from( this.categoryMap, value => value[ 1 ] );
    }
}