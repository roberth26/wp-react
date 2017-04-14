<?php
    function import( $path ) {
        $dir = get_stylesheet_directory() . '/theme-options-page';

        return file_get_contents( $dir . $path );
    }

    // in case we need to clear the current value
    // update_option( 'theme', '' );
    if ( isset( $_POST[ 'theme' ] ) ) {
        update_option( 'theme', json_encode( $_POST[ 'theme' ] ) );
    }
    $theme = get_option( 'theme' );
    if ( !$theme ) {
        $theme = json_encode([
            'colors' => [
                'footer_color' => [
                    'name' => 'Footer Color',
                    'value' => '#FFF',
                    'order' => 0
                ],
                'custom_colors' => []
            ]
        ]);
    }
?>

<div class="container">
    <div class="header">
        <h1>Theme</h1>
        <button id="save-button" style="float: right">Save</button>
    </div>
    <hr />
    <h2>Colors</h2>
    <div id="app-container"></div>
</div>

<script>
    (function( $, theme ) {
        $( document ).ready( function( $ ) {
            var App = <?= import( '/components/App.js' ) ?>;
            var Color = <?= import( '/components/Color.js' ) ?>;
            var SuccessNotification = <?= import( '/components/SuccessNotification.js' ) ?>;
            var AppStore = <?= import( '/AppStore.js' ) ?>;

            var $container = $( '#app-container' );
            var appStore = AppStore( <?= $theme ?>, update );
            var $form = null;

            update(); // initial

            $( '#save-button' ).click( function() {
                appStore.save();
            });

            function update() {
                $container.html( App( appStore ) );
            }
        });    
    }( jQuery, window.theme ))
</script>

<style>
    .container {
        width: 100%;
        max-width: 480px;
    }

    .container * {
        box-sizing: border-box;
    }

    .container button {
        padding: 0;
        text-align: center;
        appearance: none;
        border: 0;
        cursor: pointer;
        outline: 0 !important;
        background: transparent;
        border-radius: 3px;
        border: 1px solid rgba( 0, 0, 0, .2 );
        min-height: 30px;
    }

    .container button:before {
        color: rgb( 100, 100, 100 );
    }

    .container button:disabled {
        opacity: .5;
        cursor: default;
    }

    .container button:not(:disabled):hover {
        background: rgb( 250, 250, 250 );
    }

    .container hr {
        margin: 0;
        padding: 0;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
    }

    #save-button {
        padding: 8px 15px;
        width: 100%;
        max-width: 120px;
        appearance: none;
        border: 2px solid rgb( 0, 120, 255 );
        border-radius: 3px;
        color: rgb( 0, 120, 255 );
        text-align: center;
        background-color: transparent;
        cursor: pointer;
        font-size: 16px;
        transition: all .35s ease;
        box-sizing: border-box;
    }

    #save-button:hover {
        background-color: rgb( 0, 120, 255 );
        color: white;
    }
</style>