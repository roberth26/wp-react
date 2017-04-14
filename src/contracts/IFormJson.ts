interface IFormJson {
    ID: number;
    post_title: string;
    custom_fields: {
        form_fields: number[];
    };
}

export default IFormJson;