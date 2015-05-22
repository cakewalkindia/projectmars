/**
 * Created by SOHEB.RAPATI on 22-05-2015.
 */
ExtractData = {
    Sources: {
        STUDYLEVEL: 'StudyLevel',
        GROUPS: 'Groups',
        PHASES: 'Phases',
        OUTCOMES: 'Outcomes',
        TIMEPOINT: 'TimePoint',
        PROPERTYSETS: 'PropertySets',
        HIGHLIGHTS: 'Highlights'
    },
    VALUETYPE:
    {
        AGE: "Age", AGERANGE: "AgeRange", AVERAGE: "Average", BOOLEAN: "Boolean", COUNTRYLOCATION: "CountryLocation", DATA_POINT_LABELS: "DataPointLabels", DATE_TIME: "DateTime",
        DOSAGE: "Dosage", DOSAGES: "Dosages", DOUBLE: "Double", EVENT: "Event", FUNDING: "Funding", INTEGER: "Integer", INTERVAL: "Interval",
        INTERVENTION_PROVIDER: "InterventionProvider", INTERVENTION_ROUTE: "InterventionRoute", INTERVENTION_SCHEDULE: "InterventionSchedule", MEAN: "Mean", MEANBASE: "MeanBase",
        MEDIAN: "Median", MEMO: "Memo", NUMBER_UNIT: "NumberUnit", OUTCOME_LEVELS: "OutcomeLevels", PARTICIPANT: "Participant", PARTICIPANTS: "Participants", RANGE: "Range",
        SETTINGTYPE: "SettingType", TIME_RANGE: "TimeRange", VERSIONNUMBER: "VersionNumber", YESNONA: "YesNoNa"
    },
    STATE: { ISSYNC: 0, ADDED: 1, EDITED: 2, DELETED: 3 },
    getData: function () {
        var arr = [];
        arr.push({ type: ExtractData.Sources.STUDYLEVEL, data: ExtractData.StudyLevel.Data });
        arr.push({ type: ExtractData.Sources.GROUPS, data: ExtractData.Groups.Data });
        arr.push({ type: ExtractData.Sources.OUTCOMES, data: ExtractData.Outcomes.Data });
        arr.push({ type: ExtractData.Sources.PHASES, data: ExtractData.Phases.Data });
        // arr.push({ type: ExtractData.Sources.TIMEPOINT, data: ExtractData.TimePoint.Data });
        arr.push({ type: ExtractData.Sources.PROPERTYSETS, data: ExtractData.PropertySets.Data });
        //arr.push({ type: ExtractData.Sources.HIGHLIGHTS, data: ExtractData.Highlights.Data });
        return JSON.stringify(arr);
    },
    setData: function (json) {
        var obj = JSON.parse(json);
        if (obj != null && obj != undefined && obj != "") {
            for (var i = 0; i < obj.length; i++) {
                ExtractData[obj[i].type].Data = obj[i].data;
            }
        }
    },
    PanelVisibility: {
        isStudyObjective: true,
        isStudyPower: true,
        isStudyStatistics: true,
        isStudyDocument: true,
        isStudyType: true,
        isStudyDesign: true,
        isStudyPhase: true,
        isStudyYear: true,
        isStudyFunding: true,
        isStudyInclusion_Criteria: true,
        isStudyExculsion_Criteria: true,
        isStudySetting: true,
        isStudyAuthorContactInformation: true
    },
    IsHighlightonPDFPage:true
}
ExtractData.StudyLevel =
{
    SOURCENAMES: {
        STUDY_OBJECTIVE: "Study_Objective",
        STUDY_POWER: "Study_Power",
        STUDY_STATISTICS: 'Study_Statistics',
        STUDY_STATISTICAL_TEST: 'Study_Statistical_Test',
        STUDY_DOCUMENT: 'Study_Document',
        STUDY_TYPE: 'Study_Type',
        STUDY_DESIGN: 'Study_Design',
        //STUDY_DESIGN_AGELINK: 'Study_Design_Agelink',
        STUDY_PHASE: 'Study_Phase',
        STUDY_PHASE_RANDOMIZATION: 'Study_Phase_Randomization',
        STUDY_YEAR: 'Study_Year',
        STUDY_FUNDING: 'Study_Funding',
        STUDY_INCLUSION_CRITERIA: 'Study_Inclusion_Criteria',
        STUDY_EXCULSION_CRITERIA: 'Study_Exculsion_Criteria',
        STUDY_QUALITATIVE_NOTE: 'Study_Qualitative_Note',
        EARLY_STUDY_TERMINATION: 'Early_Study_Termination',
        STUDY_SETTING: 'Study_Setting',
        //STUDY_SETTING_COUNTRY: 'Study_Setting_Country',
        STUDY_SETTING_LOCATION_TYPE: 'Study_Setting_Location_Type',
        STUDY_SETTING_TYPE: 'Study_Setting_Type',
        STUDY_SETTING_TOTAL_ROWS: 'Study_Setting_Total_Rows',
        //STUDY_SETTING_LOCATION_TYPE_MISC: 'Study_Setting_Location_Type_Misc',
        STUDY_AUTHOR_CONTACT_INFORMATION: 'Study_Author_Contact_Information',
        FREQUENCY_REPORT: 'Frequency_Report',
        FREQUENCY_REPORT_TAGS: 'Frequency_Report_Tags'
    },
    Data: [],
    addDPToSource: function (sourcename, datapoint) {
        //if (this.Data[sourcename] == (undefined || null)) {
        //    this.Data[sourcename] = [];
        //}
        //this.Data[sourcename].push(datapoint);
        //return this.Data;

        var source;
        for (var i = 0; i < this.Data.length; i++) {
            if (this.Data[i].sourcename == sourcename) {
                source = this.Data[i];
                break;
            }
        }
        if (source == (undefined || null)) {
            source = { sourcename: sourcename, Datapoints: [] };
            this.Data.push(source);
        }

        source.Datapoints.push(datapoint);
    },
    getDataPointById: function (sourcename, dpid) {
        var source = ExtractData.getSource(sourcename);
        var dp;

        for (var j = 0; j < source.Datapoints.length; j++) {
            if (source.Datapoints[j].id == dpid) {
                dp = source.Datapoints[j];
                break;
            }
        }

        if (dp == (undefined || null)) {
            dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, '', '', ExtractData.STATE.ADDED, 1, 1);
            source.Datapoints.push(dp);
        }

        return dp;
    },
    deleteDPFromSource: function (sourcename, dpid) {
        var sources = ExtractData.getSource(sourcename);
        if (!Ext.isEmpty(sources) && !Ext.isEmptyObj(sources)) {
            for (var i = 0; i < sources.Datapoints.length; i++) {
                if (sources.Datapoints[i].id == dpid) {
                    //sources.remove(this.Data[sourcename][i]);
                    //break;
                    delete sources.Datapoints[i];
                    sources.Datapoints.splice(i, 1);
                    break;
                }
            }
        }

        if (sources.Datapoints.length == 0) {
            if (sourcename.indexOf('StudyDesign') != -1 || sourcename.indexOf('StudyStatistics') != -1 || sourcename.indexOf('Flag_Frequency_Report_') != -1) {
                for (var i = 0; i < ExtractData.StudyLevel.Data.length; i++) {
                    if (ExtractData.StudyLevel.Data[i].sourcename == sourcename) {
                        delete ExtractData.StudyLevel.Data[i];
                        ExtractData.StudyLevel.Data.splice(i, 1);
                    }
                }
            }
        }
    }
}
ExtractData.Groups = {
    SOURCENAMES: {
        GROUPS: 'Groups',
        DATAPOINT: 'Datapoint',
        OVERLAPING_POPULATION: 'Overlaping_Population',
        SUBGROUPS: 'Subgroups',
        ARM_BLINDING: 'Arm_Blinding',
        ADDITIONAL_INFORMATION: 'Additional_Information',
        ARM_POPULATION: 'Arm_Population',
        PARTICIPANTS: 'Participants',
        ARM_POPULATION_AGE: 'Arm_Population_Age',
        MALE: 'Male',
        FEMALE: 'Female',
        UNKNOWN: 'Unknown',
        INTERVENTION: 'Intervention',
        OTHERS: 'Others',
        MISC: 'Misc',
        DOSAGE: 'Dosage',
        SESSION: 'Session',
        FREQUENCY: 'Frequency',
        QUALIFIER: 'Qualifier',
        //AGETYPE: 'AgeType',
        //DOSAGETYPE: 'DosageType'
    },
    Data: [],
    getGroupById: function (groupid) {
        for (var i = 0; i < this.Data.length; i++) {
            if (this.Data[i].id == groupid) {
                return ExtractData.Create.Group(this.Data[i]);
            }
        }
        console.error("Invalid GroupId");
    },
    getInterventionSetById: function (groupid, interventionSetId) {
        var group = this.getGroupById(groupid);
        return group.getInterventionSetById(interventionSetId);
    },
    getInterventionById: function (groupid, interventionSetId, interventionId) {
        var interventionSet = this.getInterventionSetById(groupid, interventionSetId);
        return interventionSet.getInterventionById(interventionId);
    },
    deleteGroup: function (groupId) {
        for (var i = 0; i < this.Data.length; i++) {
            if (groupId == this.Data[i].id) {
                delete this.Data[i];
                this.Data.splice(i, 1);
                return;
            }
        }
    }
};
ExtractData.Phases = {
    Data: [],

    getPhaseById: function (phaseId) {
        for (var i = 0; i < this.Data.length; i++) {
            if (phaseId == this.Data[i].id) {
                return this.Data[i];
            }
        }
    },
    deletePhase: function (phaseId) {
        for (var i = 0; i < this.Data.length; i++) {
            if (phaseId == this.Data[i].id) {
                delete this.Data[i];
                this.Data.splice(i, 1);
                return;
            }
        }
    }
};
ExtractData.Outcomes = {
    SOURCENAMES: {
        SUBGROUPS: 'Subgroups',
        POPULATION: 'Population',
        OTHERS: 'Others',
        FIELDTYPE: 'FieldType',
        FIELDVALUE: 'FieldValue',
        ISRECORDED: 'IsRecorded',
        AUTHOR_ERROR: 'Author_Error',
        OBJECTIVE: 'Objective',
        EXTRACT_TABLE: 'Extract_Table'

    },
    Data: [],
    getOutcomeById: function (outcomeid) {
        for (var i = 0; i < this.Data.length; i++) {
            if (this.Data[i].id == outcomeid) {
                return ExtractData.Create.Outcome(this.Data[i]);
                //return this.Data[i];
            }
        }
        console.error("Invalid GroupId");
    },
    deleteOutcome: function (outcomeId) {
        for (var i = 0; i < this.Data.length; i++) {
            if (outcomeId == this.Data[i].id) {
                delete this.Data[i];
                this.Data.splice(i, 1);
                return;
            }
        }
    }
};
ExtractData.TimePoint = {
    Data: [],

    getTimePointById: function (timepointId) {
        for (var i = 0; i < this.Data.length; i++) {
            if (timepointId == this.Data[i].id) {
                return this.Data[i];
            }
        }
    },
    deleteTimepoint: function (timepointId) {
        for (var i = 0; i < this.Data.length; i++) {
            if (timepointId == this.Data[i].id) {
                delete this.Data[i];
                this.Data.splice(i, 1);
                return;
            }
        }
    }
};
ExtractData.PropertySets = {
    SOURCENAMES: {
        AUTHOR_ERROR: 'Author_Error',
    },
    Data: [],
    deletePropertySet: function (id) {
        for (var i = 0; i < this.Data.length; i++) {
            if (id == this.Data[i].id) {
                delete this.Data[i];
                this.Data.splice(i, 1);
                return;
            }
        }
    },
    getPropertySets: function () {
        for (var i = 0; i < this.Data.length; i++) {
            ExtractData.Create.PropertySet(this.Data[i]);
        }
        return this.Data;
    },

    getPropertySetById: function (id) {
        for (var i = 0; i < this.Data.length; i++) {
            if (id == this.Data[i].id) {
                return this.Data[i];
            }
        }
    }

}
ExtractData.Create = {
    DataPoint: function (ValueType, Name, Value, state, Row, Column) {
        var obj = {};
        obj.id = Utils.getUniqueId();
        obj.ValueType = ValueType;
        obj.Name = Name;
        obj.Value = Value;
        obj.state = state;
        obj.Row = Row;
        obj.Column = Column;
        obj.QC = {};
        return obj;
    },
    Group: function (group) {
        var groupObj = {};
        if (typeof (group) == "string") {
            groupObj = {
                id: Utils.getUniqueId(),
                name: group,
                Sources: [],
                Participants: [],
                Type: 'Arm',
                InterventionSets: [],
                GroupType: ''
            }
            ExtractData.Groups.Data.push(groupObj);
        } else {
            groupObj = group;
        }

        groupObj.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }
            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }

            source.Datapoints.push(datapoint);

            //if (this.Sources[sourcename] == (undefined || null)) {
            //    this.Sources[sourcename] = [];
            //}
            //this.Sources[sourcename].push(datapoint);
        };

        groupObj.addParticipants = function (Gender, Number, Percentage) {

            var p = { Gender: Gender, Number: Number, Percentage: Percentage, id: Utils.getUniqueId() };


            this.Participants.push(p);
            return p;
        }

        groupObj.getDataPointByName = function (sourcename, dpid) {
            var source = {};
            for (var a in ExtractData.Groups.Data) {
                if (ExtractData.StudyLevel.Data[sourcename] != undefined) {
                    return ExtractData.StudyLevel.Data[sourcename];
                }
            }

            if (dp == (undefined || null) || dpid == '0') {
                dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, '', '', ExtractData.STATE.ADDED, 1, 1);
                this.addDPToSource(sourcename, dp);
                return dp;
            }

            for (var i = 0; i < this.Data[sourcename].length; i++) {
                if (this.Data[sourcename][i].id == dpid) {
                    return this.Data[sourcename][i];
                }
            }

            return dp;
        };

        groupObj.addInterventionSet = function (interventionset) {
            this.InterventionSets.push(interventionset);
        };

        groupObj.getInterventionSetById = function (interventionSetId) {
            for (var i = 0; i < groupObj.InterventionSets.length; i++) {
                if (groupObj.InterventionSets[i].id == interventionSetId) {
                    return ExtractData.Create.InterventionSet("", 0, groupObj.InterventionSets[i], '');
                }
            }
        };

        groupObj.deleteInterventionSet = function (interventionSetId) {

            for (var i = 0; i < this.InterventionSets.length; i++) {
                if (interventionSetId == this.InterventionSets[i].id) {
                    delete this.InterventionSets[i];
                    this.InterventionSets.splice(i, 1);
                    return;
                }
            }
        };

        groupObj.deleteDPfromSource = function (sourcename, dpid) {
            for (var i = 0; i < this.Sources.length; i++) {
                var src = this.Sources[i];
                if (src.sourcename == sourcename) {
                    var dpList = src.Datapoints;
                    for (var j = 0; j < dpList.length; j++) {
                        if (dpList[j].id == dpid) {
                            delete dpList[j];
                            dpList.splice(j, 1);
                            return;
                        }
                    }
                }
            }
        }

        return groupObj;
    },
    InterventionSet: function (name, groupid, interventionSetObj, caseNo) {
        var interventionSet = {};
        if (typeof (interventionSetObj) != "object") {
            interventionSet = {
                Sources: [],
                name: name,
                id: Utils.getUniqueId(),
                groupId: groupid,
                caseNo: caseNo,
                Interventions: []
            }
        } else {
            interventionSet = interventionSetObj;
        }
        interventionSet.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }
            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }

            source.Datapoints.push(datapoint);

            //if (this.Datapoints[sourcename] == (undefined || null)) {
            //    this.Datapoints[sourcename] = [];
            //}
            //this.Datapoints[sourcename].push(datapoint);
        };
        interventionSet.addIntervention = function (intervention) {
            this.Interventions.push(intervention);
        };
        interventionSet.getInterventionById = function (interventionId) {
            for (var i = 0; i < interventionSet.Interventions.length; i++) {
                if (interventionSet.Interventions[i].id == interventionId) {
                    return ExtractData.Create.Intervention(0, interventionSet.Interventions[i]);
                }
            }
        };
        interventionSet.deleteIntervention = function (interventionId) {

            for (var i = 0; i < this.Interventions.length; i++) {
                if (interventionId == this.Interventions[i].id) {
                    delete this.Interventions[i];
                    this.Interventions.splice(i, 1);
                    return;
                }
            }
        };
        interventionSet.deleteDPfromSource = function (sourcename, dpid) {
            for (var i = 0; i < this.Sources.length; i++) {
                var src = this.Sources[i];
                if (src.sourcename == sourcename) {
                    var dpList = src.Datapoints;
                    for (var j = 0; j < dpList.length; j++) {
                        if (dpList[j].id == dpid) {
                            delete dpList[j];
                            dpList.splice(j, 1);
                            return;
                        }
                    }
                }
            }
        };
        interventionSet.clone = function () {
            var srcObj = interventionSet;
            srcObj = JSON.stringify(srcObj);
            srcObj = JSON.parse(srcObj);
            srcObj.id = Utils.getUniqueId();

            for (var i = 0; i < srcObj.Sources.length; i++) {
                var source = srcObj.Sources[i];
                for (var j = 0; j < source.Datapoints.length; j++) {
                    var dp = source.Datapoints[j];
                    dp.id = Utils.getUniqueId();
                }
            }

            for (var i = 0; i < srcObj.Interventions.length; i++) {
                var src = srcObj.Interventions[i];
                var int = ExtractData.Create.Intervention(src.phaseid, src);
                var src = int.clone();
            }

            return srcObj;
        };

        return interventionSet;
    },
    Intervention: function (phaseid, interventionObj) {
        var intervention = {};
        if (typeof (interventionObj) != "object") {
            intervention = {
                phaseid: phaseid,
                id: Utils.getUniqueId(),
                Sources: []
            };
        } else {
            intervention = interventionObj;
        }
        intervention.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }
            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }

            source.Datapoints.push(datapoint);

            //if (this.Datapoints[sourcename] == (undefined || null)) {
            //    this.Datapoints[sourcename] = [];
            //}
            //this.Datapoints[sourcename].push(datapoint);

        };
        intervention.deleteIntervention = function (interventionId) {

            for (var i = 0; i < this.Interventions.length; i++) {
                if (interventionId == this.Interventions[i].id) {
                    delete this.Interventions[i];
                    this.Interventions.splice(i, 1);
                    return;
                }
            }
        };
        intervention.clone = function () {
            var srcObj = intervention;
            srcObj = JSON.stringify(srcObj);
            srcObj = JSON.parse(srcObj);
            srcObj.id = Utils.getUniqueId();

            for (var i = 0; i < srcObj.Sources.length; i++) {
                var source = srcObj.Sources[i];
                for (var j = 0; j < source.Datapoints.length; j++) {
                    var dp = source.Datapoints[j];
                    dp.id = Utils.getUniqueId();
                }
            }

            return srcObj;
        };

        intervention.deleteDPfromSource = function (sourcename, dpid) {
            for (var i = 0; i < this.Sources.length; i++) {
                var src = this.Sources[i];
                if (src.sourcename == sourcename) {
                    var dpList = src.Datapoints;
                    for (var j = 0; j < dpList.length; j++) {
                        if (dpList[j].id == dpid) {
                            delete dpList[j];
                            dpList.splice(j, 1);
                            return;
                        }
                    }
                }
            }
        }

        return intervention;
    },
    Phase: function (name, start, startUnit, end, endUnit, source, type, fieldType, fieldTypeValue, drugName, TimepointType) {
        //source = phase or timepoint  //type=Mean,Median,Total
        //Name optional for Vinesh(timepoint)
        //type optional for Soheb (phase)
        //Soheb will show only source=phase

        var phase = {
            id: Utils.getUniqueId(),
            name: name,
            start: start,
            startUnit: startUnit,
            end: end,
            endUnit: endUnit,
            source: source,
            type: type,
            fieldType: fieldType,
            fieldTypeValue: fieldTypeValue,
            drugName: drugName
        };
        ExtractData.Phases.Data.push(phase);
        return phase;
    },
    TablePhase: function (start, startUnit, end, endUnit, type, fieldType, fieldTypeValue) {
        var phase = {
            id: Utils.getUniqueId(),
            start: start,
            startUnit: startUnit,
            end: end,
            endUnit: endUnit,
            type: type,
            fieldType: fieldType,
            fieldTypeValue: fieldTypeValue
            // notReported: notReported
        };
        ExtractData.Phases.Data.push(phase);
        return phase;
    },
    TimePoint: function (name, start, startUnit, end, endUnit) {
        var timepoint = {
            id: Utils.getUniqueId(),
            name: name,
            start: start,
            startUnit: startUnit,
            end: end,
            endUnit: endUnit
        };
        ExtractData.TimePoint.Data.push(timepoint);
        return timepoint;
    },
    Outcome: function (outcomename) {
        var outcome = {};
        if (typeof (outcomename) == "string") {
            outcome = {
                name: outcomename,
                id: Utils.getUniqueId(),
                Sources: [],
                OutcomeSets: []
            };
            ExtractData.Outcomes.Data.push(outcome);
            //ExtractData.Outcomes.Data.splice(0, 0, outcome);
        }
        else {
            outcome = outcomename;
        }

        outcome.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }
            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }
            source.Datapoints.push(datapoint);
        },
            outcome.deleteOutcomeSet = function (Id) {
                for (var i = 0; i < this.OutcomeSets.length; i++) {
                    if (Id == this.OutcomeSets[i].id) {
                        delete this.OutcomeSets[i];
                        this.OutcomeSets.splice(i, 1);
                        return;
                    }
                }
            },
            outcome.getOutcomeSetById = function (id, outcomeSetObj) {
                for (var i = 0; i < this.OutcomeSets.length; i++) {
                    if (this.OutcomeSets[i].id == id) {
                        return ExtractData.Create.OutcomeSet(outcome, this.OutcomeSets[i]);
                    }
                }
            },
            outcome.clone = function () {

                var outcomeObj = JSON.parse(JSON.stringify(this));

                var newOutcomeId = Utils.getUniqueId();
                ExtractData.Highlights.addHighlightByclone(outcomeObj.id, newOutcomeId);
                outcomeObj.id = newOutcomeId;

                var oSource = outcomeObj.Sources;

                // do not copy from Old Outcome Code
                for (var os = 0; os < oSource.length; os++) {
                    if (oSource[os].sourcename == ExtractData.Outcomes.SOURCENAMES.OTHERS) {
                        var odp = oSource[os].Datapoints;
                        for (var d = 0; d < odp.length; d++) {
                            if (odp[d].Name == "Acronym" || odp[d].Name == "Note" || odp[d].Name == "QualitativeNote") {
                                odp[d].Value = "";
                            }
                        }
                    }
                }

                for (var os = 0; os < oSource.length; os++) {
                    var odataPoints = oSource[os].Datapoints;
                    for (var dp = 0; dp < odataPoints.length; dp++) {
                        var newodpId = Utils.getUniqueId();
                        //ExtractData.Highlights.addHighlightByclone(odataPoints[dp].id, newodpId);
                        odataPoints[dp].id = newodpId;
                    }
                }

                var tmpOutcomeSet = outcomeObj.OutcomeSets;
                for (var i = 0; i < tmpOutcomeSet.length; i++) {
                    tmpOutcomeSet.id = Utils.getUniqueId();

                    var tmpSources = tmpOutcomeSet[i].Sources;
                    for (var j = 0; j < tmpSources.length; j++) {
                        var tmpDatapoints = tmpSources[j].Datapoints;
                        for (var k = 0; k < tmpDatapoints.length; k++) {
                            var newOSourcedpId = Utils.getUniqueId();
                            //ExtractData.Highlights.addHighlightByclone(tmpDatapoints[k].id, newOSourcedpId);
                            tmpDatapoints[k].id = newOSourcedpId;
                        }
                    }

                    var tmpOutcomeGroupValues = tmpOutcomeSet[i].OutcomeGroupValues;

                    for (var o = 0; o < tmpOutcomeGroupValues.length; o++) {

                        tmpOutcomeGroupValues[o].id = Utils.getUniqueId();
                        var tmpogvSources = tmpOutcomeGroupValues[o].Sources;

                        for (var m = 0; m < tmpogvSources.length; m++) {
                            var ogvDatapoints = tmpogvSources[m].Datapoints;
                            for (var n = 0; n < ogvDatapoints.length; n++) {
                                var newOgvdpId = Utils.getUniqueId();
                                //ExtractData.Highlights.addHighlightByclone(ogvDatapoints[n].id, newOgvdpId);
                                ogvDatapoints[n].id = newOgvdpId;
                            }
                        }

                        for (var s = 0; s < tmpogvSources.length; s++) {
                            if (tmpogvSources[s].sourcename == ExtractData.Outcomes.SOURCENAMES.POPULATION) {
                                tmpogvSources[s].Datapoints[0].Value = OutcomeManager.getDefaultPopulationName(tmpOutcomeGroupValues[o].groupId);
                                tmpogvSources[s].Datapoints[1].Value = OutcomeManager.getDefaultPopulationValue(tmpOutcomeGroupValues[o].groupId);
                            }
                            if (tmpogvSources[s].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDTYPE) {
                                var Datapoints = tmpogvSources[s].Datapoints;
                                for (var d = 0; d < Datapoints.length; d++) {
                                    tmpogvSources[s].Datapoints[d].Name = "";
                                    tmpogvSources[s].Datapoints[d].Value = "";
                                }
                            }
                            if (tmpogvSources[s].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDVALUE) {
                                tmpogvSources[s].Datapoints[0].Value = "";
                            }
                        }
                    }
                }
                ExtractData.Outcomes.Data.push(outcomeObj);
                return outcomeObj;
            }

        return outcome;
    },
    OutcomeSet: function (outcome, outcomeSetObj) {
        var outcomeSet = {};
        if (typeof (outcomeSetObj) != "object") {
            outcomeSet =
            {
                id: Utils.getUniqueId(),
                OutcomeGroupValues: [],
                Sources: []
            };
            outcome.OutcomeSets.push(outcomeSet);
        }
        else {
            outcomeSet = outcomeSetObj;
        }
        outcomeSet.setTimePoint = function (id, type) {
            this.OutcomeGroupValues.forEach(function (o) {
                o.setTimePoint(id, type)
            })
        };

        outcomeSet.setPopulation = function (lable, value) {
            this.OutcomeGroupValues.forEach(function (o) {
                o.setPopulation(lable, value);
            });
        };
        outcomeSet.setPopulationWithin = function (lable, value) {
            this.OutcomeGroupValues.forEach(function (o) {
                o.setPopulationWithin(lable, value);
            });
        };

        outcomeSet.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }
            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }

            source.Datapoints.push(datapoint);

            // Add same code as group
        };
        outcomeSet.getOutcomeGroupValueById = function (id, outcomeGroupValueObj) {
            for (var i = 0; i < this.OutcomeGroupValues.length; i++) {
                if (this.OutcomeGroupValues[i].id == id) {
                    return ExtractData.Create.OutcomeGroupValues(outcomeSet, this.OutcomeGroupValues[i]);
                }
            }
        };

        outcomeSet.getOutcomeGroupValueBygroupId = function (id, outcomeGroupValueObj) {
            for (var i = 0; i < this.OutcomeGroupValues.length; i++) {
                if (this.OutcomeGroupValues[i].groupId == id) {
                    return ExtractData.Create.OutcomeGroupValues(outcomeSet, this.OutcomeGroupValues[i]);
                }
            }
        };

        outcomeSet.clone = function (outcome) {
            var objOutcomeSet = {};
            outcome.OutcomeSets.push(objOutcomeSet);
            objOutcomeSet.id = Utils.getUniqueId();
            objOutcomeSet.OutcomeGroupValues = JSON.parse(JSON.stringify(this.OutcomeGroupValues));
            objOutcomeSet.Sources = JSON.parse(JSON.stringify(this.Sources));

            var tmpSrouces = objOutcomeSet.Sources;
            for (var i = 0; i < tmpSrouces.length; i++) {
                var tmpDatapoints = tmpSrouces[i].Datapoints;
                for (var j = 0; j < tmpDatapoints.length; j++) {
                    var newDPId = Utils.getUniqueId();
                    ExtractData.Highlights.addHighlightByclone(tmpDatapoints[j].id, newDPId);
                    tmpDatapoints[j].id = newDPId;
                }
            }

            var me = this;
            var ogv = objOutcomeSet.OutcomeGroupValues;

            for (var i = 0; i < ogv.length; i++) {

                ogv[i].id = Utils.getUniqueId();
                ogv[i].Values = [];

                var ogvSources = ogv[i].Sources;
                for (var s = 0; s < ogvSources.length; s++) {
                    ogvDatapoints = ogvSources[s].Datapoints;
                    for (var d = 0; d < ogvDatapoints.length; d++) {
                        var newDPId = Utils.getUniqueId();
                        ExtractData.Highlights.addHighlightByclone(ogvDatapoints[d].id, newDPId);
                        ogvDatapoints[d].id = newDPId;
                    }
                }
                for (var j = 0; j < ogv[i].Sources.length; j++) {

                    if (ogv[i].Sources[j].sourcename == ExtractData.Outcomes.SOURCENAMES.POPULATION) {
                        ogv[i].Sources[j].Datapoints[0].Value = OutcomeManager.getDefaultPopulationName(ogv[i].groupId);
                        ogv[i].Sources[j].Datapoints[1].Value = OutcomeManager.getDefaultPopulationValue(ogv[i].groupId);
                    }
                    if (ogv[i].Sources[j].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDTYPE) {
                        var Datapoints = ogv[i].Sources[j].Datapoints;
                        for (var d = 0; d < Datapoints.length; d++) {
                            ogv[i].Sources[j].Datapoints[d].Name = "";
                            ogv[i].Sources[j].Datapoints[d].Value = "";
                        }
                    }
                    if (ogv[i].Sources[j].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDVALUE) {
                        ogv[i].Sources[j].Datapoints[0].Value="";
                    }
                }
            }

            return ExtractData.Create.OutcomeSet(outcome, objOutcomeSet);
        };
        outcomeSet.deleteByGroupId = function (groupId) {
            for (var i = 0; i < this.OutcomeGroupValues.length; i++) {
                if (groupId == this.OutcomeGroupValues[i].groupId) {
                    delete this.OutcomeGroupValues[i];
                    this.OutcomeGroupValues.splice(i, 1);
                    return;
                }
            }
        };

        outcomeSet.deleteFieldValue = function (arr) {
            this.OutcomeGroupValues.forEach(function (o) {
                o.deleteFieldValue(arr);
            });
        };
        return outcomeSet;
    },
    OutcomeGroupValues: function (outcomeSet, outcomeGroupValuesObj) {
        var outcomeGroupValue = {};
        if (typeof (outcomeGroupValuesObj) != "object") {
            outcomeGroupValue = {
                id: Utils.getUniqueId(),
                groupId: 1,
                timepoint: { id: 1, type: "common" },
                Values: [],
                Sources: []
            };
            outcomeSet.OutcomeGroupValues.push(outcomeGroupValue);
        }
        else {
            outcomeGroupValue = outcomeGroupValuesObj;
        }

        outcomeGroupValue.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }

            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }
            source.Datapoints.push(datapoint);
        };
        outcomeGroupValue.addValue = function (valuename, values) {

            for (var i = 0; i < this.Values.length; i++) {
                if (this.Values[i].name == valuename) {
                    this.Values.splice(i, 1);
                    break;
                }
            }

            var value = {
                name: valuename,
                value: values
            };
            this.Values.push(value);
            return this.Values;
        };
        outcomeGroupValue.setTimePoint = function (id, type) {
            if (type == null || type == undefined) {
                type = "alone";
            }
            if (this.timepoint.type != "alone") {
                this.timepoint.id = id;
            }
        };
        outcomeGroupValue.setPopulation = function (lable, value) {
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == ExtractData.Outcomes.SOURCENAMES.POPULATION) {
                    this.Sources[i].Datapoints[0].Value = lable;
                    this.Sources[i].Datapoints[1].Value = value;
                }
            }
        };

        outcomeGroupValue.setPopulationWithin = function (lable, value) {
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == ExtractData.Outcomes.SOURCENAMES.POPULATION) {

                    this.Sources[i].Datapoints[0].Value = lable;
                    this.Sources[i].Datapoints[0].type = "alone";
                    if (this.Sources[i].Datapoints[1].type != "alone") {
                        this.Sources[i].Datapoints[1].Value = value;
                    }
                }
            }
        };

        outcomeGroupValue.clone = function (outcomeSet) {

            var objGroupVals = {};
            objGroupVals.id = Utils.getUniqueId();
            objGroupVals.groupId = this.groupId;
            objGroupVals.timepoint = JSON.parse(JSON.stringify({ id: ExtractData.Phases.Data[0].id, type: "common" }));
            objGroupVals.Values = [];
            objGroupVals.Sources = JSON.parse(JSON.stringify(this.Sources));

            for (var i = 0; i < objGroupVals.Sources.length; i++) {
                if (objGroupVals.Sources[i].sourcename == ExtractData.Outcomes.SOURCENAMES.POPULATION) {
                    var dp = objGroupVals.Sources[i].Datapoints;
                    dp[0].Value = defaultName || "";
                    dp[1].Value = defaultValue || "";
                }
                if (objGroupVals.Sources[i].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDTYPE) {
                    var Datapoints = objGroupVals.Sources[i].Datapoints;
                    for (var d = 0; d < Datapoints.length; d++) {
                        Datapoints[d].Name = "";
                        Datapoints[d].Value = "";
                    }
                }
                if (objGroupVals.Sources[i].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDVALUE) {
                    var Values = objGroupVals.Sources[i].Datapoints[0].Value;
                    Values = "";
                }
            }

            outcomeSet.OutcomeGroupValues.push(objGroupVals);
            return ExtractData.Create.OutcomeGroupValues(outcomeSet, objGroupVals);
        };

        outcomeGroupValue.deleteFieldValue = function (arr) {
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDVALUE) {
                    var newSources = jQuery.extend(true, {}, this.Sources[i]);
                    var dp = newSources.Datapoints[0];
                    var arrValue = jQuery.extend(true, {}, dp);
                    var arrcnt = [];
                    for (var j = 0; j < dp.Value.length; j++) {
                        if (arr.indexOf(dp.Value[j].Name) == -1) {
                            for (var t = 0; t < arrValue.Value.length; t++) {
                                var strName = arrValue.Value[t].Name;
                                if (strName == dp.Value[j].Name) {
                                    arrValue.Value.splice(t, 1);
                                    break;
                                }
                            }
                        }
                    }
                    this.Sources[i].Datapoints[0].Value = arrValue.Value;
                    break;
                }
            }
        }
        return outcomeGroupValue;
    },
    PropertySet: function (propSet) {

        var propertySet = {};

        if (typeof (propSet) != "object") {
            propertySet =
            {
                id: Utils.getUniqueId(),
                armId: "",
                type: "",
                isAdded: false,
                pValue: 0,
                amType: "",
                amValue: "",
                CIPercent: "",
                CIValue: "",
                left: [],
                right: [],
                Sources: []
            }
            ExtractData.PropertySets.Data.push(propertySet);
        }
        else {
            propertySet = propSet;
        }


        propertySet.addToLeft = function (groupId, outcomeId, outcomeSetId) {
            var obj = {
                groupId: groupId,
                outcomeId: outcomeId,
                outcomeSetId: outcomeSetId
            }
            this.left.push(obj);
            return obj;
        };
        propertySet.addToRight = function (groupId, outcomeId, outcomeSetId) {
            var obj = {
                groupId: groupId,
                outcomeId: outcomeId,
                outcomeSetId: outcomeSetId
            }
            this.right.push(obj);
            return obj;
        }
        propertySet.addDPToSource = function (sourcename, datapoint) {
            var source;
            for (var i = 0; i < this.Sources.length; i++) {
                if (this.Sources[i].sourcename == sourcename) {
                    source = this.Sources[i];
                    break;
                }
            }
            if (source == (undefined || null)) {
                source = { sourcename: sourcename, Datapoints: [] };
                this.Sources.push(source);
            }
            source.Datapoints.push(datapoint);
        }
        return propertySet;
    },
};
ExtractData.getSource = function (sourcename) {
    var source;
    for (var i = 0; i < ExtractData.StudyLevel.Data.length; i++) {
        if (ExtractData.StudyLevel.Data[i].sourcename == sourcename) {
            source = ExtractData.StudyLevel.Data[i];
            break;
        }
    }
    if (source == (undefined || null)) {
        source = { sourcename: sourcename, Datapoints: [] };
        ExtractData.StudyLevel.Data.push(source);
    }
    return source;
}
ExtractData.getDataPointByName = function (sourceObj, sourcename, dpName) {

    var dp = {};
    var source = ExtractData.getSourceOthers(sourceObj, sourcename);
    for (var j = 0; j < source.Datapoints.length; j++) {
        if (source.Datapoints[j].Name == dpName) {
            dp = source.Datapoints[j];
            break;
        }
    }

    if (Object.keys(dp).length === 0) {
        var dpVal = '';
        if (dpName == "notReported") {
            dpVal = true;
        } else {
            dpVal = '';
        }

        dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, dpName, dpVal, ExtractData.STATE.ADDED, 1, 1);
        source.Datapoints.push(dp);
    }
    return dp;
}
ExtractData.getDataPointByNameRowColumn = function (sourceObj, sourcename, dpName, rowNo, columnNo) {
    var source = ExtractData.getSourceOthers(sourceObj, sourcename);
    var dp = {};

    //for (var i = 0; i < sourceObj.Sources.length; i++) {
    //    if (sourceObj.Sources[sourcename][i].Name == dpName && sourceObj.Sources[sourcename][i].Row == rowNo && sourceObj.Sources[sourcename][i].Column == columnNo) {
    //        dp = sourceObj.Sources[sourcename][i];
    //        break;
    //    }
    //}

    for (var i = 0; i < sourceObj.Sources.length; i++) {
        if (sourceObj.Sources[i].sourcename == sourcename) {
            for (var j = 0; j < sourceObj.Sources[i].Datapoints.length; j++) {
                if (sourceObj.Sources[i].Datapoints[j].Name == dpName && sourceObj.Sources[i].Datapoints[j].Row == rowNo && sourceObj.Sources[i].Datapoints[j].Column == columnNo) {
                    dp = sourceObj.Sources[i].Datapoints[j];
                    break;
                }
            }
        }
    }

    if (Object.keys(dp).length == 0) {
        dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, dpName, '', ExtractData.STATE.ADDED, rowNo, columnNo);
        sourceObj.addDPToSource(sourcename, dp);

    }

    return dp;

}
ExtractData.getSourceOthers = function (sourceObj, sourcename) {
    var source;
    for (var i = 0; i < sourceObj.Sources.length; i++) {
        if (sourceObj.Sources[i].sourcename == sourcename) {
            source = sourceObj.Sources[i];
            break;
        }
    }
    if (source == (undefined || null)) {
        source = { sourcename: sourcename, Datapoints: [] };
        sourceObj.Sources.push(source);
    }
    return source;
}
ExtractData.deleteDatapoints = function (sourceObj, sourcename, dpId) {
    var source = ExtractData.getSourceOthers(sourceObj, sourcename);
    if (!Ext.isEmpty(source) && !Ext.isEmptyObj(source)) {
        for (var i = 0; i < source.Datapoints.length; i++) {
            if (source.Datapoints[i].id == dpId) {
                delete source.Datapoints[i];
                source.Datapoints.splice(i, 1);
                return;
            }
        }
    }
}
ExtractData.getDataPointByFTName = function (sourceObj, sourcename, dpName, dpValue) {

    var dp = {};
    var source = ExtractData.getSourceOthers(sourceObj, sourcename);
    for (var j = 0; j < source.Datapoints.length; j++) {
        if (source.Datapoints[j].Name == dpName) {
            dp = source.Datapoints[j];
            dp.Value = dpValue;
            break;
        }
    }

    if (Object.keys(dp).length === 0) {
        dp = { Name: dpName, Value: dpValue };
        source.Datapoints.push(dp);
    }

    return dp;
}
ExtractData.getDPByName = function (sourceObj, sourcename, dpName, rowNo) {
    var source = ExtractData.getSourceOthers(sourceObj, sourcename);
    var dp = {};

    for (var i = 0; i < sourceObj.Sources.length; i++) {
        if (sourceObj.Sources[i].sourcename == sourcename) {
            for (var j = 0; j < sourceObj.Sources[i].Datapoints.length; j++) {
                if (sourceObj.Sources[i].Datapoints[j].Name == dpName && sourceObj.Sources[i].Datapoints[j].Row == rowNo) {
                    dp = sourceObj.Sources[i].Datapoints[j];
                    break;
                }
            }
        }
    }

    return dp;

}

