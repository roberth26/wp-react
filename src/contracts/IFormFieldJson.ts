interface IFormFieldJson {
    ID: number;
    post_title: string;
    custom_fields: {
        label: string;
        type: string;
        required: boolean;
        default_value: string;
        placeholder: string;
        error_message: string;
    };
}

export default IFormFieldJson;