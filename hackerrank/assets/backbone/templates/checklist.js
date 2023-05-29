HR.appController.addTemplate("backbone/templates/checklist", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container">\n    <h2>' + (null == (__t = _model.name) ? "" :_.escape(__t)) + " Submissions</h2>\n    ", 
collection.sync_status ? (__p += "\n        ", _.size(_collection) > 0 ? (__p += '\n            <ul class="alpha unstyled challenge-scoring accordion">\n                ', 
_.each(_collection, function(submission) {
__p += '\n                    <li class="accordion-group">\n                        <h4 class="accordion-heading">\n                            <b>\n                                <a class="accordion-toggle" style="cursor: pointer" data-parent="#' + (null == (__t = submission.hacker_username) ? "" :__t) + '" data-name="' + (null == (__t = submission.hacker_username) ? "" :__t) + '">\n                                    ' + (null == (__t = submission.hacker_username) ? "" :__t) + '\n                                </a>\n                            </b>\n                        </h4>\n                        <div id="' + (null == (__t = submission.hacker_username) ? "" :__t) + '" class="accordion-body hide">\n                            <p><b>Your Output</b></p>\n                            <pre>' + (null == (__t = submission.stdout || "N/A") ? "" :__t) + "</pre>\n                            <br>\n                            <p><b>Score</b></p>\n                            <pre>" + (null == (__t = submission.score || "N/A") ? "" :__t) + "</pre>\n                            <br>\n                            <p><b>Expected Output</b></p>\n                            <pre>" + (null == (__t = submission.expected_output || "N/A") ? "" :__t) + "</pre>\n                            <br>\n                        </div>\n                    </li>\n                ";
}), __p += "\n            </ul>\n        ") :__p += '\n            <div class="m gray">Empty</div>\n        ', 
__p += "\n    ") :__p += '\n        <div class="m gray">Loading...</div>\n    ', 
__p += "\n    <script>\n    </script>\n</div>\n";
return __p;
});