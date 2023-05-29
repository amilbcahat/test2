HR.appController.addTemplate("backbone/templates/hacker-event", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", 0 == model.length && (__p += "\n\n  ", __p += hacker === HR.profile().get("username") ? '\n    <p class="mlB aside text-center">You have not participated in any events yet.</p>\n    <p class=" text-center"><a href="/" class="btn span3 block-center">View Contests</a></p>\n  ' :'\n    <p class="mlB aside text-center">' + (null == (__t = hacker) ? "" :__t) + " has not participated in any events yet.</p>\n  ", 
__p += "\n"), __p += "\n", _.each(model, function(event) {
__p += '\n    <div class="profile-events-item">\n        <p><strong>' + (null == (__t = event.name) ? "" :__t) + "</strong>\n            ", 
event.ended && "" != event.rank ? __p += '\n                &bull; <span class="aside">placed ' + (null == (__t = event.rank) ? "" :__t) + "</span>\n            " :event.started && "" != event.rank && (__p += '\n                &bull; <span class="aside">currently ' + (null == (__t = event.rank) ? "" :__t) + "</span>\n            "), 
__p += "\n\n         ", __p += event.ended ? '\n            <a href="/contests/' + (null == (__t = event.slug) ? "" :__t) + '/leaderboard" class="btn btn-text btn-small pull-right backbone psT"><i class="icon-trophy icon--single"></i></a>\n         ' :'\n            <a href="/contests/' + (null == (__t = event.slug) ? "" :__t) + '/" class="btn btn-text pull-right backbone">Join</a>\n         ', 
__p += "\n         </p>\n    </div>\n";
}), __p += "\n";
return __p;
});