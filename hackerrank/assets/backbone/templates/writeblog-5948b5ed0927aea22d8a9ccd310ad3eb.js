HR.appController.addTemplate("backbone/templates/writeblog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="wp-editor">\n    <section >\n        <iframe src="' + (null == (__t = wordpressbaseurl) ? "" :__t) + '/editor/editor.php" id="editor-iframe" width=100% height=700 allowfullscreen scrolling="no" border="0" >\n        </iframe>\n        <div>\n            <label class=\'invisible pull-left span1 psT\'>Content</label>\n            <button id="postblog" class=\'btn btn-green pull-left psT mjL \'>Submit</button>\n        </div>\n    </section>\n</div>\n<div class="error-block hide" id="error-message"></div>\n<style type="text/css">\n    #postblog{\n        margin-top: -30px;\n        margin-bottom: 30px;\n    }\n</style>\n';
return __p;
});