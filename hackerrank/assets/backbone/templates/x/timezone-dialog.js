HR.appController.addTemplate("backbone/templates/x/timezone-dialog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal modal-mid" id="timezone-modal" style="display: none;">\n    <div class="modal-header">\n        <a class="close" data-dismiss="modal">\xd7</a>\n\n        <h3 class="dialog-title\\">Timezone mismatch</h3>\n    </div>\n    <div class="modal-body dialog-body">\n        The timezone in your settings is <strong>' + (null == (__t = "" == userTimeZone ? "not set" :userTimeZone) ? "" :__t) + "</strong> where as your current timezone according\n        to your browser is <strong>" + (null == (__t = currentTimeZone) ? "" :__t) + '</strong>. Would you like to change it?\n    </div>\n    <div class="modal-footer">\n        <a class="btn save-button" data-loading-text=\\"Saving...\\">Update timezone</a>\n        <a class="btn cancel-button" data-loading-text=\\"Saving...\\">No, I\'m good</a>\n    </div>\n</div>\n';
return __p;
});