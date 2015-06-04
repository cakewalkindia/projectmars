/**
 * Created by SOHEB.RAPATI on 18-05-2015.
 */

Session.setDefault('TaskId','3323');
Session.setDefault("StudyCount", 0);
Session.setDefault("ChartData",[]);
SDSubscription=Meteor.subscribe('StudyData', Session.get('ReferenceList'));




    generateChart = function(){

        var value=Session.get("ChartData");
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

        if(dataArrs.length>0) {
            chartDonut = c3.generate({
                bindto: $('#sd_circle')[0], //this.find('#sd_circle'),
                data: {
                    columns: dataArrs,
                    type: 'donut'
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
                        format: function (value) {
                            return value;
                        }
                    }
                }
            });

            chartBar = c3.generate({
                bindto: $('#sd_bar')[0], //this.find('#sd_circle'),
                data: {
                    columns: dataArrs,
                    type: 'bar'
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
                        format: function (value) {
                            return value;
                        }
                    }
                }
            });

            chartPie = c3.generate({
                bindto: $('#sd_pie')[0], //this.find('#sd_circle'),
                data: {
                    columns: dataArrs,
                    type: 'pie'
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
                        format: function (value) {
                            return value;
                        }
                    }
                }
            });
        }
    }

    isNumber = function (n)
    {
        return n === parseFloat(n);
    }

    isOdd = function (n)
    {
        return isNumber(n) && (Math.abs(n) % 2 == 1);
    }



    setActiveItemButton=function(){
        $(".sd-nav-bar a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }

    showHideBox= function () {
        $('.fa-caret-down').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);

            //$this.toggle(function () {
            //    $(this).addClass("fa-caret-down");
            //    $(this).removeClass("fa-caret-up");
            //}, function () {
            //    $(this).addClass("fa-caret-up");
            //    $(this).removeClass("fa-caret-down");
            //});

            var $collapse = $this.closest('.box').find('.box-body');
            r = $collapse.collapse('toggle');


            var cn= $(r).attr('aria-expanded');
            if(cn=="true"){
                $(this).addClass("fa-caret-down");
                $(this).removeClass("fa-caret-up");
            }else{
                $(this).addClass("fa-caret-up");
                $(this).removeClass("fa-caret-down");
            }

        });
    }



    Template.StudyDesign.helpers({
        'getDesignData': function () {
            var studyNamesWithCount = [];

            //var data= textData.find({ ReferenceId: { $in: Session.get("ReferenceList")},"Data.StudyData.data" : { "$elemMatch" :
            //{ "sourcename" : /StudyDesign_/}}}, {"Data.StudyData.data.$":1})

            //var data= textData.findOne({TaskId: "3323"});
            //var studyNamesWithCount=[];

            var dataList = textData.find().fetch();

            if (dataList.length > 0) {
                var studyNames = [];
                for (var i = 0; i < dataList.length; i++) {
                    var data = dataList[i].Data.StudyData[0].data;
                    for (var j = 0; j < data.length; j++) {
                        var source = data[j];
                        if (source.sourcename) {
                            if (source.sourcename.indexOf('StudyDesign_') > -1) {
                                for (var k = 0; k < source.Datapoints.length; k++) {
                                    var dp = source.Datapoints[0];
                                    if (dp.Name == "Study Design") {
                                        if(dp.Value != "" && dp.Value != undefined != dp.Value!=null) {
                                            studyNames.push(dp.Value);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                Session.set("StudyCount", studyNames.length);

                studyNamesWithCount = Utils.compressArray(studyNames);
                Session.set("ChartData",studyNamesWithCount);
                generateChart();
            }

            return studyNamesWithCount;
        }

    });



    Template.StudyDesign.rendered = function () {
        generateChart();

        setActiveItemButton();
        showHideBox();
    }