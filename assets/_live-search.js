bbdev.liveProductSearch = function(){

    var $searchOverlay = $(".search-overlay");
    var $in   = $searchOverlay.find("input[name='q']");
    var $form = $in.parents("form[action^='/search']");
    var $resultsTitle = $(".search-overlay__results-title");
    var $grid = $(".search-overlay__grid");
    var $msg = $(".live-search__msg");
    var timeout;

    var s = {
        MIN_LEN: 3,
        KEY_UP_TIMEOUT: 500,
        loading: "live-search--loading",
        loaded: "live-search--loaded",
        no_results: "live-search__msg--visible"
    };

    var cache = {};

    var refreshPlugins = function(){

        $("[data-original]").lazyload({
            container: $grid,
            effect : "fadeIn"
        });

    };

    var updateResultsTitle = function(text){
        $resultsTitle.text(text);
    };

    // Get which types to search by.
    var getSearchTypes = function(){
        var $typeInput = $form.find("input[name='type']");
        return encodeURIComponent( $typeInput.val() );
    };

    // Perform search.
    var search = function(term){

        if(typeof(term) === "string"){

            // Use cache if term was already searched.
            if(term in cache){

                console.log("Appending from cache.");

                appendResultsToDOM(cache[term].results);

                // Show count and term to the user.
                updateResultsTitle(cache[term].results.length + " result(s) for " + term);

            } else {

                console.log("Appending from AJAX.");

                toggleLoading(true);
                toggleLoaded(false);

                $.get("/search", {
                    type: getSearchTypes(),
                    q: term
                }).done(function(data){

                    var $products = $(data).filter(".page-content")
                    .find(".js-search-result");

                    var productsLen = $products.length;

                    if(productsLen){

                        // Add to cache.
                        cache[term] = {
                            results: $products
                        };

                        appendResultsToDOM($products);

                    } else {
                        // Clear results list.
                        appendResultsToDOM("");
                    }

                    // Show count and term to the user.
                    updateResultsTitle(productsLen + " result(s) for " + term);

                    toggleLoading(false);
                    toggleLoaded(true);

                });

            }

        }

    };

    // Toggle loading status of ajax.
    var toggleLoading = function(status){
        if(status){
            $searchOverlay.addClass(s.loading);
        } else {
            $searchOverlay.removeClass(s.loading);
        }
    };

    // Toggle loaded status of ajax.
    var toggleLoaded = function(status){
        if(status){
            $searchOverlay.addClass(s.loaded);
        } else {
            $searchOverlay.removeClass(s.loaded);
        }
    };

    var appendResultsToDOM = function(results){

        // Append to DOM.
        $grid.html(results);

        refreshPlugins();

        // Scroll back to top to see results from the start.
        // $grid.animate({
        //     scrollTop: 0
        // }, 250);

    };

    $form.on("submit", function(e){
        e.preventDefault();
    });

    $in.on("keyup", function(e){

        var $self = $(this);

        clearTimeout(timeout);

        timeout = setTimeout(function() {

            // Format input.
            var val = $.trim( $self.val().toLowerCase() );

            // Check if min length is met.
            if(val.length >= s.MIN_LEN){
                search(val);
            } else {

                // Clear results list.
                appendResultsToDOM("");

                if(val.length > 0){
                    updateResultsTitle("0 results for " + val);
                } else {
                    updateResultsTitle("");
                }

            }

        }, s.KEY_UP_TIMEOUT);

    });

};
