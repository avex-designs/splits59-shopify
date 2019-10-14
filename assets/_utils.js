// Get our main-header's height.
bbdev.getHeaderHeight = function () {

    if ($('html.no-touchevents').length) {
        var height = $(".main-header__banner").outerHeight( true );
        var navHeight = $(".main-header__desktop").outerHeight( true );

        var headerOffset = height + navHeight;


        console.log(headerOffset);
        return headerOffset;
    } else {
        var height = $(".main-header__banner").outerHeight( true );
        var navHeight = $(".main-header__mobile").outerHeight( true );

        var headerOffset = height + navHeight;


        console.log(headerOffset);
        return headerOffset;
    }


};


/* =========================================================================
    Browser Scrolled Detect
========================================================================= */

bbdev.scrollCheck = function () {
    if ($(window).scrollTop() > 0) {
        $('body').addClass('browser-scrolled');
    } else {
        $('body').removeClass('browser-scrolled');
    }

};

$(window).on('scroll', function() {
    bbdev.scrollCheck();
});

// Get our quick-nav's height.
bbdev.quickNavHeight = function () {
    return $(".quick-nav").outerHeight(true);
};



// Provide an offset from our fixed main-header.
bbdev.headerOffset = function () {

    var s = {
        $selector: $(".js-header-offset")
    };

    var bindUI = function () {

        $( window ).on( "resize", function ( e ) {
            setOffsetsForEach();
        });

    };

    var setOffsetsForEach = function(){

        var prop;

        $.each( s.$selector, function ( index, item ) {
            prop = $( item ).data("offset-prop") || "margin-top";
            setOffset( $( item ), prop );
        } );

    };

    /*
    @param {jQuery} $item - The element to apply the offset to.
    @param {CSS Propery} prop - The CSS property the offset will apply to.
    @param {number} offset - The offset value.
    */
    var setOffset = function($item, prop){
        $item.css( prop, bbdev.getHeaderHeight() );
    };

    var init = function () {
        bindUI();
        setOffsetsForEach();
    };

    init();

};

// FILTERS dropdown
bbdev.dropdownToggle = function () {

 if ($('html.no-touchevents').length) {

    $('.js-dropdown-hover').hover(
        function() {
            $(this).addClass('open');
        },
         function() {
            $(this).removeClass('open');
        });

 }

 if ($('html.touchevents').length) {

    $(document).on('click', '.js-dropdown-toggle', function() {

        var $dropdown = $(this).parent();

        $dropdown.toggleClass('open')
                .siblings().removeClass('open');

    });


 }
}


// DESKTOP NAV DROPDOWN
bbdev.desktopNavDropdown = function () {

 if ('ontouchstart' in window) {

  $('.desktop-navbar-nav-dropdown-toggle span').click(function(event) {

      event.preventDefault();

      var $this = $(this);

      var $dropdown = $(this).parents('.desktop-nav__item--has-dropdown');

      $dropdown.toggleClass('open').siblings().removeClass('open');

  });
} else {

  $('.desktop-navbar-nav-dropdown-toggle span').mouseenter(function(event) {

      var $this = $(this);

      var $dropdown = $(this).parents('.desktop-nav__item--has-dropdown');

      $dropdown.addClass('open').siblings().removeClass('open');

  });
}




$('.desktop-nav__item').mouseleave(function(event) {

    var $this = $(this);

    var $toElement = $(event.relatedTarget);

    if($toElement.is('.desktop-nav__item')){
        $this.addClass('mouse-to-sibling');
        $toElement.addClass('mouse-from-sibling');
    }
    else{

        $this.removeClass('open');

        $('.desktop-nav__item').removeClass('mouse-to-sibling mouse-from-sibling');

    }

});

};


