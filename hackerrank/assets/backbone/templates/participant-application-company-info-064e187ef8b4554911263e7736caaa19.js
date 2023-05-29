HR.appController.addTemplate("backbone/templates/participant-application-company-info", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="company-info-box scroll-box">\n  <div class="company-info-head clearfix">\n    <img alt="' + (null == (__t = meta_model.name) ? "" :__t) + '" class="company-img pull-left" height="100" width="100"\n         src="https://s3.amazonaws.com/hackerrank-companies/' + (null == (__t = meta_model.logo) ? "" :__t) + '"/>\n    <div class="pull-right" style="padding-right: 10px; padding-top: 10px;">\n      <h4>' + (null == (__t = meta_model.name) ? "" :__t) + "</h4>\n      ", 
meta_model.website && (__p += '\n      <p><a href="' + (null == (__t = meta_model.website) ? "" :__t) + '" target="_blank">' + (null == (__t = meta_model.website) ? "" :__t) + "</a></p>\n      "), 
__p += '\n    </div>\n    <div class="clearfix"></div>\n    <p>' + (null == (__t = meta_model.pitch) ? "" :__t) + '</p>\n  </div>\n  <div class="company-info-content-section clearfix">\n    <p class="company-info-section-title">Positions</p>\n    <ul>\n      ', 
_.each(meta_model.company_positions, function(position) {
__p += "\n      <li><strong>" + (null == (__t = position.name) ? "" :__t) + "</strong><br>" + (null == (__t = position.description) ? "" :__t) + "</li>\n      ";
}), __p += '\n    </ul>\n  </div>\n  <div class="company-info-content-section clearfix">\n    <p class="company-info-section-title">Offices</p>\n    <ul>\n      ', 
_.each(meta_model.company_offices, function(office) {
__p += "\n      <li>\n        ", office.city && office.city.name && (__p += "" + (null == (__t = office.city.name) ? "" :__t) + ","), 
__p += "\n        ", office.country && office.city.name && (__p += "" + (null == (__t = office.country.name) ? "" :__t)), 
__p += "\n      </li>\n      ";
}), __p += "\n    </ul>\n  </div>\n</div>\n";
return __p;
});