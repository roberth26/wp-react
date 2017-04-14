import MenuItem from './MenuItem';
import EMenuLocation from '../contracts/EMenuLocation';
import IMenuJson from '../contracts/IMenuJson';

export default class Menu {
    id: number;
    name: string;
    items: MenuItem[];
    location: EMenuLocation;

    constructor( menu?: IMenuJson ) {
        if ( !menu ) {
            return;
        }
        this.id = menu.term_id;
        this.name = menu.name;
    }
}