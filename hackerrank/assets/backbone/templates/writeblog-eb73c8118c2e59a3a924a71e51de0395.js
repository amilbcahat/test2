HR.appController.addTemplate("backbone/templates/writeblog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section>\n    <iframe src="' + (null == (__t = wordpressbaseurl) ? "" :__t) + '/editor/editor.php" id="receiver" width=100% height=700 allowfullscreen scrolling="no" border="0" >\n    </iframe>\n</section>\n<button id="postblog">Submit for Review</button>\n<div class="error-block hide" id="error-message"></div>\n';
return __p;
});