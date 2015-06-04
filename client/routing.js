
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
        this.route('client');
        this.route('register'  , {
            layoutTemplate : ''

        });

        this.route('StudyDetail');

        this.route('packageName', {
            template: 'packageName',
            path: '/packageName/:ClientId',
            data: function() {
                return Session.get('packageDetails');
            }
        });

        this.route('FQs', {
            template: 'FQs',
            path: '/FQs/:CalledFrom',
            data: function() {

                if (this.params.CalledFrom == 'Client')
                {
                    return Session.get('packageDetails');
                }
                else if(this.params.CalledFrom == 'Package')
                {
                    return Session.get('FqByPackageDetails');
                }

            }
        });


  } // router map ends

);
