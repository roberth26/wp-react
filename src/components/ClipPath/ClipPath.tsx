import * as React from 'react';
import * as Shortid from 'shortid';
import EShape, {
    // CIRCLE,
    TRIANGLE,
    SQUARE,
    PENTAGON,
    HEXAGON,
    SEPTAGON,
    OCTAGON,
    NONAGON,
    DECAGON
} from '../../contracts/EShape';

function toRadians( deg: number ) {
    return deg * ( Math.PI / 180 );
}

function getPolygonPoints(
    center: [ number, number ],
    radius: number,
    numSides: number,
    rotation: number = 0
): Array<[ number, number ]> {
    rotation = numSides === 4
        ? 45
        : numSides % 2 ? 360 / numSides / 2 : 0;

    return Array.from( new Array( numSides ), ( v, i ) => {
        return [
            center[ 0 ] - ( Math.sin( toRadians( i * 360 / numSides - rotation ) ) * radius ),
            center[ 1 ] - ( Math.cos( toRadians( i * 360 / numSides - rotation ) ) * radius )
        ];
    }) as Array<[ number, number ]>;
}

interface IClipPathProps {
    shape: EShape;
    children?: React.ReactChildren;
}

export default function ClipPath( props: IClipPathProps ) {
    const { shape, children } = props;
    const size = 100;
    let sides;
    switch ( shape ) {
        case TRIANGLE:
            sides = 3;
            break;
        case SQUARE:
            sides = 4;
            break;
        case PENTAGON:
            sides = 5;
            break;
        case HEXAGON:
            sides = 6;
            break;
        case SEPTAGON:
            sides = 7;
            break;
        case OCTAGON:
            sides = 8;
            break;
        case NONAGON:
            sides = 9;
            break;
        case DECAGON:
            sides = 10;
            break;
        default:
            sides = 4;
    }

    const points = getPolygonPoints( [ size / 2, size / 2 ], size / 2, sides, 0 )
        .map( p => p.join( ' ' ) )
        .join( ',' );

    const pathId = `path-${Shortid.generate()}`;

    return (
        <div>
            <svg viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <clipPath
                        id={pathId}
                        clipPathUnits="objectBoundingBox"
                    >
                        <polygon points={points} />
                    </clipPath>
                </defs>
            </svg>
            <div style={{ clipPath: `url( #${pathId} )` }}>
                {children}
            </div>
        </div>
    );
}