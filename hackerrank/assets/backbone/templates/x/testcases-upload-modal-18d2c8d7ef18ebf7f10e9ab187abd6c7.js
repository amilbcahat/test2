HR.appController.addTemplate("backbone/templates/x/testcases-upload-modal", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal modal-mid" id="upload-testcases-modal">\n    <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <div class="underline_title">UPLOAD TEST CASES</div>\n    </div>\n    <form name="upload-testcases-form">\n        <div class="modal-body pjA">\n            <div class="alert hidden"></div>\n            <div class="row-fluid">\n                <div class="txtbox_holder">\n                    <div class="txtbox_text">Zip archive</div>\n                    <input placeholder="upload testcase zip" type="file" name="testcases-file" class=" txt_box input-large ">\n                </div>\n            </div><!-- end .row-fluid -->\n        </div><!-- end .modal-body -->\n        <div class="modal-footer">\n            <div class="pull-left">\n                <span class="inline-throbber loading" style="top:2px; display:none;">  </span>\n            </div>\n            <div class="pull-right">\n                <a href="javascript:void(0)" class="btn" data-dismiss="modal" aria-hidden="true">Close</a>\n                <button type="submit" class="modal-button btn btn-primary" data-loading-text="Saving...">Upload</a>\n            </div>\n        </div>\n    </form>\n</div>\n';
return __p;
});