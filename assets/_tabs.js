bbdev.toggleTabs = function () {

    var s = {
        $summary: $(".tab__summary"),
        $content: $(".tab__content"),
        slideSpeed: 250
    };

    var bindUI = function () {

        s.$summary.on("click", function (e) {

            var $self = $(this);

            var data = {
                controls: $self.attr("aria-controls")
            };

            // If clicked tab is already active, hide it, otherwise proceed to toggle.
            if ( $self.attr('aria-selected') == "true") {
                hideTab(data.controls);
            } else {
                toggleTab( data.controls );
            }

        });

    };

    var toggleTab = function (controls) {

        if (tabIsHidden(controls) == "true") {
            hideTab(); // Hide all
            showTab(controls); // Show specific
        }

    };

    var tabIsHidden = function (controls) {
        return s.$content.filter("[id='" + controls + "']").attr("aria-hidden");
    };

    var hideTab = function (controls) {

        if (controls) {

            s.$summary.filter("[aria-controls='" + controls + "']")
                .attr('aria-selected', "false");

            s.$content.filter("[id='" + controls + "']")
                .attr("aria-hidden", "true")
                .slideUp(s.slideSpeed);

        } else {

            s.$summary.attr('aria-selected', "false");

            s.$content
                .attr("aria-hidden", "true")
                .slideUp(s.slideSpeed);

        }

    };

    var showTab = function (controls) {

        if (controls) {

            s.$summary.filter("[aria-controls='" + controls + "']")
                .attr('aria-selected', "true");

            s.$content.filter("[id='" + controls + "']")
                .attr("aria-hidden", "false")
                .slideDown(s.slideSpeed);

        } else {

            s.$summary.attr('aria-selected', "true");

            s.$content
                .attr("aria-hidden", "false")
                .slideDown(s.slideSpeed);

        }

    };

    var init = function () {
        bindUI();
    };

    init();

};
