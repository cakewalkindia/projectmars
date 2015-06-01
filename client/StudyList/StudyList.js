/**
 * Created by SOHEB.RAPATI on 28-05-2015.
 */

Session.setDefault("StudyListData", []);

toggle_visibility = function(id) {

    //var e = document.getElementById(id);
    //if (e.style.display == 'block' || e.style.display=='') e.style.display = 'none';
    //else e.style.display = 'block';
}



Template.StudyList.helpers({
    getStudyListData: function(){
        Meteor.call("getStudyListData",Session.get("PackageId") ,function(error,packageData){
            // console.log(error);
            // console.log(address);
            Session.set("StudyListData",(typeof(packageData) == 'string' ? JSON.parse(packageData) : packageData));
        });

        return Session.get("StudyListData");
    },

    getDataCount: function () {

        return Session.get("StudyListData").length;

    }
});

Template.StudyList.rendered = function() {

    ////j=$(".dataTables_filter");
    ////j.find('input').addClass('form-control');
    //
    ////$('#example1').dataTable();
    //
    //// binding data table
    //var table = $('#example1').dataTable( {
    //    "bPaginate": false,
    //    "bInfo": false,
    //    "bFilter": false,
    //    "bFixedHeader" : true
    //} );
    //
    ////var table = $('#example').DataTable();
    ////new $.fn.dataTable.FixedHeader( table );

}