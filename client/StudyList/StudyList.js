/**
 * Created by SOHEB.RAPATI on 28-05-2015.
 */

Session.setDefault("StudyListData", []);
Session.setDefault("ReferenceId",0);

toggle_visibility = function(id) {

    var e = document.getElementById(id);
    if (e.style.display == 'block' || e.style.display=='') e.style.display = 'none';
    else e.style.display = 'block';
}



Template.StudyList.helpers({
    getStudyListData: function(){

        Meteor.call("getStudyListData",Session.get("PackageId") ,function(error,packageData){
            // console.log(error);
            // console.log(address);
            Session.set("StudyListData",(typeof(packageData) == 'string' ? JSON.parse(packageData) : packageData));

            setTimeout(function () {
                var table = $('#example1').dataTable( {
                    "bPaginate": true,
                    "sPaginationType": "full_numbers",
                    //"sPaginationType": "bs_full",
                    //"sPaginationType": "bootstrap",
                    "bInfo": true,
                    "bFilter": true,
                    "bDestroy": true
                    //"sAjaxDataProp": "ReferenceData",
                    //"sAjaxSource": "http://extractservices.doctorevidence.com/getStudyList/" + Session.get("PackageId"),
                    //aoColumns: [
                    //    { mData: 'ReferenceID'},
                    //    { mData: 'FirstName' },
                    //    { mData: 'Year'},
                    //    { mData: 'Year'},
                    //    { mData: 'Country'},
                    //    { mData: 'View'}
                    //]
                    //"sAjaxSource": Session.get("StudyListData")
                } );

                //$('#example1_filter')[0].childNodes[0].childNodes[0].placeholder='Search';
                //$('#example1_filter')[0].childNodes[0].childNodes[0].setAttribute('style','width:500px;')
            },0)

        });

        return Session.get("StudyListData");
    }
});


Template.StudyList.events({
    'click .clk-to-view': function () {
        var me=this;
        Session.set("ReferenceId", me.ReferenceID);
            //debugger
        Router.go('StudyDetail');
    }
});


Template.StudyList.rendered = function() {

    showHideBox();

    //////$('#example1').dataTable({"sPaginationType": "bs_full"});
    ////////j=$(".dataTables_filter");
    ////////j.find('input').addClass('form-control');
    //////
    ////////$('#example1').dataTable();
    //////
    //////// binding data table
    //var table = $('#example1').dataTable( {
    //    "bPaginate": true,
    //    //"sPaginationType": "full_numbers",
    //    "sPaginationType": "bs_full",
    //    //"sPaginationType": "bootstrap",
    //    "bInfo": true,
    //    "bFilter": true
    //    //"bDestroy": true,
    //    //"sAjaxDataProp": "ReferenceData",
    //    //"sAjaxSource": "http://extractservices.doctorevidence.com/getStudyList/" + Session.get("PackageId"),
    //    //aoColumns: [
    //    //    { mData: 'ReferenceID'},
    //    //    { mData: 'FirstName' },
    //    //    { mData: 'Year'},
    //    //    { mData: 'Year'},
    //    //    { mData: 'Country'},
    //    //    { mData: 'View'}
    //    //]
    //    //"sAjaxSource": Session.get("StudyListData")
    //} );
    //////
    ////////var table = $('#example').DataTable();
    ////////new $.fn.dataTable.FixedHeader( table );
    ////
    ////
    //////$(document).ready(function () {
    //////    $('#example1').dataTable();
    //////});

}