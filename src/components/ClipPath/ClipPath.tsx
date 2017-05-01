import * as React from 'react';
import EShape from '../../contracts/EShape';

interface IClipPathProps {
    shape: EShape;
    children?: React.ReactChildren;
}

export default function ClipPath( props: IClipPathProps ) {
    const { shape, children } = props;

    return (
        <div>
            <h2>{shape.toString()}</h2>
            {children}
        </div>
    );
}