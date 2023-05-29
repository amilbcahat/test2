HR.appController.addTemplate("backbone/templates/leaderboard-main", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container--inner layout_inverse">\n    <header class="page-title clearfix">\n        <h1 class="pull-left mlR">Leaderboard</h1>\n        <div class="pull-right track-selection">\n            <select>\n                <option value="algorithms" ', 
"algorithms" == track && (__p += 'selected="true"'), __p += '>Algorithms</option>\n                <option value="ai" ', 
"ai" == track && (__p += 'selected="true"'), __p += '>Artificial Intelligence</option>\n                <option value="fp" ', 
"fp" == track && (__p += 'selected="true"'), __p += '>Functional Programming</option>\n                <option value="miscellaneous" ', 
"miscellaneous" == track && (__p += 'selected="true"'), __p += '>Miscellaneous</option>\n                <option value="shell" ', 
"shell" == track && (__p += 'selected="true"'), __p += '>The Linux Shell</option>\n            </select>\n        </div>\n    </header>\n    <section class="leaderboard layout_content">\n        <div class="pull-left">\n            ', 
__p += "contest" == type ? '\n                <h3 class="bold mmT">Contest Ranking</h3>\n            ' :'\n                <h3 class="bold mmT">Practice Ranking</h3>\n            ', 
__p += '\n        </div>\n        <div class="toggle toggle-leaderboard pull-right">\n            <a title="Practice Leaderboard" rel="tooltip"><?xml version="1.0" encoding="utf-8"?>\n            <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n                 viewBox="0 0 10 20" enable-background="new 0 0 10 20" xml:space="preserve" style="height: 30px; width: 20px; margin-bottom: -10px;">\n                <g>\n                    <polygon fill="#F4F6F9" points="5.1,16.6 7.1,18.6 7.1,7.4 5.1,7.4 4.9,7.4 2.9,7.4 2.9,18.6 4.9,16.6     "/>\n                    <g>\n                        <polyline fill="none" stroke="#6C6F75" stroke-miterlimit="10" points="6.8,18.2 7.1,18.6 7.1,18.1        "/>\n\n                            <line fill="none" stroke="#6C6F75" stroke-miterlimit="10" stroke-dasharray="0.9249,0.9249" x1="7.1" y1="17.2" x2="7.1" y2="8.4"/>\n                        <polyline fill="none" stroke="#6C6F75" stroke-miterlimit="10" points="7.1,7.9 7.1,7.4 6.6,7.4       "/>\n                        <polyline fill="none" stroke="#6C6F75" stroke-miterlimit="10" stroke-dasharray="1.0764,1.0764" points="5.5,7.4 5.1,7.4\n                            4.9,7.4 3.9,7.4         "/>\n                        <polyline fill="none" stroke="#6C6F75" stroke-miterlimit="10" points="3.4,7.4 2.9,7.4 2.9,7.9       "/>\n\n                            <line fill="none" stroke="#6C6F75" stroke-miterlimit="10" stroke-dasharray="0.9249,0.9249" x1="2.9" y1="8.8" x2="2.9" y2="17.6"/>\n                        <polyline fill="none" stroke="#6C6F75" stroke-miterlimit="10" points="2.9,18.1 2.9,18.6 3.3,18.2        "/>\n\n                            <line fill="none" stroke="#6C6F75" stroke-miterlimit="10" stroke-dasharray="0.602,0.602" x1="3.7" y1="17.8" x2="4.3" y2="17.2"/>\n                        <polyline fill="none" stroke="#6C6F75" stroke-miterlimit="10" points="4.5,17 4.9,16.6 5.1,16.6 5.3,16.8         "/>\n                        <line fill="none" stroke="#6C6F75" stroke-miterlimit="10" stroke-dasharray="0.689,0.689" x1="5.8" y1="17.3" x2="6.5" y2="18"/>\n                    </g>\n                </g>\n                <circle fill="#F4F6F9" stroke="#6C6F75" stroke-miterlimit="10" stroke-dasharray="1" cx="5" cy="5.1" r="4.3"/>\n            </svg></a>\n\n            <div class="inline">\n                <input class="leaderboard-option js-switch" type="checkbox" ', 
"contest" == type && (__p += 'checked="checked"'), __p += '>\n            </div>\n\n            <a title="Contest Leaderboard" rel="tooltip"><?xml version="1.0" encoding="utf-8"?>\n            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n                 viewBox="0 0 10 20" enable-background="new 0 0 10 20" xml:space="preserve" style="height: 30px; width: 20px; margin-bottom: -10px;">\n                 <polygon fill="#F65039" stroke="#D14233" stroke-miterlimit="10" points="5.1,16.6 7.1,18.6 7.1,7.4 5.1,7.4 4.9,7.4 2.9,7.4\n                    2.9,18.6 4.9,16.6 "/>\n                 <circle fill="#F4D647" stroke="#EFBE25" stroke-miterlimit="10" cx="5" cy="5.1" r="4.3"/>\n            </svg></a>\n        </div>\n        <div class="input-btn-group btn-group-filters pull-right mlR">\n            <span class="dropdown">\n                <a class="btn dropdown-toggle" data-toggle="dropdown"><span class="toggle-leaderboard-title">Add Filter<i class="icon-down-open icon--right"></i></span></a>\n                <ul class="dropdown-menu leaderboard-filters-dropdown">\n                    <li><a class="filter-value-country">Country</a></li>\n                    <li><a class="filter-value-company">Company</a></li>\n                    <li><a class="filter-value-school">School</a></li>\n                </ul>\n            </span>\n            <input type="text" class="filter-input">\n            <a class="msL filters-close fade">&times;</a>\n        </div>\n        <div class="clearfix table-wrap">\n            ', 
"contest" == type ? (__p += '\n                <ul class="nav-tabs nav ungroup" style="margin-bottom: 1px">\n                    <li class="', 
1 == level && (__p += "active"), __p += ' text-center levelTab"><a href="" data-toggle="tab" data-level="1" class="rg_1 js-leaderboard-tab">O(1)</a></li>\n                    <li class="', 
2 == level && (__p += "active"), __p += ' text-center levelTab"><a href="" data-toggle="tab" data-level="2" class="rg_2 js-leaderboard-tab">O(logN)</a></li>\n                    <li class="', 
3 == level && (__p += "active"), __p += ' text-center levelTab"><a href="" data-toggle="tab" data-level="3" class="rg_3 js-leaderboard-tab">O(N)</a></li>\n                    <li class="', 
4 == level && (__p += "active"), __p += ' text-center levelTab"><a href="" data-toggle="tab" data-level="4" class="rg_4 js-leaderboard-tab">O(N<sup>2</sup>)</a></li>\n                    <li class="', 
5 == level && (__p += "active"), __p += ' text-center levelTab"><a href="" data-toggle="tab" data-level="5" class="rg_5 js-leaderboard-tab">O(2<sup>N</sup>)</a></li>\n                </ul>\n            ') :__p += '\n                <ul class="nav-tabs nav ungroup" style="margin-bottom: 1px"></ul>\n            ', 
__p += '\n            <header style="background: white">\n                <div class="span-flex-2 text-center">\n                    <p>Rank</p>\n                </div>\n                <div class="span-flex-8">\n                    <p>Hacker</p>\n                </div>\n                <div class="span-flex-3">\n                    <p>Score</p>\n                </div>\n                <div class="span-flex-3 text-center">\n                    <p>Country</p>\n                </div>\n            </header>\n\n            <div id="blank-reason-container" class="">\n                <div class="table-body text-center boundB">\n                    <p class="emptyState_container blank-reason mlA"></p>\n                </div>\n            </div>\n\n            <div class=\'tab-content\'>\n                <div class=\'tab-pane active\'>\n                    <div id="leaders" class="table-body">\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <p class="msT">\n        </p>\n\n        <div class="pagination-wrap clearfix pagination-wrapper mlB msT">\n        </div>\n    </section>\n    <section class="leaderboard-sidebar layout_sidebar plL">\n        ', 
scores.length > 0 ? (__p += "\n            <!-- Render current track -->\n            ", 
_.each(scores, function(score) {
score.slug == track && (__p += '\n                    <div class="callout callout-rounded text-center mlB">\n                        <header class="calloutBody">\n                            <small class=" bold">' + (null == (__t = score.name) ? "" :__t) + ' Rating</small>\n                            <h4 class="color-blue bold mmT">' + (null == (__t = level_to_title[score.contest.level - 1]) ? "" :__t) + '</h4>\n                        </header>\n                        <div class="calloutFooter">\n                            <div class="row">\n                                ', 
__p += "contest" == type ? '\n                                    <div class="span-flex-8 calloutFooter-group">\n                                        <small class="zeta bold">Contest Score</small>\n                                        <p class="bold">' + (null == (__t = score.contest.score.toFixed(2)) ? "" :__t) + '</p>\n                                    </div>\n                                    <div class="span-flex-8 calloutFooter-group">\n                                        <small class="zeta bold">Contest Rank</small>\n                                        <p class="bold">' + (null == (__t = score.contest.rank) ? "" :__t) + "</p>\n                                    </div>\n                                " :'\n                                    <div class="span-flex-8 calloutFooter-group">\n                                        <small class="zeta bold">Practice Score</small>\n                                        <p class="bold">' + (null == (__t = score.practice.score.toFixed(2)) ? "" :__t) + '</p>\n                                    </div>\n\n                                    <div class="span-flex-8 calloutFooter-group">\n                                        <small class="zeta bold">Practice Rank</small>\n                                        <p class="bold">' + (null == (__t = score.practice.rank) ? "" :__t) + "</p>\n                                    </div>\n                                ", 
__p += "\n                            </div>\n                        </div>\n                    ");
}), __p += '\n                    <!-- Note the class of "listItem" on the li element. If you add a view-wrapping div here, make sure that it has this class instead. The ".listItem" must be an immediate child of the ul -->\n                    <!--<ul class="listGroup listBound listSelectable list-group-Leaderboard">\n                        ', 
_.each(scores, function(score) {
score.slug != track && (__p += '\n                                <li class="listGroup-item leaderboardTrack-AI">\n                                    <i class="listGroup-icon leaderboardTrack-icon">' + (null == (__t = score.short) ? "" :__t) + '</i>\n                                    <h5 class="">' + (null == (__t = score.name) ? "" :__t) + '</h5>\n                                    <ul class="leaderboardTrack-meta inline lines small zeta bold">\n                                        <li>Rank: ' + (null == (__t = score.contest.rank) ? "" :__t) + "</li>\n                                        <li>Score: " + (null == (__t = score.contest.score.toFixed(2)) ? "" :__t) + "</li>\n                                        <li>Rating: " + (null == (__t = level_to_title[score.contest.level - 1]) ? "" :__t) + "</li>\n                                    </ul>\n                                </li>\n                        ");
}), __p += '\n                    </ul>-->\n                </div>\n                <div class="mlT fill-light plA mjB">\n                    <p class="aside">Your contest score for each track is calculated based on your performance in all of the contests within that domain. Your practice score is a cumulative sum of your score in the domain\'s practice challenges.</p>\n                    <p><a href="/scoring" target="_blank">Learn more about scoring &rarr;</a></p>\n                </div>\n                ') :HR.profile().isLoggedIn() && (__p += "\n                    " + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n                "), 
__p += '\n            <div class="leaderboard-filters flip_back">\n            </div>\n        </div>\n    </section>\n</div>\n';
return __p;
});