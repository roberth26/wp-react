import * as React from 'react';
import * as Shortid from 'shortid';
import EShape, {
    CIRCLE,
    TRIANGLE,
    SQUARE,
    PENTAGON,
    HEXAGON,
    HEPTAGON,
    OCTAGON,
    NONAGON,
    DECAGON
} from '../../contracts/EShape';

function imagesToBlock( elements: React.ReactChildren ): React.ReactChild[] {
    const converted = React.Children.map( elements, child => {
        if ( React.isValidElement( child ) ) {
            if ( child.type === 'img' ) {
                const image = child as React.ReactElement<HTMLImageElement>;

                return React.cloneElement(
                    image,
                    {
                        ...image.props,
                        style: { display: 'block' }
                    }
                );
            }
        }

        return child;
    });

    return converted;
}

function toRadians( deg: number ) {
    return deg * ( Math.PI / 180 );
}

function getPolygonPoints(
    center: [ number, number ],
    radius: number,
    numSides: number,
    rotation?: number
): Array<[ number, number ]> {
    const rot = rotation
        ? rotation
        : numSides === 4
            ? 45
            : numSides % 2
                ? 180 / numSides
                : 0;

    return Array.from( new Array( numSides ), ( v, i ) => {
        return [
            center[ 0 ] - Math.sin( toRadians( i * 360 / numSides - rot ) ) * radius,
            center[ 1 ] - Math.cos( toRadians( i * 360 / numSides - rot ) ) * radius
        ];
    }) as Array<[ number, number ]>;
}

interface IClipPathProps {
    shape: EShape;
    rotation: number; // deg
    children?: React.ReactChildren;
}

export default function ClipPath( props: IClipPathProps ) {
    const { shape, children, rotation } = props;

    let shapeElement = null;

    if ( shape === CIRCLE ) {
        shapeElement = <circle cx=".5" cy=".5" r=".5" />;
    } else {
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
            case HEPTAGON:
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

        const points = getPolygonPoints( [ .5, .5 ], .5, sides, rotation )
            .map( p => p.join( ',' ) )
            .join( ' ' );

        shapeElement = <polygon points={points} />;
    }

    const pathId = `path-${Shortid.generate()}`;
    const style = {
        display: 'inline-block',
        clipPath: `url( #${pathId} )`
    };
    const content = imagesToBlock( children );

    return (
        <div style={style}>
            <svg width="0" height="0" style={{ display: 'block' }}>
                <defs>
                    <clipPath id={pathId} clipPathUnits="objectBoundingBox">
                        {shapeElement}
                    </clipPath>
                </defs>
            </svg>
            {content}
        </div>
    );
}