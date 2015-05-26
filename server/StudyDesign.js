/**
 * Created by SOHEB.RAPATI on 20-05-2015.
 */
Meteor.publish('StudyData', function(TaskId) {
    return textData.find({TaskId: {$in: ["3323","10674","14885"]}});
});



Meteor.methods({
    getAddress: function (string, cb) {
        // we need to use "future" because our calls are async and the client
        // needs to wait to set values until after they come back from the server
        Future = Npm.require('fibers/future');
        var fut = new Future();

        Meteor.http.get('http://extractservicestraining.doctorevidence.com/getclientpackagefq', function (err, res) {
            obj = JSON.parse(res.content);
            return fut.return(obj);
        });
        return fut.wait();
    }
});