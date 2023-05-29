HR.appController.addTemplate("backbone/templates/submission-stats", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
if (__p += "<!-- I have commented out the status updates. What should happen is, show QUEUED if queued, then show progress bar, and only then show submitted on...games played...etc, which is currently shown\n     If it is not a game, just show the p class stats with the 'submitted on' date -->\n", 
win_percentage = Math.round(model.game_won / model.game_played * 1e3) / 10, isNaN(win_percentage) && (win_percentage = 0), 
"game" == model.kind) __p += '\n<div class="row">\n    <h5 class="stats span10">Submitted <a title="">' + (null == (__t = moment(1e3 * model.created_at_epoch).fromNow()) ? "" :__t) + "</a>\n        ", 
model.startLock && !singlePlayer && (__p += '\n            &bull; <strong class="submission-stat game-played">' + (null == (__t = model.game_played) ? "" :__t) + '</strong> games played &bull; <strong class="submission-stat">' + (null == (__t = model.score) ? "" :__t) + " points scored</strong>\n        "), 
__p += '\n    </h5>\n\n    <div class="pull-right">\n    ', model.startLock ? __p += '\n        <div class="select-wrap large pull-right">\n            <input type="hidden" value="" id="submissions-filter"/>\n        </div>\n    ' :(__p += "\n        ", 
__p += 0 == model.percent ? '\n            <p class="margin-small top">Queued</p>\n        ' :100 == model.percent ? '\n            <p class="margin-small top">Processed</p>\n        ' :'\n            <div class="progress-bar clearfix">\n                <div class="gutter">\n                    <div class="progress-bar-status" style="width: ' + (null == (__t = model.percent) ? "" :__t) + '%;">&nbsp;</div>\n                </div>\n                <p class="play-count">' + (null == (__t = model.game_played) ? "" :__t) + "/" + (null == (__t = model.game_total) ? "" :__t) + " games played</p>\n            </div>\n        ", 
__p += "\n    "), __p += "\n    </div>\n</div>\n"; else {
if (__p += '\n<div class="clearfix">\n    <p class="span9 ">Submitted ' + (null == (__t = moment(1e3 * model.created_at_epoch).fromNow()) ? "" :__t) + "\n        ", 
"Queued" !== model.status_code && "Processing" !== model.status && (__p += "\n            ", 
"text" != model.language && (__p += " &bull; <strong>Score:</strong> " + (null == (__t = model.score) ? "" :__t)), 
__p += "\n        "), __p += "\n    </p>\n    ", __p += model.status.startsWith("Accepted") ? '\n        <p class="status pull-right success">\n    ' :'\n        <p class="status pull-right error">\n    ', 
__p += "\n    <strong>Status:</strong> " + (null == (__t = model.status) ? "" :__t) + "</p>\n\n</div>\n    ", 
"Queued" != model.status) {
if (__p += '\n        <div class="light-wrap margin-large top">\n            ', 
"text" != model.language && !_.isEmpty(model.testcase_message)) {
__p += '\n            <div class=" submission_testcases-results testcases-results">\n                ';
for (var i = 0; i < model.testcase_message.length; i += 1) __p += '\n                    <p>\n                        <span class="testcase-num"># ' + (null == (__t = i) ? "" :__t) + "</span>\n                            ", 
__p += 1 == model.testcase_status[i] ? '\n                                <i class="icon-ok success"></i>' :'<i class="icon-cancel-large error"></i>\n                            ', 
__p += "\n\n                             ", model.custom_challenge_config && model.custom_challenge_config.show_test_weight && model.custom_challenge_config.show_test_score ? __p += "\n                                [" + (null == (__t = (model.custom_scores[i] * model.test_weights[i]).round(2)) ? "" :__t) + "/" + (null == (__t = model.test_weights[i].round(2)) ? "" :__t) + " pts]\n                            " :model.custom_challenge_config && model.custom_challenge_config.show_test_score && (__p += "\n                                [" + (null == (__t = model.custom_scores[i].round(2)) ? "" :__t) + " pts]\n                            "), 
__p += "\n\n                            " + (null == (__t = Math.round(100 * parseFloat(model.codechecker_time[i])) / 100) ? "" :__t) + "s : " + (null == (__t = model.testcase_message[i]) ? "" :__t) + "\n\n                            ", 
1 == model.downloadable_test_cases && (__p += '\n                                <small>\n                                    <a href="#" class="js-download-test-case small" testcase-num="' + (null == (__t = i) ? "" :__t) + '" data-analytics="TestCase Purchase" rel="tooltip" title="Download testcase #' + (null == (__t = i) ? "" :__t) + '">\n                                        <i class="icon-download" style="color: rgb(98, 107, 127);" testcase-num="' + (null == (__t = i) ? "" :__t) + '"></i>\n                                    </a>\n                                </small>\n                            '), 
__p += "\n                    </p>\n                ";
__p += "\n            </div>\n            ";
}
__p += "\n            ", 255 == model.compile_status && (__p += '\n            <p class=""><strong>Compilation Message:</strong> <xmp>' + (null == (__t = model.compile_message) ? "" :__t) + "</xmp></p>\n            "), 
__p += "\n        </div>\n    ";
}
__p += "\n";
}
__p += "\n";
}
return __p;
});