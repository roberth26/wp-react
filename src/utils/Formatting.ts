export function removeLeadingSlash( url: string ): string {
    if ( url.charAt( 0 ) === '/' ) {
        return url.substr( 1 );
    }

    return url;
}

export function leadingSlash( url: string ): string {
    if ( url.charAt( 0 ) === '/' ) {
        return url;
    }

    return '/' + url;
}

export function trailingSlash( url: string ): string {
    if ( url.charAt( url.length - 1 ) === '/' ) {
        return url;
    }

    return url + '/';
}