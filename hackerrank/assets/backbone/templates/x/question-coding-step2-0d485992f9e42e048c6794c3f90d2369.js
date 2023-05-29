HR.appController.addTemplate("backbone/templates/x/question-coding-step2", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n.CodeMirror-scroll\n{\n  overflow-x:hidden !important;\n  width: 100%;\n  padding-right:0px;\n}\n</style>\n\n<form name="coding-question-step2-form">\n    <div class="mjA">\n        <div class="formgroup">\n            <label>Allowed Languages</label>\n            <p class="txt-alt-grey-dark span11 no-padding">Candidate will have an option to solve this question in any of the languages you select below.</p>\n            <div class="clear"></div>\n            <p class="txt-alt-grey-dark span11 no-padding msT">If you want the candidates to complete a function instead of writing full code, select the option to generate stubs.</p>\n            <div class="clear"></div>\n\n            ';
var languages = {
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
php:"PHP",
python:"Python 2",
ruby:"Ruby",
javascript:"Javascript",
perl:"Perl",
haskell:"Haskell",
scala:"Scala",
clojure:"Clojure",
go:"Go",
erlang:"Erlang",
groovy:"Groovy",
objectivec:"Objective C",
java8:"Java 8"
};
__p += "\n\n            ";
var additional_languages = {
code:"Code",
oracle:"Oracle",
tsql:"T-SQL",
cobol:"Cobol",
bash:"BASH",
visualbasic:"Visual Basic"
};
__p += "\n\n            ";
var additional_languages_keys = [ "code", "oracle", "tsql", "cobol", "bash", "visualbasic" ];
__p += "\n            ", additional_languages_used = _.intersection(allowedLanguages, additional_languages_keys), 
__p += "\n\n            ", _.each(additional_languages_used, function(lang) {
languages[lang] = additional_languages[lang];
}), __p += '\n\n            <div class="mlT">\n                <table class="languages_table" border="0" cellpadding="0" cellspacing="0">\n                    <tbody>\n                        ', 
i = 0, __p += "\n                        ", _.each(languages, function(label, key) {
__p += "\n                            ", 0 == i ? __p += "\n                            <tr>\n                            " :i % 8 == 0 && (__p += "\n                            </tr>\n                            <tr>\n                            "), 
__p += '\n                            <td>\n                               <input class="hr-sleek-input" id="allowed_lang_' + (null == (__t = key) ? "" :_.escape(__t)) + '" type="checkbox" ', 
model.allowedLanguages && -1 == allowedLanguages.indexOf(key) || (__p += " checked "), 
__p += ' value="' + (null == (__t = key) ? "" :_.escape(__t)) + '" name="allowedLanguages" />\n                               <label for="allowed_lang_' + (null == (__t = key) ? "" :_.escape(__t)) + '" class="languages ', 
model.allowedLanguages && -1 == allowedLanguages.indexOf(key) || (__p += "active"), 
__p += '">\n                                    <span></span>\n                                    ' + (null == (__t = label) ? "" :_.escape(__t)) + "\n                               </label>\n                            </td>\n                            ", 
i++, __p += "\n                        ";
}), __p += '\n                        </tr>\n                    </tbody>\n                </table>\n            <div> <!-- end .mlT -->\n        </div><!-- end .formgroup -->\n\n        <ul class="inline lines large mlB">\n            <li><a href="#" class="normal-underline js-select-all">Select all</a></li>\n            <li><a href="#" class="normal-underline js-clear-all">Clear all</a></li>\n        </ul>\n\n        <div class="formgroup">\n            <label>Add code stubs for the question <span class="fnt-wt-600 txt-alt-grey">(optional)</span></label>\n            <label><input type="radio" name="template_type" value="0" ', 
"0" == model.template_type && (__p += "checked"), __p += '> <span class="fnt-wt-400">I would like the candidate to write the full code.</span></label>\n            <label><input type="radio" name="template_type" ', 
"1" == model.template_type && (__p += "checked"), __p += '> <span class="fnt-wt-400">I would like the candidate to write a function and I will provide stubs.</span></label>\n        </div><!-- end .formgroup -->\n\n    </div><!-- end mjA -->\n\n    <div class="row no-margin pjT js-code-stubs-section" ', 
"0" == model.template_type && (__p += 'style="display: none"'), __p += '>\n        <div class="pull-left mdR" style="max-width:362px;">\n            <div class="form-group">\n                <label>Enter your function name</label>\n                <input type="text" placeholder="function name" name="functionName" style="width:305px;" ', 
model.functionName && (__p += 'value="' + (null == (__t = model.functionName) ? "" :_.escape(__t)) + '"'), 
__p += '></input>\n            </div>\n            <div class="form-group">\n                <label>Return type</label>\n                <!-- select2 here -->\n                <input type="hidden" id="brahma-return-type" style="width:305px;" value="', 
__p += model.functionReturn ? "" + (null == (__t = model.functionReturn) ? "" :__t) :"INTEGER", 
__p += '" name="functionReturn">\n            </div>\n\n            <div class="form-group" id="brahma-parameters-container">\n                <label class="mdT">Parameters to the function</label>\n                ', 
model.functionParams && (__p += "\n                ", parameters = model.functionParams.split(","), 
__p += "\n                ", _.each(parameters, function(parameter, index) {
__p += "\n                ", paramParts = parameter.split(" "), __p += '\n                <div class="block js-brahma-parameter">\n                    <input type="hidden" id="brahma-parameter-select2-' + (null == (__t = index) ? "" :__t) + '"style="width:10px;" class=" js-parameter-type" value="' + (null == (__t = paramParts[0]) ? "" :_.escape(__t)) + '" data-id="' + (null == (__t = index) ? "" :__t) + '" name="functionParameterType">\n                    <input style="width:70px;" type="text" name="functionParameterName" value="' + (null == (__t = paramParts[1]) ? "" :_.escape(__t)) + '" class="msA mmR"></input>\n                    <a href="#" class="txt-alt-grey psA js-remove-parameter"><i class=\'icon2-delete\'></i></a>\n                </div>\n                ';
})), __p += '\n            </div>\n            <div class="error hidden span5" id="js-brahma-parameter-error">\n                Please provide valid names.\n                <br/>\n                <ul></ul>\n            </div>\n            <div class="clearfix" />\n            <button type="button" class="btn js-add-parameter"><i class="icon-plus"></i>Add ', 
__p += model.functionParams && model.functionParams.trim() ? "Another" :"Parameter", 
__p += '</a>\n            <br/>\n            <button type="button" class="btn js-generate-templates mdL">Generate Code</a>\n        </div>\n        <div class="span-xs-16 span-md-9 no-padding">\n            <div class="codeblock-wrapper span16 no-padding">\n                ', 
lang = _.first(allowedLanguages), __p += '\n                <div class="codeblock-head no-background">\n                    <ul class="nav-tabs nav pull-left no-margin no-border js-code-section-tabs-list">\n                        <li><a class="js-code-section-tab" data-id="template_head" href="#">Head</a></li>\n                        <li class="active"><a class="js-code-section-tab" data-id="template" href="#">Body</a></li>\n                        <li><a class="js-code-section-tab" data-id="template_tail" href="#">Tail</a></li>\n                    </ul>\n                    <div class="pull-right msA">\n                        <input type="hidden" id="code-editor-lang-select2" class="wide" value="' + (null == (__t = lang) ? "" :__t) + '">\n                    </div>\n                    <div class="clear"></div>\n                </div>\n                <textarea id="template_head" class="hidden">' + (null == (__t = model[lang + "_template_head"]) ? "" :_.escape(__t)) + '</textarea>\n                <textarea id="template">' + (null == (__t = model[lang + "_template"]) ? "" :_.escape(__t)) + '</textarea>\n                <textarea id="template_tail" class="hidden">' + (null == (__t = model[lang + "_template_tail"]) ? "" :_.escape(__t)) + '</textarea>\n            </div>\n        </div>\n    </div><!-- end .row -->\n\n    <div class="mjA">\n        <div class="row no-margin plT">\n            <div class="span-xs-16 span-md-16">\n                <button type="submit" class="btn btn-primary btn-mid">Save & Proceed</button>\n            </div>\n        </div>\n    </div>\n</form>\n<div id="language-change-modal-container"></div>\n';
}
return __p;
});