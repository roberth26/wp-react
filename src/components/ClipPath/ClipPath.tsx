import * as React from 'react';
import EShape from '../../contracts/EShape';

interface IClipPathProps {
    shape: EShape;
    children?: React.ReactChildren;
}

export default function ClipPath( props: IClipPathProps ) {
    const { shape, children } = props;

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ clipPath: 'url( #clip )' }}>
                {children}
            </div>
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
                viewBox={'0 0 100 100'}
            >
                <defs>
                    <clipPath id="clip">
                        <circle cx={50} cy={50} r={50} />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}