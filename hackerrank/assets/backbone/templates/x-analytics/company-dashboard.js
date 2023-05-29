HR.appController.addTemplate("backbone/templates/x-analytics/company-dashboard", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Company Dashboard ', 
company.name && (__p += "- " + (null == (__t = company.name) ? "" :__t) + " "), 
__p += '</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    <div class="dash-container mjA">\n        <div class="msT msB">\n            <div class="span2">Search By :</div>\n            <div class="span14 search-radio-grp">\n                <label class="inline mlR">\n                    <input id="search-fields-id" name="search-field" type="radio" value="id" ', 
"id" == searchBy && (__p += " checked='checked' "), __p += '/>ID\n                </label>\n                <label class="inline mlR">\n                    <input id="search-fields-name" name="search-field" type="radio"\n                           value="name" ', 
"name" == searchBy && (__p += " checked='checked' "), __p += ' />Name\n                </label>\n                <label class="inline mlR">\n                    <input id="search-fields-email" name="search-field" type="radio"\n                           value="email" ', 
"email" == searchBy && (__p += " checked='checked' "), __p += ' />Email\n                </label>\n            </div>\n        </div>\n\n        <div class="msT msB">\n            <div class="span2">Company: </div>\n            <div class="span14"></div>\n            <input type="hidden" id="company-select2" class="wide company-select2">\n        </div>\n        <div class="subview-header-container hidden">\n            <hr>\n\n            <div class="mjT mjB">\n                <div class="btn-group">\n                    <a href="#" class="btn change-view-type ', 
"basic" == subViewType && (__p += " active btn-primary "), __p += '"\n                       data-view-type="basic">Basic Information</a>\n                    <a href="#" class="btn change-view-type ', 
"data" == subViewType && (__p += " active btn-primary "), __p += '"\n                       data-view-type="data">Data Usage</a>\n                    <a href="#" class="btn change-view-type ', 
"license" == subViewType && (__p += " active btn-primary "), __p += '"\n                       data-view-type="license">License Usage</a>\n                </div>\n            </div>\n\n            <hr>\n        </div>\n\n\n        <div class="mjT" id="sub-view-container">\n        </div>\n    </div>\n\n</div>\n';
return __p;
});