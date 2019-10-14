/**
@description
Toggle/remove/add classes functionality directly in the markup.
Also fires an event for hooks.
@example
<div data-toggle='{"togglesClass": "toggled", "allowEscToggle": true}'>Toggle Me</div>
*/

bbdev.elementToggleClass = function () {

    var s = {
        defaultMethod: "toggle",
        defaultToggles: "html",
        $selector: $("[data-toggle]")
    };

    var p, memory = {};

    var addToMemory = function (processedData) {
        memory[processedData.togglesClass] = processedData;
    };

    var removeFromMemory = function (togglesClass) {
        delete memory[togglesClass];
    };

    var getMemory = function () {
        return memory;
    };

    var removeActive = function () {

        $.each(getMemory(), function (key, value) {

            if (value.active && value.allowEscToggle) {
                toggleClass(value);
                triggerToggledEv(value);
            }

        });

    };

    var triggerToggledEv = function (data, evData) {
        evData = {
            hasClass: data.toggles.hasClass(data.togglesClass)
        };
        data.toggles.trigger(data.togglesClass, evData);
    };

    // Data should go through getProcessedData() first.
    var toggleClass = function (processedData) {

        p = processedData;

        if (!p) {
            console.error("Data param missing.");
            return false;
        }

        if (p.method === "toggle") {
            p.toggles.toggleClass(p.togglesClass);

        } else if (p.method === "add") {
            p.toggles.addClass(p.togglesClass);

        } else if (p.method === "remove") {
            p.toggles.removeClass(p.togglesClass);
        }

        p.active = p.toggles.hasClass(p.togglesClass);

        if (p.active) {
            addToMemory(p);
        } else {
            removeFromMemory(p.togglesClass);
        }

    };

    var gatherDataFromEl = function ($el) {
        return $el.data("toggle");
    };

    /**
    @description Normalizes the data.
    @param {object} data
    */
    var getProcessedData = function (data) {

        if (!data.togglesClass) {
            console.error("togglesClass key is missing");
            return false;
        }

        if (!data.method) {
            data.method = s.defaultMethod;
        }

        if (!data.allowEscToggle) {
            data.allowEscToggle = false;
        }

        if (!data.toggles) {
            data.toggles = s.defaultToggles;
        }

        if( !$(data.toggles).length ){
            console.warn("Cant find any: " + data.toggles);
            return false;
        }

        // Convert to a jQuery object.
        data.toggles = $(data.toggles);

        return data;

    };

    s.$selector.on("click", function (e) {

        // Stop link default action.
        e.preventDefault();

        var processed, $self, gathered;

        $self = $(this);
        gathered = gatherDataFromEl($self);
        processed = getProcessedData(gathered);

        toggleClass(processed);
        triggerToggledEv(processed);

    });

    $(document).on("keyup", function (e) {

        if (e.which === 27) {
            removeActive();
        }

    });

};
