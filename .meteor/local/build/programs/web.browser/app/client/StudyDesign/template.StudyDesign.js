(function(){
Template.__checkName("StudyDesign");
Template["StudyDesign"] = new Template("Template.StudyDesign", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n\n            ", HTML.DIV({
    "class": "col-lg-10 col-md-10 col-sm-10 col-xs-10"
  }, "\n\n                ", HTML.Raw('<div class="box" id="set-general-scope">\n                    <div class="box-header widget-header">\n                        <h4 class="box-title " style="font-size: 16px;">\n                            <i class="title-icon fa fa-question"></i>\n                            <b>General Scope</b>\n                        </h4>\n\n                        <div class="pull-right">\n                            <i class="fa fa-caret-down "></i>\n                        </div>\n                    </div>\n                    <div class="box-body">\n                        <p>What are benefits and harms of complementary-alternative therapies for adults with Alzheimer\'s disease?</p>\n                    </div>\n                </div>'), "\n\n\n\n                ", HTML.DIV({
    "class": "box",
    id: "study-set-designs"
  }, "\n                    ", HTML.Raw('<div class="box-header widget-header">\n                        <h4 class="box-title " style="font-size: 16px;">\n                            <i class="title-icon fa fa-list-ol"></i>\n                            <b>Study Designs</b>\n                        </h4>\n\n                        <div class="pull-right">\n                            <i class="fa fa-caret-down "></i>\n                        </div>\n\n                        <div class="nav nav-pills pull-right btn-group sd-nav-bar" data-toggle="buttons"> <!--style="  margin-top: -28px;"-->\n                            <a class="btn btn-xs btn-primary" data-toggle="tab" href="#sd_list">\n                                <i class="fa fa-list-ul font-icon-color"></i>\n                            </a>\n\n                            <a class="btn btn-xs btn-primary active" data-toggle="tab" href="#sd_circle">\n                                <i class="fa fa-circle-o font-icon-color"></i>\n                            </a>\n\n                            <a class="btn btn-xs btn-primary" data-toggle="tab" href="#sd_bar">\n                                <i class="fa fa-bar-chart fa-6 font-icon-color"></i>\n                            </a>\n\n                            <a class="btn btn-xs btn-primary" data-toggle="tab" href="#sd_pie">\n                                <i class="fa fa-pie-chart font-icon-color"></i>\n                            </a>\n                        </div>\n                    </div>'), "\n                    ", HTML.DIV({
    "class": "box-body tab-content",
    style: "padding: 0px;"
  }, "\n                        ", HTML.Raw('<!--<div class="tab-content" >-->'), "\n                            ", HTML.DIV({
    id: "sd_list",
    "class": "tab-pane fade in "
  }, "\n                                ", HTML.TABLE({
    "class": "table alter-row",
    style: "margin-bottom: 0px !important;"
  }, "\n                                    ", HTML.TBODY("\n                                    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getDesignData"));
  }, function() {
    return [ "\n                                        ", HTML.TR("  ", HTML.Comment("class={{setRowColor}}"), "\n                                            ", HTML.TD({
      "class": "col-sm-3 studyName sdFont"
    }, Blaze.View("lookup:value", function() {
      return Spacebars.mustache(view.lookup("value"));
    })), "\n                                            ", HTML.TD({
      "class": "studyCount"
    }, Blaze.View("lookup:count", function() {
      return Spacebars.mustache(view.lookup("count"));
    })), "\n                                        "), "\n                                    " ];
  }), "\n                                    "), "\n                                "), "\n                            "), "\n\n                            ", HTML.Raw('<div id="sd_circle" class="tab-pane fade active">\n\n                            </div>'), "\n\n                            ", HTML.Raw('<div id="sd_bar" class="tab-pane fade">\n\n                            </div>'), "\n\n                            ", HTML.Raw('<div id="sd_pie" class="tab-pane fade">\n\n                            </div>'), "\n                        ", HTML.Raw("<!--</div>-->"), "\n                    "), "\n                "), "\n            "), HTML.Raw('\n            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">\n                <div class="box">\n                    <div class="box-header widget-header">\n                        <h4 class="box-title " style="font-size: 16px;">\n                            <i class="title-icon fa fa-book"></i><b>Contents</b></h4>\n                    </div>\n                    <div class="box-body">\n                        <div class="list-group">\n                            <a href="#set-general-scope" class="list-group-item"><i class="title-icon fa fa-question"></i><b>General Scope</b></a>\n                            <a href="#study-set-designs" class="list-group-item"><i class="title-icon fa fa-list-ol"></i><b>Study Designs</b></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        '));
}));

})();
