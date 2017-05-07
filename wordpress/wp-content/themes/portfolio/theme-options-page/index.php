<?php
    function import( $path ) {
        $dir = get_stylesheet_directory() . '/theme-options-page';

        return file_get_contents( $dir . $path );
    }

    // in case we need to clear the current value
    // update_option( 'theme', '' );
    if ( isset( $_POST[ 'theme' ] ) ) {
        print_r( $_POST );
        update_option( 'theme', json_encode( $_POST[ 'theme' ] ) );
    }
    $theme = get_option( 'theme' );
    if ( !$theme ) {
        $theme = import( '/default-theme.json' );
    }
?>

<div class="container">
    <div class="header">
        <h1>Theme</h1>
        <button id="save-button" style="float: right">Save</button>
    </div>
    <hr />
    <div id="app-container"></div>
    <h2>Shortcodes</h2>
    <div class="shortcode">
        <div class="shortcode__title">clip-path</div>
        <code class="shortcode__example">[clip-path shape="hexagon" rotation="90"] ...content [/clip-path]</code>
        <ul class="shortcode__parameters">
            <li class="shortcode__parameters__item"><strong>shape:</strong> circle, triangle, square, pentagon, hexagon, heptagon, octagon, nonagon, decagon</li>
            <li class="shortcode__parameters__item"><strong>rotation:</strong> number</li>
        </ul>
        <p>Clips some content with a defined shape and rotation.</p>
    </div>
    <div class="shortcode">
        <div class="shortcode__title">form</div>
        <code class="shortcode__example">[form id="91"]</code>
        <ul class="shortcode__parameters">
            <li class="shortcode__parameters__item"><strong>id:</strong> number</li>
        </ul>
        <p>Renders the form specified by ID.</p>
    </div>
    <div class="shortcode">
        <div class="shortcode__title">icon</div>
        <code class="shortcode__example">[icon name="facebook"]</code>
        <ul class="shortcode__parameters">
            <li class="shortcode__parameters__item"><strong>name:</strong> facebook, linkedin, youtube, email, cv</li>
        </ul>
        <p>Renders the icon specified by name.</p>
    </div>
</div>

<script>
    (function( $ ) {
        var App = <?= import( '/components/App.js' ) ?>;
        var Color = <?= import( '/components/Color.js' ) ?>;
        var Unit = <?= import( '/components/Unit.js' ) ?>;
        var SuccessNotification = <?= import( '/components/SuccessNotification.js' ) ?>;
        var AppStore = <?= import( '/AppStore.js' ) ?>;

        var $container = $( '#app-container' );
        var theme = <?= $theme ?>;
        var appStore = AppStore( theme );
        appStore.subscribe( function( state ) {
            update();
        });
        var $form = null;

        update(); // initial

        $( '#save-button' ).click( function() {
            appStore.save();
        });

        function update() {
            $container.html( App( appStore ) );
        }
    }( jQuery ))
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

    .shortcode {
        margin-bottom: 30px;
    }

    .shortcode__title {
        font-weight: bold;
        margin-bottom: 20px;
    }

    .shortcode__parameters {
        list-style: none;
    }
</style>