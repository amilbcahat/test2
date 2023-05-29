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
var GroupedSubmissionsView, HR, _ref;
return GroupedSubmissionsView = function(_super) {
function GroupedSubmissionsView() {
return GroupedSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(GroupedSubmissionsView, _super), GroupedSubmissionsView.prototype.template = "grouped-submissions", 
GroupedSubmissionsView.prototype.className = "grouped-submissions-view", GroupedSubmissionsView.prototype.initialize = function() {
return this.listenTo(this.collection, "reset", this.render), _.isObject(this.collection.challenge) ? this.listenToOnce(this.collection.challenge("reset", this.render)) :void 0;
}, GroupedSubmissionsView.prototype.events = {
"click .expand":"expandChallenge"
}, GroupedSubmissionsView.prototype.expandChallenge = function(e) {
var subDiv;
return e.preventDefault(), subDiv = $(e.currentTarget).parents(".table-primary").find(".table-sub"), 
subDiv.hasClass("block") ? subDiv.slideUp(200).removeClass("block").css("height: auto") :subDiv.slideDown(200).addClass("block").css("height: auto");
}, GroupedSubmissionsView.prototype.render = function() {
var bread_crumbs_view, count;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection
})), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.collection.breadCrumbs()), 
this.add_subview(bread_crumbs_view), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL() + "grouped/page/", this.collection.getCurrentPage(), null, count = this.collection.limit), 
this.$(".submissions-list-wrapper").length > 0 && (this.collection.sync_status ? (this.$(".submissions-list-wrapper").html(""), 
_.each(this.collection.models, function(model) {
var _view;
return _view = new HR.GroupedSubmissionsListView({
model:model
}), this.$(".submissions-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this)) :this.$(".submissions-list-wrapper").append(HR.appController.viewLoader(64))), 
this;
}, GroupedSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GroupedSubmissionsView = GroupedSubmissionsView;
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
var GroupedSubmissionsListView, HR, _ref;
return GroupedSubmissionsListView = function(_super) {
function GroupedSubmissionsListView() {
return GroupedSubmissionsListView.__super__.constructor.apply(this, arguments);
}
return __extends(GroupedSubmissionsListView, _super), GroupedSubmissionsListView.prototype.template = "grouped-submissions-list", 
GroupedSubmissionsListView.prototype.className = "grouped-submissions-list-view", 
GroupedSubmissionsListView.prototype.initialize = function() {
return this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, GroupedSubmissionsListView.prototype.render = function() {
var firstSubmission, submissions;
return this.model.get("challenge") && (submissions = this.model.get("submissions"), 
firstSubmission = submissions[0], submissions = submissions.slice(1), $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
firstSubmission:firstSubmission,
challenge:this.model.challenge,
submissions:submissions,
ns:this.model.ns()
}))), this.delegateEvents(), this;
}, GroupedSubmissionsListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GroupedSubmissionsListView = GroupedSubmissionsListView;
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
var HR, SubmissionsView, _ref;
return SubmissionsView = function(_super) {
function SubmissionsView() {
return SubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionsView, _super), SubmissionsView.prototype.template = "submissions", 
SubmissionsView.prototype.className = "submissions-view container", SubmissionsView.prototype.initialize = function(options) {
return this.listenTo(this.collection, "reset", this.render), options.challenge && (this.challenge = options.challenge), 
_.isObject(this.collection.challenge) ? this.listenTo(this.collection.challenge, "reset", this.render) :void 0;
}, SubmissionsView.prototype.render = function() {
var bread_crumbs_view, models;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
challenge:this.collection.challenge,
baseURL:this.collection.challenge.pageURL()
})), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.collection.breadCrumbs()), 
this.add_subview(bread_crumbs_view), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL(), this.collection.getCurrentPage()), 
this.$(".submissions-list-wrapper").length > 0 && (this.$(".submissions-list-wrapper").html(""), 
models = _.sortBy(this.collection.models, function(model) {
return -1 * model.get("created_at");
}), _.each(models, function(model) {
var _view;
return _view = new HR.SubmissionsListView({
model:model,
challenge:this.collection.challenge
}), this.$(".submissions-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this)), this;
}, SubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionsView = SubmissionsView;
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
var HR, SubmissionsListView, _ref;
return SubmissionsListView = function(_super) {
function SubmissionsListView() {
return SubmissionsListView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionsListView, _super), SubmissionsListView.prototype.template = "submissions-list", 
SubmissionsListView.prototype.className = "submissions-list-view", SubmissionsListView.prototype.initialize = function(options) {
return this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render), 
this.challenge = options.challenge;
}, SubmissionsListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
challenge:this.challenge
})), this.delegateEvents(), this;
}, SubmissionsListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionsListView = SubmissionsListView;
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
var HR, SubmissionListView, _ref;
return SubmissionListView = function(_super) {
function SubmissionListView() {
return SubmissionListView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionListView, _super), SubmissionListView.prototype.template = "submission-list", 
SubmissionListView.prototype.className = "submission-list-view", SubmissionListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)()), this.delegateEvents(), 
this;
}, SubmissionListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionListView = SubmissionListView;
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
var ChronologicalSubmissionsView, HR, _ref;
return ChronologicalSubmissionsView = function(_super) {
function ChronologicalSubmissionsView() {
return ChronologicalSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(ChronologicalSubmissionsView, _super), ChronologicalSubmissionsView.prototype.template = "chronological-submissions", 
ChronologicalSubmissionsView.prototype.className = "chronological-submissions-view", 
ChronologicalSubmissionsView.prototype.initialize = function() {
return this.listenTo(this.collection, "reset", this.render), _.isObject(this.collection.challenge) ? this.listenToOnce(this.collection.challenge("reset", this.render)) :void 0;
}, ChronologicalSubmissionsView.prototype.render = function() {
var bread_crumbs_view, models;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection
})), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.collection.breadCrumbs()), 
this.add_subview(bread_crumbs_view), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL() + "all/page/", this.collection.getCurrentPage()), 
this.$(".submissions-list-wrapper").length > 0 && (this.collection.sync_status ? (this.$(".submissions-list-wrapper").html(""), 
models = _.sortBy(this.collection.models, function(model) {
return -1 * model.get("created_at");
}), _.each(models, function(model) {
var _view;
return _view = new HR.ChronologicalSubmissionsListView({
model:model
}), this.$(".submissions-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this)) :this.$(".submissions-list-wrapper").append(HR.appController.viewLoader(64))), 
this;
}, ChronologicalSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChronologicalSubmissionsView = ChronologicalSubmissionsView;
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
var ChronologicalSubmissionsListView, HR, _ref;
return ChronologicalSubmissionsListView = function(_super) {
function ChronologicalSubmissionsListView() {
return ChronologicalSubmissionsListView.__super__.constructor.apply(this, arguments);
}
return __extends(ChronologicalSubmissionsListView, _super), ChronologicalSubmissionsListView.prototype.template = "chronological-submissions-list", 
ChronologicalSubmissionsListView.prototype.className = "chronological-submissions-list-view", 
ChronologicalSubmissionsListView.prototype.initialize = function() {
return this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, ChronologicalSubmissionsListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
challenge:this.model.get("challenge"),
ns:this.model.ns()
})), this.delegateEvents(), this;
}, ChronologicalSubmissionsListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChronologicalSubmissionsListView = ChronologicalSubmissionsListView;
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
var HR, SubmissionView, _ref;
return SubmissionView = function(_super) {
function SubmissionView() {
return SubmissionView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionView, _super), SubmissionView.prototype.template = "submission", 
SubmissionView.prototype.className = "submission-view container", SubmissionView.prototype.events = {
"click .copy_to_clipboard":"CopyToClipBoard"
}, SubmissionView.prototype.initialize = function(options) {
return this.contest = options.contest, this.has_template = !1;
}, SubmissionView.prototype.setSubmissionModel = function(model) {
return this.model = model, this.listenTo(this.model, "reset", this.render), this.renderCurrentView();
}, SubmissionView.prototype.setGameSetCollection = function(collection) {
return this.collection = collection, this.listenTo(this.collection, "reset", this.render), 
this.renderSubViews();
}, SubmissionView.prototype.render = function() {
return this.has_template ? (this.renderCurrentView(), this.renderSubViews()) :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView(), 
this.renderSubViews();
}, this), this;
}, SubmissionView.prototype.renderCurrentView = function() {
var $code_area, bread_crumbs_view, challengePageURL, editorOptions, showBusyThrobber, that;
return this.rendered && this.previous_model_id === this.model.get("id") || this._template && this.model && (challengePageURL = HR.util.isAvailable(this.model.get("contest_slug")) && HR.util.isAvailable(this.model.get("slug")) ? HR.appController.get_challenge_pageURL(this.model.get("contest_slug"), this.model.get("slug")) :null, 
$(this.el).html(this._template({
model:this.model.toJSON(),
challengePageURL:challengePageURL,
_model:this.model,
contest:this.contest.toJSON()
})), this.$("#submission-code").length > 0 && ($code_area = this.$("#submission-code").get(0), 
editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
mode:lang_mime_mapping[this.model.get("language")],
indentUnit:4,
readOnly:!0,
value:this.model.get("code")
}, HR.appController.loadCodeMirrorMode(this.model.get("language"), function(_this) {
return function() {
return _this.editor = CodeMirror($code_area, editorOptions);
};
}(this))), this.rendered = !0, this.renderSubViews(), this.previous_model_id = this.model.get("id"), 
this._ThrobberTimer && window.clearTimeout(this._ThrobberTimer), this.model.get("slug") || (that = this, 
showBusyThrobber = function(index) {
var messages;
return null == index && (index = 0), messages = [ "fetching your submission", "analysing statistics", "generating report" ], 
that.$(".gray").length > 0 ? (that.$(".gray .msg").html(messages[index % messages.length]), 
that._ThrobberTimer = setTimeout(function() {
return showBusyThrobber(index + 1);
}, 1500)) :void 0;
}, this._ThrobberTimer = setTimeout(function() {
return showBusyThrobber();
}, 500))), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.model.breadCrumbs()), 
this.add_subview(bread_crumbs_view), this;
}, SubmissionView.prototype.renderSubViews = function() {
var current_played, percent, status, that, total_games, _timeout;
return this.model && this.model.sync_status !== !0 || !this.rendered ? this :(this.$(".apply-blob") && (this.apply_blob_view ? (this.apply_blob_view.setElement(this.$(".apply-blob")), 
this.add_subview(this.apply_blob_view)) :this.apply_blob_view = new HR.ViewShiv({
view:"apply-blob",
model:this.model,
el:this.$(".apply-blob")
}), this.apply_blob_view.render()), total_games = this.model.get("game_total"), 
current_played = this.model.get("game_played"), status = this.model.get("status_code"), 
percent = 0, 0 !== status && (percent += 10), total_games > 0 && (percent += current_played / (1 * total_games) * 90), 
that = this, 100 === percent && (_timeout = function() {
return $(".progress-bar").next().fadeOut(), $(".progress-bar").fadeOut(), that.model.set("startLock", !0);
}, setTimeout(_timeout, 2e3)), this.stats || (this.stats = new HR.SubmissionStatsView({
parent:this
})), this.stats.setModel(this.model), "game" === this.model.get("kind") && (this.gameset || (this.gameset = new HR.SubmissionGameSetView({
parent:this
})), this.gameset.setModel(this.model), this.gameset.setGameSetCollection(this.collection), 
this.manualgameplay || (this.manualgameplay = new HR.SubmissionManualGamePlayView({
contest:this.contest
})), this.manualgameplay.setModel(this.model), this.manualgameplay.setGameSetCollection(this.collection), 
this.assign({
"#submission-manual-game-play-wrapper":this.manualgameplay,
"#submission-game-set-wrapper":this.gameset
})), this.assign({
"#submission-stats-wrapper":this.stats
}), this.delegateEvents(), this);
}, SubmissionView.prototype.renderManualGamePlay = function() {
var that;
return that = this;
}, SubmissionView.prototype.CopyToClipBoard = function(e) {
return e.preventDefault(), HR.clipboard = {
language:this.model.get("language"),
code:this.model.get("code")
}, window.HR.forkable = !0, HR.router.navigate("" + HR.appController.get_current_contest_namespace() + "/challenges/" + this.model.get("slug"), !0);
}, SubmissionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionView = SubmissionView;
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
var HR, SubmissionStatsView, _ref;
return SubmissionStatsView = function(_super) {
function SubmissionStatsView() {
return SubmissionStatsView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionStatsView, _super), SubmissionStatsView.prototype.template = "submission-stats", 
SubmissionStatsView.prototype.className = "submission-stats-view", SubmissionStatsView.prototype.events = {
"click a.js-download-test-case":"promptDialog"
}, SubmissionStatsView.prototype.initialize = function() {
return $(".change-filter").live("click", this.updateSelect), this.render();
}, SubmissionStatsView.prototype.setModel = function(model) {
return this.model && (this.model.unbind("change"), this.model.unbind("render")), 
this.model = model, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "render", this.render), 
this.render();
}, SubmissionStatsView.prototype.updateSelect = function(e) {
var src;
return e.preventDefault(), src = $(e.target), $("#selected-filter span.select").html(src.text());
}, SubmissionStatsView.prototype.render = function() {
var that;
return this.model ? (0 === this.model.get("game_total") && this.model.set("percent", 0), 
that = this, HR.requires([ "compound/game-views", "moment" ], function() {
var custom_player, data, init;
if (custom_player = HR.GameView.prototype.custom_player_count(), $(that.el).html(HR.appController.template(that.template, that)({
model:that.model.toJSON(),
singlePlayer:!!custom_player[that.model.get("codechecker_handle")]
})), "game" === that.model.get("kind")) {
switch (data = [ {
id:0,
text:"All " + that.model.get("game_played") + " Games Played",
slug:"all"
}, {
id:1,
text:"" + that.model.get("game_won") + " Games Won",
slug:"won"
}, {
id:2,
text:"" + that.model.get("game_lost") + " Games Lost",
slug:"lost"
}, {
id:3,
text:"" + that.model.get("game_mid_range") + " Games Tied",
slug:"tied"
} ], init = 0, that.model.get("filter")) {
case "won":
init = 1;
break;

case "lost":
init = 2;
break;

case "tied":
init = 3;
}
return $("#submissions-filter").select2({
data:data,
width:"off"
}), $("#submissions-filter").select2("data", data[init]), $("#submissions-filter").bind("change", function() {
return Backbone.history.navigate("" + HR.appController.get_current_contest_namespace() + "/submissions/game/" + that.model.get("id") + "/" + $("#submissions-filter").select2("data").slug, !0);
});
}
}), this.delegateEvents(), this) :void 0;
}, SubmissionStatsView.prototype.promptDialog = function(e) {
var testcaseIndex, that, _model;
return e.preventDefault(), testcaseIndex = $(e.target).attr("testcase-num"), that = this, 
_model = this.model.toJSON(), $.ajax({
url:"/rest/contests/" + that.contestSlug() + "/testcases/" + _model.challenge_id + "/" + testcaseIndex + "/permission",
type:"GET",
success:function(data) {
return data.permission === !0 ? that.renderDownloadTestCase(testcaseIndex) :data.permission === !1 ? that.renderPurchaseTestCase(testcaseIndex) :void 0;
}
});
}, SubmissionStatsView.prototype.renderPurchaseTestCase = function(index) {
var dialog_options, that, _model;
return that = this, _model = this.model.toJSON(), dialog_options = {
title:"Purchase TestCase",
body:"<center><p> Do you wish to purchase test case #" + index + " of " + _model.name + " for 5 hackos?</p> <p class='block-center'><a href='#' class='btn btn-primary js-buy-test-case' data-analytics='Confirm Purchase Testcase'>Yes</a>&nbsp;&nbsp;&nbsp; <a href='#' class='btn btn-primary js-dont-buy' data-analytics='Cancel Purchase Testcase'>No</a></p> <div class='formgroup clearfix m'> <div class='alert error hide'></div> </div>",
events:{
"click a.js-buy-test-case":function(_this) {
return function(e) {
var current_text;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? (current_text = $(e.currentTarget).html(), 
$(e.currentTarget).html("Buying testcases..."), $(e.currentTarget).attr("disabled", "disabled"), 
that = _this, $.ajax({
url:"/rest/contests/" + that.contestSlug() + "/testcases/" + _model.challenge_id + "/" + index + "/purchase",
type:"PUT",
beforeSend:function(xhr) {
return xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function() {
return that.dialog.destroy(), that.renderDownloadTestCase(index);
},
error:function() {
return $(".alert.error").show().html("Insufficient Hackos"), $(e.currentTarget).html(current_text), 
$(e.currentTarget).removeAttr("disabled");
}
})) :void 0;
};
}(this),
"click a.js-dont-buy":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy();
};
}(this)
}
}, this.dialog = new HR.util.ShowDialog(dialog_options), this.dialog.render();
}, SubmissionStatsView.prototype.renderDownloadTestCase = function(index) {
var dialog_options, that, _model;
return that = this, _model = this.model.toJSON(), dialog_options = {
title:"Download TestCase #" + index,
body:"<center><p> Download Test Case #" + index + " of " + _model.name + "</p> <p class='block-center'><a href='#' class='btn btn-primary js-download-test-case' command='testcaseinput' data-analytics='Download Input'>Input</a>&nbsp;&nbsp;&nbsp; <a href='#' class='btn btn-primary js-download-test-case' command='testcaseoutput' data-analytics='Download Output'>Output</a></p> <div class='formgroup clearfix m'> <div class='alert error hide'></div> </div>",
events:{
"click a.js-download-test-case":function() {
return function(e) {
var command;
return command = $(e.target).attr("command"), e.preventDefault(), window.open("/rest/contests/" + that.contestSlug() + "/testcases/" + _model.challenge_id + "/" + index + "/" + command, "_blank");
};
}(this)
}
}, this.dialog = new HR.util.ShowDialog(dialog_options), this.dialog.render();
}, SubmissionStatsView.prototype.contestSlug = function() {
return this.model.get("contest_slug");
}, SubmissionStatsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionStatsView = SubmissionStatsView;
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
var HR, SubmissionSuccessView, _ref;
return SubmissionSuccessView = function(_super) {
function SubmissionSuccessView() {
return SubmissionSuccessView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionSuccessView, _super), SubmissionSuccessView.prototype.template = "submission-success", 
SubmissionSuccessView.prototype.className = "submission-success-view", SubmissionSuccessView.prototype.initialize = function() {
return this.hacker = HR.profile();
}, SubmissionSuccessView.prototype.events = {
"click a.close":"destroy",
"click a.fb-share":"fbShare",
"click a.tweet":"tweet"
}, SubmissionSuccessView.prototype.render = function() {
var personalize, score;
return score = Math.floor(100 * this.model.score) / 100 || 0, score > 0 ? (personalize = "&nbsp;&nbsp;&nbsp;\n<a class='fb-share' style='cursor:pointer;'><img src='/assets/fb-share.png'></a>\n&nbsp;&nbsp;&nbsp;\n<a class='tweet' style='cursor:pointer;'><img src='/assets/tweet-filler.png'></a>\n<a class='hr_tour-leaderboard backbone' href='" + HR.appController.get_current_contest_namespace() + "/challenges/" + this.model.slug + "/leaderboard'>Go to leaderboard</a>", 
window.touring && HR.requires([ "jquery-plugins/jquery.joyride" ], function() {
return function() {
return setTimeout(function() {
return $("#hr_tour-intro-part-2-tour").joyride({
autoStart:!0,
tipAnimation:"fade"
});
}, 1500);
};
}(this))) :personalize = ":(\n&nbsp;\n<a class='backbone' href='" + HR.appController.get_current_contest_namespace() + "/challenges/" + this.model.slug + "'>Try Again</a>", 
$(this.el).html("<p class='container'>\n  <center>\n    <span>\n      Your `" + this.model.name + "`\n      <a class='backbone' href='" + HR.appController.get_current_contest_namespace() + "/submissions/" + this.model.kind + "/" + this.model.id + "'>submission</a>\n      got " + score + " points.\n    </span>\n    " + personalize + "\n  </center>\n</p>\n<a class='close' style='cursor: pointer;color:red'>&times;</a>"), 
$(this.el).fadeIn(), this.delegateEvents(), this;
}, SubmissionSuccessView.prototype.destroy = function(e) {
return e && e.preventDefault && e.preventDefault(), $(this.el).remove(), SubmissionSuccessView.__super__.destroy.call(this);
}, SubmissionSuccessView.prototype.fbShare = function(e) {
var score, url;
return e.preventDefault(), url = this.getURL(), score = Math.round(100 * this.model.score) / 100 || 0, 
window.HR.appController.facebook_share(url, "I scored " + score + " points in the " + this.model.name + " challenge on HackerRank " + url);
}, SubmissionSuccessView.prototype.tweet = function(e) {
var score, url;
return score = 100 * Math.round(this.model.score) / 100 || 0, e.preventDefault(), 
url = this.getURL(), HR.appController.twitter_share("I scored " + score + " points in the " + this.model.name + " challenge on HackerRank " + url);
}, SubmissionSuccessView.prototype.getURL = function() {
var prefix, suffix;
return prefix = document.location.protocol + "//" + document.location.host, suffix = "" + HR.appController.get_current_contest_namespace() + "/submissions/" + this.model.kind + "/" + this.model.id, 
prefix + suffix;
}, SubmissionSuccessView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionSuccessView = SubmissionSuccessView;
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
var HR, SubmissionGameSetView, _ref;
return SubmissionGameSetView = function(_super) {
function SubmissionGameSetView() {
return SubmissionGameSetView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionGameSetView, _super), SubmissionGameSetView.prototype.template = "submission-game-set", 
SubmissionGameSetView.prototype.className = "submission-game-set-view", SubmissionGameSetView.prototype.initialize = function(options) {
return this._collection = new HR.GameSetCollection(), this.parent = options.parent, 
this.gamesetlist = {}, this.has_template = !1, this.compareCollection();
}, SubmissionGameSetView.prototype.setModel = function(model) {
return this.model && (this.model.unbind("change", this.gamesetCollectionFetch, this), 
this.model.unbind("reset", this.gamesetCollectionFetch, this)), this.model = model, 
this.model.bind("change", this.gamesetCollectionFetch, this), this.model.bind("reset", this.gamesetCollectionFetch, this);
}, SubmissionGameSetView.prototype.gamesetCollectionFetch = function() {
return "game" === this.model.get("kind") ? this.collection.fetch({
disable_throbber:!0
}) :void 0;
}, SubmissionGameSetView.prototype.closeOtherGameContainersExcept = function(model) {
return _.each(this.gamesetlist, function(gamesetview) {
return void 0 !== gamesetview ? gamesetview.hideGameContainerExcept(model) :void 0;
}, this);
}, SubmissionGameSetView.prototype.setGameSetCollection = function(collection) {
return collection ? (this.collection && (this.collection.unbind("reset"), this.collection.unbind("change")), 
this.collection = collection, this.collection.bind("reset", this.render, this), 
this.collection.bind("change", this.render, this), this.compareCollection()) :void 0;
}, SubmissionGameSetView.prototype.resetGameSetView = function() {
return this.rendered = !1;
}, SubmissionGameSetView.prototype.compareCollection = function() {
var previous_gameset, temp, _model_ids;
if (this.has_template) return _model_ids = [], _.each(this._collection.models, function(model) {
return _model_ids.push(model.get("id"));
}, this), _.each(_model_ids, function(_m_id) {
var exists, model;
return model = this._collection.get(_m_id), exists = this.collection.get(model.get("id")), 
exists ? void 0 :this.removeGameSetView(model);
}, this), previous_gameset = null, this.collection.models.length > 0 ? this.$(".throbber").length > 0 && this.$(".throbber").remove() :this.$(".game-set-wrapper").html("<div class='throbber' style='padding: 95px 0; height: 64px;'> <img src='https://s3.amazonaws.com/hr-logos/hackerrank_spinner_64x64.gif'> </div>"), 
this.model.get("total_players") < this.model.get("player_count") ? this.$(".game-set-wrapper").html("<div class='throbber' style='padding:95px 0; height: 64px;'> <h3 class='loading-message m'>There are no opponents to play with yet.</h3> </div>") :0 === this.collection.total ? (temp = {
all:"Your game is being processed... Please wait.",
won:"Your bot did not win any games.",
lost:"Congratulations, your bot did not lose any games.",
tie:"Your bot did not tie any games."
}, "all" === this.collection.getFilter() ? (this.$(".game-set-wrapper").html("<div class='throbber'>" + HR.appController.viewLoader(64) + ("<div class='throbber' style='padding:0; height: 64px;'> <h3 class='loading-message m'>" + temp[this.collection.getFilter()] + "</h3> </div></div>")), 
1 !== this.model.get("player_count") && this.updateWait()) :this.$(".game-set-wrapper").html("<div class='throbber' style='padding:95px 0; height: 64px;'> <h3>" + temp[this.collection.getFilter()] + "</h3> </div>")) :this.timer && clearTimeout(this.timer), 
_.each(this.collection.models, function(model) {
var exists, id;
return id = model.get("id"), exists = this._collection.get(id), exists ? this.gamesetlist[id].setGameSetModel(model) :(null === previous_gameset ? 0 !== this.$(".game-set-wrapper").children().length ? this.$(".game-set-wrapper").children(":first").before("<div class='game-set-list' id='game-set-list-" + id + "'></div>") :this.$(".game-set-wrapper").append("<div class='game-set-list' id='game-set-list-" + id + "'></div>") :this.$(".game-set-wrapper #game-set-list-" + previous_gameset).after("<div class='game-set-list' id='game-set-list-" + id + "'></div>"), 
this.gamesetlist[id] || (this.gamesetlist[id] = new HR.SubmissionGameSetListView({
submission:this.model,
parent:this
}), this.add_subview(this.gamesetlist[id])), this.gamesetlist[id].setElement(this.$(".game-set-wrapper #game-set-list-" + id)).render(), 
this._collection.add(model), this.gamesetlist[id].setGameSetModel(this.collection.get(model.get("id")))), 
previous_gameset = id;
}, this), this.setPagination();
}, SubmissionGameSetView.prototype.updateWait = function(start) {
return null == start && (start = 0), $(this.el).find(".loading-message").html("Fetching opponents data " + new Array(start % 3 + 1).join(".")), 
clearTimeout(this.timer), this.timer = setTimeout(function(_this) {
return function() {
return _this.updateWait(start + 1);
};
}(this), 5e3);
}, SubmissionGameSetView.prototype.removeGameSetView = function(model) {
var id;
return id = model.get("id"), this._collection.remove(model), this.gamesetlist[id] && (this.gamesetlist[id].hideGameContainerExcept, 
this.gamesetlist[id] = void 0), this.$(".game-set-wrapper #game-set-list-" + id).fadeOut().remove();
}, SubmissionGameSetView.prototype.render = function() {
return this.setTemplate(), this;
}, SubmissionGameSetView.prototype.setTemplate = function() {
return this.has_template ? (this.applyTemplate(), this.compareCollection()) :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.applyTemplate(), 
this.compareCollection();
}, this);
}, SubmissionGameSetView.prototype.applyTemplate = function() {
return this.rendered ? void 0 :($(this.el).html(this._template()), this._collection = new HR.GameSetCollection(), 
this.gamesetlist = {}, this.rendered = !0);
}, SubmissionGameSetView.prototype.setPagination = function() {
var that, _filter;
return (this._collection.page !== this.collection.page || this._collection.total !== this.collection.total) && this.has_template && this.rendered ? (this._collection.page = this.collection.page, 
this._collection.total = this.collection.total, _filter = this.collection.getFilter(), 
HR.util.pagination(this.$(".pagination-wrapper"), this._collection.total, "" + HR.appController.get_current_contest_namespace() + "/submissions/game/" + this.model.get("id") + "/" + this.collection.getFilter() + "/page/", this._collection.page, null, 5, 10, "change-gameset"), 
that = this, this.$(".pagination a.change-gameset").click(function(e) {
var gameset_collection, href, page, submission_id, _gameset_clbk;
return e.preventDefault(), page = parseInt($(e.currentTarget).attr("data-page")), 
href = $(e.currentTarget).attr("href"), submission_id = that.collection.getSid(), 
_gameset_clbk = function(collection) {
return collection.setPage(page), collection.setFilter(_filter), collection.setSid(submission_id);
}, HR.router.navigate(href, !1), gameset_collection = HR.appController.getCollection("gameset", "id-" + submission_id + "-" + _filter + "-page-" + page, _gameset_clbk, !0, !0), 
that.parent.setGameSetCollection(gameset_collection);
})) :void 0;
}, SubmissionGameSetView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionGameSetView = SubmissionGameSetView;
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
var HR, SubmissionGameSetListView, _ref;
return SubmissionGameSetListView = function(_super) {
function SubmissionGameSetListView() {
return SubmissionGameSetListView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionGameSetListView, _super), SubmissionGameSetListView.prototype.template = "submission-game-set-list", 
SubmissionGameSetListView.prototype.className = "submission-game-set-view-list", 
SubmissionGameSetListView.prototype.initialize = function(options) {
return this.parent = options.parent, this.submission = options.submission, this._collection = new HR.GameCollection(), 
this.has_template = !1;
}, SubmissionGameSetListView.prototype.events = {
"click .play_game":"showGameContainer"
}, SubmissionGameSetListView.prototype.render = function() {
return this.renderTemplate(), this;
}, SubmissionGameSetListView.prototype.renderTemplate = function() {
return this.has_template ? this.setGameSetModel(this.model) :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.setGameSetModel(this.model);
}, this);
}, SubmissionGameSetListView.prototype.compareGamesetModel = function() {
return this._model && this.model ? !this._compareObjects(this._model.attributes, this.model.attributes) :this.model || this.model ? !0 :!1;
}, SubmissionGameSetListView.prototype._compareObjects = function(obj1, obj2) {
var changed;
return changed = !1, obj1 && obj2 ? _.isArray(obj1) && _.isArray(obj2) ? _.size(obj1) === _.size(obj2) ? _.each(obj1, function(_obj1) {
var _changed;
return _changed = !0, _.each(obj2, function(_obj2) {
return this._compareObjects(_obj1, _obj2) ? _changed = !1 :void 0;
}, this), _changed === !0 ? changed = !0 :void 0;
}, this) :changed = !0 :_.isObject(obj1) && _.isObject(obj2) ? _.size(obj1) === _.size(obj2) ? _.each(obj1, function(value, key) {
return this._compareObjects(obj2[key], value) ? void 0 :changed = !0;
}, this) :changed = !0 :obj1 !== obj2 && (changed = !0) :(obj1 || obj2) && (changed = !0), 
!changed;
}, SubmissionGameSetListView.prototype.setGameSetModel = function(model) {
var enable_game_play, games;
return model && (this.model = model, (this.compareGamesetModel() || !this.has_rendered) && (this.model && this._template && (this._model && (this._model.unbind("change"), 
this._model.unbind("render")), this._model = this.model, this._model.bind("change", this.render, this), 
this._model.bind("render", this.render, this), this.has_rendered = !0, $(this.el).html(this._template()), 
this.players_view = new HR.SubmissionGameSetPlayersView({
model:this._model,
parent:this
}), this.players_view.setElement($($(this.el).find(".players"))).render(), this.add_subview(this.players_view), 
games = this._model.get("games"), enable_game_play = !1, _.each(games, function(game) {
return 1 === game.process_flag ? enable_game_play = !0 :void 0;
}), enable_game_play ? $(this.el).find("a.play_game").removeClass("disabled") :$(this.el).find("a.play_game").addClass("disabled")), 
this._model && this._model.getGameCollection)) ? (this.collection = this._model.getGameCollection(), 
this.compareCollection()) :void 0;
}, SubmissionGameSetListView.prototype.compareCollection = function() {
var previous_model_at;
if (this.collection && this.has_template) return _.each(this._collection.models, function(model) {
var exists;
return exists = this.collection.get(model.get("id")), exists ? void 0 :this._collection.remove(model);
}, this), previous_model_at = null, _.each(this.collection.models, function(model) {
var _model;
return _model = this._collection.get(model.get("id")), _model ? _model.get("updated_at") !== model.get("updated_at") && _model.set(model.attributes) :previous_model_at ? this._collection.add(model, {
at:previous_model_at
}) :this._collection.unshift(model), previous_model_at = this._collection.indexOf(model);
}, this);
}, SubmissionGameSetListView.prototype.showGameContainer = function(e) {
var that;
return e.preventDefault(), $(e.currentTarget).hasClass("disabled") ? void 0 :(this.game_container && (this.game_container.remove(), 
this.$("div.row.container").html('<div class="submission-game-container-wrapper" style="margin-left: 18px;"></div>')), 
that = this, HR.requires([ "compound/game-views" ], function() {
return that.game_container = new HR.GameContainerView({
collection:that._collection,
gameset:that._model
}), that.game_container.setElement(that.$(".submission-game-container-wrapper")).render(), 
that.add_subview(that.game_container), that.parent.closeOtherGameContainersExcept(that);
}));
}, SubmissionGameSetListView.prototype.hideGameContainerExcept = function(view) {
return view.model !== this._model && this.game_container ? this.game_container.closeContainer() :void 0;
}, SubmissionGameSetListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionGameSetListView = SubmissionGameSetListView;
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
var HR, SubmissionGameSetPlayersView, _ref;
return SubmissionGameSetPlayersView = function(_super) {
function SubmissionGameSetPlayersView() {
return SubmissionGameSetPlayersView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionGameSetPlayersView, _super), SubmissionGameSetPlayersView.prototype.template = "", 
SubmissionGameSetPlayersView.prototype.initialize = function(options) {
return this.parent = options.parent, this.model.bind("reset", this.render, this);
}, SubmissionGameSetPlayersView.prototype.render = function() {
var current_hacker_id, games, hacker_ids, hackers, html, player_count, _games, _model;
return this.model.get("actors") ? (current_hacker_id = this.parent.parent.parent.model.get("hacker_id"), 
$(this.el).html(_.template(this.template)()), _model = this.model.toJSON(), player_count = _model.actors.length, 
games = _model.games, _games = {
processed:0,
pending:0,
won:0,
lost:0,
tie:0,
score_pending:0,
score_processed:0
}, _games.total = games.length, _.each(games, function(game) {
var _actor;
if (1 !== game.process_flag) return _games.pending += 1, _games.score_pending += 1;
if (_games.processed += 1, 0 === game.status ? _games.score_pending += 1 :_games.score_processed += 1, 
1 === game.result) {
if (_actor = null, _.each(game.actors, function(actor) {
return 1 === actor.actor ? _actor = actor :void 0;
}), null !== _actor) return _actor.hacker_id === current_hacker_id ? _games.won += 1 :_games.lost += 1;
} else if (2 === game.result) {
if (_actor = null, _.each(game.actors, function(actor) {
return 2 === actor.actor ? _actor = actor :void 0;
}), null !== _actor) return _actor.hacker_id === current_hacker_id ? _games.won += 1 :_games.lost += 1;
} else if (0 === game.result) return _games.tie += 1;
}), hackers = {}, hacker_ids = [], _.each(_model.actors, function(actor) {
return hacker_ids.push(actor.hacker_id), hackers[actor.hacker_id] = actor;
}, this), html = "<style> table.stats, table.stats th, table.stats td { border: 1px solid #999; } table.stats td { padding: 5px; } table.stats { float: left; margin-right: 10px; } </style>", 
html += "<p class='span6 text-left submissions--game_list-players'>", _.each(hacker_ids, function(hacker_id) {
return current_hacker_id !== hacker_id ? html += "<img class='avatar submissions--game_list-avatar' src='" + hackers[hacker_id].hacker_avatar + "' height='25' width='25'> <span class='username submissions--game_list-name'>" + hackers[hacker_id].hacker_username + "</span>" :void 0;
}), html += "</p>", html += "<p class='span6 clearfix'>", _games.pending > 0 ? html += "<span class='process-pending'>" + _games.processed + "/" + _games.total + " games played.</span>" :(html += "<span class='result'>", 
html += 1 === player_count ? "Processed" :_games.won > _games.lost ? "You won the match" :_games.won < _games.lost ? "You lost the match" :"You tied the match", 
html += ".</span>", _games.score_pending > 0 && (html += " <span class='score-pending'>Score evaluation pending.</span>")), 
html += "</p>", $(this.el).html(html), this) :this;
}, SubmissionGameSetPlayersView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionGameSetPlayersView = SubmissionGameSetPlayersView;
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
var HR, SubmissionGameContainerView, _ref;
return SubmissionGameContainerView = function(_super) {
function SubmissionGameContainerView() {
return SubmissionGameContainerView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionGameContainerView, _super), SubmissionGameContainerView.prototype.template = "submission-game-container", 
SubmissionGameContainerView.prototype.className = "submission-game-container-view", 
SubmissionGameContainerView.prototype.initialize = function(options) {
return this.parent = options.parent, this.render();
}, SubmissionGameContainerView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)()), this.delegateEvents(), 
this;
}, SubmissionGameContainerView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionGameContainerView = SubmissionGameContainerView;
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
var HR, SubmissionManualGamePlayView, _ref;
return SubmissionManualGamePlayView = function(_super) {
function SubmissionManualGamePlayView() {
return SubmissionManualGamePlayView.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionManualGamePlayView, _super), SubmissionManualGamePlayView.prototype.template = "submission-manual-game-play", 
SubmissionManualGamePlayView.prototype.className = "submission-manual-game-play-view", 
SubmissionManualGamePlayView.prototype.initialize = function(options) {
return this.contest = options.contest;
}, SubmissionManualGamePlayView.prototype.render = function() {
return this.has_template ? this.applyTemplate() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.applyTemplate(), this.has_template = !0;
}, this), this;
}, SubmissionManualGamePlayView.prototype.applyTemplate = function() {
return !this.rendered() && this._template && this.model && this.model.sync_status ? ($(this.el).html(this._template({
model:this.model,
_model:this.model.toJSON()
})), this.renderView()) :void 0;
}, SubmissionManualGamePlayView.prototype.rendered = function() {
return "" !== $(this.el).html();
}, SubmissionManualGamePlayView.prototype.renderView = function() {
var that;
return that = this, 0 !== this.$(".select2-container").length ? ($(this.el).html(""), 
this.$("#moreplayers").unbind("change"), this.render(), void 0) :(this.$("#moreplayers").select2({
placeholder:"Challenge another hacker",
minimumInputLength:2,
ajax:{
url:"/rest/contests/" + this.contest.get("slug") + "/challenges/" + this.model.get("slug") + "/hackers/autocomplete",
dataType:"json",
data:function(term) {
return {
q:term,
challenge_id:that.model.get("challenge_id")
};
},
results:function(data) {
return data;
}
}
}), that = this, this.$("#moreplayers").change(function(e) {
var against;
return against = $(e.currentTarget).val(), $("#loadingagainst").show(), that.$("img.spinner").show(), 
$.post("/rest/games/", {
id:that.model.get("id"),
against:against,
challenge_id:that.model.get("challenge_id")
}, function(data) {
return that.contest && that.contest.get("id") && 1 !== that.contest.get("id") ? HR.router.navigate("/contests/" + that.contest.get("slug") + "/submissions/" + that.model.get("kind") + "/" + that.model.get("id") + "/page/" + data.page, !0) :HR.router.navigate("/submissions/" + that.model.get("kind") + "/" + that.model.get("id") + "/page/" + data.page, !0), 
that.$("img.spinner").hide(), that.model.fetch({
force_fetch:!0
}), that.$("#loadingagainst").hide(), that.render(), that.renderView();
});
}), this.delegateEvents);
}, SubmissionManualGamePlayView.prototype.setModel = function(model) {
return this.model && (this.model.unbind("reset", this.render, this), this.model.unbind("change", this.render, this)), 
this.model = model, this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.render();
}, SubmissionManualGamePlayView.prototype.setGameSetCollection = function(collection) {
return this.collection && (this.collection.unbind("reset", this.render, this), this.collection.unbind("change", this.render, this)), 
this.collection = collection, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "change", this.render), this.render();
}, SubmissionManualGamePlayView.prototype.playagainst = function() {}, SubmissionManualGamePlayView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionManualGamePlayView = SubmissionManualGamePlayView;
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
var HR, JudgeSubmissionsView, _ref;
return JudgeSubmissionsView = function(_super) {
function JudgeSubmissionsView() {
return JudgeSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(JudgeSubmissionsView, _super), JudgeSubmissionsView.prototype.template = "judge-submissions", 
JudgeSubmissionsView.prototype.className = "judge-submissions-view", JudgeSubmissionsView.prototype.initialize = function(options) {
return this.team_slug = options.team_slug, this.challenge_slug = options.challenge_slug, 
this.listenTo(this.collection, "reset", this.render), _.isObject(this.collection.challenge) ? this.listenToOnce(this.collection.challenge("reset", this.render)) :void 0;
}, JudgeSubmissionsView.prototype.render = function() {
var bread_crumbs_view, models, url_add;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
team_slug:this.team_slug,
challenge_slug:this.challenge_slug
})), bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.collection.breadCrumbs()), 
this.add_subview(bread_crumbs_view), url_add = "", this.team_slug && (url_add = "team/" + this.team_slug + "/"), 
this.challenge_slug && (url_add = "challenge/" + this.challenge_slug + "/"), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL() + url_add, this.collection.getCurrentPage()), 
this.$(".submissions-list-wrapper").length > 0 && (this.collection.sync_status ? (this.$(".submissions-list-wrapper").html(""), 
models = _.sortBy(this.collection.models, function(model) {
return -1 * model.get("created_at");
}), _.each(models, function(model) {
var _view;
return _view = new HR.JudgeSubmissionsListView({
model:model
}), this.$(".submissions-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this)) :this.$(".submissions-list-wrapper").append(HR.appController.viewLoader(64))), 
this;
}, JudgeSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.JudgeSubmissionsView = JudgeSubmissionsView;
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
var HR, JudgeSubmissionsListView, _ref;
return JudgeSubmissionsListView = function(_super) {
function JudgeSubmissionsListView() {
return JudgeSubmissionsListView.__super__.constructor.apply(this, arguments);
}
return __extends(JudgeSubmissionsListView, _super), JudgeSubmissionsListView.prototype.template = "judge-submissions-list", 
JudgeSubmissionsListView.prototype.className = "judge-submissions-list-view", JudgeSubmissionsListView.prototype.initialize = function() {
return this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, JudgeSubmissionsListView.prototype.events = {
"change .hr_set-status":"updateStatus"
}, JudgeSubmissionsListView.prototype.tooltip = function() {
var index, status, text, _i, _len, _ref;
for (text = "", _ref = this.model.get("testcase_message"), index = _i = 0, _len = _ref.length; _len > _i; index = ++_i) status = _ref[index], 
text += "Testcase #" + index + ": " + status + "<br/>";
return text;
}, JudgeSubmissionsListView.prototype.formatTime = function(minutes) {
return "" + Math.ceil(minutes);
}, JudgeSubmissionsListView.prototype.updateStatus = function(e) {
var cbox;
return cbox = $(e.currentTarget), this.model.set("status_code", cbox.is(":checked") === !0 ? 2 :121), 
this.model.save({
success:function(_this) {
return function() {
return _this.model.collection.fetch();
};
}(this)
});
}, JudgeSubmissionsListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
tooltip:this.tooltip(),
model:this.model,
challenge:this.model.get("challenge"),
ns:this.model.ns(),
formattedTime:this.formatTime(this.model.get("time_from_start"))
})), this.delegateEvents(), this;
}, JudgeSubmissionsListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.JudgeSubmissionsListView = JudgeSubmissionsListView;
});
}.call(this);