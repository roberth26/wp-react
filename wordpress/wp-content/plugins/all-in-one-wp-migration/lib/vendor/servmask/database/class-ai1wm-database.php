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

abstract class Ai1wm_Database {

	/**
	 * Number of queries per transaction
	 *
	 * @var int
	 */
	const QUERIES_PER_TRANSACTION = 1000;

	/**
	 * WordPress database handler
	 *
	 * @access protected
	 * @var mixed
	 */
	protected $wpdb = null;

	/**
	 * Old table prefixes
	 *
	 * @access protected
	 * @var array
	 */
	protected $old_table_prefixes = array();

	/**
	 * New table prefixes
	 *
	 * @access protected
	 * @var array
	 */
	protected $new_table_prefixes = array();

	/**
	 * Old replace values
	 *
	 * @access protected
	 * @var array
	 */
	protected $old_replace_values = array();

	/**
	 * New replace values
	 *
	 * @access protected
	 * @var array
	 */
	protected $new_replace_values = array();

	/**
	 * Table query clauses
	 *
	 * @access protected
	 * @var array
	 */
	protected $table_query_clauses = array();

	/**
	 * Table prefix columns
	 *
	 * @access protected
	 * @var array
	 */
	protected $table_prefix_columns = array();

	/**
	 * Include table prefixes
	 *
	 * @access protected
	 * @var array
	 */
	protected $include_table_prefixes = array();

	/**
	 * Exclude table prefixes
	 *
	 * @access protected
	 * @var array
	 */
	protected $exclude_table_prefixes = array();

	/**
	 * Number of serialized replaces
	 *
	 * @access protected
	 * @var int
	 */
	protected $number_of_replaces = 0;

	/**
	 * Visual Composer
	 *
	 * @access protected
	 * @var bool
	 */
	protected $visual_composer = false;

	/**
	 * Constructor
	 *
	 * @param  object $wpdb WPDB instance
	 * @return Ai1wm_Database
	 */
	public function __construct( $wpdb ) {
		$this->wpdb = $wpdb;

		// Set database host (HyberDB)
		if ( empty( $this->wpdb->dbhost ) ) {
			if ( isset( $this->wpdb->last_used_server['host'] ) ) {
				$this->wpdb->dbhost = $this->wpdb->last_used_server['host'];
			}
		}

		// Set database name (HyperDB)
		if ( empty( $this->wpdb->dbname ) ) {
			if ( isset( $this->wpdb->last_used_server['name'] ) ) {
				$this->wpdb->dbname = $this->wpdb->last_used_server['name'];
			}
		}
	}

	/**
	 * Set old table prefixes
	 *
	 * @param  array $prefixes List of table prefixes
	 * @return Ai1wm_Database
	 */
	public function set_old_table_prefixes( $prefixes ) {
		$this->old_table_prefixes = $prefixes;

		return $this;
	}

	/**
	 * Get old table prefixes
	 *
	 * @return array
	 */
	public function get_old_table_prefixes() {
		return $this->old_table_prefixes;
	}

	/**
	 * Set new table prefixes
	 *
	 * @param  array $prefixes List of table prefixes
	 * @return Ai1wm_Database
	 */
	public function set_new_table_prefixes( $prefixes ) {
		$this->new_table_prefixes = $prefixes;

		return $this;
	}

	/**
	 * Get new table prefixes
	 *
	 * @return array
	 */
	public function get_new_table_prefixes() {
		return $this->new_table_prefixes;
	}

	/**
	 * Set old replace values
	 *
	 * @param  array $values List of values
	 * @return Ai1wm_Database
	 */
	public function set_old_replace_values( $values ) {
		$this->old_replace_values = $values;

		return $this;
	}

	/**
	 * Get old replace values
	 *
	 * @return array
	 */
	public function get_old_replace_values() {
		return $this->old_replace_values;
	}

