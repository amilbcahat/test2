HR.appController.addTemplate("backbone/templates/dashboard/contests-tab", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<li class="' + (null == (__t = model.active ? "active" :"") ? "" :__t) + ' sidebar_list-item">\n  <a class="change-track backbone" href="/contests/' + (null == (__t = model.get("slug")) ? "" :__t) + '">\n    <span class="sidebar_item-heading">' + (null == (__t = model.get("name")) ? "" :_.escape(__t)) + "</span>\n    ", 
__p += model.get("archived") ? "\n    " :model.get("ended") ? '\n        <span class="sidebar_item-content">\n            <i class="status-indicator completed"></i>\n            Ended\n        </span>\n    ' :model.get("started") ? '\n        <span class="sidebar_item-content">\n            <i class="status-indicator active"></i>\n            In Progress. Ends\n            <time class="timeago" datetime="' + (null == (__t = model.nextMilestone().toISOString()) ? "" :__t) + '">\n              ' + (null == (__t = model.nextMilestone().toString()) ? "" :__t) + "\n            </time>\n        </span>\n    " :'\n        <span class="sidebar_item-content">\n            <i class="status-indicator pending"></i>\n            Starts\n            <time class="timeago" datetime="' + (null == (__t = model.nextMilestone().toISOString()) ? "" :__t) + '">\n              ' + (null == (__t = model.nextMilestone().toString()) ? "" :__t) + "\n            </time>\n        </span>\n    ", 
__p += "\n  </a>\n</li>\n";
return __p;
});