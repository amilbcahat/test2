HR.appController.addTemplate("backbone/templates/dashboard/eLogin", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div style="width: 600px; margin: auto; margin-top: 10%; border: #5E781B solid 2px; padding: 0px;">\n  <p style="background-color: #5E781B; color: #f0f0f0; margin: 0px; padding: 5px 10px; font-weight: bold;"><img style="float:left" src="/assets/alert.png">&nbsp; The page you\'re seeking requires an authenticated hacker.</p>\n  <div style="padding: 5px 10px; background-color: #fbfbfb;">\n    <p style="padding: 0px; margin: 0px;"> You have landed on a page which is accessible only by authorised user. Please Login to view this page.</p>\n    <ul>\n      <li style="color: #5E781B; list-style-type: square;"><a class="loginBtn" href="/auth/login">Login to HackerRank</a></li>\n      ', 
__p += HR.appController.is_using_contest_namespace() ? '\n      <li style="color: #5E781B; list-style-type: square;"><a href="' + (null == (__t = HR.appController.get_current_contest_home_url()) ? "" :__t) + '">Return Home</a></li>\n      ' :'\n      <li style="color: #5E781B; list-style-type: square;"><a href="/">Return Home</a></li>\n      ', 
__p += '\n      <li style="color: #5E781B; list-style-type: square;"><a style="cursor: pointer;" onclick="javascript: (function() { history.back(); return false;})();">Go back to the previous page</a></li>\n    </ul>\n  </div>\n</div>\n';
return __p;
});