ExtractData.getDataPointById = function (sourceObj, sourcename, dpid) {

    var source = ExtractData.getSourceOthers(sourceObj, sourcename);
    var dp;

    for (var i = 0; i < source.Datapoints.length; i++) {
        if (source.Datapoints[i].id == dpid) {
            dp = source.Datapoints[i];
            break;
        }
    }

    if (dp == (undefined || null)) {
        dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, '', '', ExtractData.STATE.ADDED, 1, 1);
        source.Datapoints.push(dp);
    }
    return dp;
}

ExtractData.getUsedTimepointIds = function () {
    var timepointIDs = [];
    var od = ExtractData.Outcomes.Data;
    for (var i = 0; i < od.length; i++) {
        var os = od[i].OutcomeSets;
        for (var j = 0; j < os.length; j++) {
            var ogv = os[j].OutcomeGroupValues;
            for (var k = 0; k < ogv.length; k++) {
                var tid = ogv[k].timepoint.id;
                if (timepointIDs.length > 0) {
                    if (timepointIDs.indexOf(tid) == -1) {
                        timepointIDs.push(tid);
                    }
                }
                else {
                    timepointIDs.push(tid);
                }
            }
        }
    }
    return timepointIDs;
}

ExtractData.setTimepointId = function (tid) {

    var od = ExtractData.Outcomes.Data;
    for (var i = 0; i < od.length; i++) {
        var os = od[i].OutcomeSets;
        for (var j = 0; j < os.length; j++) {
            var ogv = os[j].OutcomeGroupValues;
            for (var k = 0; k < ogv.length; k++) {
                if (ogv[k].timepoint.id == tid) {
                    ogv[k].timepoint.id = 0;
                }
            }
        }
    }
}

