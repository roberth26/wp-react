interface IVideoJson {
    ID: number;
    post_title: string;
    post_excerpt: string;
    custom_fields: {
        url: string;
        thumbnail: number;
    };
}

export default IVideoJson;