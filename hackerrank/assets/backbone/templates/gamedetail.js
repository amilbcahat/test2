HR.appController.addTemplate("backbone/templates/gamedetail", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container--inner">\n<header class="clearfix page-title">\n	<h1>\n		Game Details of Game # ' + (null == (__t = model.id) ? "" :__t) + "\n	</h1>\n\n  <p>\n    <ul>\n      <li>Score Status: " + (null == (__t = score_process_flag) ? "" :__t) + "</li>\n      <li>Process Flag: " + (null == (__t = process_flag) ? "" :__t) + "</li>\n      <li>Score: " + (null == (__t = model.get("score")) ? "" :__t) + "</li>\n      <li>Result: " + (null == (__t = model.get("result")) ? "" :__t) + "</li>\n    </ul>\n  </p>\n</header>\n\n";
return __p;
});