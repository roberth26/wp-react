import * as Facebook from 'react-icons/lib/fa/facebook-official';
import * as LinkedIn from 'react-icons/lib/fa/linkedin-square';
import * as YouTube from 'react-icons/lib/fa/youtube-square';
import * as Envelope from 'react-icons/lib/fa/envelope';
import * as FileText from 'react-icons/lib/fa/file-text';
import * as AngleLeft from 'react-icons/lib/fa/angle-left';
import * as AngleRight from 'react-icons/lib/fa/angle-right';
import * as Close from 'react-icons/lib/md/close';
import * as Flickr from 'react-icons/lib/fa/flickr';
import * as Instagram from 'react-icons/lib/fa/instagram';

export default class EIcon {
    private static values: EIcon[] = new Array();

    constructor(
        private value: string,
        private component: React.ComponentClass<any>
    ) {
        EIcon.values.push( this );
    }

    static fromString( str: string ): EIcon {
        return EIcon.values.find( icon => icon.value === str );
    }

    static getComponent( icon: EIcon ): React.ComponentClass<any> {
        return EIcon.values.find( i => i === icon ).component;
    }
}

export const FACEBOOK = new EIcon( 'facebook', Facebook );
export const LINKEDIN = new EIcon( 'linkedin', LinkedIn );
export const YOUTUBE = new EIcon( 'youtube', YouTube );
export const EMAIL = new EIcon( 'email', Envelope );
export const CV = new EIcon( 'cv', FileText );
export const ANGLE_LEFT = new EIcon( 'angle-left', AngleLeft );
export const ANGLE_RIGHT = new EIcon( 'angle-right', AngleRight );
export const CLOSE = new EIcon( 'close', Close );
export const FLICKR = new EIcon( 'flickr', Flickr );
export const INSTAGRAM = new EIcon( 'instagram', Instagram );