HR.appController.addTemplate("backbone/templates/participant-application-company-apply", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="company-info-box scroll-box">\n  <div class="company-info-head clearfix">\n    <h4>Apply to ' + (null == (__t = meta_model.name) ? "" :__t) + '</h4>\n  </div>\n  <div class="company-info-content-section clearfix">\n    <p class="company-info-section-title">Positions</p>\n    <table>\n      ', 
_.each(meta_model.company_positions, function(position) {
__p += '\n      <tr>\n        <td>\n          <input type="checkbox" id="position_' + (null == (__t = position.id) ? "" :__t) + '"/>\n        </td>\n        <td>\n          <p><label for="position_' + (null == (__t = position.id) ? "" :__t) + '" class="cursor no-select">\n          ' + (null == (__t = position.name) ? "" :__t) + "</label></p>\n        </td>\n      </tr>\n      ";
}), __p += '\n    </table>\n  </div>\n  <div class="company-info-content-section clearfix">\n    <p class="company-info-section-title">Offices</p>\n    <table class="office-table">\n      <tr>\n        <td>\n        </td>\n        <td>\n        </td>\n        <td class="m">\n          <small style="font-weight: bold; color: #aaa;">VISA Status</small>\n        </td>\n      </tr>\n      ', 
_.each(meta_model.company_offices, function(office) {
__p += '\n      <tr>\n        <td>\n          <input type="checkbox" name="offices" id="office_' + (null == (__t = office.id) ? "" :__t) + '"/>\n        </td>\n        <td class="location-label">\n          <p><label for="office_' + (null == (__t = office.id) ? "" :__t) + '" class="cursor no-select">\n            ', 
office.city && office.city.name && (__p += "" + (null == (__t = office.city.name) ? "" :__t) + ","), 
__p += "\n            ", office.country && office.city.name && (__p += "" + (null == (__t = office.country.name) ? "" :__t)), 
__p += '\n          </label></p>\n        </td>\n        <td>\n          <select disabled="disabled" id="visa_status_' + (null == (__t = office.id) ? "" :__t) + '">\n            <option value="not-required">Not required</option>\n            <option value="already-have">Already have</option>\n            <option value="dont-have">Don\'t have</option>\n          </select>\n        </td>\n      </tr>\n      ';
}), __p += '\n    </table>\n  </div>\n  <div class="company-info-content-section clearfix">\n    <p class="company-info-section-title">Role</p>\n    <table>\n      <tr>\n        <td><input type="radio" name="role" checked="checked" id="role_fulltime"/></td>\n        <td class="role-label">\n          <p><label for="role_fulltime" class="cursor no-select">Fulltime</label></p>\n        </td>\n        <td><input type="radio" name="role" id="role_internship"/></td>\n        <td class="role-label">\n          <p><label for="role_internship" class="cursor no-select">Internship</label></p>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n';
return __p;
});