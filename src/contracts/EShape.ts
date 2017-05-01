export default class EShape {
    private static values: EShape[] = new Array();

    constructor(
        private value: string
    ) {
        EShape.values.push( this );
    }

    toString(): string {
        return this.value;
    }

    static fromString( str: string ): EShape {
        return EShape.values.find( shape => shape.value === str );
    }
}

export const CIRCLE = new EShape( 'circle' );
export const SQUARE = new EShape( 'square' );
export const HEXAGON = new EShape( 'hexagon' );