HR.appController.addTemplate("backbone/templates/challenge-header", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<header class="page-title">\n    <div class="clearfix">\n        <h1 class="hr_tour-challenge-name pull-left">\n            ' + (null == (__t = model.preferred_challenge_name || model.name) ? "" :_.escape(__t)) + "\n            ", 
model.color && (__p += '\n                <span class="acm-challenge-balloon-large" style="background-color: ' + (null == (__t = model.color) ? "" :__t) + '"></span>\n            '), 
__p += "\n        </h1>\n        ", model.locked && (__p += '\n        <div class="pull-right challenge-title-note">\n            <a rel="tooltip" data-original-title="Any furthur submissions will not be considered for leaderboard." id="locked-popover" class="active-link pull-right">\n              <small class="label label-important"><i class="icon-lock"></i>locked</small>\n            </a>\n        </div>\n        '), 
__p += "\n    </div>\n    ", model.company && (__p += '<div class="apply-blob"></div>'), 
__p += '\n    <ul class="nav-tabs nav" style="padding-bottom: 1px;">\n        <li id="problemTab" ', 
"problem" == activeTab && (__p += ' class="active" '), __p += ' ><a class="hr-problem-link" href="' + (null == (__t = baseURL) ? "" :__t) + '"><i class="icon-doc-text"></i> Problem</a></li>\n        <li id="submissionsTab" ', 
"submissions" == activeTab && (__p += ' class="active" '), __p += ' ><a class="hr-submissions-link" href="' + (null == (__t = baseURL) ? "" :__t) + '/submissions"><i class="icon-list-bullet-small"></i> Submissions</a></li>\n        ', 
"acm" != contest.get("kind") && (__p += '<li id="leaderboardTab" ', "leaderboard" == activeTab && (__p += ' class="active" '), 
__p += ' ><a class="hr-leaderboard-link" href="' + (null == (__t = baseURL) ? "" :__t) + '/leaderboard"><i class="icon-trophy"></i> Leaderboard</a></li>'), 
__p += '\n        <li id="forumTab" ', "forum" == activeTab && (__p += ' class="active" '), 
__p += ' ><a class="hr-forum-link" href="' + (null == (__t = baseURL) ? "" :__t) + '/forum/questions"><i class="icon-comment"></i> Discussions</a></li>\n        ', 
model.is_editorial_available && (__p += '        \n        <li id="editorialTab" ', 
"editorial" == activeTab && (__p += ' class="active" '), __p += ' ><a class="hr-editorial-link" href="' + (null == (__t = baseURL) ? "" :__t) + '/editorial"><i class="icon-edit"></i> Editorial</a></li>\n        '), 
__p += "\n    </ul>\n</header>\n";
return __p;
});