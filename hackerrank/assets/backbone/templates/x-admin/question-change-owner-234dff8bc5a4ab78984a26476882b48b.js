HR.appController.addTemplate("backbone/templates/x-admin/question-change-owner", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Change Question Owner</h3>\n</div>\n\n<div class="overflow-content" id="control-overflow">\n    <form id="question-change-owner-form" class="mjA">\n        <div class="msT msB">\n            <div class="span2">Search By :</div>\n            <div class="span14 search-radio-grp">\n                <label class="span1">\n                    <input id="search-fields-id" name="search-field" type="radio" value="id" ', 
"id" == searchBy && (__p += " checked='checked' "), __p += '/>ID\n                </label>\n                <label class="span3">\n                    <input id="search-fields-name" name="search-field" type="radio"\n                           value="name" ', 
"name" == searchBy && (__p += " checked='checked' "), __p += ' />Name\n                </label>\n                <div class="clearfix"></div>\n            </div>\n        </div>\n\n        <div class="msT msB">\n            <div class="span2 msT">Question:</div>\n            <div class="span14"></div>\n            <input type="hidden" id="question-select2" class="wide">\n        </div>\n    </form>\n\n    <div id="question-info-section"></div>\n</div>\n';
return __p;
});