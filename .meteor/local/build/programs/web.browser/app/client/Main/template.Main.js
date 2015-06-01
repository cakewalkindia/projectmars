(function(){
Template.__checkName("Main");
Template["Main"] = new Template("Template.Main", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("StudyDesign"));
}));

})();
