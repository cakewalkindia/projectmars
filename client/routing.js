
Router.configure({
    layoutTemplate: 'masterlayout'
});


Router.map(function () {

        this.route ('login', {
            layoutTemplate : ''

        });


        var OnBeforeActions;

        OnBeforeActions = {
            loginRequired: function(pause) {
                if (!Meteor.userId()) {
                    Router.go('login');
                    return pause();
                }else{
                    this.next();
                }

            }
        };

        Router.onBeforeAction(OnBeforeActions.loginRequired, {
            except: ['login','register']
            }
        );



        this.route('Main' ,{path : '/'}  );
        this.route('StudyList');
        this.route('StudyDetail');
        this.route('register'  , {
            layoutTemplate : ''

        });



  } // router map ends

);
