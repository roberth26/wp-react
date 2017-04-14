import FormField from './FormField';
import IFormJson from '../contracts/IFormJson';

export default class Form {
    id: number;
    name: string;
    fields: FormField[];

    constructor( form?: IFormJson ) {
        if ( !form ) {
            return;
        }
        this.id = form.ID;
        this.name = form.post_title;
    }

    static serialize( form: Form ) {
        return {
            name: form.name,
            fields: form.fields.map( FormField.serialize )
        };
    }
}