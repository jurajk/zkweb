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

	// The header stays on screen, so close the menu once a link is chosen,
	// and when the page outside the header is touched or clicked
	$( '.site-menu__href' ).on( 'click', function() {
		setMenuOpen( false );
	});

	$( document ).on( 'pointerdown', function( event ) {
		if ( $header.hasClass( 'menuopen' ) && ! $( event.target ).closest( $header ).length ) {
			setMenuOpen( false );
		}
	});

	$( document ).on( 'keydown', function( event ) {
		if ( event.key === 'Escape' && $header.hasClass( 'menuopen' ) ) {
			var focusInMenu = $.contains( $header[0], document.activeElement );
			setMenuOpen( false );
			if ( focusInMenu ) {
				$toggle.trigger( 'focus' );
			}
		}
	});
});