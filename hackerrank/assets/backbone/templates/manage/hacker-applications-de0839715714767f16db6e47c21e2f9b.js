HR.appController.addTemplate("backbone/templates/manage/hacker-applications", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<style>\n.edit-contest\n{\n\n}\n.edit-contest .editor\n{\n  border-top-right-radius: 0px;\n  border-bottom-right-radius: 0px;\n  min-height: 200px;\n}\n.edit-contest .preview\n{\n  border:1px solid #CCC;\n  margin-left: 0px;\n  min-height: 200px;\n  float:none;\n  display: inline-block;\n  height: auto;\n  overflow-x:auto;\n  width:435px;\n  padding:10px 0 0 10px;\n  max-height: 600px;\n\n}\n.edit-contest .CodeMirror\n{\n  width:430px;\n  display: inline-block;\n  vertical-align: top;\n  border:1px solid #CCC;\n  box-shadow: 0 0 5px 0px #666 inset;\n  background-color: #FDFDFD;\n  font-size: 0.8em;\n  height: auto;\n  overflow-x:auto;\n  padding:5px;\n}\n.floating-message\n{\n  position:fixed;\n  top:10px;\n  right:0px;\n  z-index: 2000;\n  display: none;\n}\n</style>\n\n<section class="submissions container">\n  <header class="page-title container">\n    <div class="block">\n      <ul class="pull-left breadcrumb unstyled horizontal">\n          <li><a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + '/" class="backbone">HackerRank</a><i class="icon-right-open-big divider"></i></li>\n          <li><a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + '/manage/contest/" class="backbone">Hacker Applications</a><i class="icon-right-open-big divider"></i></li>\n      </ul>\n    </div>\n    <div class="row">\n        <h1 class="span16">\n            <div class="title-img"></div>\n            Hacker Applications\n        </h1>\n    </div>\n  </header>\n  <div class="row light-wrap wrap row" style="margin-left:0px; margin-top:20px;">\n    <div class="floating-message span6">\n      <div class="message span5" style="margin-left:20px; box-shadow:0 0 5px 0 #333">\n\n      </div>\n    </div>\n    <form class="edit-contest block-center" >\n      <div class="row block-center">\n        <div class="span2" style="padding:7px">\n          <lable>Filter By</label>\n        </div>\n        <div class="span3" style=" margin-left: 0px; ">\n          <div class="btn-group">\n            <a class="btn dropdown-toggle span2" data-toggle="dropdown" href="#">\n              <span data-title="country">Country</span>\n              <span class="caret"></span>\n            </a>\n            <ul class="dropdown-menu span2" style="margin:0px">\n              <li><a href="#" data-kind="country" data-filter="">All</a></li>\n              <li><a href="#" data-kind="country" data-filter="usa">US</a></li>\n              <li><a href="#" data-kind="country" data-filter="notusa">Non US</a></li>\n            </ul>\n          </div>\n        </div>\n        <div class="span3" style=" margin-left: 0px; ">\n          <div class="btn-group">\n            <a class="btn dropdown-toggle span2" data-toggle="dropdown" href="#">\n              <span data-title="visa">Visa Status</span>\n              <span class="caret"></span>\n            </a>\n            <ul class="dropdown-menu span3" style="margin:0px">\n              <li><a href="#" data-kind="visa" data-filter="">Any</a></li>\n              <li><a href="#" data-kind="visa" data-filter="valid">Valid VISA</a></li>\n              <li><a href="#" data-kind="visa" data-filter="not_valid">No VISA</a></li>\n            </ul>\n          </div>\n        </div>\n        <div class="span3" style=" margin-left: 0px; ">\n          <div class="btn-group">\n            <a class="btn dropdown-toggle span2" data-toggle="dropdown" href="#">\n              <span data-title="role">Role</span>\n              <span class="caret"></span>\n            </a>\n            <ul class="dropdown-menu span2" style="margin:0px">\n              <li><a href="#" data-kind="role" data-filter="">Any</a></li>\n              <li><a href="#" data-kind="role" data-filter="intern">Intern</a></li>\n              <li><a href="#" data-kind="role" data-filter="fulltime">Fulltime</a></li>\n            </ul>\n          </div>\n        </div>\n        <div class="span6 pull-right text-right" style="margin-left:0px;">\n          <a id="download" class="btn btn-blue span2" href="/rest/contests/' + (null == (__t = contest.get("slug")) ? "" :__t) + "/companies/" + (null == (__t = company) ? "" :__t) + "/hackerapplications/download_excel?key=" + (null == (__t = key) ? "" :__t) + '" >Download Excel</a>\n        </div>\n      </div>\n      <div class="row block-center" style="margin-top:10px;">\n        <div id="filter_text" class="span15" style="padding:7px;">\n\n        </div>\n      </div>\n      <div class="row block-center" style="margin-top:10px;">\n          <hr/>\n      </div>\n    </form>\n    <div class="applications-list-wrapper">\n        <div class="block-center text-center">\n          <img src="https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_64x64.gif"><br/><br/>\n          Please Wait while we fetch the applications\n        </div>\n    </div>\n    <div class="pagination-wrap clearfix pagination-wrapper" style="margin-bottom:20px;">\n    </div>\n  </div>\n</section>\n';
return __p;
});