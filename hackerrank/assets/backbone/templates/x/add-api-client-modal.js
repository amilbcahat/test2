HR.appController.addTemplate("backbone/templates/x/add-api-client-modal", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="add-client-modal" class="modal modal-mid">\n    <form class="form-horizontal" name="add-client-form">\n        <div class="modal-header text-center">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n            <h4>Add Client</h4>\n        </div>\n\n        <div class="modal-body">\n            <div class="alert alert-error hidden"></div>\n\n            <input type="hidden" name="new-client-id" value="" />\n            \n            <div class="control-group">\n                <label class="control-label" for="inputName">Name:</label>\n                <div class="controls">\n                    <input class="fw" type="text" id="inputName" name="new-client-name" autocomplete="off"/>\n                </div>\n            </div>\n\n                     \n            <div class="control-group">\n                <label class="control-label" for="inputRedirectUri">Redirect URI(s):</label>\n                <div class="controls">\n                    <input class="fw" id="inputRedirectUri" type="text" name="new-client-uri" placeholder="Enter a comma separated list of absolute URIs here."/>\n                </div>\n            </div>\n\n  \n\n        </div><!-- end modal-body -->\n        <div class="modal-footer">\n            <center>\n                <button type="submit" class="btn btn-primary">Add Client</button>\n            </center>\n        </div><!-- end modal-footer -->\n    </form>\n</div><!-- end modal -->\n';
return __p;
});