	/**
	 * Set new replace values
	 *
	 * @param  array $values List of values
	 * @return Ai1wm_Database
	 */
	public function set_new_replace_values( $values ) {
		$this->new_replace_values = $values;

		return $this;
	}

	/**
	 * Get new replace values
	 *
	 * @return array
	 */
	public function get_new_replace_values() {
		return $this->new_replace_values;
	}

	/**
	 * Set table query clauses
	 *
	 * @param  string $table   Table name
	 * @param  array  $clauses Table clauses
	 * @return Ai1wm_Database
	 */
	public function set_table_query_clauses( $table, $clauses ) {
		$this->table_query_clauses[ strtolower( $table ) ] = $clauses;

		return $this;
	}

	/**
	 * Get table query clauses
	 *
	 * @param  string $table Table name
	 * @return mixed
	 */
	public function get_table_query_clauses( $table ) {
		if ( isset( $this->table_query_clauses[ strtolower( $table ) ] ) ) {
			return $this->table_query_clauses[ strtolower( $table ) ];
		}
	}

	/**
	 * Set table prefix columns
	 *
	 * @param  string $table   Table name
	 * @param  array  $columns Table columns
	 * @return Ai1wm_Database
	 */
	public function set_table_prefix_columns( $table, $columns ) {
		foreach ( $columns as $column ) {
			$this->table_prefix_columns[ strtolower( $table ) ][ strtolower( $column ) ] = true;
		}

		return $this;
	}

	/**
	 * Get table prefix columns
	 *
	 * @param  string $table Table name
	 * @return mixed
	 */
	public function get_table_prefix_columns( $table ) {
		if ( isset( $this->table_prefix_columns[ strtolower( $table ) ] ) ) {
			return $this->table_prefix_columns[ strtolower( $table ) ];
		}
	}

	/**
	 * Set include table prefixes
	 *
	 * @param  array $prefixes List of table prefixes
	 * @return Ai1wm_Database
	 */
	public function set_include_table_prefixes( $prefixes ) {
		$this->include_table_prefixes = $prefixes;

		return $this;
	}

	/**
	 * Get include table prefixes
	 *
	 * @return array
	 */
	public function get_include_table_prefixes() {
		return $this->include_table_prefixes;
	}

	/**
	 * Set exclude table prefixes
	 *
	 * @param  array $prefixes List of table prefixes
	 * @return Ai1wm_Database
	 */
	public function set_exclude_table_prefixes( $prefixes ) {
		$this->exclude_table_prefixes = $prefixes;

		return $this;
	}

	/**
	 * Get exclude table prefixes
	 *
	 * @return array
	 */
	public function get_exclude_table_prefixes() {
		return $this->exclude_table_prefixes;
	}

	/**
	 * Set Visual Composer
	 *
	 * @param  bool $active Is Visual Composer Active?
	 * @return Ai1wm_Database
	 */
	public function set_visual_composer( $active ) {
		$this->visual_composer = $active;

		return $this;
	}

	/**
	 * Get Visual Composer
	 *
	 * @return bool
	 */
	public function get_visual_composer() {
		return $this->visual_composer;
	}

	/**
	 * Get tables
	 *
	 * @return array
	 */
	public function get_tables() {
		$tables = array();

		$result = $this->query( "SHOW TABLES FROM `{$this->wpdb->dbname}`" );
		while ( $row = $this->fetch_row( $result ) ) {
			if ( isset( $row[0] ) && ( $table_name = $row[0] ) ) {

				// Include table prefixes
				if ( $this->get_include_table_prefixes() ) {
					$include = false;

					// Check table prefixes
					foreach ( $this->get_include_table_prefixes() as $prefix ) {
						if ( stripos( $table_name, $prefix ) === 0 ) {
							$include = true;
							break;
						}
					}

					// Skip current table
					if ( $include === false ) {
						continue;
					}
				}

				// Exclude table prefixes
				if ( $this->get_exclude_table_prefixes() ) {
					$exclude = false;

					// Check table prefixes
					foreach ( $this->get_exclude_table_prefixes() as $prefix ) {
						if ( stripos( $table_name, $prefix ) === 0 ) {
							$exclude = true;
							break;
						}
					}

					// Skip current table
					if ( $exclude === true ) {
						continue;
					}
				}

				// Add table name
				$tables[] = $table_name;
			}
		}

		// Close result cursor
		$this->free_result( $result );

		return $tables;
	}

