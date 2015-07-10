if(Meteor.isClient) {


    Template.FQs.helpers({

        getFqHelper: function () {

            if(Session.get('FqDetails') != 'sohel') {

                return Session.get('FqDetails');
            }
            else if(Session.get('FqByPackageDetails') != 'sohel')
            {

                return Session.get('FqByPackageDetails');
            }
        },

        dataLoadingFq : function(){
            if(Session.get('FqDetails') != 'sohel') {

                return Session.get('FqDetails');
            }
            else if(Session.get('FqByPackageDetails') != 'sohel')
            {

                return Session.get('FqByPackageDetails');
            }
        }

    })

    Template.FQs.events({
        'keyup .textSearchFQ' : function(e, temp) {
            debugger
            var data;

            if (Session.get('FqDetails') != 'sohel') {

                Session.set('FqDetails', Session.get('allFQs'));
                data = Session.get('FqDetails');
            }
            else if (Session.get('FqByPackageDetails') != 'sohel') {
                Session.set('FqByPackageDetails', Session.get('allFQs'));
                data = Session.get('FqByPackageDetails');

            }

            var text = temp.find('input').value;
            text = text.toLowerCase();

            if (text.trim() == '') {
                var noMatch = $("#noMatchFQ");
                var c = noMatch[0];
                c.style.display = 'none';

                if (Session.get('FqDetails') != 'sohel') {
                    Session.get('FqDetails');
                }
                else if (Session.get('FqByPackageDetails') != 'sohel') {
                    Session.get('FqByPackageDetails');
                }
            }


            b = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i].FramedQuestion.toLowerCase().indexOf(text) == 0) {

                    c = {};
                    c.FramedQuestion = data[i].FramedQuestion;
                    //c.PackageId = data[i].PackageId;
                    c.Assigned = data[i].Assigned;
                    c.InProgress = data[i].InProgress;
                    c.Completed = data[i].Completed;
                    //c.packageCnt = data[i].packageCnt;
                    //c.FramequestionCnt = data[i].FramequestionCnt;
                    c.TotRefCnt = data[i].TotRefCnt;
                    b.push(c);

                }

            }

            if (b.length != 0) {
                var noMatch = $("#noMatchFQ");
                var c = noMatch[0];
                c.style.display = 'none';

                if (Session.get('FqDetails') != 'sohel') {

                    return Session.set('FqDetails',b);
                }
                else if (Session.get('FqByPackageDetails') != 'sohel') {
                    return Session.set('FqByPackageDetails', b);

                }
            }
            else
                //return Session.set('packageDetails', Session.get('allPackages'));
            {
                var noMatch = $("#noMatchFQ");
                var c = noMatch[0];
                c.style.display = 'inline';

                if(Session.get('FqDetails') != 'sohel') {

                   return Session.set('FqDetails', Session.get('allFQs'));
                }
                else if(Session.get('FqByPackageDetails') != 'sohel')
                {
                   return Session.set('FqByPackageDetails', Session.get('allFQs'));

                }
            }


        }
    })


}

