HR.appController.addTemplate("backbone/templates/secondary-emails", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="secondary-email-list" class=""></div>\n<div id="add-new-secondary-email"\n    ', 
input || (__p += '\n        style="display: none;"\n    '), __p += ' >\n    <input\n         id="secondary-email-input"\n         type="text"\n         class="wide msL"\n         ', 
input && (__p += '\n         value="' + (null == (__t = input) ? "" :__t) + '"\n         '), 
__p += ' \\>\n    <button\n         id="secondary-email-add-button"\n         class="btn btn-line" >Add</button>\n    <button\n         id="secondary-email-cancel-button"\n         class="btn btn-line" >Cancel</button>\n    <br>\n    <small class="error msL">' + (null == (__t = errors.join("<br>")) ? "" :__t) + '</small>\n</div>\n<div class="add-email"></div>\n<p class="span12"><a class="cursor btn btn-small msT msL settings_content-addemail" id="btn-add-sec-email">\n        <i class="icon-plus"></i>Add another email</a></p>\n';
return __p;
});