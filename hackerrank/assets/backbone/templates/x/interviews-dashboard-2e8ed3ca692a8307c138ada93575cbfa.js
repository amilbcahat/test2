HR.appController.addTemplate("backbone/templates/x/interviews-dashboard", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Dashboard</h3>\n</div>\n<div class="account-locked hidden">\n    <div class="account-locked-wrapper" style="text-align: center">\n        <h4>Your account is currently locked.</h4>\n        <p class="font16 text_center">Please subscribe to any of our plans to continue.</p>\n        <center>\n            <a href="payments/plans" style="position:relative; top:20px;" class="btn btn-primary js-backbone">CHOOSE PLAN</a>\n        </center>\n    </div>\n</div>\n<div class="overflow-content" id="control-overflow">\n    ', 
0 == len && HR.currentUser && HR.currentUser.canCreateInterviews() && (__p += '\n 	<div class="no-interview-tooltip"></div>\n    '), 
__p += '\n    <div id=\'cnt-upcoming\'></div>\n    <div class="clear_float"></div>\n    <div class="fixed-height-adjust"></div>\n    <div id=\'cnt-done\'></div>\n</div>\n\n<div class="modal-container"></div>\n';
return __p;
});