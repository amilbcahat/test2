HR.appController.addTemplate("backbone/templates/navigation-notification-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<li class="notify_item unread" data-id="' + (null == (__t = model.id) ? "" :__t) + '">\n    <div class="notify_author">\n        <strong>' + (null == (__t = model.subject) ? "" :_.escape(__t)) + '</strong>\n        <a class="close pull-right" rel="tooltip" data-original-title="Archive">&times;</a>\n    </div>\n    <div class="notify_msg">\n        ' + (null == (__t = model.body) ? "" :_.escape(__t)) + '\n    </div>\n    <div class="meta">\n        <small class="meta">' + (null == (__t = $.timeago(new Date(1e3 * model.created_at_epoch))) ? "" :__t) + "</small>\n    </div>\n</li>\n";
return __p;
});