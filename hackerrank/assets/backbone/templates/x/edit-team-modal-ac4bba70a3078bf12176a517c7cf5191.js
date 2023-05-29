HR.appController.addTemplate("backbone/templates/x/edit-team-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="new-team-modal" class="modal">\n    ', model = model.toJSON(), 
__p += '\n    <form class="form-horizontal" name="team-form">\n        <div class="modal-header text-center">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n            <h4>Edit Team</h4>\n        </div>\n\n        <div class="modal-body">\n            <div class="alert alert-error hidden"></div>\n            <div class="control-group">\n                <label class="control-label">Name:</label>\n                <div class="controls">\n                    <input type="text" name="new-team-name" value="' + (null == (__t = model.name) ? "" :__t) + '"/>\n                </div>\n            </div>\n        </div><!-- end modal-body -->\n\n        <div class="modal-footer">\n            <center>\n                <button type="submit" class="inline_block button-green big_button_padding rcorners_mid" href="#">', 
__p += model.name ? "Save" :"Create", __p += " team</button>\n            </center>\n        </div><!-- end modal-footer -->\n    </form>\n</div><!-- end modal -->\n";
return __p;
});