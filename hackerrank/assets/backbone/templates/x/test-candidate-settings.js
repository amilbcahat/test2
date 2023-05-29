HR.appController.addTemplate("backbone/templates/x/test-candidate-settings", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">' + (null == (__t = model.name) ? "" :_.escape(__t)) + '</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Candidate Settings</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    <div class="mjA">\n        <p class="pdB">\n            By default, on the test\'s login page the candidate will be prompted only for an email address and access code.\n            If you wish you can collect additional details, and have them show up\n            in the candidate\'s test report. Select from the following list, or add a detail of your own.\n        </p>\n        <form name="test-candidate-settings-form">\n            <table class="languages_table" border="0" cellpadding="0" cellspacing="0">\n                <tbody>\n                ', 
i = 0, __p += "\n                ", _.each(candidateSettings, function(data, title) {
__p += "\n                    ", 0 == i ? __p += "\n                    <tr>\n                    " :i % 3 == 0 && (__p += "\n                    </tr>\n                    <tr>\n                    "), 
__p += '\n\n                    <td>\n                        <input class="hr-sleek-input" id="cand_' + (null == (__t = title) ? "" :_.escape(__t)) + '" name="' + (null == (__t = data.name) ? "" :_.escape(__t)) + '" type="checkbox" ', 
data.checked && (__p += " checked "), __p += ' value="' + (null == (__t = data.value) ? "" :_.escape(__t)) + '" />\n                        <label for="cand_' + (null == (__t = title) ? "" :_.escape(__t)) + '">\n                            <span></span>\n                            ' + (null == (__t = data.label) ? "" :__t) + "\n                        </label>\n                    </td>\n\n                    ", 
i++, __p += "\n                ";
}), __p += '\n                </tbody>\n            </table>\n\n            <div class="row no-margin plT">\n                <input class="no-margin" type="text" value="" placeholder="Add a custom detail" name="custom_field" />\n                <a href="#" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-mid js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-mid js-add-custom-field"', 
__p += '>Add</a>\n            </div>\n\n            <div class="plT">\n                <button type="submit" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-primary btn-mid js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary btn-mid"', 
__p += ">Save</button>\n            </div>\n        </form>\n    </div>\n</div>\n";
return __p;
});