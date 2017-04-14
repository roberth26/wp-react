interface IProjectCategoryJson {
    term_id: number;
    name: string;
    description: string;
    custom_fields: {
        project_category_image: string;
        project_category_url: string;
    };
}

export default IProjectCategoryJson;