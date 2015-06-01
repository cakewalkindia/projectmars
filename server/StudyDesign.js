/**
 * Created by SOHEB.RAPATI on 20-05-2015.
 */

Future = Npm.require('fibers/future');

Meteor.publish('StudyData', function(TaskId) {
    var data= textData.find(
        {
            ReferenceId: {$in: TaskId},
            "Data.StudyData.data" : { "$elemMatch" :
            { "sourcename" : /StudyDesign_/}}
        },
        {
            fields: {'Data.StudyData.data.$': 1}
        }
    );

    return data;
    //"Data.StudyData.data": {"$elemMatch": {"sourcename": /StudyDesign_/}}//, {fields: {Data: 1}});
});



Meteor.methods({
    getPackageData: function (clientId, cb) {
        // we need to use "future" because our calls are async and the client
        // needs to wait to set values until after they come back from the server

        var qWait = new Future();

        Meteor.http.get(Service.Sources.getPackagesByClient + clientId, function (err, res) {
            obj = res.content; //JSON.parse(res.content);
            return qWait.return(obj);
        });
        return qWait.wait();
    },

    getReferences: function (packageId) {
        var qWait = new Future();
        Meteor.http.get(Service.Sources.getReferecesByPackage + packageId, function (err, res) {
            obj = res.content; //JSON.parse(res.content);
            return qWait.return(obj);
        });
        return qWait.wait();
    },

    getStudyListData: function (packageId) {
        var qWait = new Future();
        Meteor.http.get(Service.Sources.getStudyList + packageId, function (err, res) {
            obj = res.content; //JSON.parse(res.content);
            return qWait.return(obj);
        });
        return qWait.wait();
    }
});