HR.appController.addTemplate("backbone/templates/recruit/question-coding", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="editor" class="codeshell mlT mlB"></div>\n', question.has_samples && (__p += '\n<div class="bb-runall pull-right">\n  <label><input type="checkbox" id="js-runall-cases"> Run against all testcases.</label>\n</div>\n<div id="dllink" class="mdB"><a id="testcase-dl" href="javascript:void(0);"><i class="icon--single icon-download"> Download sample testcases</i></a><small class="mlL"><em class="txt-alt-grey-dark">The input/output files have Unix line endings. Do not use Notepad to edit them on windows.</em></small></div>\n'), 
__p += '\n<div id="runstatus"></div>\n';
return __p;
});