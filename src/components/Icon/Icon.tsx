import * as React from 'react';
import EIcon from '../../contracts/EIcon';

interface IIconProps {
    icon: EIcon;
}

export default function Icon( { icon }: IIconProps ) {
    const props = {
        width: '2em',
        height: '2em'
    };

    const iconComponentClass = EIcon.getComponent( icon );

    if ( iconComponentClass ) {
        return React.createElement( EIcon.getComponent( icon ), props );
    }

    return <span>UKNOWN ICON</span>;
}