	/**
	 * Export database into a file
	 *
	 * @param  string $file_name            Name of file
	 * @param  string $current_table_index  Current table index
	 * @param  int    $timeout              Process timeout
	 * @return bool
	 */
	public function export( $file_name, &$current_table_index = 0, $timeout = 0 ) {
		// Set file handler
		$file_handler = ai1wm_open( $file_name, 'ab' );

		// Write headers
		if ( $current_table_index === 0 ) {
			ai1wm_write( $file_handler, $this->get_header() );
		}

		// Start time
		$start = microtime( true );

		// Flag to hold if all tables have been processed
		$completed = true;

		// Get tables
		$tables = $this->get_tables();

		// Export tables
		for ( ; $current_table_index < count( $tables ); ) {

			// Get table name
			$table_name = $tables[ $current_table_index ];

			// Replace table name prefixes
			$new_table_name = $this->replace_table_prefixes( $table_name, 0 );

			// Get table structure
			$structure = $this->query( "SHOW CREATE TABLE `$table_name`" );
			$table = $this->fetch_assoc( $structure );

			// Close structure cursor
			$this->free_result( $structure );

			// Get create table
			if ( isset( $table['Create Table'] ) ) {

				// Write table drop statement
				$drop_table = "\nDROP TABLE IF EXISTS `$new_table_name`;\n";

				// Write table statement
				ai1wm_write( $file_handler, $drop_table );

				// Replace create table prefixes
				$create_table = $this->replace_table_prefixes( $table['Create Table'], 14 );

				// Replace table constraints
				$create_table = $this->replace_table_constraints( $create_table );

				// Replace create table options
				$create_table = $this->replace_table_options( $create_table );

				// Write table structure
				ai1wm_write( $file_handler, $create_table );

				// Write end of statement
				ai1wm_write( $file_handler, ";\n\n" );
			}

			$current_table_offset = 0;

			// Set query
			$query = sprintf( "SELECT * FROM `$table_name` %s", $this->get_table_query_clauses( $table_name ) );

			// Apply additional table prefix columns
			$columns = $this->get_table_prefix_columns( $table_name );

			// Get results
			$result = $this->query( $query );

			// Generate insert statements
			while ( $row = $this->fetch_assoc( $result ) ) {
				if ( $current_table_offset % Ai1wm_Database::QUERIES_PER_TRANSACTION === 0 ) {
					// Write start transaction
					ai1wm_write( $file_handler, "START TRANSACTION;\n" );
				}

				$items = array();
				foreach ( $row as $key => $value ) {
					// Replace table prefix columns
					if ( isset( $columns[ strtolower( $key ) ] ) ) {
						$value = $this->replace_table_prefixes( $value, 0 );
					}

					// Replace table values
					$items[] = is_null( $value ) ? 'NULL' : "'" . $this->replace_table_export_values( $this->escape( $value ) ) . "'";
				}

				// Set table values
				$table_values = implode( ',', $items );

				// Set insert statement
				$table_insert = "INSERT INTO `$new_table_name` VALUES ($table_values);\n";

				// Write insert statement
				ai1wm_write( $file_handler, $table_insert );

				$current_table_offset++;

				// Write end of transaction
				if ( $current_table_offset % Ai1wm_Database::QUERIES_PER_TRANSACTION === 0 ) {
					ai1wm_write( $file_handler, "COMMIT;\n" );
				}
			}

			// Write end of transaction
			if ( $current_table_offset % Ai1wm_Database::QUERIES_PER_TRANSACTION !== 0 ) {
				ai1wm_write( $file_handler, "COMMIT;\n" );
			}

			$current_table_index += 1;

			// Close result cursor
			$this->free_result( $result );

			// Time elapsed
			if ( $timeout ) {
				if ( ( microtime( true ) - $start ) > $timeout ) {
					$completed = false;
					break;
				}
			}
		}

		// Close file handler
		ai1wm_close( $file_handler );

		return $completed;
	}

