HR.appController.addTemplate("backbone/templates/x/test-admin", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        SET TEST ADMIN\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">When a candidate completes a test, the Recruiter who invited that candidate gets a report via email (If test was taken through a public link, the owner of the test is assumed to be the inviting Recruiter). If you would like anyone <strong>in addition</strong> to the inviting Recruiter to receive reports for this test, you can specify a list of comma separated email addresses below.</p>\n    <br/>\n    <p class="txt-alt-grey span10 no-padding mdT"><strong>Note:</strong> Test Admins will receive reports for all candidate attempts, irregardless of who invited them.</p>\n    <div class="clear"></div>\n    <form name="test-admin-form">\n        <div class="inline-block mdT">\n            <input type="text" class="no-margin wide" placeholder="Enter Email Address" name="test-admins">\n            <button type="submit" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-primary margin-large right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right mdL"', 
__p += '>Set Admin</button>\n        </div>\n    </form>\n\n    <div class="validation-error hidden">\n        <div class="clear"></div>\n        <div class="error"></div>\n    </div>\n\n    ', 
model.test_admins && (__p += '\n    <div class="clear"></div>\n    <div class="mdT test-custom-link-wrap">\n        <div class="cust_link_bg">\n            Current Test Admins: &nbsp;&nbsp; <span>' + (null == (__t = model.test_admins) ? "" :_.escape(__t)) + "</span>\n        </div>\n    </div>\n    "), 
__p += "\n\n</div>\n";
return __p;
});