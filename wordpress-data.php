<?php 
define( 'WP_USE_THEMES', false );
require_once 'wordpress/wp-load.php';

// when we request this file directly, show as JSON rather than HTML
if ( basename( $_SERVER[ 'SCRIPT_FILENAME' ] ) === basename( __FILE__ ) ) {
    header( 'Content-Type: application/json' );
}

$themeLocations = get_nav_menu_locations();
$allPosts = get_posts([
    'posts_per_page' => -1,
    'post_type' => [
        'page',
        'project',
        'attachment',
        'form-field',
        'form',
        'video'
    ],
    'post_status' => 'any'
]);

$posts = [];
foreach ( $allPosts as $post ) {
    $postType = $post->post_type . 's';
    if ( isset( $postType ) ) {
        $posts[ $postType ][] = $post;
    } else {
        $posts[ $postType ] = [ $post ];
    }
}

$posts[ 'pages' ] = array_map( postMapper, $posts[ 'pages' ] );
$posts[ 'projects' ] = array_map( postMapper, $posts[ 'projects' ] );

function autoFormat( $post ) {
    $post->post_content = wpautop( $post->post_content, true );
    $post->post_excerpt = wpautop( $post->post_excerpt, true );
}

function leadingSlash( $url ) {
    if ( $url === '' ) {
        return $url;
    }

    if ( substr( $url, 0, 1 ) !== '/' ) {
        $url = '/' . $url;
    }

    return $url;
}

function trailingSlash( $url ) {
    if ( $url === '' ) {
        return $url;
    }

    if ( substr( $url, -1 ) !== '/' ) {
        $url = $url . '/';
    }

    return $url;
}

function postMapper( $post ) {
    autoFormat( $post );
    $post->custom_fields = get_fields( $post->ID );
    if ( isset( $post->custom_fields[ 'url' ] ) ) {
        $post->custom_fields[ 'url' ] = trailingSlash(
            leadingSlash( $post->custom_fields[ 'url' ] )
        );
    }
    if ( isset( $post->custom_fields[ 'project_url' ] ) ) {
        $post->custom_fields[ 'project_url' ] = trailingSlash( $post->custom_fields[ 'project_url' ] );
    }
    if ( $post->post_type === 'page' ) {
        $template = basename( get_page_template_slug( $post->ID ), '.php' );
        if ( $template === '' ) {
            $template = 'default';
        }
        $post->template = $template;
    }

    return $post;
}

function attachmentMapper( $attachment ) {
    $sizes = get_intermediate_image_sizes();
    $urls = [];
    foreach ( $sizes as $size ) {
        $urls[ $size ] = wp_get_attachment_image_src( $attachment->ID, $size )[ 0 ];
    }
    $attachment->url = $urls;
    return $attachment;
}

function getThemeLocations( $themeLocations ) {
    return array_map( function( $key, $value ) {
        return [
            'id' => $value,
            'name' => $key
        ];
    }, array_keys( $themeLocations ), $themeLocations );
}

function getMenus( $themeLocations ) {
    return array_values(
        array_map( function( $location ) {
            $menu = get_term( $location, 'nav_menu' );
            $menu->location_id = $location;
            $menu->items = array_map(
                postMapper,
                wp_get_nav_menu_items( $menu->term_id  )
            );
            return $menu;
        }, $themeLocations )
    );
}

function projectMapper( $project ) {
    $categories = get_the_terms( $project->ID, 'project-categories' );
    $project->category_ids = array_map( function( $category ) {
        return $category->term_id;
    }, $categories );

    return $project;
}

function projectCategoryMapper( $projectCategory ) {
    $projectCategory->custom_fields = get_fields( $projectCategory );
    
    return $projectCategory;
}

$data = [    
    'pages' => $posts[ 'pages' ],
    'projects' => array_map( projectMapper, $posts[ 'projects' ] ),
    'project_categories' => array_map( projectCategoryMapper, get_terms( 'project-categories' ) ),
    'images' => array_map( attachmentMapper, $posts[ 'attachments' ] ),
    'videos' => array_map( postMapper, $posts[ 'videos' ] ),
    'forms' => array_map( postMapper, $posts[ 'forms' ] ),
    'form_fields' => array_map( postMapper, $posts[ 'form-fields' ] ),
    'menus' => getMenus( $themeLocations ),
    'theme_locations' => getThemeLocations( $themeLocations ),
    'theme' => json_decode( get_option( 'theme' ) )
];

echo wp_json_encode( $data );
?>