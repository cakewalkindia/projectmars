/**
 * Created by SOHEB.RAPATI on 20-05-2015.
 */
Meteor.publish('StudyData', function(TaskId) {
    return textData.find({TaskId: {$in: ["3323","10674","14885"]}});
});