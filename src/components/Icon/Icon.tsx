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
    const props = {
        width: '2em',
        height: '2em'
    };

    switch ( icon ) {
        case FACEBOOK:
            return <Facebook {...props} />;
        case LINKEDIN:
            return <LinkedIn {...props} />;
        case YOUTUBE:
            return <YouTube {...props} />;
        case EMAIL:
            return <Envelope {...props} />;
        case CV:
            return <FileText {...props} />;
        default: {
            return <span>UKNOWN ICON</span>;
        }
    }
}