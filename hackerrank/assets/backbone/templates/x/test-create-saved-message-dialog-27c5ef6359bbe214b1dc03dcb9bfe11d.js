HR.appController.addTemplate("backbone/templates/x/test-create-saved-message-dialog", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="test-create-saved-message-modal" class="modal modal-mid">\n    <div class="modal-header text-center">\n        <button type="button" class="close hidden" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4>Create New Message</h4>\n    </div>\n\n    <div class="modal-body">\n        <div class="psA alert hidden"></div>\n        <div class="psA">\n            <div class="span4 psT psB">Enter New Message Title</div>\n            <input id="create-saved-msg-name" type="text" name="saved-message-name"/>\n        </div>\n    </div>\n\n    <div class="modal-footer">\n        <a href="#" class="btn cancel-dialog">Cancel</a>\n        <a href="#" data-throbber="show" class="btn btn-primary create-saved-message">Yes</a>\n    </div>\n</div>\n';
return __p;
});