import * as React from 'react';
import FormModel from '../../models/Form';
import FormField from '../../models/FormField';
import { TEXTAREA } from '../../contracts/EFormFieldType';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from './primitives/Button';
import Wrapper from './primitives/Wrapper';

export interface IFormProps {
    form: FormModel;
    onSubmit: ( form: FormModel ) => void;
}

export default class Form extends React.Component<IFormProps, {}> {
    handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        const { form, onSubmit } = this.props;
        event.preventDefault();
        onSubmit( form );
    }

    render() {
        const { form } = this.props;

        if ( !form ) {
            return null;
        }

        const fields = form.fields.map(( field: FormField ) => {
            switch ( field.type ) {
                case TEXTAREA: {
                    return (
                        <TextArea
                            key={field.id}
                            formField={field}
                        />
                    );
                }
                default: {
                    return (
                        <Input
                            key={field.id}
                            formField={field}
                        />
                    );
                }
            }
        });

        return (
            <Wrapper
                onSubmit={this.handleSubmit}
                noValidate
            >
                {fields}
                <Button type="submit">Submit</Button>
            </Wrapper>
        );
    }
}