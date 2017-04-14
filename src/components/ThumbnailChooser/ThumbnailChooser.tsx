import * as React from 'react';
import Image from '../../models/Image';
import Thumbnail from './primitives/Thumbnail';
import Wrapper from './primitives/Wrapper';

interface IThumbnailChooserProps {
    images: Image[];
    activeImage: Image;
    onChoose: ( image: Image ) => void;
}

export default function ThumbnailChooser( props: IThumbnailChooserProps ) {
    const { images, activeImage, onChoose } = props;

    return (
        <Wrapper>
            {images.map(image => (
                <Thumbnail
                    key={image.id}
                    src={image.urlThumbnail}
                    active={image === activeImage}
                    onClick={onChoose.bind( null, image )}
                />
            ))}
        </Wrapper>
    );
}