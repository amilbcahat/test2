HR.appController.addTemplate("backbone/templates/administration/contest-edit", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="admin contestedit container content_wrap">\n    <div class="container--inner">\n        <header class="page-title">\n            <div class="baseless-padded">\n                <div class="clearfix">\n                    <h1 class="pull-left">\n                        ', 
__p += "create" != action ? "\n                        " + (null == (__t = _model.name) ? "" :_.escape(__t)) + "\n                        " :"\n                        " + (null == (__t = _.capitalize(action)) ? "" :__t) + " Contest\n                        ", 
__p += '\n                    </h1>\n                    <div class="pull-right margin-small top">\n                        ', 
"create" != action && (__p += '\n                        <a target="_blank" href="/' + (null == (__t = _model.slug) ? "" :__t) + '" class="btn margin-small right">Preview Contest</a>\n                        '), 
__p += '\n                        <button class="save-contest btn btn-primary">Save Contest</button>\n                    </div>\n                </div>\n                <ul class="nav-tabs nav admin-tabbed-nav">\n                    <li data-tab="overview"><a class="cursor change-tab">Overview</a></li>\n                    <li data-tab="notification"><a class="cursor change-tab">Contest Notifications</a></li>\n                    ', 
"edit" == action && (__p += '\n                    <li data-tab="challenges"><a class="cursor change-tab">Add Challenges</a></li>\n                    <li data-tab="acm-prefs"><a class="cursor change-tab">ACM Prefs</a></li>\n                    '), 
__p += '\n                    <li class="pull-right no-tab">\n                        <a class="btn btn-text right-align backbone" href="/administration/contests">View all contests<i class="icon-right-open icon--right "></i></a>\n                    </li>\n                </ul>\n            </div>\n        </header>\n        <div class="tabs-body horizontal-padded">\n            <div class="tabs-body-inner"></div>\n        </div>\n    </div>\n</section>\n';
return __p;
});