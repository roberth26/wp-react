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
export const TRIANGLE = new EShape( 'triangle' );
export const SQUARE = new EShape( 'square' );
export const PENTAGON = new EShape( 'pentagon' );
export const HEXAGON = new EShape( 'hexagon' );
export const SEPTAGON = new EShape( 'septagon' );
export const OCTAGON = new EShape( 'octagon' );
export const NONAGON = new EShape( 'nonagon' );
export const DECAGON = new EShape( 'decagon' );