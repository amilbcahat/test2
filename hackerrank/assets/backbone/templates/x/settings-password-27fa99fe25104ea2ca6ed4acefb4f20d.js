HR.appController.addTemplate("backbone/templates/x/settings-password", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Settings</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Change Password</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    <div class="mjA">\n        <form name="change-password-form">\n            <div class="msT msB">\n                <label>Old password</label>\n                <input type="password" class="wide" id="usr-old-pwd" />\n            </div>\n\n            <div class="msT msB">\n                <label>New password</label>\n                <input type="password" class="wide" id="usr-new-pwd" />\n            </div>\n\n            <div class="msT msB">\n                <label>Confirm password</label>\n                <input type="password" class="wide" id="usr-cnfm-pwd" />\n                <p class="error hidden"></p>\n            </div>\n\n            <div class="row no-margin plT">\n                <div class="span-xs-16 span-md-16">\n                    <button type="submit" id="update-basic-info" class="btn btn-primary btn-mid">Save</button>\n                </div>\n            </div>\n            <div class="response error hidden mlT"></div>\n        </form>\n    </div>\n\n</div>\n';
return __p;
});