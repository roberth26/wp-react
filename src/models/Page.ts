import * as React from 'react';
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
}