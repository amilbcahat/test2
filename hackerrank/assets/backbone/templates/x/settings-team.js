HR.appController.addTemplate("backbone/templates/x/settings-team", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Settings</h3>\n\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Team Management</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    ', 
_.each(collection.models, function(model) {
__p += "\n        ", model = model.toJSON(), __p += '\n        <table width="100%" style="width:94%; margin:30px auto;" class="table table-radius table-out-border fnt-sz-mid">\n            <thead>\n            <tr class="prominent txt-alt-grey">\n                <th colspan="5" style="width:70%;" class="font18 font-w-600 font-clr-black">\n                    <span style="position:relative; top:4px; left:8px;">\n                        ' + (null == (__t = model.name) ? "" :__t) + "&nbsp;", 
model.is_owner_team && (__p += '<span class="label label-primary">Owners Team</span> '), 
__p += "\n                    </span>\n                \n                ", model.edit && (__p += '\n                    <a href="javascript:;" style="position:relative; top:4px; padding-right:8px;"\n                       data-team-id=\'' + (null == (__t = model.id) ? "" :__t) + '\' class="pull-right txt-alt-grey-dark edit-team-link">\n                        <i class="icon-cog txt-alt-grey-dark"></i>\n                    </a>\n                    <a href="javascript:;" class="pull-right btn btn-small add-usr-team mdR" data-team-id="' + (null == (__t = model.id) ? "" :__t) + '">\n                        <i class="icon-plus"></i>&nbsp;Add team member\n                    </a>\n                '), 
__p += "\n                </th>\n            </tr>\n            </thead>\n\n            ", 
_.each(model.users, function(user) {
__p += "\n                ", user = user.toJSON(), __p += '\n                <tr>\n                    <td width="25%" class="txt-green">\n                        <span class="msA display-block">\n                            ' + (null == (__t = _.compact([ user.firstname, user.lastname ]).join(" ")) ? "" :__t) + '\n                        </span>\n                    </td>\n                    <td width="25%">\n                        <span class="msA display-block">\n                            ' + (null == (__t = user.email) ? "" :__t) + '\n                        </span>\n                    </td>\n                    <td width="10%">\n                        <span class="msA display-block">\n                            ' + (null == (__t = user.role) ? "" :__t) + '\n                        </span>\n                    </td>\n                    <td width="20%"></td>\n                    ', 
model.edit && (__p += '\n                        <td width="20%">\n                            <a href="javascript:;"\n                               data-id=\'' + (null == (__t = user.id) ? "" :__t) + "'\n                               data-team-id='" + (null == (__t = model.id) ? "" :__t) + '\'\n                               class="btn pull-right edit-usr-team">Edit User</a>\n                        </td>\n                    '), 
__p += "\n                </tr>\n            ";
}), __p += "\n\n        </table>\n\n    ";
}), __p += "\n    ", "owner" == collection.permission && (__p += '\n    <div class="row no-margin plL">\n        <div class="span-xs-16 span-md-16">\n            <button type="submit" id="add-new-team" class="btn btn-primary btn-mid">Create New Team</button>\n        </div>\n    </div>\n    '), 
__p += '\n    <div class="dialog-wrapper"></div>\n</div>\n';
return __p;
});