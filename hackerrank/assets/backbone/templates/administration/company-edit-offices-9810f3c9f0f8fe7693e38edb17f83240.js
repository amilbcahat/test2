HR.appController.addTemplate("backbone/templates/administration/company-edit-offices", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="aside block-margin margin-large">Offices for which the Company is\n  hiring for.</p>\n\n<div class="formgroup horizontal row">\n  <div class="span16">\n    <button class="add-office btn btn-green">+ Add Office</button>\n  </div>\n</div>\n\n', 
_.each(_model.company_offices, function(office) {
__p += '\n<div class="formgroup horizontal row" style="border-bottom: 2px solid #eee; padding-bottom: 15px;">\n  <div class="span14">\n    <p>\n        ', 
office.city && office.city.name && (__p += "" + (null == (__t = office.city.name) ? "" :__t) + ","), 
__p += "\n        ", office.country && office.city.name && (__p += "" + (null == (__t = office.country.name) ? "" :__t)), 
__p += '\n    </p>\n  </div>\n  <div class="span2 right">\n    <button class="btn btn-text edit-office" data-id="' + (null == (__t = office.id) ? "" :__t) + '"><i class="icon-pencil"></i> edit</button> &nbsp;&nbsp;&nbsp;\n    <button class="btn btn-text remove-office" data-id="' + (null == (__t = office.id) ? "" :__t) + '">&#215; delete</button>\n  </div>\n</div>\n';
}), __p += "\n";
return __p;
});