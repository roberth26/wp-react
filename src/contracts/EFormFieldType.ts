export default class EFormFieldType {
    private static values: EFormFieldType[] = new Array();

    constructor(
        private value: string,
        private htmlType: string
    ) {
        EFormFieldType.values.push( this );
    }

    toString(): string {
        return this.value;
    }

    getHtmlType(): string {
        return this.htmlType;
    }

    static fromString( str: string ): EFormFieldType {
        return EFormFieldType.values.find( ( formFieldType: EFormFieldType ) => {
            return formFieldType.value === str;
        });
    }
}

export const TEXT = new EFormFieldType( 'text', 'text' );
export const EMAIL = new EFormFieldType( 'email', 'email' );
export const TEXTAREA = new EFormFieldType( 'textarea', 'textarea' );
export const SUBJECT = new EFormFieldType( 'subject', 'text' );