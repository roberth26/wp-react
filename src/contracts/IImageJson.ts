interface IImageJson {
    ID: number;
    post_title: string;
    post_excerpt: string;
    guid: string; // the original image url
    url: {
        thumbnail: string;
        large: string;
    };
}

export default IImageJson;