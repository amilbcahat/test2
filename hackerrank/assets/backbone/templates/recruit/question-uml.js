HR.appController.addTemplate("backbone/templates/recruit/question-uml", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="font20 f-weight-600">ANSWER</p>\n<p>You can drag and drop the widgets to construct your diagram. If you\'d like to include any explanatory comments on your work you can do so in the editor below the drawing widget.</p>\n<br />\n<div id= "geEditor" class="geEditor"  ></div>\n<input name="draw_xml" id="draw_xml" type="hidden" ></input>\n<input name="draw_svg" id="draw_svg" type="hidden" ></input>\n<br />\n<p class="font20 f-weight-600">Explanation</p>\n<em class="fnt-sz-small grey" style="font-weight: 500;">Your answer will be periodically saved as a draft.</em>\n<div id="editor" class="codeshell msT mlB"></div>\n';
return __p;
});