HR.appController.addTemplate("backbone/templates/dashboard/bread-crumbs", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<ul class="breadcrumb unstyled horizontal">\n  ', collection.each(function(crumb) {
__p += '\n  <li>\n    <a href="' + (null == (__t = crumb.get("path")) ? "" :__t) + '" class="backbone">\n      ' + (null == (__t = crumb.get("name")) ? "" :__t) + '\n    </a>\n    <i class="icon-right-open-big divider"></i>\n  </li>\n  ';
}), __p += "\n</ul>\n";
return __p;
});