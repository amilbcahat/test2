HR.appController.addTemplate("backbone/templates/x/test-report-detailed-rewrite-complete", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mdA">\n    ', question.answered === !1 ? __p += '\n    <div class="common_margin alert alert-block">\n        <center>This candidate has not answered this question.</center>\n    </div>\n    ' :(__p += '\n    <pre class="outbox cm-s-default">\n      ', 
__p += question.answer_text ? "" + (null == (__t = question.answer_text) ? "" :__t) :"" + (null == (__t = question.my_answer) ? "" :__t), 
__p += "\n    </pre>\n    "), __p += '\n</div>\n<div class="clear"></div>\n';
return __p;
});