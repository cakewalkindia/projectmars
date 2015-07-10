

if(Meteor.isClient) {


    Template.packageName.helpers({

        getPackageHelper: function () {
            return Session.get('packageDetails');
        },

        dataLoadingPackage : function(){
           return Session.get('packageDetails');
        }

    })



    Template.packageName.events({
        'click .clsFQsPackage': function () {
            //alert('package clicked');

            Session.set('FqDetails', 'sohel');

            Meteor.call('getFqDataPackage', this.PackageId, function (err, result) {
                Session.set('FqByPackageDetails', result);
                Session.set('allFQs', result);
            });


            Router.go('FQs' , {PackageId: this.PackageId, CalledFrom : 'Package'});




        },

        'keyup .textSearchPackage' : function(e,temp){

            Session.set('packageDetails', Session.get('allPackages'));
            var text = temp.find('input').value;
            text = text.toLowerCase();

            if (text.trim() == '') {
                var noMatch = $("#noMatchPackage");
                var c = noMatch[0];
                c.style.display = 'none';

                return Session.get('packageDetails');
            }

            var data = Session.get('packageDetails');
            b = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i].PackageName.toLowerCase().indexOf(text) == 0) {

                    c = {};
                    c.PackageName = data[i].PackageName;
                    c.PackageId = data[i].PackageId;
                    c.Assigned = data[i].Assigned;
                    c.InProgress = data[i].InProgress;
                    c.Completed = data[i].Completed;
                    //c.packageCnt = data[i].packageCnt;
                    c.FramequestionCnt = data[i].FramequestionCnt;
                    c.TotRefCnt = data[i].TotRefCnt;
                    b.push(c);

                }

            }

            if (b.length != 0) {
                var noMatch = $("#noMatchPackage");
                var c = noMatch[0];
                c.style.display = 'none';

                return Session.set('packageDetails', b);
            }
            else {
                var noMatch = $("#noMatchPackage");
                var c = noMatch[0];
                c.style.display = 'inline';

                return Session.set('packageDetails', Session.get('allPackages'));
            }
        }
    })


}

