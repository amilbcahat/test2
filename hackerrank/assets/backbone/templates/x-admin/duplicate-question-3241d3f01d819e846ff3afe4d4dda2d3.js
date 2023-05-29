HR.appController.addTemplate("backbone/templates/x-admin/duplicate-question", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Duplicate Question</h3>\n</div>\n\n<div class="overflow-content" id="control-overflow">\n    <form id="duplicate-question-form" class="mjA">\n        <div class="msT msB">\n            <div class="span2">Search By :</div>\n            <div class="span13 search-radio-grp">\n                <label>\n                    <input id="search-fields-id" name="search-field" type="radio" value="id" ', 
"id" == searchBy && (__p += " checked='checked' "), __p += '/>ID\n                </label>\n                <label>\n                    <input id="search-fields-name" name="search-field" type="radio"\n                           value="name" ', 
"name" == searchBy && (__p += " checked='checked' "), __p += ' />Name/Email\n                </label>\n            </div>\n        </div>\n\n        <div class="msT msB">\n            <div class="span2 msT">Question: </div>\n            <input type="hidden" class="wide" id="question-select2">\n        </div>\n\n        <div class="msT msB">\n            <div class="span2 msT">New User: </div>\n            <input type="hidden" class="wide" id="user-select2">\n        </div>\n\n        <div class="row no-margin plT">\n            <div class="span-xs-16 span-md-16">\n                <button type="submit" id="duplicate-question" class="btn btn-primary btn-mid">Duplicate\n                </button>\n            </div>\n        </div>\n    </form>\n\n    <div class="mjA hidden message-box">\n    </div>\n\n</div>\n';
return __p;
});