import { observable, useStrict, action, runInAction, toJS } from 'mobx';
import Axios, { Promise, AxiosResponse } from 'axios';
import IPageJson from '../contracts/IPageJson';
import Page from '../models/Page';
import IFormFieldJson from '../contracts/IFormFieldJson';
import FormField from '../models/FormField';
import IFormJson from '../contracts/IFormJson';
import Form from '../models/Form';
import IMenuJson from '../contracts/IMenuJson';
import Menu from '../models/Menu';
import IMenuItemJson from '../contracts/IMenuItemJson';
import MenuItem from '../models/MenuItem';
import IMenuLocationJson from '../contracts/IMenuLocationJson';
import EMenuLocation from '../contracts/EMenuLocation';
import { TEXT, EMAIL, TEXTAREA } from '../contracts/EFormFieldType';
import IDataJson from '../contracts/IDataJson';
import PortfolioStore from './PortfolioStore';
import IWPPost from '../contracts/IWPPost';
import Theme from '../models/Theme';
import Color from '../dataTypes/Color';

useStrict( true );

export default class GlobalStore {
    @observable theme: Theme;
    portfolioStore: PortfolioStore;
    @observable pages: Page[];
    @observable forms: Map<number, Form>;
    menus: Map<EMenuLocation, Menu>;

    constructor( portfolioStore: PortfolioStore, dataJson: IDataJson ) {
        this.portfolioStore = portfolioStore;
        this.loadData( dataJson );
    }

    @action loadData( dataJson: IDataJson ) {
        const theme = new Theme( dataJson.theme );

        const pages = dataJson.pages
            .map(( pageJson: IPageJson ) => {
                const page = new Page( pageJson );
                const bgColorName = pageJson.custom_fields.background_color;
                const bgColor = theme.getColorByName( bgColorName );
                if ( bgColor ) {
                    page.backgroundColor = bgColor;
                } else {
                    page.backgroundColor = new Color( 100, 100, 100 );
                }

                return page;
            }).sort(( a: Page, b: Page ) => a.order - b.order );

        const formFieldJsons = new Map<number, IFormFieldJson>(
            dataJson.form_fields.map(( formFieldJson: IFormFieldJson ) => {
                return [ formFieldJson.ID, formFieldJson ] as [ number, IFormFieldJson ];
            })
        );

        const forms = new Map<number, Form>(
            dataJson.forms.map(( formJson: IFormJson ) => {
                const form = new Form( formJson );
                form.fields = formJson.custom_fields.form_fields
                    .map(( formFieldId: number ) => {
                        return new FormField( formFieldJsons.get( formFieldId ) );
                    });
                return [ form.id, form ] as [ number, Form ];
            })
        );

        const menuLocationJsons = new Map<number, string>(
            dataJson.menu_locations.map(( locationJson: IMenuLocationJson ) => {
                return [ locationJson.id, locationJson.name ] as [ number, string ];
            })
        );

        const posts = new Map<number, IWPPost>(
            [ ...pages, ...toJS( this.portfolioStore.projects ) ].map(( post: IWPPost ) => {
                return [ post.id, post ] as [ number, IWPPost ];
            })
        );

        const menus = new Map<EMenuLocation, Menu>(
            dataJson.menus.map(( menuJson: IMenuJson ) => {
                const menu = new Menu( menuJson );
                menu.location = EMenuLocation.fromString(
                    menuLocationJsons.get( menuJson.location_id )
                );
                menu.items = menuJson.items.map(( menuItemJson: IMenuItemJson ) => {
                    const menuItem = new MenuItem( menuItemJson );
                    menuItem.target = posts.get( Number.parseInt( menuItemJson.object_id ) );

                    return menuItem;
                });
                return [ menu.location, menu ] as [ EMenuLocation, Menu ];
            })
        );

        runInAction(() => {
            this.theme = theme;
            this.pages = pages;
            this.forms = forms;
            this.menus = menus;
        });
    }

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