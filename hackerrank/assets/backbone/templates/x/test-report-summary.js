HR.appController.addTemplate("backbone/templates/x/test-report-summary", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += "", model.test) {
__p += '\n<div class="row no-margin pjA">\n    ', __p += pdfmode ? '\n    <div class="">\n        <table class="fnt-sz-mid mini-padded span-md-16">\n    ' :'\n    <div class="span-xs-8 span-md-12">\n        <table class="fnt-sz-mid mini-padded">\n    ', 
__p += '\n            <tr>\n                <td width="130px" class="txt-alt-grey fnt-wt-600">EMAIL:</td>\n                <td>' + (null == (__t = model.email) ? "" :_.escape(__t)) + '</td>\n                <td width="130px" class="txt-alt-grey fnt-wt-600">TEST NAME:</td>\n                <td><strong>' + (null == (__t = model.test.name) ? "" :_.escape(__t)) + "</strong></td>\n            </tr>\n            ";
var extra_time = model.actual_extra_time || 0, extra_time_help = '<i class="icon-question-sign tool" data-toggle="tooltip" title="Candidate took ' + extra_time + ' minutes extra" ></i>';
__p += '\n            <tr>\n                <td width="130px" class="txt-alt-grey fnt-wt-600">TAKEN ON:</td>\n                <td>' + (null == (__t = moment(model.starttime).format("D MMM, YYYY - HH:mm")) ? "" :_.escape(__t)) + '</td>\n                <td width="130px" class="txt-alt-grey fnt-wt-600">TIME TAKEN:</td>\n                <td>\n                    ', 
0 != model.status ? (__p += '\n                    <a class="js-backbone" href="tests/' + (null == (__t = model.test.id) ? "" :_.escape(__t)) + "/candidates/" + (null == (__t = model.id) ? "" :_.escape(__t)) + '/report/timeline" ', 
hasDisconnect && (__p += 'rel="tooltip" title="Possible network disconnections. Click to see timeline." data-placement="right"'), 
__p += '><span class="font-w-500">&nbsp;' + (null == (__t = model.total_time_taken + "/" + model.test.duration + " min " + (extra_time > 0 ? extra_time_help :"")) ? "" :__t) + "</span>", 
hasDisconnect && (__p += '<img src="/recruit2/public/images/ico_alert.png" />'), 
__p += "\n                    ") :__p += "\n                    Still taking the test\n                    ", 
__p += "\n                </td>\n            </tr>\n\n            <!-- Candidate details -->\n            ";
for (var i = 0; i < more_details.length; i += 2) __p += '\n            <tr>\n                <td width="130px" class="txt-alt-grey fnt-wt-600">' + (null == (__t = more_details[i].title) ? "" :_.escape(__t)) + ":</td>\n                ", 
__p += "TAG SCORE" != more_details[i].title ? "\n                <td>" + (null == (__t = HR.util.linkify(more_details[i].value)) ? "" :__t) + "</td>\n                " :"\n                <td>" + (null == (__t = HR.util.linkify(more_details[i].value)) ? "" :__t) + "</td>\n                ", 
__p += '\n                <td width="130px" class="txt-alt-grey fnt-wt-600">', more_details[i + 1] && (__p += "" + (null == (__t = more_details[i + 1].title) ? "" :_.escape(__t))), 
__p += "</td>\n                ", more_details[i + 1] && "TAG SCORE" != more_details[i + 1].title ? (__p += "\n                <td>", 
more_details[i + 1] && (__p += "" + (null == (__t = HR.util.linkify(more_details[i + 1].value)) ? "" :__t)), 
__p += "</td>\n                ") :__p += more_details[i + 1] ? "\n                <td>" + (null == (__t = HR.util.linkify(more_details[i + 1].value)) ? "" :__t) + "</td>\n                " :"\n                <td></td>\n                ", 
__p += "\n            </tr>\n            ";
__p += "\n        </table>\n    </div>\n\n    ", __p += pdfmode ? '\n    <div class="clear"></div>\n    <div class="span-xs-8 span-md-16">\n    ' :'\n    <div class="span-xs-8 span-md-4">\n    ', 
__p += '\n        <div class="position-relative">\n            <div class="report-donut-info-wrapper">\n                <p class="text-center font-clr-ltgrey">TOTAL SCORE</p>\n                <p class="text-center font16 font-w-600">' + (null == (__t = Math.round(100 * model.score) / 100) ? "" :__t) + "/" + (null == (__t = model.test.max_score) ? "" :__t) + '</p>\n            </div>\n\n            <!-- temporary code with the help of google charts -->\n            <div id="donut"></div>\n        </div><!-- end position-relative -->\n    </div><!-- end span-xs-16 -->\n\n\n</div><!-- end .row -->\n\n<div class="mjL mjB">\n    ', 
model.feedback && (__p += '\n    <span class="txt-alt-grey fnt-wt-600 span4">\n        CANDIDATE FEEDBACK:\n    </span>\n    <span class="span11">\n        ' + (null == (__t = model.feedback) ? "" :_.escape(__t)) + '\n    </span>\n    <div class="clear"></div>\n    '), 
__p += '\n    <div class="mdT">\n        <span class="txt-alt-grey fnt-wt-600 span4">\n            RECRUITER/TEAM COMMENTS:\n        </span>\n        <div class="clear"></div>\n    </div>\n\n    <div class="question_cont_foot mdT">\n    <div class="comments_container">\n     ', 
model.comments.length > 0 ? (__p += "\n        ", _.each(model.comments, function(comment) {
__p += '\n        <div class="msT msB">\n            <p>' + (null == (__t = comment.comment) ? "" :_.escape(__t)) + '</p>\n            <p class="txt-alt-grey">- ' + (null == (__t = comment.name) ? "" :_.escape(__t)) + " (" + (null == (__t = HR.util.formatDateTime(comment.inserttime)) ? "" :_.escape(__t)) + ")</p>\n        </div>\n        ";
}), __p += "\n    ") :__p += '\n         <div class="msT msB txt-alt-grey"><em>None yet.</em></div>\n    ', 
__p += "\n    </div>\n    ", pdfmode || (__p += '\n    <input style="width:70%;" type="text" id="add_new_report_comment" class="txt_box input-large no-margin" placeholder="Write a comment ...">\n    '), 
__p += "\n    </div><!-- end .question_cont_foot -->\n\n</div><!-- end mjL mjB -->\n\n", 
model.plagiarism && (__p += '\n<div class="alert mjA">\n    <header>Plagarism flagged</header>\n    <p>We have marked questions with suspected plagiarism below. Please review.</p>\n</div>\n'), 
__p += '\n\n<table style="width:96%; margin:30px auto;" class="table table-radius table-out-border fnt-sz-mid ">\n    <thead>\n        <tr class="prominent txt-alt-grey">\n            <th><span style="margin-left:38px;">QUESTION DESCRIPTION</span></th>\n            <th>TIME TAKEN</th>\n            <th>SCORE</th>\n            <th class="text-center">STATUS</th>\n        </tr>\n    </thead>\n\n    ', 
status_classes = {
correct:"icon2-status_correct txt-green",
wrong:"icon2-status_wrong txt-orange",
review:"icon2-generalsettings txt-yellow",
unattempted:"icon2-status_no_ans txt-alt-grey",
neutral:"icon2-status_no_ans txt-alt-grey"
}, __p += "\n\n    ", _.each(model.questions, function(question, index) {
var plagiarism = !1;
model.plagiarism && model.plagiarism.plagiarism.questions[question.id] && (plagiarism = !0), 
tt = index + 1 in tq_split && tq_split[index + 1] ? HR.util.prettyPrintSeconds(tq_split[index + 1]) :"-", 
__p += "\n    <tr ", plagiarism && (__p += 'style="background: #fee7e4;"'), __p += '>\n        <td width="60%" class="fnt-wt-600">\n            <span class="txt-alt-grey mdR">Q' + (null == (__t = index + 1) ? "" :_.escape(__t)) + "</span>\n            ", 
__p += question.name ? '\n            <span class="green">' + (null == (__t = question.name) ? "" :_.escape(__t)) + "</span>\n            " :'\n            <span class="green">' + (null == (__t = question.preview) ? "" :_.escape(__t)) + "</span>\n            ", 
__p += '\n            <i class="icon-right-open-mini"></i>\n            <span class="display-inline-block">' + (null == (__t = HR.util.readableQuestionType(question.type)) ? "" :_.escape(__t)) + '</span>\n            <span class="display-block" style="margin-left:37px;"><a href="/tests/' + (null == (__t = test.id) ? "" :_.escape(__t)) + "/candidates/" + (null == (__t = model.id) ? "" :_.escape(__t)) + "/report/detailed/" + (null == (__t = question.id) ? "" :_.escape(__t)) + '" class="js-backbone" data-qid=' + (null == (__t = question.id) ? "" :_.escape(__t)) + ' data-tab="detailed">(view detailed report)</a></span>\n        </td>\n        <td width="15%">' + (null == (__t = tt) ? "" :__t) + "</td>\n        ", 
__p += $.inArray(question.type, [ "subjective", "uml", "electrical", "file_upload" ]) > -1 || _.isUndefined(question.points) ? '\n        <td width="10%">' + (null == (__t = question.score) ? "" :_.escape(__t)) + "</td>\n        " :'\n        <td width="10%">' + (null == (__t = question.score) ? "" :_.escape(__t)) + "/" + (null == (__t = question.points) ? "" :_.escape(__t)) + "</td>\n        ", 
__p += '\n        <td width="10%" class="text-center">\n            ', __p += plagiarism ? '\n            <h3 class="mmT"><i class="' + (null == (__t = status_classes.review) ? "" :_.escape(__t)) + '"></i></h3>\n            ' :question.status && status_classes[question.status] ? '\n            <h3 class="mmT"><i class="' + (null == (__t = status_classes[question.status]) ? "" :_.escape(__t)) + '"></i></h3>\n            ' :'\n            <h3 class="mmT"><i class="' + (null == (__t = status_classes.neutral) ? "" :_.escape(__t)) + '"></i></h3>\n            ', 
__p += "\n        </td>\n    </tr>\n    ";
}), __p += "\n</table>\n";
}
__p += "\n";
}
return __p;
});