import IImageJson from '../contracts/IImageJson';

export default class Image {
    id: number;
    title: string;
    caption: string;
    urlThumbnail: string;
    urlLarge: string;
    urlFull: string;

    constructor( image?: IImageJson ) {
        if ( !image ) {
            return;
        }
        this.id = image.ID;
        this.title = image.post_title;
        this.caption = image.post_excerpt;
        this.urlThumbnail = image.url.thumbnail;
        this.urlLarge = image.url.large;
        this.urlFull = image.guid;
    }
}