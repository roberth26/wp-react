import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TextAreaField from './primitives/TextAreaField';
import FormField from '../../models/FormField';
import Page from '../../models/Page';
import FormFieldLabel from '../primitives/FormFieldLabel';
import FormFieldWrapper from '../primitives/FormFieldWrapper';

function handleChange( field: FormField, event: React.FormEvent<any> ) {
    field.setValue( ( event.target as HTMLInputElement ).value );
}

interface ITextAreaProps {
    parentPage?: Page; // injected
    formField: FormField;
}

const TextArea: React.SFC<ITextAreaProps> = props => {
    const { parentPage, formField } = props;
    const { id, label, value, placeholder, valid, errorMessage, setValid } = formField;

    return (
        <FormFieldWrapper htmlFor={id}>
            <FormFieldLabel>{label}</FormFieldLabel>
            <TextAreaField
                baseColor={parentPage.backgroundColor}
                placeholder={valid ? placeholder : errorMessage}
                valid={valid}
                id={id}
                onFocus={setValid}
                onChange={handleChange.bind( null, formField )}
                value={valid ? value : ''}
            />
        </FormFieldWrapper>
    );
};

export default inject( 'parentPage' )( observer( TextArea ) );