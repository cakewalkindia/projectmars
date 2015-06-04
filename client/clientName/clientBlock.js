

if(Meteor.isClient) {
    Meteor.call('callToService', function (err, response) {
        Session.set('myMethodResult', response);
        Session.set('allClient',response);
    });

    Template.client.helpers({
        getCPF: function () {
            return Session.get('myMethodResult');
        },


        dataLoadingClient : function(){
            return Session.get('myMethodResult');
        }
    });

    Template.client.events({
        'click .clsPackage': function () {
            //debugger
            Meteor.call('getPackageDataBlock', this.ClientId, function (err, result) {
                Session.set('packageDetails', result);
                Session.set('allPackages', result);
            });

            Router.go('packageName' , {ClientId: this.ClientId});

        },

        'click .clsFQs': function () {

            Session.set('FqByPackageDetails', 'sohel');

            Meteor.call('getFqData', this.ClientId, function (err, result) {
                Session.set('FqDetails', result);
                Session.set('allFQs', result);
            });

            Router.go('FQs' , {ClientId: this.ClientId,  CalledFrom : 'Client'});
        },

        //'click .clientNameClick': function(){
        //    debugger
        //    Meteor.call('getPackageDataBlock', this.ClientId, function (err, result) {
        //        Session.set('packageDetails', result);
        //        Session.set('allPackages', result);
        //    });
        //
        //    Router.go('packageName' , {ClientId: this.ClientId});
        //},

        'keyup .textSearch' : function(e, temp){

            Session.set('myMethodResult', Session.get('allClient'));
            var text = temp.find('input').value;
            text = text.toLowerCase();

            if (text.trim() == '') {
                var noMatch = $("#noMatchClient");
                var c = noMatch[0];
                c.style.display = 'none';


                return Session.get('myMethodResult');
            }

            var data = Session.get('myMethodResult');
            //data[0].ClientName
            b = [];


            for (var i = 0; i < data.length; i++) {
                if (data[i].ClientName.toLowerCase().indexOf(text) == 0) {

                    c = {};
                    c.ClientName = data[i].ClientName;
                    c.ClientId = data[i].ClientId;
                    c.Assigned = data[i].Assigned;
                    c.InProgress = data[i].InProgress;
                    c.Completed = data[i].Completed;
                    c.packageCnt = data[i].packageCnt;
                    c.FramequestionCnt = data[i].FramequestionCnt;
                    c.TotRefCnt = data[i].TotRefCnt;
                    b.push(c);

                }

            }
            if (b.length != 0) {
                var noMatch = $("#noMatchClient");
                var c = noMatch[0];
                c.style.display = 'none';

                return Session.set('myMethodResult', b);
            }
            else {
                var noMatch = $("#noMatchClient");
                var c = noMatch[0];
                c.style.display = 'inline';

                //var divCount = $("div[class*='divCount']").length;
                //for(i = 0;  i < divCount; i++)
                //{
                //    var c = $("div[class*='divCount']");
                //    var d = c[i];
                //    d.style.display = 'none';
                //
                //}

                return; // Session.set('myMethodResult', Session.get('allClient'));

            }
        }
    })

    Template.client.object_with_index = function () {
        //var objects = [1,2,3,4,5,6,7,8,9,10];
        //
        //return objects;
    }

    Handlebars.registerHelper("showPercentage", function(val1 , val2){

        var total = ((val1 * 100) / val2);
        if(total == 0 || (isNaN(total)))
        {
            return 0;
        }
        return Math.round(total).toFixed(0);
    })

}

