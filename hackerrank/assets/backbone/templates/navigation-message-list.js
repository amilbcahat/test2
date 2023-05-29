HR.appController.addTemplate("backbone/templates/navigation-message-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<li class="notify_item ' + (null == (__t = model.get("unread_count") > 0 ? "unread" :"read") ? "" :__t) + ' nav_message_item" data-id="' + (null == (__t = model.get("id")) ? "" :__t) + '">\n    <img src="' + (null == (__t = model.get("user2").avatar) ? "" :__t) + '" height="50" width="50" class="avatar pull-left" onerror="$(\'li.nav_message_item[data-id=' + (null == (__t = model.get("id")) ? "" :__t) + "] img').attr('src','https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg')\">\n    <div class=\"notify_message-wrap pull-right\">\n        <div class=\"notify_author\">\n            <strong>" + (null == (__t = model.get("user2").username) ? "" :_.escape(__t)) + '</strong>\n            <a class="message_status pull-right" rel="tooltip" data-original-title="' + (null == (__t = model.get("unread_count") > 0 ? "mark as read" :"mark as unread") ? "" :__t) + '"><i class="' + (null == (__t = model.get("unread_count") > 0 ? "icon-circle" :"icon-circle-empty") ? "" :__t) + '"></i></a>\n        </div>\n        <div class="notify_msg message_body">\n            ', 
model.get("user1").id === model.get("last_message").sender_id && (__p += ' \n                <i class="icon-reply"></i>&nbsp;\n            '), 
__p += "\n            " + (null == (__t = model.get("last_message").message) ? "" :_.escape(__t)) + '\n        </div>\n        <div class="meta">\n            <small class="meta">' + (null == (__t = $.timeago(model.get("last_message").created_at)) ? "" :__t) + "</small>\n        </div>\n    </div>\n</li>\n";
return __p;
});