ExtractData.Highlights = {

    Data: [],

    createHighlight: function (cmp, event) {
        if (event.ctrlKey || event.shiftKey || event.metaKey) {


            if (cmp.isHighlightSupport) {
                var currentHighlight = {}

                if (top.winOpen.highlightManager != undefined) {
                    currentHighlight = top.winOpen.highlightManager.currentHighlight;
                }
                else {
                    currentHighlight = top.HighlightManager.currentHighlight;
                }

                if (!cmp.highlights) cmp.highlights = [];
                if (currentHighlight != "" && currentHighlight != undefined) {
                    if (event.ctrlKey || event.metaKey) {
                        var val = (cmp.getValue() == null || cmp.getValue() == "") ? "" : cmp.getValue() + " ";
                        if (cmp.name == "cmbFrequency") {
                            var arr = [];
                            arr = cmp.getValue();
                            arr.push(currentHighlight.selectedText);
                            cmp.setValue(arr);
                        }
                        else {
                            if (cmp.isCalloutField != true) {
                                cmp.setValue(val + currentHighlight.selectedText);
                            }
                        }


                        if (top.winOpen.highlightManager != undefined) {
                            cmp.highlights.push(JSON.stringify(top.winOpen.highlightManager.currentHighlight));
                            if (Ext.isEmpty(cmp.sourceObj) || Ext.isEmptyObj(cmp.sourceObj)) {
                                var dp = ExtractData.StudyLevel.getDataPointById(cmp.source, "0");
                                ExtractData.Highlights.pushHighlightData(cmp, top.winOpen.highlightManager.currentHighlight);
                            }
                        }
                        else {
                            cmp.highlights.push(JSON.stringify(top.HighlightManager.currentHighlight));
                            //ExtractData.Highlights.addHighlight(this.dp.id, top.HighlightManager.currentHighlight);
                            ExtractData.Highlights.pushHighlightData(cmp, top.HighlightManager.currentHighlight);
                        }


                    }
                    else if (event.shiftKey) {
                        if (top.winOpen.highlightManager != undefined) {
                            cmp.highlights.push(JSON.stringify(top.winOpen.highlightManager.currentHighlight));
                            ExtractData.Highlights.pushHighlightData(cmp, top.winOpen.highlightManager.currentHighlight);
                        }
                        else {
                            cmp.highlights.push(JSON.stringify(top.HighlightManager.currentHighlight));
                            ExtractData.Highlights.pushHighlightData(cmp, top.HighlightManager.currentHighlight);
                        }

                        ////this.noteEl.show();
                        ////this.setNote(this.note + " " + currentHighlight.selectedText);
                        ////var cmp = this;
                        //redoLayout(cmp);
                    }

                    if (top.winOpen.highlightManager != undefined) {
                        top.winOpen.highlightManager.currentHighlight = "";
                    }
                    else {
                        top.HighlightManager.currentHighlight = "";
                    }

                }
                if (event.ctrlKey || event.shiftKey || event.metaKey) {
                    if (cmp.highlights.length > 0) {
                        top.item = cmp;
                        ////cmp.addCls("inputHasHighlight");
                        ExtractData.Highlights.setHighlightFieldColor(cmp, true);
                        //redoLayout(cmp);
                        if (!Ext.isEmpty(cmp.callouts)) {
                            if (cmp.callouts[0].isHidden() == false) {
                                cmp.callouts[0].hide();
                            }
                        }
                        createHighlightCallout(cmp);
                    }
                    else {
                        //cmp.removeCls("inputHasHighlight");
                        ExtractData.Highlights.setHighlightFieldColor(cmp, false);
                    }
                }

                function redoLayout(item) {
                    var me = item;


                    if (me.xtype != 'htmleditor') {
                        while (true) {
                            //var d = Con.StudyPanel.studyLevel().body.dom;
                            me = me.up();
                            if (me.xtype == "fieldcontainer" || me.xtype == "fieldset" || me.xtype == "container" || me.xtype == "myNoteCallout" || me.xtype == "myGeneralCallout") {
                                me.doLayout();
                                //d.scrollTop = d.scrollHeight - d.offsetHeight + 20;
                                break;
                            }
                        }
                    }
                }
                function createHighlightCallout(item) {
                    var highlightData = [];
                    for (var i = 0; i < item.highlights.length; i++) {
                        if (Utils.typeof(item.highlights[i]) == 'Object') {
                            highlightData.push({ "displayText": item.highlights[i].selectedText, "rawText": JSON.stringify(item.highlights[i]) });
                        } else {
                            highlightData.push({ "displayText": JSON.parse(item.highlights[i]).selectedText, "rawText": item.highlights[i] });
                        }
                    }
                    var me = item;
                    var callout = Ext.net.Callout.show(item,
                        {
                            xtype: "callout", hideDelay: 500, alignment: "bottomleft", trigger: "focus", bodyWidget: {
                            cls: "highlightlist", tpl: Ext.create("Ext.net.XTemplate", {
                                html: ["<h3>Highlights</h3>", "<ul>", "<tpl for=\".\">", "<li>", "<div style='max-height: 80px; overflow-y: auto; overflow-x: hidden;'>{displayText}</div>", "</li>", "</tpl>", "</ul>", ""]
                            }), width: 250, xtype: "dataview", itemSelector: "li", overItemCls: "highlightover",
                            store: { autoLoad: false, fields: [{ name: "displayText" }, { name: "rawText" }] }, trackOver: true, listeners: {
                                itemclick: {
                                    fn: function (item, record, node, index, e) {
                                        top.isSetOnLoad = true;
                                        top.HighlightManager.createHighlight(record.data.rawText);

                                        top.HighlightManager.getElementInView(record.data.rawText);
                                        //item.callout.calloutOwner.setValue(record.data.displayText);
                                        this.callout.itemclicked = true;
                                        if (e.ctrlKey || e.metaKey) {
                                            if (record.prevText) {
                                                var id = JSON.parse(record.get("rawText")).highlightid;
                                                for (var i = 0; i < me.highlights.length; i++) {
                                                    var data = '';
                                                    if (Utils.typeof(me.highlights[i]) == 'Object') {
                                                        data = me.highlights[i];
                                                    } else {
                                                        data = JSON.parse(me.highlights[i]);
                                                    }
                                                    if (!Ext.isEmpty(data)) {
                                                        if (data.highlightid == id) {
                                                            me.highlights.splice(i, 1);
                                                            var propType = 'Value';
                                                            if (!Ext.isEmpty(me.dPFieldtoUpdate)) {
                                                                propType = me.dPFieldtoUpdate;
                                                            }
                                                            ExtractData.Highlights.deleteFromHighlights(me.entity.id, propType, id);
                                                            break;
                                                        }
                                                    }
                                                }
                                                item.store.remove(record);
                                                if (item.store.getCount() == 0) {
                                                    delete this.callout.itemclicked;
                                                    //me.removeCls("inputHasHighlight");
                                                    ExtractData.Highlights.setHighlightFieldColor(me, false);
                                                    window.setTimeout(function () {
                                                        item.callout.hide();
                                                    }, 200);
                                                }
                                            }
                                            else {
                                                record.prevText = record.get("displayText");
                                                record.set("displayText", "Ctrl+Click to Confirm Delete. Single Click to Undo.");
                                            }
                                        }
                                        else {
                                            if (record.prevText) {
                                                var prevText = record.prevText;
                                                delete record.prevText;

                                                record.set("displayText", prevText);

                                                node.classList.remove("highlightoverred");
                                            }
                                        }

                                    }
                                },
                                itemupdate: {
                                    fn: function (record, index, node, index, e) {
                                        if (record.prevText) {
                                            node.classList.add("highlightoverred");
                                        }
                                        else {
                                            node.classList.remove("highlightoverred");
                                        }

                                    }
                                },
                            }
                        }, bodyStyle: "padding:2px 0px;",
                            listeners: {
                                beforehide: {
                                    fn: function (item) {
                                        if (item.itemclicked) {
                                            delete item.itemclicked;
                                            item.calloutOwner.focus();
                                            return false;
                                        }
                                        top.HighlightManager.clearHighlight();
                                        if (ExtractData.IsHighlightonPDFPage) {
                                            ExtractData.Highlights.restoreHighlights();
                                        }
                                    }
                                },
                                hide: {
                                    buffer: 100,
                                    fn: function (item) {
                                        this.destroy();
                                    }
                                }
                            }
                        }, true);

                    callout.bodyWidget.store.removeAll();
                    callout.bodyWidget.store.add(highlightData);
                    callout.show();
                    top.highlights = item.highlights;
                }
            }
            else if (cmp.isHighlightSupport == false) {
                Ext.Msg.show({
                    title: 'Highlight not supported',
                    msg: 'This field does not support highlight.',
                    buttons: Ext.Msg.OK, buttonText: { ok: "OK" },
                    icon: Ext.Msg.ERROR
                });
            }


        }
    },

    pushHighlightData: function (item, highlightData) {
        var propType = 'Value';
        if (!Ext.isEmpty(item.dPFieldtoUpdate)) {
            propType = item.dPFieldtoUpdate;
        }
        ExtractData.Highlights.addHighlight(item.entity.id, propType, highlightData);
    },

    addHighlight: function (entityId, propType, currentHightlight) {
        var source;
        for (var i = 0; i < this.Data.length; i++) {
            if (this.Data[i].entityId == entityId && this.Data[i].propType == propType) {
                source = this.Data[i];
                break;
            }
        }
        if (source == (undefined || null)) {
            source = { entityId: entityId, propType: propType, highlightData: [] };
            this.Data.push(source);
        }
        source.highlightData.push(currentHightlight);

        if (!Ext.isEmpty(this.Data)) {
            top.Request.Study.insertHighlightText(JSON.stringify(this.Data), Utils.parseQueryString(window.location).taskId);
        }
    },

    getHighlight: function (entityId, propType) {
        var source = [];
        for (var i = 0; i < this.Data.length; i++) {
            if (this.Data[i].entityId == entityId && this.Data[i].propType == propType) {
                source = this.Data[i];
                break;
            }
        }
        return source;
    },

    setHighlights: function (data) {

        if (!Ext.isEmpty(data) && data != 'null') {
            ExtractData.Highlights.Data = JSON.parse(data);
        }
    },

    restoreHighlights: function () {
        top.isSetOnLoad = true;
        for (var i = 0; i < ExtractData.Highlights.Data.length; i++) {
            var hData = ExtractData.Highlights.Data[i].highlightData;
            for (var j = 0; j < hData.length; j++) {
                top.HighlightManager.restoreHighlight(JSON.stringify(hData[j]));
            }
        }
        top.isSetOnLoad = false;
    },

    deleteFromHighlights: function (entityId, propType, highlightId) {
        var source = ExtractData.Highlights.getHighlight(entityId, propType);
        if (!Ext.isEmpty(source)) {
            for (var i = 0; i < source.highlightData.length; i++) {
                var data = source.highlightData[i];
                if (data.highlightid == highlightId) {
                    source.highlightData.splice(i, 1);
                    break;
                }
            }
            if (!Ext.isEmpty(this.Data)) {
                top.Request.Study.insertHighlightText(JSON.stringify(this.Data), Utils.parseQueryString(window.location).taskId);
            }
        }
    },

    setHighlightFieldColor: function (item, isAddCls) {
        if (!Ext.isEmpty(item) && !Ext.isEmpty(item)) {
            if (!Ext.isEmpty(item.inputId) && !Ext.isEmpty(item.inputId)) {
                if (isAddCls) {
                    $('#' + item.inputId).addClass("inputHasHighlight");
                } else {
                    $('#' + item.inputId).removeClass("inputHasHighlight");
                }
            }
        }
    },


    /****************  Added by Vinesh Patel  Date : 13-Nov-2014 for outcome Highlight clone and outcomeSet Highlight clone ***************/
    getHighlightById: function (entityId) {
        var source = [];
        for (var i = 0; i < this.Data.length; i++) {
            if (this.Data[i].entityId == entityId) {
                source.push(this.Data[i]);
            }
        }
        return source;
    },

    addHighlightByclone: function (entityId, newEntityID) {

        var hData = this.getHighlightById(entityId);
        if (hData != undefined && hData.length > 0) {
            for (var i = 0; i < hData.length; i++) {
                var newObject = jQuery.extend(true, {}, hData[i]);
                newObject.entityId = newEntityID;
                var highlightData = newObject.highlightData;
                for (var j = 0; j < highlightData.length; j++) {
                    highlightData[j].highlightid = new Date().getTime();
                }
                this.Data.push(newObject);
            }
        }
    }
    /****************  Added by Vinesh Patel  Date : 13-Nov-2014 for outcome Highlight clone and outcomeSet Highlight clone ***************/
}

