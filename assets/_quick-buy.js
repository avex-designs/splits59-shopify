bbdev.quickBuy = function(){

    var addToCart = function(variantID, quantity, $option){

        if(!variantID){

            console.error("No variantID!");

            return false;
        }

        if(typeof(quantity) === "undefined"){
            quantity = 1;
        }

        var properties = {};
        var timeout;

        CartJS.addItem(variantID, quantity, properties, {
            "success": function(data, textStatus, jqXHR) {
                $("html").addClass("mini-cart--toggled");

                // Auto close mini cart after timeout.
                timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    $("html").removeClass("mini-cart--toggled");
                }, 2000);

            },
            "error": function(jqXHR, textStatus, errorThrown) {

                var response = jqXHR;

                console.log(response);

                // 422 is a cart error, assume this error is that all avail products are in your cart already. Mark clicked option as sold out.
                if(response.responseJSON.status === 422 && $option){
                    $option.attr("data-available", "false");
                }

            }
        });

    };



    $(".js-quick-add-option").on("click", function(){
        $(this).parents('.quick-add.bundle-form').find('.options__label div:first-child').css( "color","black" );
        var btnText = $(this).data('product-btn-text');
        $(this).parent().find(".js-quick-add-btn").text(btnText);

        var selectedVarPrice = $(this).data('variant-price');
        var $price = '<span class="card__price">' + selectedVarPrice + '</span>';
        var $html  = $price;

        $(this).parents(".bundle-form").find(".js-product-price").html($html);

        var $self = $(this);
        $self.parent().find(".js-quick-add-option").removeClass('selected-value');
        $self.addClass('selected-value');

        // BIS

        var $addToCart = $(this).parent().find(".js-quick-add-btn");
        var is_available = $(this).data('available');
        var selectedId = $(this).data('variant-id');

        $('.js-bis-trigger').attr( "data-variant-id", selectedId );

        if (is_available) {
            $addToCart.show();
            $self.parent().find(".js-bis-trigger").css("display", "none");
        } else {
            $addToCart.hide();
            $self.parent().find(".js-bis-trigger").css("display", "block");
        }

    });


    $(".js-quick-add-btn").on("click", function(){

        var selectedVar = $(this).parent().find(".selected-value");
        var selectedVarId = selectedVar.attr("data-variant-id");

        if(!selectedVarId){
            $(this).parents('.quick-add.bundle-form').find('.options__label div:first-child').css( "color","red" );
        }

        var varProperties = {};

        addToCart(selectedVarId, 1, varProperties);
    });

    $(".mob-trigger").on('click', function(){

        $(this).parents(".mobile-bundle-form").siblings().removeClass('hidden');
        $(this).parents(".mobile-bundle-form").toggleClass('hidden');

    });



};
