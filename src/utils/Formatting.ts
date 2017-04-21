export function formatUrl( url: string ): string {
    if ( url.charAt( 0 ) === '/' ) {
        url = url.substring( 1 );
    }
    if ( url.charAt( url.length - 1 ) !== '/' ) {
        url = url + '/';
    }

    return url;
}