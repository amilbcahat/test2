HR.appController.addTemplate("backbone/templates/recruit/question-code-upload", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="font20 f-weight-600">ANSWER - Please upload your file here</p>\n\n<div class="inline-block mlT current-answer-section hidden">\n    Current Answer: <span id="current_answer" style="padding-left: 10px"></span>\n</div>\n\n<div class="inline-block mlT">\n    <input type="file" name="answer" title="Choose a file">\n</div>\n\n<div class="clear"></div>\n<button type="button" name="run-code" class="btn mdT mdB mdR">Run Code</button>\n<button class="btn btn-primary mdT mdB mdR ans-submit" style="width:225px;">Submit answer & continue</button>\n\n<div class="clear"></div>\n<div id="runstatus"></div>\n';
return __p;
});