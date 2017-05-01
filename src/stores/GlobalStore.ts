import { observable, computed, useStrict, action, runInAction } from 'mobx';
import Page from '../models/Page';
import Form from '../models/Form';
import Menu from '../models/Menu';
import Theme from '../models/Theme';
import Color from '../dataTypes/Color';
import EThemeLocation from '../contracts/EThemeLocation';

useStrict( true );

export default class GlobalStore {
    @observable theme: Theme = null;
    @observable private pageMap: Map<number, Page> = new Map();
    @observable private formMap: Map<number, Form> = new Map();
    @observable private menuMap: Map<string, Menu> = new Map();

    @action setTheme( theme: Theme ): GlobalStore {
        this.theme = theme;

        // map Colors to Pages
        this.pageMap.forEach( page => {
            page.backgroundColor = this.theme.getColorByName( page.backgroundColorName );
        });

        return this;
    }

    @action addPage( ...pages: Page[] ): GlobalStore {
        runInAction(() => {
            [ ...pages ]
                .sort( ( a, b ) => a.order - b.order )
                .forEach( page => {
                    this.pageMap.set( page.id, page );

                    // map Colors to Page
                    if ( this.theme ) {
                        const bgColor = this.theme.getColorByName( page.backgroundColorName );
                        if ( bgColor ) {
                            page.backgroundColor = bgColor;
                        } else {
                            page.backgroundColor = new Color( 100, 100, 100 );
                        }
                    }
                });
        });

        return this;
    }

    @computed get pages(): Page[] {
        return Array.from( this.pageMap, value => value[ 1 ] );
    }

    @action addForm( ...forms: Form[] ): GlobalStore {
        runInAction(() => {
            [ ...forms ].forEach( form => this.formMap.set( form.id, form ) );
        });

        return this;
    }

    @computed get forms(): Form[] {
        return Array.from( this.formMap, value => value[ 1 ] );
    }

    getFormById( id: number ): Form {
        return this.formMap.get( id );
    }

    @action addMenu( ...menus: Menu[] ): GlobalStore {
        runInAction(() => {
            [ ...menus ].forEach( menu => {
                this.menuMap.set( menu.themeLocation.toString(), menu );
            });
        });

        return this;
    }

    @computed get menus(): Menu[] {
        return Array.from( this.menuMap, value => value[ 1 ] );
    }

    getMenuByThemeLocation( themeLocation: EThemeLocation ): Menu {
        return this.menuMap.get( themeLocation.toString() );
    }
}