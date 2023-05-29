HR.appController.addTemplate("backbone/templates/x/logo-upload", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal" id="upload-logo-modal">\n    <div class="modal-header">\n        <a class="close" data-dismiss="modal">\xd7</a>\n        <h3>Upload Logo</h3>\n    </div>\n    <div class="modal-body">\n        <div class="error" style="text-align: center; font-weight: bold"></div>\n        <form enctype="multipart/form-data" class="form form-horizontal" id="logo-upload-form">\n            <div class="row-fluid">\n                <div class="control-group">\n                    <label for="name" class="pull-left span3">Logo File: </label>\n                    <input class="span5" name="logo_file" type="file">\n                </div>\n            </div>\n        </form>\n    </div>\n    <div class="modal-footer">\n        <a class="btn btn-primary upload-logo disabled" disabled="true">Upload</a>\n    </div>\n    <div class="clear"></div>\n    <div class="error-msg hidden error"></div>\n</div>\n';
return __p;
});