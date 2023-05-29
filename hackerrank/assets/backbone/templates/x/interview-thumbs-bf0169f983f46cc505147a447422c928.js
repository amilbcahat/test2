HR.appController.addTemplate("backbone/templates/x/interview-thumbs", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<span class="btn-group">\n  <a class="btn js-thumbs ', 
_.isUndefined(model.thumbs) || 1 != model.thumbs || (__p += "active"), __p += '" data-thumbs=1><i class="icon2-thumbsup ', 
_.isUndefined(model.thumbs) || 1 != model.thumbs || (__p += "success"), __p += '"></i></a>\n  <a class="btn js-thumbs ', 
_.isUndefined(model.thumbs) || 0 != model.thumbs || (__p += "active"), __p += '" data-thumbs=0><i class="icon2-thumbsdown ', 
_.isUndefined(model.thumbs) || 0 != model.thumbs || (__p += "error"), __p += '"></i></a>\n</span>\n';
return __p;
});