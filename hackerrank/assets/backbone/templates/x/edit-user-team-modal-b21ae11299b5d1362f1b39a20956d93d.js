HR.appController.addTemplate("backbone/templates/x/edit-user-team-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="edit-user-modal" class="modal modal-mid">\n    <form class="form-horizontal" name="team-member-form">\n        <div class="modal-header text-center">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n            <h4>Edit Team Member</h4>\n        </div>\n\n        <div class="modal-body">\n            <div class="alert alert-error hidden"></div>\n\n            <input type="hidden" name="edit-user-label" value="" />\n            <input type="hidden" name="edit-user-team-id" value="" />\n            <div class="control-group">\n                <label class="control-label" for="inputName">Name:</label>\n                <div class="controls">\n                    <input class="fw" type="text" id="inputName" name="edit-user-name" autocomplete="off" value="' + (null == (__t = model.firstname) ? "" :__t) + " " + (null == (__t = model.lastname) ? "" :__t) + '" disabled/>\n                </div>\n            </div>\n            <div class="control-group">\n                <label class="control-label" for="inputEmail">Email address:</label>\n                <div class="controls">\n                    <input class="fw" type="text" id="inputEmail" name="edit-user-email" value="' + (null == (__t = model.email) ? "" :__t) + '" disabled />\n                </div>\n            </div>\n            <div class="control-group">\n                <label class="control-label" for="input-roles">Role:</label>\n                <div class="controls">\n                    <select id="input-roles" name="new-user-role">\n                        <option value="recruiter">Recruiter</option>\n                        <option value="developer">Developer</option>\n                        <option value="admin">Admin</option>\n                    </select>\n                </div>\n            </div>\n            <div class="control-group">\n                <div class="controls">\n                    <label class="checkbox">\n                        <input type="checkbox" name="edit-user-tests-permission" ', 
model.tests_permission && model.tests_permission >= 2 && (__p += "checked"), __p += '> Can edit tests\n                    </label>\n                    <label class="checkbox">\n                        <input type="checkbox" name="edit-user-questions-permission" ', 
model.questions_permission && model.questions_permission >= 2 && (__p += "checked"), 
__p += '> Can edit questions\n                    </label>\n                    <label class="checkbox">\n                        <input type="checkbox" name="edit-user-candidates-permission" ', 
model.candidates_permission && model.candidates_permission >= 2 && (__p += "checked"), 
__p += '> Can view all candidates\n                    </label>\n                </div>\n            </div>\n\n        </div><!-- end modal-body -->\n        <div class="modal-footer">\n            <center>\n                <button type="submit" class="btn btn-primary">Save User</button>\n            </center>\n        </div><!-- end modal-footer -->\n    </form>\n</div><!-- end modal -->\n';
return __p;
});