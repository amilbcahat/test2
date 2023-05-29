HR.appController.addTemplate("backbone/templates/x/question-subjective", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", withSteps = !0, _.include([ "uml", "electrical" ], model.type) || (withSteps = !1, 
__p += '\n<div class="top-fixed-bar">\n    ', test && (__p += ' <h3 class="topbar-h3 mjL">' + (null == (__t = test.name) ? "" :_.escape(__t)) + "</h3> "), 
__p += '\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Questions</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>', 
__p += edit ? "Edit" :"Create", __p += " question</h3>\n</div><!-- end .top-fixed-bar -->\n"), 
__p += '\n<div class="overflow-content" id="control-overflow">\n    <form name="subjective-question-form">\n        <div class="mjA">\n            <div class="row no-margin">\n                <div class= "span-xs-16 span-md-10">\n                    <label>PROBLEM STATEMENT</label>\n                    <textarea class="editor_width texteditor" name="problem-description" id="problem-description" style="width: 100%">', 
model.question && (__p += "" + (null == (__t = model.question) ? "" :_.escape(__t))), 
__p += '</textarea>\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>PROBLEM NAME</label>\n                    <input type="text" name="name" id="problem-name" value="', 
model.name && (__p += "" + (null == (__t = model.name) ? "" :_.escape(__t))), __p += '">\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>SCORE</label>\n                    <input type="text" placeholder="Enter score" id="score" ', 
__p += model.score ? 'value="' + (null == (__t = model.score) ? "" :__t) + '" ' :' value="0"', 
__p += ' >\n                    <div class="clear"/>\n                    <small class="grey"><em>This score is only for reference. The score for a candidate has to be marked manually after reviewing the answer.</em></small>\n                </div>\n            </div>\n            <div class="row no-margin plT">\n                <div class="span-xs-16 span-md-16">\n\n                    <button type="submit" class="btn btn-primary btn-mid">Save ', 
__p += withSteps ? "& Proceed" :"Question", __p += " </button>\n                    ", 
withSteps || (__p += '\n                    <em>or</em>\n                    <button type="button" class="btn btn-mid js-save-and-add">Save & Add another</button>\n                    '), 
__p += "\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n";
return __p;
});