<?php
/**
 * Plugin action and row meta links
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Add plugin_action_links
 */
function bodhi_svgs_plugin_action_links( $links ) {

	$links[] = '<a href="'. get_admin_url( null, 'options-general.php?page=svg-support' ) .'">Settings</a>';

	return $links;

}
add_filter( 'plugin_action_links_' . $plugin_file, 'bodhi_svgs_plugin_action_links' );

/**
 * Add plugin_row_meta links
 */
function bodhi_svgs_plugin_meta_links( $links, $file ) {

	$plugin_file = 'svg-support/svg-support.php';
	if ( $file == $plugin_file ) {
		return array_merge(
			$links,
			array(
				'<a target="_blank" href="https://wordpress.org/support/plugin/svg-support">' . __( 'Get Support', 'svg-support') . '</a>',
				'<a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Z9R7JERS82EQQ">' . __( 'Donate to author', 'svg-support') . '</a>',
				'<a target="_blank" href="https://secure.gowebben.com/cart.php?promocode=SVGSUPPORT">' . __( '$25 Free Credit from GoWebben', 'svg-support') . '</a>'
			)
		);
	}

	return $links;

}
add_filter( 'plugin_row_meta', 'bodhi_svgs_plugin_meta_links', 10, 2 );