(function(){/**
 * Created by SOHEB.RAPATI on 18-05-2015.
 */

Session.setDefault('TaskId','3323');

noteSubscription=Meteor.subscribe('StudyData', Session.get('TaskId'));

Session.setDefault("StudyCount", 0);


generateDonut = function(value){
    var dataArrs = [];

    for(var i =0; i<value.length; i++) {
        var name = value[i].value;
        var cnt =  value[i].count;
        dataArr = [];
        dataArr.push(name);
        dataArr.push(cnt);
        //dataArr.push(value[i].value);
        //dataArr.push(value[i].count);
        dataArrs.push(dataArr);
    }


    chartDonut = c3.generate({
        bindto: $('#sd_circle')[0], //this.find('#sd_circle'),
        data: {
            columns: dataArrs,
            type : 'donut'
            //onclick: function (d, i) { console.log("onclick", d, i); },
            //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        legend: {
            position: 'right'
        },
        donut: {
            title: (Session.get("StudyCount") + (Session.get("StudyCount") > 1 ? " Studies" : " Study")),
            label: {
                format: function (value) { return value; }
            }
        }
    });

    chartBar = c3.generate({
        bindto: $('#sd_bar')[0], //this.find('#sd_circle'),
        data: {
            columns: dataArrs,
            type : 'bar'
            //onclick: function (d, i) { console.log("onclick", d, i); },
            //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        legend: {
            position: 'right'
        },
        axis: {
            x: {
                type: 'category'
            }
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            },
            label: {
                format: function (value) { return value; }
            }
        }
    });

    chartPie = c3.generate({
        bindto: $('#sd_pie')[0], //this.find('#sd_circle'),
        data: {
            columns: dataArrs,
            type : 'pie'
            //onclick: function (d, i) { console.log("onclick", d, i); },
            //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        legend: {
            position: 'right'
        },
        pie: {
            //title: (Session.get("StudyCount") + (Session.get("StudyCount") > 1 ? " Studies" : " Study")),
            label: {
                format: function (value) { return value; }
            }
        }
    });
}

isNumber = function (n)
{
    return n === parseFloat(n);
}

isOdd = function (n)
{
    return isNumber(n) && (Math.abs(n) % 2 == 1);
}

Template.StudyDesign.helpers({
    'getDesignData': function () {
        //var currentUserId = Meteor.userId();
        var data= textData.findOne({TaskId: "3323"});
        var studyNamesWithCount=[];

        if(data) {
            var studyNames = [];
            ExtractData.setData(JSON.stringify(data.Data.StudyData));

            for (var i = 0; i < ExtractData.StudyLevel.Data.length; i++) {
                var s = ExtractData.StudyLevel.Data[i].sourcename;
                if (s) {
                    if (s.indexOf('StudyDesign_') > -1) {

                        for (var j = 0; j < ExtractData.getSource(s).Datapoints.length; j++) {
                            var dp = ExtractData.getSource(s).Datapoints[j];
                            if (dp.Name == "Study Design") {
                                studyNames.push(dp.Value);
                            }
                        }
                    }
                }
            }

            Session.set("StudyCount", studyNames.length);

            studyNamesWithCount = Utils.compressArray(studyNames);

            generateDonut(studyNamesWithCount);
        }

        return studyNamesWithCount;
    },

    'setRowColor': function () {
        var me = this;
        var isTrue = isOdd(me.index);

        if(isTrue){
            return "";
        }else{
            return "rowColor";
        }

    }
});



Template.StudyDesign.rendered = function () {

}

})();
