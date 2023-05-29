HR.appController.addTemplate("backbone/templates/x/teams-user-search-view", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="table-data">\n    <div class="table-wrap text-center">\n        <header class="row">\n            <div class="span-flex-1 invisible">checkbox</div>\n            <div class="span-flex-3 text-left fnt-sz-small txt-alt-grey">FULL NAME</div>\n            <div class="span-flex-4 text-left fnt-sz-small txt-alt-grey">EMAIL ADDRESS</div>\n            <div class="span-flex-2 text-left fnt-sz-small txt-alt-grey">PROFILE</div>\n            <div class="span-flex-6 text-left fnt-sz-small txt-alt-grey">TEAMS</div>\n        </header>\n        <div class="table-body">\n            ', 
_.each(data.searched_users, function(searched_user) {
__p += "\n            ", user = data.users[searched_user.id], __p += '\n            <div class="row">\n                <div class="span-flex-1 text-right">\n                    <div class="checkbox">\n                        <input type="checkbox">\n                    </div>\n                </div>\n                <div class="span-flex-3 text-left txt-green bold">' + (null == (__t = _.compact([ user.firstname, user.lastname ]).join(" ")) ? "" :__t) + '</div>\n                <div class="span-flex-4 text-left fnt-sz-small">' + (null == (__t = user.email) ? "" :__t) + '</div>\n                <div class="span-flex-2 text-left fnt-sz-small">\n                    ', 
__p += "admin" == user.role || "recruiter" == user.role ? "\n                        Recruitment\n                    " :"\n                        Development\n                    ", 
__p += '\n                </div>\n                <div class="span-flex-6 text-left fnt-sz-small">' + (null == (__t = user.teams.join(", ")) ? "" :__t) + "</div>\n            </div>\n            ";
}), __p += "\n        </div>\n    </div>\n</div>\n";
return __p;
});