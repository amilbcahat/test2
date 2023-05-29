HR.appController.addTemplate("backbone/templates/x/test-allowed-languages", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<div class="mjA">\n    <label class="label-title-underline">\n        SET ALLOWED LANGUAGES\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">Select the languages for your coding questions.</p>\n    <div class="clear"></div>\n    <div class="formgroup radio inline-block mlT">\n        <div class="formgroup horizontal checkbox hr_checkbox psB">\n            <label for="select_all" class="hr-checkbox select-all">\n            <input id="select_all" name="select-all" type="checkbox" value="all" />\n            <span class="">Select all</span>\n            </label>\n        </div>\n    </div>\n\n    ';
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
objectivec:"Objective C"
};
__p += '\n    <form name="test-allowedLanguages-form">\n        <table class="languages_table mlT" border="0" cellpadding="0" cellspacing="0">\n            <tbody>\n                ', 
i = 0, __p += "\n                ", _.each(languages, function(label, key) {
__p += "\n                    ", 0 == i ? __p += "\n                    <tr>\n                    " :i % 8 == 0 && (__p += "\n                    </tr>\n                    <tr>\n                    "), 
__p += '\n                    <td>\n                       <div class="formgroup horizontal checkbox hr_checkbox psB">\n                          <label for="allowed_lang_' + (null == (__t = key) ? "" :_.escape(__t)) + '" class="hr-checkbox languages ', 
model.allowedLanguages && -1 == allowedLanguages.indexOf(key) || (__p += "active"), 
__p += '">\n                            <input id="allowed_lang_' + (null == (__t = key) ? "" :_.escape(__t)) + '" name="allowedLanguages" type="checkbox" ', 
model.allowedLanguages && -1 == allowedLanguages.indexOf(key) || (__p += " checked "), 
__p += ' value="' + (null == (__t = key) ? "" :_.escape(__t)) + '" />\n                            <span class="">' + (null == (__t = label) ? "" :_.escape(__t)) + "</span>\n                          </label>\n                        </div>\n                    </td>\n                    ", 
i++, __p += "\n                ";
}), __p += '\n            </tbody>\n        </table>\n\n        <button type="submit" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-primary margin-large right js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right"', 
__p += ">Save</button>\n    </form>\n\n</div><!-- end .mjA -->\n";
}
return __p;
});