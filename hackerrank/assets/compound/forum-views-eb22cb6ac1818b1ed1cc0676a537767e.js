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
var AnswerListView, HR, _ref;
return AnswerListView = function(_super) {
function AnswerListView() {
return AnswerListView.__super__.constructor.apply(this, arguments);
}
return __extends(AnswerListView, _super), AnswerListView.prototype.template = "forum/answer-list", 
AnswerListView.prototype.className = "answer-list-view", AnswerListView.prototype.initialize = function() {
return this.challenge_slug = this.collection.getChallengeSlug(), this.question_id = this.collection.getQuestionId(), 
this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "add", this.render);
}, AnswerListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
challenge_slug:this.challenge_slug,
question_id:this.question_id,
collection:this.collection.toJSON()
})), this.delegateEvents(), this;
}, AnswerListView.prototype.events = {
"click a.upvote-answer":"upvoteAnswer",
"click a.downvote-answer":"downvoteAnswer"
}, AnswerListView.prototype.subscription = function(event) {
return event.preventDefault();
}, AnswerListView.prototype.addAnswer = function(answer) {
return this.collection.push(answer);
}, AnswerListView.prototype.upvoteAnswer = function(event) {
var answerEl, that, url, voteBtn;
return event.preventDefault(), voteBtn = $(event.currentTarget), voteBtn.hasClass("disabled") ? void 0 :(that = this, 
url = voteBtn.attr("href"), answerEl = voteBtn.closest(".answer"), $.ajax({
type:"PUT",
url:url,
success:function() {
return that.highlightUpvote(answerEl), that.collection.fetch();
}
}));
}, AnswerListView.prototype.downvoteAnswer = function(event) {
var answerEl, that, url, voteBtn;
return event.preventDefault(), voteBtn = $(event.currentTarget), voteBtn.hasClass("disabled") ? void 0 :(that = this, 
url = voteBtn.attr("href"), answerEl = voteBtn.closest(".answer"), $.ajax({
type:"PUT",
url:url,
success:function() {
return that.highlightDownvote(answerEl), that.collection.fetch();
}
}));
}, AnswerListView.prototype.highlightUpvote = function(answerEl) {
return this.resetVotes(answerEl), $(answerEl).find(".upvote-answer").addClass("hide");
}, AnswerListView.prototype.highlightDownvote = function(answerEl) {
return this.resetVotes(answerEl), $(answerEl).find(".downvote-answer").addClass("hide");
}, AnswerListView.prototype.resetVotes = function(answerEl) {
return $(answerEl).find(".upvote-answer,.downvote-answer").removeClass("hide");
}, AnswerListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AnswerListView = AnswerListView;
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
var ChallengeAskQuestionView, HR, _ref;
return ChallengeAskQuestionView = function(_super) {
function ChallengeAskQuestionView() {
return ChallengeAskQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeAskQuestionView, _super), ChallengeAskQuestionView.prototype.template = "forum/challenge-ask-question", 
ChallengeAskQuestionView.prototype.className = "challenge-ask-question-view container", 
ChallengeAskQuestionView.prototype.initialize = function(options) {
var challenge_slug, that;
return that = this, this.question = new HR.QuestionModel(), this.question.set({
title:"",
description:"",
tags:[]
}), options.question_id && (challenge_slug = options.challenge.get("slug"), this.question.set({
id:options.question_id,
challenge_slug:challenge_slug
}), this.question.fetch(), this.listenTo(this.question, "reset", this.render)), 
this.challenge = options.challenge, this.listenTo(this.challenge, "reset", this.render), 
this.listenTo(this.challenge, "change", this.render), this.converter = new Showdown.converter(), 
this.challenge.fetch(), this.hacker = HR.profile(), this.render;
}, ChallengeAskQuestionView.prototype.events = {
"click a.ask-question":"askQuestion"
}, ChallengeAskQuestionView.prototype.askQuestion = function(event) {
var button, errorDiv, existingText, tags, that, _responseFunction;
return event.preventDefault(), button = $(event.currentTarget), existingText = button.html(), 
button.html("Posting..."), errorDiv = this.$("#question-error"), button.hasClass("disabled") ? void 0 :(button.addClass("disabled"), 
tags = _.filter(this.$("#question-tags").val().split(", "), function(tag) {
return tag.trim().length > 0;
}), that = this, this.question.set({
challenge_slug:this.challenge.get("slug"),
title:this.$("#question-title").val(),
description:this.editor.getValue(),
tags:tags
}), _responseFunction = function(model, response) {
var prefix, question_url, route;
return 200 === response.status || response.model ? (prefix = document.location.protocol + "//" + document.location.host, 
route = "" + HR.appController.get_current_contest_namespace() + "/challenges/" + that.challenge.get("slug") + "/forum/questions/" + model.id, 
question_url = prefix + route, 1 === that.hacker.get("facebook_allow_opengraph") && window.HR.appController.facebook_graph_activity("ask", "question", question_url), 
HR.router.navigate(route, !0)) :(errorDiv.fadeIn(), setTimeout(function() {
return function() {
return errorDiv.fadeOut();
};
}(this), 2e3)), button.removeClass("disabled"), button.html(existingText);
}, this.question.save(null, {
error:_responseFunction,
success:_responseFunction
}));
}, ChallengeAskQuestionView.prototype.updatePreview = function() {
var html, text;
return text = this.editor.getValue(), html = this.converter.makeHtml(text), "" === text ? this.$(".preview-wrap").hide() :this.$(".preview-wrap").show(), 
this.$("#question-preview").html(html);
}, ChallengeAskQuestionView.prototype.render = function() {
var $codeeditor, editorOptions, that;
return $(this.el).html(HR.appController.viewLoader(64)), this.challenge.id ? ($(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge,
question:this.question
})), that = this, editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!0,
mode:"text/x-markdown",
indentUnit:4,
onChange:function() {
return that.updatePreview(), this;
}
}, $codeeditor = this.$("#question-description").get(0), $codeeditor && (this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), 
this.editor.setSize(650, 120), this.question.get("description") && this.editor.setValue(this.question.get("description"))), 
this) :this;
}, ChallengeAskQuestionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengeAskQuestionView = ChallengeAskQuestionView;
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
var ChallengeQuestionsSidebarHeaderView, HR, _ref;
return ChallengeQuestionsSidebarHeaderView = function(_super) {
function ChallengeQuestionsSidebarHeaderView() {
return ChallengeQuestionsSidebarHeaderView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeQuestionsSidebarHeaderView, _super), ChallengeQuestionsSidebarHeaderView.prototype.template = "forum/challenge-questions-sidebar-header", 
ChallengeQuestionsSidebarHeaderView.prototype.className = "challenge-questions-sidebar-header-view", 
ChallengeQuestionsSidebarHeaderView.prototype.initialize = function(options) {
return this.challenge = options.challenge, this.listenTo(HR.profile(), "reset", this.render), 
this.render();
}, ChallengeQuestionsSidebarHeaderView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge,
profile:HR.profile()
})), this;
}, ChallengeQuestionsSidebarHeaderView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengeQuestionsSidebarHeaderView = ChallengeQuestionsSidebarHeaderView;
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
var ChallengeQuestionsSidebarView, HR, _ref;
return ChallengeQuestionsSidebarView = function(_super) {
function ChallengeQuestionsSidebarView() {
return ChallengeQuestionsSidebarView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeQuestionsSidebarView, _super), ChallengeQuestionsSidebarView.prototype.template = "forum/challenge-questions-sidebar", 
ChallengeQuestionsSidebarView.prototype.className = "challenge-questions-sidebar-view", 
ChallengeQuestionsSidebarView.prototype.initialize = function(options) {
return this.challenge = options.challenge, this.render();
}, ChallengeQuestionsSidebarView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)()), that = this, 
this.$(".header").length > 0 && (this.header = new HR.ChallengeQuestionsSidebarHeaderView({
el:this.$(".header"),
challenge:this.challenge
})), this;
}, ChallengeQuestionsSidebarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengeQuestionsSidebarView = ChallengeQuestionsSidebarView;
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
var ChallengeQuestionsView, HR, _ref;
return ChallengeQuestionsView = function(_super) {
function ChallengeQuestionsView() {
return ChallengeQuestionsView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeQuestionsView, _super), ChallengeQuestionsView.prototype.template = "forum/challenge-questions", 
ChallengeQuestionsView.prototype.className = "challenge-questions-view container", 
ChallengeQuestionsView.prototype.initialize = function(options) {
return this.challenge = options.challenge, this.listenTo(this.challenge, "reset", this.render);
}, ChallengeQuestionsView.prototype.render = function() {
var bread_crumbs_view;
return this.challenge.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge
})), this.$("div#question-list-view").length > 0 && (this.questions = new HR.QuestionListView({
el:this.$("div#question-list-view"),
challenge:this.challenge,
collection:this.collection
}), this.questions.render()), this.$("div.sidebar").length > 0 && (this.sidebar = new HR.ChallengeQuestionsSidebarView({
el:this.$("div.sidebar"),
challenge:this.challenge
}), this.sidebar.render()), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.challenge.breadCrumbs()), 
this.add_subview(bread_crumbs_view), this) :this;
}, ChallengeQuestionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengeQuestionsView = ChallengeQuestionsView;
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
var FollowQuestionView, HR, _ref;
return FollowQuestionView = function(_super) {
function FollowQuestionView() {
return FollowQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(FollowQuestionView, _super), FollowQuestionView.prototype.template = "forum/follow-question", 
FollowQuestionView.prototype.className = "follow-question-view", FollowQuestionView.prototype.initialize = function(options) {
return this.model = options.model, this.challenge = options.challenge, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render), this.render();
}, FollowQuestionView.prototype.events = {
"click a#follow-button":"toggleSubscription"
}, FollowQuestionView.prototype.toggleSubscription = function(event) {
var btn, that, url;
return event.preventDefault(), that = this, btn = $(event.currentTarget), url = "/rest/contests/" + HR.appController.get_current_contest_slug() + "/challenges/" + this.challenge.get("slug") + "/questions/" + this.model.get("id") + "/", 
url += this.model.get("subscribed") ? "unsubscribe" :"subscribe", $.ajax({
type:"PUT",
url:url,
success:function() {
return that.model.fetch();
}
});
}, FollowQuestionView.prototype.render = function() {
var shareText;
return shareText = "Checkout question, '" + this.model.get("title") + "' on '" + this.challenge.get("name") + "'", 
$(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
challenge:this.challenge,
shareText:shareText,
profile:HR.profile()
})), this;
}, FollowQuestionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.FollowQuestionView = FollowQuestionView;
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
var HR, QuestionContentView, _ref;
return QuestionContentView = function(_super) {
function QuestionContentView() {
return QuestionContentView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionContentView, _super), QuestionContentView.prototype.template = "forum/question-content", 
QuestionContentView.prototype.className = "question-content-view", QuestionContentView.prototype.initialize = function(options) {
return this.challenge = options.challenge, this.answer_collection = options.answer_collection, 
this.hacker = HR.profile(), this.listenTo(this.hacker, "reset", this.render), this.converter = new Showdown.converter(), 
this.render();
}, QuestionContentView.prototype.render = function() {
var $codeeditor, editorOptions, that;
return $(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge,
question:this.model.toJSON(),
_question:this.model,
profile:this.hacker,
_profile:this.hacker.toJSON()
})), that = this, editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!0,
mode:"text/x-markdown",
indentUnit:4
}, $codeeditor = this.$("#answer-description").get(0), $codeeditor && (this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), 
this.editor.setSize(null, 120), this.editor.on("change", function() {
return that.updatePreview(), this;
})), this.$("div#answer-list-view").length > 0 && this.loadAnswers(), $(".timeago").timeago(), 
this.delegateEvents(), this;
}, QuestionContentView.prototype.loadAnswers = function() {
return this.answers = new HR.AnswerListView({
el:this.$("div#answer-list-view"),
collection:this.answer_collection
}), this.answers.render();
}, QuestionContentView.prototype.events = {
"click a.answer-question":"answerQuestion",
"click a.upvote-question":"upvoteQuestion",
"click a.downvote-question":"downvoteQuestion",
"click a.delete-question":"deleteQuestion"
}, QuestionContentView.prototype.answerQuestion = function(event) {
var answer, button, editor_text, existingText, that;
return event.preventDefault(), button = $(event.currentTarget), editor_text = this.editor.getValue(), 
button.hasClass("disabled") && editor_text.length > 0 ? void 0 :(button.addClass("disabled"), 
existingText = button.html(), button.html("Posting..."), that = this, answer = new HR.AnswerModel(), 
answer.set({
challenge_slug:this.challenge.get("slug"),
question_id:this.model.get("id"),
answer:{
description:editor_text
}
}), answer.save({}, {
success:function() {
return that.answers.addAnswer(answer), that.editor.setValue(""), button.removeClass("disabled"), 
button.html(existingText), 1 === that.hacker.get("facebook_allow_opengraph") && that.graphAnsweredQuestion(that.model), 
$("html, body").animate({
scrollTop:$(document).height()
}, 1e3);
},
error:function() {
return this.$("#answer-error").fadeIn(), button.removeClass("disabled"), setTimeout(function() {
return function() {
return $("#answer-error").fadeOut();
};
}(this), 3e3);
}
}));
}, QuestionContentView.prototype.graphAnsweredQuestion = function(question) {
var prefix, suffix;
return prefix = document.location.protocol + "//" + document.location.host, suffix = question.pageURL(), 
window.HR.appController.facebook_graph_activity("answer", "question", prefix + suffix);
}, QuestionContentView.prototype.updatePreview = function() {
var html, text;
return text = this.editor.getValue(), html = this.converter.makeHtml(text), "" === text ? this.$(".preview-wrap").hide() :this.$(".preview-wrap").show(), 
this.$("#answer-preview").html(html);
}, QuestionContentView.prototype.upvoteQuestion = function(event) {
var that, url, voteBtn;
return event.preventDefault(), voteBtn = $(event.currentTarget), voteBtn.hasClass("disabled") ? void 0 :(that = this, 
url = voteBtn.attr("href"), $.ajax({
type:"PUT",
url:url,
success:function() {
return that.highlightUpvote();
}
}));
}, QuestionContentView.prototype.downvoteQuestion = function(event) {
var that, url, voteBtn;
return event.preventDefault(), voteBtn = $(event.currentTarget), voteBtn.hasClass("disabled") ? void 0 :(that = this, 
url = voteBtn.attr("href"), $.ajax({
type:"PUT",
url:url,
success:function() {
return that.highlightDownvote();
}
}));
}, QuestionContentView.prototype.deleteQuestion = function() {
return this.model.destroy(), HR.router.navigate("/challenges/" + this.challenge.get("slug") + "/forum/questions", !0);
}, QuestionContentView.prototype.highlightUpvote = function() {
return this.resetVotes(), this.$(".upvote-question").addClass("highlight").addClass("disabled");
}, QuestionContentView.prototype.highlightDownvote = function() {
return this.resetVotes(), this.$(".downvote-question").addClass("highlight").addClass("disabled");
}, QuestionContentView.prototype.resetVotes = function() {
return this.$(".upvote-question,.downvote-question").removeClass("highlight").removeClass("disabled");
}, QuestionContentView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionContentView = QuestionContentView;
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
var HR, QuestionListView, _ref;
return QuestionListView = function(_super) {
function QuestionListView() {
return QuestionListView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionListView, _super), QuestionListView.prototype.template = "forum/question-list", 
QuestionListView.prototype.className = "question-list-view", QuestionListView.prototype.initialize = function(options) {
return this.challenge = options.challenge, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "add", this.render), 
this.listenTo(this.collection, "set", this.render), this.listenTo(this.collection, "sync", this.render), 
this.collection.fetch();
}, QuestionListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge,
collection:this.collection.toJSON(),
_collection:this.collection
})), this.delegateEvents(), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + HR.appController.get_current_contest_namespace() + this.collection.pageURL() + "/page/", this.collection.getCurrentPage(), null, this.collection.limit), 
$(".timeago").timeago(), this;
}, QuestionListView.prototype.events = {
"click a.ask-question":"askQuestion"
}, QuestionListView.prototype.askQuestion = function(event) {
var params, question, that;
return event.preventDefault(), that = this, question = new HR.QuestionModel(), params = {
title:this.$("#question-title").val(),
description:this.$("#question-description").val()
}, question.set({
challenge_slug:this.challenge.get("slug"),
question:params
}), question.save(null, {
success:function() {
return that.collection.add(question);
}
});
}, QuestionListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionListView = QuestionListView;
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
var HR, QuestionSidebarView, _ref;
return QuestionSidebarView = function(_super) {
function QuestionSidebarView() {
return QuestionSidebarView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionSidebarView, _super), QuestionSidebarView.prototype.template = "forum/question-sidebar", 
QuestionSidebarView.prototype.className = "question-sidebar-view", QuestionSidebarView.prototype.initialize = function(options) {
return this.activites_collection = options.activities_collection, this.challenge = options.challenge, 
this.render();
}, QuestionSidebarView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge
})), that = this, this.$(".follow-question").length > 0 && (this.header = new HR.FollowQuestionView({
el:this.$(".follow-question"),
model:this.model,
challenge:this.challenge
})), this;
}, QuestionSidebarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionSidebarView = QuestionSidebarView;
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
var HR, QuestionView, _ref;
return QuestionView = function(_super) {
function QuestionView() {
return QuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionView, _super), QuestionView.prototype.template = "forum/question", 
QuestionView.prototype.className = "questions container", QuestionView.prototype.initialize = function(options) {
var that;
return that = this, this.answer_collection = new HR.AnswerCollection(), this.answer_collection.setChallengeSlug(this.model.get("challenge_slug")), 
this.answer_collection.setQuestionId(this.model.id), this.listenTo(this.answer_collection, "reset", this.render), 
this.listenTo(this.answer_collection, "change", this.render), this.answer_collection.cached(), 
this.challenge = options.challenge, this.listenTo(this.challenge, "reset", this.render), 
this.listenTo(this.challenge, "change", this.render), this.model.setChallenge(this.challenge), 
this.challenge.cached(), this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.model.cached(), this.profile = HR.profile();
}, QuestionView.prototype.render = function() {
var bread_crumbs_view;
return $(this.el).html(HR.appController.viewLoader(64)), this.model.sync_status && this.challenge.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge
})), this.$("div#question-content-view").length > 0 && (this.questions = new HR.QuestionContentView({
el:this.$("div#question-content-view"),
challenge:this.challenge,
model:this.model,
answer_collection:this.answer_collection
})), this.$("div.sidebar").length > 0 && (this.sidebar = new HR.QuestionSidebarView({
el:this.$("div.sidebar"),
challenge:this.challenge,
model:this.model
})), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.model.breadCrumbs()), 
this.add_subview(bread_crumbs_view), this) :this;
}, QuestionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionView = QuestionView;
});
}.call(this);

