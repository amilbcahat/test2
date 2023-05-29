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
"click a.hr-editorial-link":"clickEditorial",
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
}), _.identity) ? HR.requires("jquery-plugins/jquery.joyride", function() {
return $("#hr_tour-intro-tour").joyride({
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
});
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
this.listenTo(question_collection, "question:link:clicked", this.clickForumQuestion), 
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
}, ChallengeView.prototype.setEditorial = function() {
var challenge_slug, contest_slug, editorial, hacker, options, that;
return HR.appController.setTitle(this.title_leading + " Editorial" + this.title_ending), 
this.activeTab = "editorial", that = this, challenge_slug = this.model.get("slug"), 
contest_slug = this.model.get("contest_slug"), hacker = HR.profile(), options = {
challenge_slug:challenge_slug
}, editorial = HR.model("editorial", options).cached(), HR.requires("compound/extra-views", function() {
return that.body = new HR.EditorialView({
model:editorial,
current_hacker:hacker
}), that.assign({
".challenge-body":that.body
}), that.setTab("#editorialTab"), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data = {
landing:!1,
contest:contest_slug,
challenge:challenge_slug
};
});
}, ChallengeView.prototype.clickEditorial = function(e) {
return e.preventDefault(), "/" + Backbone.history.fragment != "" + this.model.pageURL() + "/editorial" ? (HR.router.navigate(this.model.pageURL() + "/editorial", !1), 
this.setEditorial()) :void 0;
}, ChallengeView.prototype.clickForumQuestion = function(question_model) {
return HR.router.navigate(this.model.pageURL() + "/forum/questions/" + question_model.id, !1), 
this.setForumQuestion(question_model);
}, ChallengeView.prototype.setForumQuestion = function(question_model) {
var full_question_model;
return full_question_model = new HR.QuestionModel({
challenge_slug:this.model.get("slug"),
contest_slug:this.model.get("contest_slug"),
id:question_model.id
}), this.body = new HR.QuestionView({
challenge:this.model,
model:full_question_model
}), this.assign({
".challenge-body":this.body
}), this.setTab("#forumTab");
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
return this.model.sync_status && this.contest.sync_status ? this.model.get("body") ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model
})), this.header || (this.header = new HR.ChallengeHeaderView({
model:this.model,
contest:this.contest,
activeTab:this.activeTab
})), this.assign({
".challenge-header":this.header
}), this.renderBody(), this) :(this.model.cachedFetch({
fetch:!0
}), this) :($(this.el).html(HR.appController.viewLoader(64)), this);
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
return 0 === this.$(".challenge-content").length && $(this.el).html('<div class="challenge-content"></div><div class="challenge-request"></div><div class="challenge-response"></div>'), 
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
"click .js-suggestion-cancel":"hideSuggestionDiv",
"click .facebook":"fbshare",
"click .twitter":"tweet",
"click .gplus":"gplus"
};
}, ChallengeContentView.prototype.initialize = function() {
return this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), 
this.get_recent_hackers();
}, ChallengeContentView.prototype.get_recent_hackers = function() {
var that;
return that = this, $.ajax({
url:"" + this.model.restURL() + "/recent_hackers",
success:function(data) {
return that.recent_hackers = data, that.render();
}
});
}, ChallengeContentView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
baseURL:this.model.pageURL(),
recent_hackers:this.recent_hackers
})), this;
}, ChallengeContentView.prototype.fbshare = function(e) {
var h, left, permalink, top, url, w;
return permalink = this.getPermaLink(), e.preventDefault(), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, url = "https://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(document.location.href) + "&p[title]=" + encodeURIComponent(this.model.get("name")) + "&p[summary]=" + encodeURIComponent(this.model.get("preview")), 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, ChallengeContentView.prototype.tweet = function(e) {
var h, left, permalink, text, top, url, w;
return permalink = this.getPermaLink(), e.preventDefault(), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, text = "Great challenge on @HackerRank. Try it here: " + permalink, 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, ChallengeContentView.prototype.gplus = function(e) {
var h, left, permalink, top, url, w;
return permalink = this.getPermaLink(), e.preventDefault(), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, url = "https://plus.google.com/share?url=" + permalink, 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
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
}, ChallengeContentView.prototype.getPermaLink = function() {
return "" + document.location.protocol + "//" + document.location.host + HR.appController.current_contest_namespace + "/challenges/" + this.model.get("slug");
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
return $(this.el).html("<h5 class='output-progress padded light-wrap hide mlT psT'></h5>\n<div class='output-area-wrap hide'>\n  <div class='output-area mlT psT' id='output-area'></div>\n</div>"), 
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
var CodeEditorView, HR, _ref;
return CodeEditorView = function(_super) {
function CodeEditorView() {
return CodeEditorView.__super__.constructor.apply(this, arguments);
}
return __extends(CodeEditorView, _super), CodeEditorView.prototype.template = "codeeditor", 
CodeEditorView.prototype.className = "codeeditor-view", CodeEditorView.prototype.initialize = function(options) {
return this.model = options.model, this.parent = options.parent, this.profile = HR.profile();
}, CodeEditorView.prototype.events = {
"click #codeshell-wrapper a.fullscreen":"makeFullscreen",
"click #codeshell-wrapper a.restorefullscreen":"restoreFullscreen",
"click #codeshell-wrapper button.upload_file":"confirmUploadFileDialog",
"codeshellcompile #codeshell-wrapper":"compileTest",
"codeshellsubmit #codeshell-wrapper":"submitPopup"
}, CodeEditorView.prototype.render = function() {
return 0 === $(this.el).find("#codeshell-wrapper").length && ($(this.el).html("<div id='codeshell-wrapper'></div>"), 
HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.isFullscreened ? _this.$(".fullscreen").click() :void 0;
};
}(this))), this;
}, CodeEditorView.prototype.applyCodeshell = function() {
return this.$("#codeshell-wrapper").codeshell($.extend({
showCustomInput:this.model.get("compile_and_test") && this.model.get("custom_case"),
showCompileTest:this.model.get("compile_and_test"),
showSubmit:!0,
showUploadCode:!0,
showFullScreen:!0,
showTheme:!0,
foldCode:!0,
enableVersioning:!0,
versionIds:this.model.get("version_ids") || [],
versioningRestUrl:"" + this.model.restURL() + "/versions",
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
}, this.model.getLanguageTemplates())), this.$("#codeshell-wrapper").codeshell("onChange", this.deleteMarkersOnSource);
}, CodeEditorView.prototype.makeFullscreen = function() {
return this.isFullscreened || (this.$("#codeshell-wrapper").codeshell("saveLangCode"), 
this.fullscreen || (this.fullscreen = new HR.FullScreenView({
model:this.model,
parent:this
})), this.fullscreen.render(), this.isFullscreened = !0), this.$(".fullscreen").addClass("force-hide").removeClass("active-link"), 
this.$(".restorefullscreen").removeClass("force-hide").addClass("active-link");
}, CodeEditorView.prototype.restoreFullscreen = function() {
return this.$("#codeshell-wrapper").codeshell("saveLangCode"), this.fullscreen.unRender(), 
this.isFullscreened = !1, this.$(".fullscreen").removeClass("force-hide"), this.$(".restorefullscreen").addClass("force-hide"), 
setTimeout(function() {
return $("body").scrollTop($("#codeshell-wrapper").offset().top - 50);
}, 100);
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
return that.$("#codeshell-wrapper").codeshell("forkNewBuffer", {
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
return that.model && that.model.get && HR.profile() && mixpanel.push([ "track", "Submit Code", {
challenge:that.model.get("slug"),
contest:that.model.get("contest_slug"),
kind:that.model.get("kind"),
language:$("#codeshell-wrapper").codeshell("getOptions").language,
fullscreen:that.isFullscreened,
username:HR.profile().username
} ]), this.setInactive(), dialog.destroy();
}
}, {
name:"Yes, submit my code",
"class":"hr_primary-btn hr-dialog-button",
callback:function(dialog) {
var btn, submission;
return that.model && that.model.get && HR.profile() && mixpanel.push([ "track", "Submit Code", {
challenge:that.model.get("slug"),
contest:that.model.get("contest_slug"),
kind:that.model.get("kind"),
language:$("#codeshell-wrapper").codeshell("getOptions").language,
fullscreen:that.isFullscreened,
username:HR.profile().username
} ]), btn = this, that.submitLock && that.submitLock === !0 ? void 0 :"" !== $("#codeshell-wrapper").codeshell("getOptions").language ? (this.setInactive(), 
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