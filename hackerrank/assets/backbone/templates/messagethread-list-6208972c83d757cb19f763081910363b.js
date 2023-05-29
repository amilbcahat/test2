HR.appController.addTemplate("backbone/templates/messagethread-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<li class="cursor psA sidebar_list-item message-thread media ' + (null == (__t = model.unread_count > 0 ? "unread" :"") ? "" :_.escape(__t)) + " " + (null == (__t = model.active ? "active" :"") ? "" :_.escape(__t)) + '">\n    <img src="' + (null == (__t = model.user2.avatar) ? "" :_.escape(__t)) + '" height="65" width="65" class="avatar media-el" onerror="$(\'div[data-thread-id=' + (null == (__t = model.id) ? "" :__t) + "] img').attr('src','https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg')\"/>\n    <div class=\"media-content\">\n        <p class=\"sidebar_item-heading\">\n            " + (null == (__t = model.user2.username) ? "" :_.escape(__t)) + "\n            ", 
model.unread_count > 0 && (__p += '\n                <small class="pull-right">\n                    <a href="/inbox/thread/' + (null == (__t = model.id) ? "" :__t) + '" class="backbone small thread-count">' + (null == (__t = model.unread_count) ? "" :__t) + " unread</a>\n                </small>\n            "), 
__p += '\n        </p>\n        <p class="sidebar_item-content">', model.last_message.sender_id == profile.id && (__p += '<i class="icon-reply"></i>&nbsp;'), 
__p += "<span>" + (null == (__t = model.last_message.message) ? "" :_.escape(__t)) + "</span></p>\n    </div>\n</li>\n";
return __p;
});