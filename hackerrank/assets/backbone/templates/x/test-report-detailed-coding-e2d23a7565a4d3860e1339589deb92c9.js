HR.appController.addTemplate("backbone/templates/x/test-report-detailed-coding", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mdT mdR">\n  ', question.answered !== !1 || anysubmissions ? (__p += "\n    ", 
question.answered === !1 && (__p += '\n    <div class="common_margin alert alert-block alert-info">\n      <center>No answer was submitted for this question. Showing compiled/saved versions.</center>\n    '), 
__p += "\n    </div>\n    <!-- Plagiarism -->\n", plagiarism && _.keys(plagiarism).length > 0 && (__p += '\n    <div class="alert">\n        <p>PLAGARISM SUSPECTS:</p>\n        <table>\n\n        ', 
_.each(plagiarism, function(pl, key) {
var className;
className = pl.probability > 90 ? "fnt-sz-big" :pl.probability > 80 ? "" :"fnt-sz-mid", 
__p += '\n            <tr class="' + (null == (__t = className) ? "" :__t) + '">\n                <td><strong>' + (null == (__t = pl.email) ? "" :__t) + '</strong> </td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td><a href="javascript:void(0)" class="js-review" data-review=\'' + (null == (__t = key) ? "" :__t) + "' data-current='" + (null == (__t = sid) ? "" :__t) + "' data-similarity='" + (null == (__t = pl.probability) ? "" :__t) + "' data-email='" + (null == (__t = pl.email) ? "" :__t) + "'>view diff</a> </td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td> <a href=\"tests/" + (null == (__t = test.id) ? "" :__t) + "/candidates/" + (null == (__t = pl.aid) ? "" :__t) + "/report/detailed/" + (null == (__t = question.id) ? "" :__t) + '" class="view-submission-btn" target="_blank">view submission</a></td>\n            </tr>\n        ';
}), __p += '\n        </table>\n    </div>\n    <br/>\n</div> <!-- end mda -->\n\n    <div class="modal js-plagiarism-modal modal-huge" style="max-height: 75%">\n    <div class="modal-header" style="height: 13px;">\n        <div class="underline_title set_title pull-left">Matching response</div>\n        <button type="button" class="close js-plagclose pull-right" data-dismiss="modal" aria-hidden="true"><small>Close</small> &times;</button>\n    </div>\n    <div >\n    <div class="mdA">\n        Plagiarism possibility: <strong class="js-possibility"></strong>\n        <span class="pull-right">Text similarity : <strong class="js-similarity"></strong>%</span>\n    </div>\n    <div class=\'js-code-diff\'>\n    </div>\n    </div>\n    </div>\n\n\n'), 
__p += ' <!-- end plagiarism -->\n<div class="fs-toggle">\n\n    <div class="position-relative">\n        <div class="mdA">\n            Language used: <strong class="langused"></strong>\n        </div>\n        ', 
question.submissions.length > 1 && (__p += '\n            <div class="code-player" id="code-player">\n                <div class="pull-left">\n                    <span class="txt-alt-grey fnt-wt-600">\n                        <i class="icon-menu-large"></i>&nbsp;PLAY CODE\n                    </span>\n                    <div class="code_play_slide_wrap" style="display: none">\n                        <div class="timeline-slider-wrapper msT">\n                            <div class="slider" style="width:220px;"></div>\n                        </div>\n                    </div>\n                </div>\n                <div class="code_play_slide_wrap pull-right pdT pmR" style="display: none">\n                    <a class="js-fs-open" title="Switch to fullscreen" href="#"><i class="icon icon-resize-full-alt"></i></a>\n                    <a class="js-fs-close hide" href="#"><i class="icon icon-resize-small-alt"></i></a>\n                </div>\n            </div>\n        '), 
__p += '\n    </div>\n    <pre class="outbox cm-s-default no-padding" style="border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;">\n        Fetching Code...\n    </pre>\n    <pre class="outbox-temp" style="display:none;">\n        Fetching Code...\n    </pre>\n    ', 
void 0 != test.hide_compile_test && "True" == test.hide_compile_test || void 0 != question.hide_compile_test && "True" == question.hide_compile_test || (__p += "\n    ", 
question.compile_status && "Compilation Failed" == question.compile_status ? __p += '\n        <div class="mdA">\n            <strong>Result:</strong> Compilation Failed\n            <br/><br/>Compile Message<br/>\n            <pre>\n                ' + (null == (__t = question.compile_message) ? "" :_.escape(__t)) + "\n            </pre>\n            " :(__p += "\n                ", 
question.submission_testcases && (__p += "\n                    ", "more" == question.testcases_changed ? __p += '\n                        <div class="alert alert-info mlL">\n                            <header>Testcases Changed</header>\n                            <p>The question was edited after this candidate attempted the test. There are now more test cases than when the candidate solved this problem.</p>\n                        </div>\n                    ' :"fewer" == question.testcases_changed && (__p += '\n                        <div class="alert alert-info mlL">\n                            <header>Testcases Changed</header>\n                            <p>The question was edited after this candidate attempted the test. There are now fewer test cases than when the candidate solved this problem.</p>\n                        </div>\n                    '), 
__p += '\n                    <table style="width:94%; margin:30px auto;" class="table table-radius table-out-border fnt-sz-mid ">\n                        <thead>\n                            <tr class="prominent txt-alt-grey">\n                                <th>TESTCASE</th>\n                                <th>TYPE</th>\n                                <th>STATUS</th>\n                                <th>TIME TAKEN</th>\n                                <th>MEMORY USED</th>\n                            </tr>\n                        </thead>\n                        ', 
_.each(question.submission_testcases, function(testcase, index) {
__p += "\n                        <tr>\n                            <td>", __p += testcase.name ? "" + (null == (__t = testcase.name) ? "" :_.escape(__t)) :"Testcase " + (null == (__t = index) ? "" :_.escape(__t)), 
__p += "</td>\n                            <td>" + (null == (__t = testcase.type) ? "" :_.escape(__t)) + "</td>\n                            <td>\n                                ", 
__p += "Compiled Successfully" == testcase.compile_status ? '\n                                <i class="icon2-status_correct txt-green"> </i>Success\n                                ' :'\n                                <i class="icon2-status_wrong txt-orange"> </i>' + (null == (__t = testcase.compile_status) ? "" :_.escape(__t)) + "\n                                ", 
__p += "\n                            </td>\n                            <td>" + (null == (__t = Math.round(100 * testcase.time) / 100) ? "" :_.escape(__t)) + " sec</td>\n                            <td>" + (null == (__t = testcase.memory) ? "" :_.escape(__t)) + "</td>\n                        </tr>\n                        ";
}), __p += "\n                    </table>\n                "), __p += "\n                ", 
question.outputs && (__p += '\n                    <a class="btn btn-small js-showoutputs mdB" style="margin-left:41px">[+] Show output diff</a>\n                    <div class="js-output"></div>\n                '), 
__p += "\n            "), __p += "\n            "), __p += "\n        </div>\n    ") :__p += '\n  <div class="common_margin alert alert-block">\n      <center>This candidate has not answered this question.</center>\n  </div>\n  ', 
__p += '\n\n<div class="clear"></div>\n\n</div>\n';
return __p;
});