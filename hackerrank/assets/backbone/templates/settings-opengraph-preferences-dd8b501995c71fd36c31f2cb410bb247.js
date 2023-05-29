HR.appController.addTemplate("backbone/templates/settings-opengraph-preferences", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="padded settings_content-pane">\n  <div class="settings_content-group">\n    <h3>Opengraph Subscriptions</h3>\n    <p class="aside mlB msT">HackerRank will post about following activity:</p>\n    <div class="clearfix">\n      <div class="formgroup horizontal checkbox hr_checkbox psB">\n        <div class="opengraph-option">\n          <input id="asked_question" class="js-switch" name="asked_question" type="checkbox" ', 
1 == model.asked_question && (__p += " checked "), __p += '/>\n        </div>\n        <span class="pref-label">Activity About Asking a Question</span>\n      </div>\n      <div class="formgroup horizontal checkbox hr_checkbox psB">\n        <div class="opengraph-option">\n          <input id="answerd_question" class="js-switch" name="answerd_question" type="checkbox" ', 
1 == model.answerd_question && (__p += " checked "), __p += '/>\n        </div>\n        <span class="pref-label">Activity about Answering a Question</span>\n      </div>\n      <div class="formgroup horizontal checkbox hr_checkbox psB">\n        <div class="opengraph-option">\n          <input id="solved_challenge" class="js-switch" name="solved_challenge" type="checkbox" ', 
1 == model.solved_challenge && (__p += " checked "), __p += '/>\n        </div>\n        <span class="pref-label">Activity About Solving a Challenges</span>\n      </div>\n    </div>\n  </div>\n</div>\n';
return __p;
});