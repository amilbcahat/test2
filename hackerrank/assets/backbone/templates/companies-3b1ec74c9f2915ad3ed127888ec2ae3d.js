HR.appController.addTemplate("backbone/templates/companies", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="container">\n<header class="page-title container">\n<h1 class="span16">\n  <div class="title-img"></div>\n  Apply to ', 
__p += 1 === companies.length ? "" + (null == (__t = companies[0].name) ? "" :__t) :"Companies", 
__p += '\n  </h1>\n  </header>\n  <div class="row light-wrap wrap row" style="margin-left:0px; margin-top:20px;">\n    <table id="companies" class="table table-bordered table-striped span15">\n      ', 
_.each(companies, function(company) {
__p += '\n      <tr>\n        <td style="width:210px;">\n          <img class="company-img" src="https://s3.amazonaws.com/hackerrank-companies/' + (null == (__t = company.logo) ? "" :__t) + '" alt="' + (null == (__t = company.name) ? "" :__t) + '" />\n          </td>\n          <td>\n              <p>' + (null == (__t = company.pitch) ? "" :__t) + "</p>\n              ", 
company.solved_challenges.length > 0 ? (__p += '\n              <p>\n                    <a href="challenges/' + (null == (__t = company.solved_challenges[0].slug) ? "" :__t) + "/apply/" + (null == (__t = company.slug) ? "" :__t) + '" class="backbone pull-right btn btn-primary margin-top-6px">Apply</a>\n                    </p>\n                ', 
company.unsolved_challenges.length > 0 && (__p += "\n                Solve\n                ", 
_.each(company.unsolved_challenges, function(challenge) {
__p += '\n                  <a href="challenges/' + (null == (__t = challenge.slug) ? "" :__t) + '" class="backbone">' + (null == (__t = challenge.name) ? "" :__t) + "</a>\n                ";
}), __p += " to improve your profile!\n                "), __p += "\n              ") :(__p += "\n              <p>\n              ", 
company.unsolved_challenges.length > 0 && (__p += "\n              Solve\n              ", 
_.each(company.unsolved_challenges, function(challenge) {
__p += '\n                <a href="challenges/' + (null == (__t = challenge.slug) ? "" :__t) + '" class="backbone">' + (null == (__t = challenge.name) ? "" :__t) + "</a>\n              ";
}), __p += " to apply!\n              "), __p += "\n              </p>\n              "), 
__p += "\n          </td>\n        </tr>\n      ";
}), __p += "\n    </table>\n  </div>\n</section>\n";
return __p;
});