HR.appController.addTemplate("backbone/templates/x/new-team-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal modal-500 fade" id="new-team-modal">\n    <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\xd7</button>\n        <div class="underline_title">\n            <h3 class="text-center">Create new Team</h3>\n        </div>\n    </div>\n    <form name="new-team-form">\n        <div class="alert alert-error hidden"></div>\n        <div class="modal-body">\n            <div class="pjL pjR">\n                <div class="formgroup">\n                    <label class="text-left">TEAM NAME</label>\n                    <input type="text" name="team-name" class="with-help wide-100" placeholder="Enter team name" ', 
team && (__p += 'value="' + (null == (__t = team.get("name")) ? "" :_.escape(__t)) + '"'), 
__p += ">\n                </div>\n            </div>\n            ", team || (__p += '\n            <div class="pjL pjR">\n                <div class="formgroup">\n                    <label class=" text-left">ADD TEAM MEMBERS</label>\n                    <div class="mem_list text-left">\n                        <ul id="team_members_list">\n                        </ul>\n                        <div class="new_user_team clearfix">\n                            <input name="new-team-member" class="with-help default pull-left" placeholder="Enter name or email address">\n                            <a href="#" class="btn btn-default pull-left js-add-existing-team-member mxT msL" id="add_member_to_team"><i class="icon--single icon-plus"></i> Add</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            '), 
__p += '\n        </div><!-- end .modal-body -->\n        <div class="modal-footer">\n            <div class="text-right mjL">\n                ', 
__p += team ? '\n                <button type="submit" class="btn btn-primary mmR">Save team</button>\n                ' :'\n                <button type="submit" class="btn btn-primary mmR">Create team</button>\n                ', 
__p += '\n                <a href="#" class="btn btn-default msR" data-dismiss="modal" aria-hidden="true">Cancel</a>\n            </div>\n        </div>\n    </form>\n</div>\n';
return __p;
});