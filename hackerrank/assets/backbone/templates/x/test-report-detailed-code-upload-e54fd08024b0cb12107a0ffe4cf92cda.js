HR.appController.addTemplate("backbone/templates/x/test-report-detailed-code-upload", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mdA">\n    ', __p += question.answered === !1 ? '\n        <div class="common_margin alert alert-block">\n            <center>This candidate has not answered this question.</center>\n        </div>\n    ' :'\n    <pre class="outbox cm-s-default">\n        <a href="' + (null == (__t = question.my_answer) ? "" :_.escape(__t)) + '" target="_blank">' + (null == (__t = question.my_answer) ? "" :_.escape(__t)) + '</a>\n    </pre>\n    <p><strong>Codechecker message</strong></p>\n    <pre class="outbox cm-s-default">\n        ' + (null == (__t = question.compilemessage) ? "" :_.escape(__t)) + "\n    </pre>\n    ", 
__p += '\n</div>\n<div class="clear"></div>\n';
return __p;
});