	/**
	 * Import database from a file
	 *
	 * @param  string $file_name Name of file
	 * @return bool
	 */
	public function import( $file_name ) {
		// Set max allowed packet
		$max_allowed_packet = $this->get_max_allowed_packet();

		// Set file handler
		$file_handler = ai1wm_open( $file_name, 'r' );

		$passed = 0;
		$failed = 0;
		$query  = null;

		// Read database file line by line
		while ( ( $line = fgets( $file_handler ) ) !== false ) {
			$query .= $line;

			// End of query
			if ( preg_match( '/;\s*$/', $query ) ) {

				// Check max allowed packet
				if ( strlen( $query ) <= $max_allowed_packet ) {

					// Replace table prefixes
					$query = $this->replace_table_prefixes( $query );

					// Replace table collations
					$query = $this->replace_table_collations( $query );

					// Replace table values
					$query = $this->replace_table_import_values( $query );

					try {

						// Run SQL query
						$result = $this->query( $query );
						if ( $result === false ) {
							throw new Exception( $this->error(), $this->errno() );
						} else {
							$passed++;
						}

					} catch ( Exception $e ) {
						$failed++;
					}

				} else {
					$failed++;
				}

				$query = null;
			}
		}

		// Close file handler
		ai1wm_close( $file_handler );

		// Check failed queries
		if ( ( ( $failed / $passed ) * 100 ) > 2 ) {
			return false;
		}

		return true;
	}

	/**
	 * Flush database
	 *
	 * @return void
	 */
	public function flush() {
		foreach ( $this->get_tables() as $table_name ) {
			$this->query( "DROP TABLE IF EXISTS `$table_name`" );
		}
	}

	/**
	 * Get MySQL version
	 *
	 * @return string
	 */
	protected function get_version() {
		$version = null;

		$result = $this->query( "SHOW VARIABLES LIKE 'version'" );
		while ( $row = $this->fetch_row( $result ) ) {
			if ( isset( $row[1] ) ) {
				$version = $row[1];
				break;
			}
		}

		// Close result cursor
		$this->free_result( $result );

		return $version;
	}

	/**
	 * Get MySQL max allowed packet
	 *
	 * @return int
	 */
	protected function get_max_allowed_packet() {
		$max_allowed_packet = null;

		$result = $this->query( "SHOW VARIABLES LIKE 'max_allowed_packet'" );
		while ( $row = $this->fetch_row( $result ) ) {
			if ( isset( $row[1] ) ) {
				$max_allowed_packet = $row[1];
				break;
			}
		}

		// Close result cursor
		$this->free_result( $result );

		return $max_allowed_packet;
	}

	/**
	 * Get MySQL collation name
	 *
	 * @param  string $collation_name Collation name
	 * @return string
	 */
	protected function get_collation( $collation_name ) {
		$collation_result = null;

		$result = $this->query( "SHOW COLLATION LIKE '$collation_name'" );
		while ( $row = $this->fetch_row( $result ) ) {
			if ( isset( $row[0] ) ) {
				$collation_result = $row[0];
				break;
			}
		}

		// Close result cursor
		$this->free_result( $result );

		return $collation_result;
	}

