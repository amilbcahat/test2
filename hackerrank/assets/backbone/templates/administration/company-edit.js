HR.appController.addTemplate("backbone/templates/administration/company-edit", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="admin contestedit container content_wrap">\n    <div class="container--inner">\n        <header class="page-title">\n            <div>\n                <div class="clearfix">\n                    <h1 class="pull-left">\n                        ', 
__p += "create" != action ? "\n                        " + (null == (__t = _model.name) ? "" :_.escape(__t)) + "\n                        " :"\n                        " + (null == (__t = _.capitalize(action)) ? "" :__t) + " Company\n                        ", 
__p += '\n                    </h1>\n                    <div class="pull-right msT">\n                        ', 
"create" != action && (__p += '\n                        <!-- <a target="_blank" href="/' + (null == (__t = _model.slug) ? "" :__t) + '" class="btn margin-small right">Preview Challenge</a> -->\n                        '), 
__p += '\n                        <button class="save-company btn btn-green">Save Company</button>\n                    </div>\n                </div>\n                <ul class="nav-tabs nav admin-tabbed-nav">\n                    <li data-tab="overview"><a class="cursor change-tab">Overview</a></li>\n                    ', 
"edit" == action && (__p += '\n                    <li data-tab="positions"><a class="cursor change-tab">Positions</a></li>\n                    <li data-tab="offices"><a class="cursor change-tab">Offices</a></li>\n                    <li data-tab="applicants"><a class="cursor change-tab">Applicants</a></li>\n                    '), 
__p += '\n                    <li class="pull-right no-tab">\n                      <a class="btn btn-text alignR backbone"\n                         href="/administration/companies">View all companies<i class="icon-right-open icon--right "></i></a>\n                    </li>\n                </ul>\n            </div>\n        </header>\n        <div class="tabs-body">\n            <div class="tabs-body-inner"></div>\n        </div>\n    </div>\n</section>\n';
return __p;
});