HR.appController.addTemplate("backbone/templates/x-admin/test-invite-candidates", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Bulk Invite Candidates</h3>\n</div>\n\n<div class="overflow-content" id="control-overflow">\n    <form name="invite-candidates-form" class="mjA">\n        <div class="msT msB">\n            <label>Upload the CSV</label>\n            <input type="file" name="invites_csv" />\n        </div>\n        <div class="msT msB">\n            <label>\n                <input type="checkbox" name="force-invite"/>\n                Process valid rows ignoring any errors in other parts of the CSV \n            </label>\n            <button type="submit" class="btn btn-green">Invite</button>\n        </div>\n    </form>\n\n    <div class="message-box success mjA"></div>\n    <div class="message-box error mjA"></div>\n</div>\n';
return __p;
});