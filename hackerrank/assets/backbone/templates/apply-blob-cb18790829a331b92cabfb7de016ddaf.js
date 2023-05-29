HR.appController.addTemplate("backbone/templates/apply-blob", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", model.company && (__p += '\n<div class="alert alert-info clearfix">\n  <div class="span12 ', 
model.solved || (__p += "margin-top-10px"), __p += '">\n    <p class="m alert-info">This challenge is being sponsored by ' + (null == (__t = model.company.name) ? "" :__t) + '.</p>\n    <p class="m alert-info">You can apply for ' + (null == (__t = model.company.name) ? "" :__t) + ' if you solve this challenge successfully.</p>\n  </div>\n  <div class="span3 pull-right text-center">\n    ', 
model.solved ? (__p += "\n      ", __p += "master" == model.contest_slug ? '\n        <a href="challenges/' + (null == (__t = model.slug) ? "" :__t) + "/apply/" + (null == (__t = model.company.slug) ? "" :__t) + '" class="backbone btn btn-primary margin-top-6px">Apply</a>\n      ' :'\n        <a href="contests/' + (null == (__t = model.contest_slug) ? "" :__t) + "/challenges/" + (null == (__t = model.slug) ? "" :__t) + "/apply/" + (null == (__t = model.company.slug) ? "" :__t) + '" class="backbone btn btn-primary margin-top-6px">Apply</a>\n      ', 
__p += "\n    ") :__p += '\n    <a class="btn btn-primary" disabled="disabled">Apply</a>\n    <p class="gray-text">will be enabled once you solve this challenge</p>\n    ', 
__p += "\n  </div>\n</div>\n"), __p += "\n";
return __p;
});