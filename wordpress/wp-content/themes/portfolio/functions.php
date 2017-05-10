<?php
add_theme_support( 'post-thumbnails' ); 
add_theme_support( 'menus' ); 
add_theme_support( 'html5' );
add_theme_support( 'widgets' );

register_post_type( 'project', [
    'labels' => [
        'name'               => __( 'Projects' ),
        'singular_name'      => __( 'Project' ),
        'add_new'            => __( 'Add New Project' ),
        'add_new_item'       => __( 'Add New Project' ),
        'edit_item'          => __( 'Edit Project' ),
        'new_item'           => __( 'New Project' ),
        'view_item'          => __( 'View Project' ),
        'search_items'       => __( 'Search Projects' ),
        'not_found'          => __( 'No Projects found' ),
        'not_found_in_trash' => __( 'No Projects found in Trash' ),
        'parent_item_colon'  => __( 'Parent Project:' ),
        'menu_name'          => __( 'Projects' )
    ],
    'public' => true,
    'menu_position' => 4,
    'show_in_nav_menus' => true,
    'menu_icon' => 'dashicons-images-alt2',
    'taxonomies' => [
        'post_tag',
        'category'
    ],
    'supports' => [
        'title',
        'editor',
        'excerpt',
        'comments',
        'page-attributes'
    ]
]);

register_post_type( 'video', [
    'labels' => [
        'name'               => __( 'Videos' ),
        'singular_name'      => __( 'Video' ),
        'add_new'            => __( 'Add New Video' ),
        'add_new_item'       => __( 'Add New Video' ),
        'edit_item'          => __( 'Edit Video' ),
        'new_item'           => __( 'New Video' ),
        'view_item'          => __( 'View Video' ),
        'search_items'       => __( 'Search Videos' ),
        'not_found'          => __( 'No Videos found' ),
        'not_found_in_trash' => __( 'No Videos found in Trash' ),
        'parent_item_colon'  => __( 'Parent Video:' ),
        'menu_name'          => __( 'Videos' )
    ],
    'public' => true,
    'menu_position' => 5,
    'show_in_nav_menus' => true,
    'menu_icon' => 'dashicons-format-video',
    'taxonomies' => [
        'post_tag',
        'category'
    ],
    'supports' => [
        'title',
        'editor',
        'excerpt'
    ]
]);

register_post_type( 'form', [
    'labels' => [
        'name'               => __( 'Forms' ),
        'singular_name'      => __( 'Form' ),
        'add_new'            => __( 'Add New Form' ),
        'add_new_item'       => __( 'Add New Form' ),
        'edit_item'          => __( 'Edit Form' ),
        'new_item'           => __( 'New Form' ),
        'view_item'          => __( 'View Form' ),
        'search_items'       => __( 'Search Forms' ),
        'not_found'          => __( 'No Forms found' ),
        'not_found_in_trash' => __( 'No Forms found in Trash' ),
        'parent_item_colon'  => __( 'Parent Form:' ),
        'menu_name'          => __( 'Forms' )
    ],
    'public' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-testimonial',
    'supports' => [
        'title',
        'editor'
    ]
]);

register_post_type( 'form-field', [
    'labels' => [
        'name'               => __( 'Form Fields' ),
        'singular_name'      => __( 'Form Field' ),
        'add_new'            => __( 'Add New Form Field' ),
        'add_new_item'       => __( 'Add New Form Field' ),
        'edit_item'          => __( 'Edit Form Field' ),
        'new_item'           => __( 'New Form Field' ),
        'view_item'          => __( 'View Form Field' ),
        'search_items'       => __( 'Search Form Fields' ),
        'not_found'          => __( 'No Form Fields found' ),
        'not_found_in_trash' => __( 'No Form Fields found in Trash' ),
        'parent_item_colon'  => __( 'Parent Form Field:' ),
        'menu_name'          => __( 'Form Fields' )
    ],
    'public' => true,
    'menu_position' => 6,
    'menu_icon' => 'dashicons-exerpt-view',
    'supports' => [
        'title',
        'editor'
    ]
]);

register_nav_menus([
    'side_nav' => 'Fixed Side Nav',
    'start_menu' => 'First Page Start Menu',
    'footer_menu' => 'Footer Menu',
    'social_menu' => 'Social Menu'
]); 

register_taxonomy( 'project-categories', [ 'project' ], [
    'hierarchical' => true,
    'labels' => [
        'name'              => _x( 'Project Categories', 'taxonomy general name' ),
        'singular_name'     => _x( 'Project Category', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Project Categories' ),
        'all_items'         => __( 'All Project Categories' ),
        'parent_item'       => __( 'Parent Project Category' ),
        'parent_item_colon' => __( 'Parent Project Category:' ),
        'edit_item'         => __( 'Edit Project Category' ),
        'update_item'       => __( 'Update Project Category' ),
        'add_new_item'      => __( 'Add New Project Category' ),
        'new_item_name'     => __( 'New Project Category Name' ),
        'menu_name'         => __( 'Project Categories' ),
    ],
    'show_ui' => true,
    'show_admin_column' => true
]);

function renderThemeOptionsPage() {
    require_once get_stylesheet_directory() . '/theme-options-page/index.php';
}

add_action( 'admin_menu', function() {
    add_menu_page(
        'My Awesome Admin Page',
        'Theme',
        'edit_posts',
        'awesome_page',
        'renderThemeOptionsPage',
        'dashicons-art',
        24
    );
});

add_filter( 'acf/load_field/name=background_color', function( $field ) {
    $theme = json_decode( get_option( 'theme' ) );

    $colors = [];
    foreach ( $theme->colors as $color_item ) {
        if ( is_array( $color_item ) ) {
            $colors = array_merge( $colors, $color_item );
        } else {
            $colors[] = $color_item;
        }
    }

    usort( $colors, function( $a, $b ) {
        return $a->order > $b->order;
    });

    foreach ( $colors as $color ) {
        $field[ 'choices' ][ $color->name ] = $color->name;
    }

    return $field;
});

add_action( 'widgets_init', function() {
	register_sidebar([
        'id'            => 'footer_area',
        'name'          => 'Footer',
        'description'   => 'Footer content',
        'before_widget' => '',
        'after_widget'  => ''
    ]);
});
?>