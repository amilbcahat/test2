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
return __extends(GenericModel, _super), GenericModel.prototype.initialize = function(options) {
return this.on("error", function(_this) {
return function(model, xhr) {
var response;
return response = xhr && xhr.responseText ? JSON.parse(xhr.responseText) :{
message:""
}, void 0 !== _this.disableThrobber && _this.disableThrobber === !0 || (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg(response.message, !1, !0, 1e4), 
!HR.loadingButton) ? void 0 :HR.util.inlineLoadingEnd(response);
};
}(this)), GenericModel.__super__.initialize.call(this, options);
}, GenericModel.prototype.save = function(key, val, options) {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
GenericModel.__super__.save.call(this, key, val, options);
}, GenericModel.prototype.destroy = function(options) {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
GenericModel.__super__.destroy.call(this, options);
}, GenericModel.prototype.parse = function(resp, xhr) {
var model;
return this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
model = resp && resp.model ? resp.model :resp, GenericModel.__super__.parse.call(this, model, xhr);
}, GenericModel.prototype.fetch = function() {
return this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
}, GenericModel.prototype.setCaching = function(caching) {
this.caching = caching;
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
};
jQuery(function() {
var GenericCollection, HR, _ref;
return GenericCollection = function(_super) {
function GenericCollection() {
return GenericCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCollection, _super), GenericCollection.prototype.initialize = function(options) {
return this.sync_status = !1, this.render_once = !1, this.on("error", function(_this) {
return function(model, xhr) {
var response;
return response = JSON.parse(xhr.responseText), void 0 !== _this.disableThrobber && _this.disableThrobber === !0 || (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
!HR.loadingButton) ? void 0 :HR.util.inlineLoadingEnd(response);
};
}(this)), GenericCollection.__super__.initialize.call(this, options);
}, GenericCollection.prototype.fetch = function(options) {
return null == options && (options = {}), this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Collection.prototype.fetch.apply(this, arguments);
}, GenericCollection.prototype.parse = function(resp) {
return this.sync_status = !0, this.render_once = !1, resp.metamodel && (this.metamodel = resp.metamodel), 
"number" == typeof resp.total && (this.total = resp.total), "number" == typeof resp.page && (this.page = resp.page), 
void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
resp.models;
}, GenericCollection.prototype.setCurrentPage = function(page) {
this.page = page;
}, GenericCollection.prototype.getCurrentPage = function() {
return this.page;
}, GenericCollection.prototype.getTotal = function() {
return this.total;
}, GenericCollection;
}(Backbone.Collection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCollection = GenericCollection;
});
}.call(this), function() {
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
var HR, RecruitCandidateCodeUploadView, RecruitCandidateCodingView, RecruitCandidateCompileTestView, RecruitCandidateCompleteView, RecruitCandidateDesignView, RecruitCandidateFileUploadView, RecruitCandidateFooterView, RecruitCandidateInstructionsView, RecruitCandidateListView, RecruitCandidateMcqView, RecruitCandidateQuestionView, RecruitCandidateSideBarView, RecruitCandidateSubjectiveView, RecruitCandidateTestCaseView, RecruitCandidateTopBarView, RecruitCandidateUMLView, _ref;
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
"click .next-section":"sectionNext",
"click .js-solvelink":"handleNav"
}, RecruitCandidateListView.prototype.initialize = function() {
return this.model = HR.candidate.candidateAttemptModel, this.tid = HR.candidate.candidateTestModel.get("unique_id"), 
this.aid = this.model.get("id");
}, RecruitCandidateListView.prototype.render = function() {
var current_section, qi, questions, sections_mapping, solves, v;
return questions = this.model.get("questions"), solves = this.model.get("solve_mapping"), 
sections_mapping = this.model.get("sections_mapping"), current_section = this.model.get("section"), 
$(this.el).html(HR.appController.template(this.template, this)({
section_count:sections_mapping ? sections_mapping.length :1,
current_section:current_section ? current_section :1,
footer_copyright:!!HR.candidate.candidateTestModel.get("footer_copyright")
})), sections_mapping ? (qi = 0, _.each(sections_mapping, function(_this) {
return function(sec, i) {
var v;
return v = _this.getTable(questions.slice(qi, qi + parseInt(sec.questions)), qi + 1, solves, i + 1 !== current_section), 
_this.$("table.section" + (i + 1)).html(v), qi += parseInt(sec.questions);
};
}(this)), sections_mapping.length > 1 && current_section < sections_mapping.length && this.$("button.section-finish-" + current_section).removeClass("hidden")) :(v = this.getTable(questions, 1, solves), 
this.$("table.section1").html(v)), HR.candidate.lastQuestionViewed && setTimeout(function(_this) {
return function() {
return _this.$(".qlist-" + HR.candidate.lastQuestionViewed)[0] && _this.$(".qlist-" + HR.candidate.lastQuestionViewed)[0].scrollIntoView();
};
}(this)), this;
}, RecruitCandidateListView.prototype.getTable = function(questions, start, solves, disabled) {
var el, i, tid;
return null == disabled && (disabled = !1), tid = this.tid, i = start, el = "", 
_.each(questions, function(q) {
var ahref, s;
return s = "", s += 1 === i ? "<tr class='border qlist-" + i + "''>" :"<tr class='qlist-" + i + "'>", 
s += "<td width='5%' class='grey right'><span class='mdR'>Q" + i + "</span></td>", 
s += '<td width="46%"><a class="js-solvelink question-name" ', s += disabled ? ">" :"href='" + tid + "/questions/" + q.unique_id + "'>", 
s += q.name ? q.name :"Question <em class='fnt-sz-small grey' style='font-weight: 500;'> &nbsp;&nbsp; " + _.escape(q.preview) + "..</em>", 
s += "</a></td>", s += "<td width='12%' class='fnt-sz-mid'>" + window.istreet.cfg.hrqn[q.type] + "</td>", 
ahref = disabled ? "" :"href='" + tid + "/questions/" + q.unique_id + "'", s += _.has(solves, q.unique_id) ? "<td width='12%' class='fnt-sz-mid'><span class='green'>submitted</span></td><td width='19%' class='right'><a " + ahref + " class='normal-underline display-inline-block margin-right-15 fnt-sz-mid js-solvelink' style='margin: 9px 11px 9px 0;''>Modify Submission</a></td>" :"<td width='12%' class='fnt-sz-mid'>not answered</td><td width='19%' class='right'><a " + ahref + " class='btn btn-line margin-right-15 fnt-sz-mid js-solvelink'>Solve Question</a></td>", 
s += "</tr>", i++, el += s;
}), el;
}, RecruitCandidateListView.prototype.handleNav = function(e) {
var me;
return e.preventDefault(), me = this.$(e.currentTarget), HR.candidate.ongoingQuestionNavigation ? void 0 :(HR.candidate.ongoingQuestionNavigation = !0, 
setTimeout(function() {
return HR.candidate.ongoingQuestionNavigation = !1;
}, 1e4), HR.candidate.attemptRefreshNeeded = !0, HR.router.navigate(me.attr("href"), {
trigger:!0,
replace:!0
}));
}, RecruitCandidateListView.prototype.testDone = function() {
return HR.util.confirm({
title:"Confirm test close",
message:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",
okButtonText:"Yes, close this test.",
cancelButtonText:"No, go back.",
okCallback:function() {
return function() {
return HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateTestModel.save({
how:"userclick"
}, {
success:function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
});
}, RecruitCandidateListView.prototype.sectionNext = function(e) {
return HR.util.confirm({
title:"Confirm section close",
message:"You will not be able access this section again.<br><br>Are you sure?",
okButtonText:"Yes, move to next section.",
cancelButtonText:"No, stay.",
okCallback:function(_this) {
return function() {
return HR.candidate.candidateAttemptModel.set("section_close", _this.$(e.currentTarget).attr("data-section")), 
HR.candidate.candidateAttemptModel.save(null, {
success:function() {
return HR.router.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
},
error:function() {
return HR.router.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
});
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
var a, qtype;
return qtype = this.model.get("type"), _.contains([ "code", "approx", "textAns", "design" ], qtype) ? this.view ? (a = {
type:qtype,
answer:this.view.answer()
}, a.answer ? a :null) :null :null;
}, RecruitCandidateQuestionView.prototype.submitAnswer = function(e) {
var a, data, request_params;
return e.preventDefault(), a = {
type:this.model.attributes.type,
answer:this.view.answer()
}, a.answer ? (this.$(e.currentTarget).html("Submitting.."), this.$(e.currentTarget).attr("disabled", "disabled"), 
data = {
qid:this.model.get("unique_id"),
answer:a
}, request_params = {
url:"/recruit/attempts/" + HR.candidate.candidateAttemptModel.get("id") + "/solves",
data:data,
dataType:"json",
type:"POST",
success:function(_this) {
return function(xhr) {
var nextpath;
return _this.$(e.currentTarget).html("Done, redirecting.."), xhr.error ? _this.showError(xhr.error) :(nextpath = _this.model.get("nextqid") ? "" + _this.tid + "/questions/" + _this.model.get("nextqid") :"" + _this.tid + "/questions", 
HR.candidate.attemptRefreshNeeded = !0, HR.router.navigate("" + nextpath, {
trigger:!0,
replace:!0
}));
};
}(this),
error:function(_this) {
return function(xhr) {
_this.$(e.currentTarget).html("Submit answer & continue"), _this.$(e.currentTarget).removeAttr("disabled");
try {
return data = JSON.parse(xhr.responseText), data.error ? _this.showError(data.error) :_this.showError();
} catch (_error) {
return _this.showError();
}
};
}(this)
}, _.contains([ "file_upload", "code_upload" ], this.model.get("type")) !== !0 || _.isString(this.view.answer()) || (data = {
qid:this.model.get("unique_id")
}, request_params.iframe = !0, request_params.processData = !1, request_params.data = data, 
request_params.files = this.view.answer()), $.ajax(request_params)) :HR.util.alert({
title:"Submit error",
message:"Please answer the question before submitting."
});
}, RecruitCandidateQuestionView.prototype.showError = function(err) {
return null == err && (err = "Unable to save your answer."), HR.util.candidatemsg("" + err + "<br><br>Click continue to refresh question listing.<br><br><a href='" + this.tid + "/questions' class='backbone btn'>Continue</a>", !1);
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

case "design":
this.view = new HR.RecruitCandidateDesignView({
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

case "code_upload":
this.view = new HR.RecruitCandidateCodeUploadView({
question:this.question
});
break;

case "uml":
case "electrical":
this.view = new HR.RecruitCandidateUMLView({
question:this.question
});
break;

default:
viewfound = !1;
}
return this.question.name ? this.$(".qtitle").html("" + this.question.name + " (" + window.istreet.cfg.hrqn[this.question.type] + ")") :this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]), 
"complete" === this.question.type ? this.$(".challenge-text").html(problem_statement) :this.$(".challenge-text").html(this.question.question), 
viewfound ? this.$(".qcontent").html(this.view.render().el) :(this.$(".qcontent").html("<center>This question type is not available.</center>"), 
this.$(".ans-submit").addClass("disabled")), HR.candidate.lastQuestionViewed = this.model.get("qno"), 
setTimeout(function() {
return HR.util.scrollToTop();
}, 200), this;
}, RecruitCandidateQuestionView;
}(window.HR.GenericView), RecruitCandidateCodingView = function(_super) {
function RecruitCandidateCodingView() {
return RecruitCandidateCodingView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodingView, _super), RecruitCandidateCodingView.prototype.template = "recruit/question-coding", 
RecruitCandidateCodingView.prototype.className = "question-coding", RecruitCandidateCodingView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, window.error_marker_widgets = [], HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
HR.appView.saveCodeOnNavigate = !0) :this.aid = "testing", this.autoSaveNamespace = options.disableLocalStorage && options.disableLocalStorage === !0 ? null :"" + this.aid + "-" + this.question.unique_id, 
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
}(this), function() {
return function() {
return HR.util.candidatemsg("Unable to load code editor.<br><br> Check your internet connection, and refresh the page to fix this.", !1);
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
compile_button_text:"Run Code",
submit_button_text:"Submit code & Continue",
showSubmit:!0,
showCustomInput:this.showCustomInput(),
dynamicMode:!0,
lang_line_nos:this.question.line_nos,
enableIntellisense:!0,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, ("True" === this.test.get("hide_compile_test") || "True" === this.question.hide_compile_test) && (opts.showCompileTest = !1), 
"testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !1), opts.showCompileTest !== !1 && (opts.showCompileTest = !0), 
this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh"), this.$("#editor").codeshell("onChange", function(_this) {
return function(e, change) {
return _this.deleteMarkersOnSource(e, change);
};
}(this)), this.set_answer(), setTimeout(function(_this) {
return function() {
return _this.setDefaultText = !0;
};
}(this), 3e3);
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
return this.question.custom_testcase_allowed && "False" === this.question.custom_testcase_allowed ? !1 :!0;
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
return $(".bb-compile").removeClass("disabled"), HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("Could not compile as server is unreachable.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.checkForResult = function(that, data, e) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var expected_output, i, input, msg, output, output_debug, pass, score, st_class, _i, _len, _ref;
if (0 === m.get("status")) return HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e);
}, 2e3), void 0;
if (0 !== m.get("status")) if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage")), 
that.addMarkersOnSource(m); else if (pass = 0, m.get("customtestcase")) HR.candidate.ctview.setStatus("Compiled successfully.", "orange"), 
input = m.get("stdin")[0], output = m.get("stdout")[0], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[0] :null, 
st_class = "txt-green", HR.candidate.ctview.addTestCase(1, input, output, output_debug, null, "", st_class, score); else {
for (_ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[i] :null, 
msg = m.get("testcase_message")[i], 1 === m.get("testcase_status")[i] ? (st_class = "txt-green", 
pass++) :st_class = "txt-orange", m.get("score") && _.isNumber(m.get("score")[i]) && (score = m.get("score")[i]), 
HR.candidate.ctview.addTestCase(i + 1, input, output, output_debug, expected_output, msg, st_class, score);
0 === m.get("testcase_status").length ? HR.candidate.ctview.setStatus("Compiled successfully.", "orange") :0 === pass ? HR.candidate.ctview.setStatus("No test cases passed.", "red") :i > pass ? "runalltestcases" === e ? HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " test cases passed.", "orange") :HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange") :"runalltestcases" !== e ? (HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green"), 
_this.$(".bb-runall").show(), that.compileAnswer("runalltestcases", data)) :HR.candidate.ctview.setStatus("Compiled successfully. All test cases passed!", "green");
}
return HR.util.scrollToBottom(1e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, $(".bb-compile").removeClass("disabled"), HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateCodingView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", this.question.solve.answer) :void 0;
}, RecruitCandidateCodingView.prototype.checkCopyPaste = function(change) {
var added_text;
if (this.setDefaultText && (added_text = change.text.join(""), added_text !== this.lastAddedText)) return this.lastAddedText = added_text, 
"paste" === change.origin && added_text.length > 100 ? HR.candidate.secureActivity.add({
action:"paste",
eid:9,
qid:this.question.unique_id,
insertTime:new Date()
}) :void 0;
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
}, RecruitCandidateCodingView.prototype.deleteMarkersOnSource = function(e, change) {
var editor, i;
if (e && change && HR.candidate && HR.candidate.candidateAttemptModel && "True" === HR.candidate.candidateAttemptModel.get("secure") && this.checkCopyPaste(change), 
0 !== window.error_marker_widgets.length) {
editor = window.codeEditor;
for (i in window.error_marker_widgets) editor.removeLineWidget(window.error_marker_widgets[i]);
return this.$("#editor").codeshell("refresh"), window.error_marker_widgets = [];
}
}, RecruitCandidateCodingView;
}(window.HR.GenericView), RecruitCandidateDesignView = function(_super) {
function RecruitCandidateDesignView() {
return this.hideLoading = __bind(this.hideLoading, this), RecruitCandidateDesignView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateDesignView, _super), RecruitCandidateDesignView.prototype.template = "recruit/question-design", 
RecruitCandidateDesignView.prototype.className = "question-design", RecruitCandidateDesignView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, this.aid = HR.candidate && HR.candidate.candidateAttemptModel ? HR.candidate.candidateAttemptModel.get("id") :"testing", 
this.autoSaveNamespace = "testing" === this.aid ? "" + this.aid + "-" + this.test.id + "-" + this.question.id :"" + this.aid + "-" + this.question.unique_id, 
this;
}, RecruitCandidateDesignView.prototype.events = {
"click .bb-compile":"renderAnswer"
}, RecruitCandidateDesignView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.$("#runstatus").load(this.hideLoading), this.show_template = !1, HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this), function() {
return function() {
return HR.util.alert({
message:"There was an error loading the code editor. Please refresh the page."
});
};
}(this)), this;
}, RecruitCandidateDesignView.prototype.applyCodeshell = function() {
var opts, tabs, tabs_tooltip;
return opts = {
languages:this.question.languages,
language:"html",
autoSaveNamespace:this.autoSaveNamespace,
lang_template:this.getLangDefaults(),
showNonEditableHeadTail:this.show_template,
compile_button_text:"Render",
submit_button_text:"Submit code & Continue",
showSubmit:!0,
languageChangeStyle:"tabs",
showCustomInput:!1,
dynamicMode:!0,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, "testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !0), 
opts.showCompileTest !== !1 && (opts.showCompileTest = !0), this.$("#editor").codeshell(opts), 
this.$("#select-lang").addClass("hidden"), this.$("#select-lang-tabs").remove(), 
tabs = "<div id='select-lang-tabs'> <div class='pull-left btn-group'>", this.question.languages.forEach(function(v) {
return tabs += "<a class='cursor btn btn-white " + (v === opts.language ? "active" :void 0) + "' data-lang='" + v + "'>" + lang_display_mapping[v] + "</a>";
}), tabs += "</div> </div>", tabs_tooltip = $("<span class=' pull-left icon-help-circled txt-blue psT psB psL' data-toggle='tooltip' data-placement='right' title='The tabs on the left help you view the corresponding code segment.'></span>").tooltip(), 
tabs = $(tabs), tabs.find("a").on({
click:function(_this) {
return function(e) {
return e.preventDefault(), tabs.find("a").removeClass("active"), _this.$("#editor").codeshell("saveLangCode"), 
_this.$("#editor").codeshell("changeLanguage", _this.$(e.currentTarget).addClass("active").data("lang"));
};
}(this)
}), this.$("#editor > div.grey-header").prepend(tabs.append(tabs_tooltip)), $("#render-help").remove(), 
this.$("#editor .bb-compile").parent().prepend($("<span id='render-help' class='pull-left icon-help-circled txt-blue psT psB psR' data-toggle='tooltip' data-placement='left' title='Press \"Render\" Button to view the visual output of your code. Press \"Submit code & Continue\" to submit your answer. '></span>").tooltip()), 
this.$("#editor").codeshell("refresh"), this.set_answer(), setTimeout(function(_this) {
return function() {
return _this.setDefaultText = !0;
};
}(this), 3e3);
}, RecruitCandidateDesignView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateDesignView.prototype.hideLoading = function() {
return this.$(".bb-compile").length ? (this.setStatus("Document prepared successfully.", "green"), 
this.$(".bb-compile").removeClass("disabled"), this.$("#runstatus-load").addClass("hidden"), 
this.$("#runstatus").removeClass("hidden")) :void 0;
}, RecruitCandidateDesignView.prototype.renderAnswer = function(e, data) {
var form_elem;
if (!$(".bb-compile").hasClass("disabled")) return this.$(".bb-compile").addClass("disabled").data("status", "sending"), 
"testing" !== this.aid ? (HR.candidate.dtmodel = new HR.CandidateDesignTestModel(), 
HR.candidate.dtmodel.setAid(this.aid), HR.candidate.dtmodel.setQid(this.question.unique_id)) :(HR.candidate.dtmodel = new HR.RecruitDesignTestModel(), 
HR.candidate.dtmodel.setQid(this.question.id), HR.candidate.dtmodel.setTid(this.test.id)), 
this.$("#runstatus").addClass("hidden"), this.$("#runstatus-load").removeClass("hidden"), 
data = this.answer(), this.setStatus("Preparing the document...", "black"), "testing" !== this.aid ? HR.candidate.dtmodel.save(data, {
success:function(_this) {
return function(m) {
return _this.setStatus("Loading document.."), _this.$("#runstatus").attr("src", m.url()), 
HR.util.scrollToBottom(1e3);
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.dtmodel = null, _this.setStatus("There was an issue with rendering this code.", "red");
};
}(this)
}) :(form_elem = $('<form target="runstatus" action="' + HR.candidate.dtmodel.url() + '" method="post">\n<input type="hidden" name="testing_design" />\n</form>'), 
form_elem.find('input[name="testing_design"]').val(JSON.stringify(data)), form_elem.submit());
}, RecruitCandidateDesignView.prototype.answer = function() {
return this.$("#editor").codeshell("value", !0);
}, RecruitCandidateDesignView.prototype.setStatus = function(s, additional_class) {
return null == additional_class && (additional_class = ""), this.$(".output-area-wrap").removeClass("hidden"), 
this.$(".status-msg").html(s), "" !== additional_class ? this.$(".status-msg").addClass(additional_class) :void 0;
}, RecruitCandidateDesignView.prototype.set_answer = function() {
var m;
return this.question.solve ? (m = {}, _.each(this.question.solve.answer, function(data) {
return m[data.language] = data.code;
}), this.$("#editor").codeshell("setOption", "lang_template", m), this.$("#editor").codeshell("setValue", {
language:"html",
code:m.html
})) :void 0;
}, RecruitCandidateDesignView.prototype.checkCopyPaste = function(change) {
var added_text;
if (this.setDefaultText && (added_text = change.text.join(""), added_text !== this.lastAddedText)) return this.lastAddedText = added_text, 
"paste" === change.origin && added_text.length > 100 ? HR.candidate.secureActivity.add({
action:"paste",
eid:9,
qid:this.question.unique_id,
insertTime:new Date()
}) :void 0;
}, RecruitCandidateDesignView;
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
var answer, o;
return "mcq" === this.question.type ? (o = this.$("input[name=mcqopts]:checked").val(), 
answer = o ? o :this.question.solve ? -1 :null, this.question.explanation_box && "true" === this.question.explanation_box ? {
explanation:this.$("textarea[name=explanation]").val(),
answer:answer
} :answer) :(o = [], _.each(this.$("input[name=mcqopts]:checked"), function(_this) {
return function(e) {
return o.push(_this.$(e).val());
};
}(this)), o.length ? o :this.question.solve ? -1 :null);
}, RecruitCandidateMcqView.prototype.set_answer = function() {
var ans, metadata, _i, _len, _ref, _results;
if (this.question.solve) {
if ("mcq" !== this.question.type) {
for (_ref = this.question.solve.answer.answer, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) ans = _ref[_i], 
_results.push(this.$("input#mcqopts" + ans).prop("checked", !0));
return _results;
}
return this.$("input#mcqopts" + this.question.solve.answer.answer).prop("checked", !0), 
this.question.explanation_box && "true" === this.question.explanation_box && this.question.solve.metadata ? (metadata = JSON.parse(this.question.solve.metadata), 
this.$("textarea[name=explanation]").val(metadata.explanation)) :void 0;
}
}, RecruitCandidateMcqView;
}(window.HR.GenericView), RecruitCandidateSubjectiveView = function(_super) {
function RecruitCandidateSubjectiveView() {
return RecruitCandidateSubjectiveView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSubjectiveView, _super), RecruitCandidateSubjectiveView.prototype.template = "recruit/question-subjective", 
RecruitCandidateSubjectiveView.prototype.className = "question-subjective", RecruitCandidateSubjectiveView.prototype.initialize = function(options) {
return this.question = options.question, HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
this.autoSaveNamespace = "" + this.aid + "-" + this.question.unique_id, HR.appView.saveCodeOnNavigate = !0) :(this.aid = "testing", 
this.autoSaveNamespace = null);
}, RecruitCandidateSubjectiveView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.set_answer();
};
}(this)), this;
}, RecruitCandidateSubjectiveView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:[ "text" ],
language:"text",
autoSaveNamespace:this.autoSaveNamespace,
showSubmit:!1,
showCompileTest:!1,
dynamicMode:!0,
showCustomInput:!1,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return data.callback();
};
}(this)
}, this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh");
}, RecruitCandidateSubjectiveView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateSubjectiveView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", {
code:this.question.solve.answer.answer,
language:"text"
}) :void 0;
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
}(window.HR.GenericView), RecruitCandidateCodeUploadView = function(_super) {
function RecruitCandidateCodeUploadView() {
return RecruitCandidateCodeUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodeUploadView, _super), RecruitCandidateCodeUploadView.prototype.template = "recruit/question-code-upload", 
RecruitCandidateCodeUploadView.prototype.className = "question-code-upload", RecruitCandidateCodeUploadView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateCodeUploadView.prototype.events = function() {
return {
"click button[name=run-code]":"runCode"
};
}, RecruitCandidateCodeUploadView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), window.view = this, this;
}, RecruitCandidateCodeUploadView.prototype.enableRunCode = function() {
return this.$("button[name=run-code]").removeClass("disabled").removeAttr("disabled");
}, RecruitCandidateCodeUploadView.prototype.disableRunCode = function() {
return this.$("button[name=run-code]").addClass("disabled").attr("disabled", !0);
}, RecruitCandidateCodeUploadView.prototype.showError = function(error) {
return HR.candidate.ctview.setStatus(error);
}, RecruitCandidateCodeUploadView.prototype.runCode = function(e) {
var answer, data, request_params;
return this.$("#runstatus").empty(), this.disableRunCode(), answer = this.answer(), 
data = {}, data.customtestcase = !1, data.kind = "project", data.language = "maven", 
HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), answer ? (this.$("#runstatus").html(HR.candidate.ctview.render().el), 
HR.util.scrollToBottom(1e3), request_params = {
url:"/recruit/attempts/" + this.aid + "/questions/" + this.question.unique_id + "/compile_tests?allcases=" + !0,
data:data,
dataType:"json",
type:"POST",
success:function(_this) {
return function(xhr) {
return xhr.error ? (_this.enableRunCode(), _this.showError(xhr.error)) :(HR.candidate.ctmodel = new HR.CandidateCompileTestModel(), 
HR.candidate.ctmodel.setAid(_this.aid), HR.candidate.ctmodel.setQid(_this.question.unique_id), 
HR.candidate.ctmodel.set("id", xhr.model.id), HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), 
HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data, e);
}, 2e3));
};
}(this),
error:function(_this) {
return function(xhr) {
return _this.enableRunCode(), HR.candidate.ctview.setStatus(xhr.error);
};
}(this)
}, _.isString(answer) ? request_params.data.answer = answer :(request_params.iframe = !0, 
request_params.processData = !1, request_params.files = answer), $.ajax(request_params)) :(this.showError("Please upload a file"), 
void 0);
}, RecruitCandidateCodeUploadView.prototype.checkForResult = function(that, data, e) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var pass;
return 0 === m.get("status") ? (HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e);
}, 2e3), void 0) :(0 !== m.get("status") && (_this.enableRunCode(), m.get("upload_url") && (_this.show_answer(m.get("upload_url")), 
_this.uploaded_answer = m.get("upload_url")), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0 ? (HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage"))) :(pass = 0, 
m.get("signal") && 0 === m.get("signal")[0] ? (HR.candidate.ctview.setStatus("Build successful", "green"), 
HR.candidate.ctview.setSuccessfulCompileStatus("Build successful.", m.get("compilemessage"))) :(HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Build failed.", m.get("compilemessage"))))), 
HR.util.scrollToBottom(1e3));
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.ctmodel = null, _this.enableRunCode(), HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodeUploadView.prototype.answer = function() {
return $(":file").val() ? $(":file") :this.question.solve && this.question.solve.answer ? this.question.solve.answer :this.uploaded_answer ? this.uploaded_answer :!1;
}, RecruitCandidateCodeUploadView.prototype.set_answer = function() {
return this.question.solve ? this.show_answer(this.question.solve.answer) :void 0;
}, RecruitCandidateCodeUploadView.prototype.show_answer = function(answer) {
var html;
return html = HR.util.getFileAnchor(answer), this.$("#current_answer").html(html), 
this.$(".current-answer-section").removeClass("hidden");
}, RecruitCandidateCodeUploadView;
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
}(window.HR.GenericView), RecruitCandidateUMLView = function(_super) {
function RecruitCandidateUMLView() {
return this.saveUml = __bind(this.saveUml, this), RecruitCandidateUMLView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateUMLView, _super), RecruitCandidateUMLView.prototype.template = "recruit/question-uml", 
RecruitCandidateUMLView.prototype.className = "question-uml", RecruitCandidateUMLView.prototype.initialize = function(options) {
return this.question = options.question, HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
this.autoSaveNamespace = "" + this.aid + "-" + this.question.unique_id, HR.appView.saveCodeOnNavigate = !0) :(this.aid = "testing", 
this.autoSaveNamespace = null), this.umlStorageKey = this.autoSaveNamespace + "-" + this.question.hash, 
HR.appController.loadGraphLibraries(function(_this) {
return function() {
return _this.editor = new Editor();
};
}(this), function() {
return console.log("error");
});
}, RecruitCandidateUMLView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.set_answer();
};
}(this)), HR.appController.loadGraphLibraries(function(_this) {
return function() {
return _this.initializeUMLView();
};
}(this), function() {
return console.log("error");
}), this;
}, RecruitCandidateUMLView.prototype.initializeUMLView = function() {
var choices;
if (this.localSubmissionData = $.jStorage.get(this.umlStorageKey), this.xml = "", 
this.xml = this.localSubmissionData ? this.localSubmissionData.xml :null, this.question.custom_draw_menus) choices = this.question.custom_draw_menus; else switch (this.question.type) {
case "uml":
choices = [ "uml" ];
break;

case "electrical":
choices = [ "electrical" ];
break;

default:
choices = [];
}
return this.ui = new EditorUi(this.editor, choices, this.$("#geEditor")[0]), this.xml && this.ui && mxGraphFiles.load_xml(this.ui, this.xml), 
this.ui ? setTimeout(this.saveUml, 3e3) :void 0;
}, RecruitCandidateUMLView.prototype.saveUml = function() {
return this.saveUmlTimeout && ($.jStorage.set(this.umlStorageKey, mxGraphFiles.save(this.ui)), 
clearTimeout(this.saveUmlTimeout)), this.saveUmlTimeout = setTimeout(function(_this) {
return function() {
return _this.saveUml();
};
}(this), 3e3);
}, RecruitCandidateUMLView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:[ "text" ],
language:"text",
autoSaveNamespace:this.autoSaveNamespace,
showSubmit:!1,
showCompileTest:!1,
dynamicMode:!0,
showCustomInput:!1,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return data.callback();
};
}(this)
}, this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh");
}, RecruitCandidateUMLView.prototype.answer = function() {
var umlDiag;
return umlDiag = mxGraphFiles.save(this.ui), {
description:this.$("#editor").codeshell("value").code,
svg:umlDiag.svg,
xml:umlDiag.xml
};
}, RecruitCandidateUMLView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", {
code:this.question.solve.answer.answer,
language:"text"
}) :void 0;
}, RecruitCandidateUMLView;
}(window.HR.GenericView), RecruitCandidateFooterView = function(_super) {
function RecruitCandidateFooterView() {
return RecruitCandidateFooterView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateFooterView, _super), RecruitCandidateFooterView.prototype.template = "recruit/footer", 
RecruitCandidateFooterView.prototype.className = "footer", RecruitCandidateFooterView.prototype.initialize = function() {}, 
RecruitCandidateFooterView.prototype.render = function() {
var footer_copyright;
return $("footer").show(), footer_copyright = HR.candidate.candidateTestModel.get("footer_copyright"), 
$(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel.toJSON()
})), this;
}, RecruitCandidateFooterView;
}(window.HR.GenericView), RecruitCandidateTopBarView = function(_super) {
function RecruitCandidateTopBarView() {
return RecruitCandidateTopBarView.__super__.constructor.apply(this, arguments);
}
var TIME_LEFT_FOR_ALERT;
return __extends(RecruitCandidateTopBarView, _super), RecruitCandidateTopBarView.prototype.template = "recruit/topbar", 
RecruitCandidateTopBarView.prototype.className = "topbar", TIME_LEFT_FOR_ALERT = 300, 
RecruitCandidateTopBarView.prototype.fullScreeenMode = function() {
return screenfull && !(HR.candidate.candidateAttemptModel.get("attempt_done") && HR.candidate.candidateAttemptModel.get("attempt_done") === !0 || (clearTimeout(this.fullscreenTimer), 
this.fullscreenTimer = setTimeout(function(_this) {
return function() {
return screenfull.isFullscreen || 0 !== $(".hr-dialog").length || (_this.renderedDialog = !1), 
_this.fullScreeenMode();
};
}(this), 2e3), this.renderedDialog)) ? ("undefined" == typeof this.renderedDialog && document.addEventListener(screenfull.raw.fullscreenchange, function(_this) {
return function() {
return screenfull.isFullscreen || "logout" === HR.candidate.candidateTestModel.action ? void 0 :(_this.renderedDialog = !1, 
_this.fullScreeenMode());
};
}(this)), this.renderedDialog = !0, HR.util.alert({
title:"Switch to full screen mode",
message:"Please switch to full screen mode to proceed to test",
callback:function() {
return screenfull.enabled ? (Backbone.History.started && Backbone.history.stop(), 
Backbone.history.start({
pushState:!1,
root:"/tests"
}), Backbone.history.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/questions", !0), 
screenfull.request()) :void 0;
}
})) :void 0;
}, RecruitCandidateTopBarView.prototype.secureMonitoring = function() {
var logEvent;
if (!this.secureMonitoringActive && HR.candidate.candidateAttemptModel) return this.secureMonitoringActive = !0, 
logEvent = function(data) {
return data.insertTime = new Date(), HR.candidate.secureActivity.add(data);
}, window.onblur = function() {
return logEvent({
action:"blur",
eid:7
});
}, window.onfocus = function() {
return logEvent({
action:"focus",
eid:8
});
};
}, RecruitCandidateTopBarView.prototype.initialize = function() {
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
}, RecruitCandidateTopBarView.prototype.timerForSection = function() {
return HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("section_time_left") !== HR.candidate.candidateAttemptModel.get("time_left");
}, RecruitCandidateTopBarView.prototype.setAlertClass = function(time_left) {
return time_left < this.TIME_LEFT_FOR_ALERT ? $(".timerspan").addClass("alerttimer") :$(".timerspan").removeClass("alerttimer");
}, RecruitCandidateTopBarView.prototype.updateTimer = function() {
var time_left;
return time_left = this.getTimeLeft(), setTimeout(function(_this) {
return function() {
return $("#countdown-timer").countdown("destroy").countdown({
until:time_left,
layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",
compact:!0
}), $("#countdown-timer").countdown("option", "onExpiry", _this.testTimeUp), $("#countdown-timer").countdown("option", "tickInterval", 5), 
$("#countdown-timer").countdown("option", "onTick", function(a) {
return 0 === a[0] && 0 === a[1] && 0 === a[2] && 0 === a[3] && 0 === a[4] ? (time_left = 60 * a[5] + a[6], 
_this.setAlertClass(time_left)) :void 0;
}), _this.setAlertClass(time_left), _this.timerForSection() ? $("#timertag").html("to section end") :$("#timertag").html("to test end");
};
}(this));
}, RecruitCandidateTopBarView.prototype.render = function() {
var LONG_PING_TIME, QUICK_PING_TIME, interval, qcount, qdone;
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel,
attempt:HR.candidate.candidateAttemptModel,
showalert:this.getTimeLeft < this.TIME_LEFT_FOR_ALERT
})), HR.candidate.candidateAttemptModel.get("secure") && "True" === HR.candidate.candidateAttemptModel.get("secure") ? (this.secureMonitoring(), 
HR.requires([ "screenfull/dist/screenfull" ], function(_this) {
return function() {
return _this.fullScreeenMode();
};
}(this))) :HR.candidate.windowFocushookPresent || (HR.candidate.windowFocushookPresent = !0, 
window.onfocus = function() {
return function() {
return HR.candidate.windowBlurred = !1, HR.candidate.showFocusMessage ? (HR.candidate.showFocusMessage = !1, 
HR.util.alert({
title:"Refresh needed",
message:"The test state changed while you were away, and will be refreshed shortly.",
timeout:15,
callback:function() {
var uid;
if (HR.candidate && HR.candidate.candidateTestModel) return uid = HR.candidate.candidateTestModel.get("unique_id"), 
HR.router.navigate("" + uid + "/redirect", {
trigger:!0,
replace:!0
});
}
})) :void 0;
};
}(this), window.onblur = function() {
return function() {
return HR.candidate.windowBlurred = !0;
};
}(this)), this.updateTimer(), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateAttemptModel.get("attempt_done") ? HR.appView.setTopbarView() :(qdone = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping") || {}).length, 
qcount = HR.candidate.candidateAttemptModel.get("questions").length, this.$(".qdone").html(qdone), 
this.$(".qcount").html(qcount), this.$(".progress-done").css({
width:Math.floor(100 * qdone / qcount)
}), LONG_PING_TIME = 6e4, QUICK_PING_TIME = 1e4, interval = this.getTimeLeft() < 100 ? QUICK_PING_TIME :LONG_PING_TIME, 
HR.candidate.pingTimer = setInterval(function(_this) {
return function() {
var ans, dat, outerSection, saving, sectional;
return dat = {
pong:!0
}, HR.candidate.currentQuestion && (ans = HR.candidate.questionView.getAnswerToSave(), 
saving = !1, ans && (saving = !0, dat.to_save_code = ans, dat.qid = HR.candidate.questionView.model.get("unique_id"))), 
saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Saving draft.."), 
HR.candidate.candidateTestModel ? (sectional = HR.candidate.candidateTestModel.get("sectional"), 
sectional && (outerSection = HR.candidate.candidateAttemptModel.get("section")), 
HR.candidate.candidateAttemptModel.save({
data:dat
}, {
success:function(model) {
return saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Draft saved " + moment().format("hh:mm a")), 
HR.candidate.windowBlurred && (sectional && model.get("section") !== outerSection || model.get("attempt_done")) ? HR.candidate.showFocusMessage = !0 :HR.candidate.showFocusMessage ? void 0 :_this.updateTimer();
},
error:function() {
return saving ? HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Unable to save draft.") :void 0;
}
})) :void 0;
};
}(this), interval)), this;
}, RecruitCandidateTopBarView.prototype.testTimeUp = function() {
return HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("time_left") > 30 ? ($("#countdown-timer").countdown("destroy").html("Section done."), 
$(".timerspan").removeClass("alerttimer"), $("#timertag").empty(), HR.candidate.showFocusMessage = !1, 
HR.util.alert({
title:"Section closed",
message:"You have exceeded the time limit set for this section.<br><br>All answers you submitted before the time limit have been saved. You will automatically be moved to the next section shortly.",
timeout:15,
callback:function() {
var uid;
return uid = HR.candidate.candidateTestModel.get("unique_id"), HR.candidate.attemptRefreshNeeded = !0, 
HR.router.navigate("" + uid + "/redirect", {
trigger:!0,
replace:!0
});
}
})) :($("#countdown-timer").countdown("destroy").html("Test done."), $(".timerspan").removeClass("alerttimer"), 
$("#timertag").empty(), HR.candidate.showFocusMessage = !1, HR.util.alert({
title:"Test finished",
message:"Thank you for taking this test. You have exceeded the time limit set for this test.<br><br>All answers you submitted before the time limit have been saved.<br><br>You will shortly be redirected to the feedback page.",
timeout:60,
callback:function() {
return HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.candidateTestModel.save({
how:"forced"
}, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
}));
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
}, RecruitCandidateSideBarView.prototype.events = {
"click .js-navlink":"handleNav"
}, RecruitCandidateSideBarView.prototype.render = function() {
var url;
return HR.candidate.ongoingQuestionNavigation = !1, url = Backbone.history.fragment, 
$(this.el).html(HR.appController.template(this.template, this)), this.$(".fixed-nav").html(this.getTopIcons()), 
url.endsWith("questions") || url.endsWith("questions/") || (this.$(".questions-nav").html(this.getQuestionIcons()), 
HR.candidate.lastQuestionViewed && setTimeout(function(_this) {
return function() {
return _this.$(".qnav-" + HR.candidate.lastQuestionViewed)[0] && _this.$(".qnav-" + HR.candidate.lastQuestionViewed)[0].scrollIntoView(), 
_this.delegateEvents();
};
}(this))), this;
}, RecruitCandidateSideBarView.prototype.handleNav = function(e) {
var me, myhref;
return e.preventDefault(), me = this.$(e.currentTarget), me.hasClass("disabled") || HR.candidate.ongoingQuestionNavigation ? void 0 :(myhref = me.attr("href"), 
this.$(".js-navlink").removeAttr("href"), this.$(".js-navlink").addClass("disabled"), 
me.removeClass("disabled"), HR.candidate.attemptRefreshNeeded = !0, HR.candidate.ongoingQuestionNavigation = !0, 
setTimeout(function() {
return HR.candidate.ongoingQuestionNavigation = !1;
}, 1e4), HR.router.navigate(myhref, {
trigger:!0,
replace:!0
}));
}, RecruitCandidateSideBarView.prototype.getTopIcons = function() {
var cls, html, url;
return html = "", url = Backbone.history.fragment, cls = "", (url.endsWith("questions") || url.endsWith("questions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/questions" class="backbone js-navlink"><i class="nav-icon icon-list-bullet-large"></i></a></li>', 
cls = "", (url.endsWith("instructions") || url.endsWith("instructions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/instructions" class="backbone js-navlink"><i class="nav-icon icon-help-circled"></i></a></li>';
}, RecruitCandidateSideBarView.prototype.getQuestionIcons = function() {
var active, answered, answered_qs, elhtml, label, li_gen, q, qs, _i, _len, _ref;
for (elhtml = "", li_gen = function(answered, disabled, active, link, label) {
var act, ans, btnclass, dis, href;
return ans = answered ? "answered" :"not-answered", dis = disabled ? "disabled" :"", 
act = active ? "active" :"", btnclass = disabled || active ? "" :"js-navlink", href = disabled || active ? "" :"href='" + link + "'", 
'<li class="qnav-' + label + " " + ans + " " + dis + " " + act + '">\n  <a ' + href + ' class="' + btnclass + '">\n      <span class="quest-number">' + label + "</span>\n  </a>\n</li>";
}, qs = HR.candidate.candidateAttemptModel.get("questions"), answered_qs = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping")), 
label = 1, _i = 0, _len = qs.length; _len > _i; _i++) q = qs[_i], _ref = q.unique_id.toString(), 
answered = __indexOf.call(answered_qs, _ref) >= 0, active = q.unique_id === HR.candidate.currentQuestion, 
elhtml += q.disabled ? li_gen(answered, !0, active, "", label) :li_gen(answered, !1, active, "" + HR.candidate.candidateTestModel.get("unique_id") + "/questions/" + q.unique_id, label), 
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
}, RecruitCandidateCompileTestView.prototype.setSuccessfulCompileStatus = function(title, message) {
return this.$(".compile-header").html(title), this.$(".compile-message").html(message), 
this.$("#success-message").removeClass("hide");
}, RecruitCandidateCompileTestView.prototype.addTestCase = function(tno, input, output, output_debug, exp_output, compiler_msg, st_class, score) {
var tc;
return tc = new HR.RecruitCandidateTestCaseView({
tno:tno,
input:input,
output:output,
exp_output:exp_output,
st_class:st_class,
compiler_msg:compiler_msg,
output_debug:output_debug,
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
this.compiler_msg = o.compiler_msg, this.st_class = o.st_class, this.output_debug = o.output_debug, 
this.score = o.score;
}, RecruitCandidateTestCaseView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
tno:this.tno,
input:this.input,
output:this.output,
exp_output:this.exp_output,
compiler_msg:this.compiler_msg,
st_class:this.st_class,
output_debug:this.output_debug,
score:this.score
})), this;
}, RecruitCandidateTestCaseView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateListView = RecruitCandidateListView, 
HR.RecruitCandidateQuestionView = RecruitCandidateQuestionView, HR.RecruitCandidateCodingView = RecruitCandidateCodingView, 
HR.RecruitCandidateDesignView = RecruitCandidateDesignView, HR.RecruitCandidateMcqView = RecruitCandidateMcqView, 
HR.RecruitCandidateSubjectiveView = RecruitCandidateSubjectiveView, HR.RecruitCandidateCompleteView = RecruitCandidateCompleteView, 
HR.RecruitCandidateFileUploadView = RecruitCandidateFileUploadView, HR.RecruitCandidateUMLView = RecruitCandidateUMLView, 
HR.RecruitCandidateTopBarView = new RecruitCandidateTopBarView(), HR.RecruitCandidateFooterView = new RecruitCandidateFooterView(), 
HR.RecruitCandidateSideBarView = new RecruitCandidateSideBarView(), HR.RecruitCandidateCompileTestView = RecruitCandidateCompileTestView, 
HR.RecruitCandidateTestCaseView = RecruitCandidateTestCaseView, HR.RecruitCandidateInstructionsView = RecruitCandidateInstructionsView, 
HR.RecruitCandidateCodeUploadView = RecruitCandidateCodeUploadView;
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
var HR, RecruitCandidateLoginView, RecruitFacebookResumeView, RecruitInfoView, RecruitMessageView, RecruitMismatchView, _ref;
return RecruitCandidateLoginView = function(_super) {
function RecruitCandidateLoginView() {
return RecruitCandidateLoginView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateLoginView, _super), RecruitCandidateLoginView.prototype.template = "recruit/login", 
RecruitCandidateLoginView.prototype.className = "candidate-login", RecruitCandidateLoginView.prototype.events = {
"click .test-submit":"loginAction",
"click .test-submit-feedback":"submitFeedback",
"click .test-logout":"logoutTest",
"click .fblogin":"loginToFB",
"blur input.error":"removeError"
}, RecruitCandidateLoginView.prototype.initialize = function() {}, RecruitCandidateLoginView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes
})), this.model.get("facebook_login") && !window.fbAdded && (window.fbAdded = !0, 
$.getScript("/assets/fb.js")), this;
}, RecruitCandidateLoginView.prototype.removeError = function(e) {
return $(e.target).removeClass("error").closest(".error").removeClass("error");
}, RecruitCandidateLoginView.prototype.resetError = function() {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(""), $err.find("p").html(""), 
this.$(".formgroup").removeClass("error").find("[name]").removeClass("error"), $err.hide();
}, RecruitCandidateLoginView.prototype.setError = function(title, message, alertclass, field_name) {
var $err, duration, top;
return null == alertclass && (alertclass = null), null == field_name && (field_name = null), 
$err = this.$("#error-message"), $err.find("header").html(title), $err.find("p").html(message), 
alertclass && this.$("#error-message").addClass(alertclass), field_name && this.$("[name=" + field_name + "]").addClass("error").closest(".formgroup").addClass("error"), 
$err.show(), top = $err.position().top, duration = parseInt(top, 10) / 2, setTimeout(function() {
return $("html,body").animate({
scrollTop:top
}, duration);
}, 0);
}, RecruitCandidateLoginView.prototype.loginAction = function(e) {
var email, form_data, pass, put_data, request_params, that, uniqid;
return this.disableButton("test-submit"), that = this, e.preventDefault(), this.resetError(), 
email = this.$("input[name=username]").val(), pass = this.$("input[name=password]").val(), 
this.$("#acknowledge").is(":checked") ? (this.$("#acknowledge-alert").remove(), 
form_data = $("#test-login-form").serializeArray(), put_data = {}, _.each(form_data, function(item) {
return "gender" !== item.name ? put_data[item.name] = item.value :("on" === $("input#gender-m:checked").val() && (put_data.gender = "m"), 
"on" === $("input#gender-f:checked").val() ? put_data.gender = "f" :void 0);
}), put_data.tauth_key = this.model.auth, $("#acknowledge").is(":checked") && (put_data.acknowledge = "on"), 
uniqid = this.model.get("unique_id"), request_params = {
url:"/recruit/tests/" + uniqid + "/login",
data:put_data,
type:"POST",
success:function(_this) {
return function(xhr) {
var r;
return r = "string" == typeof xhr ? $.parseJSON($(xhr).text()) :xhr, HR.candidate.candidateTestModel.set(r.model), 
r.status ? (HR.util.trackTotango("Candidate Attempted", "Tests"), r.model.attempt_done ? HR.router.navigate("" + uniqid) :HR.router.navigate("" + uniqid + "/questions", {
trigger:!0,
replace:!0
}), void 0) :(_this.enableButton("test-submit"), that.setError(r.message.title, r.message.body, null, r.message.field_name));
};
}(this),
error:function(_this) {
return function(xhr) {
var r;
return _this.enableButton("test-submit"), r = "string" == typeof xhr.responseText ? $.parseJSON($(xhr.responseText).text()) :xhr.responseText, 
r && r.message ? that.setError(r.message.title, r.message.body, r.message.alertclass, r.message.field_name) :that.setError("Login error", "There was an issue logging into the test");
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.data = put_data, request_params.files = $(":file")), $.ajax(request_params), 
this) :(this.enableButton("test-submit"), !this.$("#acknowledge-alert").length > 0 && this.$("#login-form").before('<div class="text-center alert error error-message" id="acknowledge-alert"> You cannot take this test without agreeing to the specified conditions. </div>'), 
void 0);
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
return HR.clearCookies(), window.candidate = {}, this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>");
}, RecruitCandidateLoginView.prototype.disableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !0).addClass("disabled");
}, RecruitCandidateLoginView.prototype.enableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !1).removeClass("disabled");
}, RecruitCandidateLoginView.prototype.loginToFB = function() {
return window.location = this.model.get("facebook_login_url");
}, RecruitCandidateLoginView;
}(window.HR.GenericView), RecruitInfoView = function(_super) {
function RecruitInfoView() {
return RecruitInfoView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitInfoView, _super), RecruitInfoView.prototype.template = "recruit/instructiontabs", 
RecruitInfoView.prototype.className = "ins-tabs", RecruitInfoView.prototype.initialize = function(options) {
return this.subpage = options.subpage, this.public_url = options.public_url;
}, RecruitInfoView.prototype.events = {
"click .js-tablink":"tabClick",
"click .js-anchor":"anchorClick",
"click .js-gototop":"gotoTop"
}, RecruitInfoView.prototype.gotoTop = function(e) {
return e.preventDefault(), $("html, body").animate({
scrollTop:0
}, "slow");
}, RecruitInfoView.prototype.anchorClick = function(e) {
var sect;
return e.preventDefault(), sect = this.$(e.currentTarget).attr("name"), console.log(sect, "a[name=" + sect + "]"), 
this.$("a[name=" + sect + "]")[1].scrollIntoView();
}, RecruitInfoView.prototype.tabClick = function(e) {
var ele, href, tabid;
return e.preventDefault(), ele = this.$(e.currentTarget), tabid = ele.attr("id"), 
href = ele.attr("href"), ele.parent().parent().find("li").removeClass("active"), 
this.$("li#" + tabid).addClass("active"), this.$(".js-content").addClass("hidden"), 
this.$(".js-content-" + tabid).removeClass("hidden"), this.public_url ? HR.router.navigate(href, {
replace:!0,
trigger:!1
}) :void 0;
}, RecruitInfoView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
subpage:this.subpage,
public_url:this.public_url,
test:HR.candidate.candidateTestModel
})), this;
}, RecruitInfoView;
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
return $(this.el).html(HR.appController.template(this.template, this)({
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
}, $.ajax(req_params)) :new HR.util.ShowConfirmationDialog({
body:"Please enter a short profile about yourself.",
title:"Empty profile.",
buttons:[ {
name:"OK",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
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
test:this.model && this.model.attributes || {},
message:this.message
})), this;
}, RecruitMessageView;
}(window.HR.GenericView), RecruitMismatchView = function(_super) {
function RecruitMismatchView() {
return RecruitMismatchView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitMismatchView, _super), RecruitMismatchView.prototype.template = "recruit/candidatemismatch", 
RecruitMismatchView.prototype.className = "candidate-mismatch", RecruitMismatchView.prototype.events = {
"click .js-gotoother":"logoutGotoOther"
}, RecruitMismatchView.prototype.logoutGotoOther = function(e) {
return e.preventDefault(), HR.clearCookies(), HR.candidate.candidateTestModel = null, 
HR.candidate.candidateAttemptModel = null, HR.candidate.attemptRefreshNeeded = !1, 
HR.router.navigate(this.$(e.currentTarget).attr("href"), {
trigger:!0,
replace:!0
});
}, RecruitMismatchView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel.toJSON()
})), this;
}, RecruitMismatchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateLoginView = RecruitCandidateLoginView, 
HR.RecruitFacebookResumeView = RecruitFacebookResumeView, HR.RecruitMessageView = RecruitMessageView, 
HR.RecruitMismatchView = RecruitMismatchView, HR.RecruitInfoView = RecruitInfoView;
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
var CandidateActivityModel, CandidateAttemptModel, CandidateCompileTestModel, CandidateDesignTestModel, CandidateQuestionModel, CandidateSolveModel, CandidateTestModel, HR, _ref;
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
return this.aid = aid;
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
}(window.HR.GenericModel), CandidateDesignTestModel = function(_super) {
function CandidateDesignTestModel() {
return CandidateDesignTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateDesignTestModel, _super), CandidateDesignTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateDesignTestModel.__super__.initialize.call(this, attributes, options);
}, CandidateDesignTestModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateDesignTestModel.prototype.setQid = function(qid) {
this.qid = qid;
}, CandidateDesignTestModel.prototype.url = function() {
return this.id ? "/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/render/" + this.id :"/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/render";
}, CandidateDesignTestModel;
}(window.HR.GenericModel), CandidateActivityModel = function(_super) {
function CandidateActivityModel() {
return CandidateActivityModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateActivityModel, _super), CandidateActivityModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateActivityModel.__super__.initialize.call(this, attributes, options);
}, CandidateActivityModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateActivityModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid + "/logActivity";
}, CandidateActivityModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateTestModel = CandidateTestModel, 
HR.CandidateAttemptModel = CandidateAttemptModel, HR.CandidateSolveModel = CandidateSolveModel, 
HR.CandidateQuestionModel = CandidateQuestionModel, HR.CandidateCompileTestModel = CandidateCompileTestModel, 
HR.CandidateDesignTestModel = CandidateDesignTestModel, HR.CandidateActivityModel = CandidateActivityModel;
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
var CandidateActivityCollection, HR, _ref;
return CandidateActivityCollection = function(_super) {
function CandidateActivityCollection() {
return CandidateActivityCollection.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateActivityCollection, _super), CandidateActivityCollection.prototype.model = window.HR.CandidateActivityModel, 
CandidateActivityCollection.prototype.initialize = function() {
return this.limit || (this.limit = 10), this.page = 1, this.total = 0, this.on("add", this.pushEvent, this);
}, CandidateActivityCollection.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateActivityCollection.prototype.pushEvent = function(model) {
return model.setAid(this.aid), model.save();
}, CandidateActivityCollection.prototype.baseURL = function() {
return "";
}, CandidateActivityCollection.prototype.restURL = function() {
return "" + this.baseURL();
}, CandidateActivityCollection.prototype.getCurrentPage = function() {
return this.page;
}, CandidateActivityCollection.prototype.setPage = function(page) {
this.page = page;
}, CandidateActivityCollection.prototype.getTotal = function() {
return this.total;
}, CandidateActivityCollection.prototype.parse = function(resp, xhr) {
return this.total = resp.total, CandidateActivityCollection.__super__.parse.call(this, resp, xhr);
}, CandidateActivityCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateActivityCollection = CandidateActivityCollection;
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