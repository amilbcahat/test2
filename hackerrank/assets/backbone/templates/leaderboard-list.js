HR.appController.addTemplate("backbone/templates/leaderboard-list", function(obj) {
function show_hacker(leader) {
return leader && leader.hacker ? _.escape(leader.hacker).slice(0, 16) + function(l) {
return l.length > 16 ? "..." :"";
}(leader.hacker) :"N/A";
}
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += "", __p += "\n", "acm" == contest.leaderboard_format ? (__p += '\n    <div class="row ', 
is_current_hacker && (__p += "active-user"), __p += '" style="padding: 0px">\n') :(__p += '\n    <div class="row padding-small top bottom', 
index % 2 == 0 && (__p += " row-alt"), __p += " ", is_current_hacker && (__p += "active-user"), 
__p += '"style="', leader.is_practice && (__p += "background-color: #F0F8FF"), __p += '">\n'), 
__p += "\n    ", "acm" == contest.leaderboard_format) {
if (__p += '\n        <div class="span-flex-1 acm-leaderboard-cell text-center">\n            <p>' + (null == (__t = leader.rank) ? "" :__t) + '</p>\n        </div>\n        <div class="span-flex-2 acm-leaderboard-cell">\n            <p style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' + (null == (__t = show_hacker(leader)) ? "" :__t) + '</p>\n        </div>\n        <div class="span-flex-1 acm-leaderboard-cell" rel="tooltip" ', 
score_detail && (__p += ' title="' + (null == (__t = score_detail) ? "" :__t) + '" '), 
__p += " >\n            <p>" + (null == (__t = leader.solved_challenges || "-") ? "" :__t) + '</p>\n        </div>\n        <div class="span-flex-1 acm-leaderboard-cell" rel="tooltip" ', 
score_detail && (__p += ' title="' + (null == (__t = score_detail) ? "" :__t) + '" '), 
__p += " >\n            <p>" + (null == (__t = Math.ceil(leader.time_taken / 60) || "-") ? "" :__t) + '</p>\n        </div>\n        <div class="span-flex-11 text-center" style="height: 80px">\n        ', 
leader.challenges) {
__p += "\n        ";
var challenges_count = leader.challenges.length;
__p += "\n        ";
var width = 100 / (1 * challenges_count);
__p += "\n        ";
}
__p += "\n        ", _.each(leader.challenges, function(challenge) {
__p += '\n            <div class="acm-leaderboard-cell ' + (null == (__t = challenge.time_taken > 0 ? "correct" :"") ? "" :__t) + " " + (null == (__t = 0 == challenge.time_taken && challenge.submissions > 0 ? "incorrect" :"") ? "" :__t) + '" style="width: ' + (null == (__t = width) ? "" :__t) + '%; float: left; box-sizing: border-box; margin-left: 0;">\n              <div class="inner-cell">\n                ', 
challenge.submissions > 0 && (__p += '\n                    <p rel="tooltip" title="' + (null == (__t = challenge.tooltip) ? "" :__t) + '" style="font-size: 12px;">\n                        ' + (null == (__t = challenge.submissions) ? "" :__t) + " (" + (null == (__t = challenge.time_taken_formatted) ? "" :__t) + " + " + (null == (__t = Math.ceil(challenge.penalty / 60)) ? "" :__t) + ")\n                    </p>\n                "), 
__p += "\n                ", challenge.public_solutions && (__p += '\n                    <a target="_blank" data-analytics="Download Solution" href="/rest/contests/' + (null == (__t = contest.slug) ? "" :__t) + "/challenges/" + (null == (__t = challenge.slug) ? "" :__t) + "/hackers/" + (null == (__t = leader.hacker) ? "" :__t) + '/download_solution">\n                        <i class="icon-download"></i>\n                    </a>\n                '), 
__p += "\n              </div>\n            </div>\n        ";
}), __p += "\n        </div>\n    ";
} else __p += "\n        ", show_code ? (__p += "\n            ", widths = [ 2, 6, 3, 2, 3 ], 
index = 0, __p += "\n        ") :(__p += "\n            ", widths = [ 2, 8, 3, 3 ], 
index = 0, __p += "\n        "), __p += '\n        <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += ' text-center">\n            <p>' + (null == (__t = leader.rank) ? "" :__t) + '</p>\n        </div>\n        <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += '">\n            <p>\n                <a class="cursor leaderboard-hackername rg_' + (null == (__t = leader.level) ? "" :__t) + '" data-action="hacker-modal" ', 
timeTooltip && (__p += 'rel="tooltip" title="' + (null == (__t = timeTooltip) ? "" :__t) + '"'), 
__p += 'data-value="' + (null == (__t = _.escape(leader.hacker)) ? "" :__t) + '" href="/' + (null == (__t = _.escape(leader.hacker)) ? "" :__t) + '" target="_blank">\n                    ' + (null == (__t = show_hacker(leader)) ? "" :__t) + "\n                </a>\n                ", 
show_code && (__p += '\n                    <a target="_blank" data-analytics="Download Solution" href="' + (null == (__t = leader.download_link) ? "" :__t) + '">\n                        <i class="icon-download"></i>\n                    </a>\n                '), 
__p += '\n            </p>\n        </div>\n        <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += '">\n            <p>\n                ' + (null == (__t = parseFloat(leader.score).toFixed(2)) ? "" :__t) + '\n            </p>\n        </div>\n        <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += ' text-center">\n            <img class="flag" rel="tooltip" src="/static/flags/' + (null == (__t = window.countries_mapping[leader.country]) ? "" :__t) + '.png"\n            title="' + (null == (__t = leader.country) ? "" :__t) + '"\n            alt="' + (null == (__t = leader.country) ? "" :__t) + '"\n            onerror="this.onerror=null; this.src=\'/static/flags/_unknown.png\';">\n        </div>\n        ', 
show_code && (__p += '\n            <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += '">\n                <p>\n                    ', __p += leader.language ? "\n                        " + (null == (__t = lang_display_mapping[leader.language] || leader.language) ? "" :__t) + "\n                    " :"N/A", 
__p += "\n                </p>\n            </div>\n        "), __p += "\n    ";
__p += "\n</div>\n";
}
return __p;
});