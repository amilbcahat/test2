HR.appController.addTemplate("backbone/templates/dashboard/track-contests", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", 0 === contests.length && contests.sync_status ? __p += '\n    <div class="tab-content" style="padding: 10px">\n        No contests available\n    </div>\n' :(__p += '\n    <div class="pull-left content_group--block content_side">\n        <div>\n            <header class="sidebar_cap msT">\n                Active Contests\n                <a href="/calendar" class="btn btn-link pull-right backbone" title="Full Programming Contest Calendar" rel="tooltip"><i class="icon-calendar icon--single"></i></a>\n            </header>\n            <div class="sidebar--block sidebar_list mlB psA">\n                <ul class="contests_list-active unstyled"></ul>\n            </div>\n        </div>\n        <div>\n            <header class="nav-tabs ungroup">\n                <li class="active"><a href="#recentContests" data-toggle="tab">Recent</a></li>\n            </header>\n            <div class="sidebar--block sidebar_list tab-content">\n                <div class="psA tab-pane active" id="recentContests">\n                <ul class="unstyled contests_list-archived"></ul>\n                </div>\n\n            </div>\n            <div class="text-center msT"><a href="/contests/archived" class="btn btn-link backbone">All archived contests<i class="icon--right icon-right-open"></i></a></div>\n        </div>\n    </div>\n    <div class="pull-right content_group--block content_primary tab-content">\n        <div class="content_header">\n            <!--<span class="bold challenge-breadcrumbs zeta small pull-left">All Contests</span>-->\n            ', 
contest ? (__p += '\n                <span class="bold challenge-breadcrumbs zeta small pull-left">\n                    ', 
__p += contest.get("started") ? contest.get("started") && !contest.get("ended") ? '\n                        <a href="/contests" class="zeta backbone">Active contests<i class="icon--right icon-right-open"></i></a>\n                    ' :'\n                        <a href="/contests/archived" class="zeta backbone">Archived contests<i class="icon--right icon-right-open"></i></a>\n                    ' :'\n                        <a href="/contests" class="zeta backbone">Active contests<i class="icon--right icon-right-open"></i></a>\n                    ', 
__p += '\n                    <a href="/contests/' + (null == (__t = contest.get("slug")) ? "" :__t) + '" class="zeta backbone">' + (null == (__t = contest.get("name")) ? "" :_.escape(__t)) + "</a>\n                </span>\n\n                ", 
contest.get("started") && contest.get("visible") && (__p += '\n                <div class="pull-right btn-group psT">\n                    ', 
"weekly" == contest.get("kind") && (__p += '\n                        <a href="/blog/daily-challenge" class="btn btn-link green" target="_blank">About weekly contest</a>\n                    '), 
__p += '\n                    <a href="/contests/' + (null == (__t = contest.get("slug")) ? "" :__t) + '/submissions" class="btn btn-link green backbone">Review Submissions</a>\n                    <a href="/contests/' + (null == (__t = contest.get("slug")) ? "" :__t) + '/leaderboard" class="btn btn-link green backbone">Leaderboard</a>\n                </div>\n                '), 
__p += "\n            ") :"archived" == contest_slug && (__p += '\n                <span class="bold challenge-breadcrumbs zeta small pull-left">\n                    <a href="/contests/archived" class="zeta backbone">Archived contests<i class="icon--right icon-right-open"></i></a>\n                </span>\n            '), 
__p += '\n        </div>\n\n        <div class="tab-pane active">\n            <div class="archived-contests"></div>\n            <div class="challenges-list"></div>\n            <div class="pagination-wrapper"></div>\n        </div>\n    </div>\n'), 
__p += "\n";
return __p;
});