HR.appController.addTemplate("backbone/templates/leaderboard-overall", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container--inner">\n    <p class="alert info">\n        The classic challenges leaderboard is <a href="/classic_leaderboard" target="_blank">here</a>. Read more about the <a href="/blog/introducing-rating-system" target="_blank">change</a>\n    </p>\n    <header class="page-title">\n        <h1 class="">Leaderboards</h1>\n    </header>\n    <section class="leaderboard pull-left" style="width: 55%" >\n        <div class="pull-left">\n            <p class="bold">Overall Leaderboard</p>\n        </div>\n        <div class="pull-right">\n            ', 
current_hacker && current_hacker.rank && (__p += '\n                <p class="bold"><span class="zeta">Your Rank: </span>' + (null == (__t = current_hacker.rank) ? "" :__t) + '<span class="psL zeta">Your Score: </span>' + (null == (__t = current_hacker.score.toFixed(2)) ? "" :__t) + "</p>\n            "), 
__p += '\n        </div>\n        <div class="clearfix table-wrap">\n            <ul class="nav-tabs nav ungroup" style="margin-bottom: 1px">\n                <li class="', 
1 == level && (__p += "active"), __p += ' text-center levelTab"><a href="/leaderboard/level/1" data-toggle="tab" data-level="1" class="rg_1 js-leaderboard-tab">O(1)</a></li>\n                <li class="', 
2 == level && (__p += "active"), __p += ' text-center levelTab"><a href="/leaderboard/level/2" data-toggle="tab" data-level="2" class="rg_2 js-leaderboard-tab">O(logN)</a></li>\n                <li class="', 
3 == level && (__p += "active"), __p += ' text-center levelTab"><a href="/leaderboard/level/3" data-toggle="tab" data-level="3" class="rg_3 js-leaderboard-tab">O(N)</a></li>\n                <li class="', 
4 == level && (__p += "active"), __p += ' text-center levelTab"><a href="/leaderboard/level/4" data-toggle="tab" data-level="4" class="rg_4 js-leaderboard-tab">O(N<sup>2</sup>)</a></li>\n                <li class="', 
5 == level && (__p += "active"), __p += ' text-center levelTab"><a href="/leaderboard/level/5" data-toggle="tab" data-level="5" class="rg_5 js-leaderboard-tab">O(2<sup>N</sup>)</a></li>\n            </ul>\n            <header style="background: white">\n                <div class="span-flex-2 text-center">\n                    <p>Rank</p>\n                </div>\n                <div class="span-flex-8">\n                    <p>Hacker</p>\n                </div>\n                <div class="span-flex-3">\n                    <p>Score</p>\n                </div>\n                <div class="span-flex-3 text-center">\n                    <p>Country</p>\n                </div>\n            </header>\n\n            <div id="blank-reason-container" class="table-body text-center">\n                <p class="row blank-reason small plA">\n                </p>\n            </div>\n\n            <div class=\'tab-content\'>\n                <div class=\'tab-pane active\'>\n                    <div id="leaders" class="table-body">\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <p class="msT">\n            <a href="/scoring/ratings" target="_blank" class="small">How is this calculated?</a>\n        </p>\n\n        <div class="pagination-wrap clearfix pagination-wrapper mlB msT">\n        </div>\n    </section>\n\n    <section class="js-weekly-leaderboard leaderboard pull-right" style="width: 40%">\n        <div class="pull-left">\n            <p class="bold">Weekly Contest Leaders</p>\n        </div>\n        ', 
weekly_contest && weekly_contest.started && (__p += '\n            <div class="pull-right">\n                <a href="/' + (null == (__t = weekly_contest.slug) ? "" :__t) + '/challenges" class="backbone bold">View challenges <i class="icon--right icon-right-open"></i></a>\n            </div>\n        '), 
__p += '\n        <div class="clearfix table-wrap">\n            <ul class="nav-tabs nav ungroup" style="margin-bottom: 1px">\n                <li class="', 
"today" == weekly_type && (__p += "active"), __p += ' text-center weeklyTab"><a class="js-weekly" href="" data-toggle="tab" data-type="today">Today</a></li>\n                <li class="', 
"yesterday" == weekly_type && (__p += "active"), __p += ' text-center weeklyTab"><a class="js-weekly" href="" data-toggle="tab" data-type="yesterday">Yesterday</a></li>\n                <li class="', 
"week" == weekly_type && (__p += "active"), __p += ' text-center weeklyTab"><a class="js-weekly" href="" data-toggle="tab" data-type="week">Weekly</a></li>\n            </ul>\n            <header style="background: white">\n                <div class="span-flex-2 text-center">\n                    <p>Rank</p>\n                </div>\n                <div class="span-flex-10">\n                    <p>Hacker</p>\n                </div>\n                <div class="span-flex-4">\n                    <p>Score</p>\n                </div>\n            </header>\n\n            <div class=\'tab-content\'>\n                <div class=\'tab-pane active\'>\n                    <div id="blank-reason-container2" class="table-body text-center">\n                        <p class="row blank-reason small plA">\n                        </p>\n                    </div>\n\n                    <div id="leaders2" class="table-body">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n';
return __p;
});