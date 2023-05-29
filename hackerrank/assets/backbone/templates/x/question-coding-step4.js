HR.appController.addTemplate("backbone/templates/x/question-coding-step4", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<form name="coding-question-step4-form">\n    <div class="mjA">\n        <div class="formgroup">\n            <label>Custom Checker</label>\n            <p class="txt-alt-grey-dark span9 no-padding">Choose the language in which you will write the checker for your approximate question.</p>\n        </div>\n        <div class="clear"></div>\n        <label class="mdT">Write your checker here</label>\n        <div class="span-xs-16 span-md-11 mdT no-padding">\n            <div class="codeblock-wrapper span16 no-padding">\n                ', 
model.evaluator_language ? (__p += "\n                ", lang = model.evaluator_language, 
__p += "\n                ") :(__p += "\n                ", lang = "cpp", __p += "\n                "), 
__p += '\n                <div class="codeblock-head no-background">\n                    <div class="pull-right">\n                        <input type="hidden" id="code-editor-lang-select2" class="wide" value="' + (null == (__t = lang) ? "" :__t) + '">\n                    </div>\n                    <div class="clear"></div>\n                </div>\n                <textarea id="evaluator_code">' + (null == (__t = model.evaluator_code || "") ? "" :_.escape(__t)) + '</textarea>\n            </div>\n        </div>\n\n        <div class="mjA">\n            <div class="row no-margin plT">\n                <div class="span-xs-16 span-md-16">\n                    <button type="submit" class="btn btn-primary btn-mid">Save Question</button>\n                    <em>or</em>\n                    <button type="button" class="btn btn-mid js-save-and-add"> Save & Add another </button>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</form>\n';
return __p;
});