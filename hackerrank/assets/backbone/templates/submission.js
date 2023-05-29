HR.appController.addTemplate("backbone/templates/submission", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container--inner">\n    <header class="page-title">\n    <div class="clearfix">\n      ', 
HR.util.isAvailable(_model.get("name")) && (__p += "\n      <h1>" + (null == (__t = _model.get("name")) ? "" :__t) + "</h1>\n      "), 
__p += '\n    </div>\n    <ul class="nav-tabs nav" style="padding-bottom: 1px;">\n      ', 
HR.util.isAvailable(challengePageURL) && (__p += '\n      <li><a class="hr-problem-link backbone" href="' + (null == (__t = challengePageURL) ? "" :__t) + '"><i class="icon-doc-text"></i>Problem</a></li>\n      <li class="active"><a class="hr-submissions-link backbone" href="' + (null == (__t = challengePageURL) ? "" :__t) + '/submissions"><i class="icon-list-bullet-small"></i> Submissions</a></li>\n      ', 
"acm" != contest.kind && (__p += '<li><a class="hr-leaderboard-link backbone" href="' + (null == (__t = challengePageURL) ? "" :__t) + '/leaderboard"><i class="icon-trophy"></i> Leaderboard</a></li>'), 
__p += '\n      <li><a class="hr-forum-link backbone" href="' + (null == (__t = challengePageURL) ? "" :__t) + '/forum/questions"><i class="icon-comment"></i> Discussions</a></li>\n      ', 
model.is_editorial_available && (__p += '     \n      <li><a class="hr-editorial-link backbone" href="' + (null == (__t = challengePageURL) ? "" :__t) + '/editorial"><i class="icon-edit"></i> Editorial</a></li>\n      '), 
__p += "\n      "), __p += '\n    </ul>\n    <div class="clearfix"></div>\n    </header>\n\n    <section class="submissions-details">\n        ', 
model.view_by_owner === !1 && (__p += '\n            <div>\n                <p class="margin-large top padded light-wrap lifted">This ' + (null == (__t = model.name) ? "" :_.escape(__t)) + " submission belongs to <b>" + (null == (__t = model.hacker_username) ? "" :__t) + "</b></p>\n            </div>\n        "), 
__p += '\n        <header class="page_title">\n            <p>\n              ', 
HR.util.isAvailable(challengePageURL) && HR.util.isAvailable(_model.get("name")) && (__p += '\n              <a class="btn btn-text backbone"\n                 href="' + (null == (__t = challengePageURL) ? "" :__t) + '/submissions"><i class="icon-left-open"> View all ' + (null == (__t = _model.get("name")) ? "" :_.escape(__t)) + " submissions</i></a>\n              "), 
__p += "\n            </p>\n        </header>\n        ", model.company && (__p += '<div class="apply-blob"></div>'), 
__p += '\n        <div class="grey-header padded" id="submission-stats-wrapper"></div>\n        ', 
"game" == model.kind && (__p += '\n            <div class="clearfix margin-large padding-large bottom">\n                <div id="submission-manual-game-play-wrapper" class="pull-left margin-large top"></div>\n                <div class="pull-right margin-large top"><a href="download/submissiongames/' + (null == (__t = model.id) ? "" :__t) + '" target="_blank" class="btn-text pull-right"><i class="icon-download"></i>Download All Games</a></div>\n            </div>\n            <div class="table-wrap">\n                <header>\n                    <p class="span6 padding-small left">Opponent</p>\n                    <p class="span6 padding-small left">Results</p>\n                </header>\n                <div id="submission-game-set-wrapper"></div>\n            </div>\n        '), 
__p += "\n        <br>\n        ", null != model.code && (__p += '\n        	<h3 class="padding-large bottom">Submitted Code</h3>\n            <div class="submission_code-wrap light-wrap">\n                <div class="submission_code-header clearfix">\n                    <div class="pull-left">\n                        <p class="submission_code-language">Language: ' + (null == (__t = lang_display_mapping[model.language]) ? "" :__t) + "</p>\n                    </div>\n                    ", 
model.disable_open_in_editor || (__p += '\n                      <div class="pull-right submissions_code-copy">\n                          <button class="btn btn-green copy_to_clipboard"><i class="icon-edit"></i> Open in editor</button>\n                      </div>\n                    '), 
__p += '\n                </div>\n                <div id="submission-code"></div>\n            </div>\n        '), 
__p += "\n        ", model.slug || (__p += "\n            <div class='gray'>\n              <div style='background: url(/assets/ajax-view-loader.gif); height: 32px; width: 32px; display: inline-block;'></div>\n              <p class=\"msg m\"></p>\n            </div>\n        "), 
__p += "\n    </section>\n</div>\n";
return __p;
});