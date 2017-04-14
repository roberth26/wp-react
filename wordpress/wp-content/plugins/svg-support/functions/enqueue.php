<?php
/**
 * Enqueue scripts and styles
 * This file is to enqueue the scripts and styles both admin and front end
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Enqueue the admin CSS using screen check functions
 */
function bodhi_svgs_admin_css() {

	// check if user is on SVG Support settings page or media library page
	if ( bodhi_svgs_specific_pages_settings() || bodhi_svgs_specific_pages_media_library() ) {

		// enqueue the admin CSS
		wp_enqueue_style( 'bodhi-svgs-admin', BODHI_SVGS_PLUGIN_URL . 'css/svgs-admin.css' );

	}

	// check if user is on SVG Support settings page and not in "Advanced Mode"
	if ( bodhi_svgs_specific_pages_settings() && ! bodhi_svgs_advanced_mode() ) {

		// enqueue the simple mode admin CSS
		wp_enqueue_style( 'bodhi-svgs-admin-simple-mode', BODHI_SVGS_PLUGIN_URL . 'css/svgs-admin-simple-mode.css' );

	}

}
add_action( 'admin_enqueue_scripts', 'bodhi_svgs_admin_css' );

/**
 * Enqueue front end CSS for attachment pages
 */
function bodhi_svgs_frontend_css() {

	// check if user is on attachment page
	if ( is_attachment() ) {
		wp_enqueue_style( 'bodhi-svgs-attachment', BODHI_SVGS_PLUGIN_URL . 'css/svgs-attachment.css' );
	}

}
add_action( 'wp_enqueue_scripts', 'bodhi_svgs_frontend_css' );

/**
 * Enqueue and localize JS for IMG tag replacement
 */
function bodhi_svgs_inline() {

	if ( bodhi_svgs_advanced_mode() ) {

		// get the settings
		global $bodhi_svgs_options;

		// set the custom class for use in JS
		$css_target = 'img.'. $bodhi_svgs_options['css_target'];

		// check where the JS should be placed
		if ( ! empty( $bodhi_svgs_options['js_foot_choice'] ) ) {

			wp_register_script( 'bodhi_svg_inline', BODHI_SVGS_PLUGIN_URL . 'js/min/svgs-inline-min.js', array( 'jquery' ), '1.0.0', true );

		} else {

			wp_register_script( 'bodhi_svg_inline', BODHI_SVGS_PLUGIN_URL . 'js/min/svgs-inline-min.js', array( 'jquery' ), '1.0.0', false );

		}

		wp_enqueue_script( 'bodhi_svg_inline' );
		wp_localize_script( 'bodhi_svg_inline', 'cssTarget', $css_target );

	}

}
add_action( 'wp_enqueue_scripts', 'bodhi_svgs_inline' );