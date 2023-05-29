HR.appController.addTemplate("backbone/templates/dashboard/onboarding-challenges-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="contest-challenges-problem" class="challengeslist_challenge challenge-list-item clearfix">\n  ', 
void 0 != model.name ? (__p += '\n    <div class="challengeslist_challenge-body">\n        ', 
model.solved && (__p += '\n            <div class="completed-indicator"><i class="icon-ok"></i></div>\n        '), 
__p += '\n\n        <header class="clearfix">\n            <!--<p class="title no-flow">Tutorial</p>-->\n            <h2 class="challengeslist_challenge-title"><a href="' + (null == (__t = baseURL) ? "" :__t) + '" class="backbone pull-left">' + (null == (__t = model.name) ? "" :_.escape(__t)) + '</a>\n            <ul class="pull-right challengeslist_challenge-links unstyled horizontal">\n                ', 
model.can_be_viewed && (__p += '\n                <li class=""><a href="' + (null == (__t = baseURL) ? "" :__t) + '/forum/questions" class="backbone submit" data-analytics="ViewForum"><i class="icon-comment"></i></a></li>\n                '), 
__p += '\n                <li class=""><a href="' + (null == (__t = baseURL) ? "" :__t) + '/leaderboard" class="backbone submit" data-analytics="ChallengeLeaderboard"><i class="icon-trophy"></i></a></li>\n                ', 
model.can_be_viewed && (__p += '\n                <li class=""><a href="' + (null == (__t = baseURL) ? "" :__t) + '/submissions" class="backbone"><i class="icon-list-bullet-small"></i></a></li>\n                '), 
__p += "\n            </ul>\n            </h2>\n        </header>\n        ", __p += model.can_be_viewed ? '\n        <p class="question-text body-text no-flow">' + (null == (__t = model.preview || "") ? "" :__t) + "</p>\n        " :'\n        <p class="question-text body-text no-flow">' + (null == (__t = model.requirements_description || "") ? "" :__t) + "</p>\n        ", 
__p += '\n\n        <div class="challengeslist_challenge-sub clearfix">\n            <span class="sub-meta">\n                ', 
"code" == model.kind && model.solved_count > 0 ? (__p += '\n                  <p class="no-flow stats pull-left">' + (null == (__t = model.solved_count) ? "" :__t) + " successful / " + (null == (__t = model.total_count) ? "" :__t) + " total submission", 
1 != model.total_count && (__p += "s"), __p += '</p>\n                  <p class="no-flow pull-left stats challenge-score">&ensp;&bull;&ensp;Max score: <strong>' + (null == (__t = model.max_score) ? "" :__t) + "</strong></p>\n                ") :(__p += '\n                    <p class="no-flow stats pull-left">' + (null == (__t = model.total_count) ? "" :__t) + " submission", 
1 != model.total_count && (__p += "s"), __p += "</p>\n                "), __p += "\n            </span>\n            ", 
model.can_be_viewed && (__p += '\n            <a href="' + (null == (__t = baseURL) ? "" :__t) + '" data-slug="' + (null == (__t = model.slug) ? "" :__t) + '"\n               class="btn ' + (null == (__t = model.attempted ? "btn btn-inverse btn-inverse--alt" :"btn btn-inverse") ? "" :__t) + ' backbone start pull-right challengelist_button"\n               data-analytics="' + (null == (__t = model.attempted ? "TryAgain" :"SolveChallenge") ? "" :__t) + '">\n                ' + (null == (__t = model.attempted ? "Try Again" :"Solve Challenge") ? "" :__t) + "\n            </a>\n            "), 
__p += "\n        </div>\n    </div>\n    ") :__p += "\n        " + (null == (__t = throbber) ? "" :__t) + "\n    ", 
__p += "\n</div>\n";
return __p;
});