import * as React from 'react';
import { observer, inject } from 'mobx-react';
import FormField from '../../models/FormField';
import InputField from './primitives/InputField';
import FormFieldLabel from '../primitives/FormFieldLabel';
import FormFieldWrapper from '../primitives/FormFieldWrapper';
import Page from '../../models/Page';

function handleChange( field: FormField, event: React.FormEvent<any> ) {
    field.setValue( ( event.target as HTMLInputElement ).value );
}

interface IInputProps {
    parentPage?: Page; // injected
    formField: FormField;
}

const Input: React.SFC<IInputProps> = props => {
    const { formField, parentPage } = props;
    const { id, label, placeholder, valid, type, value, errorMessage, setValid, name } = formField;

    return (
        <FormFieldWrapper htmlFor={name}>
            <FormFieldLabel>{label}</FormFieldLabel>
            <InputField
                name={name}
                type={type.getHtmlType()}
                placeholder={valid ? placeholder : errorMessage}
                id={id.toString()}
                valid={valid}
                onFocus={setValid}
                baseColor={parentPage.backgroundColor}
                onChange={handleChange.bind( null, formField )}
                value={valid ? value : ''}
            />
        </FormFieldWrapper>
    );
};

export default inject( 'parentPage' )( observer( Input ) );