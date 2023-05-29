HR.appController.addTemplate("backbone/templates/administration/company-edit-hackerboard-submissions", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "<br>\n", _.each(_collection, function(model) {
__p += "\n    ";
var submission = _.first(_.filter(model.submissions, function(submission) {
return 2 == submission.status;
}));
if (__p += "\n    ", submission) {
if (__p += '\n        <p style="font-size: 20px;"><strong>' + (null == (__t = model.challenge.name) ? "" :__t) + '</strong></p>\n        <div class="row">\n          ', 
1 == submission.kind) {
__p += '\n            <div class="span4 pull-left">\n              ';
var score = model.challenge.score * submission.score;
__p += "\n              ";
var _score = 0;
if (_score = score % 1 == 0 ? score :score.toFixed(2), __p += "\n              <strong>Score: " + (null == (__t = _score) ? "" :__t) + "/" + (null == (__t = model.challenge.score) ? "" :__t) + "</strong>\n            </div>\n            ", 
submission.testcase_status) {
__p += '\n            <div class="span5 pull-right right">\n              ';
var passed = _.filter(submission.testcase_status, function(status) {
return 1 == status;
}).length;
__p += "\n              <strong>" + (null == (__t = passed) ? "" :__t) + "/" + (null == (__t = submission.testcase_status.length) ? "" :__t) + " Testcases Passed</strong>\n            </div>\n            ";
}
__p += "\n          ";
} else 2 == submission.kind && (__p += "\n            <p><strong>Games: " + (null == (__t = submission.game_total) ? "" :__t) + "(Total) " + (null == (__t = submission.game_won) ? "" :__t) + "(Won) " + (null == (__t = submission.game_lost) ? "" :__t) + "(Lost) " + (null == (__t = submission.game_tied) ? "" :__t) + "(Tied)</strong></p>\n          ");
__p += '\n          <div class="clearfix"></div>\n        </div>\n        <p style="border: 1px solid #c2c7d0;border-bottom: 0px;padding: 0px 7px;text-align: right;background: #eee;font-weight: bold;"\n            >' + (null == (__t = lang_display_mapping[submission.language]) ? "" :__t) + '</p>\n        <textarea data-language="' + (null == (__t = submission.language) ? "" :__t) + '">' + (null == (__t = submission.code) ? "" :__t) + "</textarea>\n        <hr>\n    ";
}
__p += "\n";
}), __p += "\n";
return __p;
});