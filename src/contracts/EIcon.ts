export default class EIcon {
    private static values: EIcon[] = new Array();

    constructor(
        private value: string,
        private type: string
    ) {
        EIcon.values.push( this );
    }

    toString(): string {
        return this.type;
    }

    static fromString( str: string ): EIcon {
        return EIcon.values.find( icon => icon.value === str );
    }
}

export const FACEBOOK = new EIcon( 'facebook', 'FaFacebookOfficial' );
export const LINKEDIN = new EIcon( 'linkedin', 'FaLinkedinSquare' );
export const YOUTUBE = new EIcon( 'youtube', 'FaYoutubeSquare' );
export const EMAIL = new EIcon( 'email', 'FaEnvelope' );
export const CV = new EIcon( 'cv', 'FaFileText' );