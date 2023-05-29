HR.appController.addTemplate("backbone/templates/x-admin/test-add-sections", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Add/Edit Test Sections</h3>\n</div>\n\n<div class="overflow-content" id="control-overflow">\n    <form id="test-sections-form" class="mjA">\n        <div class="msT msB">\n            <div class="span2">Search By :</div>\n            <div class="span14 search-radio-grp">\n                <label class="inline mlR">\n                    <input id="search-fields-id" name="search-field" type="radio" value="id" ', 
"id" == searchBy && (__p += " checked='checked' "), __p += '/>ID\n                </label>\n                <label class="inline mlR">\n                    <input id="search-fields-name" name="search-field" type="radio"\n                           value="name" ', 
"name" == searchBy && (__p += " checked='checked' "), __p += ' />Name\n                </label>\n            </div>\n        </div>\n\n        <div class="msT msB">\n            <div class="span2">Test: </div>\n            <div class="span14"></div>\n            <input type="hidden" class="wide test-select2">\n        </div>\n\n        <div id="test-sections-container" class="mjT"></div>\n    </form>\n\n    <div class="message-box hidden mjA"></div>\n</div>\n';
return __p;
});