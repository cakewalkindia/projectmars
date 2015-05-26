/**
 * Created by Asif on 26-05-2015.
 */

Template.register.events({

    "click #btnRegister" : function( event , tpl) {

        event.preventDefault();


        // validate

        var email = tpl.find("#txtUserid").value;
        var pass = tpl.find("#txtPassword").value;
        var pass2 = tpl.find("#txtPassword2").value;


        if (pass != pass2 ) {
            bootbox.alert("Passwords do not match", function() {   return; })
            return;
        }else {

            Accounts.createUser({email: email, password : pass}, function(err){
                if (err) {
                    bootbox.alert("Account creation failed ");
                    return;
                } else {
                    bootbox.alert("Account created redirecting to login page... ",function() {
                        Router.go('login');
                    });
                    return;
                }

            });
        }
    }


});


Template.register.rendered = function(){

    $("#regForm").validate();


}