import IMenuItemJson from '../contracts/IMenuItemJson';
import IWPPost from '../contracts/IWPPost';
import EMenuItemType from '../contracts/EMenuItemType';

export default class MenuItem {
    id: number;
    title: string;
    order: number;
    url: string;
    target: IWPPost;
    type: EMenuItemType;

    constructor( menuItem?: IMenuItemJson ) {
        if ( !menuItem ) {
            return;
        }
        this.id = menuItem.ID;
        this.title = menuItem.title;
        this.order = menuItem.menu_order;
        this.url = menuItem.url;
        this.type = EMenuItemType.fromString( menuItem.object );
    }
}