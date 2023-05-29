HR.appController.addTemplate("backbone/templates/hacker-post", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", 0 == model.length && (__p += "\n  ", __p += hacker === HR.profile().get("username") ? '\n    <p class="mlB aside text-center">You have not commented on any discussions.</p>\n  ' :'\n    <p class="mlB aside text-center">' + (null == (__t = hacker) ? "" :__t) + " has not commented on any discussions.</p>\n  ", 
__p += "\n"), __p += "\n", _.each(model, function(post) {
__p += '\n    <p class="msT">' + (null == (__t = post.text) ? "" :__t) + '\n       <span class="aside small">(' + (null == (__t = post.time) ? "" :__t) + ")</span>\n    </p>\n";
}), __p += "\n";
return __p;
});