HR.appController.addTemplate("backbone/templates/x-admin/switch-user", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Switch User</h3>\n</div>\n\n<div class="overflow-content" id="control-overflow">\n    <form id="su-form" class="mjA">\n        <div class="msT msB">\n            <div class="span2">Search By :</div>\n            <div class="span14 search-radio-grp">\n                <label class="inline mlR">\n                    <input id="search-fields-id" name="search-field" type="radio" value="id" ', 
"id" == searchBy && (__p += " checked='checked' "), __p += '/>ID\n                </label>\n                <label class="inline mlR">\n                    <input id="search-fields-name" name="search-field" type="radio"\n                           value="name" ', 
"name" == searchBy && (__p += " checked='checked' "), __p += ' />Name\n                </label>\n            </div>\n        </div>\n\n        <div class="msT msB">\n            <div class="span2 msT">User: </div>\n            <div class="span14"><input type="hidden" id="user-select2" class="wide"></div>\n        </div>\n        <div class="clearfix"></div>\n\n        <div class="row no-margin plT mlT">\n            <div class="span-xs-16 span-md-16">\n                <button type="submit" id="su-submit" class="btn btn-primary btn-mid">Skadoosh !!\n                </button>\n            </div>\n        </div>\n    </form>\n\n    <div class="mjA hidden message-box">\n    </div>\n</div>\n';
return __p;
});