// Copyright (c) 2007 John Fraser.
// Original Markdown Copyright (c) 2004-2005 John Gruber
var Showdown = {
extensions:{}
}, forEach = Showdown.forEach = function(obj, callback) {
if ("function" == typeof obj.forEach) obj.forEach(callback); else {
var i, len = obj.length;
for (i = 0; len > i; i++) callback(obj[i], i, obj);
}
}, stdExtName = function(s) {
return s.replace(/[_-]||\s/g, "").toLowerCase();
};

Showdown.converter = function(converter_options) {
var g_urls, g_titles, g_html_blocks, g_list_level = 0, g_lang_extensions = [], g_output_modifiers = [];
if ("undefind" != typeof module && "undefined" != typeof exports && "undefind" != typeof require) {
var fs = require("fs");
if (fs) {
var extensions = fs.readdirSync((__dirname || ".") + "/extensions").filter(function(file) {
return ~file.indexOf(".js");
}).map(function(file) {
return file.replace(/\.js$/, "");
});
Showdown.forEach(extensions, function(ext) {
var name = stdExtName(ext);
Showdown.extensions[name] = require("./extensions/" + ext);
});
}
}
if (this.makeHtml = function(text) {
return g_urls = {}, g_titles = {}, g_html_blocks = [], text = text.replace(/~/g, "~T"), 
text = text.replace(/\$/g, "~D"), text = text.replace(/\r\n/g, "\n"), text = text.replace(/\r/g, "\n"), 
text = "\n\n" + text + "\n\n", text = _Detab(text), text = text.replace(/^[ \t]+$/gm, ""), 
Showdown.forEach(g_lang_extensions, function(x) {
text = _ExecuteExtension(x, text);
}), text = _DoGithubCodeBlocks(text), text = _HashHTMLBlocks(text), text = _StripLinkDefinitions(text), 
text = _RunBlockGamut(text), text = _UnescapeSpecialChars(text), text = text.replace(/~D/g, "$$"), 
text = text.replace(/~T/g, "~"), Showdown.forEach(g_output_modifiers, function(x) {
text = _ExecuteExtension(x, text);
}), text;
}, converter_options && converter_options.extensions) {
var self = this;
Showdown.forEach(converter_options.extensions, function(plugin) {
if ("string" == typeof plugin && (plugin = Showdown.extensions[stdExtName(plugin)]), 
"function" != typeof plugin) throw "Extension '" + plugin + "' could not be loaded.  It was either not found or is not a valid extension.";
Showdown.forEach(plugin(self), function(ext) {
ext.type ? "language" === ext.type || "lang" === ext.type ? g_lang_extensions.push(ext) :("output" === ext.type || "html" === ext.type) && g_output_modifiers.push(ext) :g_output_modifiers.push(ext);
});
});
}
var _ProcessListItems, _ExecuteExtension = function(ext, text) {
if (ext.regex) {
var re = new RegExp(ext.regex, "g");
return text.replace(re, ext.replace);
}
return ext.filter ? ext.filter(text) :void 0;
}, _StripLinkDefinitions = function(text) {
return text += "~0", text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm, function(wholeMatch, m1, m2, m3, m4) {
return m1 = m1.toLowerCase(), g_urls[m1] = _EncodeAmpsAndAngles(m2), m3 ? m3 + m4 :(m4 && (g_titles[m1] = m4.replace(/"/g, "&quot;")), 
"");
}), text = text.replace(/~0/, "");
}, _HashHTMLBlocks = function(text) {
text = text.replace(/\n/g, "\n\n");
return text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, hashElement), 
text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm, hashElement), 
text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, hashElement), 
text = text.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, hashElement), 
text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, hashElement), 
text = text.replace(/\n\n/g, "\n");
}, hashElement = function(wholeMatch, m1) {
var blockText = m1;
return blockText = blockText.replace(/\n\n/g, "\n"), blockText = blockText.replace(/^\n/, ""), 
blockText = blockText.replace(/\n+$/g, ""), blockText = "\n\n~K" + (g_html_blocks.push(blockText) - 1) + "K\n\n";
}, _RunBlockGamut = function(text) {
text = _DoHeaders(text);
var key = hashBlock("<hr />");
return text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key), text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key), 
text = text.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, key), text = _DoLists(text), 
text = _DoCodeBlocks(text), text = _DoBlockQuotes(text), text = _HashHTMLBlocks(text), 
text = _FormParagraphs(text);
}, _RunSpanGamut = function(text) {
return text = _DoCodeSpans(text), text = _EscapeSpecialCharsWithinTagAttributes(text), 
text = _EncodeBackslashEscapes(text), text = _DoImages(text), text = _DoAnchors(text), 
text = _DoAutoLinks(text), text = _EncodeAmpsAndAngles(text), text = _DoItalicsAndBold(text), 
text = text.replace(/  +\n/g, " <br />\n");
}, _EscapeSpecialCharsWithinTagAttributes = function(text) {
var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
return text = text.replace(regex, function(wholeMatch) {
var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
return tag = escapeCharacters(tag, "\\`*_");
});
}, _DoAnchors = function(text) {
return text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeAnchorTag), 
text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeAnchorTag), 
text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);
}, writeAnchorTag = function(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
void 0 == m7 && (m7 = "");
var whole_match = m1, link_text = m2, link_id = m3.toLowerCase(), url = m4, title = m7;
if ("" == url) if ("" == link_id && (link_id = link_text.toLowerCase().replace(/ ?\n/g, " ")), 
url = "#" + link_id, void 0 != g_urls[link_id]) url = g_urls[link_id], void 0 != g_titles[link_id] && (title = g_titles[link_id]); else {
if (!(whole_match.search(/\(\s*\)$/m) > -1)) return whole_match;
url = "";
}
url = escapeCharacters(url, "*_");
var result = '<a href="' + url + '"';
return "" != title && (title = title.replace(/"/g, "&quot;"), title = escapeCharacters(title, "*_"), 
result += ' title="' + title + '"'), result += ">" + link_text + "</a>";
}, _DoImages = function(text) {
return text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeImageTag), 
text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeImageTag);
}, writeImageTag = function(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
var whole_match = m1, alt_text = m2, link_id = m3.toLowerCase(), url = m4, title = m7;
if (title || (title = ""), "" == url) {
if ("" == link_id && (link_id = alt_text.toLowerCase().replace(/ ?\n/g, " ")), url = "#" + link_id, 
void 0 == g_urls[link_id]) return whole_match;
url = g_urls[link_id], void 0 != g_titles[link_id] && (title = g_titles[link_id]);
}
alt_text = alt_text.replace(/"/g, "&quot;"), url = escapeCharacters(url, "*_");
var result = '<img src="' + url + '" alt="' + alt_text + '"';
return title = title.replace(/"/g, "&quot;"), title = escapeCharacters(title, "*_"), 
result += ' title="' + title + '"', result += " />";
}, _DoHeaders = function(text) {
function headerId(m) {
return m.replace(/[^\w]/g, "").toLowerCase();
}
return text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(wholeMatch, m1) {
return hashBlock('<h1 id="' + headerId(m1) + '">' + _RunSpanGamut(m1) + "</h1>");
}), text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(matchFound, m1) {
return hashBlock('<h2 id="' + headerId(m1) + '">' + _RunSpanGamut(m1) + "</h2>");
}), text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(wholeMatch, m1, m2) {
var h_level = m1.length;
return hashBlock("<h" + h_level + ' id="' + headerId(m2) + '">' + _RunSpanGamut(m2) + "</h" + h_level + ">");
});
}, _DoLists = function(text) {
text += "~0";
var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
return g_list_level ? text = text.replace(whole_list, function(wholeMatch, m1, m2) {
var list = m1, list_type = m2.search(/[*+-]/g) > -1 ? "ul" :"ol";
list = list.replace(/\n{2,}/g, "\n\n\n");
var result = _ProcessListItems(list);
return result = result.replace(/\s+$/, ""), result = "<" + list_type + ">" + result + "</" + list_type + ">\n";
}) :(whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
text = text.replace(whole_list, function(wholeMatch, m1, m2, m3) {
var runup = m1, list = m2, list_type = m3.search(/[*+-]/g) > -1 ? "ul" :"ol", list = list.replace(/\n{2,}/g, "\n\n\n"), result = _ProcessListItems(list);
return result = runup + "<" + list_type + ">\n" + result + "</" + list_type + ">\n";
})), text = text.replace(/~0/, "");
};
_ProcessListItems = function(list_str) {
return g_list_level++, list_str = list_str.replace(/\n{2,}$/, "\n"), list_str += "~0", 
list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(wholeMatch, m1, m2, m3, m4) {
var item = m4, leading_line = m1;
return leading_line || item.search(/\n{2,}/) > -1 ? item = _RunBlockGamut(_Outdent(item)) :(item = _DoLists(_Outdent(item)), 
item = item.replace(/\n$/, ""), item = _RunSpanGamut(item)), "<li>" + item + "</li>\n";
}), list_str = list_str.replace(/~0/g, ""), g_list_level--, list_str;
};
var _DoCodeBlocks = function(text) {
return text += "~0", text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(wholeMatch, m1, m2) {
var codeblock = m1, nextChar = m2;
return codeblock = _EncodeCode(_Outdent(codeblock)), codeblock = _Detab(codeblock), 
codeblock = codeblock.replace(/^\n+/g, ""), codeblock = codeblock.replace(/\n+$/g, ""), 
codeblock = "<pre><code>" + codeblock + "\n</code></pre>", hashBlock(codeblock) + nextChar;
}), text = text.replace(/~0/, "");
}, _DoGithubCodeBlocks = function(text) {
return text += "~0", text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(wholeMatch, m1, m2) {
var language = m1, codeblock = m2;
return codeblock = _EncodeCode(codeblock), codeblock = _Detab(codeblock), codeblock = codeblock.replace(/^\n+/g, ""), 
codeblock = codeblock.replace(/\n+$/g, ""), codeblock = "<pre><code" + (language ? ' class="' + language + '"' :"") + ">" + codeblock + "\n</code></pre>", 
hashBlock(codeblock);
}), text = text.replace(/~0/, "");
}, hashBlock = function(text) {
return text = text.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (g_html_blocks.push(text) - 1) + "K\n\n";
}, _DoCodeSpans = function(text) {
return text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(wholeMatch, m1, m2, m3) {
var c = m3;
return c = c.replace(/^([ \t]*)/g, ""), c = c.replace(/[ \t]*$/g, ""), c = _EncodeCode(c), 
m1 + "<code>" + c + "</code>";
});
}, _EncodeCode = function(text) {
return text = text.replace(/&/g, "&amp;"), text = text.replace(/</g, "&lt;"), text = text.replace(/>/g, "&gt;"), 
text = escapeCharacters(text, "*_{}[]\\", !1);
}, _DoItalicsAndBold = function(text) {
return text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"), 
text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>");
}, _DoBlockQuotes = function(text) {
return text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(wholeMatch, m1) {
var bq = m1;
return bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0"), bq = bq.replace(/~0/g, ""), bq = bq.replace(/^[ \t]+$/gm, ""), 
bq = _RunBlockGamut(bq), bq = bq.replace(/(^|\n)/g, "$1  "), bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
var pre = m1;
return pre = pre.replace(/^  /gm, "~0"), pre = pre.replace(/~0/g, "");
}), hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
});
}, _FormParagraphs = function(text) {
text = text.replace(/^\n+/g, ""), text = text.replace(/\n+$/g, "");
for (var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length, i = 0; end > i; i++) {
var str = grafs[i];
str.search(/~K(\d+)K/g) >= 0 ? grafsOut.push(str) :str.search(/\S/) >= 0 && (str = _RunSpanGamut(str), 
str = str.replace(/^([ \t]*)/g, "<p>"), str += "</p>", grafsOut.push(str));
}
end = grafsOut.length;
for (var i = 0; end > i; i++) for (;grafsOut[i].search(/~K(\d+)K/) >= 0; ) {
var blockText = g_html_blocks[RegExp.$1];
blockText = blockText.replace(/\$/g, "$$$$"), grafsOut[i] = grafsOut[i].replace(/~K\d+K/, blockText);
}
return grafsOut.join("\n\n");
}, _EncodeAmpsAndAngles = function(text) {
return text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
}, _EncodeBackslashEscapes = function(text) {
return text = text.replace(/\\(\\)/g, escapeCharacters_callback), text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, escapeCharacters_callback);
}, _DoAutoLinks = function(text) {
return text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, '<a href="$1">$1</a>'), 
text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function(wholeMatch, m1) {
return _EncodeEmailAddress(_UnescapeSpecialChars(m1));
});
}, _EncodeEmailAddress = function(addr) {
var encode = [ function(ch) {
return "&#" + ch.charCodeAt(0) + ";";
}, function(ch) {
return "&#x" + ch.charCodeAt(0).toString(16) + ";";
}, function(ch) {
return ch;
} ];
return addr = "mailto:" + addr, addr = addr.replace(/./g, function(ch) {
if ("@" == ch) ch = encode[Math.floor(2 * Math.random())](ch); else if (":" != ch) {
var r = Math.random();
ch = r > .9 ? encode[2](ch) :r > .45 ? encode[1](ch) :encode[0](ch);
}
return ch;
}), addr = '<a href="' + addr + '">' + addr + "</a>", addr = addr.replace(/">.+:/g, '">');
}, _UnescapeSpecialChars = function(text) {
return text = text.replace(/~E(\d+)E/g, function(wholeMatch, m1) {
var charCodeToReplace = parseInt(m1);
return String.fromCharCode(charCodeToReplace);
});
}, _Outdent = function(text) {
return text = text.replace(/^(\t|[ ]{1,4})/gm, "~0"), text = text.replace(/~0/g, "");
}, _Detab = function(text) {
return text = text.replace(/\t(?=\t)/g, "    "), text = text.replace(/\t/g, "~A~B"), 
text = text.replace(/~B(.+?)~A/g, function(wholeMatch, m1) {
for (var leadingText = m1, numSpaces = 4 - leadingText.length % 4, i = 0; numSpaces > i; i++) leadingText += " ";
return leadingText;
}), text = text.replace(/~A/g, "    "), text = text.replace(/~B/g, "");
}, escapeCharacters = function(text, charsToEscape, afterBackslash) {
var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
afterBackslash && (regexString = "\\\\" + regexString);
var regex = new RegExp(regexString, "g");
return text = text.replace(regex, escapeCharacters_callback);
}, escapeCharacters_callback = function(wholeMatch, m1) {
var charCodeToEscape = m1.charCodeAt(0);
return "~E" + charCodeToEscape + "E";
};
}, "undefined" != typeof module && (module.exports = Showdown), "function" == typeof define && define.amd && define("showdown", function() {
return Showdown;
});