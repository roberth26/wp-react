import { observable, action } from 'mobx';
import EFormFieldType from '../contracts/EFormFieldType';
import IFormFieldJson from '../contracts/IFormFieldJson';

// TODO: This is sorta acting like a viewmodel... can some of this go inside the component?

export default class FormField {
    id: number;
    name: string;
    label: string;
    type: EFormFieldType;
    required: boolean;
    @observable value: string = ''; // could need to be generic in the future
    placeholder: string; // ^
    @observable valid: boolean = true;
    errorMessage: string;

    constructor( formField?: IFormFieldJson ) {
        if ( !formField ) {
            return;
        }
        this.id = formField.ID;
        this.name = formField.post_title;
        this.label = formField.custom_fields.label;
        this.type = EFormFieldType.fromString( formField.custom_fields.type );
        this.required = formField.custom_fields.required;
        this.value = formField.custom_fields.default_value;
        this.placeholder = formField.custom_fields.placeholder;
        this.errorMessage = formField.custom_fields.error_message;
        this.valid = true;
    }

    @action setValid = () => {
        this.valid = true;
    }

    @action setInvalid = () => {
        this.valid = false;
    }

    @action setValue = ( newValue: string ) => {
        this.value = newValue;
    }

    static serialize( formField: FormField ) {
        return {
            id: formField.name,
            name: formField.name,
            type: formField.type.toString(),
            value: formField.value,
            required: formField.required
        };
    }
}