	/**
	 * Replace table prefixes
	 *
	 * @param  string  $input    Table value
	 * @param  bool    $position Replace first occurrence at a specified position
	 * @return string
	 */
	protected function replace_table_prefixes( $input, $position = false ) {
		// Get table prefixes
		$search = $this->get_old_table_prefixes();
		$replace = $this->get_new_table_prefixes();

		// Replace first occurance at a specified position
		if ( $position !== false ) {
			for ( $i = 0; $i < count( $search ); $i++ ) {
				$current = stripos( $input, $search[$i] );
				if ( $current === $position ) {
					$input = substr_replace( $input, $replace[$i], $current, strlen( $search[$i] ) );
				}
			}

			return $input;
		}

		// Replace all occurrences
		return str_ireplace( $search, $replace, $input );
	}

	/**
	 * Replace table export values
	 *
	 * @param  string  $input Table value
	 * @return string
	 */
	protected function replace_table_export_values( $input ) {
		if ( $this->get_old_replace_values() ) {
			$this->number_of_replaces = 0;

			// Serialization format
			$array  = '(a:\d+:{.+?})';
			$string = '(s:\d+:\\\\?"(.+?)\\\\?";)';
			$object = '(O:\d+:\\\\?"(.+?)\\\\?":\d+:{.*?})';

			// Replace base64 encoded values (Visual Composer)
			if ( $this->get_visual_composer() ) {
				$input = preg_replace_callback( "/(?<=\[vc_raw_html\])(.+?)(?=\[\/vc_raw_html\])/S", array( $this, 'replace_base64_values_callback' ), $input );
			}

			// Replace serialized values
			$input = preg_replace_callback( "/(?<=\A)($array|$string|$object)(?=\z)/S", array( $this, 'replace_serialized_values_callback' ), $input );

			// Replace values
			if ( $this->number_of_replaces === 0 ) {
				$input = Ai1wm_Database_Utility::replace_values( $this->get_old_replace_values(), $this->get_new_replace_values(), $input );
			}
		}

		return $input;
	}

	/**
	 * Replace table import values
	 *
	 * @param  string  $input Table value
	 * @return string
	 */
	protected function replace_table_import_values( $input ) {
		if ( $this->get_old_replace_values() ) {
			$this->number_of_replaces = 0;

			// Serialization format
			$array  = '(a:\d+:{.+?})';
			$string = '(s:\d+:\\\\?"(.+?)\\\\?";)';
			$object = '(O:\d+:\\\\?"(.+?)\\\\?":\d+:{.*?})';

			// Replace base64 encoded values (Visual Composer)
			if ( $this->get_visual_composer() ) {
				$input = preg_replace_callback( "/(?<=\[vc_raw_html\])(.+?)(?=\[\/vc_raw_html\])/S", array( $this, 'replace_base64_values_callback' ), $input );
			}

			// Replace serialized values
			$input = preg_replace_callback( "/(?<=')($array|$string|$object)(?=')/S", array( $this, 'replace_serialized_values_callback' ), $input );

			// Replace values
			if ( $this->number_of_replaces === 0 ) {
				$input = Ai1wm_Database_Utility::replace_values( $this->get_old_replace_values(), $this->get_new_replace_values(), $input );
			}
		}

		return $input;
	}

	/**
	 * Replace base64 values (callback)
	 *
	 * @param  array  $matches List of matches
	 * @return string
	 */
	protected function replace_base64_values_callback( $matches ) {
		$this->number_of_replaces++;

		// Decode base64 characters
		$input = rawurldecode( base64_decode( strip_tags( $matches[1] ) ) );

		// Replace serialized values
		$input = Ai1wm_Database_Utility::replace_values( $this->get_old_replace_values(), $this->get_new_replace_values(), $input );

		// Encode base64 characters
		$input = base64_encode( rawurlencode( $input ) );

		return $input;
	}

	/**
	 * Replace serialized values (callback)
	 *
	 * @param  array  $matches List of matches
	 * @return string
	 */
	protected function replace_serialized_values_callback( $matches ) {
		$this->number_of_replaces++;

		// Unescape MySQL special characters
		$input = Ai1wm_Database_Utility::unescape_mysql( $matches[1] );

		// Replace serialized values
		$input = Ai1wm_Database_Utility::replace_serialized_values( $this->get_old_replace_values(), $this->get_new_replace_values(), $input );

		// Escape MySQL special characters
		$input = Ai1wm_Database_Utility::escape_mysql( $input );

		return $input;
	}

