import * as React from 'react';
import { inject } from 'mobx-react';
import FormModel from '../../models/Form';
import FormField from '../../models/FormField';
import { TEXTAREA } from '../../contracts/EFormFieldType';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from './primitives/Button';
import Wrapper from './primitives/Wrapper';
import IConnector from '../../contracts/IConnector';

export interface IFormProps {
    connector?: IConnector; // injected
    form: FormModel;
}

@inject( 'connector' )
export default class Form extends React.Component<IFormProps, {}> {
    handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        const { form, connector } = this.props;
        event.preventDefault();
        connector.submitForm( form )
            .catch( e => console.log( e ));
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