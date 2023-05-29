HR.appController.addTemplate("backbone/templates/x/test-delete", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        DELETE TEST\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span6 no-padding">This will delete the entire test. However your questions will remain in the library.</p>\n    <a ', 
__p += model.permission < 3 ? 'class="btn btn-alert margin-large right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-alert margin-large right mdL"', 
__p += ' id="delete_test_confirmation">Delete Test</a>\n    <div class="clear"></div>\n</div>\n\n<div id="test-delete-confirm-dialog" class="modal modal-mid">\n    <div class="modal-header text-center">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4>Confirmation</h4>\n    </div>\n\n    <div class="modal-body">\n        <div class="plA">Are you sure you want to delete this test?</div>\n    </div>\n\n    <div class="modal-footer">\n        <a href="#" class="btn cancel-test-delete">Cancel</a>\n        <a href="#" class="btn btn-primary delete-test">Yes</a>\n    </div>\n</div>\n';
return __p;
});