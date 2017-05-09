import * as React from 'react';
import * as Facebook from 'react-icons/lib/fa/facebook-official';
import * as LinkedIn from 'react-icons/lib/fa/linkedin-square';
import * as YouTube from 'react-icons/lib/fa/youtube-square';
import * as Envelope from 'react-icons/lib/fa/envelope';
import * as FileText from 'react-icons/lib/fa/file-text';
import EIcon, {
    FACEBOOK,
    LINKEDIN,
    YOUTUBE,
    EMAIL,
    CV
} from '../../contracts/EIcon';

interface IIconProps {
    icon: EIcon;
}

export default function Icon( { icon }: IIconProps ) {
    switch ( icon ) {
        case FACEBOOK:
            return <Facebook />;
        case LINKEDIN:
            return <LinkedIn />;
        case YOUTUBE:
            return <YouTube />;
        case EMAIL:
            return <Envelope />;
        case CV:
            return <FileText />;
        default: {
            return <span>UKNOWN ICON</span>;
        }
    }
}