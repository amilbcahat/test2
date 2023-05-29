HR.appController.addTemplate("backbone/templates/administration/challenge-edit", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="admin contestedit container content_wrap">\n    <div class="container--inner">\n        <header class="page-title">\n            <div>\n                <div class="clearfix">\n                    <h1 class="pull-left">\n                        ', 
__p += "create" != action ? "\n                        " + (null == (__t = _model.name) ? "" :_.escape(__t)) + "\n                        " :"\n                        " + (null == (__t = _.capitalize(action)) ? "" :__t) + " Challenge\n                        ", 
__p += '\n                    </h1>\n                    <div class="pull-right msT">\n                        ', 
"create" != action && (__p += '\n                        <!-- <a target="_blank" href="/' + (null == (__t = _model.slug) ? "" :__t) + '" class="btn margin-small right">Preview Challenge</a> -->\n                        '), 
__p += '\n                        <button class="save-challenge btn btn-green">Save Challenge</button>\n                    </div>\n                </div>\n                <ul class="nav-tabs nav admin-tabbed-nav">\n                    <li data-tab="overview"><a class="cursor change-tab">Overview</a></li>\n                    ', 
"edit" == action && (__p += '\n                    <li data-tab="testcases"><a class="cursor change-tab">Testcases</a></li>\n                    <li data-tab="languages"><a class="cursor change-tab">Languages</a></li>\n                    <li data-tab="custom-checker"><a class="cursor change-tab">Custom Checker</a></li>\n                    <li data-tab="flags"><a class="cursor change-tab">Flags</a></li>\n                    <li data-tab="editorial"><a class="cursor change-tab">Editorial</a></li>\n                    '), 
__p += '\n                    <li class="pull-right no-tab">\n                        ', 
__p += null !== contest_id ? '\n                        <a class="btn btn-text alignR backbone" href="/administration/contests/edit/' + (null == (__t = contest_id) ? "" :__t) + '/challenges">View ' + (null == (__t = contest.name) ? "" :__t) + ' challenges<i class="icon-right-open icon--right "></i></a>\n                        ' :'\n                        <a class="btn btn-text alignR backbone" href="/administration/challenges">View all challenges<i class="icon-right-open icon--right "></i></a>\n                        ', 
__p += '\n                    </li>\n                </ul>\n            </div>\n        </header>\n        <div class="tabs-body">\n            <div class="tabs-body-inner"></div>\n        </div>\n    </div>\n</section>\n';
return __p;
});