HR.appController.addTemplate("backbone/templates/onboarding-track-selection", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container--static">\n    <header class="onboarding_header text-center">\n        <h1 class="mlB">Hi Elou, welcome to HackerRank</h1>\n        <p>Let\'s quickly walk through an easy challenge so we can introduce you to the interface.</p>\n        <p>First, pick your favorite domain (you can always change this later).</p>\n    </header>\n    <ul class="onboarding_domains">\n        <li class="onboarding_domain ', 
"ai" == activeTrack && (__p += "is-selected"), __p += '" data-slug="ai">\n            <h5 class="domain_title">' + (null == (__t = HR.PREFETCH_DATA.tracks.ai.name) ? "" :__t) + "</h5>\n            <p>" + (null == (__t = HR.PREFETCH_DATA.tracks.ai.descriptions) ? "" :__t) + '</p>\n        </li>\n        <li class="onboarding_domain ', 
"fp" == activeTrack && (__p += "is-selected"), __p += '" data-slug="fp">\n            <h5 class="domain_title">' + (null == (__t = HR.PREFETCH_DATA.tracks.fp.name) ? "" :__t) + "</h5>\n            <p>" + (null == (__t = HR.PREFETCH_DATA.tracks.fp.descriptions) ? "" :__t) + '</p>\n        </li>\n        <li class="onboarding_domain ', 
"algorithms" == activeTrack && (__p += "is-selected"), __p += '" data-slug="algorithms">\n            <h5 class="domain_title">' + (null == (__t = HR.PREFETCH_DATA.tracks.algorithms.name) ? "" :__t) + "</h5>\n            <p>" + (null == (__t = HR.PREFETCH_DATA.tracks.algorithms.descriptions) ? "" :__t) + '</p>\n        </li>\n        <li class="onboarding_domain ', 
"shell" == activeTrack && (__p += "is-selected"), __p += '" data-slug="shell">\n            <h5 class="domain_title">' + (null == (__t = HR.PREFETCH_DATA.tracks.shell.name) ? "" :__t) + "</h5>\n            <p>" + (null == (__t = HR.PREFETCH_DATA.tracks.shell.descriptions) ? "" :__t) + '</p>\n        </li>\n        <li class="onboarding_nextPrompt text-center">\n            <a href="/onboarding/2" class="btn btn-primary btn-large backbone">Try a Challenge<i class="icon-right-open icon--right"></i></a>\n        </li>\n    </ul>\n</div>\n';
return __p;
});