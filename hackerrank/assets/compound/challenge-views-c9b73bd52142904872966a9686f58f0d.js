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
var ChallengeView, HR, _ref;
return ChallengeView = function(_super) {
function ChallengeView() {
return ChallengeView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeView, _super), ChallengeView.prototype.template = "challenge", 
ChallengeView.prototype.className = "challenge-view container", ChallengeView.prototype.events = {
"click a.hr-problem-link":"clickProblem",
"click a.hr-submissions-link":"clickSubmissions",
"click a.hr-leaderboard-link":"clickLeaderboard",
"click a.hr-forum-link":"clickForum",
"change #showPractice":"toggleLeaderboard",
"click .pagination a":"changePagination"
}, ChallengeView.prototype.initialize = function(options) {
return this.activeTab = options.activeTab, this.paramPage = options.paramPage, this.customView = options.customView, 
this.includePractice = !0, this.leaderboardFilter = options.leaderboardFilter, this.contest = new HR.model("contest"), 
this.contest.set("slug", this.model.get("contest_slug")), this.contest.cached(), 
this.listenTo(this.model, "reset", this.render), this.listenTo(this.contest, "reset", this.render);
}, ChallengeView.prototype.setTab = function(tab) {
return this.$("ul.nav-tabs li").removeClass("active"), this.$(tab).addClass("active");
}, ChallengeView.prototype.setProblem = function() {
var contest_slug, rendertournow;
return HR.appController.setTitle(this.title_leading + this.default_title_middle + this.title_ending), 
contest_slug = this.model.get("contest_slug"), this.setTab("#problemTab"), this.body = new HR.ChallengeTemplateView({
model:this.model
}), this.assign({
".challenge-body":this.body
}), window.touring && !window.tour_up && (window.tour_up = !0, (rendertournow = function(_this) {
return function() {
var tour_divs;
return tour_divs = [ ".hr_tour-challenge-name", ".hr_tour-problem-statement", ".hr_tour-select-language", ".hr_tour-code-solution", ".hr_tour-compile-test", ".hr_tour-submit-code" ], 
_.every(_.map(tour_divs, function(tdiv) {
return $(tdiv).length > 0;
}), _.identity) ? $("#hr_tour-intro-tour").joyride({
modal:!0,
expose:!0,
autoStart:!0,
tipAnimation:"fade",
preStepCallback:function(step) {
return 3 === step ? setTimeout(function() {
return _this.body.request_view.codeeditor.body.editor.focus();
}, 350) :void 0;
},
postStepCallback:function(step) {
var onb_variant;
return onb_variant = null, window.tourABTest && (onb_variant = window.tourABTest.get("variant"), 
window.tourABTest.updateStatus(100 + step)), mixpanel.track("tour-intro", {
step:step,
hacker:HR.profile().get("username"),
challenge:_this.model.get("slug"),
variant:onb_variant
}), 4 === step ? $(".hr_tour-submit-code").on("click", function() {
return $(".joyride-tip-guide[data-index=5] .joyride-close-tip").click();
}) :void 0;
}
}) :setTimeout(function() {
return rendertournow();
}, 300);
};
}(this))()), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data = {
landing:!1,
contest:contest_slug,
page_type:"challengepage",
challenge:this.model.get("slug")
};
}, ChallengeView.prototype.clickProblem = function(e) {
return e.preventDefault(), "/" + Backbone.history.fragment != "" + this.model.pageURL() ? (HR.router.navigate(this.model.pageURL(), !1), 
this.setProblem()) :void 0;
}, ChallengeView.prototype.setSubmissions = function(page) {
var challenge_slug, contest_slug, that;
return null == page && (page = 1), HR.appController.setTitle(this.title_leading + " Submissions" + this.title_ending), 
this.activeTab = "submissions", challenge_slug = this.model.get("slug"), contest_slug = this.model.get("contest_slug"), 
this.submissions || (this.submissions = HR.collection("submissions")), this.submissions.setPage(page), 
this.submissions.setContest(contest_slug), this.submissions.setChallenge(challenge_slug), 
this.submissions.cached(), that = this, HR.requires("compound/submission-views", function() {
return that.body = new HR.SubmissionsView({
collection:that.submissions
}), that.assign({
".challenge-body":that.body
}), that.setTab("#submissionsTab"), null === contest_slug && (contest_slug = "master"), 
HR.appController.set_contest_namespace(contest_slug), window.mixpanel_data = {
landing:!1,
contest:contest_slug,
page_type:"submissions",
challenge:challenge_slug
};
});
}, ChallengeView.prototype.clickSubmissions = function(e) {
return e.preventDefault(), "/" + Backbone.history.fragment != "" + this.model.pageURL() + "/submissions" ? (HR.router.navigate(this.model.pageURL() + "/submissions", !1), 
this.setSubmissions()) :void 0;
}, ChallengeView.prototype.setForum = function(page) {
var challenge_slug, contest_slug, question_collection, that;
return null == page && (page = 1), HR.appController.setTitle(this.title_leading + " Forum" + this.title_ending), 
this.activeTab = "forum", that = this, challenge_slug = this.model.get("slug"), 
contest_slug = this.model.get("contest_slug"), question_collection = new HR.QuestionCollection(), 
question_collection.page = page, question_collection.setChallengeSlug(challenge_slug), 
HR.requires("compound/forum-views", function() {
return that.body = new HR.ChallengeQuestionsView({
challenge:that.model,
collection:question_collection
}), that.assign({
".challenge-body":that.body
}, that.setTab("#forumTab")), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data = {
landing:!1,
contest:contest_slug,
challenge:challenge_slug
};
});
}, ChallengeView.prototype.clickForum = function(e) {
return e.preventDefault(), "/" + Backbone.history.fragment != "" + this.model.pageURL() + "/forum/questions" ? (HR.router.navigate(this.model.pageURL() + "/forum/questions", !1), 
this.setForum()) :void 0;
}, ChallengeView.prototype.setLeaderboard = function(page) {
var contest_slug, leaderboard_view;
return null == page && (page = 1), HR.appController.setTitle(this.title_leading + " Leaderboard" + this.title_ending), 
contest_slug = this.model.get("contest_slug"), this.activeTab = "leaderboard", this.leaderboard_collection || (this.leaderboard_collection = HR.collection("leaderboard"), 
this.leaderboard_collection.setPage(page), this.leaderboard_collection.setContestSlug(contest_slug), 
this.leaderboard_collection.setChallenge(this.model.get("slug")), this.leaderboard_collection.setChallengeLeaderboard(), 
this.leaderboard_collection.setIncludePractice(this.includePractice), this.leaderboardFilter && this.leaderboard_collection.setFiltersFromString(this.leaderboardFilter), 
this.leaderboard_collection.cached()), leaderboard_view = new HR.LeaderboardView({
collection:this.leaderboard_collection,
profile:HR.profile(),
contest:this.contest,
challenge:this.model
}), this.setTab("#leaderboardTab"), this.body = leaderboard_view, this.assign({
".challenge-body":this.body
}), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(this.model.get("contest_slug")), 
window.mixpanel_data = {
landing:!1,
contest:contest_slug
};
}, ChallengeView.prototype.clickLeaderboard = function(e) {
return e.preventDefault(), "/" + Backbone.history.fragment != "" + this.model.pageURL() + "/leaderboard" ? (HR.router.navigate(this.model.pageURL() + "/leaderboard", !1), 
this.setLeaderboard()) :void 0;
}, ChallengeView.prototype.toggleLeaderboard = function(e) {
return this.leaderboard_collection.setIncludePractice(e.currentTarget.checked), 
this.leaderboard_collection.cached({
fetch:!0
});
}, ChallengeView.prototype.changePagination = function(e) {
var href, page;
return "leaderboard" === this.activeTab ? (page = $(e.currentTarget).attr("data-page"), 
href = $(e.currentTarget).attr("href"), HR.router.navigate(href, !1), this.leaderboard_collection.setPage(page), 
this.leaderboard_collection.cached({
fetch:!0
}), !1) :void 0;
}, ChallengeView.prototype.render = function() {
return this.model.sync_status && this.contest.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model
})), this.header || (this.header = new HR.ChallengeHeaderView({
model:this.model,
contest:this.contest,
activeTab:this.activeTab
})), this.assign({
".challenge-header":this.header
}), this.renderBody(), this) :($(this.el).html(HR.appController.viewLoader(64)), 
this);
}, ChallengeView.prototype.renderBody = function() {
return this.bootstrapTitle(), this.customView ? (this.body = this.customView, this.assign({
".challenge-body":this.body
})) :"leaderboard" === this.activeTab ? this.setLeaderboard(this.paramPage || 1) :"submissions" === this.activeTab ? this.setSubmissions(this.paramPage || 1) :"forum" === this.activeTab ? this.setForum(this.paramPage || 1) :this.setProblem();
}, ChallengeView.prototype.bootstrapTitle = function() {
var cat, chap, chap_slug, chapter;
return chapter = this.model.get("track"), chap = null, cat = null, chapter && "master" === this.contest.get("slug") && (chap_slug = chapter.slug, 
cat = _.first(_.filter(HR.contest().get("categories"), function(_cat) {
return chap = _.first(_.filter(_cat.children, function(_chap) {
return _chap.slug === chap_slug;
})), null !== chap && void 0 !== chap;
})), chap = _.first(_.filter(cat.children, function(_chap) {
return _chap.slug === chap_slug;
}))), chap && chap.name && cat && cat.name ? (this.title_leading = this.model.get("name") + " :", 
this.default_title_middle = " Challenge", this.title_ending = " | " + chap.name + " | " + cat.name) :(this.title_leading = this.model.get("name") + " :", 
this.default_title_middle = " Challenge", this.title_ending = " | " + HR.contest().get("name"));
}, ChallengeView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengeView = ChallengeView;
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
var ChallengeHeaderView, HR;
return ChallengeHeaderView = function(_super) {
function ChallengeHeaderView() {
return ChallengeHeaderView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeHeaderView, _super), ChallengeHeaderView.prototype.template = "challenge-header", 
ChallengeHeaderView.prototype.className = "challenge-header-view", ChallengeHeaderView.prototype.initialize = function(options) {
return this.activeTab = options.activeTab, this.contest = options.contest, this.model.bind("change", this.render, this), 
this.model.bind("reset", this.render, this);
}, ChallengeHeaderView.prototype.render = function() {
var breadCrumbs, bread_crumbs_view;
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
contest:this.contest,
baseURL:this.model.pageURL(),
activeTab:this.activeTab
})), this.$(".apply-blob") && (this.apply_blob_view ? this.apply_blob_view.setElement(this.$(".apply-blob")) :(this.apply_blob_view = new HR.ViewShiv({
view:"apply-blob",
model:this.model,
el:this.$(".apply-blob")
}), this.add_subview(this.apply_blob_view)), this.apply_blob_view.render()), breadCrumbs = this.model.breadCrumbs(), 
breadCrumbs.remove(breadCrumbs.last()), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), breadCrumbs), 
this.add_subview(bread_crumbs_view), this;
}, ChallengeHeaderView;
}(window.HR.GenericView), HR = window.HR || {}, HR.ChallengeHeaderView = ChallengeHeaderView;
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
var ChallengeTemplateView, HR;
return ChallengeTemplateView = function(_super) {
function ChallengeTemplateView() {
return ChallengeTemplateView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeTemplateView, _super), ChallengeTemplateView.prototype.template = "challenge-template", 
ChallengeTemplateView.prototype.className = "challenge-template-view", ChallengeTemplateView.prototype.render = function() {
return $(this.el).html('<div class="challenge-content"></div><div class="challenge-request"></div><div class="challenge-response"></div>'), 
this.content_view || (this.content_view = new HR.ChallengeContentView({
parent:this,
model:this.model
})), this.request_view || (this.request_view = new HR.ChallengeRequestView({
parent:this,
model:this.model
})), this.response_view || (this.response_view = new HR.ChallengeResponseView({
parent:this,
model:this.model
})), this.assign({
".challenge-content":this.content_view,
".challenge-request":this.request_view,
".challenge-response":this.response_view
}), this;
}, ChallengeTemplateView;
}(window.HR.GenericView), HR = window.HR || {}, HR.ChallengeTemplateView = ChallengeTemplateView;
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
var ChallengeContentView, HR;
return ChallengeContentView = function(_super) {
function ChallengeContentView() {
return ChallengeContentView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeContentView, _super), ChallengeContentView.prototype.template = "challenge-content", 
ChallengeContentView.prototype.className = "challenge-content-view", ChallengeContentView.prototype.events = function() {
return {
"click .js-suggest-edits":"showSuggestionDiv",
"click .js-suggestion-save":"makeSuggestion",
"click .js-suggestion-cancel":"hideSuggestionDiv"
};
}, ChallengeContentView.prototype.initialize = function() {
return this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this);
}, ChallengeContentView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
baseURL:this.model.pageURL()
})), this;
}, ChallengeContentView.prototype.hideSuggestionDiv = function(e) {
return e.preventDefault(), $("#suggestion-form").slideToggle(), $(".js-suggest-edits").addClass("in");
}, ChallengeContentView.prototype.showSuggestionDiv = function(e) {
return e.preventDefault(), $("#suggestion-form").slideToggle(), $(".js-suggest-edits").removeClass("in");
}, ChallengeContentView.prototype.makeSuggestion = function(e) {
var form_data;
return $(e.currentTarget).html("Processing Request...").attr("disabled", "disabled"), 
e.preventDefault(), form_data = {
suggestion:$("#suggestion").val(),
challenge_id:this.model.get("id"),
challenge_url:"www.hackerrank.com/" + Backbone.history.fragment,
contest_slug:HR.appController.get_current_contest_slug()
}, $.ajax({
url:"/rest/challenge_edit_suggestion",
type:"POST",
data:form_data,
success:function(data) {
var error, i, len, _i;
if ($(e.currentTarget).removeAttr("disabled").html("Submit"), data.status) return $(".alert.error").hide(), 
$("#suggestion-form").slideToggle();
if (0 === data.errors.length) error = "Unknown Error"; else if (1 === data.errors.length) error = data.errors[0]; else {
for (error = "<ul style='text-align: left;'>", len = data.errors.length - 1, i = _i = 0; len >= 0 ? len >= _i :_i >= len; i = len >= 0 ? ++_i :--_i) error += "<li>" + data.errors[i] + "</li>";
error += "</ul>";
}
return $(".alert.error").show().html(error);
},
error:function(XMLHttpRequest, textStatus, code) {
return 403 === code ? $(".alert.error").show().html("Please log in to suggest an edit.") :$(".alert.error").show().html("Unknown Error");
}
}), this.dialog = new HR.util.ShowDialog(dialog_options), this.dialog.render();
}, ChallengeContentView;
}(window.HR.GenericView), HR = window.HR || {}, HR.ChallengeContentView = ChallengeContentView;
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
var ChallengeRequestView, HR;
return ChallengeRequestView = function(_super) {
function ChallengeRequestView() {
return ChallengeRequestView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeRequestView, _super), ChallengeRequestView.prototype.template = "challenge-request", 
ChallengeRequestView.prototype.className = "challenge-request-view", ChallengeRequestView.prototype.initialize = function(options) {
return this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), 
this.parent = options.parent;
}, ChallengeRequestView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)()), -1 !== $.inArray(this.model.get("kind"), [ "code", "game" ]) && (this.codeeditor || (this.codeeditor = new HR.CodeEditorView({
model:this.model,
parent:this
})), this.assign({
"div.codeeditor-wrapper":this.codeeditor
})), this;
}, ChallengeRequestView.prototype.unSetFullScreenView = function() {
return this.fullscreen_view = void 0;
}, ChallengeRequestView.prototype.setFullScreenView = function(fullscreen_view) {
return this.fullscreen_view = fullscreen_view;
}, ChallengeRequestView.prototype.unrenderFullScreenView = function() {
return this.fullscreen_view ? this.fullscreen_view.unRender() :void 0;
}, ChallengeRequestView;
}(window.HR.GenericView), HR = window.HR || {}, HR.ChallengeRequestView = ChallengeRequestView;
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
var ChallengeResponseView, HR;
return ChallengeResponseView = function(_super) {
function ChallengeResponseView() {
return ChallengeResponseView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeResponseView, _super), ChallengeResponseView.prototype.template = "challenge-response", 
ChallengeResponseView.prototype.className = "challenge-response-view", ChallengeResponseView.prototype.initialize = function() {
return this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this);
}, ChallengeResponseView.prototype.render = function() {
return $(this.el).html("<div class='output-progress padded hide light-wrap'></div>\n<div class='output-area-wrap hide'>\n  <div class='output-area padded light-wrap' id='output-area'></div>\n</div>"), 
this.renderSubView(), this;
}, ChallengeResponseView.prototype.renderSubView = function() {
return this.compile_test ? ("game" === this.model.get("kind") ? this.subview || (this.subview = new HR.GameCompileTestView({
model:this.compile_test,
parent:this
})) :"code" === this.model.get("kind") && (this.subview || (this.subview = new HR.CodeCompileTestView({
model:this.compile_test,
parent:this
}))), this.assign({
"#output-area":this.subview
}), this.showHideViews()) :this.clear();
}, ChallengeResponseView.prototype.setCompileTest = function(compile_test) {
return this.compile_test && (this.stopListening(this.compile_test), this.clear()), 
this.compile_test = compile_test, this.listenTo(this.compile_test, "reset", this.showHideViews), 
this.listenTo(this.compile_test, "change:id", this.showHideViews), this.render();
}, ChallengeResponseView.prototype.showHideViews = function() {
return this.compile_test.get("status") > 0 || _.isArray(this.compile_test.get("games")) && this.compile_test.get("games").length > 0 ? (this.$(".output-progress").addClass("hide"), 
this.$(".output-area-wrap").removeClass("hide")) :(this.$(".output-progress").removeClass("hide"), 
_.isNumber(this.compile_test.get("id")) ? this.compile_test.get("status_string") ? this.$(".output-progress").html(this.compile_test.get("status_string")) :this.$(".output-progress").html("Processing") :this.$(".output-progress").html("Uploading"));
}, ChallengeResponseView.prototype.showError = function() {
return this.$(".output-progress").html("<p class='error'>" + this.compile_test.get("error") + "</p>");
}, ChallengeResponseView.prototype.clear = function() {
return this.subview && (this.subview.destroy(), this.subview = void 0), this.$(".output-area").addClass("hide");
}, ChallengeResponseView;
}(window.HR.GenericView), HR = window.HR || {}, HR.ChallengeResponseView = ChallengeResponseView;
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
var FullScreenView, HR;
return FullScreenView = function(_super) {
function FullScreenView() {
return FullScreenView.__super__.constructor.apply(this, arguments);
}
return __extends(FullScreenView, _super), FullScreenView.prototype.el = "body", 
FullScreenView.prototype.template = "fullscreen", FullScreenView.prototype.initialize = function(options) {
return this.profile = HR.profile(), this.parent = options.parent, this.template_view = this.parent.parent.parent;
}, FullScreenView.prototype.render = function() {
var set_height, that;
return that = this, 0 === $(this.el).find("#fullscreen-wrapper").length && $(this.el).append("<div id='fullscreen-wrapper'></div>"), 
$(this.el).css("overflow-y", "hidden"), $(this.el).find("#fullscreen-wrapper").show(), 
$(this.el).find("#fullscreen-wrapper").height($(window).height()).html(_.template('<div class="left-sidebar"> <div class="challenge-content"></div> </div> <div class="separator"></div> <div class="right-sidebar"> <div class="challenge-request"></div> <div class="challenge-response"></div> </div> <div class="clearfix"></div>')({
model:this.model.toJSON()
})), this.$left_sidebar = $(this.el).find("#fullscreen-wrapper .left-sidebar"), 
this.$right_sidebar = $(this.el).find("#fullscreen-wrapper .right-sidebar"), this.$separator = $(this.el).find("#fullscreen-wrapper .separator"), 
set_height = function(_this) {
return function() {
return _this.$left_sidebar.height($(window).height()), _this.$right_sidebar.height($(window).height()), 
_this.$separator.height($(window).height());
};
}(this), set_height(), $(window).resize(set_height), this.template_view.request_view.setFullScreenView(this), 
this.assign({
".left-sidebar .challenge-content":this.template_view.content_view,
".right-sidebar .challenge-request":this.template_view.request_view,
".right-sidebar .challenge-response":this.template_view.response_view
}), $("div.separator").dragResize({
activeColor:"#AAA",
inactiveColor:"#DDD",
resize:function(pageX) {
var document_width, left_sidebar_width, left_sidebar_width_px, right_sidebar_width, right_sidebar_width_px, separator_width;
return separator_width = 7, document_width = $(window).width(), left_sidebar_width_px = pageX - 3, 
right_sidebar_width_px = document_width - (left_sidebar_width_px + 10), left_sidebar_width = 100 * (left_sidebar_width_px / document_width) + "%", 
right_sidebar_width = 100 * (right_sidebar_width_px / document_width) + "%", that.$left_sidebar.css("width", left_sidebar_width), 
that.$right_sidebar.css("width", right_sidebar_width);
}
}), this;
}, FullScreenView.prototype.unRender = function() {
return $(this.el).css("overflow-y", "visible"), $(this.el).find("#fullscreen-wrapper").length > 0 && $(this.el).find("#fullscreen-wrapper").unbind().remove(), 
this.template_view.request_view.unSetFullScreenView(this), this.template_view.render();
}, FullScreenView;
}(window.HR.GenericView), HR = window.HR || {}, HR.FullScreenView = FullScreenView;
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
var CodeEditorHeaderView, HR;
return CodeEditorHeaderView = function(_super) {
function CodeEditorHeaderView() {
return CodeEditorHeaderView.__super__.constructor.apply(this, arguments);
}
return __extends(CodeEditorHeaderView, _super), CodeEditorHeaderView.prototype.template = "codeeditor-header", 
CodeEditorHeaderView.prototype.className = "codeeditor-header-view", CodeEditorHeaderView.prototype.initialize = function(options) {
return this.MIME = window.lang_mime_mapping, this.default_head_end = window.default_head_end, 
this.default_tail_start = window.default_tail_start, this.parent = options.parent, 
this.profile = HR.profile() || {}, this.isFullscreened = !1;
}, CodeEditorHeaderView.prototype.events = {
"change #language-select":"setLanguageFromSelect",
"click .fullscreen":"popFullscreen",
"click .restorefullscreen":"restorefullscreen",
"click .revert":"revertCode",
"click .editor-mode-button":"setEditorModeClick",
"click .save-code":"saveCode",
"click .toggle-theme":"toggleTheme"
}, CodeEditorHeaderView.prototype.render = function() {
var render_editor, set_editor_mode, that;
return $(this.el).html(HR.appController.template(this.template, this)({
profile:this.profile
})), this.setUpLanguageSelect(), this.renderLangCode(), that = this, render_editor = function() {
return HR.appView.contentView.body.request_view.codeeditor.body.$(".CodeMirror").offset() ? HR.appView.contentView.body.request_view.codeeditor.header.renderLangCode() :setTimeout(render_editor, 200);
}, render_editor(), set_editor_mode = function() {
return that.parent.body.editor ? that.setEditorModeFromCookie() :setTimeout(set_editor_mode, 200);
}, set_editor_mode(), this;
}, CodeEditorHeaderView.prototype.renderLangCode = function() {
var lang_pref;
return lang_pref = $.cookie("hacker_language_pref"), this.set_lang_from_submission ? this.setLanguage(this.set_lang_from_submission_data.lang, this.set_lang_from_submission_data.code) :this.isAllowedLanguage(lang_pref) ? this.setLanguage(lang_pref, $.jStorage.get(this.getLocalStorageKey({
language:lang_pref
}))) :this.setLanguage(this.model.get("languages")[0]);
}, CodeEditorHeaderView.prototype.setLangFromSubmission = function(lang, code) {
return this.set_lang_from_submission = !0, this.set_lang_from_submission_data = {
lang:lang,
code:code
}, $.cookie("hacker_language_pref", lang, {
expires:365
}), this.setLanguage(this.set_lang_from_submission_data.lang, this.set_lang_from_submission_data.code);
}, CodeEditorHeaderView.prototype.setUpLanguageSelect = function() {
var data, languages;
return languages = this.model.get("languages"), data = [], _.each(languages.sort(), function() {
return function(lang) {
return data.push({
id:lang,
text:window.lang_display_mapping[lang]
});
};
}(this)), $(this.el).find("#language-select").select2({
data:data,
width:"off"
});
}, CodeEditorHeaderView.prototype.getLocalStorageKey = function(options) {
var key_user_part, language, slug;
return null == options && (options = {}), key_user_part = this.profile.get("id") ? this.profile.get("id") :"Guest", 
language = options.language || this.parent.header.getLanguage(), slug = options.slug || this.model.get("slug"), 
"HR-local-" + key_user_part + "-" + language + "-" + slug;
}, CodeEditorHeaderView.prototype.revertCode = function(e) {
var lang_pref;
return e.preventDefault(), lang_pref = $.cookie("hacker_language_pref"), this.set_lang_from_submission = !1, 
this.model.cached({
fetch:!0,
showLoader:!0,
success:function(_this) {
return function() {
return $.jStorage.deleteKey(_this.getLocalStorageKey({
language:lang_pref
})), _this.setLanguage(_this.getLanguage()), $(document).scrollTop($(_this.el).offset().top);
};
}(this)
});
}, CodeEditorHeaderView.prototype.getLanguage = function() {
return $(this.el).find("#language-select").val();
}, CodeEditorHeaderView.prototype.setLanguageFromSelect = function(e) {
var langSelect;
return e.preventDefault(), langSelect = $(this.el).find("#language-select").val(), 
this.isAllowedLanguage(langSelect) ? ($.cookie("hacker_language_pref", langSelect, {
expires:365
}), this.setLanguage(langSelect)) :void 0;
}, CodeEditorHeaderView.prototype.isAllowedLanguage = function(langSelect) {
var _allowed_languages;
return langSelect ? (_allowed_languages = this.model.get("languages"), -1 === _.indexOf(_allowed_languages, langSelect) ? !1 :!0) :!1;
}, CodeEditorHeaderView.prototype._stripTabs = function(string) {
var spaces, tab;
return spaces = new Array(4).join(" "), tab = "	", void 0 === string ? "" :string.split(tab).join(spaces);
}, CodeEditorHeaderView.prototype.setLanguage = function(langSelect, code) {
return null == code && (code = null), this.isAllowedLanguage(langSelect) ? ($(this.el).find("#language-select").val(langSelect), 
$(this.el).find(".select2-choice span").text(window.lang_display_mapping[langSelect]), 
this.setCodeEditor(langSelect, code)) :!1;
}, CodeEditorHeaderView.prototype.setEditorModeFromCookie = function() {
var editorPref;
return editorPref = $.cookie("hacker_editor_pref"), "vim" !== editorPref && "emacs" !== editorPref && "default" !== editorPref && (editorPref = "default"), 
this.setEditorMode(editorPref);
}, CodeEditorHeaderView.prototype.setEditorModeClick = function(e) {
var mode;
return e.preventDefault(), mode = this.$(e.target).data("editor"), this.setEditorMode(mode), 
this.parent.body.editor.focus();
}, CodeEditorHeaderView.prototype.setEditorMode = function(mode) {
return this.currentEditorMode = mode, $(this.el).find(".editor-mode-button").removeClass("disabled"), 
$(this.el).find("." + mode).addClass("disabled"), this.parent.body.editor && (this.parent.body.editor.setOption("keyMap", mode), 
this.parent.body.updateStatusBar(this.parent.body.editor)), $.cookie("hacker_editor_pref", mode, {
expires:365
});
}, CodeEditorHeaderView.prototype.setCodeEditor = function(langSelect, code) {
var editorValue, langKey, localStorageValue, _data;
return null == code && (code = null), this.isAllowedLanguage(langSelect) ? (langKey = langSelect + "_template", 
_data = this.model.get("_data"), this.parent.body.editor && (this.parent.body.editor.setOption("mode", this.MIME[langSelect]), 
localStorageValue = $.jStorage.get(this.getLocalStorageKey()), null !== code ? this.parent.body.editor.setValue(code) :_.isEmpty(localStorageValue) || "javascript" === langSelect ? this.model.get("saved_code") && this.model.get("saved_language") && this.model.get("saved_language") === langSelect ? this.setCodeEditor(this.model.get("saved_language"), this.model.get("saved_code")) :_data[langKey] ? (editorValue = _data[langKey + "_head"] && _data[langKey + "_tail"] ? this._stripTabs(_data[langKey + "_head"]) + "\n" + this.default_head_end[langSelect] + "\n" + this._stripTabs(_data[langKey]) + "\n" + this.default_tail_start[langSelect] + "\n" + this._stripTabs(_data[langKey + "_tail"]) :_data[langKey + "_head"] ? this._stripTabs(_data[langKey + "_head"]) + "\n" + this.default_head_end[langSelect] + "\n" + this._stripTabs(_data[langKey]) :_data[langKey + "_tail"] ? this._stripTabs(_data[langKey]) + "\n" + this.default_tail_start[langSelect] + "\n" + this._stripTabs(_data[langKey + "_tail"]) :this._stripTabs(_data[langKey]), 
this.parent.body.editor.setValue(editorValue)) :lang_default_text[langSelect] ? this.parent.body.editor.setValue(lang_default_text[langSelect]) :this.parent.body.editor.setValue("") :this.parent.body.editor.setValue(localStorageValue)), 
this.updateEditorStartLine(langSelect), this.foldEditorCode(), this) :!1;
}, CodeEditorHeaderView.prototype.foldEditorCode = function() {
var added_head, added_tail, clbk_head, clbk_tail, code, line, line_ctr, lines, _i, _len, _results;
if (this.parent.body.foldFunc && this.parent.body.editor) {
for (code = this.parent.body.editor.getValue(), line_ctr = 0, added_head = !1, added_tail = !1, 
lines = (code || "").split("\n"), _results = [], _i = 0, _len = lines.length; _len > _i; _i++) line = lines[_i], 
line_ctr += 1, added_head || added_tail || -1 === line.indexOf("Head ends") || (clbk_head = function() {
return {
from:{
ch:0,
line:0
},
to:{
ch:0,
line:line_ctr - 1
}
};
}, CodeMirror.newFoldFunction(clbk_head)(this.parent.body.editor, {}), added_head = !0), 
added_tail || -1 === line.indexOf("Tail starts") ? _results.push(void 0) :(clbk_tail = function() {
return {
from:{
ch:0,
line:line_ctr
},
to:{
ch:0,
line:lines.length
}
};
}, CodeMirror.newFoldFunction(clbk_tail)(this.parent.body.editor, {}), _results.push(added_tail = !0));
return _results;
}
}, CodeEditorHeaderView.prototype.updateEditorStartLine = function(langSelect) {
var langKey, skeliton_head_lines, _data;
return skeliton_head_lines = 0, _data = this.model.get("_data"), langKey = langSelect + "_skeliton", 
_data[langKey + "_head"] && (skeliton_head_lines = _data[langKey + "_head"].trim().split("\n").length), 
this.parent.body.editor ? this.parent.body.editor.setOption("firstLineNumber", skeliton_head_lines + 1) :void 0;
}, CodeEditorHeaderView.prototype.popFullscreen = function(e) {
return e.preventDefault(), this.parent.body.updateLocalStorage(), this.fullscreen || (this.fullscreen = new HR.FullScreenView({
model:this.model,
parent:this
})), this.fullscreen.render(), this.isFullscreened = !0, this.$(".fullscreen").addClass("force-hide"), 
this.$(".restorefullscreen").removeClass("force-hide");
}, CodeEditorHeaderView.prototype.restorefullscreen = function(e) {
return e.preventDefault(), this.parent.body.updateLocalStorage(), this.fullscreen.unRender(), 
this.isFullscreened = !1, this.$(".fullscreen").removeClass("force-hide"), this.$(".restorefullscreen").addClass("force-hide");
}, CodeEditorHeaderView.prototype.saveCode = function(e) {
return e.preventDefault(), $(e.currentTarget).html("saving..."), this.updateDatabaseVersion(e);
}, CodeEditorHeaderView.prototype.updateDatabaseVersion = function(e) {
var editor, header, language, success_callback, value;
return null == e && (e = null), header = HR.appView.contentView.body.request_view.codeeditor.header, 
editor = HR.appView.contentView.body.request_view.codeeditor.body.editor, void 0 !== header && void 0 !== editor ? (language = header.getLanguage(), 
value = editor.getValue(), success_callback = function() {
return e ? $(e.currentTarget).html("saved") :void 0;
}, this.model.save_code(language, value, success_callback)) :void 0;
}, CodeEditorHeaderView.prototype.toggleTheme = function() {
var cookie_value, editor_theme, swap_theme;
editor_theme = $.cookie("hacker_editor_theme"), editor_theme && "light" === editor_theme ? (cookie_value = "dark", 
swap_theme = "ambiance") :(cookie_value = "light", swap_theme = "default");
try {
return $.cookie("hacker_editor_theme", cookie_value), HR.appView.contentView.body.request_view.codeeditor.body.editor.setOption("theme", swap_theme);
} catch (_error) {}
}, CodeEditorHeaderView;
}(window.HR.GenericView), HR = window.HR || {}, HR.CodeEditorHeaderView = CodeEditorHeaderView;
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
var CodeEditorBodyView, HR, _ref;
return CodeEditorBodyView = function(_super) {
function CodeEditorBodyView() {
return CodeEditorBodyView.__super__.constructor.apply(this, arguments);
}
return __extends(CodeEditorBodyView, _super), CodeEditorBodyView.prototype.template = "codeeditor-body", 
CodeEditorBodyView.prototype.className = "codeeditor-body-view", CodeEditorBodyView.prototype.initialize = function(options) {
return this.parent = options.parent, this.profile = HR.profile(), this.model.bind("reset", this.render, this), 
this.model.bind("change", this.render, this), window.error_marker_widgets = [], 
this.throttledSaveCode = _.throttle(this.updateLocalStorage, 1e3);
}, CodeEditorBodyView.prototype.setCompileTest = function(compile_test) {
return this.compile_test = compile_test, this.listenTo(this.compile_test, "change:error_markers", this.addMarkersOnSource);
}, CodeEditorBodyView.prototype.addMarkersOnSource = function() {
var editor, error_markers, error_message, i, line_number, line_offset, marker_node, markers, total_lines;
if (this.compile_test.get("error_markers")) {
editor = HR.appView.contentView.body.request_view.codeeditor.body.editor, error_markers = this.compile_test.get("error_markers"), 
line_offset = error_markers.head_code_lines, total_lines = editor.lineCount(), markers = error_markers.markers;
for (i in markers) error_message = markers[i].message, line_number = markers[i].line_number - line_offset, 
total_lines >= line_number && (marker_node = $("<div class='error-marker'><span class='error-marker-icon'>X</span>" + error_message + "</div>"), 
window.error_marker_widgets.push(editor.addLineWidget(line_number - 1, marker_node[0], {
above:!0
})));
return editor.refresh();
}
}, CodeEditorBodyView.prototype.deleteMarkersOnSource = function() {
var editor, i;
if (0 !== window.error_marker_widgets.length) {
editor = HR.appView.contentView.body.request_view.codeeditor.body.editor;
for (i in window.error_marker_widgets) editor.removeLineWidget(window.error_marker_widgets[i]);
return editor.refresh(), window.error_marker_widgets = [];
}
}, CodeEditorBodyView.prototype.updateLocalStorage = function() {
var editor, error, header, key, value;
try {
HR.appView.contentView.body.request_view.codeeditor.header;
} catch (_error) {
return error = _error, void 0;
}
return header = HR.appView.contentView.body.request_view.codeeditor.header, editor = HR.appView.contentView.body.request_view.codeeditor.body.editor, 
void 0 !== header && void 0 !== editor ? (key = header.getLocalStorageKey(), value = editor.getValue(), 
"" === value ? $.jStorage.deleteKey(key) :$.jStorage.set(key, value), "saved" === header.$(".save-code").html() ? header.$(".save-code").html("save code") :void 0) :void 0;
}, CodeEditorBodyView.prototype.updateStatusBar = function(cm) {
var $statusbar, modeText;
return $statusbar = $(this.el).find("#codeeditor-statusbar"), modeText = function() {
switch (cm.options.keyMap) {
case "vim":
return "-- VIM --";

case "vim-insert":
return "-- INSERT --";

case "emacs":
return "EMACS";

case "emacs-Ctrl-X":
return "C-x-";

default:
return "";
}
}(), $("#statusbar-mode").text(modeText);
}, CodeEditorBodyView.prototype.updatePosition = function(cm) {
var pos;
return pos = cm.doc.getCursor(), $("#statusbar-line").text("Line: " + (pos.line + 1)), 
$("#statusbar-col").text("Col: " + (pos.ch + 1));
}, CodeEditorBodyView.prototype.updateCharCount = function(cm) {
var numChars;
return numChars = cm.doc.getValue().length, $("#statusbar-count").text("Count: " + numChars);
}, CodeEditorBodyView.prototype.render = function() {
var $codeeditor, editorOptions, editor_theme, that, theme;
return $(this.el).html(HR.appController.template(this.template, this)()), $codeeditor = this.$("#codeeditor").get(0), 
0 === this.$("#codeeditor").siblings(".CodeMirror").length && void 0 !== $codeeditor && (this.foldFunc = CodeMirror.newFoldFunction(CodeMirror.autoFold), 
that = this, editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
autoCloseBrackets:!0,
cursorScrollMargin:2,
extraKeys:{
"Ctrl-Q":function(cm) {
return cm.foldCode(cm.getCursor());
},
"Ctrl-/":function(cm) {
return CodeMirror.commands.toggleComment(cm);
}
},
foldGutter:!0,
gutters:[ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ],
mode:"text/x-csrc",
indentUnit:4,
tabSize:4
}, this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), editor_theme = $.cookie("hacker_editor_theme"), 
theme = editor_theme && "light" === editor_theme ? "default" :"ambiance", this.editor.setOption("theme", theme), 
this.editor.on("gutterClick", this.foldFunc), this.editor.on("change", this.throttledSaveCode), 
this.editor.on("update", this.updateStatusBar), this.editor.on("cursorActivity", this.updatePosition), 
this.editor.on("change", this.updateCharCount), this.editor.on("change", this.deleteMarkersOnSource)), 
this.parent.header.setCodeEditor(this.parent.header.getLanguage()), this;
}, CodeEditorBodyView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CodeEditorBodyView = CodeEditorBodyView;
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
var CodeEditorFooterView, HR;
return CodeEditorFooterView = function(_super) {
function CodeEditorFooterView() {
return CodeEditorFooterView.__super__.constructor.apply(this, arguments);
}
return __extends(CodeEditorFooterView, _super), CodeEditorFooterView.prototype.template = "codeeditor-footer", 
CodeEditorFooterView.prototype.className = "codeeditor-footer-view", CodeEditorFooterView.prototype.initialize = function(options) {
return null == options && (options = {}), this.profile = HR.profile(), this.parent = options.parent, 
this.profile.bind("change", this.updateSubmitButton, this), this.profile.bind("reset", this.updateSubmitButton, this);
}, CodeEditorFooterView.prototype.events = {
"click .access-buttons button.compile":"compileAndTest",
"click .access-buttons button.submit":"submitPopup",
"change #customtestcase":"customTestcase",
"click .upload_file":"confirmUploadFileDialog"
}, CodeEditorFooterView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
profile:this.profile
})), this.updateSubmitButton(), this;
}, CodeEditorFooterView.prototype.confirmUploadFileDialog = function(e) {
var dialog, that;
return e.preventDefault(), this.showConfirmUpload() ? this.uploadFileDialog() :(that = this, 
dialog = new HR.util.ShowConfirmationDialog({
title:"Attn: Upload file",
body:"<p>Uploading a file will replace the content of your current codeeditor. Would you like to continue?</p> <p class='gray-text' style='font-size: 14px;'> <input id='confirm-upload-checkbox' type='checkbox' class='confirm-upload'> <label style='display: inline-block; font-weight: normal;' for='confirm-upload-checkbox'>skip this alert next time</label> </p>",
buttons:[ {
name:"No",
"class":"hr_secondary-btn hr-dialog-button",
callback:function(dialog) {
return that.toggleConfirmUpload(dialog.$body().find("input.confirm-upload").is(":checked")), 
this.setInactive(), dialog.destroy();
}
}, {
name:"Yes",
"class":"hr_primary-btn hr-dialog-button",
callback:function(dialog) {
return that.toggleConfirmUpload(dialog.$body().find("input.confirm-upload").is(":checked")), 
this.setInactive(), dialog.destroy(), that.uploadFileDialog();
}
} ]
}), dialog.render());
}, CodeEditorFooterView.prototype.toggleConfirmUpload = function(flag) {
return $.cookie("code_upload_as_file", flag === !1);
}, CodeEditorFooterView.prototype.showConfirmUpload = function() {
return "false" === $.cookie("code_upload_as_file") ? !0 :!1;
}, CodeEditorFooterView.prototype.uploadFileDialog = function() {
var buttons, dialog, fields, language_options, that;
return that = this, language_options = {}, language_options["auto-detect"] = "Auto Detect", 
language_options["current-language"] = "Current Language", _.each(this.model.get("languages"), function(k) {
return language_options[k] = window.lang_display_mapping[k];
}), fields = [ {
name:"source_file",
title:"Source File",
type:"file"
}, {
name:"language",
title:"Language",
type:"select",
options:language_options
}, {
name:"challenge_id",
value:that.model.get("id"),
type:"hidden"
}, {
name:"contest_id",
value:that.model.get("contest_id"),
type:"hidden"
}, {
name:"current_language",
value:that.parent.header.getLanguage(),
type:"hidden"
}, {
name:"is_file_upload",
value:"1",
type:"hidden"
} ], buttons = [ {
name:"Upload",
callback:function(dialog) {
var $form, btn, formData;
return btn = this, $form = dialog.$form(), formData = new FormData($form[0]), btn.unSetFailedMsg(), 
$.ajax({
url:"/rest/upload_respawn",
type:"POST",
data:formData,
cache:!1,
contentType:!1,
processData:!1,
success:function(data) {
return btn.setInactive(), data.ok ? that.parent.header.setLanguage(data.data.language, data.data.source) ? dialog.destroy() :btn.failed("Language not supported for this challenge") :btn.failed(data.message);
}
});
}
} ], dialog = new HR.util.ShowFormDialog({
title:"Upload Dialog",
width:650,
enctype:"multipart/form-data",
fields:fields,
buttons:buttons
}), dialog.render();
}, CodeEditorFooterView.prototype.updateSubmitButton = function() {
var submit_text;
return this.profile.isLoggedIn() ? (submit_text = this.model.get("compile_and_test") ? "Submit Code" :"Submit", 
$(this.el).find("button.submit").html(submit_text)) :$(this.el).find("button.submit").html("Login to Submit");
}, CodeEditorFooterView.prototype.submitPopup = function(e) {
var dialog, error, that, _timeoutFn;
return e.preventDefault(), that = this, "disabled" !== $(e.currentTarget).attr("btn-disabled") ? ($(e.currentTarget).attr("btn-disabled", "disabled"), 
$(e.currentTarget).addClass("disabled"), $.inArray(this.model.get("id"), HR.CHALLENGES_DISABLED) >= 0 || HR.CONTEST_DISABLED ? (error = new HR.util.ShowSubmitDisabledDialog(), 
error.render(), void 0) :this.profile.isLoggedIn() ? ($(e.currentTarget).html("Submitting"), 
dialog = new HR.util.ShowConfirmationDialog({
title:"Confirm Submission",
body:"Are you sure you want to submit this code?",
onDestroy:function() {
return that.updateSubmitButton(), $(e.currentTarget).removeAttr("btn-disabled"), 
$(e.currentTarget).removeClass("disabled");
},
buttons:[ {
name:"No, do not submit",
"class":"hr_secondary-btn hr-dialog-button",
callback:function(dialog) {
return that.model && that.model.get && that.parent && that.parent.header && HR.profile() && mixpanel.track("Submit Code", {
challenge:that.model.get("slug"),
contest:that.model.get("contest_slug"),
kind:that.model.get("kind"),
language:that.parent.header.getLanguage(),
fullscreen:that.parent.header.isFullscreened,
editor:that.parent.header.currentEditorMode,
username:HR.profile().username
}), this.setInactive(), dialog.destroy();
}
}, {
name:"Yes, submit my code",
"class":"hr_primary-btn hr-dialog-button",
callback:function(dialog) {
var btn, submission;
return that.model && that.model.get && that.parent && that.parent.header && HR.profile() && mixpanel.track("Submit Code", {
challenge:that.model.get("slug"),
contest:that.model.get("contest_slug"),
kind:that.model.get("kind"),
language:that.parent.header.getLanguage(),
fullscreen:that.parent.header.isFullscreened,
editor:that.parent.header.currentEditorMode,
username:HR.profile().username
}), btn = this, that.submitLock && that.submitLock === !0 ? void 0 :"" !== that.parent.header.getLanguage() ? (this.setInactive(), 
that.submitLock = !0, $.jStorage.deleteKey(that.parent.header.getLocalStorageKey()), 
submission = HR.model("submission", {
code:that.parent.body.editor.getValue(),
language:that.parent.header.getLanguage(),
contest_slug:that.model.contest_slug || that.model.get("contest_slug")
}), submission.setChallenge(that.model), submission.save(null, {
success:function(model, response) {
return _gaq.push([ "_trackPageview", "/submitcode/" + (that.model.get("contest_slug") || that.model.contest_slug) + "/" + that.model.slug + "/" ]), 
HR.QUEUED_SUBMISSIONS || (HR.QUEUED_SUBMISSIONS = {}), HR.QUEUED_SUBMISSIONS[model.get("id")] = !0, 
that.submitLock = !1, response.status ? (dialog.destroy(), that.parent.parent.unrenderFullScreenView(), 
model.set("kind", that.model.get("kind"), {
silent:!0
}), HR.router.navigate(model.pageURL(), !0), $("html body").animate({
scrollTop:0
}, 300)) :dialog.showError(response.message);
}
})) :(this.setInactive(), dialog.showError("Select a language!"));
}
} ]
}), dialog.render()) :($(e.currentTarget).html("Logging in"), _timeoutFn = function() {
return that.profile.isLoggedIn() ? ($(e.currentTarget).removeAttr("btn-disabled"), 
$(e.currentTarget).removeClass("disabled"), $(e.currentTarget).click()) :setTimeout(_timeoutFn, 100);
}, dialog = new HR.util.ShowLoginDialog({
body_text:"Please login in order to submit",
onDestroy:function() {
return that.updateSubmitButton(), $(e.currentTarget).removeAttr("btn-disabled"), 
$(e.currentTarget).removeClass("disabled");
},
success_callback:function() {
return setTimeout(_timeoutFn, 100);
},
show_sign_up_link:!0
}), dialog.render(), void 0)) :void 0;
}, CodeEditorFooterView.prototype.customTestcase = function(e) {
var checked;
return checked = $(e.currentTarget).attr("checked"), checked ? this.$("#custominput").slideDown() :this.$("#custominput").slideUp();
}, CodeEditorFooterView.prototype.compileAndTest = function(e) {
var codeeditor_body_view, compile_test, response_view;
return e.preventDefault(), response_view = this.parent.parent.parent.response_view, 
codeeditor_body_view = this.parent.body, codeeditor_body_view.deleteMarkersOnSource(), 
"disabled" === $(e.currentTarget).attr("btn-disabled") || _.isEmpty(this.parent.header.getLanguage()) ? void 0 :($(e.currentTarget).attr("btn-disabled", "disabled"), 
$(e.currentTarget).addClass("disabled"), compile_test = new HR.CompileTestModel({
code:this.parent.body.editor.getValue(),
language:this.parent.header.getLanguage()
}), compile_test.setChallenge(this.model), this.$("#customtestcase").attr("checked") ? (compile_test.set("customtestcase", !0), 
compile_test.set("custominput", this.$("#custominput").val())) :compile_test.set("customtestcase", !1), 
compile_test.save(), compile_test.bind("change:status", this.enableCompileTest, this), 
response_view.setCompileTest(compile_test), codeeditor_body_view.setCompileTest(compile_test));
}, CodeEditorFooterView.prototype.enableCompileTest = function(model, status) {
var error;
return status > 0 && (this.$("button.compile").removeAttr("btn-disabled"), this.$("button.compile").removeClass("disabled"), 
error = model.get("error")) ? this.parent.parent.parent.response_view.showError() :void 0;
}, CodeEditorFooterView;
}(window.HR.GenericView), HR = window.HR || {}, HR.CodeEditorFooterView = CodeEditorFooterView;
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
var CodeEditorView, HR, _ref;
return CodeEditorView = function(_super) {
function CodeEditorView() {
return CodeEditorView.__super__.constructor.apply(this, arguments);
}
return __extends(CodeEditorView, _super), CodeEditorView.prototype.template = "codeeditor", 
CodeEditorView.prototype.className = "codeeditor-view", CodeEditorView.prototype.initialize = function(options) {
return this.model = options.model, this.parent = options.parent, this.profile = HR.profile();
}, CodeEditorView.prototype.events = {
"click #codeshell-wrapper a.toggle-theme":"toggleTheme",
"click #codeshell-wrapper a.fullscreen":"makeFullscreen",
"click #codeshell-wrapper a.restorefullscreen":"restoreFullscreen",
"click #codeshell-wrapper button.upload_file":"confirmUploadFileDialog",
"codeshellcompile #codeshell-wrapper":"compileTest",
"codeshellsubmit #codeshell-wrapper":"submitPopup"
}, CodeEditorView.prototype.render = function() {
return $(this.el).html("<div id='codeshell-wrapper'></div>"), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this)), this;
}, CodeEditorView.prototype.applyCodeshell = function() {
var editor_theme;
return this.$("#codeshell-wrapper").codeshell($.extend({
showCustomInput:this.model.get("compile_and_test") && this.model.get("custom_case"),
showCompileTest:this.model.get("compile_and_test"),
showSubmit:!0,
showUploadCode:!0,
showFullScreen:!0,
showTheme:!0,
foldCode:!0,
dynamicMode:!0,
languages:this.model.get("languages"),
autoSaveNamespace:"hr-cedit-contest:" + HR.contest().get("id") + "-challenge:" + this.model.get("id"),
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, this.model.getLanguageTemplates())), editor_theme = $.cookie("hacker_editor_theme"), 
this.$("#codeshell-wrapper").codeshell("setOption", "theme", this.getThemeName(editor_theme)), 
this.$("#codeshell-wrapper").codeshell("refresh"), this.$("#codeshell-wrapper").codeshell("onChange", this.deleteMarkersOnSource);
}, CodeEditorView.prototype.toggleTheme = function() {
var cookie_value, editor_theme;
editor_theme = $.cookie("hacker_editor_theme"), cookie_value = editor_theme && "light" === editor_theme ? "dark" :"light";
try {
return $.cookie("hacker_editor_theme", cookie_value), this.$("#codeshell-wrapper").codeshell("setOption", "theme", this.getThemeName(cookie_value));
} catch (_error) {}
}, CodeEditorView.prototype.getThemeName = function(slug) {
return "dark" === slug ? "ambiance" :"default";
}, CodeEditorView.prototype.makeFullscreen = function() {
return this.$("#codeshell-wrapper").codeshell("saveLangCode"), this.fullscreen || (this.fullscreen = new HR.FullScreenView({
model:this.model,
parent:this
})), this.fullscreen.render(), this.isFullscreened = !0, this.$(".fullscreen").addClass("force-hide"), 
this.$(".restorefullscreen").removeClass("force-hide");
}, CodeEditorView.prototype.restoreFullscreen = function() {
return this.$("#codeshell-wrapper").codeshell("saveLangCode"), this.fullscreen.unRender(), 
this.isFullscreened = !1, this.$(".fullscreen").removeClass("force-hide"), this.$(".restorefullscreen").addClass("force-hide");
}, CodeEditorView.prototype.confirmUploadFileDialog = function() {
var dialog, that;
return this.showConfirmUpload() ? this.uploadFileDialog() :(that = this, dialog = new HR.util.ShowConfirmationDialog({
title:"Attn: Upload file",
body:"<p>Uploading a file will replace the content of your current codeeditor. Would you like to continue?</p> <p class='gray-text' style='font-size: 14px;'> <input id='confirm-upload-checkbox' type='checkbox' class='confirm-upload'> <label style='display: inline-block; font-weight: normal;' for='confirm-upload-checkbox'>skip this alert next time</label> </p>",
buttons:[ {
name:"No",
"class":"hr_secondary-btn hr-dialog-button",
callback:function(dialog) {
return that.toggleConfirmUpload(dialog.$body().find("input.confirm-upload").is(":checked")), 
this.setInactive(), dialog.destroy();
}
}, {
name:"Yes",
"class":"hr_primary-btn hr-dialog-button",
callback:function(dialog) {
return that.toggleConfirmUpload(dialog.$body().find("input.confirm-upload").is(":checked")), 
this.setInactive(), dialog.destroy(), that.uploadFileDialog();
}
} ]
}), dialog.render());
}, CodeEditorView.prototype.toggleConfirmUpload = function(flag) {
return $.cookie("code_upload_as_file", flag === !1);
}, CodeEditorView.prototype.showConfirmUpload = function() {
return "false" === $.cookie("code_upload_as_file") ? !0 :!1;
}, CodeEditorView.prototype.uploadFileDialog = function() {
var buttons, dialog, fields, language_options, that;
return that = this, language_options = {}, language_options["auto-detect"] = "Auto Detect", 
language_options["current-language"] = "Current Language", _.each(this.model.get("languages"), function(k) {
return language_options[k] = window.lang_display_mapping[k];
}), fields = [ {
name:"source_file",
title:"Source File",
type:"file"
}, {
name:"language",
title:"Language",
type:"select",
options:language_options
}, {
name:"challenge_id",
value:that.model.get("id"),
type:"hidden"
}, {
name:"contest_id",
value:that.model.get("contest_id"),
type:"hidden"
}, {
name:"current_language",
value:$("#codeshell-wrapper").codeshell("getOptions").language,
type:"hidden"
}, {
name:"is_file_upload",
value:"1",
type:"hidden"
} ], buttons = [ {
name:"Upload",
callback:function(dialog) {
var $form, btn, formData;
return btn = this, $form = dialog.$form(), formData = new FormData($form[0]), btn.unSetFailedMsg(), 
$.ajax({
url:"/rest/upload_respawn",
type:"POST",
data:formData,
cache:!1,
contentType:!1,
processData:!1,
success:function(data) {
return btn.setInactive(), data.ok ? that.$("#codeshell-wrapper").codeshell("getOptions").lang_display_mapping[data.data.language] ? HR.appController.loadCodeMirrorMode(data.data.language, function() {
return function() {
return that.$("#codeshell-wrapper").codeshell("setValue", {
language:data.data.language,
code:data.data.source
}), dialog.destroy();
};
}(this)) :btn.failed("Language not supported for this challenge") :btn.failed(data.message);
}
});
}
} ], dialog = new HR.util.ShowFormDialog({
title:"Upload Dialog",
width:650,
enctype:"multipart/form-data",
fields:fields,
buttons:buttons
}), dialog.render();
}, CodeEditorView.prototype.compileTest = function(e, data) {
var $btn, codeeditor_body_view, compile_test, response_view;
if (0 !== _.size(data) && (response_view = this.parent.parent.response_view, codeeditor_body_view = this.parent.body, 
this.deleteMarkersOnSource(), $btn = $(e.currentTarget).find("button.bb-compile"), 
"disabled" !== $btn.attr("btn-disabled") && !_.isEmpty($("#codeshell-wrapper").codeshell("getOptions").language))) return $btn.attr("btn-disabled", "disabled"), 
$btn.addClass("disabled"), compile_test = new HR.CompileTestModel({
code:data.code,
language:data.language
}), compile_test.setChallenge(this.model), data.custominput ? (compile_test.set("customtestcase", !0), 
compile_test.set("custominput", data.custominput)) :compile_test.set("customtestcase", !1), 
compile_test.save(), compile_test.bind("change:status", this.enableCompileTest, this), 
compile_test.bind("change:error_markers", this.addMarkersOnSource, this), response_view.setCompileTest(compile_test);
}, CodeEditorView.prototype.addMarkersOnSource = function(model, error_markers) {
var editor, error_message, i, line_number, line_offset, marker_node, markers, total_lines;
if (error_markers) {
window.error_marker_widgets || (window.error_marker_widgets = []), editor = this.$("#codeshell-wrapper").codeshell("getEditor"), 
line_offset = error_markers.head_code_lines, total_lines = editor.lineCount(), markers = error_markers.markers;
for (i in markers) error_message = markers[i].message, line_number = markers[i].line_number - line_offset, 
total_lines >= line_number && (marker_node = $("<div class='error-marker'><span class='error-marker-icon'>X</span>" + error_message + "</div>"), 
window.error_marker_widgets.push(editor.addLineWidget(line_number - 1, marker_node[0], {
above:!0
})));
return editor.refresh();
}
}, CodeEditorView.prototype.deleteMarkersOnSource = function() {
var editor, i;
if (window.error_marker_widgets && 0 !== window.error_marker_widgets.length) {
editor = this.$("#codeshell-wrapper").codeshell("getEditor");
for (i in window.error_marker_widgets) editor.removeLineWidget(window.error_marker_widgets[i]);
return editor.refresh(), window.error_marker_widgets = [];
}
}, CodeEditorView.prototype.enableCompileTest = function(model, status) {
var error;
return status > 0 && (this.$("#codeshell-wrapper").codeshell("enableCompileBtn"), 
error = model.get("error")) ? this.parent.parent.response_view.showError() :void 0;
}, CodeEditorView.prototype.submitPopup = function(e, data) {
var $btn, dialog, error, that, _timeoutFn;
return that = this, $btn = $(e.currentTarget).find("button.bb-submit"), "disabled" !== $btn.attr("btn-disabled") ? ($btn.attr("btn-disabled", "disabled"), 
$btn.addClass("disabled"), $.inArray(this.model.get("id"), HR.CHALLENGES_DISABLED) >= 0 || HR.CONTEST_DISABLED ? (error = new HR.util.ShowSubmitDisabledDialog(), 
error.render(), void 0) :this.profile.isLoggedIn() ? ($btn.html("Submitting"), dialog = new HR.util.ShowConfirmationDialog({
title:"Confirm Submission",
body:"Are you sure you want to submit this code?",
onDestroy:function() {
return $btn.removeAttr("btn-disabled"), $btn.removeClass("disabled");
},
buttons:[ {
name:"No, do not submit",
"class":"hr_secondary-btn hr-dialog-button",
callback:function(dialog) {
return that.model && that.model.get && HR.profile() && mixpanel.track("Submit Code", {
challenge:that.model.get("slug"),
contest:that.model.get("contest_slug"),
kind:that.model.get("kind"),
language:$("#codeshell-wrapper").codeshell("getOptions").language,
fullscreen:that.isFullscreened,
username:HR.profile().username
}), this.setInactive(), dialog.destroy();
}
}, {
name:"Yes, submit my code",
"class":"hr_primary-btn hr-dialog-button",
callback:function(dialog) {
var btn, submission;
return that.model && that.model.get && HR.profile() && mixpanel.track("Submit Code", {
challenge:that.model.get("slug"),
contest:that.model.get("contest_slug"),
kind:that.model.get("kind"),
language:$("#codeshell-wrapper").codeshell("getOptions").language,
fullscreen:that.isFullscreened,
username:HR.profile().username
}), btn = this, that.submitLock && that.submitLock === !0 ? void 0 :"" !== $("#codeshell-wrapper").codeshell("getOptions").language ? (this.setInactive(), 
that.submitLock = !0, $("#codeshell-wrapper").codeshell("deleteLangCode"), submission = HR.model("submission", {
code:data.code,
language:data.language,
contest_slug:that.model.contest_slug || that.model.get("contest_slug")
}), submission.setChallenge(that.model), submission.save(null, {
success:function(model, response) {
return _gaq.push([ "_trackPageview", "/submitcode/" + (that.model.get("contest_slug") || that.model.contest_slug) + "/" + that.model.slug + "/" ]), 
HR.QUEUED_SUBMISSIONS || (HR.QUEUED_SUBMISSIONS = {}), HR.QUEUED_SUBMISSIONS[model.get("id")] = !0, 
that.submitLock = !1, response.status ? (dialog.destroy(), that.parent.unrenderFullScreenView(), 
model.set("kind", that.model.get("kind"), {
silent:!0
}), HR.router.navigate(model.pageURL(), !0), $("html body").animate({
scrollTop:0
}, 300)) :dialog.showError(response.message);
}
})) :(this.setInactive(), dialog.showError("Select a language!"));
}
} ]
}), dialog.render()) :($btn.html("Logging in"), _timeoutFn = function() {
return that.profile.isLoggedIn() ? ($btn.removeAttr("btn-disabled"), $btn.removeClass("disabled"), 
$btn.click()) :setTimeout(_timeoutFn, 100);
}, dialog = new HR.util.ShowLoginDialog({
body_text:"Please login in order to submit",
onDestroy:function() {
return $btn.removeAttr("btn-disabled"), $btn.removeClass("disabled");
},
success_callback:function() {
return setTimeout(_timeoutFn, 100);
},
show_sign_up_link:!0
}), dialog.render(), void 0)) :void 0;
}, CodeEditorView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CodeEditorView = CodeEditorView;
});
}.call(this);