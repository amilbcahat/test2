HR.appController.addTemplate("backbone/templates/playoff-header", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "<h1>" + (null == (__t = contest.name) ? "" :__t) + "</h1>\n<h3>Round " + (null == (__t = round_data.current_round) ? "" :__t) + '</h3>\n<div class="round-wrap">\n    <h4>' + (null == (__t = round_data.total_players) ? "" :__t) + ' players</h4>\n    <div class="nav-arrows clearfix block-center">\n        <a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/playoffs/" + (null == (__t = challenge.slug) ? "" :__t) + "/round/" + (null == (__t = round_data.current_round - 1) ? "" :__t) + '" class="view-last backbone" ', 
1 == round_data.current_round && (__p += ' style="display:none" '), __p += ' ></a>\n        <a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/playoffs/" + (null == (__t = challenge.slug) ? "" :__t) + "/round/" + (null == (__t = round_data.current_round + 1) ? "" :__t) + '" class="view-next backbone" ', 
round_data.current_round == round_data.total_rounds && (__p += ' style="display:none" '), 
__p += "></a>\n    </div>\n</div>\n";
return __p;
});