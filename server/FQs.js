Meteor.startup(function(){
});
Meteor.methods({

    'getFqData': function (ClientId) {
        console.log(ClientId + 'in FQ.js');
        var obj = "";
        Future = Npm.require('fibers/future');
        var fut = new Future();
        var str1 = 'http://extractservicestraining.doctorevidence.com/getFqDataByClient/';
        var str2 = ClientId;
        var url = str1.concat(str2);
        console.log(url);
        HTTP.get(url, function (err, res) {
            obj = JSON.parse(res.content);
            fut.return(obj);

        });

        return fut.wait();
    }
})
