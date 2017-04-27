import { observable, computed } from 'mobx';
import Image from './Image';
import Project from './Project';

export default class ProjectCategory {
    id: number;
    name: string;
    url: string;
    description: string;
    image: Image;
    @observable projectMap: Map<number, Project> = new Map();

    @computed get projects(): Project[] {
        return Array.from( this.projectMap, value => value[ 1 ] );
    }
}