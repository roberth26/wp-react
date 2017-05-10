export default class EThemeLocation {
    private static values: EThemeLocation[] = new Array();

    constructor( private value: string ) {
        EThemeLocation.values.push( this );
    }

    toString() {
        return this.value;
    }

    static fromString( str: string ): EThemeLocation {
        return EThemeLocation.values.find( l => l.value === str );
    }
}

export const SIDE_MENU = new EThemeLocation( 'side_nav' );
export const START_MENU = new EThemeLocation( 'start_menu' );
export const FOOTER_MENU = new EThemeLocation( 'footer_menu' );
export const SOCIAL_MENU = new EThemeLocation( 'social_menu' );
export const FOOTER_AREA = new EThemeLocation( 'footer_area' );