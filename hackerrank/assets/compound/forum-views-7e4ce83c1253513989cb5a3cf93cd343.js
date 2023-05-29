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
description_markdown:"",
tags:[]
}), options.question_id && (challenge_slug = options.challenge.get("slug"), this.question.set({
id:options.question_id,
challenge_slug:challenge_slug
}), this.question.fetch(), this.listenTo(this.question, "reset", this.render)), 
this.challenge = options.challenge, this.listenTo(this.challenge, "reset", this.render), 
this.listenTo(this.challenge, "change", this.render), this.challenge.fetch(), this.hacker = HR.profile(), 
this.render;
}, ChallengeAskQuestionView.prototype.events = {
"click a.ask-question":"askQuestion"
}, ChallengeAskQuestionView.prototype.askQuestion = function(event) {
var button, description_text, errorDiv, existingText, tags, that, title_text, _responseFunction;
return event.preventDefault(), button = $(event.currentTarget), existingText = button.html(), 
description_text = _.escape(this.editor.getValue()), title_text = this.$("#question-title").val(), 
description_text.length < 3 || title_text.length < 3 ? (this.$("#question-error").html("Title and Question should contain at least 3 characters."), 
this.$("#question-error").fadeIn(), button.removeClass("disabled"), setTimeout(function() {
return function() {
return $("#question-error").fadeOut();
};
}(this), 2e3), void 0) :(button.html("Posting..."), errorDiv = this.$("#question-error"), 
button.hasClass("disabled") ? void 0 :(button.addClass("disabled"), tags = _.filter(this.$("#question-tags").val().split(", "), function(tag) {
return tag.trim().length > 0;
}), that = this, this.question.set({
challenge_slug:this.challenge.get("slug"),
title:this.$("#question-title").val(),
description:this.editor.getValue(),
description_markdown:this.editor.getValue(),
tags:_.map(tags, function(tag) {
return _.escape(tag);
})
}), _responseFunction = function(model, response) {
var prefix, question_url, route;
return 200 === response.status || response.model ? (prefix = document.location.protocol + "//" + document.location.host, 
route = "" + HR.appController.get_current_contest_namespace() + "/challenges/" + that.challenge.get("slug") + "/forum/questions/" + model.id, 
question_url = prefix + route, $.ajax({
url:"rest/hackers/me/opengraph_preferences",
type:"GET",
dataType:"json",
success:function(resp) {
return 2 === resp.model.asked_question ? that.askPermission(resp) :void 0;
}
}), HR.router.navigate(route, !0)) :(errorDiv.fadeIn(), setTimeout(function() {
return function() {
return errorDiv.fadeOut();
};
}(this), 2e3)), button.removeClass("disabled"), button.html(existingText);
}, this.question.save(null, {
error:_responseFunction,
success:_responseFunction
})));
}, ChallengeAskQuestionView.prototype.updatePreview = function() {
return HR.requires("sanitize", function(_this) {
return function() {
var sanitized_text;
return sanitized_text = HackDown.processData(_this.editor.getValue()), "" === sanitized_text ? _this.$(".preview-wrap").hide() :_this.$(".preview-wrap").show(), 
_this.$("#question-preview").html(sanitized_text);
};
}(this));
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
indentUnit:4
}, $codeeditor = this.$("#question-description").get(0), $codeeditor ? HR.appController.loadCodeMirrorMode("markdown", function(_this) {
return function() {
return _this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), _this.editor.setSize(650, 120), 
_this.question.get("description_markdown") && (_this.editor.setValue(_this.question.get("description_markdown")), 
that.updatePreview()), _this.editor.on("change", function() {
return that.updatePreview(), this;
});
};
}(this)) :void 0) :this;
}, ChallengeAskQuestionView.prototype.askPermission = function(data) {
var body, buttons, dialog, options, that;
return that = this, options = {
title:"Opengraph permissions"
}, body = "<p class='text-center mlT mlB'> Do you want to post your Asking Question activity on facebook? </p>", 
buttons = [ {
name:"Yes",
callback:function(dialog) {
return that.updatePermission(data, 1), dialog.destroy(), that.checkfbPermission();
}
}, {
name:"No",
callback:function(dialog) {
return that.updatePermission(data, 0), dialog.destroy();
}
} ], options.buttons = buttons, options.body = body, options.width = 640, dialog = HR.util.ShowDialog(options), 
dialog.render();
}, ChallengeAskQuestionView.prototype.updatePermission = function(data, value) {
var modified_data;
return modified_data = {
asked_question:value,
answerd_question:data.model.answerd_question,
solved_challenge:data.model.solved_challenge
}, $.ajax({
url:"rest/hackers/me/opengraph_preferences",
type:"PUT",
data:modified_data
});
}, ChallengeAskQuestionView.prototype.checkfbPermission = function() {
return window.HR.appController.facebook_permission();
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
this.hacker = HR.profile(), this.listenTo(this.hacker, "reset", this.render), this.render();
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
}, $codeeditor = this.$("#answer-description").get(0), $codeeditor && !this.editor && HR.appController.loadCodeMirrorMode("markdown", function(_this) {
return function() {
return _this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), _this.editor.setSize(null, 120), 
_this.editor.on("change", function() {
return that.updatePreview(), this;
});
};
}(this)), this.$("div#answer-list-view").length > 0 && this.loadAnswers(), $(".timeago").timeago(), 
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
"click a.delete-question":"deleteQuestion",
"click a.edit-question":"editQuestion"
}, QuestionContentView.prototype.answerQuestion = function(event) {
var answer, button, editor_text, existingText, that;
return event.preventDefault(), button = $(event.currentTarget), editor_text = this.editor.getValue(), 
editor_text.length < 3 ? (this.$("#answer-error").html("Sorry, your answer should contain at least 3 characters."), 
this.$("#answer-error").fadeIn(), button.removeClass("disabled"), setTimeout(function() {
return function() {
return $("#answer-error").fadeOut();
};
}(this), 3e3), void 0) :button.hasClass("disabled") && editor_text.length > 0 ? void 0 :(button.addClass("disabled"), 
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
button.html(existingText), $.ajax({
url:"rest/hackers/me/opengraph_preferences",
type:"GET",
dataType:"json",
success:function(resp) {
return 2 === resp.model.answerd_question ? that.askPermission(resp) :void 0;
}
}), $("html, body").animate({
scrollTop:$(document).height()
}, 1e3);
},
error:function() {
return this.$("#answer-error").fadeIn(), button.removeClass("disabled"), button.html(existingText), 
setTimeout(function() {
return function() {
return $("#answer-error").fadeOut();
};
}(this), 3e3);
}
}));
}, QuestionContentView.prototype.updatePreview = function() {
return HR.requires("sanitize", function(_this) {
return function() {
var sanitized_text;
return sanitized_text = HackDown.processData(_this.editor.getValue()), "" === sanitized_text ? _this.$(".preview-wrap").hide() :_this.$(".preview-wrap").show(), 
_this.$("#answer-preview").html(sanitized_text);
};
}(this));
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
var route;
return route = "" + HR.appController.get_current_contest_namespace() + "/challenges/" + this.challenge.get("slug") + "/forum/questions", 
this.model.destroy(), HR.router.navigate(route, !0);
}, QuestionContentView.prototype.editQuestion = function() {
var route;
return route = "" + HR.appController.get_current_contest_namespace() + "/challenges/" + this.challenge.get("slug") + "/forum/questions/ask/" + this.model.get("id"), 
HR.router.navigate(route, !0);
}, QuestionContentView.prototype.highlightUpvote = function() {
return this.resetVotes(), this.$(".upvote-question").addClass("highlight").addClass("disabled");
}, QuestionContentView.prototype.highlightDownvote = function() {
return this.resetVotes(), this.$(".downvote-question").addClass("highlight").addClass("disabled");
}, QuestionContentView.prototype.resetVotes = function() {
return this.$(".upvote-question,.downvote-question").removeClass("highlight").removeClass("disabled");
}, QuestionContentView.prototype.askPermission = function(data) {
var body, buttons, dialog, options, that;
return that = this, options = {
title:"Opengraph Permissions"
}, body = "<p class='text-center mlT mlB'> Do you want to post your Answers activity on facebook? </p>", 
buttons = [ {
name:"Yes",
callback:function(dialog) {
return that.updatePermission(data, 1), dialog.destroy(), that.checkfbPermission();
}
}, {
name:"No",
callback:function(dialog) {
return that.updatePermission(data, 0), dialog.destroy();
}
} ], options.buttons = buttons, options.body = body, options.width = 640, dialog = HR.util.ShowDialog(options), 
dialog.render();
}, QuestionContentView.prototype.updatePermission = function(data, value) {
var modified_data;
return modified_data = {
asked_question:data.model.asked_question,
answerd_question:value,
solved_challenge:data.model.solved_challenge
}, $.ajax({
url:"rest/hackers/me/opengraph_preferences",
type:"PUT",
data:modified_data
});
}, QuestionContentView.prototype.checkfbPermission = function() {
return window.HR.appController.facebook_permission();
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
var question_stubs, that;
return $(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge,
collection:this.collection.toJSON(),
_collection:this.collection
})), question_stubs = $(), that = this, $(".question-stub-container").html(""), 
this.collection.sync_status && _.each(this.collection.models, function(model) {
var _view;
return _view = new HR.QuestionStubView({
challenge:that.challenge,
model:model
}), question_stubs.push(_view.render().el);
}), $(".question-stub-container").append(question_stubs), this.delegateEvents(), 
HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + HR.appController.get_current_contest_namespace() + this.collection.pageURL() + "/page/", this.collection.getCurrentPage(), null, this.collection.limit), 
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
var HR, QuestionStubView, _ref;
return QuestionStubView = function(_super) {
function QuestionStubView() {
return QuestionStubView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionStubView, _super), QuestionStubView.prototype.template = "forum/question-stub", 
QuestionStubView.prototype.className = "question-stub-view", QuestionStubView.prototype.initialize = function(options) {
return this.challenge = options.challenge;
}, QuestionStubView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
challenge:this.challenge,
question:this.model.toJSON(),
_model:this.model
})), this.delegateEvents(), this;
}, QuestionStubView.prototype.events = {
"click a.question-link":"loadQuestion"
}, QuestionStubView.prototype.loadQuestion = function(event) {
return event.preventDefault(), this.model.trigger("question:link:clicked", this.model);
}, QuestionStubView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionStubView = QuestionStubView;
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
this.model.fetch(), this.profile = HR.profile();
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