import * as React from 'react';
import parse from '../utils/Parser';
import IPageJson from '../contracts/IPageJson';
import Color from '../dataTypes/Color';
import ETemplate from '../contracts/ETemplate';
import IWPPost from '../contracts/IWPPost';

export default class Page implements IWPPost {
    id: number;
    title: string;
    content: React.ReactElement<any>;
    leftContent: React.ReactElement<any>;
    rightContent: React.ReactElement<any>;
    url: string;
    backgroundColor: Color;
    order: number;
    template: ETemplate;
    showTitle: boolean;

    constructor( page?: IPageJson ) {
        if ( !page ) {
            return;
        }
        this.id = page.ID;
        this.title = page.post_title;
        this.content = parse( page.post_content );
        this.leftContent = parse( page.custom_fields.left_column );
        this.rightContent = parse( page.custom_fields.right_column );
        this.url = page.custom_fields.url;
        this.order = page.menu_order;
        this.template = ETemplate.fromString( page.template );
        this.showTitle = page.custom_fields.show_title;
    }
}