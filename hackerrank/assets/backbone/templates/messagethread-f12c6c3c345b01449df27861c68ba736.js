HR.appController.addTemplate("backbone/templates/messagethread", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="container messaging">\n    <div class="content_wrap wide">\n        <div class="sidebar--inline">\n            <header class="sidebar_header">\n                <p>\n                    <div class="text-center">\n                        <strong>Conversations</strong>\n                        <a class="pull-right mmT btn btn-text btn-small hr_send_new_message"><i class="icon-edit cursor"></i> New</a>\n                    </div>\n                </p>\n            </header>\n            <ul class="sidebar_list threads-list-wrap threads_list">\n                ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + '\n            </ul>\n        </div>\n        <div>\n            <div class="content--inline padded messaging_content">\n                ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n            </div>\n        </div>\n    </div>\n</section>\n";
return __p;
});