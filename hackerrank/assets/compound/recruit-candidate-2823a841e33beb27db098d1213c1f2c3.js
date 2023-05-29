(function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GenericModel, HR, _ref;
return GenericModel = function(_super) {
function GenericModel() {
return GenericModel.__super__.constructor.apply(this, arguments);
}
return __extends(GenericModel, _super), GenericModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
options.casual && (this.casual = {}, this.casual.min_fetch_timelapse = 1e4, this.casual.timestamp = new Date().getTime()), 
null == this.caching && (this.caching = !0), GenericModel.__super__.initialize.call(this, attributes, options);
}, GenericModel.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, GenericModel.prototype.queryParams = function() {
return "";
}, GenericModel.prototype.setCaching = function(caching) {
this.caching = caching;
}, GenericModel.prototype.restPrefix = !0, GenericModel.prototype.restURL = function() {
var rest, _url;
return _url = "" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, GenericModel.prototype.pageURL = function() {
return "" + this.ns() + this.baseURL();
}, GenericModel.prototype.baseURL = function() {
return "/dummy";
}, GenericModel.prototype.ns = function(rest) {
return null == rest && (rest = !1), this.collection && (this.contest_slug || (this.contest_slug = this.contest_slug || this.get("contest_slug") || this.collection.contest_slug)), 
this.contest_slug || (this.contest_slug = HR.appController.get_current_contest_slug()), 
HR.namespace(this.contest_slug, rest);
}, GenericModel.prototype.hasChanged = function(attr) {
return GenericModel.__super__.hasChanged.call(this, attr);
}, GenericModel.prototype.keyPrefix = function() {
return HR.profile().get("key_prefix");
}, GenericModel.prototype.modelCrumbs = function() {
var crumbs;
return crumbs = HR.collection("bread-crumbs"), this.id && crumbs.add({
id:"" + this.constructor.name + "-" + this.id,
slug:this.get("slug") || this.get("id"),
path:this.pageURL(),
name:this.get("name") || this.get("title"),
model:this
}), crumbs;
}, GenericModel.prototype.setContestCrumb = function() {
var contest, contest_slug;
return contest_slug = this.contest_slug || this.get("contest-slug"), contest_slug ? contest = HR.model("contest", {
slug:this.contest_slug
}).cached({
success:function(_this) {
return function(model) {
return _this.crumbs.merge(model.breadCrumbs(), {
at:0
});
};
}(this)
}) :void 0;
}, GenericModel.prototype.breadCrumbs = function() {
return this.crumbs || (this.crumbs = HR.collection("bread-crumbs"), this.setContestCrumb()), 
this.crumbs.merge(this.modelCrumbs()), this.crumbs;
}, GenericModel.prototype.save = function(key, val, options) {
return this.id && this.caching && this.cacheSet(key, val, options), this.collection && this.collection.flush(), 
Backbone.Model.prototype.save.apply(this, arguments);
}, GenericModel.prototype.fetch = function() {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
}, GenericModel.prototype.parse = function(resp, xhr) {
var f, parsed, set_data_fields, that, _fn, _i, _len;
if (void 0 !== xhr || resp.model) {
for (this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0) :this.disableThrobber = !1, 
set_data_fields = [ "total", "page", "activities", "gamedata", "status", "metadata", "errors" ], 
that = this, _fn = function(f) {
return void 0 !== resp[f] ? that[f] = resp[f] :void 0;
}, _i = 0, _len = set_data_fields.length; _len > _i; _i++) f = set_data_fields[_i], 
_fn(f);
parsed = GenericModel.__super__.parse.call(this, resp.model, xhr);
} else parsed = GenericModel.__super__.parse.call(this, resp, xhr);
return parsed;
}, GenericModel;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericModel = GenericModel;
});
}).call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var HR, RecruitCandidateCodingView, RecruitCandidateCompileTestView, RecruitCandidateCompleteView, RecruitCandidateFileUploadView, RecruitCandidateInstructionsView, RecruitCandidateListView, RecruitCandidateMcqView, RecruitCandidateQuestionView, RecruitCandidateSideBarView, RecruitCandidateSubjectiveView, RecruitCandidateTestCaseView, RecruitCandidateTopBarView, _ref;
return RecruitCandidateInstructionsView = function(_super) {
function RecruitCandidateInstructionsView() {
return RecruitCandidateInstructionsView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateInstructionsView, _super), RecruitCandidateInstructionsView.prototype.template = "recruit/instructions", 
RecruitCandidateInstructionsView.prototype.className = "candidate-instructions", 
RecruitCandidateInstructionsView.prototype.initialize = function(options) {
return this.model = options.model;
}, RecruitCandidateInstructionsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
instructions:this.model.get("instructions")
})), this;
}, RecruitCandidateInstructionsView;
}(window.HR.GenericView), RecruitCandidateListView = function(_super) {
function RecruitCandidateListView() {
return RecruitCandidateListView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateListView, _super), RecruitCandidateListView.prototype.template = "recruit/question-list", 
RecruitCandidateListView.prototype.className = "candidate-qlist", RecruitCandidateListView.prototype.events = {
"click .test-done":"testDone",
"click .next-section":"sectionNext"
}, RecruitCandidateListView.prototype.initialize = function() {
return this.model = HR.candidate.candidateAttemptModel, this.tid = HR.candidate.candidateTestModel.get("unique_id"), 
this.aid = this.model.get("id");
}, RecruitCandidateListView.prototype.render = function() {
var current_section, qi, questions, sections_mapping, solves, v;
return questions = this.model.get("questions"), solves = this.model.get("solve_mapping"), 
sections_mapping = this.model.get("sections_mapping"), current_section = this.model.get("section"), 
$(this.el).html(HR.appController.template(this.template, this)({
section_count:sections_mapping ? sections_mapping.length :1,
current_section:current_section ? current_section :1
})), sections_mapping ? (qi = 0, _.each(sections_mapping, function(_this) {
return function(sec, i) {
var v;
return v = _this.getTable(questions.slice(qi, qi + parseInt(sec.questions)), qi + 1, solves, i + 1 !== current_section), 
_this.$("table.section" + (i + 1)).html(v), qi += parseInt(sec.questions);
};
}(this)), sections_mapping.length > 1 && current_section < sections_mapping.length && this.$("button.section-finish-" + current_section).removeClass("hidden")) :(v = this.getTable(questions, 1, solves), 
this.$("table.section1").html(v)), this;
}, RecruitCandidateListView.prototype.getTable = function(questions, start, solves, disabled) {
var el, i, tid;
return null == disabled && (disabled = !1), tid = this.tid, i = start, el = "", 
_.each(questions, function(q) {
var ahref, s;
return s = "", s += 1 === i ? '<tr class="border">' :"<tr>", s += "<td width='5%' class='grey right'><span class='mdR'>Q" + i + "</span></td>", 
s += '<td width="46%"><a class="backbone question-name" ', s += disabled ? ">" :"href='" + tid + "/questions/" + q.unique_id + "'>", 
s += q.name ? q.name :"Question <em class='fnt-sz-small grey' style='font-weight: 500;'> &nbsp;&nbsp; " + _.escape(q.preview) + "..</em>", 
s += "</a></td>", s += "<td width='12%' class='fnt-sz-mid'>" + window.istreet.cfg.hrqn[q.type] + "</td>", 
ahref = disabled ? "" :"href='" + tid + "/questions/" + q.unique_id + "'", s += _.has(solves, q.unique_id) ? "<td width='12%' class='fnt-sz-mid'><span class='green'>submitted</span></td><td width='19%' class='right'><a " + ahref + " class='normal-underline display-inline-block margin-right-15 fnt-sz-mid backbone' style='margin: 9px 11px 9px 0;''>Modify Submission</a></td>" :"<td width='12%' class='fnt-sz-mid'>not answered</td><td width='19%' class='right'><a " + ahref + " class='btn btn-line margin-right-15 fnt-sz-mid backbone'>Solve Question</a></td>", 
s += "</tr>", i++, el += s;
}), el;
}, RecruitCandidateListView.prototype.testDone = function() {
return new HR.util.ShowConfirmationDialog({
body:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",
title:"Confirm test close.",
buttons:[ {
name:"Yes, close this test.",
callback:function(dialog) {
return dialog.destroy(), HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateTestModel.save(null, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/feedback", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
}, {
name:"No, go back.",
className:"btn",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitCandidateListView.prototype.sectionNext = function(e) {
return new HR.util.ShowConfirmationDialog({
body:"Upon closing, you may not access this section again.\n\nAre you sure you want to close this section?",
title:"Confirm section close.",
buttons:[ {
name:"Yes, move to next section.",
callback:function(_this) {
return function(dialog) {
return dialog.destroy(), HR.candidate.candidateAttemptModel.set("section_close", _this.$(e.currentTarget).attr("data-section")), 
HR.candidate.candidateAttemptModel.save(null, {
success:function(m) {
return HR.candidate.candidateAttemptModel = m, HR.router.navigate("" + _this.aid, {
trigger:!0,
replace:!0
});
},
error:function() {
return console.log("Could not close and move to next section.");
}
});
};
}(this)
}, {
name:"No, stay",
className:"btn",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitCandidateListView;
}(window.HR.GenericView), RecruitCandidateQuestionView = function(_super) {
function RecruitCandidateQuestionView() {
return this.getAnswerToSave = __bind(this.getAnswerToSave, this), RecruitCandidateQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateQuestionView, _super), RecruitCandidateQuestionView.prototype.template = "recruit/question-base", 
RecruitCandidateQuestionView.prototype.className = "question-base", RecruitCandidateQuestionView.prototype.initialize = function(options) {
return this.model = options.model, this.tid = HR.candidate.candidateTestModel.get("unique_id");
}, RecruitCandidateQuestionView.prototype.events = {
"click .ans-submit":"submitAnswer"
}, RecruitCandidateQuestionView.prototype.getAnswerToSave = function() {
var a;
return "code" !== this.model.get("type") && "approx" !== this.model.get("type") ? null :this.view ? (a = {
type:this.model.attributes.type,
answer:this.view.answer()
}, a.answer ? a :null) :null;
}, RecruitCandidateQuestionView.prototype.submitAnswer = function(e) {
var a, data, request_params;
return e.preventDefault(), a = {
type:this.model.attributes.type,
answer:this.view.answer()
}, a.answer ? (data = {
qid:this.model.get("unique_id"),
answer:a
}, request_params = {
url:"/recruit/attempts/" + HR.candidate.candidateAttemptModel.get("id") + "/solves",
data:data,
dataType:"json",
type:"POST",
success:function(_this) {
return function(xhr) {
var next_url;
return data = JSON.parse(xhr.responseText), data.error ? _this.showError(data.error) :(next_url = _this.model.get("nextqid") ? "" + _this.tid + "/questions/" + _this.model.get("nextqid") :"" + _this.tid + "/questions", 
HR.router.navigate(next_url, {
trigger:!0,
replace:!0
}));
};
}(this),
error:function(_this) {
return function(xhr) {
return data = JSON.parse(xhr.responseText), data.error ? _this.showError(data.error) :_this.showError();
};
}(this)
}, "file_upload" !== this.model.get("type") || _.isString(this.view.answer()) || (data = {
qid:this.model.get("unique_id")
}, request_params.iframe = !0, request_params.processData = !1, request_params.data = data, 
request_params.files = this.view.answer()), $.ajax(request_params)) :new HR.util.ShowConfirmationDialog({
title:"Submit error",
body:"Please answer the question before submitting.",
buttons:[ {
name:"OK",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitCandidateQuestionView.prototype.showError = function(error) {
return null == error && (error = "Unable to save your answer. Either the question is no longer accessible, or incorrect data provided."), 
new HR.util.ShowConfirmationDialog({
title:"Server error",
body:error,
buttons:[ {
name:"OK",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitCandidateQuestionView.prototype._render = function() {
var cnt, problem_statement, q, viewfound;
switch (this.question = this.model.attributes, $(this.el).html(HR.appController.template(this.template, this)({
tid:this.tid,
question:this.question
})), viewfound = !0, this.question.type) {
case "code":
case "approx":
this.view = new HR.RecruitCandidateCodingView({
question:this.question
});
break;

case "mcq":
case "multiple_mcq":
this.view = new HR.RecruitCandidateMcqView({
question:this.question
});
break;

case "textAns":
this.view = new HR.RecruitCandidateSubjectiveView({
question:this.question
});
break;

case "complete":
for (q = this.question.complete_string, cnt = 0, problem_statement = "<h4>Complete the blanks in the following question with the appropriate answer.</h4><br/>", 
problem_statement += _.isEmpty(this.question.question) ? "" :this.question.question; -1 !== q.search("{blank}"); ) q = q.replace("{blank}", "<input type='text' class='complete-question' name='blank" + cnt + "'/>"), 
cnt += 1;
problem_statement += q, this.view = new HR.RecruitCandidateCompleteView({
question:this.question
});
break;

case "file_upload":
this.view = new HR.RecruitCandidateFileUploadView({
question:this.question
});
break;

default:
viewfound = !1;
}
return this.question.name ? this.$(".qtitle").html("" + this.question.name + " (" + window.istreet.cfg.hrqn[this.question.type] + ")") :this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]), 
"complete" === this.question.type ? this.$(".challenge-text").html(problem_statement) :this.$(".challenge-text").html(this.question.question), 
viewfound ? this.$(".qcontent").html(this.view.render().el) :(this.$(".qcontent").html("<center>This question type is not available.</center>"), 
this.$(".ans-submit").addClass("disabled")), this;
}, RecruitCandidateQuestionView;
}(window.HR.GenericView), RecruitCandidateCodingView = function(_super) {
function RecruitCandidateCodingView() {
return RecruitCandidateCodingView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodingView, _super), RecruitCandidateCodingView.prototype.template = "recruit/question-coding", 
RecruitCandidateCodingView.prototype.className = "question-coding", RecruitCandidateCodingView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, window.error_marker_widgets = [], this.aid = HR.candidate && HR.candidate.candidateAttemptModel ? HR.candidate.candidateAttemptModel.get("id") :"testing", 
this.autoSaveNamespace = options.disableLocalStorage && options.disableLocalStorage === !0 ? null :"" + this.aid + "-" + this.question.unique_id, 
this.compilingLock = !1, this;
}, RecruitCandidateCodingView.prototype.events = {
"codeshellcompile #editor":"compileAnswer",
"click #testcase-dl":"testcaseDownload"
}, RecruitCandidateCodingView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.show_template = !1, this.question.show_template && "true" === this.question.show_template.toLowerCase() && (this.show_template = !0), 
this.test.get("show_template") && "true" === this.test.get("show_template").toLowerCase() && (this.show_template = !0), 
HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this)), this;
}, RecruitCandidateCodingView.prototype.testcaseDownload = function() {
var url;
return url = "/recruit/attempts/" + HR.candidate.candidateAttemptModel.id + "/questions/" + this.question.unique_id + "/testcases", 
HR.util.downloadURL(url);
}, RecruitCandidateCodingView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:this.question.languages,
language:"c",
autoSaveNamespace:this.autoSaveNamespace,
lang_template:this.getLangDefaults(),
showNonEditableHeadTail:this.show_template,
lang_head_template:this.getLangHeads(),
lang_tail_template:this.getLangTails(),
submit_button_text:"Submit code & Continue",
showSubmit:!0,
showCustomInput:this.showCustomInput(),
dynamicMode:!0,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, ("True" === this.test.get("hide_compile_test") || "True" === this.question.hide_compile_test) && (opts.showCompileTest = !1), 
"testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !1), this.$("#editor").codeshell(opts), 
this.$("#editor").codeshell("refresh"), this.$("#editor").codeshell("onChange", this.deleteMarkersOnSource), 
this.set_answer();
}, RecruitCandidateCodingView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateCodingView.prototype.getLangHeads = function() {
var l, m, _i, _len, _ref;
if (m = {}, this.show_template) for (_ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template_head"] && (m[l] = this.question[l + "_template_head"]);
return m;
}, RecruitCandidateCodingView.prototype.getLangTails = function() {
var l, m, _i, _len, _ref;
if (m = {}, this.show_template) for (_ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template_tail"] && (m[l] = this.question[l + "_template_tail"]);
return m;
}, RecruitCandidateCodingView.prototype.showCustomInput = function() {
return this.question.show_custom_testcase && "True" === this.question.show_custom_testcase ? !0 :!1;
}, RecruitCandidateCodingView.prototype.compileAnswer = function(e, data) {
return data.code && !$(".bb-compile").hasClass("disabled") ? (data.custominput && (data.customtestcase = !0), 
$(".bb-compile").addClass("disabled"), this.deleteMarkersOnSource(), HR.candidate.ctmodel = new HR.CandidateCompileTestModel(), 
HR.candidate.ctmodel.setAid(this.aid), HR.candidate.ctmodel.setQid(this.question.unique_id), 
"runalltestcases" === e && HR.candidate.ctmodel.setAllCases(!0), HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), 
this.$("#runstatus").html(HR.candidate.ctview.render().el), HR.util.scrollToBottom(1e3), 
HR.candidate.ctmodel.save(data, {
success:function(_this) {
return function() {
return HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data, e);
}, 2e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("There was an issue with compiling this code.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.checkForResult = function(that, data, e) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var expected_output, i, input, msg, output, pass, score, st_class, _i, _len, _ref;
if (0 === m.get("status")) return HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e);
}, 2e3), void 0;
if (0 !== m.get("status")) if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage")), 
that.addMarkersOnSource(m); else if (pass = 0, m.get("customtestcase")) HR.candidate.ctview.setStatus("Compiled successfully.", "orange"), 
input = m.get("stdin")[0], output = m.get("stdout")[0], st_class = "txt-green", 
HR.candidate.ctview.addTestCase(1, input, output, null, "", st_class, score); else {
for (_ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], msg = m.get("testcase_message")[i], 
1 === m.get("testcase_status")[i] ? (st_class = "txt-green", pass++) :st_class = "txt-orange", 
m.get("score") && _.isNumber(m.get("score")[i]) && (score = m.get("score")[i]), 
HR.candidate.ctview.addTestCase(i + 1, input, output, expected_output, msg, st_class, score);
0 === m.get("testcase_status").length ? HR.candidate.ctview.setStatus("Compiled successfully.", "orange") :0 === pass ? HR.candidate.ctview.setStatus("No test cases passed.", "red") :i > pass ? "runalltestcases" === e ? HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " test cases passed.", "orange") :HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange") :"runalltestcases" !== e ? (HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green"), 
_this.$(".bb-runall").show(), that.compileAnswer("runalltestcases", data)) :HR.candidate.ctview.setStatus("Compiled successfully. All test cases passed!", "green");
}
return HR.util.scrollToBottom(1e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, HR.candidate.ctview = null, HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateCodingView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", this.question.solve.answer) :void 0;
}, RecruitCandidateCodingView.prototype.addMarkersOnSource = function(data) {
var editor, error_markers, error_message, i, line_number, line_offset, marker_node, markers, total_lines;
if (data.get("error_markers")) {
editor = window.codeEditor, error_markers = data.get("error_markers"), total_lines = editor.lineCount(), 
line_offset = error_markers.head_code_lines, markers = error_markers.markers;
for (i in markers) error_message = markers[i].message, line_number = markers[i].line_number, 
line_number -= line_offset, total_lines >= line_number && (marker_node = $("<div class='error-marker'><span class='error-marker-icon'>X</span>" + error_message + "</div>"), 
window.error_marker_widgets.push(editor.addLineWidget(line_number - 1, marker_node[0], {
above:!0
})));
return this.$("#editor").codeshell("refresh");
}
}, RecruitCandidateCodingView.prototype.deleteMarkersOnSource = function() {
var editor, i;
if (0 !== window.error_marker_widgets.length) {
editor = window.codeEditor;
for (i in window.error_marker_widgets) editor.removeLineWidget(window.error_marker_widgets[i]);
return this.$("#editor").codeshell("refresh"), window.error_marker_widgets = [];
}
}, RecruitCandidateCodingView;
}(window.HR.GenericView), RecruitCandidateMcqView = function(_super) {
function RecruitCandidateMcqView() {
return RecruitCandidateMcqView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateMcqView, _super), RecruitCandidateMcqView.prototype.template = "recruit/question-mcq", 
RecruitCandidateMcqView.prototype.className = "question-mcq", RecruitCandidateMcqView.prototype.events = {
"click .clearall":"clearAll"
}, RecruitCandidateMcqView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateMcqView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), this;
}, RecruitCandidateMcqView.prototype.clearAll = function(e) {
return e.preventDefault(), this.$('input[name="mcqopts"]').attr("checked", !1);
}, RecruitCandidateMcqView.prototype.answer = function() {
var o;
return "mcq" === this.question.type ? (o = this.$("input[name=mcqopts]:checked").val(), 
o ? o :this.question.solve ? -1 :null) :(o = [], _.each(this.$("input[name=mcqopts]:checked"), function(_this) {
return function(e) {
return o.push(_this.$(e).val());
};
}(this)), o.length ? o :this.question.solve ? -1 :null);
}, RecruitCandidateMcqView.prototype.set_answer = function() {
var ans, _i, _len, _ref, _results;
if (this.question.solve) {
if ("mcq" === this.question.type) return this.$("input#mcqopts" + this.question.solve.answer.answer).prop("checked", !0);
for (_ref = this.question.solve.answer.answer, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) ans = _ref[_i], 
_results.push(this.$("input#mcqopts" + ans).prop("checked", !0));
return _results;
}
}, RecruitCandidateMcqView;
}(window.HR.GenericView), RecruitCandidateSubjectiveView = function(_super) {
function RecruitCandidateSubjectiveView() {
return RecruitCandidateSubjectiveView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSubjectiveView, _super), RecruitCandidateSubjectiveView.prototype.template = "recruit/question-subjective", 
RecruitCandidateSubjectiveView.prototype.className = "question-subjective", RecruitCandidateSubjectiveView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateSubjectiveView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), this;
}, RecruitCandidateSubjectiveView.prototype.answer = function() {
return this.$(".sub-answer").val();
}, RecruitCandidateSubjectiveView.prototype.set_answer = function() {
return this.question.solve ? this.$(".sub-answer").val(this.question.solve.answer.answer) :void 0;
}, RecruitCandidateSubjectiveView;
}(window.HR.GenericView), RecruitCandidateFileUploadView = function(_super) {
function RecruitCandidateFileUploadView() {
return RecruitCandidateFileUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateFileUploadView, _super), RecruitCandidateFileUploadView.prototype.template = "recruit/question-fileupload", 
RecruitCandidateFileUploadView.prototype.className = "question-fileupload", RecruitCandidateFileUploadView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateFileUploadView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), window.view = this, this;
}, RecruitCandidateFileUploadView.prototype.answer = function() {
return $(":file").val() ? $(":file") :this.question.solve && this.question.solve.answer ? this.question.solve.answer :!1;
}, RecruitCandidateFileUploadView.prototype.set_answer = function() {
return this.question.solve ? this.show_answer(this.question.solve.answer) :void 0;
}, RecruitCandidateFileUploadView.prototype.show_answer = function(answer) {
var html;
return html = HR.util.getFileAnchor(answer), this.$("#current_answer").html(html), 
this.$(".current-answer-section").removeClass("hidden");
}, RecruitCandidateFileUploadView;
}(window.HR.GenericView), RecruitCandidateCompleteView = function(_super) {
function RecruitCandidateCompleteView() {
return RecruitCandidateCompleteView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCompleteView, _super), RecruitCandidateCompleteView.prototype.template = "recruit/question-completesentence", 
RecruitCandidateCompleteView.prototype.className = "question-complete", RecruitCandidateCompleteView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateCompleteView.prototype._render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this;
}, RecruitCandidateCompleteView.prototype.postrender = function() {
return setTimeout(function(_this) {
return function() {
return _this.set_answer();
};
}(this));
}, RecruitCandidateCompleteView.prototype.answer = function() {
return _.map($('input[name^="blank"]'), function(e) {
return $(e).val();
});
}, RecruitCandidateCompleteView.prototype.set_answer = function() {
var cnt;
return this.question.solve ? (cnt = 0, _.each(this.question.solve.answer, function(v) {
return $('input[name="blank' + cnt + '"]').val(v), cnt += 1;
})) :void 0;
}, RecruitCandidateCompleteView;
}(window.HR.GenericView), RecruitCandidateTopBarView = function(_super) {
function RecruitCandidateTopBarView() {
return this.updateTimer = __bind(this.updateTimer, this), RecruitCandidateTopBarView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTopBarView, _super), RecruitCandidateTopBarView.prototype.template = "recruit/topbar", 
RecruitCandidateTopBarView.prototype.className = "topbar", RecruitCandidateTopBarView.prototype.initialize = function() {
return Offline.options = {
reconnect:{
initialDelay:3
},
requests:!1,
game:!1
};
}, RecruitCandidateTopBarView.prototype.getTimeLeft = function() {
var tl;
return tl = HR.candidate.candidateTestModel.get("sectional") ? HR.candidate.candidateAttemptModel.get("section_time_left") :HR.candidate.candidateAttemptModel.get("time_left");
}, RecruitCandidateTopBarView.prototype.updateTimer = function() {
return $("#countdown-timer").countdown("option", "until", this.getTimeLeft());
}, RecruitCandidateTopBarView.prototype.render = function() {
var LONG_PING_TIME, QUICK_PING_TIME, interval, qcount, qdone;
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel,
attempt:HR.candidate.candidateAttemptModel
})), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), HR.candidate.candidateAttemptModel.get("attempt_done") ? HR.appView.setTopbarView() :(qdone = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping") || {}).length, 
qcount = HR.candidate.candidateAttemptModel.get("questions").length, this.$(".qdone").html(qdone), 
this.$(".qcount").html(qcount), this.$(".progress-done").css({
width:Math.floor(100 * qdone / qcount)
}), $("#countdown-timer").countdown("destroy").countdown({
until:this.getTimeLeft(),
layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",
compact:!0
}), setTimeout(function(_this) {
return function() {
return $("#countdown-timer").countdown("option", "onExpiry", _this.testTimeUp);
};
}(this), 100), LONG_PING_TIME = 6e4, QUICK_PING_TIME = 1e4, interval = this.getTimeLeft() < 100 ? QUICK_PING_TIME :LONG_PING_TIME, 
HR.candidate.pingTimer = setInterval(function(_this) {
return function() {
var ans, dat, saving;
return dat = {
pong:!0
}, HR.candidate.currentQuestion && (ans = HR.candidate.questionView.getAnswerToSave(), 
saving = !1, ans && (saving = !0, dat.to_save_code = ans, dat.qid = HR.candidate.questionView.model.get("unique_id"))), 
saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Saving draft.."), 
HR.candidate.candidateAttemptModel.save({
data:dat
}, {
success:function(model) {
return saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Draft saved " + moment().format("hh:mm a")), 
model.get("attempt_done") ? _this.testTimeUp() :_this.updateTimer();
},
fail:function() {
return saving ? HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Unable to save draft.") :void 0;
}
});
};
}(this), interval)), this;
}, RecruitCandidateTopBarView.prototype.testTimeUp = function() {
return HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("time_left") > 30 ? (HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
new HR.util.ShowConfirmationDialog({
closebutton:!1,
keyboard:!1,
title:"Section closed",
body:"You have exceeded the time limit set for this section. All answers you submitted before the time limit have been saved. You will now be moved to the next section.",
buttons:[ {
name:"Proceed to next section",
"class":"btn-primary",
callback:function(dialog) {
var uid;
uid = HR.candidate.candidateTestModel.get("unique_id"), HR.candidate.candidateTestModel = null, 
dialog.destroy(), HR.router.navigate("" + uid, {
trigger:!0,
replace:!0
});
}
} ]
}).render()) :(HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
new HR.util.ShowConfirmationDialog({
closebutton:!1,
keyboard:!1,
title:"Test finished",
body:"You have exceeded the time limit set for this test. All answers you submitted before the time limit have been saved. You cannot attempt any more questions now. Thank you for taking this test.",
buttons:[ {
name:"Proceed to Feedback",
"class":"btn-primary",
callback:function(dialog) {
dialog.destroy(), HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.candidateTestModel.save(null, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/feedback", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
} ]
}).render());
}, RecruitCandidateTopBarView;
}(window.HR.GenericView), RecruitCandidateSideBarView = function(_super) {
function RecruitCandidateSideBarView() {
return RecruitCandidateSideBarView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSideBarView, _super), RecruitCandidateSideBarView.prototype.template = "recruit/sidebar", 
RecruitCandidateSideBarView.prototype.className = "sbar", RecruitCandidateSideBarView.prototype.icon_types = {
QUESTION_ANSWERED:"nav",
QUESTION_UNANSWERED:1,
QUESTION_LIST:2
}, RecruitCandidateSideBarView.prototype.render = function() {
var url;
return url = Backbone.history.fragment, $(this.el).html(HR.appController.template(this.template, this)), 
this.$(".fixed-nav").html(this.getTopIcons()), url.endsWith("questions") || url.endsWith("questions/") || this.$(".questions-nav").html(this.getQuestionIcons()), 
this;
}, RecruitCandidateSideBarView.prototype.getTopIcons = function() {
var cls, html, url;
return html = "", url = Backbone.history.fragment, cls = "", (url.endsWith("questions") || url.endsWith("questions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/questions" class="backbone"><i class="nav-icon icon-list-bullet-large"></i></a></li>', 
cls = "", (url.endsWith("instructions") || url.endsWith("instructions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/instructions" class="backbone"><i class="nav-icon icon-help-circled"></i></a></li>';
}, RecruitCandidateSideBarView.prototype.getQuestionIcons = function() {
var active, answered, answered_qs, elhtml, label, li_gen, q, qs, _i, _len, _ref;
for (elhtml = "", li_gen = function(answered, disabled, active, link, label) {
var act, ans, dis;
return ans = answered ? "answered" :"not-answered", dis = disabled ? "disabled" :"", 
act = active ? "active" :"", '<li class="' + ans + " " + dis + " " + act + '">\n  <a href="' + link + '" class="backbone">\n      <span class="quest-number">' + label + "</span>\n  </a>\n</li>";
}, qs = HR.candidate.candidateAttemptModel.get("questions"), answered_qs = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping")), 
label = 1, _i = 0, _len = qs.length; _len > _i; _i++) q = qs[_i], _ref = q.unique_id.toString(), 
answered = __indexOf.call(answered_qs, _ref) >= 0, active = q.unique_id === HR.candidate.currentQuestion, 
elhtml += q.disabled ? li_gen(answered, !0, active, "javascript:void(0)", label) :li_gen(answered, !1, active, "" + HR.candidate.candidateTestModel.get("unique_id") + "/questions/" + q.unique_id, label), 
label += 1;
return elhtml;
}, RecruitCandidateSideBarView;
}(window.HR.GenericView), RecruitCandidateCompileTestView = function(_super) {
function RecruitCandidateCompileTestView() {
return RecruitCandidateCompileTestView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCompileTestView, _super), RecruitCandidateCompileTestView.prototype.template = "recruit/compiletest-base", 
RecruitCandidateCompileTestView.prototype.className = "ct-base", RecruitCandidateCompileTestView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, RecruitCandidateCompileTestView.prototype.setStatus = function(s, additional_class) {
return null == additional_class && (additional_class = ""), this.$(".status-msg").html(s), 
"" !== additional_class ? this.$(".status-msg").addClass(additional_class) :void 0;
}, RecruitCandidateCompileTestView.prototype.setCompileStatus = function(title, message) {
return this.$(".compile-header").html(title), this.$(".compile-message").html(message), 
this.$("#error-message").removeClass("hide");
}, RecruitCandidateCompileTestView.prototype.addTestCase = function(tno, input, output, exp_output, compiler_msg, st_class, score) {
var tc;
return tc = new HR.RecruitCandidateTestCaseView({
tno:tno,
input:input,
output:output,
exp_output:exp_output,
st_class:st_class,
compiler_msg:compiler_msg,
score:score
}), this.$(".testcases").append(tc.render().el);
}, RecruitCandidateCompileTestView;
}(window.HR.GenericView), RecruitCandidateTestCaseView = function(_super) {
function RecruitCandidateTestCaseView() {
return RecruitCandidateTestCaseView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTestCaseView, _super), RecruitCandidateTestCaseView.prototype.template = "recruit/compiletest-testcase", 
RecruitCandidateTestCaseView.prototype.classname = "test-case-wrap", RecruitCandidateTestCaseView.prototype.initialize = function(o) {
return this.tno = o.tno, this.input = o.input, this.output = o.output, this.exp_output = o.exp_output, 
this.compiler_msg = o.compiler_msg, this.st_class = o.st_class, this.score = o.score;
}, RecruitCandidateTestCaseView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
tno:this.tno,
input:this.input,
output:this.output,
exp_output:this.exp_output,
compiler_msg:this.compiler_msg,
st_class:this.st_class,
score:this.score
})), this;
}, RecruitCandidateTestCaseView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateListView = RecruitCandidateListView, 
HR.RecruitCandidateQuestionView = RecruitCandidateQuestionView, HR.RecruitCandidateCodingView = RecruitCandidateCodingView, 
HR.RecruitCandidateMcqView = RecruitCandidateMcqView, HR.RecruitCandidateSubjectiveView = RecruitCandidateSubjectiveView, 
HR.RecruitCandidateCompleteView = RecruitCandidateCompleteView, HR.RecruitCandidateFileUploadView = RecruitCandidateFileUploadView, 
HR.RecruitCandidateTopBarView = new RecruitCandidateTopBarView(), HR.RecruitCandidateSideBarView = new RecruitCandidateSideBarView(), 
HR.RecruitCandidateCompileTestView = RecruitCandidateCompileTestView, HR.RecruitCandidateTestCaseView = RecruitCandidateTestCaseView, 
HR.RecruitCandidateInstructionsView = RecruitCandidateInstructionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, RecruitCandidateLoginView, RecruitFacebookResumeView, RecruitMessageView, _ref;
return RecruitCandidateLoginView = function(_super) {
function RecruitCandidateLoginView() {
return RecruitCandidateLoginView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateLoginView, _super), RecruitCandidateLoginView.prototype.template = "recruit/login", 
RecruitCandidateLoginView.prototype.className = "candidate-login", RecruitCandidateLoginView.prototype.events = {
"click .test-submit":"loginAction",
"click .test-submit-feedback":"submitFeedback",
"click .test-logout":"logoutTest",
"click .fblogin":"loginToFB"
}, RecruitCandidateLoginView.prototype.initialize = function() {}, RecruitCandidateLoginView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes
})), this.model.get("facebook_login") && !window.fbAdded && (window.fbAdded = !0, 
$.getScript("/assets/fb.js")), this;
}, RecruitCandidateLoginView.prototype.resetError = function() {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(""), $err.find("p").html(""), 
$err.hide();
}, RecruitCandidateLoginView.prototype.setError = function(title, message) {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(title), $err.find("p").html(message), 
$err.show();
}, RecruitCandidateLoginView.prototype.loginAction = function(e) {
var email, form_data, pass, put_data, request_params, that, uniqid;
return this.disableButton("test-submit"), that = this, e.preventDefault(), this.resetError(), 
email = this.$("input[name=username]").val(), pass = this.$("input[name=password]").val(), 
this.$("#acknowledge").is(":checked") ? (form_data = $("#test-login-form").serializeArray(), 
put_data = {}, _.each(form_data, function(item) {
return put_data[item.name] = item.value;
}), put_data.tauth_key = this.model.auth, $("#acknowledge").is(":checked") && (put_data.acknowledge = "on"), 
uniqid = this.model.get("unique_id"), request_params = {
url:"/recruit/tests/" + uniqid + "/login",
data:put_data,
type:"POST",
success:function(_this) {
return function(xhr) {
var r;
return r = "string" == typeof xhr ? $.parseJSON($(xhr).text()) :xhr, r.status ? HR.router.navigate("" + uniqid + "/questions", {
trigger:!0,
replace:!0
}) :(_this.enableButton("test-submit"), that.setError(r.message.title, r.message.body));
};
}(this),
error:function(_this) {
return function(xhr) {
var r;
return _this.enableButton("test-submit"), r = "string" == typeof xhr.responseText ? $.parseJSON($(xhr.responseText).text()) :xhr.responseText, 
that.setError(r.message.title, r.message.body);
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.data = put_data, request_params.files = $(":file")), $.ajax(request_params), 
this) :(this.enableButton("test-submit"), new HR.util.ShowConfirmationDialog({
body:"You cannot take this test without agreeing to the specified conditions.",
buttons:[ {
name:"OK",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render(), void 0);
}, RecruitCandidateLoginView.prototype.submitFeedback = function() {
return this.disableButton("test-submit-feedback"), HR.candidate.candidateAttemptModel.set("feedback_text", this.$(".feedback-text").val()), 
HR.candidate.candidateAttemptModel.save(null, {
success:function(_this) {
return function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), _this.enableButton("test-submit-feedback"), _this.logoutTest();
};
}(this),
error:function() {
return this.enableButton("test-submit-feedback"), console.log("Could not submit feedback.");
}
});
}, RecruitCandidateLoginView.prototype.logoutTest = function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), window.candidate = {}, this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>");
}, RecruitCandidateLoginView.prototype.disableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !0).addClass("disabled");
}, RecruitCandidateLoginView.prototype.enableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !1).removeClass("disabled");
}, RecruitCandidateLoginView.prototype.loginToFB = function() {
return window.location = this.model.get("facebook_login_url");
}, RecruitCandidateLoginView;
}(window.HR.GenericView), RecruitFacebookResumeView = function(_super) {
function RecruitFacebookResumeView() {
return RecruitFacebookResumeView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitFacebookResumeView, _super), RecruitFacebookResumeView.prototype.template = "recruit/fbresume", 
RecruitFacebookResumeView.prototype.className = "candidate-fb", RecruitFacebookResumeView.prototype.events = {
"click .starttest":"startTest"
}, RecruitFacebookResumeView.prototype.initialize = function(options) {
return this.model = options.model, this.data = options.data;
}, RecruitFacebookResumeView.prototype.render = function() {
return console.log(this.data), $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes,
data:this.data
})), this;
}, RecruitFacebookResumeView.prototype.startTest = function() {
var p, req_params;
return p = this.$(".userprofile").val(), p ? (req_params = {
type:"put",
url:"/recruit/tests/" + this.model.get("unique_id") + "/fb_login",
data:{
profile:p
},
success:function(_this) {
return function() {
return HR.router.navigate("" + _this.model.get("unique_id") + "/questions", {
trigger:!0,
replace:!0
});
};
}(this),
error:function(_this) {
return function(e) {
return window.candidatemessage = JSON.parse(e.responseText).message, HR.router.navigate("" + _this.model.get("unique_id") + "/message", {
trigger:!0,
replace:!0
});
};
}(this)
}, $.ajax(req_params)) :bootbox.alert("Please enter a short desciption about yourself.");
}, RecruitFacebookResumeView;
}(window.HR.GenericView), RecruitMessageView = function(_super) {
function RecruitMessageView() {
return RecruitMessageView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitMessageView, _super), RecruitMessageView.prototype.template = "recruit/candidatemessage", 
RecruitMessageView.prototype.className = "candidate-message", RecruitMessageView.prototype.initialize = function(options) {
return this.model = options.model, this.message = options.message;
}, RecruitMessageView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes,
message:this.message
})), this;
}, RecruitMessageView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateLoginView = RecruitCandidateLoginView, 
HR.RecruitFacebookResumeView = RecruitFacebookResumeView, HR.RecruitMessageView = RecruitMessageView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CandidateAttemptModel, CandidateCompileTestModel, CandidateQuestionModel, CandidateSolveModel, CandidateTestModel, HR, _ref;
return CandidateTestModel = function(_super) {
function CandidateTestModel() {
return CandidateTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateTestModel, _super), CandidateTestModel.prototype.idAttribute = "unique_id", 
CandidateTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateTestModel.__super__.initialize.call(this, attributes, options);
}, CandidateTestModel.prototype.setTidAuth = function(tid, auth) {
this.tid = tid, this.auth = auth;
}, CandidateTestModel.prototype.setAction = function(action) {
this.action = null != action ? action :"show";
}, CandidateTestModel.prototype.url = function() {
switch (this.action) {
case "login":
return "/recruit/tests/" + this.tid + "/login?tauth_key=" + this.auth;

case "show":
return "/recruit/tests/" + this.tid + "?tauth_key=" + this.auth;

case "logout":
return "/recruit/tests/logout";
}
}, CandidateTestModel;
}(window.HR.GenericModel), CandidateAttemptModel = function(_super) {
function CandidateAttemptModel() {
return CandidateAttemptModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateAttemptModel, _super), CandidateAttemptModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateAttemptModel.__super__.initialize.call(this, attributes, options);
}, CandidateAttemptModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateAttemptModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid;
}, CandidateAttemptModel;
}(window.HR.GenericModel), CandidateQuestionModel = function(_super) {
function CandidateQuestionModel() {
return CandidateQuestionModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateQuestionModel, _super), CandidateQuestionModel.prototype.idAttribute = "unique_id", 
CandidateQuestionModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateQuestionModel.__super__.initialize.call(this, attributes, options);
}, CandidateQuestionModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateQuestionModel.prototype.setQid = function(qid) {
this.qid = qid;
}, CandidateQuestionModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid + "/questions/" + this.qid;
}, CandidateQuestionModel;
}(window.HR.GenericModel), CandidateSolveModel = function(_super) {
function CandidateSolveModel() {
return CandidateSolveModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateSolveModel, _super), CandidateSolveModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateSolveModel.__super__.initialize.call(this, attributes, options);
}, CandidateSolveModel.prototype.setAttempt = function(aid) {
this.aid = aid;
}, CandidateSolveModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid + "/solves/";
}, CandidateSolveModel;
}(window.HR.GenericModel), CandidateCompileTestModel = function(_super) {
function CandidateCompileTestModel() {
return CandidateCompileTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateCompileTestModel, _super), CandidateCompileTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateCompileTestModel.__super__.initialize.call(this, attributes, options);
}, CandidateCompileTestModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateCompileTestModel.prototype.setQid = function(qid) {
this.qid = qid;
}, CandidateCompileTestModel.prototype.setAllCases = function(allcases) {
this.allcases = allcases;
}, CandidateCompileTestModel.prototype.url = function() {
return this.id ? "/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/compile_tests/" + this.id :this.allcases ? "/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/compile_tests?allcases=" + this.allcases :"/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/compile_tests";
}, CandidateCompileTestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateTestModel = CandidateTestModel, 
HR.CandidateAttemptModel = CandidateAttemptModel, HR.CandidateSolveModel = CandidateSolveModel, 
HR.CandidateQuestionModel = CandidateQuestionModel, HR.CandidateCompileTestModel = CandidateCompileTestModel;
});
}.call(this), $(function() {
$.fn.bootstrapFileInput = function() {
this.each(function(i, elem) {
var $elem = $(elem);
if ("undefined" == typeof $elem.attr("data-bfi-disabled")) {
var buttonWord = "Browse";
"undefined" != typeof $elem.attr("title") && (buttonWord = $elem.attr("title"));
var input = $("<div>").append($elem.eq(0).clone()).html(), className = "";
$elem.attr("class") && (className = " " + $elem.attr("class")), $elem.replaceWith('<a class="file-input-wrapper btn' + className + '">' + buttonWord + input + "</a>");
}
}).promise().done(function() {
$(".file-input-wrapper").mousemove(function(cursor) {
var input, wrapper, wrapperX, wrapperY, inputWidth, inputHeight, cursorX, cursorY;
wrapper = $(this), input = wrapper.find("input"), wrapperX = wrapper.offset().left, 
wrapperY = wrapper.offset().top, inputWidth = input.width(), inputHeight = input.height(), 
cursorX = cursor.pageX, cursorY = cursor.pageY, moveInputX = cursorX - wrapperX - inputWidth + 20, 
moveInputY = cursorY - wrapperY - inputHeight / 2, input.css({
left:moveInputX,
top:moveInputY
});
}), $(".file-input-wrapper input[type=file]").change(function() {
var fileName;
fileName = $(this).val(), $(this).parent().next(".file-input-name").remove(), fileName = $(this).prop("files") && $(this).prop("files").length > 1 ? $(this)[0].files.length + " files" :fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length), 
$(this).parent().after('<span class="file-input-name">' + fileName + "</span>");
});
});
};
var cssHtml = "<style>.file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }.file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }.file-input-name { margin-left: 8px; }</style>";
$("link[rel=stylesheet]").eq(0).before(cssHtml);
});