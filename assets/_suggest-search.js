bbdev.suggestSearch = function(){

    var s = {
        $input: $(".js-search-suggest-input"),
        $output: $(".js-search-suggest-output"),
        visible: "search-form__suggestion--visible",
        MIN_LEN: 1,
        MAX_LEN: 3, // suggestions will hide once chars have exceeded this value
        MAX_SUGGESTIONS: 3,
        KEY_UP_TIMEOUT: 150
    };

    var timeout;

    var hideSuggestions = function(){
        s.$output.removeClass(s.visible);
    };

    var showSuggestions = function(suggestions){

        $.each(suggestions, function(index, suggestion){
            $(suggestion).addClass(s.visible);
        });

    };

    // str should be formatted before being passed in as a parameter.
    var getSuggestions = function(str){

        var $suggestions = s.$output.filter("[data-value*='" + str + "']");
        var suggestions;

        if($suggestions.length){
            // NOTE: we are NOT returning a jquery array of elements.
            suggestions = $suggestions.splice(0, s.MAX_SUGGESTIONS);
            return suggestions;
        } else {
            return false;
        }

    };

    // Format fn for consistent data checking.
    var formatStr = function(str){
        return $.trim( str.toLowerCase() );
    };

    // Search for clicked item.
    s.$output.on("click", function(){
        var val = $(this).text();
        s.$input.val(val).trigger("keyup");
    });

    s.$input.on("keyup", function(e){

        var $self = $(this);

        clearTimeout(timeout);

        timeout = setTimeout(function() {

            // Store input value, formatted.
            var val = formatStr( $self.val() );

            // Check if min length is met and check if it doesnt exceed max length.
            if(val.length >= s.MIN_LEN && val.length <= s.MAX_LEN){

                // will return false or an array of element nodes.
                var suggestions = getSuggestions(val);

                if(suggestions){
                    showSuggestions(suggestions);
                }

            } else {
                hideSuggestions();
            }

        }, s.KEY_UP_TIMEOUT);

    });

};
