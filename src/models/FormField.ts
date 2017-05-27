import { observable, action } from 'mobx';
import EFormFieldType from '../contracts/EFormFieldType';

export default class FormField {
    id: number;
    name: string;
    label: string;
    type: EFormFieldType;
    required: boolean;
    @observable value: string = '';
    placeholder: string; // ^
    @observable valid: boolean = true;
    errorMessage: string;

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