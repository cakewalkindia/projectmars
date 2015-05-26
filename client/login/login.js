

Template.login.rendered = function () {





}


  Template.login.events({

        "click #btnLogin"  :function(event, tpl){

            event.preventDefault();

         var username =    tpl.find("#txtusername").value;
         var pass   =    tpl.find("#txtpassword").value;


            if ( username ==  '' || pass == '') {

                bootbox.alert("Please enter username and pasword", function() {   return; });

                return;
            }else{

               Session.set("duser" , username);

                Meteor.loginWithPassword (username,pass,function(err){
                    if (err){
                        // The user might not have been found, or their passwword
                        // could be incorrect. Inform the user that their
                        // login attempt has failed.

                        alert('Login Failed' + err);
                    }
                    else{
                        // The user has been logged in.
                        Router.go('/')
                    }


                });

            }

        }



    });
