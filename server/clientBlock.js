

    Meteor.startup(function(){
    });
    Meteor.methods({
        callToService: function(){
            var obj="";
            Future = Npm.require('fibers/future');
            var fut = new Future();
            HTTP.get('http://extractservicestraining.doctorevidence.com/getClientData', function (err, res) {
                obj = JSON.parse(res.content);
                fut.return(obj);

            });
            return fut.wait();
        }


    });


