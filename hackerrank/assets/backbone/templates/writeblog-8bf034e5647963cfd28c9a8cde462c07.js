HR.appController.addTemplate("backbone/templates/writeblog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class=\'mjL plT hide\' id=\'message\'>\n    We have received your article. We will publish it soon.<a id=\'new-article\' href="#">Click here</a> to write another article.\n</div>\n<div class="wp-editor">\n    <div class="alert error hide msA" id="error-message"></div>\n    <section class="clearfix editor_holder">\n        <iframe src="' + (null == (__t = wordpressbaseurl) ? "" :__t) + '/wp-content/plugins/wordpress_editor/editor.php" id="editor-iframe" width=100% allowfullscreen scrolling="no" border="0" class="span16" height=\'718\'>\n        </iframe>\n        <div class="action_box clearfix">\n            <!-- <label class=\'invisible span1 psT\'>Content</label> -->\n            <div class="msB text-center pull-left">\n                <button id="postblog" class=\'btn btn-green psT mjL \'>Submit</button>\n            </div>\n            <div class="msB text-center pull-left">\n                <button id="saveblog" class=\'btn btn-green psT mjL \'>Save</button>\n            </div>\n            <div class="msB text-center pull-left">\n                <button id="previewblog" class=\'btn btn-green psT mjL\'>Preview</button>\n            </div>\n        </div>\n    </section>\n</div>\n<style type="text/css">\n    .editor_holder{\n        position: relative;\n    }\n\n    .write-blog{\n        background: #f1f1f1;\n    }\n\n    .action_box{\n        position: absolute;\n        bottom: 0;\n        margin-left: 10px;\n    }\n</style>\n';
return __p;
});