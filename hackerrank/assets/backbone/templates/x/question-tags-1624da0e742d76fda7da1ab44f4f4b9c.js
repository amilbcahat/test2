HR.appController.addTemplate("backbone/templates/x/question-tags", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<label>TAGS</label>\n<div class="input-btn-group">\n    <input id="q-tag-inp" type="text" placeholder="tags">\n    <a href="#" class="btn" id="add-tag-link">Add</a>\n</div>\n<div class="tag-names-container">\n    ', 
_.each(tags, function(tag) {
__p += '\n        <span class="label removable q-tags"><span class="tag-val">' + (null == (__t = tag) ? "" :__t) + '</span><a href="javascript:;" class="remove-tag">x</a></span>&nbsp;\n    ';
}), __p += "\n</div>\n";
return __p;
});