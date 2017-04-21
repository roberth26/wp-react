import { observable, useStrict } from 'mobx';
import Page from '../models/Page';
import Form from '../models/Form';
import Menu from '../models/Menu';
import EMenuLocation from '../contracts/EMenuLocation';
import Theme from '../models/Theme';

useStrict( true );

export default class GlobalStore {
    @observable theme: Theme;
    @observable pages: Page[];
    @observable forms: Map<number, Form>;
    menus: Map<EMenuLocation, Menu>;
}