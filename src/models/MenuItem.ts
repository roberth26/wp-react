import IWPPost from '../contracts/IWPPost';
import EMenuItemType from '../contracts/EMenuItemType';

export default class MenuItem {
    id: number;
    title: string;
    order: number;
    url: string;
    target: IWPPost;
    type: EMenuItemType;
}