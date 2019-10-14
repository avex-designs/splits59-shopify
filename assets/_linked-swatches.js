bbdev.linkedSwatches = function(){

    var $linkedSwatch = $(".js-linked-product-swatch");

    var updateImages = function($image, image_zero, image_one){

        $image.each(function(index, img){

            var type = img.tagName;

            if(type === "IMG"){

                $(img)
                .attr("src", image_zero)
                .attr("data-image-og", image_zero);

            } else {

                $(img)
                .css("background-image", "url('" + image_zero + "')")
                .attr("data-image-og", image_zero);

            }

            if(image_one){
                $(img).attr("data-image-hover", image_one);
            } else {
                $(img).attr("data-image-hover", "");
            }

        });

    };

    /*
    Mark options active or inactive.
    */
    var checkSwatches = function($swatch){

        $swatch
        .siblings(".js-linked-product-swatch")
        .removeClass("swatch--active");

        $swatch.addClass("swatch--active");

    };

    var updateSelectedColor = function($colorLabel, color){
        $colorLabel.text(color);
    };

    var markOptionsAsAvailable = function($option){
        $option.removeAttr("data-available");
    };

    /*
    Update variant ids on color change. NOTE: We only update the ids, we dont check if the option value is different, we assume the linked product has the same size options.
    */
    var updateVariantIDs = function($swatchGroup, ids_arr){

        $swatchGroup
        .find(".js-quick-add-option")
        .each(function(index, swatch){
            $(swatch).attr("data-variant-id", ids_arr[index]);
        });

    };

    /*
    Update base product url to url of clicked linked product swatch.
    */
    var updateBaseProductURL = function($href, href){
        $href.attr("href", href);
    };

    $linkedSwatch.on("click", function(){

        var $self  = $(this);
        var $base  = $self.parents(".js-linked-product-base");
        var $image = $base.find("[data-image-hover]");
        var $colorLabel = $self.parents(".js-linked-product-base").find(".js-linked-product-selected-color");
        var $swatchGroup = $self.parents(".js-linked-product-base").find(".js-quick-add-options");
        var $href = $self.parents(".js-linked-product-base").find(".js-linked-product-url");
        var $quickAddOptions = $swatchGroup.find(".js-quick-add-option");
        var $price = $base.find(".product-card__price");

        var color      = $self.attr("title");
        var image_zero = $self.attr("data-product-image-zero");
        var image_one  = $self.attr("data-product-image-one") || "";
        var href       = $self.attr("data-href");
        var ids        = $self.attr("data-variant-ids");
        var ids_arr    = ids.split(",");
        var price      = $self.attr("data-product-price");

        var $isSale = $self.parents(".js-linked-product-base").find(".product-card__sale");
        var saleMessage = $self.attr("data-sale-message") || "&nbsp;";

        if ($isSale.length) {
            $isSale.html(saleMessage);
        }


        if($href.length){
            updateBaseProductURL($href, href);
        } else {
            console.warn("Did not update href attr for variant.");
        }

        if($swatchGroup.length){
            updateVariantIDs($swatchGroup, ids_arr);
        } else {
            console.warn("Did not update variant ids.");
        }

        if($image.length){
            updateImages($image, image_zero, image_one);
        } else {
            console.warn("Did not update images.");
        }


        if($price.length){
            $price.html(price);
        } else {
            console.warn("Did not update price.");
        }


        checkSwatches($self);

        if($colorLabel.length){
            updateSelectedColor($colorLabel, color);
        } else {
            console.warn("Did not update selected color.");
        }

        // Mark options as available when we change colors.
        markOptionsAsAvailable($quickAddOptions);

        var $productCard = $self.parents('.product-card');
        $productCard.find('.object:not(div)').remove();
        var vUrl = $self.data('alt-text');
        if (vUrl.match(/^https?:\/\//i)) {
            var vElement = $productCard.find('div.object')[0];
            bbdev.replaceVideoElement(vUrl, vElement, {
                width: '100%',
                height: '100%',
            });
        }
    });

};
