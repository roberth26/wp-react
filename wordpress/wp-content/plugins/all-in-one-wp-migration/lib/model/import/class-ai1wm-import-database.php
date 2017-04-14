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

class Ai1wm_Import_Database {

	public static function execute( $params ) {
		global $wpdb;

		// Skip database import
		if ( ! is_file( ai1wm_database_path( $params ) ) ) {
			return $params;
		}

		// Read blogs.json file
		$handle = ai1wm_open( ai1wm_blogs_path( $params ), 'r' );

		// Parse blogs.json file
		$blogs = ai1wm_read( $handle, filesize( ai1wm_blogs_path( $params ) ) );
		$blogs = json_decode( $blogs, true );

		// Close handle
		ai1wm_close( $handle );

		// Read package.json file
		$handle = ai1wm_open( ai1wm_package_path( $params ), 'r' );

		// Parse package.json file
		$config = ai1wm_read( $handle, filesize( ai1wm_package_path( $params ) ) );
		$config = json_decode( $config, true );

		// Close handle
		ai1wm_close( $handle );

		// Set progress
		Ai1wm_Status::info( __( 'Restoring database...', AI1WM_PLUGIN_NAME ) );

		$old_values = array();
		$new_values = array();

		// Get Blog URLs
		foreach ( $blogs as $blog ) {

			// Get blogs dir Upload Path
			if ( ! in_array( sprintf( "'%s'", trim( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), '/' ) ), $old_values ) ) {
				$old_values[] = sprintf( "'%s'", trim( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), '/' ) );
				$new_values[] = sprintf( "'%s'", get_option( 'upload_path' ) );
			}

			// Get sites dir Upload Path
			if ( ! in_array( sprintf( "'%s'", trim( ai1wm_uploads_path( $blog['Old']['BlogID'] ), '/' ) ), $old_values ) ) {
				$old_values[] = sprintf( "'%s'", trim( ai1wm_uploads_path( $blog['Old']['BlogID'] ), '/' ) );
				$new_values[] = sprintf( "'%s'", get_option( 'upload_path' ) );
			}

			// Handle old and new sites dir style
			if ( defined( 'UPLOADBLOGSDIR' ) ) {

				// Get Upload Path
				if ( ! in_array( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), $old_values ) ) {
					$old_values[] = ai1wm_blogsdir_path( $blog['Old']['BlogID'] );
					$new_values[] = ai1wm_blogsdir_path( $blog['New']['BlogID'] );
				}

