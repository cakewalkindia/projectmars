


    Meteor.startup(function(){
    });
    Meteor.methods({

        'getPackageDataBlock': function (ClientId) {
            var obj = "";
            Future = Npm.require('fibers/future');
            var fut = new Future();
            var str1 = 'http://extractservicestraining.doctorevidence.com/getPackageDataByClient/';
            var str2 = ClientId;
            var url = str1.concat(str2);
            console.log(url);
            HTTP.get(url, function (err, res) {
                obj = JSON.parse(res.content);
                fut.return(obj);

            });

            return fut.wait();
        },


        'getFqDataPackage': function (PackageId) {
            console.log(PackageId + 'in Pack js');
            var obj = "";
            Future = Npm.require('fibers/future');
            var fut = new Future();
            var str1 = 'http://extractservicestraining.doctorevidence.com/getFqDataByPackage/';
            var str2 = PackageId.toString();
            var url = str1.concat(str2);
            console.log(url);
            HTTP.get(url, function (err, res) {
                obj = JSON.parse(res.content);
                fut.return(obj);

            });

            return fut.wait();
        }

    })


