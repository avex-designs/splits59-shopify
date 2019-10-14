/*
This function inits lazy load.
*/
bbdev.initLazyLoad = function () {

    var s = {
        $selector: $("[data-original]"),
        config: {
            effect: "fadeIn"
        }
    };

    if (s.$selector.length) {
        s.$selector.lazyload(s.config);
    }

};



/*
This function inits our slick slider.
*/
bbdev.initSlickSlider = function () {

    var s = {
        selector: ".js-slick-slider",
        $selector: $(".js-slick-slider"),
        config: {
            lazyLoad: 'ondemand',
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev" title="Back"></button>',
            nextArrow: '<button type="button" class="slick-next" title="Next"></button>',
            speed: 250,
            fade: false,
            cssEase: 'ease',
            mobileFirst: true,
            dots: false,
            waitForAnimate: false,
            zIndex: 2,
            responsive: [
                {
                 breakpoint: 600,
                 settings: {
                  dots: true,
                 }
               }
             ]
        }
    };

    if (s.$selector.length) {
        // Basic slick init.
        s.$selector.slick(s.config);
    }


    var showBottom = $('*[data-slider-alt="Bottom"]');
    var showTop = $('*[data-slider-alt="Top"]');

    var bottomSlider = $('.slick-slide').find("[data-alt-tag='bottom-slide']").parent().attr('data-slick-index');
    var topSlider = $('.slick-slide').find("[data-alt-tag='top-slide']").parent().attr('data-slick-index');

    showTop.on("click", function(){
           s.$selector.slick('slickGoTo', topSlider);
    });

    showBottom.on("click", function(){
           s.$selector.slick('slickGoTo', bottomSlider);
    });


};


/*
Top banner messages slider
*/
bbdev.topBannerSlickSlider = function () {

    var s = {
        selector: ".js-top-banner-container",
        $selector: $(".js-top-banner-container"),
        config: {
            lazyLoad: 'ondemand',
            arrows: false,
            speed: 500,
            fade: true,
            cssEase: 'ease',
            mobileFirst: true,
            dots: false,
            waitForAnimate: false,
            zIndex: 2,
            autoplay: true,
            autoplaySpeed: 5000
        }
    };

    if (s.$selector.length) {
        // Basic slick init.
        s.$selector.slick(s.config);
    }

};


bbdev.initInstafeed = function(){

    var $instafeed = $("#instafeed");

    var config = {
        get: "user",
        accessToken: "409656684.1677ed0.bc8be34003f1439e9626b8125192b780",
        userId: 409656684,
        clientId: "56adf3f62132412bac77eba52073e83d",
        resolution: "standard_resolution",
        template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
    };

    if($instafeed.length){

        // Run instafeed
        var feed = new Instafeed(config);

        feed.run();

    }

};
