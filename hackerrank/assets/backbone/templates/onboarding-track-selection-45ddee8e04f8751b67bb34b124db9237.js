HR.appController.addTemplate("backbone/templates/onboarding-track-selection", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container--static">\n    <header class="onboarding_header text-center">\n        <h1 class="mlB">Hi Elou, welcome to HackerRank</h1>\n        <p>Let\'s quickly walk through an easy challenge so we can introduce you to the interface.</p>\n        <p>First, pick your favorite domain (you can always change this later).</p>\n    </header>\n    <ul class="onboarding_domains">\n        ', 
_.each($.map(HR.PREFETCH_DATA.tracks, function(val) {
return val;
}), function(track) {
__p += '\n            <li class="onboarding_domain ', activeTrack == track.slug && (__p += "is-selected"), 
__p += '" data-slug="' + (null == (__t = track.slug) ? "" :__t) + '">\n                <h5 class="domain_title">' + (null == (__t = track.name) ? "" :__t) + "</h5>\n                <p>" + (null == (__t = track.descriptions) ? "" :__t) + "</p>\n            </li>\n        ";
}), __p += '\n        <li class="onboarding_nextPrompt text-center">\n            <a href="/onboarding/2" class="btn btn-primary btn-large backbone">Try a Challenge<i class="icon-right-open icon--right"></i></a>\n        </li>\n    </ul>\n</div>\n';
return __p;
});