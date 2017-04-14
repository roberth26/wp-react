export default class ETemplate {
    private static values: ETemplate[] = new Array();

    constructor( public value: string ) {
        ETemplate.values.push( this );
    }

    toString() {
        return this.value;
    }

    static fromString( str: string ): ETemplate {
        return ETemplate.values.find( ( template: ETemplate) => {
            return template.value === str;
        });
    }
}

export const DEFAULT = new ETemplate( 'default' );
export const PORTFOLIO = new ETemplate( 'portfolio' );
export const TWO_COLUMN = new ETemplate( '2-column' );