<?php
/**
 * Copyright (C) 2014-2017 ServMask Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * ███████╗███████╗██████╗ ██╗   ██╗███╗   ███╗ █████╗ ███████╗██╗  ██╗
 * ██╔════╝██╔════╝██╔══██╗██║   ██║████╗ ████║██╔══██╗██╔════╝██║ ██╔╝
 * ███████╗█████╗  ██████╔╝██║   ██║██╔████╔██║███████║███████╗█████╔╝
 * ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║╚██╔╝██║██╔══██║╚════██║██╔═██╗
 * ███████║███████╗██║  ██║ ╚████╔╝ ██║ ╚═╝ ██║██║  ██║███████║██║  ██╗
 * ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
 */

class Ai1wm_Export_Config {

	public static function execute( $params ) {
		global $wp_version;

		// Set progress
		Ai1wm_Status::info( __( 'Adding configuration to archive...', AI1WM_PLUGIN_NAME ) );

		// Flush WP cache
		ai1wm_cache_flush();

		// Get options
		$options = wp_load_alloptions();

		// Set config
		$config = array();

		// Set site URL
		if ( isset( $options['siteurl'] ) ) {
			$config['SiteURL'] = untrailingslashit( $options['siteurl'] );
		} else {
			$config['SiteURL'] = site_url();
		}

		// Set home URL
		if ( isset( $options['home'] ) ) {
			$config['HomeURL'] = untrailingslashit( $options['home'] );
		} else {
			$config['HomeURL'] = home_url();
		}

		// Set plugin version
		$config['Plugin'] = array( 'Version' => AI1WM_VERSION );

		// Set active plugins
		$config['Plugins'] = array_values( array_diff( ai1wm_active_plugins(), ai1wm_active_servmask_plugins() ) );

		// Set WordPress version and content
		$config['WordPress'] = array( 'Version' => $wp_version, 'Content' => WP_CONTENT_DIR );

		// Set no replace email
		if ( isset( $params['options']['no_email_replace'] ) ) {
			$config['NoEmailReplace'] = true;
		}

		// Save package.json file
		$handle = ai1wm_open( ai1wm_package_path( $params ), 'w' );
		ai1wm_write( $handle, json_encode( $config ) );
		ai1wm_close( $handle );

		// Add package.json file
		$archive = new Ai1wm_Compressor( ai1wm_archive_path( $params ) );
		$archive->add_file( ai1wm_package_path( $params ), AI1WM_PACKAGE_NAME );
		$archive->close();

		// Set progress
		Ai1wm_Status::info( __( 'Done adding configuration to archive.', AI1WM_PLUGIN_NAME ) );

		return $params;
	}
}