ExtractData.Flags = {
    SOURCENAMES: {
        FLAG_STUDY_OBJECTIVE: "Flag_Study_Objective",
        FLAG_STUDY_POWER: "Flag_Study_Power",
        FLAG_STUDY_STATISTICS: 'Flag_Study_Statistics',
        FLAG_STUDY_DOCUMENT: 'Flag_Study_Document',
        FLAG_STUDY_YEAR: 'Flag_Study_Year',
        FLAG_STUDY_TYPE: 'Flag_Study_Type',
        FLAG_STUDY_DESIGN: 'Flag_Study_Design',
        FLAG_STUDY_PHASE: 'Flag_Study_Phase',
        FLAG_STUDY_FUNDING: 'Flag_Study_Funding',
        FLAG_CRITERIA: 'Flag_Criteria',
        FLAG_STUDY_SETTING: 'Flag_Study_Setting',
        FLAG_STUDY_AUTHOR_CONTACT_INFORMATION: 'Flag_Study_Author_Contact_Information',
        FLAG_GROUP: 'Flag_Group',
        FLAG_GROUP_INTERVENTIONS: 'Flag_Group_Interventions',
        FLAG_FREQUENCY_REPORT: 'Flag_Frequency_Report'
    }
}

ExtractData.TaskDetails = {
    Data: [],
    CurrentUserRoles: '',

    setTaskData: function (data) {
        if (!Ext.isEmpty(data) && data != 'null') {
            ExtractData.TaskDetails.Data = JSON.parse(data).TaskDetail;
            ExtractData.TaskDetails.CurrentUserRoles = JSON.parse(data).UserRole;
        }
        Con.StudyTab.configureButtons();
    },

    fillUserStore: function (isQCUserlist) {

        isQCUserlist = typeof isQCUserlist !== 'undefined' ? isQCUserlist : false;

        if (isQCUserlist == false) {
            function setUserList(data, param) {
                if (!Ext.isEmpty(data)) {
                    storeUserList.removeAll();
                    var d = JSON.parse(data);

                    storeUserList.add(d);
                    //for (var i = 0; i < d.length; i++) {
                    //    storeUserList.add({
                    //        UserId: d[i].UserId,
                    //        UserName: d[i].UserName
                    //    });
                    //}
                }
            }
            var params = {};
            params.IsQCUserlist = isQCUserlist;

            top.Request.User.getUsersWithPermission(params, setUserList);
        } else {
            function setQCUserList(data, param) {
                if (!Ext.isEmpty(data)) {
                    storeQCUserList.removeAll();
                    var d = JSON.parse(data);

                    storeQCUserList.add(d);
                    //for (var i = 0; i < d.length; i++) {
                    //    storeQCUserList.add({
                    //        UserId: d[i].UserId,
                    //        UserName: d[i].UserName
                    //    });
                    //}
                }
            }

            var params = {};
            params.IsQCUserlist = isQCUserlist;

            top.Request.User.getUsersWithPermission(params, setQCUserList);
        }
    }
}

