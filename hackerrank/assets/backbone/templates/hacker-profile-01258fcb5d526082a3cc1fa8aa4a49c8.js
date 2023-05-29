HR.appController.addTemplate("backbone/templates/hacker-profile", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += '<section class="container profile">\n    <div class="container--inner">\n        <div class="plA text-center layout_sidebar">\n            <header class="profile_sidebar-header mlB">\n                <p class="profile_hackerhandle"><strong>' + (null == (__t = model.username) ? "" :_.escape(__t)) + '</strong></p>\n                <p class="profile_hackername">', 
__p += model.id === HR.profile().get("id") ? "This is you" :"" + (null == (__t = model.name) ? "" :_.escape(__t)), 
__p += "</p>\n                ", model.title ? __p += '\n                <p class="profile_rating">' + (null == (__t = model.title) ? "" :__t) + "</p>\n                " :(__p += '\n                <p>\n                    <span class="gray">Not rated</span>\n                    <span class="help-prompt"><i class="icon-help-circled icon--single"></i>\n                        <span class="help-text">', 
__p += model.id === HR.profile().get("id") ? "Participate in a contest to become rated." :"The user has not participated in any contest yet.", 
__p += "</span>\n                    </span>\n                </p>\n                "), 
__p += '\n                <img src="' + (null == (__t = model.avatar) ? "" :__t) + '" height="100" width="100" class="block-center avatar mlT mlB" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n            </header>\n            <div class="profile_sidebar-body">\n                ', 
model.country && (__p += '\n                <p class="profile_location"><i class="icon-location"></i> ' + (null == (__t = model.country) ? "" :_.escape(__t)) + "</p>\n                "), 
__p += "\n                <!--", "" == model.hack ? (__p += "\n\n                ", 
__p += model.id === HR.profile().get("id") ? '<p class="profile_biggesthack"><strong>Biggest Hack</strong><a href="/settings/profile" class="btn btn-small pull-right">Complete your Profile</a></p>' :"", 
__p += "\n\n                ") :__p += '\n                <p class="profile_biggesthack"><strong>Biggest Hack</strong><br>' + (null == (__t = _.escape(model.hack || "")) ? "" :__t) + "</p>\n                ", 
__p += '-->\n                <p class="profile_languages mlB">\n                    ', 
"" == model.languages) __p += "\n                    "; else {
__p += "\n                        ";
var languages = model.languages;
_.isArray(languages) || (languages = languages.split(",")), __p += "\n                        <strong>\n                        ", 
__p += model.id === HR.profile().get("id") ? "\n                            <span>You code in</span>\n                        " :"\n                            <span>" + (null == (__t = model.username) ? "" :_.escape(__t)) + " codes in</span>\n                        ", 
__p += "\n                        </strong> " + (null == (__t = _.map(languages, function(lang) {
return lang_display_mapping[lang];
}).join(", ")) ? "" :__t) + "\n                    ";
}
__p += '\n                </p>\n				<ul class="unstyled inline">\n                    ', 
model.website && (__p += '\n				        <li><a class="btn btn-text" href="', 0 != model.website.indexOf("http") && (__p += "http://"), 
__p += "" + (null == (__t = _.escape(model.website || "")) ? "" :__t) + '"><i class="icon-globe"></i>\n                        ', 
0 != model.website.indexOf("http") && (__p += "http://"), __p += "" + (null == (__t = _.escape(model.website || "")) ? "" :__t) + "</a></li>\n                    "), 
__p += '\n<!-- 					<li class="profile_social-link"><a href="http://www.elouwebdesign.com"><i class="icon-facebook"></i></a></li>\n					<li class="profile_social-link"><a href="http://www.elouwebdesign.com"><i class="icon-github"></i></a></li>\n					<li class="profile_social-link"><a href="http://www.elouwebdesign.com"><i class="icon-twitter"></i></a></li> -->\n				</ul>\n			</div>\n			<!--<div class="profile_sidebar-teams">\n			    <h4>Teams</h4>\n			    <p><strong>School:</strong> ' + (null == (__t = model.school) ? "" :__t) + "</p>\n			    <p><strong>Company:</strong> " + (null == (__t = model.company) ? "" :__t) + '</p>\n			</div>-->\n			<footer class="profile_sidebar-footer">\n			    <p class="btn-wrap text-center">\n			    ', 
__p += model.id === HR.profile().get("id") ? '\n			        <p class="btn-wrap text-center margin-large top"><a class="btn btn-green backbone" href="/settings/profile">Edit Profile</a></p>\n			    ' :'\n			        <p class="btn-wrap text-center margin-large top"><a class="btn btn-green send-message">Message ' + (null == (__t = model.username) ? "" :_.escape(__t)) + "</a></p>\n			    ", 
__p += '\n			    </p>\n			</footer>\n        </div>\n        <div class="layout_content">\n            <div class="profile_graph">\n                <p class="clearfix">\n                    <span class="pull-left"><strong>Track progress</strong></span>\n                    <span class="pull-right align-right alpha beta">\n                        <strong class="hr_profile_rank">Rank: N/A</strong>\n                        <strong class="hr_profile_score padding-large left">Score: 0</strong>\n                    </span>\n                </p>\n                <div id="profile-graph-view" class="margin-small top">\n                ', 
_.isNumber(model.rank) ? __p += "\n                    " + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n                " :(__p += "\n                    ", 
__p += model.id === HR.profile().get("id") ? '\n                        <p class="mlT mlB text-center aside">Solve your first challenge to see your progress graph.</p>\n                        <p class="text-center"><a href="/categories" class="btn span3 block-center backbone">View Challenges</a></p>\n                    ' :'\n                        <p class="block-margin text-center">' + (null == (__t = model.username) ? "" :_.escape(__t)) + " has not solved any challenges yet.</p>\n                    ", 
__p += "\n                "), __p += '\n\n                </p>\n			</div>\n        </div>\n\n        <div class="clearfix profile_feed">\n            <div class="span-flex-8 plA">\n                <p class="profile_group-title">Event History<a id="event" class="view-more hide" href="#">View More</a></p>\n                <div class="profile-event-view psT">\n                    ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + '\n                </div>\n            </div>\n            <div class="span-flex-8 plA">\n                <p class="profile_group-title">Forum Activity<a id="post" class="view-more hide" href="#">View More</a></p>\n                <div class="profile-post-view">\n                    ' + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n";
}
return __p;
});