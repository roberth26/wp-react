export default class EMenuItemType {
    private static values: EMenuItemType[] = new Array();

    constructor( private value: string ) {
        EMenuItemType.values.push( this );
    }

    toString() {
        return this.value;
    }

    static fromString( str: string ): EMenuItemType {
        return EMenuItemType.values.find( ( menuItemType: EMenuItemType ) => {
            return menuItemType.value === str;
        });
    }
}

export const PAGE = new EMenuItemType( 'page' );
export const PROJECT = new EMenuItemType( 'project' );
export const CUSTOM = new EMenuItemType( 'custom' );