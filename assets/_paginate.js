bbdev.paginate = function() {

    var items    = '.js-paginate-items';
    var item     = '.js-paginate-item';
    var load     = '.js-paginate-load';
    var paginate = '.js-paginate-wrap';

    var refresh = function(){
        bbdev.initLazyLoad();
    };
    
    $(document).on("click", load, function(e){

        e.preventDefault();

        var $self = $(this);
        var href  = $self.attr("href");

        $.ajax({
            type: "GET",
            url: href,
            success: function (response) {

                var returnedItems = $(response).find(item);
                var returnedLoad  = $(response).find(load);

                // Check if any items are returned.
                if(returnedItems.length ) {

                    // Append new items to DOM.
                    $(items).append(returnedItems);

                    // Update load more URL to continue with pagination.
                    $(load).attr("href", returnedLoad.attr("href"));

                    // Refresh any plugins needed.
                    refresh();
                }

                // Check if there's more to load. Load more button only shows if there's additional pages, so this checks its presence in the DOM.
                if(!returnedLoad.length){
                    $(paginate).remove();
                }

            }
        }); 

    });

};