(function ($) {
	// $(document).foundation();
})(jQuery);

jQuery(document).ready(function($) {

	/*
	* Initialize Foundation Sites plugins
	*/

	// $(document).foundation();

	/*
	* SVG 4 everybody
	*/

	// svg4everybody({
	//     polyfill: true // polyfill <use> elements for External Content
	// });

	/*
	* "Prihlás sa": the signup form (HubSpot) sets analytics cookies as soon as it opens,
	* so ask first unless Analytické is already accepted. See consent.js.
	*/

	var gate = document.getElementById('hubspot-gate');

	// left click (incl. keyboard) or middle click, i.e. anything that opens the link
	function opensLink(e) {
		return e.type === 'click' || e.button === 1;
	}

	function trackSignupClick() {
		if (window.zkGtagLoaded && ZK_CONVERSION_LABEL && CookieConsent.acceptedCategory('ads')) {
			gtag('event', 'conversion', { send_to: ZK_ADS_ID + '/' + ZK_CONVERSION_LABEL });
		}
	}

	$('.apply__cta').on('click auxclick', function (e) {
		if (!opensLink(e) || !gate || !gate.showModal) return;
		// without CookieConsent (cookieconsent.umd.js blocked or not loaded) the notice shows every time
		if (window.CookieConsent && CookieConsent.acceptedCategory('analytics')) {
			trackSignupClick();    // the link opens the form in a new tab, as before
			return;
		}
		e.preventDefault();
		this.focus();            // closing the notice returns focus here, also in Safari (it doesn't focus clicked links)
		gate.showModal();
	});

	$('.js-gate-accept').on('click auxclick', function (e) {   // the link itself opens the form
		if (!opensLink(e)) return;
		if (window.CookieConsent) {
			var accepted = CookieConsent.getUserPreferences().acceptedCategories;
			CookieConsent.acceptCategory(accepted.concat('analytics'));   // adds Analytické, keeps the rest as it was
			CookieConsent.hide();    // acceptCategory() saves the choice but doesn't close the banner
		}
		trackSignupClick();
		gate.close();
	});

	$('.js-gate-mail, .js-gate-close').on('click', function () {
		gate.close();
	});

});



