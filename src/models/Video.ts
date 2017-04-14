import IVideoJson from '../contracts/IVideoJson';

// TODO: finish this class
export default class Image {
    id: number;
    title: string;

    constructor( video?: IVideoJson ) {
        if ( !video ) {
            return;
        }
        this.id = video.ID;
        this.title = video.post_title;
    }
}