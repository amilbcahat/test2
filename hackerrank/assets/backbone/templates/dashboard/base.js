HR.appController.addTemplate("backbone/templates/dashboard/base", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container dashboard">\n	<div class="row">\n	    <div class="span11">\n			<div class="light-wrap dashboard_group dashboard_header">\n				<p class="dashboard_group-title">Your History</p>\n				<div class="dashboard_history"></div>\n			</div>\n\n            <!--<div class="statisticsSmall">\n                ', 
_.each(model.networks, function(network) {
__p += '\n                <p class="stat-line">\n                    ' + (null == (__t = network.name) ? "" :__t) + ' Rank\n                    <span class="pull-right">\n                        #' + (null == (__t = network.rank) ? "" :__t) + " / " + (null == (__t = network.total) ? "" :__t) + "\n                    </span>\n                </p>\n                ";
}), __p += '\n\n                <!-- <a href="" class="btn btn-white pull-right">Edit Statistics</a> -->\n            <!--</div>-->\n            <div class="light-wrap dashboard_group dashboard_progress clearfix">\n                <p class="dashboard_group-title">Your Progress</p>\n                <div class="dashboard_tracks"></div>\n            </div>\n        </div>\n        <div class="span5 dashboard_right">\n        	<div class="dashboard_group light-wrap profile_stats">\n        		<ul class="clearfix unstyled horizontal">\n                    <li class="profile_stats-rank profile_stats-group">Rank<span class="profile_stat-number">' + (null == (__t = model.rank || "N/A") ? "" :__t) + '</span></li>\n                    <li class="profile_stats-score profile_stats-group">Score<span class="profile_stat-number">' + (null == (__t = (model.score || 0).round()) ? "" :__t) + '</span></li>\n                </ul>\n                <p class="profile_stats-helplink"><a href="/scoring">How is this calculated?</a></p>\n			</div>\n			<div class="light-wrap dashboard_group">\n			    <p class="dashboard_group-title">Recent Submissions</p>\n			    <div class="dashboard_submissions"></div>\n			</div>\n			<p class="text-center block-margin"><a href="/settings/profile" class="btn btn-small">Edit your profile & Settings</a></p>\n        </div>\n\n    </div>\n</div>\n';
return __p;
});