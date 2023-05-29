HR.appController.addTemplate("backbone/templates/manage/contest-list-item", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row row-clear">\n    <div class="span1">\n      <p>' + (null == (__t = index) ? "" :__t) + '</p>\n    </div>\n    <div class="span4">\n      <p><a class="challenge-slug" target="_blank" href="/' + (null == (__t = model.slug) ? "" :__t) + '">' + (null == (__t = model.name) ? "" :_.escape(__t)) + '</a></p>\n    </div>\n    <div class="span2">\n      <p>' + (null == (__t = status) ? "" :__t) + '</p>\n    </div>\n    <div class="span2">\n      <p>' + (null == (__t = model.participation_count) ? "" :__t) + "</p>\n    </div>\n    <div class=\"span3\">\n      <p style='font-size: 14px;'>\n        ", 
_.each(model.notifications, function(notification) {
__p += "\n          " + (null == (__t = notification) ? "" :__t) + "\n          <br/>\n        ";
}), __p += "\n        ", (null == model.notifications || 0 == model.notifications.length) && (__p += "\n            --\n        "), 
__p += '\n      </p>\n    </div>\n    <div class="span3 pull-right">\n      <p class="btn-group btn-wrap">\n        <a href="/manage/contest/edit/' + (null == (__t = model.slug) ? "" :__t) + '" class="btn backbone">Edit</a>\n        <a href="#" class="btn btn-orange delete">Delete</a>\n      </p>\n    </div>\n</div>\n';
return __p;
});