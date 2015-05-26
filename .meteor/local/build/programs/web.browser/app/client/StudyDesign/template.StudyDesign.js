(function(){
Template.__checkName("StudyDesign");
Template["StudyDesign"] = new Template("Template.StudyDesign", (function() {
  var view = this;
  return [ HTML.Raw("<p>Study design template</p>\n    "), HTML.DIV({
    "class": "container"
  }, "\n\n        ", HTML.DIV({
    "class": "panel panel-info",
    style: "margin-top: 5px;"
  }, "\n            ", HTML.Raw('<div class="panel-heading">\n                <h3 class="panel-title">\n                    <i class="fa fa-list-ol"></i> &nbsp;Study Designs</h3>\n                <ul class="nav nav-pills navbar-right" style="  margin-top: -28px;">\n                    <li>\n                        <a data-toggle="tab" href="#sd_list">\n                            <i class="fa fa-list-ul"></i>\n                        </a>\n                    </li>\n                    <li class="active">\n                        <a data-toggle="tab" href="#sd_circle">\n                            <i class="fa fa-circle-o"></i>\n                        </a>\n                    </li>\n                    <li>\n                        <a data-toggle="tab" href="#sd_bar">\n                            <i class="fa fa-bar-chart fa-6"></i>\n                        </a>\n                    </li>\n                    <li>\n                        <a data-toggle="tab" href="#sd_pie">\n                            <i class="fa fa-pie-chart"></i>\n                        </a>\n                    </li>\n                </ul>\n            </div>'), "\n            ", HTML.DIV({
    "class": "panel-body"
  }, "\n                ", HTML.DIV({
    "class": "tab-content",
    style: "margin-top: 40px;"
  }, "\n                    ", HTML.DIV({
    id: "sd_list",
    "class": "tab-pane fade "
  }, "\n                        ", HTML.TABLE({
    "class": "table studyDesignDataTable"
  }, "\n                            ", HTML.TBODY("\n                            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getDesignData"));
  }, function() {
    return [ "\n                                ", HTML.TR({
      "class": function() {
        return Spacebars.mustache(view.lookup("setRowColor"));
      }
    }, "\n                                    ", HTML.TD({
      "class": "col-sm-3 studyName sdFont"
    }, Blaze.View("lookup:value", function() {
      return Spacebars.mustache(view.lookup("value"));
    })), "\n                                    ", HTML.TD({
      "class": "studyCount"
    }, Blaze.View("lookup:count", function() {
      return Spacebars.mustache(view.lookup("count"));
    })), "\n                                "), "\n                            " ];
  }), "\n                            "), "\n                        "), "\n                    "), "\n\n                    ", HTML.Raw('<div id="sd_circle" class="tab-pane fade in active">\n\n                    </div>'), "\n\n                    ", HTML.Raw('<div id="sd_bar" class="tab-pane fade">\n\n                    </div>'), "\n\n                    ", HTML.Raw('<div id="sd_pie" class="tab-pane fade">\n\n                    </div>'), "\n                "), "\n            "), "\n        "), "\n\n\n\n    ") ];
}));

})();
