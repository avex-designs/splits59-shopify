bbdev.pdpZoom = function(){

    var $trigger = $(".js-pdp-img-trigger");
    var $gallery = $(".zoom-gallery");
    var $thumb   = $(".js-pdp-img-thumb");
    var $feat    = $(".js-pdp-img-feat");

    $trigger.on("click", function(){

        var $self = $(this);
        var tagName = $self[0].tagName;
        var src;

        // Toggle gallery.
        $gallery.toggleClass("zoom-gallery--toggled");

        // If the trigger was an image, update the featured image src to reflect src of clicked image.
        if(tagName === "IMG"){
            src = $self.attr("src");
            $feat.attr("src", src);
        }

    });

    $thumb.on("click", function(){
        var src = $(this).attr("src");
        $feat.attr("src", src);
    });

    // Close gallery on esc key press.
    $(document).on("keyup", function(e){

        if(e.which === 27){
            $gallery.removeClass("zoom-gallery--toggled");
        }

    });

};
