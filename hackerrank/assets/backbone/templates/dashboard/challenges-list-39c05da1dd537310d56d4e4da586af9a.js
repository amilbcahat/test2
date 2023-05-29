HR.appController.addTemplate("backbone/templates/dashboard/challenges-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="contest-challenges-problem" class="content--list">\n    ', 
void 0 != model.name ? (__p += '\n        <div class="content--list_body">\n            ', 
model.solved && (__p += '\n                <div class="completed-indicator"><i class="icon-ok"></i></div>\n            '), 
__p += '\n            <header class="content--list_header row">\n                <h4 class="content--list_title span8">\n                    ', 
__p += model.can_be_viewed ? '\n                        <a href="' + (null == (__t = baseURL) ? "" :__t) + '" class="backbone">' + (null == (__t = model.preferred_challenge_name || model.name) ? "" :_.escape(__t)) + "</a>\n                    " :'\n                        <a onclick="javascript:void(0);" class="cursor">' + (null == (__t = model.preferred_challenge_name || model.name) ? "" :_.escape(__t)) + "</a>\n                    ", 
__p += "\n                    ", contest && "acm" == contest.kind && (__p += ' <span class="challenge_color acm-challenge-balloon" style="background-color: ' + (null == (__t = model.color) ? "" :__t) + '"></span> '), 
__p += '\n                </h4>\n                <ul data-intro="Challenge links" class="span2 pull-right inline challenge_links">\n                    ', 
model.can_be_viewed && (__p += '\n                        <li class=""><a href="' + (null == (__t = baseURL) ? "" :__t) + '/forum/questions" class="backbone submit icon--grey" data-analytics="ViewForum"><i class="icon-comment icon--single"></i></a></li>\n                    '), 
__p += "\n                    ", contest && "acm" == contest.kind || (__p += '\n                        <li class=""><a href="' + (null == (__t = baseURL) ? "" :__t) + '/leaderboard" class="backbone submit icon--grey" data-analytics="ChallengeLeaderboard"><i class="icon-trophy icon--single"></i></a></li>\n                    '), 
__p += "\n                    ", model.can_be_viewed && (__p += '\n                        <li class=""><a href="' + (null == (__t = baseURL) ? "" :__t) + '/submissions" class="backbone icon--grey"><i class="icon-list-bullet-small icon--single"></i></a></li>\n                    '), 
__p += "\n                </ul>\n            </header>\n            ", model.can_be_viewed ? (__p += "\n              <p>", 
__p += "html" == model.preview_format ? "\n                " + (null == (__t = model.preferred_challenge_preview || model.preview || "") ? "" :__t) + "</p>\n              " :"\n                " + (null == (__t = model.preferred_challenge_preview || model.preview || "") ? "" :_.escape(__t)) + "\n              ", 
__p += "</p>\n            ") :__p += "\n                <p>" + (null == (__t = model.requirements_description || "") ? "" :_.escape(__t)) + "</p>\n            ", 
__p += "\n            ", contest && "weekly" == contest.kind && (__p += "\n                    ", 
__p += model.active ? '\n                        <span class="plL color-alt-green">\n                            <i class="status-indicator active mmR"></i>\n                            <span class="countdowntimer"></span>\n                        </span>\n                    ' :'\n                        <span class="plL color-orange">\n                            <i class="status-indicator completed mmR"></i>\n                            Locked\n                            <span class="help-prompt"><i class="icon-help-circled icon-single"></i><span class="help-text">Your submissions will not affect the leaderboard.</span></span>\n                        </span>\n                    ', 
__p += "\n                "), __p += '\n        </div> <!-- END content--list_body -->\n        <footer class="content--list_footer">\n            <div class="small bold msT pull-left">\n                ', 
(model.solved_count && model.total_count || !model.dynamic) && (__p += "\n                ", 
"code" == model.kind && (model.solved_count > 0 || !model.dynamic) ? (__p += '\n                    <span class="msR">\n                        <span class="zeta">Submission', 
1 != model.total_count && (__p += "s"), __p += ": </span>\n                        " + (null == (__t = model.total_count) ? "" :__t) + '\n                    </span>\n                    <span class="msR">\n                        <span class="zeta">Max Score: </span>\n                        ' + (null == (__t = model.max_score) ? "" :__t) + "\n                    </span>\n                ") :(__p += '\n                    <span class="msR">\n                        <span class="zeta">Submission', 
1 != model.total_count && (__p += "s"), __p += ": </span>\n                        " + (null == (__t = model.total_count) ? "" :__t) + "\n                    </span>\n                "), 
__p += "\n                "), __p += "\n                ", (!contest || "acm" != contest.kind && !contest.hide_difficulty) && (model.difficulty_name = model.difficulty < .2 ? "Expert" :model.difficulty < .4 ? "Advanced" :model.difficulty < .6 ? "Difficult" :model.difficulty < .8 ? "Moderate" :"Easy", 
__p += '\n                    <span class="mlR"><span class="zeta">Difficulty: </span>' + (null == (__t = model.difficulty_name) ? "" :__t) + "</span>\n                "), 
__p += "\n\n            </div>\n            ", model.can_be_viewed && (__p += '\n            <a href="' + (null == (__t = baseURL) ? "" :__t) + '" data-slug="' + (null == (__t = model.slug) ? "" :__t) + '"\n               class="btn ' + (null == (__t = model.attempted ? "btn btn-line" :"btn") ? "" :__t) + ' backbone start pull-right span3"\n               data-analytics="' + (null == (__t = model.attempted ? "TryAgain" :"SolveChallenge") ? "" :__t) + '">\n                ' + (null == (__t = model.attempted ? "Try Again" :"Solve Challenge") ? "" :__t) + "\n            </a>\n            "), 
__p += "\n        </footer>\n    ") :__p += "\n        " + (null == (__t = throbber) ? "" :__t) + "\n    ", 
__p += "\n</div>\n";
return __p;
});