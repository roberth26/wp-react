interface IVideoJson {
    ID: number;
    post_title: string;
    post_excerpt: string;
    custom_fields: {
        url: string;
        thumbnail: number[];
        auto_thumbnail: boolean;
    };
}

export default IVideoJson;