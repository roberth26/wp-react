export default class EMenuLocation {
    private static values: EMenuLocation[] = new Array();

    constructor( private value: string ) {
        EMenuLocation.values.push( this );
    }

    toString() {
        return this.value;
    }

    static fromString( str: string ): EMenuLocation {
        return EMenuLocation.values.find( l => l.value === str );
    }
}

export const SIDE = new EMenuLocation( 'side_nav' );
export const START = new EMenuLocation( 'start_menu' );