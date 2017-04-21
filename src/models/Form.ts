import FormField from './FormField';

export default class Form {
    id: number;
    name: string;
    fields: FormField[];

    static serialize( form: Form ) {
        return {
            name: form.name,
            fields: form.fields.map( FormField.serialize )
        };
    }
}