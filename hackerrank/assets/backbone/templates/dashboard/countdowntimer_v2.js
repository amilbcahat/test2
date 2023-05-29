HR.appController.addTemplate("backbone/templates/dashboard/countdowntimer_v2", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<span class="contest-status">\n    <small>\n        ', 
model.ended() ? __p += "\n            " + (null == (__t = model.custom_messages.ended || "The contest has ended. Further submissions will not affect the leaderboard.") ? "" :__t) + "\n        " :model.started() ? (__p += "\n            " + (null == (__t = model.custom_messages.active || "In progress.") ? "" :__t) + "\n            ", 
null !== model.get("epoch_endtime") && model.nextMilestone() && (__p += '\n                It ends\n                <abbr class="countdown timeago endtime cursor contest-countdown">\n                </abbr>.\n            '), 
__p += "\n        ") :__p += "\n            " + (null == (__t = model.custom_messages.not_started || "The contest has not yet started. It begins") ? "" :__t) + '\n            <abbr class="countdown timeago starttime cursor">\n            </abbr>.\n        ', 
__p += "\n    </small>\n</span>\n";
return __p;
});