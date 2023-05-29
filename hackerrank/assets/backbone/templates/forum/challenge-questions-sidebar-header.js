HR.appController.addTemplate("backbone/templates/forum/challenge-questions-sidebar-header", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="padding-large m clearfix">\n    <a class="btn btn-primary backbone head-btn btn-large" data-analytics="Ask Question"\n       ', 
__p += profile.isLoggedIn() ? '\n       href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/challenges/" + (null == (__t = challenge.get("slug")) ? "" :__t) + '/forum/questions/ask"\n       ' :'\n       disabled="disabled" class="cursor" href=""\n       ', 
__p += " >Ask a New Question</a>\n</p>\n", profile.isLoggedIn() || (__p += '\n<br>\n<p class="gray-text">You have to be logged in in order to ask a question</p>\n'), 
__p += "\n";
return __p;
});