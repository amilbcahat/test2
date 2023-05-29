HR.appController.addTemplate("backbone/templates/x-analytics/company-basic-data", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="data-section-title mlT mlB">\n    <h3>Basic Information</h3>\n</div>\n<div class="basic-info-container msL">\n    <div class="section">\n        <div class="section-title msB">\n            Company Info\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Name:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.name) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Owner:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.email) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Plan:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.stripe_plan) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Invites Remaining:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.invites_remaining_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Created On:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.created_at) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n\n    </div>\n\n    <div class="section mlT">\n        <div class="section-title msB">\n            Data Usage\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Invites Sent:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.invites_sent_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Tests Created:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.tests_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Attempts:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.attempts_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Interviews:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.interviews_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n\n    <div class="section mlT">\n        <div class="section-title msB">\n            License Usage\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Teams:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.teams_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Admins:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.admins_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Recruiters:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.recruiters_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Developers:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.developers_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="data-label span2">\n                Users:\n            </div>\n            <div class="data-val span4">\n                ' + (null == (__t = company.basic.users_count) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n\n</div>\n';
return __p;
});