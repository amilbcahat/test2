HR.appController.addTemplate("backbone/templates/dashboard/track", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", model.completed > 0 ? (__p += '\n    <div class="text-center dashboard_tracks-progress">\n        <span id="dashboard_trackSelect" class="dropdown dashboard_tracks-select">\n            <a class="alpha btn dropdown-toggle dashboard_tracks-toggle" data-toggle="dropdown">' + (null == (__t = currentName) ? "" :__t) + ": " + (null == (__t = stats.completion) ? "" :__t) + '% Complete<i class="icon-down-dir"></i></a>\n            <ul class="unstyled dropdown-menu dashboard_tracks-menu">\n                <li><a class="track-select cursor">All Tracks</a></li>\n                ', 
_.each(model.tracks, function(track) {
__p += '\n                <li>\n                    <a class="track-select cursor" data-track-id="' + (null == (__t = track.id) ? "" :__t) + '">\n                        ' + (null == (__t = track.name) ? "" :__t) + "\n                    </a>\n                </li>\n                ";
}), __p += "\n            </ul>\n        </span>\n        <p>" + (null == (__t = stats.completed) ? "" :__t) + " Challenge" + (null == (__t = 1 == stats.completed ? "" :"s") ? "" :__t) + " of " + (null == (__t = stats.total) ? "" :__t) + " completed</p>\n        <p>Languages used: " + (null == (__t = stats.languages.join(", ")) ? "" :__t) + "</p>\n        ", 
stats.category && (__p += "\n        <p>Category: " + (null == (__t = stats.category) ? "" :__t) + "</p>\n        "), 
__p += '\n    </div>\n    <div class="dashboard_tracks-chart track-chart">\n    </div>\n') :__p += '\n    <p class="block-margin text-center">Solve your first challenge to see your progress graph.</p>\n    <p class="text-center"><a href="/categories" class="btn btn-primary backbone">View Challenges</a></p>\n', 
__p += "\n";
return __p;
});