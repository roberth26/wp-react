import * as React from 'react';
import Image from '../../models/Image';
import Video from '../../models/Video';
import Thumbnail from './primitives/Thumbnail';
import Wrapper from './primitives/Wrapper';

interface IThumbnailChooserProps {
    mediaItems: Array<Image | Video>;
    activeMediaItem: Image | Video;
    onChoose: ( mediaItem: Image | Video ) => void;
}

export default function ThumbnailChooser( props: IThumbnailChooserProps ) {
    const { mediaItems, activeMediaItem, onChoose } = props;

    return (
        <Wrapper>
            {mediaItems.map( mediaItem => {
                const imageSource = mediaItem instanceof Video
                    ? mediaItem.thumbnail ? mediaItem.thumbnail.urlThumbnail : '//:0'
                    : mediaItem.urlThumbnail;

                return (
                    <Thumbnail
                        key={mediaItem.id}
                        active={mediaItem === activeMediaItem}
                        onClick={onChoose.bind( null, mediaItem )}
                    >
                        <img src={imageSource} />
                    </Thumbnail>
                );
            })}
        </Wrapper>
    );
}