HR.appController.addTemplate("backbone/templates/x/test-master-password", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        SET MASTER PASSWORD\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">If someone has not received the login credentials for the test, you can use this password to log the candidates into the test.</p>\n    <div class="clear"></div>\n    <form name="test-master-password-form">\n        <div class="inline-block mdT">\n            <input type="text" class="no-margin wide" placeholder="Set New Password" name="master-password">\n            <button type="submit" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-primary margin-large right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right mdL"', 
__p += ">Set Password</button>\n        </div>\n    </form>\n\n    ", model.defPassword && (__p += '\n    <div class="clear"></div>\n    <div class="mdT test-custom-link-wrap">\n        <div class="cust_link_bg">\n            Current Master Password: &nbsp;&nbsp; <span>' + (null == (__t = model.defPassword) ? "" :_.escape(__t)) + '</span>\n            <button id="deletePassword" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-alert margin-mid right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-alert margin-mid right mdL"', 
__p += ">Delete Password</button>\n        </div>\n    </div>\n    "), __p += "\n\n</div>\n";
return __p;
});