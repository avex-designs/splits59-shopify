bbdev.showSiteBannerPopup = function() {


if (!$.cookie('site_visited')){

      setTimeout(function(){
          $('html').addClass('show-top-subscr-popup');
      }, 4000);

    if ($('html').hasClass("no-touchevents")) {
            setTimeout(function () {
                $('.site-banner-popup').addClass("banner-popup--toggled");
            }, 3000);

    } else {

            setTimeout(function () {
                $('.site-banner-popup').addClass("banner-popup--toggled");
            }, 3000);

            // setTimeout(function () {
            //     $('.site-mini-banner-popup').addClass("mini-banner-popup--toggled");
            // }, 3000);
    }

        $.cookie('site_visited', 'true', {
                 expires: 1,
                 path: '/'
        });

}


    // var $popup = $(".site-banner-popup");
    // var popupToggled = "banner-popup--toggled";
    // var storageKey = "sitePopupShown";
    //
    // $(document).on("keyup", function (e) {
    //
    //     if ( e.which === 27 && shown() ) {
    //         hide();
    //     }
    //
    // });
    //
    // var hide = function () {
    //     $popup.removeClass(popupToggled);
    // };
    //
    // var show = function () {
    //     $popup.addClass(popupToggled);
    //     localStorage.setItem(storageKey, true);
    // };
    //
    // var shown = function () {
    //     return localStorage[storageKey];
    // };
    //
    // var shouldShow = function () {
    //     return "Storage" in window && $popup.length && !shown() && $popup.is(":visible");
    // };
    //
    // var run = function(){
    //     if ( shouldShow() ) {
    //         show();
    //     }
    // };
    //
    // // Check on resize also because we check for is :visible on the popup.
    // $(window).on("resize", function(){
    //     run();
    // });
    //
    // run();

};
