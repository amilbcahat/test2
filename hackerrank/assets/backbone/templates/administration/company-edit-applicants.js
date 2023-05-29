HR.appController.addTemplate("backbone/templates/administration/company-edit-applicants", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="m padded">\n  <h3>Contests</h3>\n  <ul style="list-style: none;">\n    ', 
_.each(_collection, function(contest) {
__p += '\n    <li>\n      <a href="/administration/companies/edit/' + (null == (__t = _model.id) ? "" :__t) + "/applicants/" + (null == (__t = contest.id) ? "" :__t) + '" class="backbone">' + (null == (__t = contest.name) ? "" :__t) + "</a>\n    </li>\n    ";
}), __p += "\n  </ul>\n</div>\n";
return __p;
});