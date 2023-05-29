HR.appController.addTemplate("backbone/templates/manage/contest-access", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<style>\n\n.contest_access .item\n{\n  display: block;\n  background-color: #CCC;\n  border-radius: 5px;\n  margin-right: 15px;\n  margin-bottom: 5px;\n}\n.contest_access .item .text\n{\n  display: inline-block;\n  margin: 5px;\n}\n.contest_access .item .close\n{\n  display: inline-block;\n  margin: 5px;\n  cursor: pointer;\n  color:#333;\n}\n</style>\n<div class="span11 row contest_access">\n\n    <div class="span11 block-center row">\n        <label>Allowed Hackers\n            <i data-toggle="popover" data-content="Use this to add hackers already registered on HackerRank to participate in the contest." class="icon-help-circled"></i>\n        </label>\n        <hr style="margin: 5px 0px" />\n        ', 
_.each(collection, function(model) {
__p += "\n\n        ", null != model.hacker_id && (__p += '\n        <div class="pull-left item">\n            <span class="text">' + (null == (__t = model.username) ? "" :__t) + '</span><span class="close delete" data-id="' + (null == (__t = model.id) ? "" :__t) + '" >x</span>\n        </div>\n        '), 
__p += "\n        ";
}), __p += '\n    </div>\n    <div class="span11 block-center row">\n        <br/>\n        <div class="span11 clear-margin">\n            <input type="text" class="span3 hacker clear-margin" />\n            <button type="button" class="btn btn-small add_hacker">Add Hacker</button>\n            <label class="hacker_error error inline"></label>\n        </div>\n    </div>\n    <div class="span11 block-center row" style="margin-top:10px;">\n        <label>Allowed Emails\n          <i data-toggle="popover" data-content="Add the emails which you want to be allowed to participate in the contest. for multiple emails use commmaseprated values." class="icon-help-circled"></i>\n        </label>\n        <hr style="margin: 5px 0px"/>\n        ', 
_.each(collection, function(model) {
__p += "\n\n        ", null != model.email && (__p += '\n        <div class="pull-left item">\n            <span class="text">' + (null == (__t = model.email) ? "" :__t) + '</span><span class="close delete" data-id="' + (null == (__t = model.id) ? "" :__t) + '" >x</span>\n        </div>\n        '), 
__p += "\n        ";
}), __p += '\n    </div>\n    <div class="span11 block-center row">\n        <br/>\n        <div class="span8 clear-margin">\n            <textarea class="span8 emails" style="min-height:50px;" placeholder="abc@hr.com, abc2@hr.edu"></textarea>\n        </div>\n        <div class="span2">\n            <button type="button" class="btn btn-medium pull-right add_emails">Add Emails</button>\n        </div>\n    </div>\n</div>\n';
return __p;
});