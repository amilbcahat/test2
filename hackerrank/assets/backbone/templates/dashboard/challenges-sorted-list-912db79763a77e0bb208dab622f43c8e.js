HR.appController.addTemplate("backbone/templates/dashboard/challenges-sorted-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="contest-challenges-problem" class="challengeslist_challenge challenge-sorted-list-item clearfix">\n    <div class="row padding-large left right challengeslist_challenge-body', 
null != contest && "master" != contest.slug && (__p += " full-width"), __p += '">\n        <div class="span5">\n            <h2 class="small challengeslist_challenge-title"><a href="' + (null == (__t = baseURL) ? "" :__t) + '">' + (null == (__t = model.name) ? "" :_.escape(__t)) + '</a></h2>\n        </div>\n        <div class="span3 challengeslist_challenge-date">\n            <span>', 
__p += model.created_at ? " " + (null == (__t = $.format.date(model.created_at, "MMM d, yyyy")) ? "" :__t) + " " :" - ", 
__p += '</span>\n        </div>\n        <div class="span3 pull-right">\n            ', 
model.can_be_viewed && (__p += '\n                <a href="' + (null == (__t = baseURL) ? "" :__t) + '" data-slug="' + (null == (__t = model.slug) ? "" :__t) + '"\n                   class="btn ' + (null == (__t = model.attempted ? "btn btn-inverse btn-inverse--alt" :"btn btn-inverse") ? "" :__t) + ' backbone start pull-right challengelist_button"\n                   data-analytics="' + (null == (__t = model.attempted ? "TryAgain" :"SolveChallenge") ? "" :__t) + '">\n                    ' + (null == (__t = model.attempted ? "Try Again" :"Solve Challenge") ? "" :__t) + "\n                </a>\n            "), 
__p += "\n        </div>\n    </div>\n</div>\n";
return __p;
});