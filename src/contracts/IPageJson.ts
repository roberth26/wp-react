interface IPageJson {
    ID: number;
    post_title: string;
    post_content: string;
    menu_order: number;
    template: string;
    custom_fields: {
        background_color: string;
        url: string;
        left_column: string;
        right_column: string;
        show_title: boolean;
    };
}

export default IPageJson;