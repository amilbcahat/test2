HR.appController.addTemplate("backbone/templates/message-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="message_group">\n    <a class="backbone" href="/' + (null == (__t = model.sender.username) ? "" :__t) + '"><img src="' + (null == (__t = model.sender.avatar) ? "" :__t) + '" height="50" width="50" class="avatar" onerror="$(\'div[data-id=' + (null == (__t = model.id) ? "" :__t) + "] img').attr('src','https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg')\"/></a>\n    <div class=\"message_body\">\n        <p>" + (null == (__t = model.message) ? "" :__t) + '</p>\n    </div>\n    <footer class="message_footer">\n        <p><a href="/' + (null == (__t = model.sender.username) ? "" :_.escape(__t)) + '" class="backbone">' + (null == (__t = model.sender.username) ? "" :__t) + "</a> &bull; " + (null == (__t = model.id ? "Sent " + $.timeago(new Date(model.created_at)) :"Sending") ? "" :__t) + "</p>\n    </footer>\n</div>\n";
return __p;
});