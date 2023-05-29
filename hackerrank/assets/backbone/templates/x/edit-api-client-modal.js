HR.appController.addTemplate("backbone/templates/x/edit-api-client-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="edit-client-modal" class="modal modal-mid">\n    <form class="form-horizontal" name="edit-client-form">\n        <div class="modal-header text-center">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n            <h4>Edit Client</h4>\n        </div>\n\n        <div class="modal-body">\n            <div class="alert alert-error hidden"></div>\n\n            <input type="hidden" name="edit-client-id" value="' + (null == (__t = model.id) ? "" :_.escape(__t)) + '" />\n            \n            <div class="control-group">\n                <label class="control-label" for="inputName">Name:</label>\n                <div class="controls">\n                    <input class="fw" type="text" id="inputName" name="edit-client-name" value="' + (null == (__t = model.name) ? "" :_.escape(__t)) + '" autocomplete="off"/>\n                </div>\n            </div>\n\n            <div class="control-group">\n                <label class="control-label" for="inputRedirectUri">Redirect URI(s):</label>\n                <div class="controls">\n                    <input class="fw" id="inputRedirectUri" type="text" name="edit-client-uri" placeholder="Enter a comma separated list of absolute URIs here." value="' + (null == (__t = model.redirect_uri) ? "" :_.escape(__t)) + '"/>\n                </div>\n            </div>\n\n        </div><!-- end modal-body -->\n        <div class="modal-footer">\n            <center>\n                <button type="submit" class="btn btn-primary">Save</button>\n                <!-- <button id="btn-auth" class="btn btn-mid">Authorize</button>\n                <button id="btn-revoke" class="btn btn-alert">Revoke</button> -->\n            </center>\n        </div><!-- end modal-footer -->\n    </form>\n\n</div><!-- end modal -->\n';
return __p;
});