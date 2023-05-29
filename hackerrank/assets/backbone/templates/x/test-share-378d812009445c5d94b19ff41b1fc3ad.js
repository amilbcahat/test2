HR.appController.addTemplate("backbone/templates/x/test-share", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">' + (null == (__t = testmodel.name) ? "" :_.escape(__t)) + '</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Share with team</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    ', 
show_teams && (__p += '\n    <div class="mjA">\n        <div class="btn-group">\n            <a href="#" class="btn js-change-view ', 
"share-teams" == active_tab && (__p += "active btn-primary"), __p += '" data-view="share-teams">Share with teams</a>\n            <a href="#" class="btn js-change-view ', 
"share-users" == active_tab && (__p += "active btn-primary"), __p += '" data-view="share-users">Share with users</a>\n        </div>\n    </div>\n\n    <div class="mjA js-share-views ', 
__p += "share-teams" !== active_tab ? "hidden" :"active", __p += '" id="share-teams">\n        ', 
model.unshared_teams.length > 0 ? (__p += '\n        <p class="pdB">\n            You can share this test with your teams.\n        </p>\n        <div class="row no-margin plB">\n            <form name="share-with-team-form">\n                <div class="span-xs-16 span-md-16 no-padding">\n                    <label>SELECT TEAMS</label>\n                    <select id="share-team" name="team" class="span-xs-6 span-md-4 no-margin">\n                        ', 
_.each(model.unshared_teams, function(team) {
__p += '\n                        <option value="' + (null == (__t = team.team_id) ? "" :_.escape(__t)) + '">' + (null == (__t = team.name) ? "" :_.escape(__t)) + "</option>\n                        ";
}), __p += '\n                    </select>\n                    <button type="submit" ', 
__p += testmodel.permission < 2 ? 'class="btn btn-primary margin-large right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right mdL"', 
__p += ">Share</button>\n                </div>\n            </form>\n        </div>\n        ") :__p += '\n        <p class="pdB">\n            You have already shared the test with all your teams. You can create more teams from the <a href="settings/team">teams page</a>\n        </p>\n        ', 
__p += "\n    </div><!-- end .mjA -->\n    "), __p += '\n\n    <div class="mjA js-share-views ', 
__p += "share-users" !== active_tab ? "hidden" :"active", __p += '" id="share-users">\n        <p class="pdB">\n            You can share this test with individuals.\n        </p>\n        <form name="share-with-user-form">\n            <div class="formgroup radio">\n                <legend>Access Control</legend>\n                <label><input type="radio" name="share-permissions" value="ALLOW_ALL" checked> Allow full access</label>\n                <label><input type="radio" name="share-permissions" value="ALLOW_INVITE_CANDIDATES"> Can send invites only</label>\n                <label><input type="radio" name="share-permissions" value="ALLOW_ADD_QUESTIONS"> Can edit tests only</label>\n            </div>\n            <div class="span-xs-16 span-md-12 no-padding formgroup">\n                <input name="user-email" class="wide" type="text" />\n                <button type="submit" ', 
__p += testmodel.permission < 2 ? 'class="btn btn-primary margin-large right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right mdL"', 
__p += '>Share</button>\n                <div class="sub-help js-share-error error hidden"></div>\n            </div>\n        </form>\n    </div><!-- end .mjA -->\n\n    <div class="soft-divider"></div>\n\n    <div class="mjA">\n        ', 
HR.currentUser && HR.currentUser.get("company") && "user" == HR.currentUser.get("company").pricing_model && (__p += '\n        <div class="row no-margin plT">\n            <label>SHARED TEAMS</label>\n            <table class="simple-table small-padded" width="100%" cell-spacing="0" cell-padding="0">\n                <thead>\n                    <tr class="no-border">\n                        <th>Test Shared with</th>\n                        <th>Actions</th>\n                    </tr>\n                    ', 
_.each(model.shared_teams, function(team, index) {
__p += "\n                    <tr>\n                        <td>\n                            <!-- if name for owners team has changed - show a label to distinguish it -->\n                            ", 
__p += 0 == index && "Owners" != team.name ? "\n                            " + (null == (__t = team.name) ? "" :_.escape(__t)) + '&nbsp;<span class="badge primary">Owners Team</span>\n                            ' :"\n                            " + (null == (__t = team.name) ? "" :_.escape(__t)) + "\n                            ", 
__p += "\n                        </td>\n                        <td>\n                            <!-- First team is always owners team -->\n                            ", 
0 != index && (__p += '\n                            <a href="#" class="btn btn-small js-remove-team" data-id="' + (null == (__t = team.team_id) ? "" :_.escape(__t)) + '"><i class="icon2-close"></i>Remove</a>\n                            '), 
__p += "\n                        </td>\n                    </tr>\n                    ";
}), __p += "\n                </thead>\n            </table>\n        </div>\n        "), 
__p += '\n\n        <div class="row no-margin plT">\n            <label>SHARED USERS</label>\n            <table class="simple-table small-padded" width="100%" cell-spacing="0" cell-padding="0">\n                <thead>\n                    <tr class="no-border">\n                        <th>Test Shared with</th>\n                        <th>Access Control</th>\n                        <th>Actions</th>\n                    </tr>\n                    ', 
_.each(model.shared_users, function(user) {
__p += "\n                    <tr>\n                        <td>" + (null == (__t = user.email) ? "" :_.escape(__t)) + "</td>\n                        <td>" + (null == (__t = permissionMappings[user.permissions]) ? "" :_.escape(__t)) + "</td>\n                        <td>\n                            ", 
"owner" !== user.permissions && (__p += '\n                            <a href="#" class="btn btn-small js-remove-user" data-id="' + (null == (__t = user.uid) ? "" :_.escape(__t)) + '"><i class="icon2-close"></i>Remove</a>\n                            '), 
__p += "\n                        </td>\n                    </tr>\n                    ";
}), __p += '\n                </thead>\n            </table>\n        </div>\n\n    </div><!-- end .mjA -->\n\n    <!--IMPORTANT: USE ONLY BUTTONS IN THIS DIV. This div should stay at the bottom of the contents in this .overflow-content div, no matter what -->\n    <!--\n    <div id="responsive-bottom-holder" class="responsive-bottom-holder text-center">\n        <a href="#" class="btn btn-primary btn-mid">Add from library</a>\n        <span class="alt-grey mlA">or</span>\n        <a href="#" class="btn btn-mid">Create new question</a>\n    </div>\n    -->\n</div>\n\n<!-- <div id="responsive-bottom-placeholder" class="responsive-bottom-holder text-center"></div> -->\n';
return __p;
});