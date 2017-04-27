import { observable, computed, useStrict, action, runInAction } from 'mobx';
import Page from '../models/Page';
import Form from '../models/Form';
import Menu from '../models/Menu';
import Theme from '../models/Theme';
import Color from '../dataTypes/Color';

useStrict( true );

export default class GlobalStore {
    @observable theme: Theme = null;
    @observable private pageMap: Map<number, Page> = new Map();
    @observable private formMap: Map<number, Form> = new Map();
    @observable menus: Menu[] = new Array();

    @action setTheme( theme: Theme ) {
        this.theme = theme;

        // map Colors to Pages
        this.pageMap.forEach( page => {
            page.backgroundColor = this.theme.getColorByName( page.backgroundColorName );
        });
    }

    @action addPage( ...pages: Page[] ) {
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
    }

    @computed get pages(): Page[] {
        return Array.from( this.pageMap, value => value[ 1 ] );
    }

    @action addForm( ...forms: Form[] ) {
        runInAction(() => {
            [ ...forms ].forEach( form => this.formMap.set( form.id, form ) );
        });
    }

    @computed get forms(): Form[] {
        return Array.from( this.formMap, value => value[ 1 ] );
    }

    getFormById( id: number ): Form {
        return this.formMap.get( id );
    }

    @action addMenu( ...menus: Menu[] ) {
        runInAction(() => {
            this.menus.push( ...menus );

            // map IWPPosts to MenuItems
        });
    }
}