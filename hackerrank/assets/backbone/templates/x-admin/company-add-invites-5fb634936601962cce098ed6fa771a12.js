HR.appController.addTemplate("backbone/templates/x-admin/company-add-invites", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Add Invites</h3>\n</div>\n\n<div class="overflow-content" id="control-overflow">\n    <form id="add-invites-form" class="mjA">\n        <div class="msT msB">\n            <div class="span2">Search By :</div>\n            <div class="span13 search-radio-grp">\n                <label class="inline mlR">\n                    <input id="search-fields-id" name="search-field" type="radio" value="id" ', 
"id" == searchBy && (__p += " checked='checked' "), __p += '/>ID\n                </label>\n                <label class="inline mlR">\n                    <input id="search-fields-name" name="search-field" type="radio"\n                           value="name" ', 
"name" == searchBy && (__p += " checked='checked' "), __p += ' />Name\n                </label>\n                <label class="inline mlR">\n                    <input id="search-fields-email" name="search-field" type="radio" value="email" ', 
"email" == searchBy && (__p += " checked='checked' "), __p += '/>Email\n                </label>\n            </div>\n        </div>\n\n        <div class="msT msB">\n            <div class="span2 msT">Company: </div>\n            <input type="hidden" class="wide" id="company-select2">\n        </div>\n\n        <div class="company-info-section"></div>\n    </form>\n\n    <div class="mjA hidden message-box">\n    </div>\n\n</div>\n';
return __p;
});