				// Get escaped Upload Path
				if ( ! in_array( addslashes( addcslashes( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), '\/' ) ), $old_values ) ) {
					$old_values[] = addslashes( addcslashes( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), '\/' ) );
					$new_values[] = addslashes( addcslashes( ai1wm_blogsdir_path( $blog['New']['BlogID'] ), '\/' ) );
				}

				// Get Upload Path
				if ( ! in_array( ai1wm_uploads_path( $blog['Old']['BlogID'] ), $old_values ) ) {
					$old_values[] = ai1wm_uploads_path( $blog['Old']['BlogID'] );
					$new_values[] = ai1wm_blogsdir_path( $blog['New']['BlogID'] );
				}

				// Get escaped Upload Path
				if ( ! in_array( addslashes( addcslashes( ai1wm_uploads_path( $blog['Old']['BlogID'] ), '\/' ) ), $old_values ) ) {
					$old_values[] = addslashes( addcslashes( ai1wm_uploads_path( $blog['Old']['BlogID'] ), '\/' ) );
					$new_values[] = addslashes( addcslashes( ai1wm_blogsdir_path( $blog['New']['BlogID'] ), '\/' ) );
				}
			} else {

				// Get files dir Upload URL
				if ( ! in_array( sprintf( '%s/%s/', untrailingslashit( $blog['Old']['HomeURL'] ), 'files' ), $old_values ) ) {
					$old_values[] = sprintf( '%s/%s/', untrailingslashit( $blog['Old']['HomeURL'] ), 'files' );
					$new_values[] = ai1wm_uploads_url( $blog['New']['BlogID'] );
				}

				// Get Upload Path
				if ( ! in_array( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), $old_values ) ) {
					$old_values[] = ai1wm_blogsdir_path( $blog['Old']['BlogID'] );
					$new_values[] = ai1wm_uploads_path( $blog['New']['BlogID'] );
				}

				// Get escaped Upload Path
				if ( ! in_array( addslashes( addcslashes( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), '\/' ) ), $old_values ) ) {
					$old_values[] = addslashes( addcslashes( ai1wm_blogsdir_path( $blog['Old']['BlogID'] ), '\/' ) );
					$new_values[] = addslashes( addcslashes( ai1wm_uploads_path( $blog['New']['BlogID'] ), '\/' ) );
				}

				// Get Upload Path
				if ( ! in_array( ai1wm_uploads_path( $blog['Old']['BlogID'] ), $old_values ) ) {
					$old_values[] = ai1wm_uploads_path( $blog['Old']['BlogID'] );
					$new_values[] = ai1wm_uploads_path( $blog['New']['BlogID'] );
				}

				// Get escaped Upload Path
				if ( ! in_array( addslashes( addcslashes( ai1wm_uploads_path( $blog['Old']['BlogID'] ), '\/' ) ), $old_values ) ) {
					$old_values[] = addslashes( addcslashes( ai1wm_uploads_path( $blog['Old']['BlogID'] ), '\/' ) );
					$new_values[] = addslashes( addcslashes( ai1wm_uploads_path( $blog['New']['BlogID'] ), '\/' ) );
				}
			}

			// Get Site URL
			if ( isset( $blog['Old']['SiteURL'] ) && ( $blog['Old']['SiteURL'] !== $blog['New']['SiteURL'] ) ) {

				// Get domain
				$old_domain = parse_url( $blog['Old']['SiteURL'], PHP_URL_HOST );
				$new_domain = parse_url( $blog['New']['SiteURL'], PHP_URL_HOST );

				// Get scheme
				$new_scheme = parse_url( $blog['New']['SiteURL'], PHP_URL_SCHEME );

				// Replace Site URL scheme
				foreach ( array( 'http', 'https' ) as $old_scheme ) {

					// Add plain Site URL
					if ( ! in_array( set_url_scheme( $blog['Old']['SiteURL'], $old_scheme ), $old_values ) ) {
						$old_values[] = set_url_scheme( $blog['Old']['SiteURL'], $old_scheme );
						$new_values[] = set_url_scheme( $blog['New']['SiteURL'], $new_scheme );
					}

					// Add encoded Site URL
					if ( ! in_array( urlencode( set_url_scheme( $blog['Old']['SiteURL'], $old_scheme ) ), $old_values ) ) {
						$old_values[] = urlencode( set_url_scheme( $blog['Old']['SiteURL'], $old_scheme ) );
						$new_values[] = urlencode( set_url_scheme( $blog['New']['SiteURL'], $new_scheme ) );
					}

					// Add escaped Site URL
					if ( ! in_array( addslashes( addcslashes( set_url_scheme( $blog['Old']['SiteURL'], $old_scheme ), '/' ) ), $old_values ) ) {
						$old_values[] = addslashes( addcslashes( set_url_scheme( $blog['Old']['SiteURL'], $old_scheme ), '/' ) );
						$new_values[] = addslashes( addcslashes( set_url_scheme( $blog['New']['SiteURL'], $new_scheme ), '/' ) );
					}
				}

				// Add email
				if ( ! isset( $config['NoEmailReplace'] ) ) {
					if ( ! in_array( sprintf( '@%s', $old_domain ), $old_values ) ) {
						$old_values[] = sprintf( '@%s', $old_domain );
						$new_values[] = sprintf( '@%s', $new_domain );
					}
				}
			}

			// Get Home URL
			if ( isset( $blog['Old']['HomeURL'] ) && ( $blog['Old']['HomeURL'] !== $blog['New']['HomeURL'] ) ) {

				// Get domain
				$old_domain = parse_url( $blog['Old']['HomeURL'], PHP_URL_HOST );
				$new_domain = parse_url( $blog['New']['HomeURL'], PHP_URL_HOST );

				// Get scheme
				$new_scheme = parse_url( $blog['New']['HomeURL'], PHP_URL_SCHEME );

				// Replace Home URL scheme
				foreach ( array( 'http', 'https' ) as $old_scheme ) {

					// Add plain Home URL
					if ( ! in_array( set_url_scheme( $blog['Old']['HomeURL'], $old_scheme ), $old_values ) ) {
						$old_values[] = set_url_scheme( $blog['Old']['HomeURL'], $old_scheme );
						$new_values[] = set_url_scheme( $blog['New']['HomeURL'], $new_scheme );
					}

					// Add encoded Home URL
					if ( ! in_array( urlencode( set_url_scheme( $blog['Old']['HomeURL'], $old_scheme ) ), $old_values ) ) {
						$old_values[] = urlencode( set_url_scheme( $blog['Old']['HomeURL'], $old_scheme ) );
						$new_values[] = urlencode( set_url_scheme( $blog['New']['HomeURL'], $new_scheme ) );
					}

					// Add escaped Home URL
					if ( ! in_array( addslashes( addcslashes( set_url_scheme( $blog['Old']['HomeURL'], $old_scheme ), '/' ) ), $old_values ) ) {
						$old_values[] = addslashes( addcslashes( set_url_scheme( $blog['Old']['HomeURL'], $old_scheme ), '/' ) );
						$new_values[] = addslashes( addcslashes( set_url_scheme( $blog['New']['HomeURL'], $new_scheme ), '/' ) );
					}
				}

				// Add email
				if ( ! isset( $config['NoEmailReplace'] ) ) {
					if ( ! in_array( sprintf( '@%s', $old_domain ), $old_values ) ) {
						$old_values[] = sprintf( '@%s', $old_domain );
						$new_values[] = sprintf( '@%s', $new_domain );
					}
				}
			}
		}

		// Get Site URL
		if ( isset( $config['SiteURL'] ) && ( $config['SiteURL'] !== site_url() ) ) {

			// Get www URL
			if ( stripos( $config['SiteURL'], '//www.' ) !== false ) {
				$www = str_ireplace( '//www.', '//', $config['SiteURL'] );
			} else {
				$www = str_ireplace( '//', '//www.', $config['SiteURL'] );
			}

			// Replace Site URL
			foreach ( array( $config['SiteURL'], $www ) as $url ) {

				// Get domain
				$old_domain = parse_url( $url, PHP_URL_HOST );
				$new_domain = parse_url( site_url(), PHP_URL_HOST );

				// Get path
				$old_path = parse_url( $url, PHP_URL_PATH );
				$new_path = parse_url( site_url(), PHP_URL_PATH );

				// Get scheme
				$new_scheme = parse_url( site_url(), PHP_URL_SCHEME );

				// Add domain and path
				if ( ! in_array( sprintf( "%s','%s", $old_domain, trailingslashit( $old_path ) ), $old_values ) ) {
					$old_values[] = sprintf( "%s','%s", $old_domain, trailingslashit( $old_path ) );
					$new_values[] = sprintf( "%s','%s", $new_domain, trailingslashit( $new_path ) );
				}

				// Replace Site URL scheme
				foreach ( array( 'http', 'https' ) as $old_scheme ) {

					// Add plain Site URL
					if ( ! in_array( set_url_scheme( $url, $old_scheme ), $old_values ) ) {
						$old_values[] = set_url_scheme( $url, $old_scheme );
						$new_values[] = set_url_scheme( site_url(), $new_scheme );
					}

					// Add encoded Site URL
					if ( ! in_array( urlencode( set_url_scheme( $url, $old_scheme ) ), $old_values ) ) {
						$old_values[] = urlencode( set_url_scheme( $url, $old_scheme ) );
						$new_values[] = urlencode( set_url_scheme( site_url(), $new_scheme ) );
					}

					// Add escaped Site URL
					if ( ! in_array( addslashes( addcslashes( set_url_scheme( $url, $old_scheme ), '/' ) ), $old_values ) ) {
						$old_values[] = addslashes( addcslashes( set_url_scheme( $url, $old_scheme ), '/' ) );
						$new_values[] = addslashes( addcslashes( set_url_scheme( site_url(), $new_scheme ), '/' ) );
					}
				}

				// Add email
				if ( ! isset( $config['NoEmailReplace'] ) ) {
					if ( ! in_array( sprintf( '@%s', $old_domain ), $old_values ) ) {
						$old_values[] = sprintf( '@%s', $old_domain );
						$new_values[] = sprintf( '@%s', $new_domain );
					}
				}
			}
		}

		// Get Home URL
		if ( isset( $config['HomeURL'] ) && ( $config['HomeURL'] !== home_url() ) ) {

			// Get www URL
			if ( stripos( $config['HomeURL'], '//www.' ) !== false ) {
				$www = str_ireplace( '//www.', '//', $config['HomeURL'] );
			} else {
				$www = str_ireplace( '//', '//www.', $config['HomeURL'] );
			}

			// Replace Home URL
			foreach ( array( $config['HomeURL'], $www ) as $url ) {

				// Get domain
				$old_domain = parse_url( $url, PHP_URL_HOST );
				$new_domain = parse_url( home_url(), PHP_URL_HOST );

				// Get path
				$old_path = parse_url( $url, PHP_URL_PATH );
				$new_path = parse_url( home_url(), PHP_URL_PATH );

				// Get scheme
				$new_scheme = parse_url( home_url(), PHP_URL_SCHEME );

				// Add domain and path
				if ( ! in_array( sprintf( "%s','%s", $old_domain, trailingslashit( $old_path ) ), $old_values ) ) {
					$old_values[] = sprintf( "%s','%s", $old_domain, trailingslashit( $old_path ) );
					$new_values[] = sprintf( "%s','%s", $new_domain, trailingslashit( $new_path ) );
				}

				// Replace Home URL scheme
				foreach ( array( 'http', 'https' ) as $old_scheme ) {

					// Add plain Home URL
					if ( ! in_array( set_url_scheme( $url, $old_scheme ), $old_values ) ) {
						$old_values[] = set_url_scheme( $url, $old_scheme );
						$new_values[] = set_url_scheme( home_url(), $new_scheme );
					}

					// Add encoded Home URL
					if ( ! in_array( urlencode( set_url_scheme( $url, $old_scheme ) ), $old_values ) ) {
						$old_values[] = urlencode( set_url_scheme( $url, $old_scheme ) );
						$new_values[] = urlencode( set_url_scheme( home_url(), $new_scheme ) );
					}

					// Add escaped Home URL
					if ( ! in_array( addslashes( addcslashes( set_url_scheme( $url, $old_scheme ), '/' ) ), $old_values ) ) {
						$old_values[] = addslashes( addcslashes( set_url_scheme( $url, $old_scheme ), '/' ) );
						$new_values[] = addslashes( addcslashes( set_url_scheme( home_url(), $new_scheme ), '/' ) );
					}
				}

				// Add email
				if ( ! isset( $config['NoEmailReplace'] ) ) {
					if ( ! in_array( sprintf( '@%s', $old_domain ), $old_values ) ) {
						$old_values[] = sprintf( '@%s', $old_domain );
						$new_values[] = sprintf( '@%s', $new_domain );
					}
				}
			}
		}

		// Get WordPress Content
		if ( isset( $config['WordPress']['Content'] ) && ( $config['WordPress']['Content'] !== WP_CONTENT_DIR ) ) {

			// Add plain WordPress Content
			if ( ! in_array( $config['WordPress']['Content'], $old_values ) ) {
				$old_values[] = $config['WordPress']['Content'];
				$new_values[] = WP_CONTENT_DIR;
			}

			// Add encoded WordPress Content
			if ( ! in_array( urlencode( $config['WordPress']['Content'] ), $old_values ) ) {
				$old_values[] = urlencode( $config['WordPress']['Content'] );
				$new_values[] = urlencode( WP_CONTENT_DIR );
			}

			// Add escaped WordPress Content
			if ( ! in_array( addslashes( addcslashes( $config['WordPress']['Content'], '\/' ) ), $old_values ) ) {
				$old_values[] = addslashes( addcslashes( $config['WordPress']['Content'], '\/' ) );
				$new_values[] = addslashes( addcslashes( WP_CONTENT_DIR, '\/' ) );
			}
		}

		// Get URL IP
		$url_ip = get_option( AI1WM_URL_IP );

		// Get URL adapter
		$url_adapter = get_option( AI1WM_URL_ADAPTER );

		// Get secret key
		$secret_key = get_option( AI1WM_SECRET_KEY );

		// Get HTTP user
		$auth_user = get_option( AI1WM_AUTH_USER );

		// Get HTTP password
		$auth_password = get_option( AI1WM_AUTH_PASSWORD );

		$old_prefixes = array();
		$new_prefixes = array();

		// Set main table prefixes
		$old_prefixes[] = ai1wm_servmask_prefix( 'mainsite' );
		$new_prefixes[] = ai1wm_table_prefix();

		// Set site table prefixes
		foreach ( $blogs as $blog ) {
			if ( ai1wm_main_site( $blog['Old']['BlogID'] ) === false ) {
				$old_prefixes[] = ai1wm_servmask_prefix( $blog['Old']['BlogID'] );
				$new_prefixes[] = ai1wm_table_prefix( $blog['New']['BlogID'] );
			}
		}

		// Set base table prefixes
		foreach ( $blogs as $blog ) {
			if ( ai1wm_main_site( $blog['Old']['BlogID'] ) === true ) {
				$old_prefixes[] = ai1wm_servmask_prefix( 'basesite' );
				$new_prefixes[] = ai1wm_table_prefix( $blog['New']['BlogID'] );
			}
		}

		// Set site table prefixes
		foreach ( $blogs as $blog ) {
			if ( ai1wm_main_site( $blog['Old']['BlogID'] ) === true ) {
				$old_prefixes[] = ai1wm_servmask_prefix( $blog['Old']['BlogID'] );
				$new_prefixes[] = ai1wm_table_prefix( $blog['New']['BlogID'] );
			}
		}

		// Set table prefixes
		$old_prefixes[] = ai1wm_servmask_prefix();
		$new_prefixes[] = ai1wm_table_prefix();

		// Get database client
		if ( empty( $wpdb->use_mysqli ) ) {
			$client = new Ai1wm_Database_Mysql( $wpdb );
		} else {
			$client = new Ai1wm_Database_Mysqli( $wpdb );
		}

		// Set database options
		$client->set_old_table_prefixes( $old_prefixes )
			   ->set_new_table_prefixes( $new_prefixes )
			   ->set_old_replace_values( $old_values )
			   ->set_new_replace_values( $new_values );

		// Flush database
		if ( ( $version = $config['Plugin']['Version'] ) ) {
			if ( $version !== 'develop' && version_compare( $version, '4.10', '<' ) ) {
				$client->set_include_table_prefixes( array( ai1wm_table_prefix() ) );
				$client->flush();
			}
		}

		// Set Visual Composer
		$client->set_visual_composer( ! is_wp_error( validate_plugin( 'js_composer/js_composer.php' ) ) );

		// Import database
		$client->import( ai1wm_database_path( $params ) );

		// Flush WP cache
		ai1wm_cache_flush();

		// Set progress
		Ai1wm_Status::info( __( 'Done restoring database...', AI1WM_PLUGIN_NAME ) );

		// Activate plugins
		ai1wm_activate_plugins( ai1wm_active_servmask_plugins() );

		// Set the new URL IP
		update_option( AI1WM_URL_IP, $url_ip );

		// Set the new URL adapter
		update_option( AI1WM_URL_ADAPTER, $url_adapter );

		// Set the new secret key value
		update_option( AI1WM_SECRET_KEY, $secret_key );

		// Set the new HTTP user
		update_option( AI1WM_AUTH_USER, $auth_user );

		// Set the new HTTP password
		update_option( AI1WM_AUTH_PASSWORD, $auth_password );

		return $params;
	}
}
