bbdev.handleNewsletterForm = function() {

    // // NOTE: The code below was designed only for mailchimp. If you use another email client, please modify or add the code below this.
    // var $form = $(".js-newsletter-form");
    // var $email, msg;

    // $form.on("submit", function (e) {

    //     e.preventDefault();

    //     $self = $(this);

    //     // should only be 1 email field anyway.
    //     $email = $self.find("input[type='email']");

    //     var ajaxParams = {
    //         url:    $self.attr("action"),
    //         method: $self.attr("method"),
    //         data:   $self.serialize(),
    //         dataType: 'jsonp',
    //         jsonp: 'c',
    //         contentType: "application/json; charset=utf-8",
    //         error: function () {
    //             $email.val("Sorry, we had an error");
    //         },
    //         success: function (data) {

    //             if (data.msg.indexOf("already") !== -1) {
    //                 msg = "This email is already subscribed.";
    //             } else if (data.msg.indexOf("Almost") !== -1) {
    //                 msg = "Thanks for Joining";
    //             } else {
    //                 msg = "Thanks for Joining!";
    //             }

    //             $email
    //             .val("")
    //             .attr("placeholder", msg);

    //         }
    //     };

    //     $.ajax(ajaxParams);

    // });





    KlaviyoSubscribe.attachToForms('#popup-subscribe-form', {

        success_message: "Thank you!",

        success: function ($form) {

            $form.find("#k_id_email").attr("placeholder", "THANK YOU FOR JOINING THE TEAM");

            // if ($form.is('#subscribe-popup-subscribe-form')) {
            //     $('.subscribe-popup').delay(1000).fadeOut(400);

            // }

        }

    });


    KlaviyoSubscribe.attachToForms('#newsletter-subscribe-form', {

        success_message: "Thank you for signing up! <br> Use code TEAM59 for 15% OFF.",

        success: function ($form) {

            $form.find(".newsletter-subscribe-form-fields").css('display', 'none');



        }

    });

      KlaviyoSubscribe.attachToForms('#popup-top-newsletter-subscribe-form', {

          success_message: "Thank you for signing up!<br> Use code TEAM59 for 15% OFF.",

          success: function ($form) {

              $form.find(".newsletter-subscribe-form-fields").css('display', 'none');
              $form.parents('.banner-popup__inner').find('.text-col').css('display', 'none');
          }

      });

    $(document).on('click', '#newsletter-subscribe-form [type="email"]', function(event) {
        event.preventDefault();
        $(this).siblings('[type="submit"]').css('display', 'block');
    });






};
