HR.appController.addTemplate("backbone/templates/x/test-admin", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        SET TEST ADMIN\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">By default test reports are sent to the owner of the test. If you would like to send them to a different address, you can set it here. You can enter more than one email address separated by commas.</p>\n    <br/>\n    <p class="txt-alt-grey span10 no-padding mdT"><strong>Note:</strong> In addition to the test admin, test reports are also sent to the recruiter who invited that candidate. The address(es) here will be copied on all reports for this test.</p>\n    <div class="clear"></div>\n    <form name="test-admin-form">\n        <div class="inline-block mdT">\n            <input type="text" class="no-margin wide" placeholder="Enter Email Address" name="test-admins">\n            <button type="submit" data-throbber="show" class="btn btn-primary margin-large right mdL">Set Admin</button>\n        </div>\n    </form>\n\n    <div class="validation-error hidden">\n        <div class="clear"></div>\n        <div class="error"></div>\n    </div>\n\n    ', 
model.test_admins && (__p += '\n    <div class="clear"></div>\n    <div class="mdT test-custom-link-wrap">\n        <div class="cust_link_bg">\n            Current Test Admins: &nbsp;&nbsp; <span>' + (null == (__t = model.test_admins) ? "" :_.escape(__t)) + "</span>\n        </div>\n    </div>\n    "), 
__p += "\n\n</div>\n";
return __p;
});