import { observable, useStrict } from 'mobx';
import Axios, { Promise, AxiosResponse } from 'axios';
import Page from '../models/Page';
import FormField from '../models/FormField';
import Form from '../models/Form';
import Menu from '../models/Menu';
import EMenuLocation from '../contracts/EMenuLocation';
import { TEXT, EMAIL, TEXTAREA } from '../contracts/EFormFieldType';
import Theme from '../models/Theme';

useStrict( true );

export default class GlobalStore {
    @observable theme: Theme;
    @observable pages: Page[];
    @observable forms: Map<number, Form>;
    menus: Map<EMenuLocation, Menu>;

    validateForm = ( form: Form ): boolean => {
        let isValid = true;
        form.fields.forEach(( field: FormField ) => {
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

    submitForm( form: Form ): Promise<void> {
        if ( !this.validateForm( form ) ) {
            return Promise.reject( 'Invalid Form' );
        }

        // prefix router base path for dev environment TODO: move to build process
        const basename = location.hostname === 'localhost' ? '/caitlyn' : '';

        const promise = Axios.post( `${basename}/email.php`, Form.serialize( form ) )
            .then(( response: AxiosResponse ) => {
                const json = response.data;
                if ( !json.hasErrors ) {
                    return;
                }

                // invalidate fields with errors
                json.fields.forEach( jsonField => {
                    const field = form.fields.find( f => f.id === jsonField.id );
                    if ( field && jsonField.error ) {
                        field.setInvalid();
                    }
                });
            });

        return promise;
    }
}