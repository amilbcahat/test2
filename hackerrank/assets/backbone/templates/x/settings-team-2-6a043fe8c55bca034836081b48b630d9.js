HR.appController.addTemplate("backbone/templates/x/settings-team-2", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar pdR">\n    <div class="clearfix">\n        <div class="pull-left">\n            <h3 class="topbar-h3 mjL">Settings</h3>\n            <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Teams</h3>\n        </div>\n        ', 
"view" != collection.permission && (__p += '\n        <a href="" id="add_user_to_team" class="btn btn-primary pull-right msT msR js-add-user"><i class="icon--single icon-plus"></i> Add user</a>\n        ', 
"owner" == collection.permission && (__p += '\n        <a href="" class="btn btn-default pull-right msT msR js-add-team" id="new-team-modal-hr"> Create new team</a>\n        '), 
__p += "\n        "), __p += '\n        <div class="search-box pull-right msR msT">\n            <form name="teams-user-search-form">\n                <div class="input-btn-group">\n                    <a class="btn js-search-user"><i class="icon--single icon-search"></i></a>\n                    <input type="text" name="search-user" placeholder="John">\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class="sub-top-bar top-fixed-bar-cta hidden js-search-batch-ops-container">\n        <div class="clearfix psT">\n            <div class="plL pull-left msT msR">\n                <i class="icon--single icon-user"></i> <span class="check_count">10</span> out of <span class="check_total_count">30</span> users selected\n            </div>\n            <div class="dropdown-group pull-left">\n                <div class="btn-group">\n                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="float: none">\n                    <span class="btn-drop">Actions</span><i class="icon--single icon-down-open-mini msL"></i>\n                  </button>\n                  <ul class="dropdown-menu" role="menu">\n                    <li><a href="#" class="js-search-users-action" data-action="add-to-team">Add to team</a></li>\n                  </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- start of the teams search results container -->\n<div class="overflow-content teams-o-flow hidden js-search-container">\n</div>\n<!-- End of the teams search results container -->\n\n<!-- Start of the teams main container -->\n<div class="overflow-content js-teams-container">\n    <div class="teams-main-container">\n        ', 
_.each(collection.models, function(model, team_index) {
__p += "\n        ", model = model.toJSON(), __p += "\n        ", "real" == model.type && (__p += '\n        <div class="table-data ', 
team_index > 0 && (__p += "plT"), __p += '">\n            <div class="table-wrap text-center team-open">\n                <header class="row fill-light">\n                    <div class="span-flex-1 text-right fnt-sz-small pdR">\n                        <i class="icon--single icon-up-open"></i>\n                    </div>\n                    <div class="span-flex-4 text-left fnt-sz-small">' + (null == (__t = model.name) ? "" :__t) + "&nbsp;", 
model.is_owner_team && (__p += '<span class="label label-primary msL">Owners Team</span> '), 
__p += '</div>\n                    <div class="span-flex-5 invisible">email address</div>\n                    <div class="span-flex-2 text-left fnt-sz-small lite ">\n                        <i class="icon--single icon-user"></i>\n                        <span class="team-mem-selected hidden">\n                            <span class="check_count">2</span> of ' + (null == (__t = model.users.length) ? "" :__t) + ' members selected\n                        </span>\n                        <span class="team-mem-count bold mmL">' + (null == (__t = model.users.length) ? "" :__t) + ' members</span>\n                    </div>\n                    <div class="span-flex-2 teams_main_cta invisible">\n                        <div class="dropdown-group pull-left">\n                            <div class="btn-group">\n                              <button type="button" class="btn btn-small dropdown-toggle" data-toggle="dropdown">\n                                <span class="btn-drop">Actions</span><i class="icon-single icon-down-open-mini msL"></i>\n                              </button>\n                              <ul class="dropdown-menu" role="menu">\n                                <li><a href="#" class="js-team-users-action" data-action="add-to-team" data-team-id="' + (null == (__t = model.id) ? "" :__t) + '">Add to another team</a></li>\n                                <li><a href="#" class="js-team-users-action" data-action="remove-from-team" data-team-id="' + (null == (__t = model.id) ? "" :__t) + '">Remove from team</a></li>\n                              </ul>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="span-flex-2 text-right custom-settings-btn">\n                        ', 
model.edit && (__p += '\n                        <a href="#" class=" btn-small js-add-team-member txt-alt-grey-dark js-tooltip" title="Add User" data-team-id="' + (null == (__t = model.id) ? "" :__t) + '"><i class="icon--single icon2-invitecandidates"></i></a>\n                        ', 
model.is_owner_team || (__p += '\n                        <a type="button" class="btn-small dropdown-toggle psR txt-alt-grey-dark js-team-settings js-tooltip" title="settings">\n                            <i class="icon--single icon-cog"></i>\n                        </a>\n                        <div class="dropdown-group pull-left">\n                            <div class="btn-group text-center">\n                                <ul class="dropdown-menu" role="menu">\n                                    <li><a href="#" class="js-team-settings-action" data-action="change-name" data-team-id="' + (null == (__t = model.id) ? "" :__t) + '">Change name</a></li>\n                                    <li><a href="#" class="js-team-settings-action" data-action="delete-team" data-team-id="' + (null == (__t = model.id) ? "" :__t) + '">Delete team</a></li>\n                                </ul>\n\n                            </div>\n                        </div>\n                        '), 
__p += "\n                        "), __p += '\n                    </div>\n                </header>\n                <div class="table-body">\n                    ', 
_.each(model.users, function(user, user_index) {
__p += "\n                    ", user = user.toJSON(), __p += '\n                    <div class="row psR ', 
user_index % 2 != 0 && (__p += "row-alt"), __p += '">\n                        <div class="span-flex-1 text-right">\n\n                            <div class="checkbox">\n                                <input type="checkbox" name="team-user" data-team-id="' + (null == (__t = user.team_id) ? "" :__t) + '" data-user-id="' + (null == (__t = user.user_id) ? "" :__t) + '">\n                            </div>\n                        </div>\n                        <div class="span-flex-4 text-left fnt-sz-small txt-green break-para bold">' + (null == (__t = _.compact([ user.firstname, user.lastname ]).join(" ")) ? "" :__t) + '</div>\n                        <div class="span-flex-5 text-left fnt-sz-small break-para">' + (null == (__t = user.email) ? "" :__t) + '</div>\n                        <div class="span-flex-2 text-left fnt-sz-small">\n                            ', 
__p += "admin" == user.role || "recruiter" == user.role ? "\n                                Recruitment\n                            " :"\n                                Development\n                            ", 
__p += '\n                        </div>\n                        <!-- <div class="span-flex-1 text-left fnt-sz-small">&nbsp;2 days ago</div> -->\n                        ', 
model.edit && (__p += "\n                        ", model.is_owner_team && user.company_owner || (__p += '\n                        <div class="span-flex-4 text-right fnt-sz-small">\n                            <a href="#" class=" btn-mini msR txt-alt-grey-dark js-edit-user js-tooltip" title="Edit" data-mapping-id="' + (null == (__t = user.id) ? "" :__t) + '"><i class="icon--single icon2-edit"></i></a>\n                            <a href="#" class=" js-remove-user-from-team js-tooltip" title="Delete" data-mapping-id="' + (null == (__t = user.id) ? "" :__t) + '"><i class="icon--single icon2-delete txt-orange"></i></a>\n                        </div>\n                        '), 
__p += "\n                        "), __p += "\n                    </div>\n                    ";
}), __p += "\n                </div>\n            </div>\n        </div>\n        "), 
__p += "\n        ";
}), __p += '\n    </div>\n</div>\n\n<div class="dialog-wrapper"></div>\n';
return __p;
});