ExtractData.Migration = ExtractData.Migration ? ExtractData.Migration : {};

ExtractData.Migration = {

    updateMigratedData: function (AssignRefId, data) {

        DM.updateStudyData(AssignRefId, JSON.stringify(data), {
            success: function (e) {
                console.log('Migration done for Assign Reference Id: ' + AssignRefId);
            },
            failure: function (e) {
                console.log(e);
            },
            timeout: 18000000
        });
    },

}

ExtractData.Migration.Version1 = {

    startMigration: function () {
        var ed = ExtractData;

        //ed.Migration.getDataforMigration(1);

        ////var str;
        ////DM.getMigrationData(
        ////{
        ////    success: function (e) {
        ////        if (!Ext.isEmpty(e)) {
        ////            str = JSON.parse(e);
        ////            console.log(str);
        ////            for (var i = 0; i < str.length; i++) {
        ////                var AssRefId = str[i].AssignedReferenceID;
        ////                //console.log("Task Id : " + AssRefId);
        ////                ed.Migration.Version1.getDataforMigration(AssRefId);
        ////            }
        ////            console.log('Successfully completed migration for Total Text Extraction: ' + str.length);
        ////        }
        ////    },
        ////    failure: function (e) {
        ////        console.log(e);
        ////    },
        ////    timeout: 1800000
        ////});
    },

    createObjectInSourceDatapointFormat: function (source, datapoints) {
        ////var obj = {};
        ////obj.sourcename = source;
        ////obj.Datapoints = [];
        ////for (var i = 0; i < datapoints.length; i++) {
        ////    obj.Datapoints.push(datapoints[i]);
        ////}
        ////return obj;
    },

    migrate: function (AssignRefId, studyData) {
        ////var ed = ExtractData;

        ////var pStr = JSON.parse(studyData);

        ////pStr.forEach(function (i) {
        ////    switch (i.type) {
        ////        case ed.Sources.STUDYLEVEL:
        ////            //if (Utils.typeof(i.data) == 'Object') {
        ////            //    var migData = ed.Migration.Version1.migrateStudyLevel(i.data);
        ////            //    if (!Ext.isEmpty(migData)) {
        ////            //        delete i.data;
        ////            //        i.data = migData;
        ////            //    }
        ////            //}
        ////            //break;
        ////        case ed.Sources.GROUPS:
        ////            //for (var j = 0; j < i.data.length; j++) {
        ////            //    var migData = ed.Migration.Version1.migrateGroup(i.data[j]);
        ////            //    if (!Ext.isEmpty(migData)) {
        ////            //        i.data.splice(j, 1);
        ////            //        i.data.splice(j, 0, migData);
        ////            //    }
        ////            //}
        ////            //break;
        ////        case ed.Sources.PHASES:

        ////            break;
        ////        case ed.Sources.OUTCOMES:
        ////            /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/
        ////            for (var j = 0; j < i.data.length; j++) {
        ////                var migData = ed.Migration.Version1.migrateOutcome(i.data[j]);
        ////                if (!Ext.isEmpty(migData)) {
        ////                    i.data.splice(j, 1);
        ////                    i.data.splice(j, 0, migData);
        ////                }
        ////            }
        ////            /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/
        ////            break;
        ////        case ed.Sources.TIMEPOINT:

        ////            break;
        ////        case ed.Sources.PROPERTYSETS:

        ////            break;
        ////    }
        ////});
        ////ExtractData.Migration.Version1.updateMigratedData(AssignRefId, pStr);
        //ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },

    migrateStudyLevel: function (data) {
        ////var Sources = [];
        ////for (var src in data) {
        ////    if (src != 'undefined') {
        ////        var obj = ExtractData.Migration.Version1.createObjectInSourceDatapointFormat(src, data[src]);
        ////        //obj.sourcename = src;
        ////        //obj.Datapoints = [];
        ////        //for (var i = 0; i < data[src].length; i++) {
        ////        //    obj.Datapoints.push(data[src][i]);
        ////        //}
        ////        Sources.push(obj);
        ////    }
        ////}
        ////return Sources;
    },

    migrateGroup: function (data) {
        ////var grp = {};
        ////for (var src in data) {
        ////    var grpItem = data[src];

        ////    if (Utils.typeof(grpItem) == 'String') {
        ////        grp[src] = grpItem;
        ////    }
        ////    else if (Utils.typeof(grpItem) == 'Object') {
        ////        if (src == 'Datapoints') {
        ////            if (grp.Sources == (undefined || null)) {
        ////                grp.Sources = [];
        ////            }
        ////            for (var itm in grpItem) {
        ////                var obj = ExtractData.Migration.Version1.createObjectInSourceDatapointFormat(itm, grpItem[itm]);
        ////                grp.Sources.push(obj);
        ////            }
        ////        }
        ////        else if (src == 'Participants') {
        ////            if (grp.Participants == (undefined || null)) {
        ////                grp.Participants = [];
        ////            }
        ////            var m = { Gender: 'Male', Number: '', Percentage: '', id: Utils.getUniqueId() };
        ////            var f = { Gender: 'Female', Number: '', Percentage: '', id: Utils.getUniqueId() };
        ////            var u = { Gender: 'Unknown', Number: '', Percentage: '', id: Utils.getUniqueId() };
        ////            grp.Participants.push(m);
        ////            grp.Participants.push(f);
        ////            grp.Participants.push(u);
        ////        }
        ////    }
        ////    else if (Utils.typeof(grpItem) == 'Array') {

        ////        if (src == 'Sources') {

        ////            grp.Sources = grpItem;

        ////            var isArmPop = false;
        ////            var isArmAge = false;
        ////            for (var j = 0; j < grpItem.length; j++) {
        ////                if (grpItem[j].sourcename == ExtractData.Groups.SOURCENAMES.ARM_POPULATION) {
        ////                    isArmPop = true;
        ////                }
        ////                else if (grpItem[j].sourcename == ExtractData.Groups.SOURCENAMES.ARM_POPULATION_AGE) {
        ////                    isArmAge = true;

        ////                    if (grpItem[j].Datapoints.length == 0) {
        ////                        var dp1 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Age Field Type', '', ExtractData.STATE.ADDED, 1, 1);
        ////                        var dp2 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Age Field Value', '', ExtractData.STATE.ADDED, 1, 2);
        ////                        var dp3 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Unit', '', ExtractData.STATE.ADDED, 1, 3);
        ////                        grpItem[j].Datapoints.push(dp1);
        ////                        grpItem[j].Datapoints.push(dp2);
        ////                        grpItem[j].Datapoints.push(dp3);
        ////                    }
        ////                }
        ////            }

        ////            if (isArmPop == false) {
        ////                var objAP = {};
        ////                objAP.sourcename = ExtractData.Groups.SOURCENAMES.ARM_POPULATION;
        ////                objAP.Datapoints = [];

        ////                var dp1 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'n Type', '', ExtractData.STATE.ADDED, 1, 1);
        ////                var dp2 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'n Value', '', ExtractData.STATE.ADDED, 1, 2);
        ////                var dp3 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Default', false, ExtractData.STATE.ADDED, 1, 3);
        ////                objAP.Datapoints.push(dp1);
        ////                objAP.Datapoints.push(dp2);
        ////                objAP.Datapoints.push(dp3);
        ////                grp.Sources.push(objAP);
        ////            }

        ////            if (isArmAge == false) {
        ////                var objAA = {};
        ////                objAA.sourcename = ExtractData.Groups.SOURCENAMES.ARM_POPULATION_AGE;
        ////                objAA.Datapoints = [];

        ////                var dp1 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Age Field Type', '', ExtractData.STATE.ADDED, 1, 1);
        ////                var dp2 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Age Field Value', '', ExtractData.STATE.ADDED, 1, 2);
        ////                var dp3 = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Unit', '', ExtractData.STATE.ADDED, 1, 3);
        ////                objAA.Datapoints.push(dp1);
        ////                objAA.Datapoints.push(dp2);
        ////                objAA.Datapoints.push(dp3);
        ////                grp.Sources.push(objAA);
        ////            }
        ////        }
        ////        else if (src == 'Participants') {
        ////            //if (grp.Participants == (undefined || null)) {
        ////            grp.Participants = grpItem;
        ////            //}
        ////        }
        ////        else if (src == 'InterventionSets') {
        ////            if (grp.InterventionSets == (undefined || null)) {
        ////                grp.InterventionSets = [];
        ////            }
        ////            for (var i = 0; i < grpItem.length; i++) {
        ////                var intSetObj = {};
        ////                var intSetsItem = grpItem[i];
        ////                for (var its in intSetsItem) {
        ////                    var inSet = intSetsItem[its];

        ////                    if (Utils.typeof(inSet) == 'String') {
        ////                        intSetObj[its] = inSet;
        ////                    }
        ////                    else if (Utils.typeof(inSet) == 'Object') {
        ////                        if (its == 'Datapoints') {
        ////                            if (intSetObj.Sources == (undefined || null)) {
        ////                                intSetObj.Sources = [];
        ////                            }

        ////                            for (var itm in inSet) {
        ////                                var obj = ExtractData.Migration.Version1.createObjectInSourceDatapointFormat(itm, inSet[itm]);
        ////                                intSetObj.Sources.push(obj);
        ////                            }
        ////                        }
        ////                    }
        ////                    else if (Utils.typeof(inSet) == 'Array') {
        ////                        if (its == 'Sources') {
        ////                            //if (intSetObj.Sources == (undefined || null)) {
        ////                            intSetObj.Sources = inSet;
        ////                            //}
        ////                        }
        ////                        else if (its == 'Interventions') {
        ////                            if (intSetObj.Interventions == (undefined || null)) {
        ////                                intSetObj.Interventions = [];
        ////                            }

        ////                            for (var j = 0; j < inSet.length; j++) {
        ////                                var intObj = {};
        ////                                var intItems = inSet[j];
        ////                                for (var intItem in intItems) {
        ////                                    var intr = intItems[intItem];

        ////                                    if (Utils.typeof(intr) == 'String') {
        ////                                        intObj[intItem] = intr;
        ////                                    }
        ////                                    else if (Utils.typeof(intr) == 'Object') {
        ////                                        if (intItem == 'Datapoints') {
        ////                                            if (intObj.Sources == (undefined || null)) {
        ////                                                intObj.Sources = [];
        ////                                            }

        ////                                            for (var itm in intr) {
        ////                                                var obj = ExtractData.Migration.Version1.createObjectInSourceDatapointFormat(itm, intr[itm]);
        ////                                                intObj.Sources.push(obj);
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                    else if (Utils.typeof(intr) == 'Array') {
        ////                                        if (intItem == 'Sources') {
        ////                                            //if (intObj.Sources == (undefined || null)) {
        ////                                            intObj.Sources = intr;
        ////                                            //}

        ////                                            //for (var k = 0; k < intr.length; k++) {
        ////                                            //    if (intr[k].sourcename == ExtractData.Groups.SOURCENAMES.DOSAGE) {

        ////                                            //    }
        ////                                            //}
        ////                                        }
        ////                                    }
        ////                                }
        ////                                intSetObj.Interventions.push(intObj);
        ////                            }
        ////                        }
        ////                    }
        ////                }
        ////                grp.InterventionSets.push(intSetObj);
        ////            }
        ////        }
        ////    }
        ////}

        ////return grp;
    },

    /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/
    migrateOutcome: function (data) {

        //var outcomeSet = data.OutcomeSets;
        //var source = data.Sources;
        //var subGroup = [];
        //var rater = {};

        //// if (source != undefined && source.length > 0) {
        //for (var s = 0; s < source.length; s++) {
        //    if (source[s].sourcename == ExtractData.Outcomes.SOURCENAMES.OTHERS) {
        //        var datapoints = source[s].Datapoints;
        //        for (var d = 0; d < datapoints.length; d++) {
        //            if (datapoints[d].Name == "Rater") {
        //                rater = jQuery.extend(true, {}, datapoints[d]);
        //                datapoints.splice(d, 1);
        //                break;
        //            }
        //        }
        //        break;
        //    }
        //}

        //for (var s = 0; s < source.length; s++) {
        //    if (source[s].sourcename == ExtractData.Outcomes.SOURCENAMES.SUBGROUPS) {

        //        if (outcomeSet.length > 0) {
        //            for (var os = 0; os < outcomeSet.length; os++) {
        //                var subObje = jQuery.extend(true, {}, source[s]);
        //                var dp = subObje.Datapoints;
        //                for (var dc = 0; dc < dp.length; dc++) {
        //                    if (os != 0) {
        //                        var newDPId = Utils.getUniqueId();
        //                        var newObject = jQuery.extend(true, {}, dp[dc]);
        //                        newObject.id = newDPId;
        //                        dp.splice(dc, 1);
        //                        dp.splice(dc, 0, newObject);
        //                    }
        //                }
        //                subGroup.push(subObje);
        //            }
        //        }
        //        source.splice(s, 1);
        //        break;
        //    }
        //}
        //// }
        //for (var l = 0; l < outcomeSet.length; l++) {
        //    var sources = outcomeSet[l].Sources;
        //    if (sources != undefined)
        //        sources.push(subGroup[l]);
        //}

        //for (var k = 0; k < outcomeSet.length; k++) {
        //    var sources = outcomeSet[k].Sources;
        //    for (var s = 0; s < sources.length; s++) {
        //        if (sources[s].sourcename == ExtractData.Outcomes.SOURCENAMES.OTHERS) {
        //            var datapoints = sources[s].Datapoints;
        //            if (k != 0) {
        //                var newDPId = Utils.getUniqueId();
        //                var newObject = jQuery.extend(true, {}, rater);
        //                newObject.id = newDPId;
        //                datapoints.push(newObject);
        //            }
        //            else {
        //                datapoints.push(rater);
        //            }
        //            break;
        //        }
        //    }
        //    for (var s = 0; s < sources.length; s++) {
        //        if (sources[s].sourcename == ExtractData.Outcomes.SOURCENAMES.OTHERS) {
        //            var datapoints = sources[s].Datapoints;
        //            for (var d = 0; d < datapoints.length; d++) {
        //                if (datapoints[d].Name == "ABC") {
        //                    datapoints[d].Name = "Location";
        //                    break;
        //                }
        //            }
        //            break;
        //        }
        //    }
        //}
        //return data;
    },

    /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/

    getDataforMigration: function (AssignRefId) {
        ////var ed = ExtractData;

        ////DM.getStudyDataForMigration(AssignRefId, {
        ////    success: function (e) {
        ////        if (!Ext.isEmpty(e)) {
        ////            ed.Migration.Version1.migrate(AssignRefId, e);
        ////        }
        ////    },
        ////    failure: function (e) {
        ////        console.log(e);
        ////    },
        ////    timeout: 1800000
        ////});
    },

    //updateMigratedData: function (AssignRefId, data) {
    //    ////DM.updateStudyData(AssignRefId, JSON.stringify(data), {
    //    ////    success: function (e) {
    //    ////        console.log('Migration done for Assign Reference Id: ' + AssignRefId);
    //    ////    },
    //    ////    failure: function (e) {
    //    ////        console.log(e);
    //    ////    },
    //    ////    timeout: 1800000
    //    ////});
    //},

}

ExtractData.Migration.Version2 = {

    startMigration: function () {
        ////var ed = ExtractData;
        //////ed.Migration.Version2.getDataforMigration(1255);
        ////var str;
        ////DM.getMigrationData(
        ////{
        ////    success: function (e) {
        ////        if (!Ext.isEmpty(e)) {
        ////            str = JSON.parse(e);
        ////            //console.log(str);
        ////            for (var i = 0; i < str.length; i++) {
        ////                var AssRefId = str[i].AssignedReferenceID;
        ////                ed.Migration.Version2.getDataforMigration(AssRefId);
        ////            }
        ////            console.log('Successfully completed migration for Total Text Extraction: ' + str.length);
        ////        }
        ////    },
        ////    failure: function (e) {
        ////        console.log(e);
        ////    },
        ////    timeout: 1800000
        ////});
    },

    createObjectInSourceDatapointFormat: function (source, datapoints) {
        ////var obj = {};
        ////obj.sourcename = source;
        ////obj.Datapoints = [];
        ////for (var i = 0; i < datapoints.length; i++) {
        ////    obj.Datapoints.push(datapoints[i]);
        ////}
        ////return obj;
    },

    migrate: function (AssignRefId, studyData) {
        ////var ed = ExtractData;

        ////var pStr = JSON.parse(studyData);

        ////pStr.forEach(function (i) {
        ////    switch (i.type) {
        ////        case ed.Sources.STUDYLEVEL:
        ////            for (var j = 0; j < i.data.length; j++) {
        ////                if (!Ext.isEmpty(i.data[j].sourcename)) {
        ////                    if (i.data[j].sourcename.indexOf('Flag_') != -1) {
        ////                        var migData = ed.Migration.Version2.migrateFlagStudyLevel(i.data[j]);
        ////                        //if (!Ext.isEmpty(migData)) {
        ////                        //console.log("StudyLevel: " + AssignRefId);
        ////                        //JSON.stringify(i.data[j]);
        ////                        //}
        ////                    }
        ////                }
        ////            }
        ////            break;
        ////        case ed.Sources.GROUPS:
        ////            for (var j = 0; j < i.data.length; j++) {
        ////                var grpLvlSrc = i.data[j].Sources;
        ////                for (var k = 0; k < grpLvlSrc.length; k++) {
        ////                    if (!Ext.isEmpty(grpLvlSrc[k].sourcename)) {
        ////                        if (grpLvlSrc[k].sourcename.indexOf('Flag_') != -1) {
        ////                            var migData = ed.Migration.Version2.migrateFlagStudyLevel(grpLvlSrc[k]);
        ////                            //if (!Ext.isEmpty(migData)) {
        ////                            //    console.log("Group: " + AssignRefId);
        ////                            //    //JSON.stringify(src[k]);
        ////                            //}
        ////                        }
        ////                    }
        ////                }

        ////                var intSets = i.data[j].InterventionSets;
        ////                for (var k = 0; k < intSets.length; k++) {
        ////                    var intLvlSrc = intSets[k].Sources;
        ////                    for (var l = 0; l < intLvlSrc.length; l++) {
        ////                        if (!Ext.isEmpty(intLvlSrc[l].sourcename)) {
        ////                            if (intLvlSrc[l].sourcename.indexOf('Flag_') != -1) {
        ////                                var migData = ed.Migration.Version2.migrateFlagStudyLevel(intLvlSrc[l]);
        ////                                //if (!Ext.isEmpty(migData)) {
        ////                                //    console.log("Group: " + AssignRefId);
        ////                                //    //JSON.stringify(src[k]);
        ////                                //}
        ////                            }
        ////                        }
        ////                    }
        ////                }
        ////            }
        ////            break;
        ////        case ed.Sources.PHASES:
        ////            break;
        ////        case ed.Sources.OUTCOMES:
        ////            //for (var j = 0; j < i.data.length; j++) {
        ////            //    var migData = ed.Migration.Version2.migrateOutcome(i.data[j]);
        ////            //    if (!Ext.isEmpty(migData)) {
        ////            //        i.data.splice(j, 1);
        ////            //        i.data.splice(j, 0, migData);
        ////            //    }
        ////            //}
        ////            break;
        ////        case ed.Sources.PROPERTYSETS:

        ////            break;
        ////    }
        ////});
        //////ExtractData.Migration.Version2.updateMigratedData(AssignRefId, pStr);
        ////ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },

    createDP: function (dpName, row, column) {
        ////var dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, dpName, '', ExtractData.STATE.ADDED, row, column);
        //////var dp = ExtractData.StudyLevel.getDataPointById(sourceName, "0");
        //////dp.Name = dpName;
        //////dp.Value = dpValue;
        //////dp.Row = row;
        //////dp.Column = column;

        ////return dp;
    },

    migrateFlagStudyLevel: function (data) {
        ////var newData = [];
        ////for (var k = 0; k < data.Datapoints.length; k++) {
        ////    var extDP = data.Datapoints[k];

        ////    if (!(extDP.Name == "Flag Type")) {
        ////        var dpFlagType = ExtractData.Migration.Version2.createDP('Flag Type', (k + 1), 1);
        ////        var dpName = ExtractData.Migration.Version2.createDP('DP Name', (k + 1), 2);
        ////        var dpValue = ExtractData.Migration.Version2.createDP('DP Value', (k + 1), 3);
        ////        dpName.Value = extDP.Name;
        ////        dpValue.Value = extDP.Value;

        ////        if (data.sourcename == 'Flag_Study_Year') {
        ////            if (dpName.Value == "Study Years Type") {
        ////                dpName.Value = "Date Type";
        ////            }
        ////            if (dpName.Value == "Years") {
        ////                dpName.Value = "Date";
        ////            }
        ////        }

        ////        newData.push(dpFlagType);
        ////        newData.push(dpName);
        ////        newData.push(dpValue);
        ////    }
        ////}
        ////if (!Ext.isEmpty(newData)) {
        ////    data.Datapoints = [];
        ////    data.Datapoints = newData;
        ////}
        ////return newData;
    },

    migrateOutcome: function (data) {

        ////var oData = ExtractData.Outcomes.getOutcomeById(data.id);
        ////var outcomeSources = oData.Sources;
        ////var tmpOutcomeDP = [];

        ////for (var s = 0; s < outcomeSources.length; s++) {
        ////    if (outcomeSources[s] != null) {
        ////        if (outcomeSources[s].sourcename == ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR) {

        ////            var newOutcomeSources = jQuery.extend(true, {}, outcomeSources[s]);
        ////            var datapoints = newOutcomeSources.Datapoints;

        ////            if (datapoints.length > 0) {
        ////                for (var j = 0; j < datapoints.length; j++) {
        ////                    var dp = datapoints[j];
        ////                    if (!(dp.Name == "Flag Type")) {

        ////                        var dpFlagType = ExtractData.getDataPointByNameRowColumn(oData, ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR, "Flag Type", (j + 1), 1);
        ////                        var dpName = ExtractData.getDataPointByNameRowColumn(oData, ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR, "DP Name", (j + 1), 2);
        ////                        var dpValue = ExtractData.getDataPointByNameRowColumn(oData, ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR, "DP Value", (j + 1), 3);

        ////                        dpName.Value = dp.Name;
        ////                        dpValue.Value = dp.Value;

        ////                        tmpOutcomeDP.push(dpFlagType);
        ////                        tmpOutcomeDP.push(dpName);
        ////                        tmpOutcomeDP.push(dpValue);
        ////                    }
        ////                }
        ////            }
        ////            if (tmpOutcomeDP.length > 0)
        ////                outcomeSources[s].Datapoints = tmpOutcomeDP;
        ////            break;
        ////        }
        ////    }
        ////}

        ////var outcomeset = oData.OutcomeSets;

        ////for (var os = 0; os < outcomeset.length; os++) {

        ////    var oOutcomeset = oData.getOutcomeSetById(outcomeset[os].id);

        ////    var outcomesetSources = oOutcomeset.Sources;
        ////    for (var j = 0; j < outcomesetSources.length; j++) {

        ////        if (outcomesetSources[j] != null) {
        ////            if (outcomesetSources[j].sourcename == ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR) {

        ////                var newOutcomesetSources = jQuery.extend(true, {}, outcomesetSources[j]);
        ////                var datapoints = newOutcomesetSources.Datapoints;
        ////                var tmpOutcomesetDP = [];

        ////                for (var k = 0; k < datapoints.length; k++) {
        ////                    var dp = datapoints[k];
        ////                    if (!(dp.Name == "Flag Type")) {

        ////                        var dpFlagType = ExtractData.getDataPointByNameRowColumn(oOutcomeset, ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR, "Flag Type", (k + 1), 1);
        ////                        var dpName = ExtractData.getDataPointByNameRowColumn(oOutcomeset, ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR, "DP Name", (k + 1), 2);
        ////                        var dpValue = ExtractData.getDataPointByNameRowColumn(oOutcomeset, ExtractData.Outcomes.SOURCENAMES.AUTHOR_ERROR, "DP Value", (k + 1), 3);

        ////                        dpName.Value = dp.Name;
        ////                        dpValue.Value = dp.Value;

        ////                        tmpOutcomesetDP.push(dpFlagType);
        ////                        tmpOutcomesetDP.push(dpName);
        ////                        tmpOutcomesetDP.push(dpValue);
        ////                    }
        ////                }
        ////                if (tmpOutcomesetDP.length > 0)
        ////                    outcomesetSources[j].Datapoints = tmpOutcomesetDP;
        ////                break;
        ////            }
        ////        }
        ////    }
        ////}

        ////return JSON.parse(JSON.stringify(oData));
    },

    getDataforMigration: function (AssignRefId) {
        ////var ed = ExtractData;

        ////DM.getStudyDataForMigration(AssignRefId, {
        ////    success: function (e) {
        ////        if (!Ext.isEmpty(e)) {
        ////            ExtractData.setData(e);
        ////            ed.Migration.Version2.migrate(AssignRefId, e);
        ////        }
        ////    },
        ////    failure: function (e) {
        ////        console.log(e);
        ////    },
        ////    timeout: 1800000
        ////});
    },

    //updateMigratedData: function (AssignRefId, data) {
    //    ////DM.updateStudyData(AssignRefId, JSON.stringify(data), {
    //    ////    success: function (e) {
    //    ////        console.log('Migration done for Assign Reference Id: ' + AssignRefId);
    //    ////    },
    //    ////    failure: function (e) {
    //    ////        console.log(e);
    //    ////    },
    //    ////    timeout: 1800000
    //    ////});
    //},
}

ExtractData.Migration.Version3 = {

    startMigration: function () {
        // var ed = ExtractData;
        //// ed.Migration.Version3.getDataforMigration(926);

        // var str;
        // DM.getMigrationData(
        // {
        //     success: function (e) {
        //         if (!Ext.isEmpty(e)) {
        //             str = JSON.parse(e);
        //             console.log(str);
        //             for (var i = 0; i < str.length; i++) {
        //                 var AssRefId = str[i].AssignedReferenceID;
        //                 //console.log("Task Id : " + AssRefId);
        //                 ed.Migration.Version3.getDataforMigration(AssRefId);
        //             }
        //             console.log('Successfully completed migration for Total Text Extraction: ' + str.length);
        //         }
        //     },
        //     failure: function (e) {
        //         console.log(e);
        //     },
        //     timeout: 1800000
        // });
    },

    migrate: function (AssignRefId, studyData) {
        //var ed = ExtractData;

        //var pStr = JSON.parse(studyData);

        //pStr.forEach(function (i) {
        //    switch (i.type) {
        //        case ed.Sources.OUTCOMES:
        //            /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/
        //            for (var j = 0; j < i.data.length; j++) {
        //                var migData = ed.Migration.Version3.migrateOutcome(i.data[j]);
        //                if (!Ext.isEmpty(migData)) {
        //                    i.data.splice(j, 1);
        //                    i.data.splice(j, 0, migData);
        //                }
        //            }
        //            /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/
        //            break;
        //    }
        //});
        ////ExtractData.Migration.Version3.updateMigratedData(AssignRefId, pStr);
        //ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },

    /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/
    migrateOutcome: function (data) {

        //var oData = ExtractData.Outcomes.getOutcomeById(data.id);
        //var outcomeSources = oData.Sources;
        //var tmpOutcomeDP = [];
        //var outcomeset = oData.OutcomeSets;

        //for (var os = 0; os < outcomeset.length; os++) {
        //    var oOutcomeset = oData.getOutcomeSetById(outcomeset[os].id);
        //    var arr = OutcomeManager.getFieldTypePartForDeleted(oOutcomeset);
        //    var groupValue = oOutcomeset.OutcomeGroupValues;
        //    for (var ogv = 0; ogv < groupValue.length; ogv++) {
        //        var oGroupValues = oOutcomeset.getOutcomeGroupValueById(oOutcomeset.OutcomeGroupValues[ogv].id);
        //        oGroupValues.deleteFieldValue(arr);
        //    }
        //}

        //return JSON.parse(JSON.stringify(oData));
    },

    /*************************  Added by Vinesh Patel Date : 21/11/2014  Please do not remove it  *********************************/

    getDataforMigration: function (AssignRefId) {
        //var ed = ExtractData;

        //DM.getStudyDataForMigration(AssignRefId, {
        //    success: function (e) {
        //        if (!Ext.isEmpty(e)) {
        //            ExtractData.setData(e);
        //            ed.Migration.Version3.migrate(AssignRefId, e);
        //        }
        //    },
        //    failure: function (e) {
        //        console.log(e);
        //    },
        //    timeout: 1800000
        //});
    },

    //updateMigratedData: function (AssignRefId, data) {
    //    //DM.updateStudyData(AssignRefId, JSON.stringify(data), {
    //    //    success: function (e) {
    //    //        console.log('Migration done for Assign Reference Id: ' + AssignRefId);
    //    //    },
    //    //    failure: function (e) {
    //    //        console.log(e);
    //    //    },
    //    //    timeout: 1800000
    //    //});
    //},
}

ExtractData.Migration.Version4 = {
    // This migration is primarily created to add Dosage Type datapoint at second position in Dosage source - SR
    startMigration: function () {
        //var ed = ExtractData;
        //// ed.Migration.Version3.getDataforMigration(926);

        //var str;
        //DM.getMigrationData(
        //{
        //    success: function (e) {
        //        if (!Ext.isEmpty(e)) {
        //            str = JSON.parse(e);
        //            console.log(str);
        //            for (var i = 0; i < str.length; i++) {
        //                var AssRefId = str[i].AssignedReferenceID;
        //                //console.log("Task Id : " + AssRefId);
        //                ed.Migration.Version4.getDataforMigration(AssRefId);
        //            }
        //            console.log('Successfully completed migration for Total Text Extraction: ' + str.length);
        //        }
        //    },
        //    failure: function (e) {
        //        console.log(e);
        //    },
        //    timeout: 1800000
        //});
    },

    migrate: function (AssignRefId, studyData) {
        //var ed = ExtractData;
        //var pStr = JSON.parse(studyData);
        //pStr.forEach(function (i) {
        //    switch (i.type) {
        //        case ed.Sources.GROUPS:
        //            for (var j = 0; j < i.data.length; j++) {
        //                var migData = ed.Migration.Version4.migrateGroup(i.data[j]);
        //                if (!Ext.isEmpty(migData) && !Ext.isEmptyObj(migData)) {
        //                    i.data.splice(j, 1);
        //                    i.data.splice(j, 0, migData);
        //                }
        //            }
        //            break;
        //    }
        //});
        //ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },

    migrateGroup: function (data) {
        //var intSets = data.InterventionSets;
        //for (var k = 0; k < intSets.length; k++) {
        //    var ints = intSets[k].Interventions;
        //    for (var l = 0; l < ints.length; l++) {
        //        var intLvlSrc = ints[l].Sources;
        //        for (var m = 0; m < intLvlSrc.length; m++) {
        //            if (!Ext.isEmpty(intLvlSrc[m].sourcename)) {
        //                if (intLvlSrc[m].sourcename == ExtractData.Groups.SOURCENAMES.DOSAGE) {
        //                    var dsgAllDps = [];
        //                    //var dsgRwDps = [];
        //                    var rwWiseDsg = Utils.rowwiseDPList(intLvlSrc[m].Datapoints);
        //                    for (var n = 0; n < rwWiseDsg.length; n++) {
        //                        var dsgRwDps = rwWiseDsg[n];

        //                        var dsgTyp = $.grep(dsgRwDps, function (e) { return e.Name == 'Dosage Type' });

        //                        if (Ext.isEmpty(dsgTyp)) {
        //                            var rw = dsgRwDps[0].Row;
        //                            var dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, 'Dosage Type', '', ExtractData.STATE.ADDED, rw, 9);
        //                            dsgRwDps.splice(1, 0, dp);
        //                        } //else {
        //                          //  dsgRwDps.push()
        //                        //}

        //                        //if (n == rwWiseDsg.length) {
        //                        dsgAllDps.push(dsgRwDps);
        //                        //}
        //                    }

        //                    var d = [];
        //                    for (var r = 0; r < dsgAllDps.length; r++) {
        //                        for (var s = 0; s < dsgAllDps[r].length; s++) {
        //                            d.push(dsgAllDps[r][s]);
        //                        }
        //                    }

        //                    intLvlSrc[m].Datapoints = d;

        //                    break;
        //                }
        //            }
        //        }
        //    }
        //}

        //return data;
    },

    getDataforMigration: function (AssignRefId) {
        //var ed = ExtractData;

        //DM.getStudyDataForMigration(AssignRefId, {
        //    success: function (e) {
        //        if (!Ext.isEmpty(e)) {
        //            ExtractData.setData(e);
        //            ed.Migration.Version4.migrate(AssignRefId, e);
        //        }
        //    },
        //    failure: function (e) {
        //        console.log(e);
        //    },
        //    timeout: 1800000
        //});
    },

    //updateMigratedData: function (AssignRefId, data) {
    //    DM.updateStudyData(AssignRefId, JSON.stringify(data), {
    //        success: function (e) {
    //            console.log('Migration done for Assign Reference Id: ' + AssignRefId);
    //        },
    //        failure: function (e) {
    //            console.log(e);
    //        },
    //        timeout: 1800000
    //    });
    //},
}

ExtractData.Migration.Version5 = {
    // This migration is primarily created for changing case from Drug to Device/Surgery. - SR
    migrate: function (AssignRefId, studyData) {
        //var ed = ExtractData;
        //var pStr = JSON.parse(studyData);
        //pStr.forEach(function (i) {
        //    switch (i.type) {
        //        case ed.Sources.GROUPS:
        //            for (var j = 0; j < i.data.length; j++) {
        //                var migData = ed.Migration.Version5.migrateGroup(i.data[j]);
        //                if (!Ext.isEmpty(migData) && !Ext.isEmptyObj(migData)) {
        //                    i.data.splice(j, 1);
        //                    i.data.splice(j, 0, migData);
        //                }
        //            }
        //            break;
        //    }
        //});
        //ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },

    migrateGroup: function (data) {
        //var intSets = data.InterventionSets;
        //for (var k = 0; k < intSets.length; k++) {
        //    var ints = intSets[k].caseNo.sort().join();
        //    if (ints == 'case1,case3') {
        //        intSets[k].caseNo = ['case1', 'case7'];
        //    }
        //}
        //return data;
    },

    getDataforMigration: function (AssignRefId) {
        //var ed = ExtractData;

        ////var tIds = sessionStorage.taskidsForMigrateV5;

        ////if (tIds != '' && tIds != undefined && tIds != null) {

        ////var taskIds = tIds.split(',');

        ////for (var i = 0; i < taskIds.length; i++) {
        ////var AssignRefId = parseInt(taskIds[i]);

        ////if (AssignRefId > 0) {
        //DM.getStudyDataForMigration(AssignRefId, {
        //    success: function (e) {
        //        if (!Ext.isEmpty(e)) {
        //            ExtractData.setData(e);
        //            ed.Migration.Version5.migrate(AssignRefId, e);
        //        }
        //    },
        //    failure: function (e) {
        //        console.log(e);
        //    },
        //    timeout: 1800000
        //});
        ////}
        ////}
        ////}
    }
}




ExtractData.Migration.Version6 = {

    // This migration is primarily created to add Trial Outcome datapoint for study objective and also two seprate datapoint for existing datapoint row wise - SR

    startMigration: function () {
        //var ed = ExtractData;
        ////ed.Migration.Version6.getDataforMigration(1255);

        //var tIds = sessionStorage.taskidsForMigrateV6;

        //if (tIds != '' && tIds != undefined && tIds != null) {
        //    var taskIds = tIds.split(',');

        //    for (var i = 0; i < taskIds.length; i++) {

        //        var AssignRefId = parseInt(taskIds[i]);
        //        ed.Migration.Version6.getDataforMigration(AssignRefId);
        //    }

        //} else {
        //    var str;
        //    DM.getMigrationData(
        //    {
        //        success: function (e) {
        //            if (!Ext.isEmpty(e)) {
        //                str = JSON.parse(e);
        //                //console.log(str);
        //                for (var i = 0; i < str.length; i++) {
        //                    var AssRefId = str[i].AssignedReferenceID;
        //                    ed.Migration.Version6.getDataforMigration(AssRefId);
        //                }
        //                console.log('Successfully completed migration for Total Text Extraction: ' + str.length);
        //            }
        //        },
        //        failure: function (e) {
        //            console.log(e);
        //        },
        //        timeout: 18000000
        //    });
        //}
    },

    migrate: function (AssignRefId, studyData) {
        //var ed = ExtractData;

        //var pStr = JSON.parse(studyData);

        //pStr.forEach(function (i) {
        //    switch (i.type) {
        //        case ed.Sources.STUDYLEVEL:
        //            for (var j = 0; j < i.data.length; j++) {
        //                if (!Ext.isEmpty(i.data[j].sourcename)) {
        //                    if (i.data[j].sourcename == ExtractData.StudyLevel.SOURCENAMES.STUDY_OBJECTIVE) {
        //                        var migData = ed.Migration.Version6.migrateStudyObjective(i.data[j]);
        //                        console.log('The Migrated TaskId is : ' + AssignRefId);
        //                        //if (!Ext.isEmpty(migData)) {
        //                        //console.log("StudyLevel: " + AssignRefId);
        //                        //JSON.stringify(i.data[j]);
        //                        //}
        //                    }
        //                }
        //            }
        //            break;
        //        case ed.Sources.GROUPS:

        //            break;
        //        case ed.Sources.PHASES:
        //            break;
        //        case ed.Sources.OUTCOMES:
        //            break;
        //        case ed.Sources.PROPERTYSETS:
        //            break;
        //    }
        //});
        //ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },

    createDP: function (dpName, row, column) {
        //var dp = ExtractData.Create.DataPoint(ExtractData.VALUETYPE.MEMO, dpName, '', ExtractData.STATE.ADDED, row, column);
        //return dp;
    },

    migrateStudyObjective: function (data) {
        //var newData = [];
        //for (var k = 0; k < data.Datapoints.length; k++) {
        //    var extDP = data.Datapoints[k];

        //    if (extDP.Name != "Objective" && extDP.Name != "Objective Description" && extDP.Name != "Trial Outcome") {
        //        var dpObj = ExtractData.Migration.Version6.createDP('Objective', (k + 1), 1);
        //        var dpObjDesc = ExtractData.Migration.Version6.createDP('Objective Description', (k + 1), 2);
        //        var dpTrlOut = ExtractData.Migration.Version6.createDP('Trial Outcome', (k + 1), 3);
        //        dpObj.Value = extDP.Name;
        //        dpObjDesc.Value = extDP.Value;

        //        newData.push(dpObj);
        //        newData.push(dpObjDesc);
        //        newData.push(dpTrlOut);
        //    } else {
        //        newData.push(extDP);
        //    }
        //}
        //if (!Ext.isEmpty(newData)) {
        //    data.Datapoints = [];
        //    data.Datapoints = newData;
        //}
        //return newData;
    },

    getDataforMigration: function (AssignRefId) {
        //var ed = ExtractData;

        //DM.getStudyDataForMigration(AssignRefId, {
        //    success: function (e) {
        //        if (!Ext.isEmpty(e)) {
        //            ExtractData.setData(e);
        //            ed.Migration.Version6.migrate(AssignRefId, e);
        //        }
        //    },
        //    failure: function (e) {
        //        console.log(e);
        //    },
        //    timeout: 18000000
        //});
    }
}



ExtractData.Migration.Version7 = {

    startMigration: function () {
        var ed = ExtractData;
        // ed.Migration.Version3.getDataforMigration(926);

        var str;
        DM.getMigrationData(
            {
                success: function (e) {
                    if (!Ext.isEmpty(e)) {
                        str = JSON.parse(e);
                        console.log(str);
                        for (var i = 0; i < str.length; i++) {
                            var AssRefId = str[i].AssignedReferenceID;
                            //console.log("Task Id : " + AssRefId);
                            ed.Migration.Version7.getDataforMigration(AssRefId);
                        }
                        console.log('Successfully completed migration for Total Text Extraction: ' + str.length);
                    }
                },
                failure: function (e) {
                    console.log(e);
                },
                timeout: 1800000
            });
    },

    migrate: function (AssignRefId, studyData) {
        var ed = ExtractData;

        var pStr = JSON.parse(studyData);

        pStr.forEach(function (i) {
            switch (i.type) {
                case ed.Sources.OUTCOMES:

                    for (var j = 0; j < i.data.length; j++) {
                        var migData = ed.Migration.Version7.migrateOutcome(i.data[j]);
                        if (!Ext.isEmpty(migData)) {
                            i.data.splice(j, 1);
                            i.data.splice(j, 0, migData);
                        }
                    }

                    break;
            }
        });
        //ExtractData.Migration.Version3.updateMigratedData(AssignRefId, pStr);
        ExtractData.Migration.updateMigratedData(AssignRefId, pStr);
    },


    migrateOutcome: function (data) {

        var ed = ExtractData;

        var oset = data.OutcomeSets;
        for (var j = 0; j < oset.length; j++) {
            var ogv = oset[j].OutcomeGroupValues;

            for (var k = 0; k < ogv.length; k++) {
                var oSource = ogv[k].Sources;
                var groupId = ogv[k].groupId;
                //var grpName = me.getGroupNamebyGroupId(groupId);
                for (var s = 0; s < oSource.length; s++) {
                    if (oSource[s].sourcename == ExtractData.Outcomes.SOURCENAMES.FIELDVALUE) {
                        var oDatapoints = oSource[s].Datapoints;
                        var NRs = $.grep(oDatapoints, function (e) { return e.Name == "notReported" });


                        if (NRs.length > 0) {
                            if (Ext.isEmpty(NRs[0].Value)) {
                                NRs[0].Value = true;
                            }
                        }
                    }
                }
            }
        }

        // return JSON.parse(JSON.stringify(oData));
        return data;
    },



    getDataforMigration: function (AssignRefId) {
        var ed = ExtractData;

        DM.getStudyDataForMigration(AssignRefId, {
            success: function (e) {
                if (!Ext.isEmpty(e)) {
                    ExtractData.setData(e);
                    ed.Migration.Version7.migrate(AssignRefId, e);
                }
            },
            failure: function (e) {
                console.log(e);
            },
            timeout: 1800000
        });
    },

    //updateMigratedData: function (AssignRefId, data) {
    //    //DM.updateStudyData(AssignRefId, JSON.stringify(data), {
    //    //    success: function (e) {
    //    //        console.log('Migration done for Assign Reference Id: ' + AssignRefId);
    //    //    },
    //    //    failure: function (e) {
    //    //        console.log(e);
    //    //    },
    //    //    timeout: 1800000
    //    //});
    //},
}