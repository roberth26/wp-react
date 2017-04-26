import MenuItem from './MenuItem';
import EThemeLocation from '../contracts/EThemeLocation';

export default class Menu {
    id: number;
    name: string;
    items: MenuItem[];
    themeLocation: EThemeLocation;
}