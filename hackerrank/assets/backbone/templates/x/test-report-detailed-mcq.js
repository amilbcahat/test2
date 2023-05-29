HR.appController.addTemplate("backbone/templates/x/test-report-detailed-mcq", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mdA">\n    ', question.answered === !1 ? __p += '\n    <div class="common_margin alert alert-block">\n        <center>This candidate has not answered this question.</center>\n    </div>\n    ' :(__p += '\n    <p><strong>Options:</strong><span class="txt-alt-grey"> (Expected answer indicated with a tick)</span></p>\n    <ul class="pull-left mcq-reports-answer">\n    </ul>\n    ', 
question.explanation_box && "true" == question.explanation_box.toLowerCase() && (__p += '\n        <div class="clear"></div>\n        <div class="margin-bott-5 ">\n            <strong>Explanation:</strong>\n        </div>\n        ', 
__p += question.metadata && question.metadata.explanation ? "\n        <blockquote>" + (null == (__t = question.metadata.explanation) ? "" :__t) + "</blockquote>\n        " :"\n        No explanation given.\n        ", 
__p += "\n        "), __p += "\n    "), __p += '\n</div>\n<div class="clear"></div>\n';
return __p;
});