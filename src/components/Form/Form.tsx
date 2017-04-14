import * as React from 'react';
import { inject, observer } from 'mobx-react';
import FormModel from '../../models/Form';
import FormField from '../../models/FormField';
import { TEXTAREA } from '../../contracts/EFormFieldType';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from './primitives/Button';
import Wrapper from './primitives/Wrapper';
import GlobalStore from '../../stores/GlobalStore';

export interface IFormProps {
    globalStore?: GlobalStore; // injected
    form: FormModel;
}

@inject( 'globalStore' )
@observer
export default class Form extends React.Component<IFormProps, {}> {
    handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        const { globalStore, form } = this.props;
        event.preventDefault();
        globalStore.submitForm( form )
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