HR.appController.addTemplate("backbone/templates/forum/follow-question", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="pull-right">\n  ', HR.util.isAvailable(challenge.get("slug")) && (__p += '\n  <a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/challenges/" + (null == (__t = challenge.get("slug")) ? "" :__t) + '/forum/questions"\n     class="backbone btn btn-text"><i class="icon-left-open"></i> All Discussions</a>\n  '), 
__p += "\n</p>\n", profile.isLoggedIn() && (__p += '\n<p class="forum-sidebar-button"><a class="btn btn-primary btn-large head-btn pull-right" id="follow-button">' + (null == (__t = model.subscribed ? "Unfollow Question" :"Follow Question") ? "" :__t) + "</a></p>\n"), 
__p += "\n";
return __p;
});