HR.appController.addTemplate("backbone/templates/administration/challenge-edit-languages-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="language-card">\n    <div class="span11pct no-margin">\n        <div class="checkbox-container">\n            <input ', 
has_languages && (__p += 'checked="checked"'), __p += ' id="enable-checkbox-' + (null == (__t = language_key) ? "" :__t) + '" class="hidden-checkbox" type="checkbox"/>\n        </div>\n        <div class="language-title">\n            <label for="enable-checkbox-' + (null == (__t = language_key) ? "" :__t) + '"><b>' + (null == (__t = language_data.title) ? "" :__t) + '</b></label>\n        </div>\n    </div>\n    <div class="span37pct slider-result no-border">\n      <span class="time-value">\n          ', 
__p += model.get_checker_limit("time", language_key) ? "\n              " + (null == (__t = model.get_checker_limit("time", language_key)) ? "" :__t) + "\n          " :"\n              " + (null == (__t = language_data.def_time) ? "" :__t) + "\n          ", 
__p += '\n      </span> s\n    </div>\n    <div class="span37pct margin-left-20 slider-result no-border">\n      <span class="mem-value">\n          ', 
__p += model.get_checker_limit("mem", language_key) ? "\n              " + (null == (__t = model.get_checker_limit("mem", language_key)) ? "" :__t) + "\n          " :"\n              " + (null == (__t = language_data.def_mem) ? "" :__t) + "\n          ", 
__p += '\n      </span> MB\n    </div>\n    <div class="pull-right text-right controls">\n        <a class="cursor gray-text edit-lang"><i class="icon-pencil"></i></a>\n        <a class="cursor cancel hide">&#215;</a>\n    </div>\n    <div class="clearfix"></div>\n\n    <div class="language-card-dropdown"></div>\n</div>\n';
return __p;
});