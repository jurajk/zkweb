jQuery(document).ready(function($) {
	var $header = $( '.js-site-header' );
	var $toggle = $( '.js-menutoggle' );

	function setMenuOpen( open ) {
		$header.toggleClass( 'menuopen', open );
		$toggle.attr( 'aria-expanded', open ? 'true' : 'false' );
	}

	$toggle.on( 'click', function() {
		setMenuOpen( ! $header.hasClass( 'menuopen' ) );
	});

	// The header stays on screen, so close the menu once a link is chosen
	$( '.site-menu__href' ).on( 'click', function() {
		setMenuOpen( false );
	});
});