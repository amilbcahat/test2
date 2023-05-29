HR.appController.addTemplate("backbone/templates/x/question-mcq-choice", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<a href="#" style="right:40px;" class="mcq-btn mcq-mark-ans btn btn-mini js-mark-answer">', 
__p += answer ? "Unmark" :"Mark", __p += ' as answer</a>\n<a href="#" class="mcq-btn mcq-remove-btn btn btn-mini js-remove-option">\u2715</a>\n<div class="mcq-option">\n <center>\n 	<span class="option-title">' + (null == (__t = String.fromCharCode(65 + index)) ? "" :_.escape(__t)) + '</span><br><span class="mcq-choice-ico"></span>\n </center>\n</div>\n<textarea rows="3" class="pull-left choice-textarea choices" tabindex="3" id="choice_' + (null == (__t = index) ? "" :_.escape(__t)) + '">' + (null == (__t = choice) ? "" :_.escape(__t)) + '</textarea>\n<div style="margin-left:39px;"><!-- populate CK editor here --></div>\n<div class="clear_float"></div>\n';
return __p;
});