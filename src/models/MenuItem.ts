import EMenuItemType from '../contracts/EMenuItemType';

export default class MenuItem {
    id: number;
    title: string;
    order: number;
    url: string;
    type: EMenuItemType;
}