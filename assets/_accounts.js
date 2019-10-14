bbdev.accountForgotPWUtils = function(){

    var $forgotPw       = $(".forgot-password");
    var $forgotPwOpen   = $(".js-forgot-pw-open");
    var $forgotPwClose  = $(".js-forgot-pw-close");
    var $forgotPwEmail  = $forgotPw.find("input[type='email']");

    var forgotPwToggled = "forgot-password--toggled";

    // Try to get the user's current email from the input fields.
    var getCurrentEmail = function(){

        var $emailField = $(".account").find("input[name='customer[email]']");

        if($emailField.length){
            return $emailField.val();
        } else {
            return "";
        }

    };

    var onOpen = function(){

        $forgotPwEmail.val( getCurrentEmail() );

        $forgotPw.one("transitionend", function(){
            $forgotPwEmail.focus();
        });

    };

    var onClose = function(){
        $forgotPw.find("input[type='email']").focus();
    };

    // Open pw form.
    $forgotPwOpen.on("click", function(){
        $forgotPw.addClass(forgotPwToggled);
        onOpen();
    });

    // Close pw form.
    $forgotPwClose.on("click", function(){
        $forgotPw.removeClass(forgotPwToggled);
        onClose();
    });

    $(document).on("keyup", function(e){
        if(e.which === 27){
            $forgotPw.removeClass(forgotPwToggled);
            onClose();
        }
    });

    // Auto open if hash = recover.
    if(location.hash === "#recover"){
        $forgotPwOpen.eq(0).trigger("click");
    }

};
