<?php
$json = file_get_contents( 'php://input' );
$form = json_decode( $json, true );
$errors = false;

$form[ 'fields' ] = array_map( function( $field ) use ( $errors ) {
	$field[ 'value' ] = htmlentities( trim( $field[ 'value' ] ) );
	if ( $field[ 'required' ] && !$field[ 'value' ] ) {
		$field[ 'error' ] = true;
		$errors = true;
		return $field;
	}

	if ( $field[ 'type' ] === 'email' ) {
		if ( !filter_var( $field[ 'value' ], FILTER_VALIDATE_EMAIL ) ) {
			$field[ 'error' ] = true;
			$errors = true;
		}
	}

	return $field;
}, $form[ 'fields' ] );

$subject = current(
	array_filter( $form[ 'fields' ], function( $field ) {
		return $field[ 'type' ] === 'subject';
	})
);

if ( !$errors ) {
	$to = 'caitlyn@caitlyncardoza.com';
	$subject = $subject ? $subject[ 'value' ] : $form[ 'name' ];
	$head = 'Content-Type: text/html; charset=utf-8\r\n';
	$head .= 'From: caitlyncardoza.com <caitlyncardoza.com>\r\n';

	ob_start();
	include( 'email-template.php' );
	$message = ob_get_clean();
	mail( $to, $subject, $message, $head );
} else {
	header( 'Content-Type: application/json' );
	$form[ 'hasErrors' ] = true;

	echo json_encode( $form );
}

?>