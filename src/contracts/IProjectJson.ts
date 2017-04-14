interface IProjectJson {
    ID: number;
    post_title: string;
    post_content: string;
    post_excerpt: string;
    category_ids: number[];
    post_name: string;
    custom_fields: {
        creation_date: string;
        tools: string;
        project_url: string;
        images: number[];
        videos: number[];
    };
}

export default IProjectJson;