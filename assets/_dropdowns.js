bbdev.toggleDropdown = function () {

    var s = {
        details:        ".dropdown",
        detailsSummary: ".dropdown__summary",
        content:        ".dropdown__content",
        item:           ".dropdown__item",
        dropdownActive: "dropdown--open"
    };

    s.$details = $(s.details);
    s.$detailsSummary = $(s.detailsSummary);

    var bindUI = function () {

        $(document).on("click", s.detailsSummary, function (e) {

            e.preventDefault();

            var $self = $(this), data = {};

            data.$details = $self.parents(s.details);
            data.$content = data.$details.find(s.content);
            data.expanded = data.$content.attr("aria-expanded");

            toggle(data);

        });

        $(s.item).on("click", function(){

            var $self    = $(this);
            var $details = $self.parents(s.details);
            var $content = $details.find(s.content);
            var $summary = $details.find(s.detailsSummary);

            var updates  = $details.data("updates");
            var $updates = $("[name='" + updates + "']");
            var text     = $self.data("text");

            if(text){
                updateSummaryText($summary, text);
            }

            if($updates.length){
                updateAssociatedInput($updates, text);
            }

            toggle({
                $details: $details,
                $content: $content,
                expanded: $content.attr("aria-expanded")
            });

        });

    };

    var toggle = function (data) {

        // data.expanded should be compared loosely.
        if (!data.expanded) {
            data.expanded = "false";
        }

        if (!data.method) {
            data.method = "toggle";
        }

        // Hide all dropdowns that have the same parent as the current dropdown being toggled, so only 1 dropdown is open at once.
        if( isInParent(data) ){
            hide( $(s.details) );
        }

        if (data.method === "toggle") {

            if (data.expanded == "true") {
                hide(data.$details);
            } else {
                show(data.$details);
            }

        } else if (data.method === "show") {
            show(data.$details);
        } else if (data.method === "hide") {
            hide(data.$details);
        }

    };

    // Determine if a dropdown is shared by the same parent.
    var isInParent = function(data){
        return data.$details.parent().find(s.details).length > 0 ? true : false;
    };

    var updateSummaryText = function ($summary, text) {
        $summary.attr("data-selected", text);
    };

    var updateAssociatedInput = function ($input, val) {
        $input.val(val).trigger("change");
    };

    var hide = function ($details) {

        $details
        .removeClass(s.dropdownActive)
        .find(s.content)
        .attr("aria-expanded", "false");

    };

    var show = function ($details) {
        
        $details
        .addClass(s.dropdownActive)
        .find(s.content)
        .attr("aria-expanded", "true");

    };

    var init = function () {
        bindUI();
    };

    init();

};