HR.appController.addTemplate("backbone/templates/onboarding-tutorial", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="onboarding pjB">\n    <div class="container--static">\n        <header class="onboarding_header plB">\n            <h2 class="text-center mlB">Solve your first challenge</h2>\n            <p class="onboarding_subheader">\n                Every domain has tutorial-level challenges to help introduce you to the larger concepts. Take a stab at the one for ' + (null == (__t = HR.PREFETCH_DATA.tracks[HR.SELECTED_TRACK].name) ? "" :__t) + '. Don\u2019t be intimidated, you can always find help in the forums or through the official editorial.\n            </p>\n        </header>\n\n        <div class="onboarding_challenge clearfix">\n            <div class="onboarding_challengeSide">\n                <header>\n                    <strong>' + (null == (__t = model.get("name")) ? "" :__t) + '</strong>\n                </header>\n                <div class="onboarding_challengeBody">\n                    <p>\n                        ' + (null == (__t = model.get("_data").onboarding.statement) ? "" :__t) + '\n                    </p>\n                    <p class="reveal-wrap text-center"><a href="javascript:void(0)" class="btn btn-reveal">Reveal Answer</a></p>\n                </div>\n            </div>\n            <div class="onboarding_challengeCode codeeditor-container">\n                <div id="codeshell-wrapper">\n                </div>\n            </div>\n        </div>\n        <div class="clearfix response-view onboarding_response mjB" style="width: 820px; margin: 0 auto;">\n        </div>\n        <div class="onboarding_response js-help hide" style="width: 820px; margin: 0 auto">\n            You can always get a <a href="javascript:void(0)" class="btn-reveal">help</a> on the challenge.\n        </div>\n    </div>\n</div>\n';
return __p;
});