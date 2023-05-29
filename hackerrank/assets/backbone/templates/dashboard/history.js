HR.appController.addTemplate("backbone/templates/dashboard/history", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="history-chart">\n  <!-- Chart will be filled in overtop of this message. -->\n  ', 
__p += model.id === HR.profile().get("id") ? '\n      <p class="block-margin text-center">Solve your first challenge to see your progress graph.</p>\n      <p class="text-center"><a href="/categories" class="btn btn-primary profile_blankstate-btn backbone">View Challenges</a></p>\n  ' :'\n      <p class="block-margin text-center">' + (null == (__t = model.username) ? "" :__t) + " has not solved any challenges yet.</p>\n  ", 
__p += "\n</div>\n";
return __p;
});