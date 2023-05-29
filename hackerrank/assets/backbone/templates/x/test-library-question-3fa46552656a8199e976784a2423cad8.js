HR.appController.addTemplate("backbone/templates/x/test-library-question", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += "", "undefined" == typeof withAns && (withAns = !0), __p += '\n<div class="span-xl-16">\n    <div class="', 
__p += "download" == actions ? "mlT mlB" :"question-item-container ", __p += '">\n        <table width="100%" class="', 
"download" != actions && (__p += "mlB"), __p += '">\n            <tr>\n                <td width="40%"><span class="fnt-wt-600 ', 
__p += "download" == actions ? '"> <h4 class="msR"> Question -  ' + (null == (__t = question.question_index) ? "" :_.escape(__t)) + " </h4> " :' txt-alt-grey"> ' + (null == (__t = hrqn[question.type]) ? "" :__t) + "\n                ", 
question.name && (__p += "\n                  &nbsp;&nbsp;</span><strong>" + (null == (__t = question.name) ? "" :_.escape(__t)) + "</strong></td>\n                "), 
__p += '\n                <td width="13%" class="fnt-sz-small">', withAns === !0 && (__p += ' <span class="fnt-wt-600 txt-alt-grey">SCORE: </span><strong>', 
__p += test.max_score && test.max_score[question.type] && test.max_score[question.type][question.id] ? "" + (null == (__t = test.max_score[question.type][question.id]) ? "" :__t) :"" + (null == (__t = question.points) ? "" :__t), 
__p += " points</strong></td> "), __p += "\n                ", "download" != actions && question.testcasescount && _.keys(question.testcasescount).length > 0 && (__p += '\n                <td width="26%" class="fnt-sz-small" style="text-align:right;">\n                    <span class="fnt-wt-600 txt-alt-grey">TESTCASES: </span>\n                    <strong>' + (null == (__t = _.reduce(_.values(question.testcasescount), function(m, n) {
return m + n;
}, 0)) ? "" :__t) + " (" + (null == (__t = question.samples.split(",").length) ? "" :__t) + " sample)</strong>\n                </td>\n                "), 
__p += "\n                ", "download" != actions && (__p += '\n                <td width="20%" class="fnt-sz-small text-right">\n                    ', 
_.each(question.tags_array, function(tag) {
__p += '\n                    <span class="block-highlight">' + (null == (__t = tag) ? "" :__t) + "</span>\n                    ";
}), __p += "\n                </td>\n                "), __p += "\n            </tr>\n        </table>\n        ", 
"download" == actions && (__p += "<hr />"), __p += '\n        <div class="row no-margin">\n            <div class="span12 no-padding msT">\n                <div class="', 
noexpand || (__p += "text-ellipsis-oneline"), __p += ' js-qcontent ck_table-wrap">\n                    ' + (null == (__t = question.question) ? "" :__t) + "\n                    ", 
"mcq" == question.type) {
__p += '\n                        <ul style="list-style-type: none; margin-left:-30px; margin-top:20px;">\n                        ';
var i = 1;
_.each(question.options, function(name) {
__p += "\n                          <li>", __p += withAns === !0 && "" + i == question.answer ? "<img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_ny.png\" />&nbsp;&nbsp;" :"<img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_nn.png\" />&nbsp;&nbsp;", 
__p += "" + (null == (__t = name) ? "" :__t) + "</li>\n                        ", 
i++;
}), __p += "\n                        </ul>\n                    ";
} else if ("multiple_mcq" == question.type) {
__p += '\n                        <ul style="list-style-type: none; margin-left:-30px; margin-top:20px;">\n                        ';
var i = 1, ans = question.answer;
_.each(question.options, function(name) {
__p += "\n                          <li>\n                          ", __p += withAns === !0 && -1 != $.inArray(i, ans) ? "\n                            <img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_ny.png\" />&nbsp;&nbsp;\n                          " :"\n                            <img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_nn.png\" />&nbsp;&nbsp;\n                          ", 
__p += "\n                          " + (null == (__t = name) ? "" :__t) + "</li>\n                        ", 
i++;
}), __p += "\n                        </ul>\n                    ";
}
__p += "\n                </div>\n                ", noexpand || (__p += '\n                <a class="block js-toggleHeight" href="#" data-state="collapsed" >expand <i class="icon-down-open"></i></a>\n                '), 
__p += "\n            </div>\n            ", actions && "download" != actions && (__p += "\n                ", 
__p += -1 != test.questions_array.indexOf(question.id.toString()) ? '\n                <a href="#" class="btn btn-alert mlT pull-right js-remove-question" style="width:140px;" data-qid="' + (null == (__t = question.id) ? "" :__t) + '" data-quid="' + (null == (__t = question.unique_id) ? "" :__t) + '">Remove</a>\n                ' :'\n                <a href="#" class="btn btn-primary mlT pull-right js-add-question" style="width:140px;" data-qid="' + (null == (__t = question.id) ? "" :__t) + '" data-quid="' + (null == (__t = question.unique_id) ? "" :__t) + '">Add</a>\n                ', 
__p += "\n            "), __p += "\n        </div>\n    </div>\n</div>\n";
}
return __p;
});