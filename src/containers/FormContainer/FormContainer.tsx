import * as React from 'react';
import { inject, observer } from 'mobx-react';
import GlobalStore from '../../stores/GlobalStore';
import IConnector from '../../contracts/IConnector';
import FormModel from '../../models/Form';
import Form from '../../components/Form/Form';

function handleSubmit( connector: IConnector, form: FormModel ) {
    connector.submitForm( form )
        .catch( e => console.log( e ) );
}

interface IFormContainer {
    globalStore?: GlobalStore; // injected
    connector?: IConnector; // injected
    formId: number;
}

function FormContainer( { globalStore, connector, formId }: IFormContainer ) {
    const form = globalStore.getFormById( formId );

    return (
        <Form
            form={form}
            onSubmit={handleSubmit.bind( null, connector, form )}
        />
    );
}

export default inject( 'globalStore', 'connector' )( observer( FormContainer ) );