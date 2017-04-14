<?php
global $post;

if ( $_SERVER[ 'HTTP_HOST' ] === 'localhost' ) {
    $path = '/caitlyn/';
} else {
    $path = '/';
}

function trailingSlash( $url ) {
    if ( substr( $url, -1 ) !== '/' ) {
        $url = $url . '/';
    }

    return $url;
}

if ( $post->post_type === 'project' ) {
    $portfolioPage = current(
        get_pages([
            'meta_key' => '_wp_page_template',
            'meta_value' => 'portfolio.php'
        ])
    );

    if ( !$portfolioPage ) {
        echo '<h1>No page is using the portfolio template!</h1>';
        exit;
    }

    $portfolioUrl = trailingSlash(
        ltrim( get_field( 'url', $portfolioPage->ID ), '/' )
    );
    $path .= $portfolioUrl;
}

$path .= trailingSlash( ltrim( get_field( 'url', $post->ID ), '/' ) );

if ( wp_redirect( $path ) ) {
    exit;
}
?>