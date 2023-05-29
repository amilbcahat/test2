HR.appController.addTemplate("backbone/templates/dashboard/college-contests", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="challenges-sorted-list">\n    <div class="table-wrap">\n        <header class="row row-flex psL psR">\n            <div class="span-flex-5">\n                Contest\n            </div>\n            <div class="span-flex-2">\n                Status\n            </div>\n            <div class="span-flex-3">\n                Date\n            </div>\n            <div class="span-flex-3">\n                Submissions\n            </div>\n            <div class="span-flex-3">\n                Organized by\n            </div>\n        </header>\n        <div class="table-body">\n            ', 
_.each(contests.models, function(contest) {
__p += '\n            <div class="row row-flex psL psR">\n                <div class="span-flex-5">\n                    <a href="/' + (null == (__t = contest.get("slug")) ? "" :__t) + '/challenges" class="backbone root">' + (null == (__t = contest.get("name")) ? "" :_.escape(__t)) + '</a>\n                </div>\n\n                <div class="span-flex-2">\n                    ', 
contest.get("ended") ? __p += '\n                    <span class="small"> Ended </span>\n                    ' :contest.get("started") ? __p += '\n                    <span class="small"> On Going </span>\n                    ' :contest.get("started") || (__p += '\n                    <span class="small"> Not Started Yet </span>\n                    '), 
__p += '\n                </div>\n\n                <div class="span-flex-3">\n                    <span class="small">' + (null == (__t = $.format.date(new Date(1e3 * contest.get("epoch_starttime")), "dd MMMM yyyy")) ? "" :__t) + '</span>\n                </div>\n\n                <div class="span-flex-3">\n                    <span class="small">' + (null == (__t = contest.get("submissions_count")) ? "" :__t) + '</span>\n                </div>\n                <div class="span-flex-3">\n                    <span class="small">' + (null == (__t = contest.get("college")) ? "" :__t) + "</span>\n                </div>\n            </div>\n            ";
}), __p += '\n        </div>\n        <div class="pagination-wrapper"></div>\n    </div>\n</div>\n';
return __p;
});