
Session.setDefault("PackageData", []);
Session.setDefault("ClientId", 184);
Session.setDefault("PackageId", 3337);
Session.setDefault("PackageName", 'Alzheimer Disease');
Session.setDefault("ReferenceList", []);




Template.masterlayout.helpers({
   currentUser : function() {

       if (Meteor.user()) {
           return Meteor.user().emails[0].address;
       }
       return "Login";

   },

   getPackageData: function(){
        Meteor.call("getPackageData",Session.get("ClientId") ,function(error,packageData){
            // console.log(error);
            // console.log(address);
            Session.set("PackageData",(typeof(packageData) == 'string' ? JSON.parse(packageData) : packageData));
        });

        return Session.get("PackageData");
   },

   getPackageName: function () {
       return Session.get("PackageName");
   },

   isPackageSelected: function () {
       var me=this;
       var isSel=false;

       if(me.PackageID == Session.get("PackageId")){
           isSel=true;

           Meteor.call("getReferences",Session.get("PackageId") ,function(error,referenceData) {
               Session.set("ReferenceList",(typeof(referenceData) == 'string' ? JSON.parse(referenceData) : referenceData));

               if (SDSubscription != null) {
                   SDSubscription.stop();
               }

               SDSubscription=Meteor.subscribe('StudyData', Session.get('ReferenceList'));
           });
       }

       return isSel;
   }
});

Template.masterlayout.rendered = function(){

    $('body').addClass('skin-blue sidebar-mini sidebar-collapse');



    //Easy access to options
    var o = $.AdminLTE.options;


    //Activate the layout maker
    $.AdminLTE.layout.activate();

    //Enable sidebar tree view controls
    $.AdminLTE.tree('.sidebar');


    //Enable control sidebar
    if (o.enableControlSidebar) {
      $.AdminLTE.controlSidebar.activate();
    }

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
      $(".navbar .menu").slimscroll({
        height: o.navbarMenuHeight,
        alwaysVisible: false,
        size: o.navbarMenuSlimscrollWidth
      }).css("width", "100%");
    }

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
      $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
    }

    //Activate fast click
    if (o.enableFastclick && typeof FastClick != 'undefined') {
        FastClick.attach(document.body);
    }




};

Template.masterlayout.events({

    "click #aToggle"  :function(event, tpl){

        if ($('body').hasClass('sidebar-collapse') == true){
            $(".logo").html('Dre')
        } else
        {
            $(".logo").html('Doc Data')
        }


    },
    //"click #ulClasslist li a" : function(event , tpl){
    //    //console.log(event.target.text);
    //    tpl.find("#divClassSelected").innerHTML=event.target.text;
    //} ,

    "click #btnLogout" : function (event , tpl){

        Meteor.logout();
        Router.go('login');

    },

    "click .dropdownItemsBorder" : function (event, tpl) {
        var me = this;

        Session.set('PackageId', me.PackageID);
        Session.set('PackageName', me.PackageName);


        //tpl.find("#divClassSelected").innerHTML=event.target.text;
    }

});
