HR.appController.addTemplate("backbone/templates/x/settings-email", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Settings</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Email Notifications</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    <div class="mjA">\n        <form class="email-radio-group-form">\n            <div class="msT msB">\n                <label>\n                    <input type="radio" name="usr-email-noti" value="0" ', 
current_user.notification && 0 == current_user.notification && (__p += " checked='checked' "), 
__p += ' />\n                    No Email: <span class="fnt-sz-mid fnt-wt-400">I will check the test attempts at hackerrank.com/x/</span>\n                </label>\n            </div>\n            <div class="msT msB">\n                <label>\n                    <input type="radio" name="usr-email-noti" value="2" ', 
current_user.notification && 2 == current_user.notification && (__p += " checked='checked' "), 
__p += ' />\n                    Email: <span class="fnt-sz-mid fnt-wt-400">Send email to me as soon as someone attempts the test.</span>\n                </label>\n            </div>\n            <div class="msT msB">\n                <label><input type="radio" name="usr-email-noti" value="3" ', 
current_user.notification && 3 == current_user.notification && (__p += " checked='checked' "), 
__p += ' />\n                    Email: <span class="fnt-sz-mid fnt-wt-400">Send a mail to me only if a candidate clears the cutoff</span> </label>\n            </div>\n\n            <div class="row no-margin plT">\n                <div class="span-xs-16 span-md-16">\n                    <button type="submit" id="update-basic-info" data-throbber="show" class="btn btn-primary btn-mid">Save</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n';
return __p;
});