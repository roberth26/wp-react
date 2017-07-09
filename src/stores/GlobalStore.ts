import { observable, computed, useStrict, action, runInAction } from 'mobx';
import { Location } from 'history';
import { matchPath } from 'react-router-dom';
import Page from '../models/Page';
import Form from '../models/Form';
import Menu from '../models/Menu';
import Theme from '../models/Theme';
import Color from '../dataTypes/Color';
import EThemeLocation from '../contracts/EThemeLocation';
import WidgetArea from '../models/WidgetArea';

useStrict( true );

export default class GlobalStore {
    @observable location: Location = null;
    @observable theme: Theme = null;
    @observable private widgetAreaMap: Map<string, WidgetArea> = new Map();
    @observable private pageMap: Map<number, Page> = new Map();
    @observable private formMap: Map<number, Form> = new Map();
    @observable private menuMap: Map<string, Menu> = new Map();
    private previousPage: Page;

    @action addWidgetArea( ...widgetAreas: WidgetArea[] ): GlobalStore {
        runInAction(() => {
            [ ...widgetAreas ]
                .forEach( widgetArea => {
                    this.widgetAreaMap.set( widgetArea.themeLocation.toString(), widgetArea );
                });
        });

        return this;
    }

    getWidgetArea( themeLocation: EThemeLocation ): WidgetArea {
        return this.widgetAreaMap.get( themeLocation.toString() );
    }

    @action setLocation( location: Location ): GlobalStore {
        this.location = location;

        return this;
    }

    @action setTheme( theme: Theme ): GlobalStore {
        this.theme = theme;

        // map Colors to Pages
        this.pageMap.forEach( page => {
            page.backgroundColor = this.theme.getColorByName( page.backgroundColorName );
        });

        return this;
    }

    @computed get currentPage(): Page {
        if ( !this.location ) {
            return null;
        }

        const pages = this.pages;
        const path = this.location.pathname;
        const currentPage = pages.find( page => {
            const match = matchPath( path, { path: page.url } );

            return match != null;
        });
        if ( currentPage ) {
            this.previousPage = currentPage;

            return currentPage;
        }

        return this.previousPage;
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
        return Array.from( this.pageMap.values() );
    }

    @action addForm( ...forms: Form[] ): GlobalStore {
        runInAction(() => {
            [ ...forms ].forEach( form => this.formMap.set( form.id, form ) );
        });

        return this;
    }

    @computed get forms(): Form[] {
        return Array.from( this.formMap.values() );
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
        return Array.from( this.menuMap.values() );
    }

    getMenuById( id: number ): Menu {
        return Array.from( this.menuMap.values() ).find( menu => menu.id === id );
    }

    getMenuByThemeLocation( themeLocation: EThemeLocation ): Menu {
        return this.menuMap.get( themeLocation.toString() );
    }
}