// Provide an offset from our fixed quick-nav on the homepage for mobile.
bbdev.quickNavOffset = function () {

    var s = {
        $selector: $(".page-content"),
        $quickNav: $('.quick-nav')
    };

    var bindUI = function () {

        $(window).on( "resize", function ( e ) {
            setOffset();
        });

    };

    /*
    @param {jQuery} $item - The element to apply the offset to.
    @param {CSS Propery} prop - The CSS property the offset will apply to.
    @param {number} offset - The offset value.
    */
    var setOffset = function(){
        s.$selector.css( "margin-bottom", bbdev.quickNavHeight() );
    };

    var init = function () {

        if(s.$selector.length && s.$quickNav.length){
            bindUI();
            setOffset();
        }

    };

    init();

};



bbdev.imageSwap = function(){

    var $el = $("[data-image-hover]");

    if($('.no-touchevents').length){

        $el.on("mouseenter", function(){

            var $self    = $(this);
            var type     = $self.tagName;
            var altImage = $self.attr("data-image-hover") || "";

            if(altImage){

                if( type === "IMG" ){
                    $self.attr("src", altImage);
                } else {
                    $self.css("background-image", "url('" + altImage + "')");
                }

            }

        })
        .on("mouseleave", function(){

            var $self   = $(this);
            var type    = $self.tagName;
            var ogImage = $self.attr("data-image-og");

            if(type === "IMG"){
                $self.attr("src", ogImage);
            } else {
                $self.css("background-image", "url('" + ogImage + "')");
            }

        });

    }

};



/*
Focus on the search input when the search overlay is toggled.
*/
bbdev.focusSearchOnToggle = function(){

    var $target = $("html");
    var $input = $(".search-overlay").find("input[name='q']");
    var targetActiveClass = "search-overlay--toggled";

    $target.on(targetActiveClass, function(e, data){

        if(data.hasClass){

            setTimeout(function() {
                $input.focus();
            }, 100);

        } else {
            $input.blur();
        }

    });

};



bbdev.dontAllowMultipleDrawersOpen = function(){

    $("html").on("mini-cart--toggled", function(){
        $("html").removeClass("mobile-nav--toggled");
        $("html").removeClass("search-overlay--toggled");

    });

    $("html").on("mobile-nav--toggled", function(){
        $("html").removeClass("mini-cart--toggled");
        $("html").removeClass("search-overlay--toggled");
    });

    $("html").on("search-overlay--toggled", function(){
        $("html").removeClass("mini-cart--toggled");
        $("html").removeClass("mobile-nav--toggled");
    });

};



bbdev.markActiveSortOptions = function(){

    // NOTE: If more than 1 search param is in the locatio object, this will return unwanted results.
    var getSortQuery = function(){
        return location.search;
    };

    var markActiveOption = function(){

        var $activeOption = $(".filter__item[href='" + getSortQuery() + "']");

        if($activeOption.length){
            $activeOption.addClass("filter__item--active");
        }

    };

    markActiveOption();

};



/*
Close mobile collection filters on scroll, unless the user manually clicked to open the filters.
*/
bbdev.closeMobileFiltersOnScroll = function(){

    var $filters = $(".mobile-collection-filters");
    var toggled  = "mobile-collection-filters--toggled";
    var autoOpened = true;

    // Check if the filters element exists.
    if($filters.length){

        $(".collection").one("mobile-collection-filters--toggled", function(){
            autoOpened = false;
        });

        $(window).on("scroll", function(){

            // hide filters only if the filters were activated automatically.
            if(autoOpened){
                $("." + toggled).removeClass(toggled);
            }

        });

    }

};



bbdev.setPdpImgHeight = function(){

    // var $srcImg       = $(".product__card--image");
    // var $targetImg    = $(".product__col--full").find("img");
    // var srcImgPadding = 0;
    // var srcImgHeight  = $srcImg.find("img").outerHeight(true);
    //
    // var run = function(){
    //
    //     srcImgPadding = parseInt( $srcImg.css("padding-bottom") );
    //     // srcImgHeight  = $srcImg.find("img").outerHeight(true);
    //     srcImgHeightTall  = (srcImgHeight * 2) + srcImgPadding;
    //
    //     $targetImg.css("height", srcImgHeightTall);
    // };
    //
    // if($srcImg.length){
    //
    //     $(window).on("resize", function(){
    //         run();
    //     });
    //
    //     run();
    // }

};
