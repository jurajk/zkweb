jQuery(document).ready(function($) {
	var $header = $( '.js-site-header' );
	var $toggle = $( '.js-menutoggle' );

	$toggle.on( 'click', function() {
		var open = ! $header.hasClass( 'menuopen' );
		$header.toggleClass( 'menuopen', open );
		$toggle.attr( 'aria-expanded', open ? 'true' : 'false' );
	});
});