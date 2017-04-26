import IWPPost from '../contracts/IWPPost';
import EMenuItemType from '../contracts/EMenuItemType';

export default class MenuItem {
    id: number;
    title: string;
    order: number;
    url: string;
    targetId: number;
    target: IWPPost;
    type: EMenuItemType;
}