HR.appController.addTemplate("backbone/templates/administration/company-edit-overview", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="aside block-margin margin-large">This is the basic information\n    that describes a company.</p>\n\n<div class="formgroup horizontal row">\n    <label for="name" class="pull-left span3">Company Name</label>\n    <div class="block span12 profile-input">\n        <input id="name" type="text" class="span12 auto-save"/>\n        <small class="error name span12"></small>\n    </div>\n</div>\n\n<div class="formgroup horizontal row">\n    <label for="website" class="pull-left span3">Company Website</label>\n    <div class="block span12 profile-input">\n        <input id="website" type="text" class="span12 auto-save"/>\n        <small class="error name span12"></small>\n    </div>\n</div>\n\n<div class="formgroup horizontal row">\n    <label for="pitch" class="pull-left span3">Company Pitch</label>\n    <div class="block span12 profile-input pull-left">\n        <textarea id="pitch" rows="6" class="pitch span12 auto-save"></textarea>\n        <small class="span12 pitch pull-left sub-help">Characters left: ' + (null == (__t = model.max_limit.pitch) ? "" :__t) + "</small>\n    </div>\n</div>\n";
return __p;
});