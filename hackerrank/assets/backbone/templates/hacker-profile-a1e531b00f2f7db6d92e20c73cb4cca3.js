HR.appController.addTemplate("backbone/templates/hacker-profile", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += '<section class="container profile">\n    <div class="container--inner">\n        <header class="profile_header">\n            <div class="row">\n                <div class="span12">\n                    <img src="' + (null == (__t = model.avatar) ? "" :__t) + '" height="100" width="100" class="block-center avatar mjR pull-left" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n                    <div>\n                        <p class="profile_hackerhandle"><strong>' + (null == (__t = model.username) ? "" :_.escape(__t)) + '</strong></p>\n                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n                        <span class="bold meta">\n                        ', 
model.country && (__p += '\n                            <p class="profile_location"><i class="icon-location"></i> ' + (null == (__t = model.country) ? "" :_.escape(__t)) + "</p>\n                        "), 
__p += '\n                        <p class="profile_languages mlB">\n                            ', 
"" == model.languages) __p += "\n                            "; else {
__p += "\n                                ";
var languages = model.languages;
_.isArray(languages) || (languages = languages.split(",")), __p += "\n                                <strong>\n                                ", 
__p += model.id === HR.profile().get("id") ? "\n                                    <span>You code in</span>\n                                " :"\n                                    <span>" + (null == (__t = model.username) ? "" :_.escape(__t)) + " codes in</span>\n                                ", 
__p += "\n                                </strong> " + (null == (__t = _.map(languages, function(lang) {
return lang_display_mapping[lang];
}).join(", ")) ? "" :__t) + "\n                            ";
}
__p += '\n                        </p>\n                        </span>\n                    </div>\n                </div>\n                <div class="span4 profile_header_actions">\n                    <a class="btn btn-primary profile_add mlB"><i class="icon-plus">Add to Network</a>\n                    <a class="btn btn-text">Currently Online</a>\n                    <a class="btn btn-line"><i class="icon-chat">Send Message</a>\n                    <a class="btn btn-line"><i class="icon-download">Download Resume</a>\n                </div>\n            </div>\n        </header>\n    </div>\n</div>\n';
}
return __p;
});