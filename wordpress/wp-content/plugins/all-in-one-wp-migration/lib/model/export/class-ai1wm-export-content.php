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

class Ai1wm_Export_Content {

	public static function execute( $params ) {

		// Set current filesize
		if ( isset( $params['current_filesize'] ) ) {
			$current_filesize = (int) $params['current_filesize'];
		} else {
			$current_filesize = 0;
		}

		// Set content offset
		if ( isset( $params['content_offset'] ) ) {
			$content_offset = (int) $params['content_offset'];
		} else {
			$content_offset = 0;
		}

		// Set filemap offset
		if ( isset( $params['filemap_offset'] ) ) {
			$filemap_offset = (int) $params['filemap_offset'];
		} else {
			$filemap_offset = 0;
		}

		// Get total files
		if ( isset( $params['total_files'] ) ) {
			$total_files = (int) $params['total_files'];
		} else {
			$total_files = 1;
		}

		// Get total size
		if ( isset( $params['total_size'] ) ) {
			$total_size = (int) $params['total_size'];
		} else {
			$total_size = 1;
		}

		// Get processed files
		if ( isset( $params['processed'] ) ) {
			$processed = (int) $params['processed'];
		} else {
			$processed = 0;
		}

		// What percent of files have we processed?
		$progress = (int) ( ( $processed / $total_size ) * 100 );

		// Set progress
		if ( empty( $content_offset ) ) {
			Ai1wm_Status::info( sprintf( __( 'Archiving %d files...<br />%d%% complete', AI1WM_PLUGIN_NAME ), $total_files, $progress ) );
		}

		// Start time
		$start = microtime( true );

		// Get map file
		$filemap = ai1wm_open( ai1wm_filemap_path( $params ), 'r' );

		// Set filemap pointer at the current index
		if ( fseek( $filemap, $filemap_offset ) !== -1 ) {

			// Get archive
			$archive = new Ai1wm_Compressor( ai1wm_archive_path( $params ) );

			while ( $path = trim( fgets( $filemap ) ) ) {
				try {

					// Add file to archive
					if ( ( $current_offset = $archive->add_file( WP_CONTENT_DIR . DIRECTORY_SEPARATOR . $path, $path, $current_filesize, $content_offset, 10 ) ) ) {

						// What percent of files have we processed?
						if ( ( $processed += ( $current_offset - $content_offset ) ) ) {
							$progress = (int) ( ( $processed / $total_size ) * 100 );
						}

						// Set progress
						Ai1wm_Status::info( sprintf( __( 'Archiving %d files...<br />%d%% complete', AI1WM_PLUGIN_NAME ), $total_files, $progress ) );

						// Set current filesize
						$current_filesize = $archive->get_current_filesize();

						// Set content offset
						$content_offset = $current_offset;

						break;
					}

					// Increment processed files
					if ( empty( $content_offset ) ) {
						$processed += $archive->get_current_filesize();
					}

					// Set current filesize
					$current_filesize = 0;

					// Set content offset
					$content_offset = 0;

					// Set filemap offset
					$filemap_offset = ftell( $filemap );

				} catch ( Ai1wm_Quota_Exceeded_Exception $e ) {
					throw new Exception( 'Out of disk space.' );
				} catch ( Exception $e ) {
					// Skip bad file permissions
				}

				// More than 10 seconds have passed, break and do another request
				if ( ( microtime( true ) - $start ) > 10 ) {
					break;
				}
			}

			// Close the archive file
			$archive->close();
		}

		// End of the filemap?
		if ( feof( $filemap ) ) {

			// Unset current filesize
			unset( $params['current_filesize'] );

			// Unset content offset
			unset( $params['content_offset'] );

			// Unset filemap offset
			unset( $params['filemap_offset'] );

			// Unset processed files
			unset( $params['processed'] );

			// Unset completed flag
			unset( $params['completed'] );

		} else {

			// Set current filesize
			$params['current_filesize'] = $current_filesize;

			// Set content offset
			$params['content_offset'] = $content_offset;

			// Set filemap offset
			$params['filemap_offset'] = $filemap_offset;

			// Set processed files
			$params['processed'] = $processed;

			// Set completed flag
			$params['completed'] = false;
		}

		// Close the filemap file
		ai1wm_close( $filemap );

		return $params;
	}
}
