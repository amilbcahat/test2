HR.appController.addTemplate("backbone/templates/x/test-report-detailed-question", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA" id="report-q-' + (null == (__t = question.id) ? "" :_.escape(__t)) + '">\n    <div class="report_container_timeline">\n        <div class="status_time_wrap fixed-hand" >\n            <div class="fnt-wt-600 mdT">QUESTION ' + (null == (__t = index) ? "" :_.escape(__t)) + '</div>\n            <!-- this logic of icons is also maintained in summary table -->\n            <h3 class="mmT"><i class="' + (null == (__t = status.class) ? "" :_.escape(__t)) + '"></i></h3>\n            <div class="fnt-sz-small txt-alt-grey fnt-wt-600 mdB">\n            ', 
__p += plagiarism ? "\n            Plagiarism flagged\n            " :"\n            " + (null == (__t = status.text) ? "" :_.escape(__t)) + "\n            ", 
__p += '\n            </div>\n            <div class="time_divider"></div>\n            <div class="mdA">\n                <!-- there are 3 color states. green red and grey -->\n                <div id="scoreedit" rel="tooltip" class="' + (null == (__t = status.color) ? "" :_.escape(__t)) + " ", 
(question.submissions && question.submissions.length > 0 || question.my_answer) && (__p += "" + (null == (__t = "editable score-changer") ? "" :__t)), 
__p += '"  data-original-title="Change score">Score ' + (null == (__t = question.score ? Math.round(100 * question.score) / 100 :0) ? "" :_.escape(__t)) + '</div>\n                <!-- use the textbox below for collecting change score -->\n                <input class="score-input text-center fw no-margin hidden" type="text" placeholder="Score">\n                <div class="txt-alt-grey">\n                    ', 
0 != time && (__p += "\n                    Time taken: <strong>" + (null == (__t = time) ? "" :__t) + "</strong>\n                    "), 
__p += '\n                </div>\n            </div>\n        </div><!-- end .status_time_wrap -->\n\n        <div class="question_container_wrap movable-hand">\n\n            <div class="question_cont_head">\n                ', 
question.name && (__p += '\n                <h4 class="inline">' + (null == (__t = question.name) ? "" :_.escape(__t)) + '</h4>\n                &nbsp;<i class="icon-right-open-mini"></i>\n                '), 
__p += "\n                <span>" + (null == (__t = HR.util.readableQuestionType(question.type)) ? "" :_.escape(__t)) + '</span>\n                <ul class="pull-right question-report-tags">\n                    ', 
_.each(question.tags, function(tag) {
__p += "\n                    <li>" + (null == (__t = tag.tag) ? "" :_.escape(__t)) + "</li>\n                    ";
}), __p += '\n                </ul>\n            </div><!-- end .question_cont_head -->\n\n            <div class="question-wrapper-collapsed">\n                <p class="fnt-sz-small txt-alt-grey fnt-wt-600 mdB">QUESTION DESCRIPTION</p>\n                <span class="span16 text-ellipsis-span no-padding">\n                    ', 
"complete" === question.type ? (__p += '\n                    <p class="fnt-sz-small txt-alt-grey fnt-wt-600 mdB">Problem Statement</p>\n                    ', 
question.question && (__p += "\n                    " + (null == (__t = question.question) ? "" :__t) + "\n                    <br />\n                    "), 
__p += '\n                    <p class="fnt-sz-small txt-alt-grey fnt-wt-600 mdB">Complete String</p>\n                    ' + (null == (__t = question.complete_string) ? "" :__t) + "\n                    ") :__p += "\n                    " + (null == (__t = question.question) ? "" :__t) + "\n                    ", 
__p += '\n                </span>\n                <div class="clear"></div>\n                <!-- <a class=" font12 terquoise block showmore" href="#">show more <i class="icon-down-open"></i></a> -->\n            </div>\n            <div class="margin-left-0 span16 answer-player-wrapper">\n                <span style="position: relative; top: 5px;" class="fnt-wt-600">CANDIDATE ANSWER</span>\n                ', 
_.contains([ "code", "approx" ], question.type) && question.answered ? __p += '\n                <div class="pull-right">\n                    <a href="#" class="btn btn-small js-btn-copy js-btn-copy-' + (null == (__t = question.id) ? "" :_.escape(__t)) + '" data-qid=' + (null == (__t = question.id) ? "" :_.escape(__t)) + ">copy code</a>\n                </div>\n                " :"design" == question.type && question.submissions.length > 0 && (__p += '\n                <div class="pull-right">\n                    <a href="#" class="btn btn-small js-btn-copy js-btn-render-' + (null == (__t = question.id) ? "" :_.escape(__t)) + '" data-qid=' + (null == (__t = question.id) ? "" :_.escape(__t)) + ">Render Code</a>\n                </div>\n                ", 
"true" === question.multiple_files && (__p += '\n                <div class="pull-right mlR">\n                    <input class="hr-sleek-input" id="js-render-' + (null == (__t = question.id) ? "" :_.escape(__t)) + '-alert" type="checkbox" />\n                    <label for="js-render-' + (null == (__t = question.id) ? "" :_.escape(__t)) + '-alert">\n                        <span></span>\n                        Enable alert in rendered output?\n                    </label>\n                </div>\n                '), 
__p += "\n                "), __p += '\n            </div>\n            <div class="clear"></div>\n\n            <div id="question_answer"></div>\n\n            <div class="question_cont_foot">\n                <div class="comments_container">\n                    ', 
_.each(question.comments, function(comment) {
__p += '\n                    <div class="msT msB">\n                        <p>' + (null == (__t = comment.comment) ? "" :_.escape(__t)) + '</p>\n                        <p class="txt-alt-grey">- ' + (null == (__t = comment.name) ? "" :_.escape(__t)) + " (" + (null == (__t = HR.util.formatDateTime(comment.inserttime)) ? "" :_.escape(__t)) + ")</p>\n                    </div>\n                    ";
}), __p += "\n                </div>\n                ", showcomment && (__p += '\n                <input style="width:70%;" type="text" id="add_new_comment" class="txt_box input-large no-margin" placeholder="Write a comment ...">\n                '), 
__p += "\n            </div><!-- end .question_cont_foot -->\n\n        </div><!-- end .question_container_wrap -->\n    </div><!-- end .report_container_timeline -->\n</div>\n";
return __p;
});