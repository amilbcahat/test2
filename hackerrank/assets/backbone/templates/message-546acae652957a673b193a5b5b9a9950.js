HR.appController.addTemplate("backbone/templates/message", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="message_history">\n    <div class="text-center">\n        ', 
has_more && (__p += '\n        <a class="btn btn-small btn-white hr_load_more">\n            Load More\n        </a>\n        '), 
__p += '\n    </div>\n    <div class="message_list">\n        ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + '        \n    </div>\n    <div class="messaging_respond">\n        <textarea class="hr_message_text"></textarea>\n        <button class="btn btn-green hr_send">Send</button>\n    </div>\n</div>\n';
return __p;
});