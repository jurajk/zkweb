jQuery(document).ready(function ($) {
  $(".gallery__item").magnificPopup({
    type: "image",
    tClose: "Zavrieť (Esc)",
    tLoading: "Načítava sa…",
    gallery: {
      enabled: true,
      tPrev: "Predchádzajúca (šípka doľava)",
      tNext: "Ďalšia (šípka doprava)",
      tCounter: "%curr% z %total%",
    },
    image: {
      tError: '<a href="%url%">Obrázok</a> sa nepodarilo načítať.',
    },
  });

  // Magnific Popup has no swipe support
  var touchX = null;
  var touchY = null;

  $(document)
    .on("touchstart", ".mfp-wrap", function (event) {
      var touches = event.originalEvent.touches;
      // Ignore pinches, and panning around a zoomed-in photo
      if (touches.length !== 1 || (window.visualViewport && visualViewport.scale > 1)) {
        touchX = null;
        return;
      }
      touchX = touches[0].clientX;
      touchY = touches[0].clientY;
    })
    .on("touchend", ".mfp-wrap", function (event) {
      if (touchX === null) {
        return;
      }
      var touch = event.originalEvent.changedTouches[0];
      var dx = touch.clientX - touchX;
      var dy = touch.clientY - touchY;
      touchX = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          $.magnificPopup.instance.next();
        } else {
          $.magnificPopup.instance.prev();
        }
      }
    });
});

// init Masonry
// var $grid = $('.gallery').masonry({
//   itemSelector: '.gallery__item',
//   // use element for option
//   columnWidth: '.grid-sizer',
//   percentPosition: true
// });
// // layout Masonry after each image loads
// $grid.imagesLoaded().progress( function() {
//   $grid.masonry('layout');
// });
