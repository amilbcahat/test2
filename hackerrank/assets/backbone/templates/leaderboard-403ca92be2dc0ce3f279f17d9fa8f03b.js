HR.appController.addTemplate("backbone/templates/leaderboard", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += "", challenge || (__p += '\n<div class="container--inner">\n'), __p += "\n    ", 
challenge ? (__p += "\n        ", "master" == contest.slug && challenge.primary_contest && (__p += '\n            <div class="pull-right">\n                <span>Show practice</span>\n                <input id="showPractice" type="checkbox" ', 
showPractice && (__p += ' checked="checked" '), __p += ' >\n            </div>\n            <div class="clearfix"></div>\n        '), 
__p += "\n    ") :(__p += "\n        ", "master" == contest.slug && (__p += '\n            <p class="alert alert-info">\n                The classic challenges leaderboard is <a href="/classic_leaderboard" target="_blank">here</a>. Read more about the <a href="/blog/introducing-rating-system" target="_blank">change</a>\n            </p>\n        '), 
__p += '\n        <header class="page-title">\n            <h1 class="">Leaderboard</h1>\n        </header>\n    '), 
__p += '\n\n    <section class="leaderboard">\n        ', freeze_time_minutes > 0 && (__p += '\n            <div class="row pull-right">\n                <p class="alert alert-info">\n                    The leaderboard will not update in last ' + (null == (__t = parseInt(freeze_time_minutes)) ? "" :__t) + " minutes.\n                </p>\n            </div>\n        "), 
__p += "\n        ", ("master" != contest.slug || challenge || archived) && (__p += ' <!-- not rating leaderboard -->\n            <div style="padding-left: 8px; margin-bottom: 10px; margin-top: 10px">\n                <div class="row pull-left filters">\n                    <span>Filter by </span>\n                    <input id="filter-kind" type="text" style="margin-left: 10px">\n                    ', 
_.each(filters, function(val) {
__p += '\n                        <input id="filter-input-' + (null == (__t = val) ? "" :__t) + '" class="filter-input" type="text" style="display: none; margin-left: 10px; margin-top: 8px; line-height: 27px;" data-filter="' + (null == (__t = val) ? "" :__t) + '">\n                    ';
}), __p += '\n                </div>\n                <div class="clearfix"></div>\n                <div class="tag-group row pull-left" style="display: none;">\n                    <div class="tag-list">\n                        <p class="tag"><a class="close close-btn" data-filter="' + (null == (__t = activeFilter.kind) ? "" :__t) + '" data-value="' + (null == (__t = activeFilter.value) ? "" :__t) + '" style="color: red">x</a>' + (null == (__t = decodeURIComponent(_.escape(value))) ? "" :__t) + '</p>\n                    </div>\n                </div>\n                <div class="clearfix"></div>\n            </div>\n        '), 
__p += '\n\n        <div class="table-wrap">\n            <header>\n            ', 
"acm" == contest.leaderboard_format && void 0 !== collection.contest_challenges) {
if (__p += '\n                <div class="span-flex-1 text-center">\n                    <p>Rank</p>\n                </div>\n                <div class="span-flex-2">\n                    <p>Team</p>\n                </div>\n                <div class="span-flex-1">\n                    <p>Solved\n                        <span class="help-prompt"><i class="icon-help-circled icon-single"></i><span class="help-text">Total Challenges Solved.</span>\n                    </p>\n                </div>\n                <div class="span-flex-1">\n                    <p>Time\n                        <span class="help-prompt"><i class="icon-help-circled icon-single"></i><span class="help-text">Total time (in minutes) taken to solve the challenges including penalty.</span>\n                    </p>\n                </div>\n                <div class="span-flex-11 text-center">\n                ', 
collection.contest_challenges.length > 0) {
__p += "\n                    ";
var challenges_count = collection.contest_challenges.length;
__p += "\n                    ";
var width = 100 / (1 * challenges_count);
__p += "\n                    ", _.each(collection.contest_challenges, function(val) {
__p += '\n                        <div style="width: ' + (null == (__t = width) ? "" :__t) + '%; float: left; box-sizing: border-box; margin-left: 0;">\n                            <p><a class="backbone" href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/challenges/" + (null == (__t = val.slug) ? "" :__t) + '" data-original-title="' + (null == (__t = val.name) ? "" :__t) + '">' + (null == (__t = val.letter) ? "" :__t) + '</a></p>\n                            <a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/challenges/" + (null == (__t = val.slug) ? "" :__t) + '" class="backbone acm-challenge-balloon" rel="tooltip" data-original-title="' + (null == (__t = val.name) ? "" :__t) + '" style="background-color: ' + (null == (__t = val.color) ? "" :__t) + '; margin-left: 0px"></a>\n                        </div>\n                    ';
}), __p += "\n                ";
}
__p += "\n                </div>\n            ";
} else __p += "\n                ", show_code ? (__p += "\n                    ", 
widths = [ 2, 6, 3, 2, 3 ], index = 0, __p += "\n                ") :(__p += "\n                    ", 
widths = [ 2, 8, 3, 3 ], index = 0, __p += "\n                "), __p += '\n                <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += ' text-center">\n                    <p>Rank <span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n                </div>\n                <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += '">\n                    <p>User <span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n                </div>\n                <div class="small span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += '">\n                    <p>Score <span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n                </div>\n                <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += ' text-center">\n                    <p>Country <span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span></p>\n                </div>\n                ', 
show_code && (__p += '\n                    <div class="span-flex-' + (null == (__t = widths[index]) ? "" :__t), 
index += 1, __p += '">\n                        <p>Language</p>\n                    </div>\n                '), 
__p += "\n            ";
__p += '\n            </header>\n\n            <div id="blank-reason-container" class="table-body text-center">\n                <p class="blank-reason plA"></p>\n            </div>\n\n            <div id="leaders" class="table-body">\n            </div>\n        </div>\n\n        <div class="light-wrap clearfix table-wrap self-rank hide" id="leader-self">\n        </div>\n        <div class="pagination-wrap clearfix pagination-wrapper mlT">\n        </div><!--pagination-wrap-->\n    </section><!--.leaderboard-->\n', 
challenge || (__p += "\n</div>\n"), __p += "\n";
}
return __p;
});