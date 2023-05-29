HR.appController.addTemplate("backbone/templates/participant-application", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="submissions container">\n  <div class="container--inner">\n    <header class="row">\n      <h1 class="span16">\n        <div class="title-img"></div>\n        Apply to ', 
__p += 1 === companies.length ? "" + (null == (__t = companies[0].name) ? "" :__t) :"Companies", 
__p += '\n      </h1>\n    </header>\n    <div class="row">\n      <div class="pull-right right span4 update-applicant-profile-container">\n        <a class="btn btn-primary backbone" href="' + (null == (__t = document.location.pathname + "/confirm_profile") ? "" :__t) + '">Update Hacker Profile</a>\n        <span class="help-prompt">\n          <i class="icon-help-circled icon-single"></i>\n          <span class="help-text help-text-right">Your hacker profile will be sent to the\n            recruiters of the companies you have applied to. Please update your hacker\n            profile before applying to companies.</span>\n        </span>\n      </div>\n    </div>\n    ', 
0 == meta_contest.cutoff_score || current_hacker && current_hacker.score && !(meta_contest.cutoff_score > current_hacker.score) || (__p += '\n    <div class="span16">\n      <div class="alert alert-info">\n        <p>You need to score atleast ' + (null == (__t = meta_contest.cutoff_score) ? "" :__t) + " to apply for companies.</p>\n      </div>\n    </div>\n    "), 
__p += '\n    <div class="control-group span16">\n      ', _.each(companies, function(company) {
__p += '\n      <div class="apply-company-box">\n        <div class="apply-company-head">\n          <img alt="' + (null == (__t = company.name) ? "" :__t) + '" class="company-img" height="100" width="100"\n               src="https://s3.amazonaws.com/hackerrank-companies/' + (null == (__t = company.logo) ? "" :__t) + '"/>\n        </div>\n        <div class="apply-company-body">\n          <h4>' + (null == (__t = company.name) ? "" :__t) + "</h4>\n          <p>" + (null == (__t = company.pitch) ? "" :__t) + '</p>\n          <div class="pull-right">\n            <button data-id="' + (null == (__t = company.id) ? "" :__t) + '" class="btn btn-text more-info">More Info</button>\n            <button data-id="' + (null == (__t = company.id) ? "" :__t) + '" ', 
company.applied && (__p += 'disabled="disabled"'), __p += '\n                    class="btn btn-primary apply">Appl', 
__p += company.applied ? "ied" :"y", __p += "</button>\n          </div>\n        </div>\n      </div>\n      ";
}), __p += "\n    </div>\n  </div>\n</section>\n";
return __p;
});