import * as React from 'react';
import EMenuItemType from '../contracts/EMenuItemType';

export default class MenuItem {
    id: number;
    title: React.ReactElement<any>;
    order: number;
    url: string;
    type: EMenuItemType;
}