/**
 * Created by SOHEB.RAPATI on 31-05-2015.
 */


Session.setDefault("ErrorReportData","");

getCollectionDataByRefId= function (sourcename) {
    var refId = Session.get("ReferenceId");
    var sData = $.grep(textData.find().fetch(),function(e){ return e.ReferenceId==refId});
    var collData=[];
    if(sData.length>0) {
        var cData = sData[0].Data.StudyData[0].data;
        for (var i = 0; i < cData.length; i++) {
            var source = cData[i];
            if (source.sourcename) {
                if (source.sourcename == sourcename) {
                    collData = source.Datapoints;
                    break;
                }
            }
        }
    }

    return collData;
}

Template.StudyDetail.helpers({
    getReferenceDetails: function () {
        var refId = Session.get("ReferenceId");
        var sData = Session.get("StudyListData");

        var rData= $.grep(sData, function(i){return i.ReferenceID == refId});

        if(rData.length>0){
            return rData[0];
        }

        return {};
    },

    getContactInfo: function () {
        var contData={};
        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_AUTHOR_CONTACT_INFORMATION);
        for (var i = 0; i < dpList.length; i++) {
            var dp = dpList[i];
            //if (dp.Name != 'Contact Phone') {
                dp.Value = dp.Value == '' ? 'Unavailable' : dp.Value;
                if (dp.Name == 'Contact Name') {
                    contData.cName = dp.Value;
                } else if (dp.Name == 'Contact Email') {
                    contData.cEmail = dp.Value;
                }
                else if (dp.Name == 'Contact Address') {
                    contData.cAddress = dp.Value;
                }
                else if (dp.Name == 'Contact Phone') {
                    contData.cPhone = dp.Value;
                }
            //}
        }
        return contData;
    },

    getIncCri: function () {
        var data='Unavailable';
        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_INCLUSION_CRITERIA);

        if(dpList.length>0){
            var html = dpList[0].Value;
            var div = document.createElement("div");
            div.innerHTML = html;
            var text = div.textContent || div.innerText || "";
            data = text;
            if(data==''){
                data='Unavailable';
            }
        }

        return data;
    },

    getExcCri: function () {
        var data='Unavailable';
        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_EXCULSION_CRITERIA);

        if(dpList.length>0){
            var html = dpList[0].Value;
            var div = document.createElement("div");
            div.innerHTML = html;
            var text = div.textContent || div.innerText || "";
            data = text;
            if(data==''){
                data='Unavailable';
            }
        }

        return data;
    },

    getQulNote: function () {
        var data='Unavailable';
        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_QUALITATIVE_NOTE);

        if(dpList.length>0){
            var html = dpList[0].Value;
            var div = document.createElement("div");
            div.innerHTML = html;
            var text = div.textContent || div.innerText || "";
            data = text;

            if(data==''){
                data='Unavailable';
            }
        }

        return data;
    },

    getDocType: function () {
        var contData='';
        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_DOCUMENT);
        for (var i = 0; i < dpList.length; i++) {
            var dp = dpList[i];
            contData += dp.Value + ', ';
        }

        contData = contData.substring(0,contData.lastIndexOf(', '));
        return contData;
    },

    getFunding: function () {

        var fundIN = '';
        var fundT = '';
        var instT = '';
        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_FUNDING);
        for (var i = 0; i < dpList.length; i++) {
            var dp = dpList[i];

            if (dp.Name == 'Funding Type') {
                fundT += dp.Value + ', ';
            } else if (dp.Name == 'Institution Type') {
                instT += dp.Value + ', ';
            } else if (dp.Name == 'Funding Institution Name') {
                fundIN += dp.Value + ', ';
            }

            if(fundIN != '' && fundT != ''  && instT != ''){
                break;
            }
        }

        if(fundIN==''){
            fundIN='Unavailable';
        }

        if(fundT==''){
            fundT='Unavailable';
        }

        if(instT==''){
            instT='Unavailable';
        }

        fundIN = fundIN.substring(0, fundIN.lastIndexOf(', '));
        fundT = fundT.substring(0, fundT.lastIndexOf(', '));
        instT = instT.substring(0, instT.lastIndexOf(', '));

        var contData = {fundIN: fundIN, fundT: fundT, instT: instT}

        return contData;
    },

    getObjective: function () {
        var objName = '';
        var objDesc = '';

        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_OBJECTIVE);

        for (var i = 0; i < dpList.length; i++) {
            var dp = dpList[i];
            dp.Value = dp.Value == '' ? 'Unavailable' : dp.Value;
            if (dp.Name == 'Objective') {
                objName += dp.Value + ', ';
            } else if (dp.Name == 'Objective Description') {
                objDesc += dp.Value + ', ';
            }

            if(objName != '' && objDesc != ''){
                break;
            }
        }

        objName = objName.substring(0, objName.lastIndexOf(', '));
        objDesc = objDesc.substring(0, objDesc.lastIndexOf(', '));

        var contData = {objName: objName, objDesc: objDesc};

        return contData;
    },

    getPower: function () {
        var pwrBeta = '', pwrOutcomeName = '', pwrPerGrpStdy = '', pwrDesc = '', pwrSmpSize = '';

        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_POWER);

        for (var i = 0; i < dpList.length; i++) {
            var dp = dpList[i];
            dp.Value = dp.Value == '' ? 'Unavailable' : dp.Value;
            if (dp.Name == 'Outcome Name') {
                pwrOutcomeName += dp.Value + ', ';
            } else if (dp.Name == 'Power Description') {
                pwrDesc += dp.Value + ', ';
            } else if (dp.Name == 'Beta / Power (%)') {
                pwrBeta += dp.Value + ', ';
            } else if (dp.Name == 'Sample Size (#)') {
                pwrSmpSize += dp.Value + ', ';
            } else if (dp.Name == 'Per Group/Study') {
                pwrPerGrpStdy += dp.Value + ', ';
            }

            if (pwrBeta != '' && pwrOutcomeName != '' && pwrPerGrpStdy != '' && pwrDesc != '' && pwrSmpSize != '') {
                break;
            }
        }

        pwrBeta = pwrBeta.substring(0, pwrBeta.lastIndexOf(', '));
        pwrOutcomeName = pwrOutcomeName.substring(0, pwrOutcomeName.lastIndexOf(', '));
        pwrPerGrpStdy = pwrPerGrpStdy.substring(0, pwrPerGrpStdy.lastIndexOf(', '));
        pwrDesc = pwrDesc.substring(0, pwrDesc.lastIndexOf(', '));
        pwrSmpSize = pwrSmpSize.substring(0, pwrSmpSize.lastIndexOf(', '));

        var contData = {
            pwrOutcomeName: pwrOutcomeName,
            pwrDesc: pwrDesc,
            pwrBeta: pwrBeta,
            pwrSmpSize: pwrSmpSize,
            pwrPerGrpStdy: pwrPerGrpStdy
        };

        return contData;
    },

    getPhaseRadomization: function () {
        var randAt = '';
        var timeUnit = '';

        var dpList = getCollectionDataByRefId(ExtractData.StudyLevel.SOURCENAMES.STUDY_PHASE_RANDOMIZATION);

        for (var i = 0; i < dpList.length; i++) {
            var dp = dpList[i];
            dp.Value = dp.Value == '' ? 'Unavailable' : dp.Value;
            if (dp.Name == 'Randomization @') {
                randAt = dp.Value;
            } else if (dp.Name == 'Time Unit') {
                timeUnit = dp.Value;
            }
        }

        var contData = {randAt: randAt, timeUnit: timeUnit};

        return contData;
    },

    getErrorReportData: function () {
        Meteor.call("getErrorReportData",Session.get("ReferenceId") ,function(error,packageData){
            // console.log(error);
            // console.log(address);
            Session.set("ErrorReportData", packageData);
            $('#divInnerErrorReport').html(packageData);
        });


        //return Session.get("ErrorReportData");
        return "";
    }

});

Template.StudyDetail.rendered = function() {

    showHideBox();

}