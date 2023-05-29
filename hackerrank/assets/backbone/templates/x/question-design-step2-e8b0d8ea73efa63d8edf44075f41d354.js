HR.appController.addTemplate("backbone/templates/x/question-design-step2", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n.CodeMirror-scroll\n{\n  overflow-x:hidden !important;\n  width: 100%;\n  padding-right:0px;\n}\n</style>\n\n<form name="design-question-step2-form">\n    <div class="mjA">\n        <div class="formgroup">\n            ';
var languages = {
javascript:"Javascript",
css:"CSS",
html:"HTML"
};
__p += '\n            <label>Add code stubs for the question <span class="fnt-wt-600 txt-alt-grey">(optional)</span></label>\n        </div><!-- end .formgroup -->\n\n    </div><!-- end mjA -->\n\n    <div class="row pjL js-code-stubs-section">\n        <div class="span-xs-16 span-md-9 no-padding">\n            <div class="codeblock-wrapper span16 no-padding">\n                <div class="codeblock-head no-background">\n                    <ul class="nav-tabs nav pull-left no-margin no-border js-code-section-tabs-list">\n                        ', 
_.each(languages, function(lang_name, lang) {
__p += '\n                        <li class="', "html" == lang && (__p += "active"), 
__p += '"><a class="js-code-section-tab" data-lang="' + (null == (__t = lang) ? "" :_.escape(__t)) + '" data-id="template_' + (null == (__t = lang) ? "" :_.escape(__t)) + '" href="#">' + (null == (__t = lang_name) ? "" :_.escape(__t)) + "</a></li>\n                        ";
}), __p += '\n                    </ul>\n                    <div class="clear"></div>\n                </div>\n                ', 
_.each(languages, function(lang_name, lang) {
__p += '\n                    <textarea id="template_' + (null == (__t = lang) ? "" :_.escape(__t)) + '" class="hidden">' + (null == (__t = model[lang + "_template"]) ? "" :_.escape(__t)) + "</textarea>\n                ";
}), __p += '\n            </div>\n        </div>\n    </div><!-- end .row -->\n\n    <div class="mjA">\n        <div class="row no-margin plT">\n            <div class="span-xs-16 span-md-16">\n                <button type="submit" class="btn btn-primary btn-mid">Save Question</button>\n                <em>or</em>\n                <button type="button" class="btn btn-mid js-save-and-add">Save & Add another</button>\n            </div>\n        </div>\n    </div>\n</form>\n';
}
return __p;
});