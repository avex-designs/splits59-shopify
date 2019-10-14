bbdev.lookbook = function(){

    /*
    Some settings.
    */
    var s = {
        $index:        $(".lookbook-index"),
        $indexOpen:    $(".js-lookbook-index-open"),
        $indexClose:   $(".js-lookbook-index-close"),
        $slick:        $(".js-lookbook-slick-slider"),
        $goTo:         $('.js-lookbook-goto'),
        $product:      $(".js-lookbook-product"),
        $productHide:  $(".js-lookbook-product-hide"),
        $image:        $(".js-lookbook-image"),
        $productsWrap: $(".lookbook-products"),
        visibleProductsWrap: "lookbook-products--visible",
        visibleProduct:      "lookbook-products__product--visible",
        slickConfig: {
            lazyLoad: 'ondemand',
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev" title="Back"></button>',
            nextArrow: '<button type="button" class="slick-next" title="Next"></button>',
            speed: 500,
            fade: false,
            cssEase: 'ease',
            mobileFirst: true,
            dots: true,
            draggable: false,
            waitForAnimate: true,
            zIndex: 2,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        }
    };

    /*
    Event listeners.
    */
    var bindUI = function(){

        s.$goTo.on("click", function(){
            var index = $(this).data("index") || 0;
            toggleIndex("off");
            goToSlide(index);
        });

        s.$image.on("click", function(){

            var handle = $(this).data("product") || "";

            // Hide all products.
            hideProduct();

            // Show clicked product.
            showProduct(handle);

            // Show product overlay.
            toggleProductsWrap("on");

        });

        s.$productHide.on("click", function(){

            // Hide all products.
            hideProduct();

            // Hide products overlay.
            toggleProductsWrap("off");

        });

        s.$indexOpen.on("click", function(){
            toggleIndex("on");
        });

        s.$indexClose.on("click", function(){
            toggleIndex("off");
        });

        $(document).on("keyup", function(e){

            var ESC_KEY   = 27;
            var LEFT_KEY  = 37;
            var RIGHT_KEY = 39;

            if(e.which === LEFT_KEY){
                s.$slick.slick("slickPrev");
            }

            if(e.which === RIGHT_KEY){
                s.$slick.slick("slickNext");
            }

            // On esc key click, trigger a hide.
            if(e.which === ESC_KEY){
                s.$productHide.eq(0).trigger("click");
                s.$indexClose.eq(0).trigger("click");
            }

        });

        s.$productsWrap.on("click", function(e){

            // Make sure we're clicking the overlay and nothing else, if so, trigger a hide.
            if( $(e.target).hasClass(s.visibleProductsWrap) ){
                s.$productHide.eq(0).trigger("click");
            }

        });

        // Move tooltip, as long as the browser supports hover.
        if( matchMedia("(hover:hover)").matches ){

            s.$image.on("mousemove", function(e){
                var index = $(this).find(".lookbook-image-info").data("index");
                moveTooltip(e, index);
            });

        }

    };

    /*
    This function makes the toolip of an image follow the user's cursor.
    */
    var moveTooltip = function(e, index){

        var x, y, offset;

        // Get current tooltip.
        var $tooltip = $(".lookbook-image-info[data-index=" + index + "]");

        // Get current image.
        var $image = $tooltip.parent().find("img").eq(0);

        // Offset the tooltip from the cursor.
        offset = -15;

        if( matchMedia("(min-width: 750px)").matches && e.clientX > (window.innerWidth / 2) ){
            x = e.clientX - $image.outerWidth();
        } else {
            x = e.clientX;
        }

        // Tooltip positions follow the cursor.
        y = e.clientY - offset;
        x = x - offset;

        $tooltip.css({
            top: y,
            left: x
        });

    };

    /*
    Toggle class on products wrap.
    */
    var toggleProductsWrap = function(state){

        if(state === "on"){
            s.$productsWrap.addClass(s.visibleProductsWrap);
        } else if (state === "off"){
            s.$productsWrap.removeClass(s.visibleProductsWrap);
        }

    };

    /*
    Go to a slide in slick, specified by index, starting at 0.
    */
    var goToSlide = function(index){
        s.$slick.slick("slickGoTo", index);
    };

    /*
    Show a product's popup modal.
    */
    var showProduct = function(handle){
        s.$product.filter("[data-product='" + handle + "']")
        .addClass(s.visibleProduct);
    };

    /*
    Hide a product's popup modal.
    */
    var hideProduct = function(handle){

        // Default product is all products.
        var $product = s.$product;

        // If handle is provided, find the product with the matching handle.
        if(handle){
            $product = s.$product.filter("[data-product='" + handle + "']");
        }

        $product.removeClass(s.visibleProduct);

    };

    /*
    Toggles the index view of the lookbook.
    */
    var toggleIndex = function(state){

        if(state === "on"){
            s.$index.addClass("lookbook-index--toggled");
        } else if (state === "off"){
            s.$index.removeClass("lookbook-index--toggled");
        }

    };

    /*
    Init slick slider with above settings.
    */
    var initSlick = function(){
        s.$slick.slick(s.slickConfig);
    };

    var init = function(){
        bindUI();
        initSlick();
    };

    init();

};
