HR.appController.addTemplate("backbone/templates/x/test-report-detailed-subjective", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mdA">\n    ', question.answered === !1 ? __p += question.my_saved_answer ? '\n        <div class="alert info">\n            <p class="text-center">This candidate has not answered this question. Showing auto-saved answer.</p>\n        </div>\n        <pre class="outbox cm-s-default">' + (null == (__t = question.my_saved_answer) ? "" :_.escape(__t)) + "</pre>\n    " :'\n        <div class="common_margin alert alert-block">\n            <center>This candidate has not answered this question.</center>\n        </div>\n        ' :(__p += '\n    <pre class="outbox cm-s-default">\n        ', 
__p += "file_upload" == question.type ? '\n        <a href="' + (null == (__t = question.my_answer) ? "" :_.escape(__t)) + '" target="_blank">' + (null == (__t = question.my_answer) ? "" :_.escape(__t)) + "</a>\n        " :"\n        " + (null == (__t = question.my_answer) ? "" :_.escape(__t)) + "\n        ", 
__p += "\n    </pre>\n    "), __p += '\n</div>\n<div class="clear"></div>\n';
return __p;
});