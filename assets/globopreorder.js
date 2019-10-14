    var GPOApp = GPOApp || {};

    GPOApp.appUrl = '//app.shopifydevelopers.net/pre-order/';


    var loadScript = function(url, callback, errcallback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState){// If the browser is Internet Explorer.
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { // For any other browser.
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    GPOApp.init = function($){
        $(document).ready(function(){

            var installed = false;
            $("script").each(function() {
                 if ($(this).text().indexOf("globopreorder_init.js?") != -1 && $(this).text().indexOf("asyncLoad") != -1 && $(this).text().indexOf("initSchema") == -1) {
                     installed = true;
                 }
             });


            if (typeof GPOParams !== 'undefined' && installed){

                $('head').append('<link rel="stylesheet" href="'+ GPOApp.appUrl + 'shopassets/css/app.css" type="text/css" />');

                /* Quick view */

                if( $('.product-script-item').length > 0 ){
                    $('.product-script-item').each(function(){


                        if( $(this).parent().find('form [name="id"]').length ){

                            var form = $(this).parent().find('form');
                            var list_variant_id = $(this).parent().find('form [name="id"]').val();
                            var list_product_id = $(this).attr('id');
                            var outofstock = false;

                            var preorderText = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', list_product_id, 'variants', list_variant_id, 'button_text', GPOParams.button_title || '');
                            var po_item_label = GPOParams.line_property_name || "";

                            form.find('.add-to-cart-btn').attr('data-add-text', form.find('.add-to-cart-btn').val().trim()).attr('data-pre-text', preorderText);
                            form.find('.product__add-to-cart-button').attr('data-add-text', form.find('.product__add-to-cart-button').text().trim()).attr('data-pre-text', preorderText);
                            form.find('input[type=submit]').attr('data-add-text', form.find('input[type=submit]').val().trim()).attr('data-pre-text', preorderText);
                            form.find('button[type=submit]').attr('data-add-text', form.find('button[type=submit]').text().trim()).attr('data-pre-text', preorderText);

                            $.each(GPOCollectionParams[list_product_id]['variants'], function(abcindex, abcvariant){
                                if(abcvariant.id == list_variant_id && abcvariant.inventory_quantity <= 0){
                                    outofstock = true;
                                }
                            });


                            if(GPOApp.isPreOrderVariant(list_product_id, list_variant_id) && outofstock){

                                if(po_item_label.length > 0 && form.find('.properties_is_preorder').length == 0)
                                  form.append('<input type="hidden" class="properties_is_preorder" name="properties[_is_preorder]" value="'+po_item_label+'" />');

                                form.find('.add-to-cart-btn').val(preorderText);
                                form.find('.product__add-to-cart-button').text(preorderText);
                                form.find('input[type=submit]').val(preorderText);
                                form.find('button[type=submit]').text(preorderText);
                            }

                          form.on('change', ".single-option-selector, .swatch-panda input[type=radio], .swatch-element input[type=radio], [name=id] ,select[id|='product-select-"+pid+"-option'], select[id|='product-select-option'], select[id|='productSelect-product'], input[id|='ProductSelect-product'], select[id|='ProductSelect-option'], input[id|='ProductSelect-option'], select[id|='product-variants-option'], select[id|='sca-qv-product-selected-option'], select[id|='product-variants-"+ pid +"-option'], select[id|='variant-listbox-option'], select[id|='product-selectors-option'], select[id|='variant-listbox-option'], select[id|='product-select-"+pid+"product-option'], select[id|='id-option'], select[id|='SingleOptionSelector'], select[id|='product-select-"+pid+"']", function(){

                            var list_variant_id = form.find('[name="id"]').val();

                            var outofstock = false;
                            $.each(GPOCollectionParams[list_product_id]['variants'], function(abcindex, abcvariant){
                              if(abcvariant.id == list_variant_id && abcvariant.inventory_quantity <= 0){
                                outofstock = true;
                              }
                            });

                            if(GPOApp.isPreOrderVariant(list_product_id, list_variant_id) && outofstock){

                              var preorderText = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', list_product_id, 'variants', list_variant_id, 'button_text', GPOParams.button_title || '');

                              if(po_item_label.length > 0 && form.find('.properties_is_preorder').length == 0)
                                form.append('<input type="hidden" class="properties_is_preorder" name="properties[_is_preorder]" value="'+po_item_label+'" />');

                              form.find('.add-to-cart-btn').val(preorderText);
                              form.find('.product__add-to-cart-button').text(preorderText);
                              form.find('input[type=submit]').val(preorderText);
                              form.find('button[type=submit]').text(preorderText);

                          }else{

                              form.find('.add-to-cart-btn').val( form.find('.add-to-cart-btn').attr('data-add-text') );
                              form.find('.product__add-to-cart-button').text( form.find('.product__add-to-cart-button').attr('data-add-text') );
                              form.find('input[type=submit]').val( form.find('input[type=submit]').attr('data-add-text') );
                              form.find('button[type=submit]').text(form.find('button[type=submit]').attr('data-add-text'));

                              form.find('.properties_is_preorder').remove();
                          }
                          });

                        }
                    });
                }


                if( GPOParams.preorder_collection_enabled == 1 ){



                    if( typeof GPOParams.quickview_selector != 'undefined' && GPOParams.quickview_selector.length > 0 && GPOParams.quickview_button_selector.length > 0 ){

                        $(document).ready(function() {

                            $('.product-script-item').parent().addClass('gpo-product-item');
                            $( GPOParams.quickview_button_selector ).on('click', function(){

                                var product_id = $(this).closest('.gpo-product-item').find('.product-script-item').attr('id');

                                if(product_id){
                                    gpoProduct.getProduct( product_id, function( data ) {
                                        if(data.product !== undefined ){
                                            var interval_qv = setInterval(function(){
                                                if( $(GPOParams.quickview_selector).length ){
                                                    gpoProduct.quickView(data.product);
                                                    clearInterval(interval_qv);
                                                }
                                            }, 500);
                                        }
                                    });
                                }else{
                                    console.error('Not Define Product Handle: You haven\'t added attribute data-product-id for Quickview Button');
                                }
                            });
                        });
                    }else{
                        console.error('Not Define ["Quick view" button selector], [Quick view variant selector]');
                    }
                }

                /* End Quick view */

                /* Product Page Pre Order */
                if(GPOApp.getPageType() == 'product' && typeof(GPOProduct) !== 'undefined'){

                    if( GPOApp.isPreOrderProduct(GPOProduct.product.id) ){


                        if( typeof GPOParams.addtocart_selector == 'undefined' || $(GPOParams.addtocart_selector).length == 0 )
                            GPOParams.addtocart_selector = "form[action*='cart'] [name=\"add\"], form[action*='checkout'] [name=\"add\"]";
                        if($(GPOParams.addtocart_selector).length == 0)
                            GPOParams.addtocart_selector = "form[action*='cart'] [type=\"submit\"], form[action*='checkout'] [type=\"submit\"]";
                        if($(GPOParams.addtocart_selector).length == 0)
                            GPOParams.addtocart_selector = "form[action*='cart'] [type=\"button\"], form[action*='checkout'] [type=\"button\"]";

                        console.log(GPOParams.addtocart_selector);

                        GPOApp.updateVariant(GPOProduct.selected_variant, GPOProduct.product);

                        var pid = GPOProduct.id;

                        $(document).on('change', ".single-option-selector, .swatch-panda input[type=radio], .swatch-element input[type=radio], [name=id] ,select[id|='product-select-"+pid+"-option'], select[id|='product-select-option'], select[id|='productSelect-product'], input[id|='ProductSelect-product'], select[id|='ProductSelect-option'], input[id|='ProductSelect-option'], select[id|='product-variants-option'], select[id|='sca-qv-product-selected-option'], select[id|='product-variants-"+ pid +"-option'], select[id|='variant-listbox-option'], select[id|='product-selectors-option'], select[id|='variant-listbox-option'], select[id|='product-select-"+pid+"product-option'], select[id|='id-option'], select[id|='SingleOptionSelector'], select[id|='product-select-"+pid+"']", function(){
                            GPOApp.updateVariant(0, GPOProduct.product);
                        });
                    }
                /* End Product Page Pre Order */

                /* Cart Page Pre Order */
                }else if(GPOApp.getPageType() == 'cart'){
                    $(document).ready(function(){
                        /* Truncate + Add Style for Preorder Label */
                        var po_item_label = GPOParams.line_property_name || "";
                        var line_property_class = GPOParams.line_property_class || "";
                        var line_property_styles = GPOParams.line_property_styles || "";

                        if(po_item_label.length){
                            var metafileds = GPOApp.findElementByText('_is_preorder');
                            $(metafileds).each(function(){
                                if( $(this).attr('id') != 'GPO_script' ){
                                    $(this).html( $(this).html().replace('_is_preorder:', "").replace("_is_preorder", "").replace(po_item_label, '<span class="'+line_property_class+'" style="'+line_property_styles+'">'+po_item_label+'</span>') );
                                }
                            });
                        }
                    });


                    /* Trigger Cart Update */
                    $("form[action*='cart'] [type='submit'], form[action*='checkout'] [type='submit']").click(function(){
                        $("form[action*='cart'] [type='submit'], form[action*='checkout'] [type='submit']").attr('clicked', false);
                        $(this).attr('clicked', true);
                    });
                    $("form[action*='cart'], form[action*='checkout']").submit(function(event){

                        var update_or_checkout = 'update';
                        update_or_checkout = $(this).find("[type='submit'][clicked=true]").val().toLowerCase();

                        var confirm_message = "";
                        var PreOrderItems = [];
                        var po_properties = {};
                        var po_item_label = GPOParams.line_property_name || "";
                        if(po_item_label.length > 0){
                            po_properties["_is_preorder"] = po_item_label;
                        }

                        var data = $('[name*=updates]').serializeArray();

                        $(data).each(function(index, input){
                            if( input.value != GPOCart.items[index].quantity && GPOApp.isPreOrderProduct(GPOCart.items[index].product_id) && GPOApp.isPreOrderVariant(GPOCart.items[index].product_id, GPOCart.items[index].variant_id) ){
                                var qtyToAdd = input.value;
                                var qtyAvailable = GPOCart.items[index].variant.inventory_quantity;
                                var po_limit = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', GPOCart.items[index].product_id, 'variants', GPOCart.items[index].variant_id, 'limit', 0);
                                var variantTitle = GPOCart.items[index].variant.name;

                                if( po_limit > 0 && (po_limit + qtyAvailable - qtyToAdd) < 0){
                                    qtyToAdd = po_limit + qtyAvailable;
                                    $('[name*=updates]').eq(index).val(qtyToAdd);
                                    var stock_limited_message = GPOParams.preorder_stock_limited_message;
                                    if(stock_limited_message !== undefined && stock_limited_message.length){
                                        stock_limited_message = stock_limited_message.replace(':stock',qtyToAdd);
                                        confirm_message += variantTitle+': '+stock_limited_message+"\r\n";
                                    }
                                }else if(qtyAvailable > 0 && qtyToAdd > qtyAvailable){
                                    var preorder_confirm_message = GPOParams.preorder_confirm_message;
                                    if(preorder_confirm_message !== undefined && preorder_confirm_message.length){
                                        preorder_confirm_message = preorder_confirm_message.replace(':stock',qtyAvailable);
                                        confirm_message += variantTitle+': '+preorder_confirm_message+"\r\n";
                                    }
                                }

                                if(qtyToAdd > qtyAvailable){
                                    PreOrderItems.push({id: GPOCart.items[index].id, variant_id: GPOCart.items[index].variant_id, qty: qtyToAdd, is_preorder: true});
                                }else{
                                    PreOrderItems.push({id: GPOCart.items[index].id, variant_id: GPOCart.items[index].variant_id, qty: qtyToAdd, is_preorder: false});
                                }
                            }
                        });

                        if(PreOrderItems.length > 0){
                            event.preventDefault();
                            if(confirm_message.length == 0 || (confirm_message.length && confirm(confirm_message))){
                                for (var i = 0; i < PreOrderItems.length; i++){
                                    if(PreOrderItems[i]['is_preorder'] != GPOCart.items[i]['is_preorder'] ){

                                        var add_json = {};
                                        add_json['quantity'] = PreOrderItems[i]['qty'];
                                        add_json['id'] = PreOrderItems[i]['variant_id'];
                                        if(PreOrderItems[i]['is_preorder'])
                                            add_json['properties'] = po_properties;

                                        var updates_json = {};
                                        updates_json[PreOrderItems[i]['id']] = 0;

                                        $.ajax({
                                            type:    "POST",
                                            url:     '/cart/update.js',
                                            data:    { updates: updates_json },
                                            dataType: 'json',
                                            success: function(){
                                                $.ajax({
                                                    type:    "POST",
                                                    url:     '/cart/add.js',
                                                    data:    add_json,
                                                    dataType: 'json',
                                                    success: function(){
                                                        if(update_or_checkout == "update")
                                                            location.reload();
                                                        else
                                                            window.location.href = "/checkout";
                                                    },
                                                    error: function(jqXHR, textStatus, errorThrown) {
                                                        jsonValue = jQuery.parseJSON(jqXHR.responseText);
                                                        alert(jsonValue.description);
                                                    }
                                                });
                                            },
                                            error: function(jqXHR, textStatus, errorThrown) {
                                                jsonValue = jQuery.parseJSON( jqXHR.responseText );
                                                alert(jsonValue.description);
                                            }
                                        });
                                    }else{
                                        var updates_json = {};
                                        updates_json[PreOrderItems[i]['id']] = PreOrderItems[i]['qty'];
                                        $.ajax({
                                            type:    "POST",
                                            url:     '/cart/update.js',
                                            data:    {updates: updates_json},
                                            dataType: 'json',
                                            success: function(){
                                                if(update_or_checkout == "update")
                                                    location.reload();
                                                else
                                                    window.location.href = "/checkout";
                                            },
                                            error: function(jqXHR, textStatus, errorThrown) {
                                                jsonValue = jQuery.parseJSON( jqXHR.responseText );
                                                if(jsonValue.description)
                                                    alert(jsonValue.description);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    });
                }
                /* End Cart Page Pre Order */
            }
        });

    }

    GPOApp.addProductToCart = function(product, variantId, quantity, callback){

        $.each(product.variants, function(i, variant){
            if(variant.id == variantId){

                var isPreOrderItem = false;
                var po_limit = parseInt(GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'limit', 0));

                var variant_inventory_quantity = parseInt(variant.inventory_quantity);

                if( variant.inventory_policy == 'continue' || quantity > variant_inventory_quantity ){
                    isPreOrderItem = true;
                }

                if( po_limit > 0 && (po_limit + variant_inventory_quantity - quantity) < 0){

                    quantity = po_limit + variant_inventory_quantity;

                    var stock_limited_message = GPOParams.preorder_stock_limited_message;
                    if(stock_limited_message !== undefined && stock_limited_message.length){
                        stock_limited_message = stock_limited_message.replace(':stock',quantity);
                        var answer = confirm(stock_limited_message);
                        if(answer == false){
                            return false;
                        }
                    }
                }else if(variant_inventory_quantity > 0 && quantity > variant_inventory_quantity){

                    var preorder_confirm_message = GPOParams.preorder_confirm_message;

                    if(preorder_confirm_message !== undefined && preorder_confirm_message.length){
                        preorder_confirm_message = preorder_confirm_message.replace(':stock', variant_inventory_quantity);
                        var answer = confirm(preorder_confirm_message);
                        if(answer == false){
                            return false;
                        }
                    }
                }

                var po_properties = {};
                var po_item_label = GPOParams.line_property_name || "";
                if(po_item_label.length > 0 && isPreOrderItem == true){
                    po_properties["_is_preorder"] = po_item_label;
                }

                if(quantity > 0){
                    $.ajax({
                        type: 'POST',
                        url: '/cart/add.js',
                        cache: false,
                        async: false,
                        dataType: 'json',
                        data: {id:variant.id, quantity: quantity, properties: po_properties},
                        error: function (xhr, ajaxOptions, thrownError) {
                            jsonValue = jQuery.parseJSON( xhr.responseText );
                            alert(jsonValue.description);
                        }
                    }).done(function(){
                        callback();
                    });
                }
            }
        });
    }



    GPOApp.findElementByText = function(text){
        var jSpot = $("*:contains("+text+"):last"); //.filter(function(){ return $(this).children().length === 0 ;});
            return jSpot;
   }

    GPOApp.isPreOrderProduct = function(product_id){
        if(GPOApp.checkProductSetting(GPOParams, 'products', product_id, 'status'))
            if(GPOParams.products[product_id].status == 1)
                return true

        return false
    }

    GPOApp.checkVariantSetting = function(obj , products, product_id, variants, variant_id, key) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }

    GPOApp.checkProductSetting = function(obj , products, product_id, key) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }

    GPOApp.getVariantOrProductOrDefault = function(obj , products, product_id, variants, variant_id, key, default_value){
        if( GPOApp.checkVariantSetting(obj, products, product_id, variants, variant_id, key) ){
            return obj[products][product_id][variants][variant_id][key];
        }else if( GPOApp.checkProductSetting(obj, products, product_id, key) ){
            return obj[products][product_id][key];
        }else{
            return default_value;
        }
    }

    GPOApp.isPreOrderVariant = function(product_id, variant_id){

        var variant_status = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product_id, 'variants', variant_id, 'status', false);

        if(variant_status == false || variant_status == 0 || variant_status == '0')
             return false;

        var date = new Date();
        var startDate = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product_id, 'variants', variant_id, 'started_at', false);

        if(startDate)
            if(date.getTime() < startDate) return false;

        var endDate = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product_id, 'variants', variant_id, 'finished_at', false);

        if(endDate)
            if(date.getTime() > endDate) return false;

        return true;
    }

    GPOApp.updateVariant = function(vid, product){
        console.log('updateVariant');
        vid = vid || 0;
        try{
            vid = vid ? vid : GPOApp.getCurrentVariantId(product.id);
            $.each(product.variants, function(i, variant){
                if(vid == variant.id){
                    GPOApp.updateButton(variant, product);
                }
            }) ;
        }catch (e){
            GPOApp.showStandardButton();
        }
    };

    GPOApp.getVariantUiSelects = function(pid){
        return $("select[id|='product-select-"+pid+"-option'], select[id|='product-select-option'], select[id|='productSelect-option'], select[id|='ProductSelect-option'], input[id|='ProductSelect-option'], select[id|='product-variants-option'], select[id|='sca-qv-product-selected-option'], select[id|='product-variants-"+ pid +"-option'], select[id|='variant-listbox-option'], select[id|='product-selectors-option'], select[id|='variant-listbox-option'], select[id|='product-select-"+pid+"product-option'], select[id|='id-option'], select[id|='SingleOptionSelector'], select[id|='product-select-"+pid+"']");
    }

    GPOApp.getCurrentVariantId = function(pid){
        /*
        var options = [];
        app.getVariantUiSelects().each(function(){
            options.push($(this).val());
        });
        */
        return $('[name=id]').val();
    };


    GPOApp.updateButton = function(variant, product){
        console.log('updateButton');
        $('#GPO-countdown, #GPO-available-text, #pre-order, #gpo-na-message').hide();
        $('.GPO_tooltip').remove();
        if( variant.inventory_quantity <= 0 || variant.inventory_management == null){
            if( GPOApp.isPreOrderProduct(product.id) && GPOApp.isPreOrderVariant(product.id, variant.id)){
                var po_limit = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'limit', 0)
                if(po_limit == 0 || (po_limit != 0 && (parseInt(variant.inventory_quantity) * -1) < po_limit)){
                    console.log('showPreOrderButton');
                    this.showPreOrderButton(variant, product);
                }else{
                    console.log('showNAMessage1');
                    this.showNAMessage(variant);
                }
            }else{
                console.log('showNAMessage2');
                this.showNAMessage(variant);
            }
        }else{
            console.log('showStandardButton');
            GPOApp.showStandardButton();
        }
    };

    GPOApp.showCountdown = function(variant){

        if( GPOApp.checkProductSetting(GPOParams, 'products', GPOProduct.product.id, 'show_timer') )
            var show_timer = GPOParams.products[GPOProduct.product.id].show_timer;
        else
            var show_timer = false;

        var now = new Date();
        var endDate = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', GPOProduct.product.id, 'variants', variant.id, 'finished_at', false);

        if(show_timer && endDate){

            console.log('showCountdown:'+variant.id);

            var options = {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };

            $( GPOParams.addtocart_selector ).first().css('display','none');
            $('#gpo-na-message').hide();


            var timetoend = endDate - now.getTime();

            if(timetoend > 0){
                if(!$('#GPO-countdown').length){
                    if( $(GPOParams.addtocart_selector).first().parent().is('form') )
                        $('<div id="GPO-countdown"></div>').insertAfter( $("#pre-order").first() );
                    else
                        $('<div id="GPO-countdown"></div>').insertAfter( $("#pre-order").first().parent() );
                }


                var show_available = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', GPOProduct.product.id, 'variants', variant.id, 'available_auto', false);
                var available_at = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', GPOProduct.product.id, 'variants', variant.id, 'available_at', false);
                var available_on_message = GPOParams.preorder_avaiable_message || '';

                if(show_available && available_at && available_on_message.length){
                    var displayDate = new Date(available_at);
                    if( $('#GPO-available-text').length )
                        $('#GPO-available-text').text(available_on_message+' '+displayDate.toLocaleString('en-us', options)).show();
                    else
                        $('<p id="GPO-available-text">'+available_on_message+' '+displayDate.toLocaleString('en-us', options)+'</p>').insertAfter('#GPO-countdown');
                }








                loadScript(GPOApp.appUrl + 'shopassets/js/flipclock.min.js?' + Math.random(), function(){
                    var clock;
        			clock = $('#GPO-countdown').FlipClock(timetoend / 1000, {
        		        clockFace: 'DailyCounter',
                        countdown: true,
                        callbacks: {
        		        	stop: function() {
        		        		location.reload();
        		        	}
        		        }
        		    });
                });

                $('#GPO-countdown').show();
            }
        }

    };

    GPOApp.showPreOrderButton = function(variant, product){

        $('.GPO_tooltip').remove();
        $('#gpo-na-message, #GPO-countdown, #GPO-available-text').hide();

        var preorderText = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'button_text', GPOParams.button_title || '');
        var tooltipText  = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'button_description', GPOParams.button_description || '');
        var tooltipPos   = GPOParams.button_description_position || 'top';
        var tooltipMod   = GPOParams.button_description_mode || 'tooltip';


        if( $('#pre-order').length == 0 ){
            var GPO_button_class = GPOParams.button_class || "";
            var GPO_button_styles = GPOParams.button_styles || "";

            if($( GPOParams.addtocart_selector ).length > 0)
                $( GPOParams.addtocart_selector ).first().clone().insertAfter( $( GPOParams.addtocart_selector ).first() ).removeClass('add_to_cart add product__add-to-cart bold_hidden').attr('id', 'pre-order').addClass(GPO_button_class).attr('style', GPO_button_styles);
            else
                $('<input type="button" value="'+preorderText+'" id="pre-order" style="'+GPO_button_styles+'">').appendTo("form[action*='cart'], form[action*='checkout']");

        }

        if( $('#pre-order').is('button') ){
            $('#pre-order').text(preorderText);
        }else{
            $('#pre-order').val(preorderText);
        }


        $( GPOParams.addtocart_selector ).addClass('gpo-hidden');

        $('#pre-order').first().show().prop('type', 'button').prop("disabled", false).removeClass('disabled gpo-hidden');

        $('#pre-order').off('click').unbind('click').click(function(){

            var data = $(this).closest("form[action*='cart'], form[action*='checkout']").serializeArray();

            var qtyToAdd = 1;
            var variantId = 0;
            console.log(data);
            $(data).each(function(index, input){



                if(input.name == 'quantity')
                    qtyToAdd = input.value;
                if(input.name == 'id')
                    variantId = input.value;
            });

            GPOApp.addProductToCart(GPOProduct.product, variantId, qtyToAdd, function(){ window.location.href = "/cart"; });

            return false;
        });

        if(tooltipText.length > 0){

            if( tooltipMod == 'tooltip_fixed' ){


                if(tooltipPos == "bottom"){
                    $('<div class="GPO_tooltip tooltip_fixed">'+tooltipText+'</div>').insertAfter('#pre-order').fadeIn();
                }else{
                    $('<div class="GPO_tooltip tooltip_fixed">'+tooltipText+'</div>').insertBefore('#pre-order').fadeIn();
                }

                /*
                setInterval(function(){
                    var po_top     = $('#pre-order').offset().top;
                    var po_width   = $('#pre-order').outerWidth();
                    var po_left    = $('#pre-order').offset().left;
                    var po_height  = $('#pre-order').outerHeight();
                    var html_top   = parseInt( $('html').css('padding-top') );


                    if(tooltipPos == "left"){
                        var style='left:'+po_left+'px; top:'+(po_top+(po_height/2)-html_top)+'px';
                        var tooltip_class = "tooltip_left";

                    }else if(tooltipPos == "bottom"){
                        var style='left:'+(po_left+(po_width/2))+'px; top:'+(po_top+po_height-html_top)+'px';
                        var tooltip_class = "tooltip_bottom";

                    }else if(tooltipPos == "right"){
                        var style='left:'+(po_left+po_width)+'px; top:'+(po_top+(po_height/2)-html_top)+'px';
                        var tooltip_class = "tooltip_right";
                    }else{
                        var style='left:'+(po_left+(po_width/2))+'px; top:'+(po_top-html_top)+'px';
                        var tooltip_class = "tooltip_top";
                    }
                    $('.GPO_tooltip').attr('style', style);

                },1000);
                */

            }else{
                $('#pre-order').unbind('hover').hover(
                    function(){
                        var po_top     = $('#pre-order').offset().top;
                        var po_width   = $('#pre-order').outerWidth();
                        var po_left    = $('#pre-order').offset().left;
                        var po_height  = $('#pre-order').outerHeight();
                        var html_top   = parseInt( $('html').css('padding-top') );


                        if(tooltipPos == "left"){
                            var style='style="left:'+po_left+'px; top:'+(po_top+(po_height/2)-html_top)+'px"';
                            var tooltip_class = "tooltip_left";

                        }else if(tooltipPos == "bottom"){
                            var style='style="left:'+(po_left+(po_width/2))+'px; top:'+(po_top+po_height-html_top)+'px"';
                            var tooltip_class = "tooltip_bottom";

                        }else if(tooltipPos == "right"){
                            var style='style="left:'+(po_left+po_width)+'px; top:'+(po_top+(po_height/2)-html_top)+'px"';
                            var tooltip_class = "tooltip_right";
                        }else{
                            var style='style="left:'+(po_left+(po_width/2))+'px; top:'+(po_top-html_top)+'px"';
                            var tooltip_class = "tooltip_top";
                        }

                        $('<div class="GPO_tooltip '+tooltip_class+'" '+style+'>'+tooltipText+'</div>').appendTo('body').fadeIn();
                    },
                    function(){
                        $('.GPO_tooltip').fadeOut(300, function(){ $('.GPO_tooltip').remove() });
                });
            }
        }
        this.showCountdown(variant);
    };

    GPOApp.showStandardButton = function(){
        $('#pre-order, #GPO-countdown, #gpo-na-message').hide();
        $('.GPO_tooltip').remove();
        $( GPOParams.addtocart_selector ).removeClass('gpo-hidden').show();
    };

    GPOApp.showNAMessage = function(variant){
        $('.GPO_tooltip').remove();
        $('#pre-order, #GPO-countdown').hide();
        $( GPOParams.addtocart_selector ).addClass('gpo-hidden');

        var message = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', GPOProduct.product.id, 'variants', variant.id, 'not_available_message', GPOParams.not_available_message);

        if(message !== undefined && message.length){
            if($('#gpo-na-message').length > 0){
                $('#gpo-na-message').html(message);
                $('#gpo-na-message').removeClass('gpo-hidden').show();
            }else{
                $('<span id="gpo-na-message">'+message+'</span>').insertAfter( $(GPOParams.addtocart_selector).first() );
            }
        }
    };

    GPOApp.getPageType = function(){
        var url = window.location.toString();
        if(url.match(/\/products\//) !== null || url.match(/\/products_preview/) !== null){
            return 'product';
        }else if(url.match(/\/cart/) !== null){
            return 'cart';
        }else if(url.match(/\/collections\//) !== null){
            return 'collection';
        }else{
            return '';
        }
    };

    window.gpoProduct = {};//public api

    gpoProduct.getProduct = function(product_id, callback){
        if(Object.keys(GPOCollectionParams).length){
            if(GPOCollectionParams.hasOwnProperty(product_id)){
                return callback({product: GPOCollectionParams[product_id]});
            }
        }else{
            console.error('Not Define: Quickview Product Data');
        }
    }

    gpoProduct.quickView = function(product){

        console.log('Quickview: isPreOrderProduct: '+product.id+':'+GPOApp.isPreOrderProduct(product.id));

        if( GPOApp.isPreOrderProduct(product.id) ){

            if( typeof GPOParams.quickview_addtocart_selector == 'undefined' || $(GPOParams.quickview_addtocart_selector).length == 0 ){
                GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form[action*='cart'] [name=\"add\"], " + GPOParams.quickview_selector + " form[action*='checkout'] [name=\"add\"]";

                if($(GPOParams.quickview_addtocart_selector).length == 0)
                    GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form[action*='cart'] [type=\"submit\"], " + GPOParams.quickview_selector + " form[action*='checkout'] [type=\"submit\"]";
                if($(GPOParams.quickview_addtocart_selector).length == 0)
                    GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form[action*='cart'] [type=\"button\"], " + GPOParams.quickview_selector + " form[action*='checkout'] [type=\"button\"]";
            }else{
                GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " " + GPOParams.quickview_addtocart_selector.replace(GPOParams.quickview_selector, "");
            }

            try{
                vid = $( GPOParams.quickview_selector + ' [name="id"]').val();



                $.each(product.variants, function(i, variant){

                    console.log(variant.id+'='+vid);

                    if(variant.id == vid){
                        if( variant.inventory_quantity <= 0 || variant.inventory_management == null || variant.inventory_management == ''){

                            console.log(GPOApp.isPreOrderVariant(product.id, variant.id));

                            if( GPOApp.isPreOrderVariant(product.id, variant.id)){
                                var po_limit = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'limit', 0)

                                if(po_limit == 0 || (po_limit != 0 && (parseInt(variant.inventory_quantity) * -1) < po_limit)){
                                    console.log('showQickviewPreOrderButton');
                                    gpoProduct.showQickviewPreOrderButton(variant, product);
                                }else{
                                    console.log('showQickviewNAMessageFirst');
                                    gpoProduct.showQickviewNAMessage(variant, product);
                                }
                            }else{
                                console.log('showQickviewNAMessageSecond');
                                gpoProduct.showQickviewNAMessage(variant, product);
                            }
                        }else{
                            gpoProduct.showQickviewStandardButton();
                            console.log('showQickviewStandardButton');
                        }
                    }
                });

                $(document).on('change', GPOParams.quickview_selector + ' input, ' + GPOParams.quickview_selector + ' select', function(){

                    vid = $(GPOParams.quickview_selector + ' [name="id"]').val();
                    $.each(product.variants, function(i, variant){
                        if(variant.id == vid){

                            if( variant.inventory_quantity <= 0 || variant.inventory_management == null || variant.inventory_management == ''){
                                if( GPOApp.isPreOrderVariant(product.id, variant.id)){
                                    var po_limit = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'limit', 0)

                                    if(po_limit == 0 || (po_limit != 0 && (parseInt(variant.inventory_quantity) * -1) < po_limit)){
                                        console.log('showQickviewPreOrderButton');
                                        gpoProduct.showQickviewPreOrderButton(variant, product);
                                    }else{
                                        console.log('showQickviewNAMessage1');
                                        gpoProduct.showQickviewNAMessage(variant, product);
                                    }
                                }else{
                                    console.log('showQickviewNAMessage2');
                                    gpoProduct.showQickviewNAMessage(variant, product);
                                }
                            }else{
                                gpoProduct.showQickviewStandardButton();
                                console.log('showQickviewStandardButton');
                            }
                        }
                    });
                });

            }catch (e){
                gpoProduct.showQickviewStandardButton();
            }
        }
    }

    gpoProduct.showQickviewStandardButton = function(){
        $('#quick-pre-order, #GPO-quick-countdown, #gpo-quick-na-message, #GPO-quick-available-text').addClass('gpo-hidden');
        $('.GPO_tooltip').remove();
        $( GPOParams.quickview_addtocart_selector ).removeClass('gpo-hidden');
    }

    gpoProduct.showQickviewNAMessage = function(variant, product){
        $('.GPO_tooltip').remove();
        $('#quick-pre-order, #GPO-quick-countdown, #GPO-quick-available-text').addClass('gpo-hidden');
        $( GPOParams.quickview_addtocart_selector ).addClass('gpo-hidden');

        var message = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'not_available_message', GPOParams.not_available_message);

        if(message !== undefined && message.length){
            if($('#gpo-quick-na-message').length > 0){
                $('#gpo-quick-na-message').html(message);
                $('#gpo-quick-na-message').removeClass('gpo-hidden');
            }else{
                $('<span id="gpo-quick-na-message">'+message+'</span>').insertAfter( $( GPOParams.quickview_addtocart_selector ).first() );
            }
        }
    };

    gpoProduct.showQickviewPreOrderButton = function(variant, product){

        if( typeof GPOParams.quickview_addtocart_selector == 'undefined' || $(GPOParams.quickview_addtocart_selector).length == 0 ){
            GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form[action*='cart'] [name=\"add\"], " + GPOParams.quickview_selector + " form[action*='checkout'] [name=\"add\"]";

            if($(GPOParams.quickview_addtocart_selector).length == 0)
                GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form[action*='cart'] [type=\"submit\"], " + GPOParams.quickview_selector + " form[action*='checkout'] [type=\"submit\"]";
            if($(GPOParams.quickview_addtocart_selector).length == 0)
                GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form[action*='cart'] [type=\"button\"], " + GPOParams.quickview_selector + " form[action*='checkout'] [type=\"button\"]";
            if($(GPOParams.quickview_addtocart_selector).length == 0)
                GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " form [type=\"submit\"]";

        }else{
            GPOParams.quickview_addtocart_selector = GPOParams.quickview_selector + " " + GPOParams.quickview_addtocart_selector.replace(GPOParams.quickview_selector, "");
        }


        $( GPOParams.quickview_addtocart_selector ).addClass('gpo-hidden');

        $('.GPO_tooltip').remove();
        $('#gpo-quick-na-message, #GPO-quick-countdown, #GPO-quick-available-text').addClass('gpo-hidden');

        var preorderText = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'button_text', GPOParams.button_title || '');
        var tooltipText  = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'button_description', GPOParams.button_description || '');
        var tooltipPos   = GPOParams.button_description_position || 'top';
        var tooltipMod   = GPOParams.button_description_mode || 'tooltip';

        if( $('#quick-pre-order').length > 0 ){
            $('#quick-pre-order').remove();
        }

        var GPO_button_class = GPOParams.button_class || "";
        var GPO_button_styles = GPOParams.button_styles || "";
        $( GPOParams.quickview_addtocart_selector ).first().clone().insertAfter( $( GPOParams.quickview_addtocart_selector ).first() ).attr('id', 'quick-pre-order').text(preorderText).val(preorderText).addClass(GPO_button_class).attr('style', GPO_button_styles).removeClass('sca-qv-cartbtn');

        if( $('#quick-pre-order').is('button') ){
            $('#quick-pre-order').text(preorderText);
        }else{
            $('#quick-pre-order').val(preorderText);
        }


        $('#quick-pre-order').first().removeClass('gpo-hidden').prop('type', 'submit').prop("disabled", false).removeClass('disabled');

        $('#quick-pre-order').off('click').unbind('click').click(function(){

            var data = $(this).closest("form[action*='cart'], form[action*='checkout']").serializeArray();

            var qtyToAdd = 1;
            var variantId = 0;

            $(data).each(function(index, input){
                if(input.name == 'quantity')
                    qtyToAdd = input.value;
                if(input.name == 'id')
                    variantId = input.value;
            });

            GPOApp.addProductToCart(product, variantId, qtyToAdd, function(){ window.location.href = "/cart"; });

            return false;
        });

        if(tooltipText.length > 0){

            if( tooltipMod == 'tooltip_fixed' ){

                setTimeout(function(){
                    var po_top     = $('#quick-pre-order').offset().top;
                    var po_width   = $('#quick-pre-order').outerWidth();
                    var po_left    = $('#quick-pre-order').offset().left;
                    var po_height  = $('#quick-pre-order').outerHeight();
                    var html_top   = parseInt( $('html').css('padding-top') );

                    if(tooltipPos == "left"){
                        var style='style="left:'+po_left+'px; top:'+(po_top+(po_height/2)-html_top)+'px"';
                        var tooltip_class = "tooltip_left";

                    }else if(tooltipPos == "bottom"){
                        var style='style="left:'+(po_left+(po_width/2))+'px; top:'+(po_top+po_height-html_top)+'px"';
                        var tooltip_class = "tooltip_bottom";

                    }else if(tooltipPos == "right"){
                        var style='style="left:'+(po_left+po_width)+'px; top:'+(po_top+(po_height/2)-html_top)+'px"';
                        var tooltip_class = "tooltip_right";
                    }else{
                        var style='style="left:'+(po_left+(po_width/2))+'px; top:'+(po_top-html_top)+'px"';
                        var tooltip_class = "tooltip_top";
                    }

                    $('<div class="GPO_tooltip tooltip_fixed '+tooltip_class+'" '+style+'>'+tooltipText+'</div>').appendTo('body').fadeIn();
                },500);

            }else{
                $('#quick-pre-order').mouseenter(function(){

                        var po_top     = $('#quick-pre-order').offset().top;
                        var po_width   = $('#quick-pre-order').outerWidth();
                        var po_left    = $('#quick-pre-order').offset().left;
                        var po_height  = $('#quick-pre-order').outerHeight();
                        var html_top   = parseInt( $('html').css('padding-top') );

                        if(tooltipPos == "left"){
                            var style='style="left:'+po_left+'px; top:'+(po_top+(po_height/2)-html_top)+'px"';
                            var tooltip_class = "tooltip_left";

                        }else if(tooltipPos == "bottom"){
                            var style='style="left:'+(po_left+(po_width/2))+'px; top:'+(po_top+po_height-html_top)+'px"';
                            var tooltip_class = "tooltip_bottom";

                        }else if(tooltipPos == "right"){
                            var style='style="left:'+(po_left+po_width)+'px; top:'+(po_top+(po_height/2)-html_top)+'px"';
                            var tooltip_class = "tooltip_right";
                        }else{
                            var style='style="left:'+(po_left+(po_width/2))+'px; top:'+(po_top-html_top)+'px"';
                            var tooltip_class = "tooltip_top";
                        }

                        $('<div class="GPO_tooltip '+tooltip_class+'" '+style+'>'+tooltipText+'</div>').appendTo('body').fadeIn();
                }).mouseleave(function(){
                    $('.GPO_tooltip').fadeOut(300, function(){ $('.GPO_tooltip').remove() });
                });
            }
        }

        gpoProduct.showQuickViewCountdown(variant, product);
    };

    gpoProduct.showQuickViewCountdown = function(variant, product){
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        if( GPOApp.checkProductSetting(GPOParams, 'products', product.id, 'show_timer') )
            var show_timer = GPOParams.products[product.id].show_timer;
        else
            var show_timer = false;

        if(show_timer){

            $( GPOParams.quickview_addtocart_selector ).first().css('display','none');
            $('#gpo-quick-na-message').hide();

            var now = new Date();
            var endDate = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'finished_at', false);

            var timetoend = endDate - now.getTime();

            if(timetoend > 0){

                console.log('showQuickViewCountdown');

                if(!$('#GPO-quick-countdown').length){
                    if( $( GPOParams.quickview_addtocart_selector ).first().parent().is('form') )
                        $('<div id="GPO-quick-countdown"></div>').insertAfter($( GPOParams.quickview_addtocart_selector ).first());
                    else
                        $('<div id="GPO-quick-countdown"></div>').insertAfter($( GPOParams.quickview_addtocart_selector ).first().parent());
                }


                var show_available = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'available_auto', false);
                var available_at = GPOApp.getVariantOrProductOrDefault(GPOParams, 'products', product.id, 'variants', variant.id, 'available_at', false);
                var available_on_message = GPOParams.preorder_avaiable_message || '';
                if(show_available && available_at && available_on_message.length){
                    var displayDate = new Date(available_at);
                    if( $('#GPO-quick-available-text').length )
                        $('#GPO-quick-available-text').text(available_on_message+' '+displayDate.toLocaleString('en-us', options)).removeClass('gpo-hidden').show();
                    else
                        $('<p id="GPO-quick-available-text">'+available_on_message+' '+displayDate.toLocaleString('en-us', options)+'</p>').insertAfter('#GPO-quick-countdown');
                }

                loadScript(GPOApp.appUrl + 'shopassets/js/flipclock.min.js?' + Math.random(), function(){
                    var clock;
        			clock = $('#GPO-quick-countdown').FlipClock(timetoend / 1000, {
        		        clockFace: 'DailyCounter',
                        countdown: true,
                        callbacks: {
        		        	stop: function() {
        		        		location.reload();
        		        	}
        		        }
        		    });
                });

                $('#GPO-quick-countdown').removeClass('gpo-hidden').show();
            }
        }
    }

    try{
        if ( typeof jQuery === 'undefined' || (jQuery.fn.jquery.split(".")[0] < 2 && jQuery.fn.jquery.split(".")[1] < 7)) {
            var doNoConflict = true;
            if (typeof jQuery === 'undefined') {doNoConflict = false;}
            loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', function(){
                if (doNoConflict) {
                    jQuery17 = jQuery.noConflict(true);
                } else {
                    jQuery17 = jQuery;
                }
                GPOApp.init(jQuery17);
            });
        } else {
            GPOApp.init(jQuery);
        }
    }
    catch (e){ console.log('Pre-Order Pro by Globo exception: ' + e)}
