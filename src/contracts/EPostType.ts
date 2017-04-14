export default class EPostType {
    private static values: EPostType[] = new Array();

    constructor( private value: string ) {
        EPostType.values.push( this );
    }

    toString() {
        return this.value;
    }

    static fromString( str: string ): EPostType {
        return EPostType.values.find( ( formFieldType: EPostType ) => {
            return formFieldType.value === str;
        });
    }
}

export const BLOG_POST = new EPostType( 'post' );
export const PAGE = new EPostType( 'page' );
export const PROJECT = new EPostType( 'project' );