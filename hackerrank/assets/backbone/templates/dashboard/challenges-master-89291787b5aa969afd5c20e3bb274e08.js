HR.appController.addTemplate("backbone/templates/dashboard/challenges-master", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row">\n    <!-- Challenges -->\n    <div class="span10 track_contentList pjR">\n        <div class="challenges-list"></div>\n        <div class="challengeslist_pagination-wrapper pagination-wrapper"></div>\n    </div>\n    <!-- This is the categories -->\n    <div class="span6">\n        ', 
_.each(categories.models, function(track) {
track.get("slug") == current_track && (__p += '\n                <ul class="unstyled lg-block" id="challengeAccordion">\n                    ', 
_.each(track.children().models, function(chapter) {
__p += '\n                    <li class="lg-block_head chapter-item ' + (null == (__t = current_chapter == chapter.get("slug") ? "current" :"") ? "" :__t) + '" data-chapter="' + (null == (__t = chapter.get("slug")) ? "" :__t) + '">\n                        <a class="backbone" href="/categories/' + (null == (__t = track.get("slug")) ? "" :__t) + "/" + (null == (__t = chapter.get("slug")) ? "" :__t) + '">\n                            ' + (null == (__t = chapter.get("name")) ? "" :_.escape(__t)) + "\n                        </a>\n                    </li>\n                    ";
}), __p += "\n                </ul>\n        ");
}), __p += "\n    </div>\n</div>\n\n<!-- This is for onboarding, please do not remove it -->\n", 
HR.tour_going && (__p += "\n    <ol class='tourbus-legs' id='onboarding-tour'>\n        <li data-el='#ob-contests-link' data-orientation='right' data-arrow='15px' data-width='400px' data-highlight='true'>\n            <p class=\"small\">New challenges are introduced through <strong>weekly and daily contests</strong>. Check the \"Contests\" page for a list of upcoming and active contests, or signup for email alert through your settings.</p>\n            <p class=\"psT\"><a class=\"pull-right tourbus-next btn btn-primary\" href='javascript:void(0);'>Next: Try a challenge</a></p>\n        </li>\n        <li data-el='#ob-challenge' data-orientation='left' data-arrow='15px' data-width='400px' data-highlight='true'>\n            <p class=\"small\">Challenges in each track are listed in increasing levels of difficulty. Let's select the easiest one in this track so we can guide you through the submission process.</p>\n            <p class=\"psT\"><a class=\"pull-right btn btn-primary tourbus-stop\" href='javascript:void(0);'>Select this challenge</a></p>\n        </li>\n    </ol>\n    <div class='ob-overlay' style='position: fixed; top: 0; right: 0; left: 0; bottom: 0; width: 100%; height: 100%; min-height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 9999; display: none;'>\n    </div>\n"), 
__p += "\n";
return __p;
});