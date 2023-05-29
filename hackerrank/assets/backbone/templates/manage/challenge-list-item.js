HR.appController.addTemplate("backbone/templates/manage/challenge-list-item", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", kind = {
code:"Algorithm",
game:"Game"
}, __p += '\n<div class="row', index % 2 == 0 && (__p += " row-alt"), __p += ' row-btn row-clear">\n    <div class="span1">\n      <p>' + (null == (__t = index) ? "" :__t) + '</p>\n    </div>\n    <div class="span4">\n      <p>' + (null == (__t = model.name) ? "" :_.escape(__t)) + '</p>\n    </div>\n    <div class="span2">\n      <p>' + (null == (__t = kind[model.kind]) ? "" :__t) + "</p>\n    </div>\n    <div class=\"span3\" style='white-space: nowrap;'>\n      <p style='font-size: 14px; white-space:normal; line-height:1em'>\n        ", 
_.each(model.contests, function(contest) {
__p += '\n            <a class="backbone" href="/' + (null == (__t = contest.slug) ? "" :__t) + '/challenges">' + (null == (__t = contest.name) ? "" :_.escape(__t)) + "</a>,\n        ";
}), __p += '\n      </p>\n    </div>\n    <div class="span2">\n      <p>' + (null == (__t = model.submissions) ? "" :__t) + '</p>\n    </div>\n    <div class="span3 pull-right">\n      <p class="btn-wrap btn-group">\n        <a href="/manage/challenge/edit/' + (null == (__t = model.id) ? "" :__t) + '" class="btn backbone">Edit</a>\n        <a href="#" class="btn btn-orange delete">Delete</a>\n      </p>\n    </div>\n</div>\n';
return __p;
});