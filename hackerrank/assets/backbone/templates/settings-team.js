HR.appController.addTemplate("backbone/templates/settings-team", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="padded settings_content-pane">\n    <div class="settings_content-group">\n        <div class="row">\n            <div class="span3">\n                <h3>Teams</h3>\n            </div>\n            <div class="pull-right">\n                ', 
0 == _.size(teams.models) && !teams.sync_status || 0 == teams.models.length || (__p += '\n                <a href="/teams/create" class="btn btn-green inverse backbone">create team</a>\n                '), 
__p += '\n            </div>\n        </div>\n        <br>\n        <p class="aside msT mlB">In order to participate in a contest which only allows teams to participate, please create your team here. You can\'t create team for a non-team contest.</p>\n    ', 
0 != _.size(teams.models) || teams.sync_status ? (__p += "\n      ", 0 == teams.models.length ? (__p += '\n      <p class="block-margin text-center">You are not part of any teams on HackerRank.</p>\n      <p class="text-center block-margin"><a class="backbone btn btn-green" href="', 
HR.CONTEST_NAMESPACE && (__p += "/contests/" + (null == (__t = HR.CONTEST_NAMESPACE) ? "" :__t)), 
__p += '/teams/create" >Create a new team</a></p>\n      ') :__p += '\n      <div class="row">\n        <div class="span2"><b>Team Name</b></div>\n        <div class="span4"><b>Contest Name</b></div>\n        <div class="span2 m"><b>Status</b></div>\n      </div>\n      ', 
__p += "\n    ", _.each(teams.models, function(team) {
__p += '\n      <div class="row team-row">\n        <div class="span2">\n          <p class="col">' + (null == (__t = team.get("name")) ? "" :__t) + '</p>\n        </div>\n        <div class="span4">\n          <p class="col">' + (null == (__t = team.get("contest_name")) ? "" :__t) + '</p>\n        </div>\n        <div class="span2 m">\n            <p class="col">\n                ', 
__p += team.get("manager_id") == hacker.get("id") ? '\n                <span class="badge info">manager</span>\n                ' :team.get("verified") ? '\n                <span class="badge success">verified</span>\n                ' :'\n                <span class="badge alert">not verified</span>\n                ', 
__p += '\n            </p>\n        </div>\n        <div class="span2 m">\n          <p><a href=\'', 
HR.CONTEST_NAMESPACE && (__p += "/contests/" + (null == (__t = HR.CONTEST_NAMESPACE) ? "" :__t)), 
__p += "/teams/" + (null == (__t = team.get("id")) ? "" :__t) + "/", __p += team.get("manager_id") == hacker.get("id") ? "details" :"view", 
__p += '\' class="btn backbone">', __p += team.get("manager_id") == hacker.get("id") ? "Modify" :"View", 
__p += '</a></p>\n        </div>\n        <div class="span2 m">\n          <p><button data-id="' + (null == (__t = team.get("id")) ? "" :__t) + '" class="btn btn-alert remove">', 
__p += team.get("manager_id") == hacker.get("id") ? "Delete" :"Remove", __p += "</button></p>\n        </div>\n      </div>\n    ";
}), __p += "\n    ") :__p += "\n      " + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n    ", 
__p += "\n  </div>\n</div>\n";
return __p;
});