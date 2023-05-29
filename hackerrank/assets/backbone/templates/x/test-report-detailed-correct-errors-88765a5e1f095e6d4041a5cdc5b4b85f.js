HR.appController.addTemplate("backbone/templates/x/test-report-detailed-correct-errors", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mdA">\n    ', question.answered === !1 ? __p += '\n    <div class="common_margin alert alert-block">\n        <center>This candidate has not answered this question.</center>\n    </div>\n    ' :(__p += '\n    <pre class="outbox cm-s-default">\n      ' + (null == (__t = question.diff_html) ? "" :__t) + "\n    </pre>\n    ", 
1 === question.evaluated ? (__p += "\n    <p>Scores given for:\n    ", _.each(question.metadata, function(correct) {
__p += "" + (null == (__t = correct) ? "" :_.escape(__t)) + ", ";
}), __p += "\n    </p>\n    ") :__p += '\n    <div class="alert alert-block">\n        <p>\n            This question has not yet been evaluated.\n        </p>\n    </div>\n    ', 
__p += "\n    "), __p += '\n</div>\n<div class="clear"></div>\n';
return __p;
});