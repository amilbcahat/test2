HR.appController.addTemplate("backbone/templates/x/library-question", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += '<div class="span16">\n    <div class="question-item-container">\n        <table width="100%">\n            <tr>\n                <td width="40%"><span class="fnt-wt-600 txt-alt-grey"> ' + (null == (__t = hrqn[question.type]) ? "" :__t) + "\n                ", 
question.name && (__p += "\n                  &nbsp;&nbsp;</span><strong>" + (null == (__t = question.name) ? "" :_.escape(__t)) + "</strong></td>\n                "), 
__p += '\n                <td width="13%" class="fnt-sz-small"><span class="fnt-wt-600 txt-alt-grey">SCORE: </span><strong>' + (null == (__t = question.points) ? "" :__t) + " points</strong></td>\n                ", 
question.testcasescount && _.keys(question.testcasescount).length > 0 && (__p += '\n                <td width="26%" class="fnt-sz-small" style="text-align:right;">\n                    <span class="fnt-wt-600 txt-alt-grey">TESTCASES: </span>\n                    <strong>' + (null == (__t = _.reduce(_.values(question.testcasescount), function(m, n) {
return m + n;
}, 0)) ? "" :__t) + " (" + (null == (__t = question.samples.split(",").length) ? "" :__t) + " sample)</strong>\n                </td>\n                "), 
__p += "\n                ", "download" != actions && (__p += '\n                <td width="20%" class="fnt-sz-small text-right">\n                    ', 
_.each(question.tags_array, function(tag) {
__p += '\n                    <span class="block-highlight">' + (null == (__t = tag) ? "" :__t) + "</span>\n                    ";
}), __p += "\n                </td>\n                "), __p += '\n            </tr>\n        </table>\n        <div class="row no-margin">\n            <div class="span12 no-padding msT">\n                <div class="', 
noexpand || (__p += "text-ellipsis-oneline"), __p += ' js-qcontent ck_table-wrap">\n                    ' + (null == (__t = question.question) ? "" :__t) + "\n                    ", 
"mcq" == question.type) {
__p += '\n                        <ul style="list-style-type: none; margin-left:-30px; margin-top:20px;">\n                        ';
var i = 1;
_.each(question.options, function(name) {
__p += "\n                          <li>", __p += "" + i == question.answer ? "<img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_ny.png\" />&nbsp;&nbsp;" :"<img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_nn.png\" />&nbsp;&nbsp;", 
__p += "" + (null == (__t = name) ? "" :__t) + "</li>\n                        ", 
i++;
}), __p += "\n                        </ul>\n                    ";
} else if ("multiple_mcq" == question.type) {
__p += '\n                        <ul style="list-style-type: none; margin-left:-30px; margin-top:20px;">\n                        ';
var i = 1, ans = question.answer;
_.each(question.options, function(name) {
__p += "\n                          <li>\n                          ", __p += -1 != $.inArray(i, ans) ? "\n                            <img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_ny.png\" />&nbsp;&nbsp;\n                          " :"\n                            <img class='mcq-opt-img' src=\"/assets/mcq_options/img_mcq_nn.png\" />&nbsp;&nbsp;\n                          ", 
__p += "\n                          " + (null == (__t = name) ? "" :__t) + "</li>\n                        ", 
i++;
}), __p += "\n                        </ul>\n                    ";
}
__p += "\n                </div>\n                ", noexpand || (__p += '\n                <a class="block js-toggleHeight" href="#" data-state="collapsed" >expand <i class="icon-down-open"></i></a>\n                '), 
__p += "\n            </div>\n            <!-- TODO: Check if the user has permissions -->\n            ", 
question.permission && question.permission > 1 && (__p += '\n            <a href="library/questions/' + (null == (__t = question.id) ? "" :__t) + '/edit" class="btn btn-primary mlT pull-right js-edit-question msL" style="width:130px;" data-qid="' + (null == (__t = question.id) ? "" :__t) + '" data-quid="' + (null == (__t = question.unique_id) ? "" :__t) + '">Edit</a>\n            <!-- TODO: Check if the user has permissions -->\n            <!-- <a href="#" class="btn mlT pull-right js-duplicate-question" style="width:130px;" data-qid="' + (null == (__t = question.id) ? "" :__t) + '" data-quid="' + (null == (__t = question.unique_id) ? "" :__t) + '">Duplicate</a> -->\n            '), 
__p += "\n        </div>\n    </div>\n</div>\n";
}
return __p;
});