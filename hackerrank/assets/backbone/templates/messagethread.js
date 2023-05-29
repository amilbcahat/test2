HR.appController.addTemplate("backbone/templates/messagethread", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="container">\n    <div class="layout_sidebar messaging_sidebar">\n        <header class="messaging_header">\n            <strong>Conversations</strong>\n            <a class="pull-right msT btn btn-text btn-small hr_send_new_message"><i class="icon-edit cursor"></i> New</a>\n        </header>\n        <ul class="threads-list-wrap messaging_threads">\n            ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + '\n        </ul>\n    </div>\n    <div class="layout_content messaging_content">\n        <div class="messaging_content">\n            ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n        </div>\n    </div>\n</section>\n";
return __p;
});