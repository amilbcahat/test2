HR.appController.addTemplate("backbone/templates/hacko-transaction", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "\n", __p += model.get("link") ? '\n     <a href="' + (null == (__t = model.get("link")) ? "" :__t) + '" class="backbone" > <div class="clearfix row row-btn row-clear submissions_item">\n' :'\n    <div class="clearfix row row-btn row-clear submissions_item"  >\n', 
__p += '\n    <div class="span-xs-2">\n        <p>' + (null == (__t = sl + 1) ? "" :__t) + '</p>\n    </div>\n    <div class="span-xs-8">\n    <p style="text-transform: capitalize;">' + (null == (__t = model.get("description")) ? "" :__t) + '</p>\n    </div>\n    <div class="span-xs-6">\n        <p>' + (null == (__t = model.get("amount")) ? "" :__t) + "</p>\n     </div>\n", 
__p += model.get("link") ? "\n    </div></a>\n" :"\n    </div>\n", __p += "\n";
return __p;
});