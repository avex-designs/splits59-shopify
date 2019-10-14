bbdev.aboutTemplate = function(){

    // Refers to the wrapper of the images that will be a carousel.
    var $carousel = $(".js-about-images-carousel");

    // Fixed column elements
    var $watcher  = $('.js-about-fixed-watch');
    var $stop     = $(".js-about-fixed-stop");
    var $fixedCol = $('.about__col--fixed');

    var slickSettings = {
        lazyLoad: 'ondemand',
        arrows: false,
        prevArrow: '<button type="button" class="slick-prev" title="Back"></button>',
        nextArrow: '<button type="button" class="slick-next" title="Next"></button>',
        speed: 250,
        fade: false,
        cssEase: 'ease',
        mobileFirst: true,
        dots: true,
        waitForAnimate: false,
        zIndex: 2
    };

    var getWatcherBottom = function(){
        return $watcher.outerHeight(true) + $watcher.offset().top;
    };

    var setWatcherHeight = function(){
        if($watcher.length){
            $watcher.css("height", $fixedCol.outerHeight(true));
        }
    };

    var getStopPos = function(){
        return $stop.offset().top;
    };

    var unFixCol = function(){

        var top = getStopPos();

        // Set top position in css.
        $fixedCol.css("top", top);

        $(".about").addClass("about-col-unfix");

    };

    var fixCol = function(){

        // Set top position in css.
        $fixedCol.css("top", "0px");

        $(".about").removeClass("about-col-unfix");

    };

    var isFixed = function(){
        return $(".about").hasClass("about-col-unfix");
    };

    var shouldStopFixed = function(){
        return getWatcherBottom() > getStopPos();
    };

    var monitorFixedCol = function(){

        if(matchMedia("(min-width: 900px)").matches && $watcher.length){

            if (shouldStopFixed()) {
                unFixCol();
            } else {
                fixCol();
            }

        }

    };

    var shouldBeCarousel = function(){
        return matchMedia("(max-width: 899px)").matches;
    };

    var makeCarousel = function(){
        $carousel.slick(slickSettings);
    };

    // Deconstructs slick carousel.
    var makeNormal = function(){
        $carousel.slick("unslick");
    };

    // Determine if $carousel is an actual slick carousel.
    var isCarousel = function(){
        return $carousel.hasClass("slick-slider");
    };

    var run = function(){

        if($carousel.length){

            if( shouldBeCarousel() ){

                // Make sure it's not a carousel already.
                if( !isCarousel() ){
                    makeCarousel();
                }

            } else {

                // Make sure it's a carousel already.
                if( isCarousel() ){
                    makeNormal();
                }

            }

        }

    };

    $(window).on("resize", function(){
        run();
        setWatcherHeight();
    })
    .on("scroll", function(){
        monitorFixedCol();
    });

    run();
    setWatcherHeight();

};
