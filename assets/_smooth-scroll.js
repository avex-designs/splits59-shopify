// Smooth scroll to a point on the page.
bbdev.smoothScroll = function () {

    var s = {
        selector: "a[href^='#']:not([href='#'])"
    };

    var bindUI = function () {

        $(document).on("click", s.selector, function (e) {

            e.preventDefault();

            var href = $(this).attr("href"),
                $to = $(href),
                point = $to.offset().top;

            scroll(point);

        });

    };

    var scroll = function (to, speed, $animate) {

        if (typeof (speed) === "undefined") {
            speed = 250;
        }

        if (!$animate) {
            $animate = $("html, body");
        }

        $animate.animate({
            scrollTop: to
        }, speed, "swing");

    };

    bindUI();

};