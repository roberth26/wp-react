import FormField from './FormField';
import { TEXT, EMAIL, TEXTAREA } from '../contracts/EFormFieldType';

export default class Form {
    id: string;
    name: string;
    fields: FormField[];

    static serialize( form: Form ) {
        return {
            name: form.name,
            fields: form.fields.map( FormField.serialize )
        };
    }

    validate(): boolean {
        let isValid = true;
        this.fields.forEach(( field: FormField ) => {
            switch ( field.type ) {
                case TEXT: {
                    if ( field.required && !field.value ) {
                        field.setInvalid();
                        isValid = false;
                    }
                    break;
                }
                case EMAIL: {
                    if ( ( field.required && field.value === '' )
                        /* tslint:disable */
                        || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( field.value )
                        /* tslint:enable */
                    ) {
                        field.setInvalid();
                        isValid = false;
                    }
                    break;
                }
                case TEXTAREA: {
                    if ( field.required && !field.value ) {
                        field.setInvalid();
                        isValid = false;
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });

        return isValid;
    }
}