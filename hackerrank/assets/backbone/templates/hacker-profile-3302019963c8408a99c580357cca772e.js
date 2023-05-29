HR.appController.addTemplate("backbone/templates/hacker-profile", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += "";
var submission_max = 1;
for (submission in model.submission_history) submission_max < model.submission_history[submission] && (submission_max = model.submission_history[submission]);
var Months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], this_month = new Date();
if (__p += '\n<section class="container profile">\n    <div class="container--inner">\n        <header class="profile_header boundB plB">\n            <div class="row">\n                <div class="span12">\n                    <img src="' + (null == (__t = model.avatar) ? "" :__t) + '" height="150" width="150" class="avatar mjR pull-left" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n                    <div>\n                        <p class="profile_hackerhandle"><strong>' + (null == (__t = model.username) ? "" :_.escape(__t)) + "</strong></p>\n                        <p>" + (null == (__t = model.short_bio) ? "" :__t) + '</p>\n                        <div class="meta msT">\n                            ', 
model.country && (__p += '\n                                <span class=" profile_location"><i class="icon-location bold"></i> ' + (null == (__t = model.country) ? "" :_.escape(__t)) + "</span>\n                            "), 
__p += '\n                            <span class="profile_languages">\n                                ', 
"" == model.languages) __p += "\n                                "; else {
__p += "\n                                    ";
var languages = model.languages;
_.isArray(languages) || (languages = languages.split(",")), __p += "\n                                    <strong>\n                                    ", 
__p += model.id === HR.profile().get("id") ? '\n                                        <i class="icon-code mlL bold"></i>\n                                    ' :'\n                                        <i class="icon-code mlL bold"></i>\n                                    ', 
__p += "\n                                    </strong> " + (null == (__t = _.map(languages, function(lang) {
return lang_display_mapping[lang];
}).join(", ")) ? "" :__t) + "\n                                ";
}
__p += '\n                            </span>\n                        </div>\n                    </div>\n                </div>\n                <div class="span3 pull-right profile_header_actions">\n                    ', 
model.id != HR.profile().get("id") && (__p += '\n                        <!-- <a class="btn btn-primary profile_add mlB"><i class="icon-plus"></i>Add to Network</a> -->\n                        ', 
__p += 1 == model.online ? '\n                            <p class="mmB small"><i class="status-indicator active msR"></i>Currently Online</p>\n                        ' :'\n                            <p class="mmB small"><i class="status-indicator msR"></i>Currently Offline</p>\n                        ', 
__p += '\n                        <a class="btn btn-text small send-message"><i class="icon-chat"></i>Send Message</a>\n                        <!-- <a class="btn btn-text small"><i class="icon-download"></i>Download Resume</a> -->\n                    '), 
__p += '\n                </div>\n            </div>\n        </header>\n        <div class="profile_content mlT row">\n            <div class="profile_contentSubmit span3">\n                <ul class="profile_submitHistory profile-aside profile-histogram">\n                    <h4 class="strong mlB msT">Submissions</h4>\n                    ';
for (submission in model.submission_history) __p += '\n                        <li data-success="' + (null == (__t = model.submission_history[submission]) ? "" :__t) + '" data-attempts="' + (null == (__t = model.submission_history[submission]) ? "" :__t) + '" rel="tooltip"\n                        title="Attempts: ' + (null == (__t = model.submission_history[submission]) ? "" :__t) + ' <br/>"\n                        class="histogram-month" data-month="' + (null == (__t = Months[this_month.getMonth()].slice(0, 3)) ? "" :__t) + '">\n                        <span class="success" style="width: ' + (null == (__t = model.submission_history[submission] / submission_max * 80) ? "" :__t) + '%;"></span>\n                    </li>\n                    ', 
this_month.setMonth(this_month.getMonth() - 1), __p += "\n                    ";
__p += '\n\n                </ul>\n            </div>\n            <div class="profile_contentGraph pjL span13">\n                <div class="profile_graph">\n                    <div id="profile-graph-view" class="margin-small top">\n                        ', 
_.isNumber(model.rank) ? __p += "\n                            " + (null == (__t = HR.appController.viewLoader(64)) ? "" :__t) + "\n                        " :(__p += "\n                            ", 
__p += model.id === HR.profile().get("id") ? '\n                                <p class="mlT mlB text-center aside">Solve your first challenge to see your progress graph.</p>\n                                <p class="text-center"><a href="/categories" class="btn span3 block-center backbone">View Challenges</a></p>\n                            ' :'\n                                <p class="block-margin text-center">' + (null == (__t = model.username) ? "" :_.escape(__t)) + " has not solved any challenges yet.</p>\n                            ", 
__p += "\n                        "), __p += "\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n";
}
return __p;
});