	/**
	 * Replace table collations
	 *
	 * @param  string $input SQL statement
	 * @return string
	 */
	protected function replace_table_collations( $input ) {
		static $search = array();
		static $replace = array();

		// Replace table collations
		if ( empty( $search ) || empty( $replace ) ) {
			if ( ! $this->wpdb->has_cap( 'utf8mb4_520' ) ) {
				if ( ! $this->wpdb->has_cap( 'utf8mb4' ) ) {
					$search  = array( 'utf8mb4_unicode_520_ci', 'utf8mb4' );
					$replace = array( 'utf8_unicode_ci', 'utf8' );
				} else {
					$search  = array( 'utf8mb4_unicode_520_ci' );
					$replace = array( 'utf8mb4_unicode_ci' );
				}
			}
		}

		return str_ireplace( $search, $replace, $input );
	}

	/**
	 * Replace table constraints
	 *
	 * @param  string $input SQL statement
	 * @return string
	 */
	protected function replace_table_constraints( $input ) {
		$pattern = array(
			'/\s+CONSTRAINT(.+)REFERENCES(.+),/i',
			'/,\s+CONSTRAINT(.+)REFERENCES(.+)/i',
		);

		return preg_replace( $pattern, '', $input );
	}

	/**
	 * Replace table options
	 *
	 * @param  string $input SQL statement
	 * @return string
	 */
	protected function replace_table_options( $input ) {
		// Set table replace options
		$search = array(
			'ENGINE=Aria',
			'TRANSACTIONAL=0',
			'TRANSACTIONAL=1',
			'PAGE_CHECKSUM=0',
			'PAGE_CHECKSUM=1',
			'TABLE_CHECKSUM=0',
			'TABLE_CHECKSUM=1',
			'ROW_FORMAT=PAGE',
			'ROW_FORMAT=FIXED',
			'ROW_FORMAT=DYNAMIC',

		);
		$replace = array(
			'ENGINE=MyISAM',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
		);

		return str_ireplace( $search, $replace, $input );
	}

	/**
	 * Returns header for dump file
	 *
	 * @return string
	 */
	protected function get_header() {
		// Some info about software, source and time
		$header = sprintf(
			"-- All In One WP Migration SQL Dump\n" .
			"-- https://servmask.com/\n" .
			"--\n" .
			"-- Host: %s\n" .
			"-- Database: %s\n" .
			"-- Class: %s\n" .
			"--\n",
			$this->wpdb->dbhost,
			$this->wpdb->dbname,
			get_class( $this )
		);

		return $header;
	}

	/**
	 * Run MySQL query
	 *
	 * @param  string   $input SQL query
	 * @return resource
	 */
	abstract public function query( $input );

	/**
	 * Escape string input for mysql query
	 *
	 * @param  string $input String to escape
	 * @return string
	 */
	abstract public function escape( $input );

	/**
	 * Return the error code for the most recent function call
	 *
	 * @return int
	 */
	abstract public function errno();

	/**
	 * Return a string description of the last error
	 *
	 * @return string
	 */
	abstract public function error();

	/**
	 * Return server version
	 *
	 * @return string
	 */
	abstract public function version();

	/**
	 * Return the result from MySQL query as associative array
	 *
	 * @param  resource $result MySQL resource
	 * @return array
	 */
	abstract public function fetch_assoc( $result );

	/**
	 * Return the result from MySQL query as row
	 *
	 * @param  resource $result MySQL resource
	 * @return array
	 */
	abstract public function fetch_row( $result );

	/**
	 * Free MySQL result memory
	 *
	 * @param  resource $result MySQL resource
	 * @return bool
	 */
	abstract public function free_result( $result );
}
