HR.appController.addTemplate("backbone/templates/x/teams-remove-user", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal modal-mid fade" id="remove-user-modal">\n    <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\xd7</button>\n        <div class="underline_title">\n            <h3 class="text-center">Remove user from team</h3>\n        </div>\n    </div>\n    <div class="modal-body">\n        <div class="pjL pjR">\n            ', 
__p += users[userLabel].teams.length > 1 ? "\n                Are you sure you want to remove " + (null == (__t = user_data.firstname + " " + user_data.lastname) ? "" :__t) + " (" + (null == (__t = user_data.email) ? "" :__t) + ") from the team " + (null == (__t = user_data.team.name) ? "" :__t) + "\n            " :"\n                Are you sure you want to remove " + (null == (__t = user_data.firstname + " " + user_data.lastname) ? "" :__t) + " (" + (null == (__t = user_data.email) ? "" :__t) + ") from the team " + (null == (__t = user_data.team.name) ? "" :__t) + "? This will also lock their account.\n            ", 
__p += '\n        </div>\n    </div><!-- end .modal-body -->\n    <div class="modal-footer">\n        <div class="text-right mjL">\n            <a href="#" class="btn btn-primary mmR js-remove-user">Remove</a>\n            <a href="" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</a>\n        </div>\n    </div>\n</div>\n';
return __p;
});