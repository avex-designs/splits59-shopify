/* Vendor code */
// @codekit-prepend "_slick-slider.js"
// @codekit-prepend "_lazyload.js"
// @codekit-prepend "_instafeed.js"
// @codekit-prepend "klaviyo_subscribe.js"
// @codekit-prepend "_jquery-ui.js"

/* Init global app object */
// @codekit-prepend "_app-init.js"

/* Vendor related code, not vendor code itself */
// @codekit-prepend "_vendor.js"

/* Utils */
// @codekit-prepend "_element-toggle-class.js"
// @codekit-prepend "_utils.js"
// @codekit-prepend "_site-popup.js"
// @codekit-prepend "_tabs.js"
// @codekit-prepend "_dropdowns.js"
// @codekit-prepend "_smooth-scroll.js"
// @codekit-prepend "_pdp-zoom.js"
// @codekit-prepend "_jquery.cookie.js"


/* Other stuff */
// @codekit-prepend "_live-search.js"
// @codekit-prepend "_suggest-search.js"
// @codekit-prepend "_paginate.js"
// @codekit-prepend "_linked-swatches.js"
// @codekit-prepend "_quick-buy.js"
// @codekit-prepend "_about.js"
// @codekit-prepend "_lookbook.js"
// @codekit-prepend "_accounts.js"
// @codekit-prepend "_newsletter-form.js"
// @codekit-prepend "_video-player.js"
// @codekit-prepend "_size-filter.js"
// @codekit-prepend "_sections.js"


// Our main function to init our other functions.
bbdev.main = function () {

    "use-strict";

    var init = function(){
        bbdev.topBannerSlickSlider();
        bbdev.elementToggleClass();
        bbdev.headerOffset();
        bbdev.scrollCheck();
        bbdev.desktopNavDropdown();
        bbdev.dropdownToggle();
        bbdev.quickNavOffset();
        bbdev.initSlickSlider();
        bbdev.initLazyLoad();
        bbdev.initInstafeed();
        bbdev.toggleTabs();
        bbdev.toggleDropdown();
        bbdev.paginate();
        bbdev.markActiveSortOptions();
        bbdev.closeMobileFiltersOnScroll();
        bbdev.imageSwap();
        bbdev.quickBuy();
        bbdev.linkedSwatches();
        bbdev.liveProductSearch();
        bbdev.suggestSearch();
        bbdev.focusSearchOnToggle();
        bbdev.aboutTemplate();
        bbdev.pdpZoom();
        bbdev.setPdpImgHeight();
        bbdev.dontAllowMultipleDrawersOpen();
        bbdev.lookbook();
        bbdev.accountForgotPWUtils();
        bbdev.handleNewsletterForm();
        bbdev.initSizeFilter();
        bbdev.initHomepageVideos();
        bbdev.initProductPageVideos();
        bbdev.initSections();


        $("html").addClass("dom-ready");

    };

    init();

};

bbdev.main();
