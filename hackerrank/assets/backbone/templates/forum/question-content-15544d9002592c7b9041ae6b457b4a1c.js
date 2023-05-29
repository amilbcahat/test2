HR.appController.addTemplate("backbone/templates/forum/question-content", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="forum-single-wrap">\n    <div class="forum-single-body clearfix">\n        ', 
_question.sync_status ? (__p += '\n            <div class="break-word">\n                ', 
question.deleted && (__p += '\n                    <div class="text-center">\n                        <small><em>This question has been deleted by the author</em></small>\n                    </div>\n                '), 
__p += '\n                <h3 class="margin-small bottom forum-single-title"><strong>' + (null == (__t = question.title) ? "" :__t) + "</strong></h3>\n                " + (null == (__t = question.description) ? "" :__t) + '\n            </div>\n            <div class="clearfix forum-single-meta">\n                <small class="pull-left">\n                    <em><strong><a class="cursor hacker-show backbone" data-action="hacker-modal" data-value="' + (null == (__t = question.hacker_username) ? "" :__t) + '" href="/' + (null == (__t = question.hacker_username) ? "" :__t) + '" >' + (null == (__t = question.hacker_username) ? "" :__t) + "</a></strong>", 
question.hacker_is_admin && (__p += ' <span class="label label-info">STAFF</span>'), 
__p += '</em>\n                    asked\n                    <span class="timeago" title="' + (null == (__t = question.created_at) ? "" :__t) + '"></span>\n                    ', 
question.hacker_id == _profile.id && (__p += '\n                        \u2022 <strong><a class="edit-question cursor backbone" data-analytics="Edit Question">Edit</a></strong>\n                        ', 
question.deleted || (__p += '\n                            \u2022 <strong><a class="delete-question cursor backbone" data-analytics="Delete Question">Delete</a></strong>\n                        '), 
__p += "\n                    "), __p += '\n                </small>\n                <small class="pull-right">\n                    ', 
_.isEmpty(question.tags) || (__p += "\n                        Tags: <em>" + (null == (__t = question.tags.join(",&nbsp;")) ? "" :__t) + "</em>\n                    "), 
__p += '\n                </small>\n            </div>\n            <div class="forum-single-sub answer-editor-section">\n                ', 
__p += profile.isLoggedIn() ? '\n                    <div class="clearfix">\n                        <div class="pic-wrap50 pic-wrap pull-left">\n                            <img src="' + (null == (__t = _profile.avatar) ? "" :__t) + '"  class="avatar" width="50" height="50" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n                            <div class="shadow"></div>\n                        </div>\n                        <textarea style="margin-left:10px;word-wrap: break-word;" id=\'answer-description\'></textarea>\n                        <small id="answer-error" class="error pull-right hide">Sorry, you do not have a permission to answer to this question.</small>\n                    </div>\n                    <div class="btn-wrap clearfix">\n                        <p class="small pull-left" style="font-size: 0.9em; color: #999;"><a target="_blank" href="http://daringfireball.net/projects/markdown/syntax" style="color: #999; text-decoration: underline;">Markdown</a> is supported</p>\n                        <a href="javascript:void();" class="answer-question btn btn-white pull-right">Submit Answer</a>\n                    </div>\n                    <div class="preview-wrap clearfix hide">\n                        <h4>Preview</h4>\n                        <div class="controls">\n                            <div id="answer-preview" class="preview"></div>\n                        </div>\n                    </div>\n                ' :'\n                    <p class="gray">In order to answer a question you should be logged in.</p>\n                ', 
__p += '\n            </div>\n            <div id="answer-list-view" class="forum-single-answers"></div>\n        ') :__p += "\n            " + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n        ", 
__p += "\n    </div>\n</div>\n";
return __p;
});