HR.appController.addTemplate("backbone/templates/x/testcase-delete-modal", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal modal-mid" id="delete-testcase-modal">\n    <div class="modal-header" style="height: 13px;">\n        <div class="underline_title set_title pull-left">Delete Testcase</div>\n        <button type="button" class="close js-sharelinkclose pull-right" data-dismiss="modal" aria-hidden="true"><span style="font-size: 70%; position: relative; top: -2px;">Close</span> &times;</button>\n    </div>\n    <div class="modal-body dialog-body">\n      <h5 align="center">Are you sure you want to delete this testcase?</h5>\n    </div>\n    <div class="modal-footer">\n        <a class="btn btn-danger js-delete-testcase" data-loading-text="Cancelling...">Yes</a>\n        <a class="btn close-button" data-dismiss=\'modal\'>No</a>\n    </div>\n</div>\n';
return __p;
});