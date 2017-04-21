import MenuItem from './MenuItem';
import EMenuLocation from '../contracts/EMenuLocation';

export default class Menu {
    id: number;
    name: string;
    items: MenuItem[];
    location: EMenuLocation;
}