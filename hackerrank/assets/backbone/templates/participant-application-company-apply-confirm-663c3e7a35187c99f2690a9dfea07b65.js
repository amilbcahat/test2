HR.appController.addTemplate("backbone/templates/participant-application-company-apply-confirm", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p style="padding-top: 10px;"><strong>Positions</strong></p>\n<ul style="list-style: none;">\n  ', 
_.each(model.positions, function(position) {
__p += "\n    ";
var _position = _.first(_.select(meta_model.company_positions, function(pos) {
return pos.id == position;
}));
__p += "\n    <li>\n      <p>&#10004; " + (null == (__t = _position.name) ? "" :__t) + "</p>\n    </li>\n  ";
}), __p += '\n</ul>\n<p style="padding-top: 10px;"><strong>Offices</strong></p>\n<ul style="list-style: none;">\n  ', 
_.each(model.offices, function(visa_status, office) {
__p += "\n    ";
var _office = _.first(_.select(meta_model.company_offices, function(off) {
return off.id == office;
}));
__p += "\n    <li>\n      <p>&#10004;\n        ", _office.city && _office.city.name && (__p += "" + (null == (__t = _office.city.name) ? "" :__t) + ","), 
__p += "\n        ", _office.country && _office.city.name && (__p += "" + (null == (__t = _office.country.name) ? "" :__t)), 
__p += '\n        <span style="font-size: 12px;">(<strong>VISA Status:</strong> <em>' + (null == (__t = visa_statuses[visa_status]) ? "" :__t) + "</em>)</span></p>\n    </li>\n  ";
}), __p += '\n</ul>\n<p style="padding-top: 10px;"><strong>Role:</strong> ' + (null == (__t = _.capitalize(model.role)) ? "" :__t) + '</p>\n<p class="m" style="font-weight: bold; font-size: 14px; border: 2px solid #aaa; margin-top:10px;">\n  Please review your application. Once you confirm, you can\'t withdraw it.</p>\n';
return __p;
});