HR.appController.addTemplate("backbone/templates/challenge-content", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "\n", model.has_ended && (__p += " <strong> Submissions will no longer be placed on the leaderboard. You may still attempt this problem for practice. </strong>"), 
__p += "\n", model.has_started || (__p += " <strong> Hi Admin, this challenge is not yet open to the public. </strong>"), 
__p += "\n", model.has_started && !model.has_ended && "weekly" == contest.kind && (__p += " <strong> Your submission will run against only preliminary test cases. Full test cases will run at the end of the contest.</strong> "), 
__p += '\n<div class="view_body fill-light">\n<div class="row">\n  <div class=\'pull-left span11 hr_tour-problem-statement\'>\n      ', 
model.available_translations.length > 0 && (__p += "\n        Change language :\n            <select class='translations'>\n              ", 
_.each(model.available_translations, function(translation) {
__p += '\n              <option value="' + (null == (__t = translation.language) ? "" :__t) + '" > ' + (null == (__t = translation.language) ? "" :__t) + " </option>\n              ";
}), __p += '\n              <option value="English" > English </option>\n            </select>\n      '), 
__p += "\n  <div class='psT hide mlL' id=\"preference-msg\" > <a class='language-preference' href='#'>Click here</a> if you would like to make this change permanent.</div>\n</div>\n    <div class=\"span11 hr_tour-problem-statement\">\n        <div class=\"content-text challenge-text\">\n            " + (null == (__t = model.preferred_challenge_body_html || model.body_html) ? "" :__t) + '\n        </div>\n        <footer><a href="#" class="js-suggest-edits btn btn-line fade in challenge_suggestion-toggle fullscreen-hide">Suggest Edits</a></footer>\n    </div>\n    <aside class="span4 pull-right fullscreen-hide challenge-sidebar">\n        <div class="challenge-sidebar-container">\n    </aside>\n</div>\n<div class="challenge_suggestion fullscreen-hide">\n    <div class=\'formgroup clearfix m\'>\n        <div class=\'alert error hide\'></div>\n    </div>\n    <form id="suggestion-form" class="hide challenge_suggestion-form fullscreen-hide">\n        <p class="challenge_suggestion-header">Thanks for helping us refine this problem statement. Please address your suggestions below. </p>\n        <textarea id=\'suggestion\' rows=\'10\' class=\'challenge_suggestion-input\'></textarea>\n        <div class=\'challenge_suggestion-buttons access-buttons clearfix\'>\n            <div class="pull-right">\n                <button class="btn btn-green js-suggestion-save pull-right" data-analytics="Submit Suggestion">Submit Suggestion</button>\n                <button class="btn btn-alert js-suggestion-cancel pull-right" data-analytics="Cancel Suggestion">Cancel</button>\n            </div>\n        </div>\n    </form>\n</div>\n<br>\n</div>\n';
return __p;
});