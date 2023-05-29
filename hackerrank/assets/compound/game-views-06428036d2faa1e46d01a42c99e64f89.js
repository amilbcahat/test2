/*
 * jChess 0.1.0 - Chess Library Built From jQuery
 *
 * Copyright (c) 2008 Ben Marini
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
if (function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ShowGameView, _ref;
return ShowGameView = function(_super) {
function ShowGameView() {
return ShowGameView.__super__.constructor.apply(this, arguments);
}
return __extends(ShowGameView, _super), ShowGameView.prototype.template = "show-game", 
ShowGameView.prototype.className = "show-game-view container", ShowGameView.prototype.initialize = function() {
return this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render);
}, ShowGameView.prototype.render = function() {
return this.gameset = new HR.GameSetModel(), this.contest_slug && (this.gameset.contest_slug = this.contest_slug), 
this.gameset.add(this.model), this.has_template ? (this.applyTemplate(), this.renderGameView()) :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.applyTemplate(), 
this.renderGameView();
}, this), this;
}, ShowGameView.prototype.applyTemplate = function() {
return !this.rendered && this._template && this.model.sync_status ? ($(this.el).html(this._template({
model:this.gameset.game_collection.models[0].toJSON()
})), this.rendered = !0) :void 0;
}, ShowGameView.prototype.renderGameView = function() {
var that;
return that = this, HR.requires("compound/game-views", function(_this) {
return function() {
var game_container;
return game_container = new HR.GameContainerView({
collection:that.gameset.getGameCollection(),
gameset:that.gameset,
contest_slug:_this.contest_slug
}), game_container.setElement(that.$(".game-container-wrapper")).render(), that.add_subview(game_container);
};
}(this));
}, ShowGameView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ShowGameView = ShowGameView;
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
var GameContainerView, HR, _ref;
return GameContainerView = function(_super) {
function GameContainerView() {
return GameContainerView.__super__.constructor.apply(this, arguments);
}
return __extends(GameContainerView, _super), GameContainerView.prototype.template = "game-container", 
GameContainerView.prototype.className = "game-container-view", GameContainerView.prototype.events = {
"click .close":"closeContainer",
"click a#play":"playGame",
"click a#pause":"pauseGame",
"click a#step-forward":"stepForward",
"click a#step-backward":"stepBackward",
"click a#stop":"stopGame",
"click a[data-toggle=tab_]":"shiftTab"
}, GameContainerView.prototype.initialize = function(options) {
return this.collection || (this.collection = new HR.GameCollection()), options.contest_slug && (this.contest_slug = options.contest_slug), 
this.collection.bind("reset", this.render, this), this.collection.bind("change", this.addNewGameTab, this), 
this.collection.bind("add", this.addNewGameTab, this), this.gameset = options.gameset, 
this.initialize_instance_variables();
}, GameContainerView.prototype.initialize_instance_variables = function() {
return this.tab_id = 0, this.viewCleanup(), this.killTimer();
}, GameContainerView.prototype.viewCleanup = function() {
return this.$("button#stop").click(), this.unSetInfoMessage(), this.clearMoves();
}, GameContainerView.prototype.killTimer = function() {
return HR.gameTimer ? window.clearTimeout(HR.gameTimer) :void 0;
}, GameContainerView.prototype.render = function() {
return this.has_template ? (this.applyTemplate(), this.addNewGameTab()) :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.applyTemplate(), 
this.addNewGameTab();
}, this), $(this.el).fadeIn(), this;
}, GameContainerView.prototype.applyTemplate = function() {
return !this.rendered && this._template ? ($(this.el).html(this._template()), this.rendered = !0, 
this.render()) :void 0;
}, GameContainerView.prototype.addNewGameTab = function() {
return this.rendered ? (_.each(this.collection.models, function(model) {
var game_id;
return game_id = model.get("id"), this.$(".nav-tabs").length > 0 ? model.get("message") ? this.addTab(game_id) :this.addFakeTab(game_id) :void 0;
}, this), this.loadFirstGame()) :void 0;
}, GameContainerView.prototype.loadFirstGame = function() {
var game_id, model, models, that, _model;
return this.collection.models.length > 0 && (models = _.filter(this.collection.models, function(model) {
return model.get("message");
}), models.length > 0) ? (model = models[0], game_id = model.get("id"), _model = model.toJSON(), 
this.$(".nav-tabs li[game-id=" + game_id + "]").length > 0 && (this.$(".nav-tabs li[game-id=" + game_id + "] a").click(), 
that = this, setTimeout(function() {
return 0 === that.$(".tab-content").html().length ? that.loadFirstGame() :void 0;
}, 300)), null === _model.moves && null === _model.message ? this.hideControls() :this.showControls()) :void 0;
}, GameContainerView.prototype.setDownloadLink = function() {
var that;
return that = this, this.game_view ? (this.$("p.download-wrap").show(), this.$("p.download-wrap a.download").attr("href", this.game_view.getMovesDownloadLink(that.gameset))) :void 0;
}, GameContainerView.prototype.setSocialComponent = function() {
var that, _model;
return this.gameset ? (_model = this.gameset.toJSON(), that = this, this.$(".fb-share").unbind("click").bind("click", function(e) {
var h, left, permalink, top, url, w;
return permalink = that.getPermalink(), e.preventDefault(), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(document.location.href), 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}), this.$(".tweet").unbind("click").bind("click", function(e) {
var challenge_name, h, left, permalink, player1_username, player2_username, text, top, url, w;
return permalink = that.getPermalink(), e.preventDefault(), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, player1_username = that.getPlayerUsername(1), player2_username = that.getPlayerUsername(2), 
challenge_name = that.gameset.game_collection.models[0].attributes.challenge_name, 
text = "Check out " + challenge_name + " between @" + player1_username + " and @" + player2_username + " on @hackerrank " + permalink, 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}), this.$(".permalink").unbind("click").attr("href", that.getPermalink())) :this.$("ul.social-component").hide();
}, GameContainerView.prototype.getPermalink = function() {
return this.gameset && this.game_view && this.game_view.model ? "" + document.location.protocol + "//" + document.location.host + "/showgame/" + this.model.get("id") :void 0;
}, GameContainerView.prototype.getPlayerUsername = function(number) {
return this.gameset ? this.model.attributes.actors[number - 1].hacker_username :void 0;
}, GameContainerView.prototype.closeContainer = function(e) {
return null == e && (e = null), e && e.preventDefault(), $(this.el).hide(), this.initialize_instance_variables();
}, GameContainerView.prototype.playGame = function(e) {
return e.preventDefault(), this.game_view && this.game_view.playGame(e), !1;
}, GameContainerView.prototype.pauseGame = function(e) {
return e.preventDefault(), this.game_view && this.game_view.pauseGame(e), !1;
}, GameContainerView.prototype.stepForward = function(e) {
return e.preventDefault(), this.game_view && this.game_view.stepForward(e), !1;
}, GameContainerView.prototype.stepBackward = function(e) {
return e.preventDefault(), this.game_view && this.game_view.stepBackward(e), !1;
}, GameContainerView.prototype.stopGame = function(e) {
return e.preventDefault(), this.game_view && this.game_view.stopGame(e), !1;
}, GameContainerView.prototype.getCurrentTabId = function() {
return parseInt($(this.el).find(".nav-tabs li.active a").attr("data-player"));
}, GameContainerView.prototype.setInfoMessage = function(msg) {
return this.$(".game-info-message").html(msg);
}, GameContainerView.prototype.unSetInfoMessage = function() {
return this.$(".game-info-message").html("");
}, GameContainerView.prototype.clearMoves = function() {
return this.move_views = {}, this.$("#game-moves").html("");
}, GameContainerView.prototype.hideControls = function() {
return $(this.el).find("div.controls").hide(), this.$("p.download-wrap").hide(), 
this.$("ul.social-component").hide();
}, GameContainerView.prototype.showControls = function() {
return $(this.el).find("div.controls").show(), this.$("p.download-wrap").attr("href") && this.$("p.download-wrap").show(), 
this.$("ul.social-component").show();
}, GameContainerView.prototype.addMove = function(move_data) {
var step;
return step = move_data.step, this.move_views || (this.move_views = {}), this.move_views[step] || (this.move_views[step] = new HR.GameMovesView({
template:this.$("#moves-template").html()
}), 0 === this.$("#game-moves #game-moves-" + step).length && this.$("#game-moves").append("<div class='game-moves-wrap' id='game-moves-" + step + "'></div>"), 
this.move_views[step].setElement(this.$("#game-moves #game-moves-" + step)).render(), 
this.add_subview(this.move_views[step])), this.move_views[step].addData(move_data);
}, GameContainerView.prototype.addTabHTML = function(game_id) {
var tab_id;
return 0 === this.$(".nav-tabs li[game-id=" + game_id + "]").length ? (this.tab_id += 1, 
tab_id = this.tab_id, this.$(".nav-tabs").append("<li game-id='" + game_id + "'></li>")) :tab_id = parseInt(this.$(".nav-tabs li[game-id=" + game_id + "]").attr("tab-id")), 
tab_id;
}, GameContainerView.prototype.addFakeTab = function(game_id) {
var $a, $tab, tab_id;
return tab_id = this.addTabHTML(game_id), $tab = this.$(".nav-tabs li[game-id=" + game_id + "]"), 
$tab.attr("data-status", "wait"), $tab.attr("tab-id", tab_id), $tab.html("<a class='cursor playertab'></a>"), 
$a = $tab.find("a"), $a.html("<i class='icon-time' class='time-wait-icon'></i>Game " + tab_id);
}, GameContainerView.prototype.addTab = function(game_id) {
var $a, $tab, tab_id;
return tab_id = this.addTabHTML(game_id), $tab = this.$(".nav-tabs li[game-id=" + game_id + "]"), 
$tab.attr("data-status", "ready"), $tab.attr("tab-id", tab_id), $tab.html("<a class='cursor playertab'></a>"), 
$a = $tab.find("a"), $a.attr("data-toggle", "tab_"), $a.html("Game " + tab_id);
}, GameContainerView.prototype.renderTab = function(game_id, tab_id) {
return this.model = this.collection.get(game_id), this.game_view = new HR.GameView({
model:this.model,
parent:this
}), this.setSocialComponent(), this.setDownloadLink(), this.$(".tab-content").html("<div class='content game-tab'><div id='game-grid-" + tab_id + "' class='clearfix' style='clear: both;'></div></div>"), 
this.game_view.setElement(this.$("#game-grid-" + tab_id)).render(), this.add_subview(this.game_view), 
$(this.el).find("div.controls").show(), $(this.el).find(".tab-content").show(), 
$(this.el).find("div.waiting").hide(), $(this.el).find(".tab-content div.content").addClass("active");
}, GameContainerView.prototype.shiftTab = function(e) {
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :($(e.currentTarget).parent().parent().find("li").removeClass("active"), 
$(e.currentTarget).parent().addClass("active"), this.$(".tab-content .content").unbind().die().remove(), 
this.$(".tab-content").html(HR.appController.viewLoader(64)), this.renderTab(parseInt($(e.currentTarget).parent().attr("game-id")), parseInt($(e.currentTarget).parent().attr("tab-id"))));
}, GameContainerView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameContainerView = GameContainerView;
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
var GameView, HR, _ref;
return GameView = function(_super) {
function GameView() {
return GameView.__super__.constructor.apply(this, arguments);
}
return __extends(GameView, _super), GameView.prototype.template = "<div class='players'></div> <div class='animation'></div>", 
GameView.prototype.className = "game-view", GameView.prototype.default_timeout = 600, 
GameView.prototype.default_player_count = 2, GameView.prototype.default_steps = 1, 
GameView.prototype.initialize = function(options) {
var error, key_prefix;
if (this.parent = options.parent, this.timeout = 600, this.pause = !1, this.move = 0, 
this.semaphore = 0, this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.bind("fetched-json-data", this.render), HR.gameTimer && clearTimeout(HR.gameTimer), 
key_prefix = this.model.get("codechecker_stdin") ? "codechecker_" :"", "string" == typeof this.model.get("" + key_prefix + "stdin")) try {
this.codechecker_stdin = $.parseJSON(this.model.get("" + key_prefix + "stdin")), 
this.codechecker_stdout = $.parseJSON(this.model.get("" + key_prefix + "stdout")), 
this.codechecker_stderr = $.parseJSON(this.model.get("" + key_prefix + "stderr")), 
this.codechecker_moves = $.parseJSON(this.model.get("moves")), this.trigger("fetched-json-data");
} catch (_error) {
error = _error, this.getJSON(this.model.get("" + key_prefix + "stdin"), "codechecker_stdin"), 
this.getJSON(this.model.get("" + key_prefix + "stdout"), "codechecker_stdout"), 
this.getJSON(this.model.get("" + key_prefix + "stderr"), "codechecker_stderr"), 
this.getJSON(this.model.get("moves"), "codechecker_moves");
} else this.codechecker_stdin = this.model.get("" + key_prefix + "stdin"), this.codechecker_stdout = this.model.get("" + key_prefix + "stdout"), 
this.codechecker_stderr = this.model.get("" + key_prefix + "stderr"), this.codechecker_moves = $.parseJSON(this.model.get("moves")), 
this.trigger("fetched-json-data");
return this.player = "1";
}, GameView.prototype.render = function() {
var SubView;
return this.semaphore > 0 ? this :(this.subview || (SubView = this.getSubView(), 
this.timeout = this.getTimeout(), this.backMoveFromSubView = this.getBackMove(), 
this.subview = new SubView({
model:this.model,
parent:this
}), this.add_subview(this.subview)), this.playersview || (this.playersview = new HR.GamePlayersView({
model:this.model,
parent:this
}), this.add_subview(this.playersview)), 0 === $(this.el).find(".animation").length && $(this.el).html(this.template), 
this.playersview.setElement($($(this.el).find(".players"))).render(), this.subview.setElement($($(this.el).find(".animation"))).render(), 
this.delegateEvents(), this);
}, GameView.prototype.getSteps = function() {
return this.custom_steps()[this.model.get("codechecker_handle")] || this.default_steps;
}, GameView.prototype.getJSON = function(url, binding) {
var that;
return this.semaphore += 1, that = this, $.getJSON(url, function(data) {
var get_siblings;
return that.semaphore -= 1, that[binding] = data.payload, get_siblings = function(data) {
return data.next ? $.getJSON("https://" + url.split("/")[2] + "/" + data.next, function(data) {
return that[bindings] = that[bindings].concat(data.payload), get_siblings(data);
}) :void 0;
}, get_siblings(data), 0 === that.semaphore ? that.trigger("fetched-json-data") :void 0;
});
}, GameView.prototype.stepForward = function() {
return this.pauseGame(), this.playMove(this.move, this.moves, "forward"), this;
}, GameView.prototype.stepBackward = function() {
var previoustimeout, start_move;
return this.pauseGame(), this.backMoveFromSubView ? this.move > this.getSteps() && (this.move = this.move - this.getSteps(), 
this.playMove(this.move - this.getSteps(), this.moves, "backward")) :(this.render(), 
this.pauseGame(), previoustimeout = this.timeout, this.timeout = 0, this.moveuntil = this.move - this.getSteps(), 
start_move = this.moveuntil > 0 ? 0 :0 - this.getSteps(), this.playMove(start_move, this.moves, "backward"), 
this.timeout = previoustimeout), this;
}, GameView.prototype.pauseGame = function() {
return this.pause = !0, this.parent.$("#pause").hide(), this.parent.$("#play").show(), 
this;
}, GameView.prototype.stopGame = function() {
return this.move = 0, this.pauseGame(), this.render(), this.pauseGame(), this.parent.clearMoves(), 
this.parent.unSetInfoMessage(), _.isFunction(this.subview.stopGame) && this.subview.stopGame(), 
this;
}, GameView.prototype.playGame = function() {
var next_move, that;
return this.pause = !1, this.parent.$("#pause").show(), this.parent.$("#play").hide(), 
that = this, this.endGame && (this.parent.$("a#stop").click(), that = this, setTimeout(function() {
return that.endGame = !1, that.parent.$("a#play").click();
}, 300)), next_move = this.move ? this.move + this.getSteps() :0, this.playMove(next_move, this.model), 
HR.gameTimer = setTimeout(function() {
var move;
return move = that.move, next_move = move ? move + that.getSteps() :0, that.playMove(next_move, that.model);
}, that.timeout);
}, GameView.prototype.playMove = function(i, moves, source) {
var that;
return null == source && (source = ""), HR.gameTimer && window.clearTimeout(HR.gameTimer), 
this.pause === !0 && "" === source ? this :(that = this, this.move = i, moves ? this.moves = moves :(this.moves = that.model, 
moves = this.moves), _.isObject(moves.get("moves")) ? moves = moves.get("moves") :(moves = this.codechecker_moves, 
moves || (moves = [])), this.move >= moves.length ? (this.setInfoMessage(), this.parent.$("#pause").hide(), 
this.parent.$("#play").show(), this.endGame = !0, !1) :(this.focusMove(this.move), 
this.subview.playMove(this.move, moves), this.move = this.move + this.getSteps(), 
"backward" === source && this.moveuntil > this.move ? (this.backMoveFromSubView || (HR.gameTimer = setTimeout(function() {
return that.playMove(that.move, that.moves, "backward");
}, 0)), this) :("" === source && (HR.gameTimer = setTimeout(function() {
return that.playMove(that.move, that.moves);
}, that.timeout)), this)));
}, GameView.prototype.setInfoMessage = function() {
var i, message, sol, str, temp, _i, _ref;
if (message = this.model.get("message"), this.model.get("compile_and_test") && -2 !== this.model.get("result") && this.custom_player_count()[this.model.get("codechecker_handle")] && (message += " Go ahead and <a href='#'' class='submit-code'>submit your code</a>", 
$(".game-container").find("a.submit-code").live("click", this.submitCode)), message = message.split("<br/>").join("\\n"), 
message = message.split("<br />").join("\\n"), message = message.split("\n\n").join("\\n"), 
str = message.split("\\n"), message = "", str.length > 0) for (i = _i = 0, _ref = str.length; _ref >= 0 ? _ref > _i :_i > _ref; i = _ref >= 0 ? ++_i :--_i) temp = str[i], 
sol = temp.indexOf("solution"), 0 > sol && (sol = 0), temp = temp.substring(sol), 
message = message + temp + "<br/>";
return this.parent.setInfoMessage(message);
}, GameView.prototype.getMovesDownloadLink = function(gameset) {
var id, kind;
return gameset ? (id = this.model.get("id"), kind = "gamemoves") :(id = this.model.get("token"), 
kind = "cntmoves"), "" + document.location.protocol + "//" + document.location.host + "/download/" + kind + "/" + id;
}, GameView.prototype.getSubView = function() {
var SubView, codechecker_handle;
return codechecker_handle = this.model.get("codechecker_handle"), SubView = this.template_view()[codechecker_handle], 
SubView || (SubView = HR.DefaultGameView, console.error("No GameView found for game handle `" + codechecker_handle + "`")), 
SubView;
}, GameView.prototype.getPlayerCount = function() {
var codechecker_handle, player_count;
return codechecker_handle = this.model.get("codechecker_handle"), player_count = this.custom_player_count()[codechecker_handle] ? this.custom_player_count()[codechecker_handle] :this.default_player_count;
}, GameView.prototype.getTimeout = function() {
var codechecker_handle, timeout;
return codechecker_handle = this.model.get("codechecker_handle"), timeout = this.custom_timeouts()[codechecker_handle], 
timeout || this.default_timeout;
}, GameView.prototype.getBackMove = function() {
var backMoveFromSubView, codechecker_handle;
return codechecker_handle = this.model.get("codechecker_handle"), backMoveFromSubView = this.back_subview()[codechecker_handle], 
backMoveFromSubView || !1;
}, GameView.prototype.focusMove = function(i) {
var move_data, move_no, player, player_count, round, step, _i, _ref, _results;
if (0 > i) return this.parent.clearMoves(), void 0;
for (player_count = this.getPlayerCount(), this.parent.clearMoves(), _results = [], 
step = _i = 0, _ref = this.getSteps() - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; step = _ref >= 0 ? ++_i :--_i) move_no = i + step, 
player = player_count - (move_no + 1) % player_count, round = Math.floor(move_no / player_count) + 1, 
move_data = {
index:move_no,
step:step,
player:player,
round:round,
stdin:this.codechecker_stdin[move_no] || "",
stdout:this.codechecker_stdout[move_no] || "",
stderr:this.codechecker_stderr[move_no] || ""
}, _results.push(this.parent.addMove(move_data));
return _results;
}, GameView.prototype.submitCode = function(e) {
return e.preventDefault(), $(".code-checker-sub").find("button.submit").trigger("click");
}, GameView.prototype.renderMsgIfEmpty = function() {
var moves;
return moves = this.model.get("moves"), moves && 0 !== moves.length ? void 0 :this.setInfoMessage();
}, GameView.prototype.template_view = function() {
var return_value;
return return_value = {
tictactoe:HR.TicTacToeView,
discretebidding:HR.DiscreteBiddingView,
domineering:HR.DomineeringView,
antichess:HR.AntiChessView,
hip:HR.HipView,
reversi:HR.OthelloView,
pipelayer:HR.PipelayerView,
copsrobber:HR.CopsAndRobbersView,
conway:HR.ConwaysGameOfLifeView,
lightsout:HR.LightsOutView,
tronv2:HR.TronV2View,
biddingtictactoe:HR.BiddingTicTacToeView,
prisonerdilemma:HR.PrisonerDilemmaView,
morrisnine:HR.MorrisNineView,
botclean:HR.BotCleanView,
botcleanv2:HR.BotCleanV2View,
ministertrick:HR.MinisterTrickView,
botcleanr:HR.BotCleanView,
zeroandone:HR.RealNoLineView,
botcleanlarge:HR.BotCleanView,
mancala6:HR.MancalaView,
stockprediction:HR.StockPredictionView,
monopoly:HR.MonopolyView,
ppeach:HR.PPeachView,
ppeach2:HR.PPeachView,
oracle1:HR.OracleView,
oracle2:HR.OracleView,
oracle3:HR.OracleView,
oracle4:HR.OracleView,
oracle5:HR.OracleView,
oracle6:HR.OracleView,
pacman2p:HR.PacmanView,
pacman1p:HR.PacmanView,
botjeu:HR.BotjeuView,
pacmanbfs:HR.GraphTraversalView,
pacmandfs:HR.GraphTraversalView,
"pacman-ucs":HR.GraphTraversalView,
"pacman-astar":HR.GraphTraversalView,
cram:HR.CramView,
clickomania:HR.ClickOManiaView,
clobber:HR.ClobberView,
"n-puzzle":HR.SlidingBlocksView,
"tron-many":HR.TronGenericView,
connect4:HR.Connect4View,
amazons10:HR.AmazonsGameView,
uttt:HR.UltimateTicTacToeView,
hex:HR.HexGameView,
"peg-solitaire":HR.PegSolitaireView,
battleship1p:HR.BattleshipSinglePlayerView,
battleship:HR.BattleshipTwoPlayerView,
"tron-apple":HR.TronAppleView,
gomoku:HR.GomokuView,
snake:HR.SnakesOnHackerRank,
"maze-escape":HR.MazeGame,
checkers:HR.CheckersView,
pennywise:HR.PennyWiseView,
backgammon:HR.BackGammonView
};
}, GameView.prototype.custom_timeouts = function() {
var return_value;
return return_value = {
reversi:2e3,
stockprediction:200,
tron:200,
tronv2:200,
"tron-many":200,
oracle1:1e3,
oracle2:1e3,
oracle3:1e3,
oracle4:1e3,
oracle5:1e3,
oracle6:1e3,
botjeu:300,
pacman2p:100,
pacmandfs:99999999,
pacmanbfs:99999999,
"pacman-ucs":99999999,
"pacman-astar":99999999,
pacman1p:100,
amazons10:1200,
uttt:1200,
snake:300
};
}, GameView.prototype.custom_steps = function() {
var return_value;
return return_value = {
prisonerdilemma:2,
discretebidding:2
};
}, GameView.prototype.custom_player_count = function() {
var return_value;
return return_value = {
botclean:1,
botcleanr:1,
botcleanv2:1,
botcleanlarge:1,
ministertrick:1,
stockprediction:1,
ppeach:1,
ppeach2:1,
oracle1:1,
oracle2:1,
oracle3:1,
oracle4:1,
oracle5:1,
oracle6:1,
pacman1p:1,
pacmandfs:1,
pacmanbfs:1,
"pacman-ucs":1,
"pacman-astar":1,
clickomania:1,
"n-puzzle":1,
battleship1p:1,
"cow-and-bull":1
};
}, GameView.prototype.back_subview = function() {
var return_value;
return return_value = {
biddingtictactoe:!0,
morrisnine:!0,
botclean:!0,
botcleanr:!0,
botcleanv2:!0,
botcleanlarge:!0,
ministertrick:!0,
ppeach:!0,
ppeach2:!0,
oracle1:!0,
oracle2:!0,
oracle3:!0,
oracle4:!0,
oracle5:!0,
oracle6:!0,
botjeu:!0,
backgammon:!0
};
}, GameView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameView = GameView;
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
var GamePlayersView, HR, _ref;
return GamePlayersView = function(_super) {
function GamePlayersView() {
return GamePlayersView.__super__.constructor.apply(this, arguments);
}
return __extends(GamePlayersView, _super), GamePlayersView.prototype.initialize = function(options) {
return null == options && (options = {}), this.parent = options.parent, this.model.bind("reset", this.render, this), 
this.hackers = {};
}, GamePlayersView.prototype.render = function() {
var current_hacker, current_player, hackers, html, player_count;
return current_hacker = HR.profile(), player_count = this.parent.getPlayerCount(), 
current_player = 1, hackers = [], _.each(this.model.get("actors"), function(actor, idx) {
return hackers[idx] = actor;
}), html = "<table style='margin:auto;'><tbody>", html += "<tr class='trophy'>", 
_.each(hackers, function(hacker, index) {
var trophy_html;
return trophy_html = "<td hacker-id='" + hacker.hacker_id + "'></td>", 2 === hacker.state && (trophy_html = "<td hacker-id='" + hacker.hacker_id + "' style='height: 0px; position: relative;'><img style='position: absolute; top: 0; left: 0;' src='/assets/trophy.png' alt='winner' class='trophy'></td>"), 
html += trophy_html, index + 1 !== player_count ? html += "<td></td>" :void 0;
}, this), html += "</tr>", html += "<tr class='avatar'>", _.each(hackers, function(hacker, index) {
return html += "<td hacker-id='" + hacker.hacker_id + "' style='text-align: center; padding: 0 10px;'><img src='" + hacker.hacker_avatar + "' height='30' width='30' class='circle'></td>", 
index + 1 !== player_count ? html += "<td style='padding: 0 10px;'><i>vs</i></td>" :void 0;
}, this), html += "</tr>", html += "<tr class='avatar'>", _.each(hackers, function(hacker, index) {
return html += "<td hacker-id='" + hacker.hacker_id + "'>" + hacker.hacker_username + "</td>", 
index + 1 !== player_count ? html += "<td></td>" :void 0;
}, this), html += "</tr>", html += "</tbody></table>", $(this.el).html(html), this;
}, GamePlayersView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GamePlayersView = GamePlayersView;
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
var GameMovesView, HR, _ref;
return GameMovesView = function(_super) {
function GameMovesView() {
return GameMovesView.__super__.constructor.apply(this, arguments);
}
return __extends(GameMovesView, _super), GameMovesView.prototype.initialize = function(options) {
return this.template = options.template;
}, GameMovesView.prototype.render = function() {
return $(this.el).html(_.template(this.template)()), this.setRestrictorDims(), this;
}, GameMovesView.prototype.addData = function(move_data) {
var $tbody;
return $tbody = this.$(".game-moves").show().find("tbody"), $tbody.find(".move").html(move_data.index + 1), 
$tbody.find(".round").html(move_data.round), $tbody.find(".player").html(move_data.player), 
$tbody.find(".stdin").html(_.escape(move_data.stdin)), $tbody.find(".stdout").html(_.escape(move_data.stdout)), 
$tbody.find(".stderr").html(_.escape(move_data.stderr)), this.setRestrictorDims();
}, GameMovesView.prototype.setRestrictorDims = function() {
return $(this.el).find(".game-moves").length > 0 ? this.$(".restrictor").css("width", Math.round(.48 * $(this.el).find(".game-moves").width())) :void 0;
}, GameMovesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameMovesView = GameMovesView;
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
var GameTemplateView, HR, _ref;
return GameTemplateView = function(_super) {
function GameTemplateView() {
return GameTemplateView.__super__.constructor.apply(this, arguments);
}
return __extends(GameTemplateView, _super), GameTemplateView.prototype.template = "gamecontainer", 
GameTemplateView.prototype.className = "game-template-view", GameTemplateView.prototype.events = {
"click a.playertab":"changeGame",
"click a.close-container":"closeContainer"
}, GameTemplateView.prototype.initialize = function() {
return $("a.playertab").bind("click", this.changeGame);
}, GameTemplateView.prototype.changeGame = function(e) {
return e.preventDefault(), $(".icon-stop").click(), $("a#stop").click();
}, GameTemplateView.prototype.closeContainer = function(e) {
return e.preventDefault(), HR.gameTimer && window.clearTimeout(HR.gameTimer), $(".game-container").parent().html("");
}, GameTemplateView.prototype.setCallback = function(clbk) {
this.clbk = clbk;
}, GameTemplateView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this.clbk && this.clbk($(this.el)), 
this;
}, GameTemplateView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameTemplateView = GameTemplateView;
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
var AmazonsGameView, HR, _ref;
return AmazonsGameView = function(_super) {
function AmazonsGameView() {
return AmazonsGameView.__super__.constructor.apply(this, arguments);
}
return __extends(AmazonsGameView, _super), AmazonsGameView.prototype.template = "games/amazons", 
AmazonsGameView.prototype.className = "amazons-view", AmazonsGameView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, AmazonsGameView.prototype.playMove = function(i, moves_array) {
var arrow, arrow_position, arrow_x, arrow_y, ascii_grid, columns, grid_dimensions, landing_posn, move, queen_positions, rows, shooter, starting_posn;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
grid_dimensions = move[0].split(" "), rows = grid_dimensions[0], columns = grid_dimensions[1], 
ascii_grid = move[1], queen_positions = move[2].split(","), arrow_position = move[3].split(" "), 
arrow_x = arrow_position[1], arrow_y = arrow_position[0], shooter = move[4], arrow = $('<img src="/assets/games/arrow.png">'), 
0 === i ? (this.grid = $('<div class="game-grid" \\>'), _.times(rows, function(_this) {
return function(row) {
var row_el;
return row_el = $('<div class="span450" \\>'), _.times(columns, function(column) {
var clxx;
return clxx = "square-cross", (row + column) % 2 === 1 && (clxx = "square-criss"), 
row_el.append($('<div data-x="' + column + '" data-y="' + row + '" class="span45 ' + clxx + '" \\>'));
}), _this.grid.append(row_el);
};
}(this)), this.$(".game-grid-wrapper").html(this.grid), _.each(queen_positions, function(_this) {
return function(queen_position, idx) {
var posn, queen, queen_src, queen_x, queen_y, xys;
return xys = queen_position.split(" "), queen_x = xys[1], queen_y = xys[0], queen_src = 4 > idx ? "/assets/games/white-queen.png" :"/assets/games/black-queen.png", 
queen = $('<img src="' + queen_src + '" data-queen="' + idx + '" >'), posn = _this.$("[data-x=" + queen_x + "][data-y=" + queen_y + "]").position(), 
_this.$(".game-grid").append(queen), _this.$(queen).css({
position:"absolute",
left:posn.left,
top:posn.top
});
};
}(this)), landing_posn = this.$("[data-x=" + arrow_x + "][data-y=" + arrow_y + "]").position(), 
starting_posn = this.$("[data-queen=" + shooter + "]").position(), arrow.css({
left:starting_posn.left,
top:starting_posn.top,
position:"absolute",
opacity:0
}), this.$(".game-grid").append(arrow), arrow.animate({
left:landing_posn.left,
top:landing_posn.top,
opacity:1
})) :_.each(queen_positions, function(_this) {
return function(queen_position, idx) {
var posn, queen, queen_x, queen_y, xys;
return xys = queen_position.split(" "), queen_x = xys[1], queen_y = xys[0], queen = _this.$('[data-queen="' + idx + '"]'), 
posn = _this.$("[data-x=" + queen_x + "][data-y=" + queen_y + "]").position(), queen.animate({
position:"absolute",
left:posn.left,
top:posn.top
}, {
complete:function() {
return landing_posn = _this.$("[data-x=" + arrow_x + "][data-y=" + arrow_y + "]").position(), 
starting_posn = _this.$("[data-queen=" + shooter + "]").position(), arrow.css({
left:starting_posn.left,
top:starting_posn.top,
position:"absolute",
opacity:0
}), _this.$(".game-grid").append(arrow), arrow.animate({
left:landing_posn.left,
top:landing_posn.top,
opacity:1
});
}
});
};
}(this)), this;
}, AmazonsGameView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AmazonsGameView = AmazonsGameView;
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
var AntiChessView, HR, _ref;
return AntiChessView = function(_super) {
function AntiChessView() {
return AntiChessView.__super__.constructor.apply(this, arguments);
}
return __extends(AntiChessView, _super), AntiChessView.prototype.template = "games/antichess", 
AntiChessView.prototype.className = "antichess-view", AntiChessView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, AntiChessView.prototype.playMove = function(i, moves_array) {
var move;
return 0 === i && (this.chess = $(this.el).find(".chess-board-wrapper").chess({})), 
void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (move = moves_array[i].split(" "), 
this.chess.movePiece2([ move[0], move[1] ], [ move[2], move[3] ]), this) :void 0;
}, AntiChessView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AntiChessView = AntiChessView;
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
var BackGammonView, HR, _ref;
return BackGammonView = function(_super) {
function BackGammonView() {
return BackGammonView.__super__.constructor.apply(this, arguments);
}
return __extends(BackGammonView, _super), BackGammonView.prototype.template = "games/backgammon", 
BackGammonView.prototype.className = "tictactoe-view", BackGammonView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, BackGammonView.prototype.playMove = function(i, moves_array) {
var bar, coins, data, dice_n, j, k, map, move, n, pos, temp, _i, _j, _k, _l, _m, _n, _o, _p, _ref, _ref1;
for (move = moves_array[i], data = move.split(":"), $(this.el).find(".game-grid").find(".player1, .player2").removeClass("active"), 
$(this.el).find(".game-grid").find(".player" + data[0]).addClass("active"), map = [], 
map[0] = [], map[1] = [], i = _i = 0; 12 >= _i; i = ++_i) "0" === data[i + 14] ? map[0][i] = {
player:"",
count:0
} :(pos = data[i + 14].split(" "), map[0][i] = {
player:pos[1],
count:parseInt(pos[0])
});
for (i = _j = 0; 12 >= _j; i = ++_j) "0" === data[13 - i] ? map[1][i] = {
player:"",
count:0
} :(pos = data[13 - i].split(" "), map[1][i] = {
player:pos[1],
count:parseInt(pos[0])
});
for (i = _k = 0; 1 >= _k; i = ++_k) for (j = _l = 0; 12 >= _l; j = ++_l) {
if (temp = map[i][j], coins = "", $(this.el).find(".game-grid").find("td." + i + "-" + j).html(""), 
temp.count > 0) for (k = _m = 1, _ref = temp.count; _ref >= 1 ? _ref >= _m :_m >= _ref; k = _ref >= 1 ? ++_m :--_m) {
if (k >= 5) {
0 === i ? coins += "<div class='coin c" + temp.player + "'>" + temp.count + "</div>" :coins = "<div class='coin c" + temp.player + "'>" + temp.count + "</div>" + coins;
break;
}
coins += "<div class='coin c" + temp.player + "'></div>";
}
$(this.el).find(".game-grid").find("td." + i + "-" + j).html(coins);
}
for (console.log(data), bar = [], bar[0] = parseInt(data[27]), bar[1] = parseInt(data[28]), 
i = _n = 0; 1 >= _n; i = ++_n) if ($(this.el).find(".game-grid").find("td.bar-" + i).html(""), 
bar[i] > 0) {
for (k = _o = 1, _ref1 = bar[i]; _ref1 >= 1 ? _ref1 >= _o :_o >= _ref1; k = _ref1 >= 1 ? ++_o :--_o) {
if (coins = "", k >= 5) {
0 === i ? coins += "<div class='coin c" + (i + 1) + "'>" + bar[i] + "</div>" :coins = "<div class='coin c" + (i + 1) + "'>" + bar[i] + "</div>" + coins;
break;
}
coins += "<div class='coin c" + (i + 1) + "'></div>";
}
$(this.el).find(".game-grid").find("td.bar-" + i).html(coins);
}
for (dice_n = parseInt(data[29]), coins = "", $(this.el).find(".game-grid").find(".dice td").html(""), 
i = _p = 1; dice_n >= 1 ? dice_n >= _p :_p >= dice_n; i = dice_n >= 1 ? ++_p :--_p) n = parseInt(data[29 + i]), 
coins += "<div class='dice_coin n" + n + "'></div>";
$(this.el).find(".game-grid").find(".dice td").html(coins), void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" === moves_array[i];
}, BackGammonView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BackGammonView = BackGammonView;
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
var BattleshipSinglePlayerView, HR, _ref;
return BattleshipSinglePlayerView = function(_super) {
function BattleshipSinglePlayerView() {
return BattleshipSinglePlayerView.__super__.constructor.apply(this, arguments);
}
return __extends(BattleshipSinglePlayerView, _super), BattleshipSinglePlayerView.prototype.template = "games/battleship-1p", 
BattleshipSinglePlayerView.prototype.className = "battleship-1p-view", BattleshipSinglePlayerView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
rows:10,
columns:10
})), this;
}, BattleshipSinglePlayerView.prototype.playMove = function(i, moves_array) {
var fire_col, fire_row, mine_img, move, ships, target, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return 0 === i ? (move = moves_array[i].split(":"), 
ships = move.slice(1), _.each(ships, function(_this) {
return function(ship) {
var ship_coords, ship_img, ship_init_coord, ship_vertical;
return ship_coords = _.map(ship.split(","), function(coords) {
return [ coords.split(" ")[0], coords.split(" ")[1] ];
}), ship_vertical = !1, ship_img = "<img src='/assets/games/ship" + ship_coords.length + ".png'>", 
ship_coords.length > 1 && ship_coords[0][1] === ship_coords[1][1] && (ship_img = "<img class='battleship-vertical' src='/assets/games/ship" + ship_coords.length + ".png'>", 
ship_vertical = !0), _.each(ship_coords, function(ship_coord) {
return this.$("[data-row=" + ship_coord[0] + "][data-column=" + ship_coord[1] + "]").addClass("battleship-col-hit");
}), ship_init_coord = _.reduce(ship_coords, function(init_coord, ship_coord) {
var cc;
return cc = ship_vertical ? 0 :1, ship_coord[cc] < init_coord[cc] ? ship_coord :init_coord;
}, ship_coords[0]), _this.$("[data-row=" + ship_init_coord[0] + "][data-column=" + ship_init_coord[1] + "]").html(ship_img).addClass("battleship-ship-init");
};
}(this))) :(mine_img = "<img src='/assets/games/battleship-mine.png' class='battleship-mine'>", 
_ref = moves_array[i].split(" "), fire_row = _ref[0], fire_col = _ref[1], target = this.$("[data-row=" + fire_row + "][data-column=" + fire_col + "]"), 
target.addClass("battleship-col-fire"), target.hasClass("battleship-col-hit") && target.append(mine_img)), 
this;
}, BattleshipSinglePlayerView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BattleshipSinglePlayerView = BattleshipSinglePlayerView;
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
var BattleshipTwoPlayerView, HR, _ref;
return BattleshipTwoPlayerView = function(_super) {
function BattleshipTwoPlayerView() {
return BattleshipTwoPlayerView.__super__.constructor.apply(this, arguments);
}
return __extends(BattleshipTwoPlayerView, _super), BattleshipTwoPlayerView.prototype.template = "games/battleship-2p", 
BattleshipTwoPlayerView.prototype.className = "battleship-2p-view", BattleshipTwoPlayerView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
rows:10,
columns:10
})), this;
}, BattleshipTwoPlayerView.prototype.playMove = function(i, moves_array) {
var fire_col, fire_row, grid, mine_img, move, ships, target, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return 2 > i ? (grid = this.$(".battleship-grid-" + i % 2), 
move = moves_array[i].split(":"), ships = move.slice(1), _.each(ships, function() {
return function(ship) {
var ship_coords, ship_img, ship_init_coord, ship_vertical;
return ship_coords = _.map(ship.split(","), function(coords) {
return [ coords.split(" ")[0], coords.split(" ")[1] ];
}), ship_vertical = !1, ship_img = "<img src='/assets/games/ship" + ship_coords.length + ".png'>", 
ship_coords.length > 1 && ship_coords[0][1] === ship_coords[1][1] && (ship_img = "<img class='battleship-vertical' src='/assets/games/ship" + ship_coords.length + ".png'>", 
ship_vertical = !0), _.each(ship_coords, function(ship_coord) {
return grid.find("[data-row=" + ship_coord[0] + "][data-column=" + ship_coord[1] + "]").addClass("battleship-col-hit");
}), ship_init_coord = _.reduce(ship_coords, function(init_coord, ship_coord) {
var cc;
return cc = ship_vertical ? 0 :1, ship_coord[cc] < init_coord[cc] ? ship_coord :init_coord;
}, ship_coords[0]), grid.find("[data-row=" + ship_init_coord[0] + "][data-column=" + ship_init_coord[1] + "]").html(ship_img).addClass("battleship-ship-init");
};
}(this))) :(grid = this.$(".battleship-grid-" + (i + 1) % 2), mine_img = "<img src='/assets/games/battleship-mine.png' class='battleship-mine'>", 
_ref = moves_array[i].split(" "), fire_row = _ref[0], fire_col = _ref[1], target = grid.find("[data-row=" + fire_row + "][data-column=" + fire_col + "]"), 
target.addClass("battleship-col-fire"), target.hasClass("battleship-col-hit") && target.append(mine_img)), 
this;
}, BattleshipTwoPlayerView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BattleshipTwoPlayerView = BattleshipTwoPlayerView;
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
var BiddingTicTacToeView, HR, _ref;
return BiddingTicTacToeView = function(_super) {
function BiddingTicTacToeView() {
return BiddingTicTacToeView.__super__.constructor.apply(this, arguments);
}
return __extends(BiddingTicTacToeView, _super), BiddingTicTacToeView.prototype.template = "games/biddingtictactoe", 
BiddingTicTacToeView.prototype.className = "biddingtictactoe-view", BiddingTicTacToeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, BiddingTicTacToeView.prototype.playMove = function(i, moves_array) {
var bid_won, current_symbol, j, move, player1_bid, player1_left, player2_bid, player2_left, type, _results;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (move = moves_array[i].split(" "), type = move[0], "b1" === type ? (player1_left = move[1], 
player1_bid = move[2], player2_left = move[3], player2_bid = "", bid_won = "") :"b2" === type ? (player2_left = move[3], 
player2_bid = move[4], bid_won = "", player1_left = move[1], player1_bid = move[2]) :"t" === type && (player1_left = move[1], 
player1_bid = move[2], player2_left = move[3], player2_bid = move[4], bid_won = move[5]), 
this.$(".player1_balance").html(player1_left), this.$(".player2_balance").html(player2_left), 
this.$(".player1_bid").html(player1_bid), this.$(".player2_bid").html(player2_bid), 
"1" === bid_won ? this.$(".player1_bid").html(this.$(".player1_bid").html() + '&nbsp;<img src="/assets/trophy.png" alt="winner" class="trophy" style="top:0px">') :"2" === bid_won && this.$(".player2_bid").html(this.$(".player2_bid").html() + '&nbsp;<img src="/assets/trophy.png" alt="winner" class="trophy" style="top:0px">'), 
i = 0, _results = []; 3 > i; ) {
for (j = 0; 3 > j; ) current_symbol = move[6 + 3 * i + j], "_" !== current_symbol ? this.$("." + i + "-" + j).html(current_symbol) :this.$("." + i + "-" + j).html("&nbsp;"), 
j++;
_results.push(i++);
}
return _results;
}
}, BiddingTicTacToeView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BiddingTicTacToeView = BiddingTicTacToeView;
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
var BotCleanView, HR, _ref;
return BotCleanView = function(_super) {
function BotCleanView() {
return BotCleanView.__super__.constructor.apply(this, arguments);
}
return __extends(BotCleanView, _super), BotCleanView.prototype.template = "games/botclean", 
BotCleanView.prototype.className = "botclean-view", BotCleanView.prototype.render = function() {
return null !== this.model.toJSON().moves ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this) :$(this.el).html("The information about this game is hidden. The response from the codechecker is: <br>" + this.model.toJSON().message);
}, BotCleanView.prototype.playMove = function(i, moves_array) {
var cell, length, move, move_set, set, val, x, y, _results;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (move_set = moves_array[i], length = parseInt(move_set.substr(0, move_set.indexOf(" "))), 
move_set = move_set.substr(move_set.indexOf(" ") + 1), $(this.el).find(".game-grid").find("td.cell").removeClass("bot").removeClass("dirty").removeClass("clean").addClass("clean"), 
_results = []; "" !== move_set; ) move = move_set.substr(0, 5), move_set = move_set.substr(6), 
set = move.split(" "), x = set[0], y = set[1], val = set[2], cell = $(this.el).find(".game-grid").find("td." + x + "-" + y), 
"b" === val ? _results.push(cell.addClass("bot")) :"c" === val ? _results.push(cell.removeClass("clean").addClass("dirty bot")) :"d" === val ? _results.push(cell.removeClass("clean").addClass("dirty")) :_results.push(void 0);
return _results;
}
}, BotCleanView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BotCleanView = BotCleanView;
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
var BotCleanV2View, HR, _ref;
return BotCleanV2View = function(_super) {
function BotCleanV2View() {
return BotCleanV2View.__super__.constructor.apply(this, arguments);
}
return __extends(BotCleanV2View, _super), BotCleanV2View.prototype.template = "games/botcleanv2", 
BotCleanV2View.prototype.className = "botcleanv2-view", BotCleanV2View.prototype.render = function() {
return null !== this.model.toJSON().moves ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this) :$(this.el).html("The information about this game is hidden. The response from the codechecker is: <br>" + this.model.toJSON().message);
}, BotCleanV2View.prototype.playMove = function(i, moves_array) {
var cell, length, move, move_set, set, val, x, y, _results;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (move_set = moves_array[i], length = parseInt(move_set.substr(0, move_set.indexOf(" "))), 
move_set = move_set.substr(move_set.indexOf(" ") + 1), $(this.el).find(".game-grid").find("td.cell").removeClass("bot").removeClass("dirty").removeClass("clean"), 
_results = []; "" !== move_set; ) move = move_set.substr(0, 5), move_set = move_set.substr(6), 
set = move.split(" "), x = set[0], y = set[1], val = set[2], cell = $(this.el).find(".game-grid").find("td." + x + "-" + y), 
"b" === val ? _results.push(cell.addClass("clean bot")) :"-" === val ? _results.push(cell.addClass("clean")) :"c" === val ? _results.push(cell.addClass("dirty bot")) :"d" === val ? _results.push(cell.addClass("dirty")) :_results.push(void 0);
return _results;
}
}, BotCleanV2View;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BotCleanV2View = BotCleanV2View;
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
var BotjeuView, HR, _ref;
return BotjeuView = function(_super) {
function BotjeuView() {
return BotjeuView.__super__.constructor.apply(this, arguments);
}
return __extends(BotjeuView, _super), BotjeuView.prototype.template = "games/botjeu", 
BotjeuView.prototype.className = "botjeu-view", BotjeuView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, BotjeuView.prototype.playMove = function(i, moves_array) {
var moves;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return moves = moves_array[i].split(" "), 
this.$(".bot").removeClass("bot"), this.$(".mine").removeClass("mine"), this.$(".game-grid").find("td." + moves[0] + "-" + moves[1]).addClass("bot").removeClass("mine"), 
this.$(".game-grid").find("td." + moves[2] + "-" + moves[3]).addClass("mine").removeClass("bot"), 
this;
}, BotjeuView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BotjeuView = BotjeuView;
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
var CheckersView, HR, _ref;
return CheckersView = function(_super) {
function CheckersView() {
return CheckersView.__super__.constructor.apply(this, arguments);
}
return __extends(CheckersView, _super), CheckersView.prototype.template = "games/checkers", 
CheckersView.prototype.className = "checkers-view", CheckersView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, CheckersView.prototype.playMove = function(i, moves_array) {
return void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (this.rows = moves_array[i].split("\n"), 
this.clearGrid(), this) :void 0;
}, CheckersView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j;
for (grid_html = "<table id='graph-grid'>", row = _i = 0; 7 >= _i; row = ++_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0; 7 >= _j; column = ++_j) switch (this.rows[row][column]) {
case "b":
grid_html += "<td data-gg-x='" + row + "' data-gg-y='" + column + "' class='black-block'></td>";
break;

case "w":
grid_html += "<td data-gg-x='" + row + "' data-gg-y='" + column + "' class='white-block'></td>";
break;

case "B":
grid_html += "<td data-gg-x='" + row + "' data-gg-y='" + column + "' class='doubleblack-block'></td>";
break;

case "W":
grid_html += "<td data-gg-x='" + row + "' data-gg-y='" + column + "' class='doublewhite-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + row + "' data-gg-y='" + column + "' class='empty-block'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".checkers-grid").html(grid_html);
}, CheckersView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CheckersView = CheckersView;
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
var ClickOManiaView, HR, _ref;
return ClickOManiaView = function(_super) {
function ClickOManiaView() {
return ClickOManiaView.__super__.constructor.apply(this, arguments);
}
return __extends(ClickOManiaView, _super), ClickOManiaView.prototype.template = "games/clickomania", 
ClickOManiaView.prototype.className = "clickomania-view", ClickOManiaView.prototype.render = function() {
return null !== this.model.toJSON().moves ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this) :this.model.toJSON().score > 0 ? $(this.el).html("The information about this game is hidden. You scored " + this.model.toJSON().score + " points on this test case.") :$(this.el).html(this.model.get("message"));
}, ClickOManiaView.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.cmania_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], this.columns = _ref[1], 
this.clearGrid(), this;
}, ClickOManiaView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.cmania_grid[row * this.columns + column]) {
case "-":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "V":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='violet-block'></td>";
break;

case "I":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='indigo-block'></td>";
break;

case "B":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='blue-block'></td>";
break;

case "G":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='green-block'></td>";
break;

case "Y":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='yellow-block'></td>";
break;

case "O":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='orange-block'></td>";
break;

case "R":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='red-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".cmania-grid").html(grid_html);
}, ClickOManiaView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ClickOManiaView = ClickOManiaView;
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
var ClobberView, HR, _ref;
return ClobberView = function(_super) {
function ClobberView() {
return ClobberView.__super__.constructor.apply(this, arguments);
}
return __extends(ClobberView, _super), ClobberView.prototype.template = "games/clobber", 
ClobberView.prototype.className = "clobber-view", ClobberView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, ClobberView.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.clobber_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], this.columns = _ref[1], 
this.clearGrid(), this;
}, ClobberView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.clobber_grid[row * this.columns + column]) {
case "-":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "W":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='white-block'></td>";
break;

case "B":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='black-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".clobber-grid").html(grid_html);
}, ClobberView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ClobberView = ClobberView;
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
var Connect4View, HR, _ref;
return Connect4View = function(_super) {
function Connect4View() {
return Connect4View.__super__.constructor.apply(this, arguments);
}
return __extends(Connect4View, _super), Connect4View.prototype.template = "games/connect4", 
Connect4View.prototype.className = "connect4-view", Connect4View.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, Connect4View.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.connect4_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], this.columns = _ref[1], 
this.clearGrid(), this;
}, Connect4View.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.connect4_grid[row * this.columns + column]) {
case "-":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "r":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='red-block'></td>";
break;

case "y":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='yellow-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".connect4-grid").html(grid_html);
}, Connect4View;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Connect4View = Connect4View;
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
var ConwaysGameOfLifeView, HR, _ref;
return ConwaysGameOfLifeView = function(_super) {
function ConwaysGameOfLifeView() {
return ConwaysGameOfLifeView.__super__.constructor.apply(this, arguments);
}
return __extends(ConwaysGameOfLifeView, _super), ConwaysGameOfLifeView.prototype.template = "games/conwaysgameoflife", 
ConwaysGameOfLifeView.prototype.className = "conwaysgameoflife-view", ConwaysGameOfLifeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, ConwaysGameOfLifeView.prototype.playMove = function(i, moves_array) {
var id, j, move, player, player_images, pointX, pointY, type, _i;
if (player_images = {
W:"white",
B:"black",
A:"#ccc"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (move = moves_array[i].split(" "), type = move[0], "I" === type) pointX = move[1], 
pointY = move[2], player = move[3], id = "#" + pointX + "-" + pointY, this.$(id).css("background-color", player_images[player]); else for (j = _i = 0; 840 >= _i; j = ++_i) pointX = move[1 + 3 * j], 
pointY = move[1 + 3 * j + 1], player = move[1 + 3 * j + 2], id = "#" + pointX + "-" + pointY, 
this.$(id).css("background-color", player_images[player]);
return this;
}
}, ConwaysGameOfLifeView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ConwaysGameOfLifeView = ConwaysGameOfLifeView;
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
var CopsAndRobbersView, HR, _ref;
return CopsAndRobbersView = function(_super) {
function CopsAndRobbersView() {
return CopsAndRobbersView.__super__.constructor.apply(this, arguments);
}
return __extends(CopsAndRobbersView, _super), CopsAndRobbersView.prototype.template = "games/copsandrobbers", 
CopsAndRobbersView.prototype.className = "copsandrobbers-view", CopsAndRobbersView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, CopsAndRobbersView.prototype.playMove = function(i, moves_array) {
var cop1X, cop1Y, cop2X, cop2Y, cop3X, cop3Y, j, move, player, player_images, robberX, robberY, _i;
if (player_images = {
C:"cops",
R:"robber"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] && void 0 !== moves_array[i + 1] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i + 1] && i % 2 !== 1) {
for (j = _i = 0; 1 >= _i; j = ++_i) if (move = moves_array[i + j].split(" "), player = move[0], 
"C" === player) cop1X = move[1], cop1Y = move[2], cop2X = move[3], cop2Y = move[4], 
cop3X = move[5], cop3Y = move[6], this.$(".cops").removeClass("cops"), this.$(".game-grid").find("td." + cop1X + "-" + cop1Y).addClass("cops").removeClass("robber"), 
this.$(".game-grid").find("td." + cop2X + "-" + cop2Y).addClass("cops").removeClass("robber"), 
this.$(".game-grid").find("td." + cop3X + "-" + cop3Y).addClass("cops").removeClass("robber"); else {
if (move[3] && "done" === move[3] && "C" === move[4]) return $(".robber").removeClass("robber"), 
this;
robberX = move[1], robberY = move[2], this.$(".robber").removeClass("robber"), this.$(".game-grid").find("td." + robberX + "-" + robberY).addClass("robber").removeClass("cops");
}
return this;
}
}, CopsAndRobbersView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CopsAndRobbersView = CopsAndRobbersView;
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
var CramView, HR, _ref;
return CramView = function(_super) {
function CramView() {
return CramView.__super__.constructor.apply(this, arguments);
}
return __extends(CramView, _super), CramView.prototype.template = "games/cram", 
CramView.prototype.className = "cram-view", CramView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, CramView.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.cram_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], this.columns = _ref[1], 
this.clearGrid(), this;
}, CramView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.cram_grid[row * this.columns + column]) {
case "*":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col graph-col-solid'></td>";
break;

case "-":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "B":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='blue-block'></td>";
break;

case "R":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='red-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".cram-grid").html(grid_html);
}, CramView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CramView = CramView;
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
var DefaultGameView, HR, _ref;
return DefaultGameView = function(_super) {
function DefaultGameView() {
return DefaultGameView.__super__.constructor.apply(this, arguments);
}
return __extends(DefaultGameView, _super), DefaultGameView.prototype.template = "games/default", 
DefaultGameView.prototype.className = "tictactoe-view", DefaultGameView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, DefaultGameView.prototype.playMove = function() {}, DefaultGameView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DefaultGameView = DefaultGameView;
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
var DiscreteBiddingView, HR, _ref;
return DiscreteBiddingView = function(_super) {
function DiscreteBiddingView() {
return DiscreteBiddingView.__super__.constructor.apply(this, arguments);
}
return __extends(DiscreteBiddingView, _super), DiscreteBiddingView.prototype.template = "games/discretebidding", 
DiscreteBiddingView.prototype.className = "discretebidding-view", DiscreteBiddingView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.$(".player1_username").html(this.model.attributes.actors[0].hacker_username), 
this.$(".player2_username").html(this.model.attributes.actors[1].hacker_username), 
this.$(".playgame-row").hide(), this.$(".translucent").removeClass("translucent"), 
this.$(".player1_balance").html(100), this.$(".player2_balance").html(100), this.$(".game-message").hide(), 
this.$(".play-again-button").hide(), this;
}, DiscreteBiddingView.prototype.playMove = function(i, moves_array) {
var bid_num, blue, bulb_current_position, bulb_future_position, game, grey, player1_balance, player1_bid, player1_bounty, player1_move, player1_remaining, player1_trophy, player1_won, player2_balance, player2_bid, player2_bounty, player2_move, player2_remaining, player2_trophy, player2_won;
return 0 === i && (window.discrete_bidding_draw_adv = 1), i % 2 !== 1 && void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] && (i += 1, 
moves_array[i]) ? (game = moves_array, bid_num = Math.floor(i / 2) + 1, this.$(".bid-number").html(bid_num), 
player1_move = game[i - 1], player2_move = game[i], player1_bid = player1_move ? player1_move.split(" ")[0] :0, 
player2_bid = player2_move ? player2_move.split(" ")[0] :0, "" === player1_bid && (player1_bid = 0), 
"" === player2_bid && (player2_bid = 0), player1_bid = parseInt(player1_bid), player2_bid = parseInt(player2_bid), 
player1_trophy = "", player2_trophy = "", player1_bounty = 0, player2_bounty = 0, 
player1_won = !1, player2_won = !1, player1_balance = parseInt(this.$(".player1_balance").html()), 
player2_balance = parseInt(this.$(".player2_balance").html()), player1_bid > player2_bid ? (player1_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player1_bounty = player1_bid, player1_won = !0) :player2_bid > player1_bid ? (player2_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player2_bounty = player2_bid, player2_won = !0) :player1_bid === player2_bid && (1 === window.discrete_bidding_draw_adv ? (window.discrete_bidding_draw_adv = 2, 
player1_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player1_bounty = player1_bid, player1_won = !0) :(window.discrete_bidding_draw_adv = 1, 
player2_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player2_bounty = player2_bid, player2_won = !0)), player1_remaining = player1_balance - player1_bounty, 
player2_remaining = player2_balance - player2_bounty, 0 > player1_remaining ? (player2_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player2_won = !0, player1_trophy = "", player1_won = !1) :0 > player2_remaining && (player1_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player1_won = !0, player2_trophy = "", player2_won = !1), this.$(".player1_current_bid").html("" + player1_bid + " " + player1_trophy), 
this.$(".player2_current_bid").html("" + player2_bid + " " + player2_trophy), bulb_current_position = parseInt(this.$(".bulb.win").attr("data-id")), 
bulb_future_position = bulb_current_position, player1_won ? bulb_future_position = bulb_current_position - 1 :player2_won && (bulb_future_position = bulb_current_position + 1), 
bulb_future_position !== bulb_current_position && (grey = "/assets/bidding-blank.png", 
blue = "/assets/bidding-bottle.png", this.$(".bulbs").find("img[data-id=" + bulb_future_position + "]").attr("src", blue).addClass("win"), 
this.$(".bulbs").find("img[data-id=" + bulb_current_position + "]").attr("src", grey).removeClass("win")), 
this.$(".player1_balance").html(player1_remaining), this.$(".player2_balance").html(player2_remaining), 
0 === i && this.$("table.game-result tbody").html(""), this.$("table.game-result tbody").append("<tr><td class='m'>" + bid_num + "</td><td class='m'>" + player1_bid + " " + player1_trophy + "</td><td class='m'>" + player2_bid + " " + player2_trophy + "</td></tr>"), 
this) :void 0;
}, DiscreteBiddingView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DiscreteBiddingView = DiscreteBiddingView;
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
var DomineeringView, HR, _ref;
return DomineeringView = function(_super) {
function DomineeringView() {
return DomineeringView.__super__.constructor.apply(this, arguments);
}
return __extends(DomineeringView, _super), DomineeringView.prototype.template = "games/domineering", 
DomineeringView.prototype.className = "domineering-view", DomineeringView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, DomineeringView.prototype.playMove = function(i, moves_array) {
var color, current_move, player_cord, player_i, player_id, player_j, that, vertical;
if ("CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return current_move = moves_array[i], 
player_cord = current_move.slice(0, current_move.length - 2), player_id = current_move.slice(current_move.length - 1), 
that = this, "1" === player_id ? (vertical = !0, color = "red") :"2" === player_id && (vertical = !1, 
color = "blue"), player_i = parseInt(player_cord.split(" ")[0]), player_j = parseInt(player_cord.split(" ")[1]), 
_.isNaN(player_i) || _.isNaN(player_j) || (that.$("." + player_i + "-" + player_j).css("background-color", color), 
vertical ? that.$("." + (player_i + 1) + "-" + player_j).css("background-color", color) :that.$("." + player_i + "-" + (player_j + 1)).css("background-color", color)), 
this;
}, DomineeringView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DomineeringView = DomineeringView;
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
var GomokuView, HR, _ref;
return GomokuView = function(_super) {
function GomokuView() {
return GomokuView.__super__.constructor.apply(this, arguments);
}
return __extends(GomokuView, _super), GomokuView.prototype.template = "games/gomoku", 
GomokuView.prototype.className = "gomoku-view", GomokuView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, GomokuView.prototype.playMove = function(i, moves_array) {
return void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (this.grid = moves_array[i], 
this.clearGrid(), this.columns = this.rows = 15, this) :void 0;
}, GomokuView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.grid[row * this.columns + column]) {
case ".":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "W":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'><div class='white'></div></td>";
break;

case "B":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'><div class='black'></div></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".game-grid").html(grid_html);
}, GomokuView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GomokuView = GomokuView;
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
var GraphTraversalView, HR, _ref;
return GraphTraversalView = function(_super) {
function GraphTraversalView() {
return GraphTraversalView.__super__.constructor.apply(this, arguments);
}
return __extends(GraphTraversalView, _super), GraphTraversalView.prototype.template = "games/graphtraversal", 
GraphTraversalView.prototype.className = "graphtraversal-view", GraphTraversalView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, GraphTraversalView.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.game_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], this.columns = _ref[1], 
this.clearGrid(), this.pseudo_move = 0, this.pseudo_moves_search = move[2].split(","), 
this.pseudo_moves_path = move[3].split(","), this.playPseudoMoves(), this;
}, GraphTraversalView.prototype.playPseudoMoveSearch = function(i) {
var x, y, _ref;
return _ref = this.pseudo_moves_search[i].split(" "), x = _ref[0], y = _ref[1], 
this.$("td[data-gg-x='" + y + "'][data-gg-y='" + x + "']").css({
"background-color":"#823282"
});
}, GraphTraversalView.prototype.playPseudoMovePath = function(i) {
var pacman, x, y, _ref;
return _ref = this.pseudo_moves_path[i].split(" "), x = _ref[0], y = _ref[1], pacman = this.$("#pac-man"), 
pacman.replaceWith("<td data-gg-x='" + pacman.attr("data-gg-x") + "' data-gg-y='" + pacman.attr("data-gg-y") + "' class='graph-col graph-col-path'></td>"), 
parseInt(y) > parseInt(pacman.attr("data-gg-x")) ? this.$("td[data-gg-x='" + y + "'][data-gg-y='" + x + "']").css({
"background-color":"rgb(59, 107, 59)"
}).attr("id", "pac-man").addClass("pacclear").addClass("pacright") :parseInt(y) < parseInt(pacman.attr("data-gg-x")) ? this.$("td[data-gg-x='" + y + "'][data-gg-y='" + x + "']").css({
"background-color":"rgb(59, 107, 59)"
}).attr("id", "pac-man").addClass("pacclear").addClass("pacleft") :parseInt(x) > parseInt(pacman.attr("data-gg-y")) ? this.$("td[data-gg-x='" + y + "'][data-gg-y='" + x + "']").css({
"background-color":"rgb(59, 107, 59)"
}).attr("id", "pac-man").addClass("pacclear").addClass("pacbottom") :parseInt(x) < parseInt(pacman.attr("data-gg-y")) ? this.$("td[data-gg-x='" + y + "'][data-gg-y='" + x + "']").css({
"background-color":"rgb(59, 107, 59)"
}).attr("id", "pac-man").addClass("pacclear").addClass("pactop") :this.$("td[data-gg-x='" + y + "'][data-gg-y='" + x + "']").css({
"background-color":"rgb(59, 107, 59)"
}).attr("id", "pac-man").addClass("pacclear");
}, GraphTraversalView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.game_grid[row * this.columns + column]) {
case "%":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col graph-col-solid'></td>";
break;

case ".":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col pacfood'></td>";
break;

case "P":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col' id='pac-man'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".game-grid").html(grid_html);
}, GraphTraversalView.prototype.playPseudoMoves = function() {
var path_move;
if (this.pseudo_move !== this.pseudo_moves_search.length + this.pseudo_moves_path.length) return this.pseudo_move === this.pseudo_moves_search.length && this.clearGrid(), 
this.pseudo_move >= this.pseudo_moves_search.length ? (path_move = this.pseudo_move - this.pseudo_moves_search.length, 
this.playPseudoMovePath(path_move)) :this.playPseudoMoveSearch(this.pseudo_move), 
this.pseudo_move = this.pseudo_move + 1, setTimeout(function(_this) {
return function() {
return _this.playPseudoMoves();
};
}(this), 200);
}, GraphTraversalView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GraphTraversalView = GraphTraversalView;
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
var HR, HexGameView, _ref;
return HexGameView = function(_super) {
function HexGameView() {
return HexGameView.__super__.constructor.apply(this, arguments);
}
return __extends(HexGameView, _super), HexGameView.prototype.template = "games/hex", 
HexGameView.prototype.className = "hex-view", HexGameView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, HexGameView.prototype.playMove = function(i, moves_array) {
var columns, hexsrc, move, rows, x, y;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(" "), 
rows = columns = move[0], y = move[1], x = move[2], 0 === i ? (this.grid = $("<div class='game-grid' style='width: " + 58 * columns + "px; height: " + 37 * rows + "px;' \\>"), 
_.times(rows, function(_this) {
return function(row) {
var row_el;
return row_el = $("<div style='height: 37px; width: " + 48 * columns + "px; margin-top: -2px; margin-left: " + 20 * row + "px;' \\>"), 
_.times(columns, function(column) {
return row_el.append($('<div data-x="' + column + '" data-y="' + row + '" class="spanhex1"><img src=\'/assets/games/hex.png\'></div>'));
}), _this.grid.append(row_el);
};
}(this)), this.$(".game-grid-wrapper").html(this.grid), hexsrc = "/assets/games/bluehex.png", 
this.$('div[data-x="' + x + '"][data-y="' + y + '"]').find("img").attr("src", hexsrc)) :(hexsrc = "/assets/games/redhex.png", 
i % 2 === 0 && (hexsrc = "/assets/games/bluehex.png"), this.$('div[data-x="' + x + '"][data-y="' + y + '"]').find("img").attr("src", hexsrc)), 
this;
}, HexGameView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HexGameView = HexGameView;
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
var HR, HipView, _ref;
return HipView = function(_super) {
function HipView() {
return HipView.__super__.constructor.apply(this, arguments);
}
return __extends(HipView, _super), HipView.prototype.template = "games/hip", HipView.prototype.className = "hip-view", 
HipView.prototype.initialize = function() {
return this.startX = 30, this.startY = 30, this.radius = 8, this.rows = 9, this.cols = 9, 
this.offset = 25;
}, HipView.prototype.render = function() {
var c, ctx, i, j, posX, posY;
if ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), c = this.$("#hipCanvas")[0]) for (ctx = c.getContext("2d"), ctx.fillStyle = "#ccc", 
ctx.strokeStyle = "#ccc", i = 0; i < this.rows; ) {
for (j = 0; j < this.cols; ) ctx.beginPath(), posX = this.startX + 25 * j, posY = this.startY + 25 * i, 
ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), ctx.fill(), j++;
i++;
}
return this;
}, HipView.prototype.playMove = function(i, moves_array) {
var c, ctx, move, player, player_symbol, posX, posY, x, y;
return player_symbol = {
1:"r",
2:"b"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (move = moves_array[i].split(" "), 
x = move[0], y = move[1], player = move[2], "r" === player ? (c = this.$("#hipCanvas")[0], 
c && (ctx = c.getContext("2d"), ctx.fillStyle = "red", ctx.strokeStyle = "red", 
ctx.beginPath(), posX = this.startX + 25 * y, posY = this.startY + 25 * x, ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), 
ctx.stroke(), ctx.fill())) :"b" === player && (c = this.$("#hipCanvas")[0], c && (ctx = c.getContext("2d"), 
ctx.fillStyle = "blue", ctx.strokeStyle = "blue", ctx.beginPath(), posX = this.startX + 25 * y, 
posY = this.startY + 25 * x, ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), 
ctx.fill())), move[3] && (c = this.$("#hipCanvas")[0], ctx = c.getContext("2d"), 
ctx.beginPath(), ctx.strokeStyle = "r" === player ? "red" :"blue", ctx.moveTo(30 + 25 * move[5], 30 + 25 * move[4]), 
ctx.lineTo(30 + 25 * move[7], 30 + 25 * move[6]), ctx.stroke(), ctx.moveTo(30 + 25 * move[7], 30 + 25 * move[6]), 
ctx.lineTo(30 + 25 * move[9], 30 + 25 * move[8]), ctx.stroke(), ctx.moveTo(30 + 25 * move[9], 30 + 25 * move[8]), 
ctx.lineTo(30 + 25 * move[11], 30 + 25 * move[10]), ctx.stroke(), ctx.moveTo(30 + 25 * move[11], 30 + 25 * move[10]), 
ctx.lineTo(30 + 25 * move[5], 30 + 25 * move[4]), ctx.stroke()), this) :void 0;
}, HipView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HipView = HipView;
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
var HR, LightsOutView, _ref;
return LightsOutView = function(_super) {
function LightsOutView() {
return LightsOutView.__super__.constructor.apply(this, arguments);
}
return __extends(LightsOutView, _super), LightsOutView.prototype.template = "games/lightsout", 
LightsOutView.prototype.className = "lightsout-view", LightsOutView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, LightsOutView.prototype.playMove = function(i, moves_array) {
var className, j, move, on_points, player, pointX, pointY, state, that, toggle_points, _i, _j, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (move = moves_array[i].split(" "), player = move[0], that = this, "I" === player) for (on_points = parseInt(move[1], 10), 
j = _i = 0, _ref = on_points - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; j = _ref >= 0 ? ++_i :--_i) pointX = move[2 + 2 * j], 
pointY = move[2 + 2 * j + 1], className = "." + pointX + "-" + pointY, this.$(className).removeClass("lightsout-off"), 
this.$(className).addClass("lightsout-on"); else for (toggle_points = parseInt(move[1], 10), 
pointX = move[2], pointY = move[3], state = move[4], className = "." + pointX + "-" + pointY, 
1 === state ? (this.$(className).removeClass("lightsout-off"), this.$(className).addClass("lightsout-on")) :(this.$(className).removeClass("lightsout-on"), 
this.$(className).addClass("lightsout-off")), j = _j = 0; 1 >= _j; j = ++_j) pointX = move[5 + 3 * j], 
pointY = move[5 + 3 * j + 1], state = move[5 + 3 * j + 2], className = "." + pointX + "-" + pointY, 
"1" === state ? (this.$(className).removeClass("lightsout-off"), this.$(className).addClass("lightsout-on")) :(this.$(className).removeClass("lightsout-on"), 
this.$(className).addClass("lightsout-off"));
return this;
}
}, LightsOutView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LightsOutView = LightsOutView;
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
var HR, MancalaView, _ref;
return MancalaView = function(_super) {
function MancalaView() {
return MancalaView.__super__.constructor.apply(this, arguments);
}
return __extends(MancalaView, _super), MancalaView.prototype.template = "games/mancala", 
MancalaView.prototype.className = "mancala-view", MancalaView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, MancalaView.prototype.playMove = function(i, moves_array) {
var cell, move, _i, _results;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (move = moves_array[i].split(" "), _results = [], cell = _i = 0; 13 >= _i; cell = ++_i) _results.push($(this.el).find(".game-col[data-cell=" + cell + "]").html(move[cell]));
return _results;
}
}, MancalaView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MancalaView = MancalaView;
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
var HR, MazeGame, _ref;
return MazeGame = function(_super) {
function MazeGame() {
return MazeGame.__super__.constructor.apply(this, arguments);
}
return __extends(MazeGame, _super), MazeGame.prototype.template = "games/mazegame", 
MazeGame.prototype.className = "mazegame", MazeGame.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, MazeGame.prototype.playMove = function(i, moves_array) {
var move;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
0 === i ? this.firstMove(i, move) :this.restMove(i, move);
}, MazeGame.prototype.restMove = function(i, move) {
var cell, column, orientation, pos, row, _i, _j, _k, _l;
for (pos = _.map(move[0].split(" "), function(p) {
return _.map(p.split(","), function(x) {
return parseInt(x);
});
}), this.$("td").html(""), pos[0][0] === pos[1][0] && pos[0][1] === pos[1][1] ? this.$("td[data-gg-row=" + pos[0][0] + "][data-gg-column=" + pos[0][1] + "]").html("<div class='player1 player2'></div>") :(this.$("td[data-gg-row=" + pos[0][0] + "][data-gg-column=" + pos[0][1] + "]").html("<div class='player1'></div>"), 
this.$("td[data-gg-row=" + pos[1][0] + "][data-gg-column=" + pos[1][1] + "]").html("<div class='player2'></div>")), 
this.$(".g6 td").removeClass().addClass("graph-col"), row = _i = -1; 1 >= _i; row = ++_i) for (column = _j = -1; 1 >= _j; column = ++_j) cell = this.game_grid[(pos[0][0] + row) * this.columns + pos[0][1] + column], 
this.log("CELLING", cell), "#" === cell && this.$(".g6-b td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("wall"), 
"e" === cell && this.$(".g6-b td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("exit");
for (this.$(".g6-b td[data-gg-row=1][data-gg-column=1]").html("<div class='player1'></div>"), 
row = _k = -1; 1 >= _k; row = ++_k) for (column = _l = -1; 1 >= _l; column = ++_l) cell = this.game_grid[(pos[1][0] + row) * this.columns + pos[1][1] + column], 
this.log("CELLING", cell), "#" === cell && this.$(".g6-c td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("wall"), 
"e" === cell && this.$(".g6-c td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("exit");
return this.$(".g6-c td[data-gg-row=1][data-gg-column=1]").html("<div class='player2'></div>"), 
orientation = _.map(move[1].split(" "), function(o) {
return parseInt(o);
}), this.$(".g6-b").removeClass("deg180 deg270 deg90 deg0").addClass("deg" + orientation[0]), 
this.$(".g6-c").removeClass("deg180 deg270 deg90 deg0").addClass("deg" + orientation[1]), 
this;
}, MazeGame.prototype.firstMove = function(i, move) {
var cell, column, init_orientation, init_pos, orientation, pos, row, _i, _j, _k, _l, _ref;
for (_ref = move[0].split(" "), this.rows = _ref[0], this.columns = _ref[1], this.game_grid = move[1], 
this.clearGrid(), init_pos = _.map(move[2].split(" ").slice(1, 3), function(p) {
return p.split(",");
}), init_orientation = move[3].split(" "), this.$("td").html(""), init_pos[0][0] === init_pos[1][0] && init_pos[0][1] === init_pos[1][1] ? this.$("td[data-gg-row=" + init_pos[0][0] + "][data-gg-column=" + init_pos[0][1] + "]").html("<div class='player1 player2'></div>") :(this.$("td[data-gg-row=" + init_pos[0][0] + "][data-gg-column=" + init_pos[0][1] + "]").html("<div class='player1'></div>"), 
this.$("td[data-gg-row=" + init_pos[1][0] + "][data-gg-column=" + init_pos[1][1] + "]").html("<div class='player2'></div>")), 
pos = _.map(move[4].split(" "), function(p) {
return _.map(p.split(","), function(x) {
return parseInt(x);
});
}), this.$("td").html(""), pos[0][0] === pos[1][0] && pos[0][1] === pos[1][1] ? this.$("td[data-gg-row=" + pos[0][0] + "][data-gg-column=" + pos[0][1] + "]").html("<div class='player1 player2'></div>") :(this.$("td[data-gg-row=" + pos[0][0] + "][data-gg-column=" + pos[0][1] + "]").html("<div class='player1'></div>"), 
this.$("td[data-gg-row=" + pos[1][0] + "][data-gg-column=" + pos[1][1] + "]").html("<div class='player2'></div>")), 
this.$(".g6 td").removeClass().addClass("graph-col"), row = _i = -1; 1 >= _i; row = ++_i) for (column = _j = -1; 1 >= _j; column = ++_j) cell = this.game_grid[(pos[0][0] + row) * this.columns + pos[0][1] + column], 
"#" === cell && this.$(".g6-b td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("wall"), 
"e" === cell && this.$(".g6-b td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("exit");
for (this.$(".g6-b td[data-gg-row=1][data-gg-column=1]").html("<div class='player1'></div>"), 
row = _k = -1; 1 >= _k; row = ++_k) for (column = _l = -1; 1 >= _l; column = ++_l) cell = this.game_grid[(pos[1][0] + row) * this.columns + pos[1][1] + column], 
"#" === cell && this.$(".g6-c td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("wall"), 
"e" === cell && this.$(".g6-c td[data-gg-row=" + (row + 1) + "][data-gg-column=" + (column + 1) + "]").addClass("exit");
return this.$(".g6-c td[data-gg-row=1][data-gg-column=1]").html("<div class='player2'></div>"), 
orientation = _.map(move[5].split(" "), function(o) {
return parseInt(o);
}), this.$(".g6-b").removeClass("deg180 deg270 deg90 deg0").addClass("deg" + orientation[0]), 
this.$(".g6-c").removeClass("deg180 deg270 deg90 deg0").addClass("deg" + orientation[1]), 
this;
}, MazeGame.prototype._clearGrid = function() {
var mtable;
return this.$(".grid-placeholder").html(this.grid_html), mtable = "<table class='graph-grid'><tr class='graph-row'><td data-gg-row='0' data-gg-column='0' class='graph-col'></td><td data-gg-row='0' data-gg-column='1' class='graph-col'></td><td data-gg-row='0' data-gg-column='2' class='graph-col'></td></tr><tr class='graph-row'><td data-gg-row='1' data-gg-column='0' class='graph-col'></td><td data-gg-row='1' data-gg-column='1' class='graph-col'></td><td data-gg-row='1' data-gg-column='2' class='graph-col'></td></tr><tr class='graph-row'><td data-gg-row='2' data-gg-column='0' class='graph-col'></td><td data-gg-row='2' data-gg-column='1' class='graph-col'></td><td data-gg-row='2' data-gg-column='2' class='graph-col'></td></tr></table>", 
this.$(".g6").html(mtable), this;
}, MazeGame.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
if (this._hasCleared) return this._clearGrid();
for (grid_html = "<table class='graph-grid' id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) "#" === this.game_grid[row * this.columns + column] && (grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "' class='graph-col wall'></td>"), 
"e" === this.game_grid[row * this.columns + column] && (grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "' class='graph-col exit'></td>"), 
"-" === this.game_grid[row * this.columns + column] && (grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "' class='graph-col'></td>");
grid_html += "</tr>";
}
return grid_html += "</table>", this.grid_html = grid_html, this._hasCleared = !0, 
this._clearGrid(), this;
}, MazeGame;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MazeGame = MazeGame;
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
var HR, MinisterTrickView, _ref;
return MinisterTrickView = function(_super) {
function MinisterTrickView() {
return MinisterTrickView.__super__.constructor.apply(this, arguments);
}
return __extends(MinisterTrickView, _super), MinisterTrickView.prototype.template = "games/ministertrick", 
MinisterTrickView.prototype.className = "ministertrick-view", MinisterTrickView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, MinisterTrickView.prototype.playMove = function(i, moves_array) {
return void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? $(this.el).find(".game-grid").find("div.move").html(moves_array[i]) :void 0;
}, MinisterTrickView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MinisterTrickView = MinisterTrickView;
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
var HR, MonopolyView, _ref;
return MonopolyView = function(_super) {
function MonopolyView() {
return MonopolyView.__super__.constructor.apply(this, arguments);
}
return __extends(MonopolyView, _super), MonopolyView.prototype.template = "games/monopoly", 
MonopolyView.prototype.className = "monopoly-view", MonopolyView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, MonopolyView.prototype.movePlayer = function(p, cell) {
var cell_elem, player, plr, posn;
return player = this.$(".a-monopoly-player[data-player=" + p + "]"), posn = player.data("posn"), 
cell_elem = this.$("div[data-cell=" + cell + "]"), player.data("posn", cell), plr = this.$("#monopoly-player-" + (p + 1)).remove(), 
cell_elem.append(plr);
}, MonopolyView.prototype.playMove = function(i, moves_array) {
var board_state, border_side, ccodes, owner_map, playrs, state;
return border_side = [ "border-top", "border-right", "border-bottom", "border-left" ], 
ccodes = [ null, "SaddleBrown", "SkyBlue", "DarkOrchid", "Orange", "Red", "Yellow", "Green", "Blue", "none" ], 
owner_map = [ "", "1", "2" ], void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (state = moves_array[i].split(" "), 
playrs = state.slice(0, 2).map(function(postn) {
return postn.split(",");
}), _.each(playrs, function(_this) {
return function(playr, idx) {
var cash, posn;
return posn = playr[0], cash = playr[1], _this.$("#player" + idx + "-cash").html("Player " + (idx + 1) + ": " + cash), 
_this.movePlayer(idx, posn);
};
}(this)), board_state = state.slice(2).map(function(mve) {
return mve.split(",");
}), _.each(board_state, function(_this) {
return function(cell_state) {
var cell, colour, houses, index, mortgaged, owner, sale;
return index = cell_state[0], colour = cell_state[1], owner = cell_state[2], houses = cell_state[3], 
mortgaged = cell_state[4], sale = cell_state[5], colour = ccodes[colour], mortgaged = "1" === mortgaged, 
sale = "1" === sale, cell = _this.$("div[data-cell=" + index + "]"), colour && cell.find(".a-monopoly-color-div").css("background", colour), 
cell.find(".a-sale").toggle(sale), cell.find(".a-mortgaged").toggle(mortgaged), 
cell.find(".a-house").slice(houses).hide(), houses > 0 && cell.find(".a-house").slice(0, +(houses - 1) + 1 || 9e9).show(), 
cell.find(".a-owner").html(owner_map[owner]), "" === owner_map[owner] ? cell.find(".a-owner").hide() :cell.find(".a-owner").show();
};
}(this))) :void 0;
}, MonopolyView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MonopolyView = MonopolyView;
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
var HR, MorrisNineView, _ref;
return MorrisNineView = function(_super) {
function MorrisNineView() {
return MorrisNineView.__super__.constructor.apply(this, arguments);
}
return __extends(MorrisNineView, _super), MorrisNineView.prototype.template = "games/morrisnine", 
MorrisNineView.prototype.className = "morrisnine-view", MorrisNineView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), $(".player-1").children(".player-color").html("White"), $(".player-2").children(".player-color").html("Black"), 
this;
}, MorrisNineView.prototype.playMove = function(i, moves_array) {
var moves, player, player_symbol, set, x, y, _results;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (moves = moves_array[i], i = 0, _results = []; "" !== moves && i++ < 50; ) set = moves.split(" "), 
moves = moves.substr(6), x = set[0], y = set[1], player = set[2], player_symbol = {
W:"white",
B:"black",
"-":"empty"
}, $(this.el).find(".game-grid").find("div." + x + "-" + y).removeClass("empty"), 
$(this.el).find(".game-grid").find("div." + x + "-" + y).removeClass("white"), $(this.el).find(".game-grid").find("div." + x + "-" + y).removeClass("black"), 
_results.push($(this.el).find(".game-grid").find("div." + x + "-" + y).addClass(player_symbol[player]));
return _results;
}
}, MorrisNineView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MorrisNineView = MorrisNineView;
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
var HR, OracleView, _ref;
return OracleView = function(_super) {
function OracleView() {
return OracleView.__super__.constructor.apply(this, arguments);
}
return __extends(OracleView, _super), OracleView.prototype.template = "games/oracle", 
OracleView.prototype.className = "oracle-view", OracleView.prototype.render = function() {
return null !== this.model.toJSON().moves ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this) :$(this.el).html("The information about this game is hidden. The response from the codechecker is: <br>" + this.model.toJSON().message);
}, OracleView.prototype.playMove = function(i, moves_array) {
var move, move_set;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move_set = moves_array[i], 
move = move_set.split(" "), $(this.el).find(".game-grid").find(".ball-container").removeClass("ball1 ball2 ball3 ball4 ball5"), 
$(this.el).find(".game-grid").find(".ball-container.first").addClass("ball" + move[0]), 
$(this.el).find(".game-grid").find(".ball-container.second").addClass("ball" + move[1]), 
"Y" === move[2] ? $(this.el).find(".game-grid").find(".oracle-text h2").html("Yes") :$(this.el).find(".game-grid").find(".oracle-text h2").html("No"), 
$(this.el).find(".game-grid").find(".oracle-lied").hide(), "Y" === move[3] ? $(this.el).find(".game-grid").find(".oracle-lied").show() :void 0;
}, OracleView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.OracleView = OracleView;
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
var HR, OthelloView, _ref;
return OthelloView = function(_super) {
function OthelloView() {
return OthelloView.__super__.constructor.apply(this, arguments);
}
return __extends(OthelloView, _super), OthelloView.prototype.template = "games/othello", 
OthelloView.prototype.className = "othello-view", OthelloView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), $(".player-1").children(".player-color").html("Black"), $(".player-2").children(".player-color").html("White"), 
this;
}, OthelloView.prototype.playMove = function(i, moves_array) {
var addClass, img_src, move, player, player_symbol, removeClass, that, update_positions, x, y;
return player_symbol = {
1:"B",
2:"W"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (move = moves_array[i].split(" "), 
x = move[0], y = move[1], player = move[2], "W" === player ? (img_src = "/assets/othello-white.png", 
addClass = "othello-white", removeClass = "othello-black") :(img_src = "/assets/othello-black.png", 
addClass = "othello-black", removeClass = "othello-white"), this.$(".game-grid").find(".bulb[data-id=" + x + "-" + y + "]").attr("src", img_src).addClass(addClass).removeClass("possible-move"), 
this.$(".possible-move").removeClass("possible-move").attr("src", "/assets/othello-green.png"), 
update_positions = move[3], i = 0, that = this, setTimeout(function() {
for (var black_count, flipX, flipY, j, valid_moves, white_count; update_positions > i; ) flipX = move[4 + 2 * i], 
flipY = move[5 + 2 * i], that.flip(flipX, flipY, img_src, addClass, removeClass), 
i++;
return white_count = that.$(".game-grid").find(".othello-white").length, black_count = that.$(".game-grid").find(".othello-black").length, 
that.$(".game-grid").find(".player1_discs").html(black_count), that.$(".game-grid").find(".player2_discs").html(white_count), 
valid_moves = move[4 + 2 * update_positions], j = 0, setTimeout(function() {
var moveX, moveY, _results;
for (_results = []; valid_moves > j; ) moveX = move[4 + 2 * update_positions + 2 * j + 1], 
moveY = move[4 + 2 * update_positions + 2 * j + 2], this.$(".game-grid").find(".bulb[data-id=" + moveX + "-" + moveY + "]").attr("src", "/assets/othello-move.png").addClass("possible-move"), 
_results.push(j++);
return _results;
}, 600);
}, 400), this) :void 0;
}, OthelloView.prototype.flip = function(flipX, flipY, img_src, addClass, removeClass) {
return this.$(".game-grid").find(".bulb[data-id=" + flipX + "-" + flipY + "]").attr("src", img_src).removeClass(removeClass).addClass(addClass);
}, OthelloView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.OthelloView = OthelloView;
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
var HR, PacmanView, _ref;
return PacmanView = function(_super) {
function PacmanView() {
return PacmanView.__super__.constructor.apply(this, arguments);
}
return __extends(PacmanView, _super), PacmanView.prototype.template = "games/pacman", 
PacmanView.prototype.className = "pacman-view", PacmanView.prototype.render = function() {
var g1, g2, g3, g4, pman;
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), pman = this.$("#pac-man").remove(), this.$(".pac-cell[data-x=25][data-y=14]").append(pman), 
g1 = this.$("#pac-ghost-1").remove(), this.$(".pac-cell[data-x=13][data-y=10]").append(g1), 
g2 = this.$("#pac-ghost-2").remove(), this.$(".pac-cell[data-x=13][data-y=13]").append(g2), 
g3 = this.$("#pac-ghost-3").remove(), this.$(".pac-cell[data-x=13][data-y=14]").append(g3), 
g4 = this.$("#pac-ghost-4").remove(), this.$(".pac-cell[data-x=13][data-y=17]").append(g4), 
this;
}, PacmanView.prototype.playMove = function(i, moves_array) {
var g1, g2, g3, g4, ghost1_pos, ghost2_pos, ghost3_pos, ghost4_pos, move, pac_food_array, pacfoods, pacman_pos, pf, pfx, pman, posns, _i, _j, _len, _results;
if (pac_food_array = [ [ 1, 1 ], [ 1, 3 ], [ 1, 5 ], [ 1, 7 ], [ 1, 9 ], [ 1, 11 ], [ 1, 15 ], [ 1, 17 ], [ 1, 19 ], [ 1, 21 ], [ 1, 23 ], [ 1, 25 ], [ 2, 1 ], [ 2, 6 ], [ 2, 12 ], [ 2, 15 ], [ 2, 21 ], [ 2, 26 ], [ 3, 1 ], [ 3, 6 ], [ 3, 12 ], [ 3, 15 ], [ 3, 21 ], [ 3, 26 ], [ 4, 1 ], [ 4, 6 ], [ 4, 12 ], [ 4, 15 ], [ 4, 21 ], [ 4, 26 ], [ 5, 1 ], [ 5, 3 ], [ 5, 5 ], [ 5, 7 ], [ 5, 9 ], [ 5, 11 ], [ 5, 13 ], [ 5, 15 ], [ 5, 17 ], [ 5, 19 ], [ 5, 21 ], [ 5, 23 ], [ 5, 25 ], [ 6, 1 ], [ 6, 6 ], [ 6, 9 ], [ 6, 18 ], [ 6, 21 ], [ 6, 26 ], [ 7, 1 ], [ 7, 6 ], [ 7, 9 ], [ 7, 18 ], [ 7, 21 ], [ 7, 26 ], [ 8, 1 ], [ 8, 3 ], [ 8, 5 ], [ 8, 9 ], [ 8, 11 ], [ 8, 15 ], [ 8, 17 ], [ 8, 21 ], [ 8, 23 ], [ 8, 25 ], [ 9, 6 ], [ 9, 21 ], [ 10, 6 ], [ 10, 21 ], [ 11, 6 ], [ 11, 21 ], [ 12, 6 ], [ 12, 21 ], [ 13, 6 ], [ 13, 21 ], [ 14, 6 ], [ 14, 21 ], [ 15, 6 ], [ 15, 21 ], [ 16, 6 ], [ 16, 21 ], [ 17, 1 ], [ 17, 3 ], [ 17, 5 ], [ 17, 7 ], [ 17, 9 ], [ 17, 11 ], [ 17, 15 ], [ 17, 17 ], [ 17, 19 ], [ 17, 21 ], [ 17, 23 ], [ 17, 25 ], [ 18, 1 ], [ 18, 6 ], [ 18, 12 ], [ 18, 15 ], [ 18, 21 ], [ 18, 26 ], [ 19, 1 ], [ 19, 6 ], [ 19, 12 ], [ 19, 15 ], [ 19, 21 ], [ 19, 26 ], [ 20, 1 ], [ 20, 2 ], [ 20, 6 ], [ 20, 8 ], [ 20, 10 ], [ 20, 12 ], [ 20, 15 ], [ 20, 17 ], [ 20, 19 ], [ 20, 21 ], [ 20, 24 ], [ 20, 26 ], [ 21, 3 ], [ 21, 6 ], [ 21, 9 ], [ 21, 18 ], [ 21, 21 ], [ 21, 24 ], [ 22, 3 ], [ 22, 6 ], [ 22, 9 ], [ 22, 18 ], [ 22, 21 ], [ 22, 24 ], [ 23, 1 ], [ 23, 3 ], [ 23, 5 ], [ 23, 9 ], [ 23, 11 ], [ 23, 15 ], [ 23, 17 ], [ 23, 21 ], [ 23, 23 ], [ 23, 25 ], [ 24, 1 ], [ 24, 12 ], [ 24, 15 ], [ 24, 26 ], [ 25, 1 ], [ 25, 3 ], [ 25, 5 ], [ 25, 7 ], [ 25, 9 ], [ 25, 11 ], [ 25, 13 ], [ 25, 15 ], [ 25, 17 ], [ 25, 19 ], [ 25, 21 ], [ 25, 23 ], [ 25, 25 ] ], 
void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (move = moves_array[i].split(" "), posns = [], i = _i = 0; 4 >= _i; i = ++_i) posns[i] = [ move[3 * i + 0], move[3 * i + 1], move[3 * i + 2] ];
for (pacman_pos = posns[0], ghost1_pos = posns[1], ghost2_pos = posns[2], ghost3_pos = posns[3], 
ghost4_pos = posns[4], pacfoods = move[15], pman = this.$("#pac-man").remove(), 
this.$(".pac-cell[data-x=" + pacman_pos[0] + "][data-y=" + pacman_pos[1] + "]").append(pman), 
g1 = this.$("#pac-ghost-1").remove(), this.$(".pac-cell[data-x=" + ghost1_pos[0] + "][data-y=" + ghost1_pos[1] + "]").append(g1), 
g2 = this.$("#pac-ghost-2").remove(), this.$(".pac-cell[data-x=" + ghost2_pos[0] + "][data-y=" + ghost2_pos[1] + "]").append(g2), 
g3 = this.$("#pac-ghost-3").remove(), this.$(".pac-cell[data-x=" + ghost3_pos[0] + "][data-y=" + ghost3_pos[1] + "]").append(g3), 
g4 = this.$("#pac-ghost-4").remove(), this.$(".pac-cell[data-x=" + ghost4_pos[0] + "][data-y=" + ghost4_pos[1] + "]").append(g4), 
_results = [], i = _j = 0, _len = pacfoods.length; _len > _j; i = ++_j) pf = pacfoods[i], 
pfx = pac_food_array[i], 3 === pfx[0] && 1 === pfx[1] || 3 === pfx[0] && 26 === pfx[1] || 20 === pfx[0] && 1 === pfx[1] || 20 === pfx[0] && 26 === pfx[1] ? "1" === pf ? _results.push(this.$(".pac-cell[data-x=" + pfx[0] + "][data-y=" + pfx[1] + "]").addClass("pacfoodbig")) :_results.push(this.$(".pac-cell[data-x=" + pfx[0] + "][data-y=" + pfx[1] + "]").removeClass("pacfoodbig")) :"1" === pf ? _results.push(this.$(".pac-cell[data-x=" + pfx[0] + "][data-y=" + pfx[1] + "]").addClass("pacfood")) :_results.push(this.$(".pac-cell[data-x=" + pfx[0] + "][data-y=" + pfx[1] + "]").removeClass("pacfood"));
return _results;
}
}, PacmanView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PacmanView = PacmanView;
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
var HR, PegSolitaireView, _ref;
return PegSolitaireView = function(_super) {
function PegSolitaireView() {
return PegSolitaireView.__super__.constructor.apply(this, arguments);
}
return __extends(PegSolitaireView, _super), PegSolitaireView.prototype.template = "games/pegsolitaire", 
PegSolitaireView.prototype.className = "pegsolitaire-view", PegSolitaireView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, PegSolitaireView.prototype.playMove = function(i, moves_array) {
var columns, dimensions, init_grid, move, moves, rows;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
dimensions = move[0].split(" "), columns = dimensions[0], rows = dimensions[1], 
init_grid = move[1], moves = move[2].split(","), this.grid = $("<div class='game-grid' style='width: " + 40 * columns + "px; height: " + 40 * rows + "px;' \\>"), 
_.times(rows, function(_this) {
return function(row) {
var row_el;
return row_el = $("<div style='height: 40px; width: " + 40 * columns + "px;' \\>"), 
_.times(columns, function(column) {
return "x" === init_grid[row * columns + column] ? row_el.append($('<div data-x="' + column + '" data-y="' + row + '" class="spanhole"> </div>')) :"." === init_grid[row * columns + column] ? row_el.append($('<div data-x="' + column + '" data-y="' + row + '" class="spanhole pegslot"><img src=\'/assets/games/peg.png\'></div>')) :"-" === init_grid[row * columns + column] ? row_el.append($('<div data-x="' + column + '" data-y="' + row + '" class="spanhole pegslot"></div>')) :void 0;
}), _this.grid.append(row_el);
};
}(this)), this.$(".game-grid-wrapper").html(this.grid), this.pseudo_moves = moves, 
this.pseudo_move = 0, this.playPseudoMoves();
}, PegSolitaireView.prototype.playPseudoMoves = function() {
var components, dead_column, dead_row, dead_slot, mv, new_column, new_row, new_slot, old_column, old_row, old_slot;
if (this.pseudo_move !== this.pseudo_moves.length) return mv = this.pseudo_moves[this.pseudo_move], 
components = mv.split(" "), old_column = components[0], old_row = components[1], 
old_slot = this.$('[data-x="' + old_column + '"][data-y="' + old_row + '"]'), new_column = components[2], 
new_row = components[3], new_slot = this.$('[data-x="' + new_column + '"][data-y="' + new_row + '"]'), 
dead_column = components[4], dead_row = components[5], dead_slot = this.$('[data-x="' + dead_column + '"][data-y="' + dead_row + '"]'), 
old_slot.find("img").slideUp(100, function() {
return new_slot.find("img").remove(), new_slot.append("<img style='display: none' src='/assets/games/peg.png'>"), 
new_slot.find("img").slideDown(100, function() {
return dead_slot.find("img").fadeOut(100, function() {
return dead_slot.find("img").remove();
});
});
}), this.pseudo_move = this.pseudo_move + 1, setTimeout(function(_this) {
return function() {
return _this.playPseudoMoves();
};
}(this), 1500);
}, PegSolitaireView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PegSolitaireView = PegSolitaireView;
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
var HR, PennyWiseView, _ref;
return PennyWiseView = function(_super) {
function PennyWiseView() {
return PennyWiseView.__super__.constructor.apply(this, arguments);
}
return __extends(PennyWiseView, _super), PennyWiseView.prototype.template = "games/pennywise", 
PennyWiseView.prototype.className = "pennywise-view", PennyWiseView.prototype.getCoinPosition = function(table_id, value) {
var $coin, $tds, i, _i, _ref;
for ($tds = $("#" + table_id + " td"), i = _i = 0, _ref = $tds.length; _ref >= 0 ? _ref > _i :_i > _ref; i = _ref >= 0 ? ++_i :--_i) if ($coin = $($tds[i]).find("div.coin"), 
$coin.length > 0 && "true" !== $coin.attr("processing") && $coin.text() === value) return $($tds[i]).attr("id");
return -1;
}, PennyWiseView.prototype.getEmptySlot = function(table_id) {
var $coin, $tds, i, _i, _ref;
for ($tds = $("#" + table_id + " td"), i = _i = 0, _ref = $tds.length; _ref >= 0 ? _ref > _i :_i > _ref; i = _ref >= 0 ? ++_i :--_i) if ($coin = $($tds[i]).find("div.coin"), 
0 === $coin.length && "true" !== $($tds[i]).attr("processing")) return $($tds[i]).attr("id");
return -1;
}, PennyWiseView.prototype.moveCoin = function(source_table, target_table, value) {
var $source, $target, source_selector;
return source_selector = "table#" + source_table + " td#" + this.getCoinPosition(source_table, value) + " .coin", 
$source = $(source_selector), $target = $("table#" + target_table + " td#" + this.getEmptySlot(target_table)), 
$source.attr("processing", "true"), $target.attr("processing", "true"), $source.css({
top:$source.offset().top - 160,
left:$source.offset().left
}).animate({
top:$target.offset().top - 160,
left:$target.offset().left + 20
}, 400, function() {
return $source.removeAttr("processing"), $target.append($source.clone()), $target.removeAttr("processing"), 
$source.remove();
}), $target;
}, PennyWiseView.prototype.render = function() {
var i, j, table_body, _i, _j;
for ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), table_body = "<tbody>", i = _i = 0; 5 > _i; i = ++_i) {
for (table_body += "<tr>", j = _j = 0; 5 > _j; j = ++_j) table_body += "<td id='cell-" + i + j + "'></td>";
table_body += "</tr>";
}
return table_body += "</tbody>", $("table.pennywise").html(table_body), this;
}, PennyWiseView.prototype.playMove = function(move_cnt, moves_array) {
var coin, i, init, move, selector, stash, tmp, _i, _j, _ref, _ref1;
if (0 === move_cnt) for (init = moves_array[0].split(" "), i = _i = 1, _ref = init.length; _ref >= 1 ? _ref > _i :_i > _ref; i = _ref >= 1 ? ++_i :--_i) selector = " td#cell-" + parseInt((i - 1) / 5) + parseInt((i - 1) % 5), 
coin = "<div class='coin gold'><span class='number'>" + init[i] + "</span></div>", 
$("#player1" + selector).html(coin), $("#player2" + selector).html(coin); else for (move = moves_array[move_cnt].split(" "), 
tmp = "", stash = [], tmp = this.moveCoin("player" + move[0], "pool", move[1]), 
stash = stash.concat(tmp), i = _j = 0, _ref1 = move[2]; _ref1 >= 0 ? _ref1 > _j :_j > _ref1; i = _ref1 >= 0 ? ++_j :--_j) tmp = this.moveCoin("pool", "player" + move[0], move[i + 3]), 
stash = stash.concat(tmp);
return this;
}, PennyWiseView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PennyWiseView = PennyWiseView;
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
var HR, PipelayerView, _ref;
return PipelayerView = function(_super) {
function PipelayerView() {
return PipelayerView.__super__.constructor.apply(this, arguments);
}
return __extends(PipelayerView, _super), PipelayerView.prototype.template = "games/pipelayer", 
PipelayerView.prototype.className = "pipelayer-view", PipelayerView.prototype.initialize = function() {
return this.startX2 = 55, this.startX1 = 30, this.startY2 = 30, this.startY1 = 55, 
this.offset = 50, this.radius = 4;
}, PipelayerView.prototype.render = function() {
var c, cols, ctx, i, j, posX, posY, rows;
if (!(this.$("#pipelayerCanvas").length > 0)) {
if ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), c = this.$("#pipelayerCanvas")[0]) {
for (ctx = c.getContext("2d"), rows = 7, cols = 6, ctx.fillStyle = "blue", ctx.strokeStyle = "blue", 
i = 0; rows > i; ) {
for (j = 0; cols > j; ) ctx.beginPath(), posX = this.startX2 + 50 * j, posY = this.startY2 + 50 * i, 
ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), ctx.fill(), j++;
i++;
}
for (rows = 6, cols = 7, ctx.fillStyle = "red", ctx.strokeStyle = "red", i = 0; rows > i; ) {
for (j = 0; cols > j; ) ctx.beginPath(), posX = this.startX1 + 50 * j, posY = this.startY1 + 50 * i, 
ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), ctx.fill(), j++;
i++;
}
}
return this;
}
}, PipelayerView.prototype.playMove = function(i, moves_array) {
var c, col1, col2, color, ctx1, ctx2, move, player, player_symbol, pointsNum, posX, posY, row1, row2;
if (player_symbol = {
b:"blue",
r:"red"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (move = moves_array[i].split(" "), row1 = move[0], col1 = move[1], row2 = move[2], 
col2 = move[3], player = move[4], color = player_symbol[player], c = document.getElementById("pipelayerCanvas"), 
c && void 0 !== player_symbol[player] && (ctx1 = c.getContext("2d"), ctx1.beginPath(), 
ctx1.fillStyle = color, ctx1.strokeStyle = color, ctx1.moveTo(30 + 25 * col1, 30 + 25 * row1), 
ctx1.lineTo(30 + 25 * col2, 30 + 25 * row2), ctx1.stroke(), void 0 !== move[5])) {
for (pointsNum = move[5], i = 0, posX = new Array(), posY = new Array(); pointsNum > i; ) posX[i] = move[6 + 2 * i], 
posY[i] = move[7 + 2 * i], i++;
for (i = 0; pointsNum - 1 > i; ) ctx2 = c.getContext("2d"), ctx2.beginPath(), ctx2.fillStyle = "black", 
ctx2.strokeStyle = "black", ctx2.moveTo(30 + 25 * posY[i], 30 + 25 * posX[i]), ctx2.lineTo(30 + 25 * posY[i + 1], 30 + 25 * posX[i + 1]), 
ctx2.stroke(), ctx2.beginPath(), ctx2.arc(30 + 25 * posY[i], 30 + 25 * posX[i], this.radius, 0, 2 * Math.PI), 
ctx2.stroke(), ctx2.fill(), i === pointsNum - 2 && (ctx2.beginPath(), ctx2.arc(30 + 25 * posY[i + 1], 30 + 25 * posX[i + 1], this.radius, 0, 2 * Math.PI), 
ctx2.stroke(), ctx2.fill()), i++;
}
return this;
}
}, PipelayerView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PipelayerView = PipelayerView;
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
var HR, PPeachView, _ref;
return PPeachView = function(_super) {
function PPeachView() {
return PPeachView.__super__.constructor.apply(this, arguments);
}
return __extends(PPeachView, _super), PPeachView.prototype.template = "games/ppeach", 
PPeachView.prototype.className = "ppeach-view", PPeachView.prototype.render = function() {
var moves, size;
return null !== this.model.toJSON().moves ? (moves = this.model.toJSON().moves, 
size = 3, 0 === moves.length || "CODECHECKER_INVALID_MOVE_ERROR" === this.model.toJSON().moves[0] || isNaN(moves[0].split(" ")[0]) || (size = parseInt(moves[0].split(" ")[0])), 
$(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
size:size
})), this) :$(this.el).html("The information about this game is hidden. The response from the codechecker is: <br>" + this.model.toJSON().message);
}, PPeachView.prototype.playMove = function(i, moves_array) {
var move_set, set;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move_set = moves_array[i], 
$(this.el).find(".game-grid").find("td.cell").removeClass("bot").removeClass("queen"), 
set = move_set.split(" "), $(this.el).find(".game-grid").find("td." + set[1] + "-" + set[2]).addClass("queen"), 
$(this.el).find(".game-grid").find("td." + set[3] + "-" + set[4]).addClass("bot");
}, PPeachView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PPeachView = PPeachView;
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
var HR, PrisonerDilemmaView, _ref;
return PrisonerDilemmaView = function(_super) {
function PrisonerDilemmaView() {
return PrisonerDilemmaView.__super__.constructor.apply(this, arguments);
}
return __extends(PrisonerDilemmaView, _super), PrisonerDilemmaView.prototype.template = "games/prisonerdilemma", 
PrisonerDilemmaView.prototype.className = "prisonerdilemma-view", PrisonerDilemmaView.prototype.initialize = function() {
return this.dd = this.dc = this.cd = this.cc = 0, this.prev_move = 0, this.sentence_player1 = this.sentence_player2 = 0;
}, PrisonerDilemmaView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, PrisonerDilemmaView.prototype.playMove = function(i, moves_array) {
var action, bet1, bet2, game_number, move1, move2;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] && i % 2 !== 1) return game_number = i / 2 + 1, 
move1 = moves_array[i].split(" "), bet1 = move1[0], moves_array[i + 1] ? (move2 = moves_array[i + 1].split(" "), 
bet2 = move2[0]) :(move2 = null, bet2 = null), 0 === this.prev_move && 0 === i || this.prev_move + 2 === i ? (action = "add", 
this.prev_move = i) :0 !== this.prev_move && this.prev_move - 2 === i ? (action = "sub", 
this.prev_move = i) :action = void 0, "betray" === bet1 && "betray" === bet2 ? ("add" === action ? (this.dd += 1, 
this.sentence_player1 += 3, this.sentence_player2 += 3) :"sub" === action && (this.sentence_player1 -= 3, 
this.sentence_player2 -= 3, this.dd -= 1), this.$("table.prisonerdilemma").find("td.d-d").html(this.dd)) :"cooperate" === bet1 && "betray" === bet2 ? ("add" === action ? (this.cd += 1, 
this.sentence_player1 += 12, this.sentence_player2 += 0) :"sub" === action && (this.cd -= 1, 
this.sentence_player1 -= 12, this.sentence_player2 -= 0), this.$("table.prisonerdilemma").find("td.c-d").html(this.cd)) :"betray" === bet1 && "cooperate" === bet2 ? ("add" === action ? (this.dc += 1, 
this.sentence_player1 += 0, this.sentence_player2 += 12) :"sub" === action && (this.dc -= 1, 
this.sentence_player1 -= 0, this.sentence_player2 -= 12), this.$("table.prisonerdilemma").find("td.d-c").html(this.dc)) :"cooperate" === bet1 && "cooperate" === bet2 && ("add" === action ? (this.sentence_player1 += 1, 
this.sentence_player2 += 1, this.cc += 1) :"sub" === action && (this.sentence_player1 -= 1, 
this.sentence_player2 -= 1, this.cc -= 1), this.$("table.prisonerdilemma").find("td.c-c").html(this.cc)), 
this.$(".game-no").html(game_number), this.$(".sentence-player1").html(this.sentence_player1), 
this.$(".sentence-player2").html(this.sentence_player2), this;
}, PrisonerDilemmaView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PrisonerDilemmaView = PrisonerDilemmaView;
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
var HR, RealNoLineView, _ref;
return RealNoLineView = function(_super) {
function RealNoLineView() {
return RealNoLineView.__super__.constructor.apply(this, arguments);
}
return __extends(RealNoLineView, _super), RealNoLineView.prototype.template = "games/realnoline", 
RealNoLineView.prototype.className = "realnoline-view", RealNoLineView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, RealNoLineView.prototype.playMove = function(i, moves_array) {
var action, bg_colours, border_colours, left_inner, left_outer, move, right_inner, right_outer;
return border_colours = [ "#f00", "#00f" ], bg_colours = [ "#522", "#225" ], void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (move = moves_array[i].split(" "), 
left_inner = Number(move[0]), right_inner = Number(move[1]), left_outer = Number(move[2]), 
right_outer = Number(move[3]), action = Number(move[4]), $(this.el).find("#bar-left-area").animate({
width:Math.floor(500 * left_outer) + "px"
}, 500), $(this.el).find("#bar-right-area").animate({
width:Math.floor(500 * (1 - right_outer)) + "px"
}, 500), $(this.el).find("#bar-middle-area").animate({
left:Math.floor(500 * (left_inner - left_outer)) + "px",
width:Math.floor(500 * (right_inner - left_inner)) + "px"
}, 500), $(this.el).find("#now-playing").html(action)) :void 0;
}, RealNoLineView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RealNoLineView = RealNoLineView;
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
var HR, SlidingBlocksView, _ref;
return SlidingBlocksView = function(_super) {
function SlidingBlocksView() {
return SlidingBlocksView.__super__.constructor.apply(this, arguments);
}
return __extends(SlidingBlocksView, _super), SlidingBlocksView.prototype.template = "games/slidingblocks", 
SlidingBlocksView.prototype.className = "slidingblocks-view", SlidingBlocksView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, SlidingBlocksView.prototype.playMove = function(i, moves_array) {
var block, block_width, blocks, board, grid_height, grid_width, left, top, _i, _k, _len, _len1, _ref1, _ref3, _results, _results1, _results2;
if (block_width = 52, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (board = moves_array[i].split(" "), grid_width = grid_height = Math.sqrt(board.length), 
this.$(".game-grid").css({
width:grid_width * block_width,
height:grid_height * block_width
}), 0 === i) {
for (blocks = new Array(), _ref1 = _.zip(function() {
_results = [];
for (var _j = 0, _ref = board.length - 1; _ref >= 0 ? _ref >= _j :_j >= _ref; _ref >= 0 ? _j++ :_j--) _results.push(_j);
return _results;
}.apply(this), board), _i = 0, _len = _ref1.length; _len > _i; _i++) block = _ref1[_i], 
top = block_width * parseInt(block[0] / grid_height), left = block_width * parseInt(block[0] % grid_width), 
blocks.push($("<div class='game-block' style='top: " + top + "px; left: " + left + "px;' data-blockid='" + block[1] + "'>" + block[1] + "</div>"));
return this.$(".game-block").remove(), this.$(".game-grid").append(blocks);
}
for (_ref3 = _.zip(function() {
_results2 = [];
for (var _l = 0, _ref2 = board.length - 1; _ref2 >= 0 ? _ref2 >= _l :_l >= _ref2; _ref2 >= 0 ? _l++ :_l--) _results2.push(_l);
return _results2;
}.apply(this), board), _results1 = [], _k = 0, _len1 = _ref3.length; _len1 > _k; _k++) block = _ref3[_k], 
_results1.push(this.$("[data-blockid=" + block[1] + "]").animate({
top:block_width * parseInt(block[0] / grid_height),
left:block_width * parseInt(block[0] % grid_width)
}));
return _results1;
}
}, SlidingBlocksView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SlidingBlocksView = SlidingBlocksView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var HR, SnakesOnHackerRank, _ref;
return SnakesOnHackerRank = function(_super) {
function SnakesOnHackerRank() {
return SnakesOnHackerRank.__super__.constructor.apply(this, arguments);
}
return __extends(SnakesOnHackerRank, _super), SnakesOnHackerRank.prototype.template = "games/snakesonhackerrank", 
SnakesOnHackerRank.prototype.className = "snakesonhackerrank", SnakesOnHackerRank.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, SnakesOnHackerRank.prototype.playMove = function(i, moves_array) {
var food, move, oldfood, oldmove, oldsnake1, oldsnake2, oldsnakesnakefood, osh1, osh2, sh1, sh2, snake1, snake2, snakesnakefood, _ref, _ref1, _ref2;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] && i !== moves_array.length - 1) return move = moves_array[i].split(":"), 
i > 0 && (oldmove = moves_array[i - 1].split(":")), 0 === i ? (this.snake1orientation = this.snake2orientation = "left", 
this.gridDimensions = move[0], _ref = this.gridDimensions.split(","), this.rows = _ref[0], 
this.columns = _ref[1], this.wallTiles = [], snakesnakefood = _.rest(move), 5 === move.length && (this.wallTiles = move[4].split(" "), 
snakesnakefood = _.chain(move).rest().reverse().rest().reverse().value())) :(snakesnakefood = move, 
oldsnakesnakefood = oldmove, oldmove && 1 === i && (oldsnakesnakefood = _.chain(move).rest().reverse().rest().reverse().value(), 
4 === oldmove.length && (oldsnakesnakefood = _.rest(oldmove)))), this.clearGrid(), 
snake1 = snakesnakefood[0], snake2 = snakesnakefood[1], food = snakesnakefood[2], 
oldsnakesnakefood && i % 2 === 1 && (oldsnake1 = oldsnakesnakefood[0], oldsnake2 = oldsnakesnakefood[1], 
oldfood = oldsnakesnakefood[2], _ref1 = _.map([ snake1, oldsnake1, snake2, oldsnake2 ], function() {
return function(snk) {
return _.map(snk.split(" ")[0].split(","), function(x) {
return parseInt(x);
});
};
}(this)), sh1 = _ref1[0], osh1 = _ref1[1], sh2 = _ref1[2], osh2 = _ref1[3], _ref2 = [ this.celldiff(sh1, osh1), this.celldiff(sh2, osh2) ], 
this.snake1orientation = _ref2[0], this.snake2orientation = _ref2[1], this.log("orientations", [ this.snake1orientation, this.snake2orientation ])), 
this.renderSnake(snake1, "snake1", "" + this.snake1orientation + "-oriented"), this.renderSnake(snake2, "snake2", "" + this.snake2orientation + "-oriented"), 
this.renderFood(food), this;
}, SnakesOnHackerRank.prototype.celldiff = function(mv1, mv2) {
var gx;
return gx = _.map(_.zip(mv1, mv2), function(m) {
return m[0] - m[1];
}), 0 === gx[1] ? -1 === gx[0] ? "up" :"down" :-1 === gx[1] ? "left" :"right";
}, SnakesOnHackerRank.prototype.renderFood = function(food) {
return _.each(food.split(" "), function(food) {
var fx, fy, _ref;
return _ref = food.split(","), fx = _ref[0], fy = _ref[1], this.$("[data-gg-x=" + fx + "][data-gg-y=" + fy + "]").addClass("food");
}), this;
}, SnakesOnHackerRank.prototype.intify = function(lst) {
return _.map(lst, function(n) {
return parseInt(n);
});
}, SnakesOnHackerRank.prototype.renderSnake = function(data, className, orientationClassName) {
var coords;
return coords = data.split(" "), _.each(coords, function(_this) {
return function(coord, idx, lst) {
var gx, gy, nedge, nextcell, pedge, prevcell, thiscell, _ref;
return _ref = coord.split(","), gx = _ref[0], gy = _ref[1], thiscell = _this.intify([ gx, gy ]), 
_this.$("[data-gg-x=" + gx + "][data-gg-y=" + gy + "]").addClass(className), 0 !== idx && idx !== lst.length - 1 && (prevcell = _this.intify(lst[idx - 1].split(",")), 
pedge = _this.celldiff(prevcell, thiscell), nextcell = _this.intify(lst[idx + 1].split(",")), 
nedge = _this.celldiff(nextcell, thiscell), _this.$("[data-gg-x=" + gx + "][data-gg-y=" + gy + "]").addClass("snakebody-" + pedge + "-" + nedge)), 
0 === idx && _this.$("[data-gg-x=" + gx + "][data-gg-y=" + gy + "]").addClass("snakehead").addClass(orientationClassName), 
1 === lst.length ? _this.$("[data-gg-x=" + gx + "][data-gg-y=" + gy + "]").addClass("tadpole") :(idx === lst.length - 1 && (prevcell = _this.intify(lst[idx - 1].split(",")), 
pedge = _this.celldiff(prevcell, thiscell), _this.$("[data-gg-x=" + gx + "][data-gg-y=" + gy + "]").addClass("snaketail").addClass("" + pedge + "-oriented")), 
0 === idx ? (nextcell = _this.intify(lst[idx + 1].split(",")), nedge = _this.celldiff(nextcell, thiscell), 
_this.$("[data-gg-x=" + gx + "][data-gg-y=" + gy + "]").addClass("" + pedge + "-oriented")) :void 0);
};
}(this)), this;
}, SnakesOnHackerRank.prototype._clearGrid = function() {
return this.$(".grid-placeholder").html(this.grid_html), this;
}, SnakesOnHackerRank.prototype._getRandomInt = function(min, max) {
return min + Math.floor(Math.random() * (max - min + 1));
}, SnakesOnHackerRank.prototype.clearGrid = function() {
var column, grass, grid_html, of10, row, _i, _j, _ref, _ref1, _ref2, _ref3;
if (this._hasCleared) return this._clearGrid();
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) {
switch (_ref2 = "" + row + "," + column, __indexOf.call(this.wallTiles, _ref2) >= 0 && (grid_html += "<td data-gg-x='" + row + "' data-gg-y='" + column + "' class='graph-col wall'></td>"), 
of10 = this._getRandomInt(0, 9)) {
case 1:
grass = 4;
break;

case 2:
grass = 3;
break;

case 3:
grass = 2;
break;

default:
grass = 1;
}
_ref3 = "" + row + "," + column, grid_html += __indexOf.call(this.wallTiles, _ref3) >= 0 ? "<td class='graph-col wall grass" + grass + "'><div data-gg-x='" + row + "' data-gg-y='" + column + "'></div></td>" :"<td class='graph-col grass" + grass + "'><div class='graph-col' data-gg-x='" + row + "' data-gg-y='" + column + "'></div></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.grid_html = grid_html, this._hasCleared = !0, 
this._clearGrid(), this;
}, SnakesOnHackerRank;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SnakesOnHackerRank = SnakesOnHackerRank;
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
var HR, StockPredictionView, _ref;
return StockPredictionView = function(_super) {
function StockPredictionView() {
return StockPredictionView.__super__.constructor.apply(this, arguments);
}
return __extends(StockPredictionView, _super), StockPredictionView.prototype.className = "stockprediction-view", 
StockPredictionView.prototype.render = function() {
return null === this.model.toJSON().moves ? $(this.el).html("The information about this game is hidden.<br>" + this.model.toJSON().message) :void 0;
}, StockPredictionView.prototype.playMove = function() {
return "";
}, StockPredictionView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.StockPredictionView = StockPredictionView;
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
var HR, TicTacToeView, _ref;
return TicTacToeView = function(_super) {
function TicTacToeView() {
return TicTacToeView.__super__.constructor.apply(this, arguments);
}
return __extends(TicTacToeView, _super), TicTacToeView.prototype.template = "games/tictactoe", 
TicTacToeView.prototype.className = "tictactoe-view", TicTacToeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, TicTacToeView.prototype.playMove = function(i, moves_array) {
var move, player, player_symbol, x, y;
return player_symbol = {
1:"X",
2:"O"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (move = moves_array[i].split(" "), 
x = move[0], y = move[1], player = move[2], $(this.el).find(".game-grid").find("td." + x + "-" + y).html(player_symbol[player])) :void 0;
}, TicTacToeView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TicTacToeView = TicTacToeView;
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
var HR, TronGenericView, _ref;
return TronGenericView = function(_super) {
function TronGenericView() {
return TronGenericView.__super__.constructor.apply(this, arguments);
}
return __extends(TronGenericView, _super), TronGenericView.prototype.template = "games/tron-generic", 
TronGenericView.prototype.className = "tron-generic-view", TronGenericView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, TronGenericView.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.tron_generic_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], 
this.columns = _ref[1], this.clearGrid(), this;
}, TronGenericView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.tron_generic_grid[row * this.columns + column]) {
case "-":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "#":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='black-block'></td>";
break;

case "r":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='red-block'></td>";
break;

case "g":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='green-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".tron-generic-grid").html(grid_html);
}, TronGenericView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TronGenericView = TronGenericView;
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
var HR, TronAppleView, _ref;
return TronAppleView = function(_super) {
function TronAppleView() {
return TronAppleView.__super__.constructor.apply(this, arguments);
}
return __extends(TronAppleView, _super), TronAppleView.prototype.template = "games/tron-apple", 
TronAppleView.prototype.className = "tron-apple-view", TronAppleView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, TronAppleView.prototype.playMove = function(i, moves_array) {
var move, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return move = moves_array[i].split(":"), 
this.tron_generic_grid = move[0], _ref = move[1].split(" "), this.rows = _ref[0], 
this.columns = _ref[1], this.clearGrid(), this;
}, TronAppleView.prototype.clearGrid = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) switch (this.tron_generic_grid[row * this.columns + column]) {
case ".":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
break;

case "*":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='apple-block'></td>";
break;

case "#":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='hash-block'></td>";
break;

case "A":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='xhead-block'></td>";
break;

case "X":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='xwall-block'></td>";
break;

case "B":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='yhead-block'></td>";
break;

case "Y":
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='ywall-block'></td>";
break;

default:
grid_html += "<td data-gg-x='" + column + "' data-gg-y='" + row + "' class='graph-col'></td>";
}
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".tron-generic-grid").html(grid_html);
}, TronAppleView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TronAppleView = TronAppleView;
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
var HR, TronV2View, _ref;
return TronV2View = function(_super) {
function TronV2View() {
return TronV2View.__super__.constructor.apply(this, arguments);
}
return __extends(TronV2View, _super), TronV2View.prototype.template = "tronv2", 
TronV2View.prototype.className = "tronv2-view", TronV2View.prototype.initialize = function() {
return this.startX = 20, this.startY = 20, this.radius = 2, this.rows = 13, this.cols = 13, 
this.offset = 20, this.blocked = [ [ 0, 6 ], [ 1, 6 ], [ 2, 6 ], [ 3, 6 ], [ 5, 1 ], [ 5, 6 ], [ 5, 11 ], [ 6, 1 ], [ 6, 2 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ], [ 6, 10 ], [ 6, 11 ], [ 7, 1 ], [ 7, 6 ], [ 7, 11 ], [ 9, 6 ], [ 10, 6 ], [ 11, 6 ], [ 12, 6 ] ], 
this.startPos = [ [ 0, 0, "red" ], [ 12, 12, "green" ] ];
}, TronV2View.prototype.render = function() {
var c, ctx, i, j, posX, posY;
if ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), c = this.$("#tronV2Canvas")[0]) {
for (ctx = c.getContext("2d"), ctx.fillStyle = "#fff", ctx.strokeStyle = "#333", 
ctx.lineWidth = 2, i = 0; i < this.rows; ) {
for (j = 0; j < this.cols; ) ctx.beginPath(), posX = this.startX + this.offset * (j - 1), 
posY = this.startY + this.offset * (i - 1), ctx.rect(posX, posY, this.offset, this.offset), 
ctx.stroke(), ctx.fill(), j++;
i++;
}
for (ctx = c.getContext("2d"), ctx.fillStyle = "#000", ctx.strokeStyle = "#000", 
ctx.lineWidth = 2, i = 0; i < this.blocked.length; ) ctx.beginPath(), posX = this.startX + this.offset * (this.blocked[i][1] - 1), 
posY = this.startY + this.offset * (this.blocked[i][0] - 1), ctx.rect(posX, posY, this.offset, this.offset), 
ctx.stroke(), ctx.fill(), i++;
for (ctx = c.getContext("2d"), ctx.strokeStyle = "#333", ctx.lineWidth = 2, i = 0; i < this.startPos.length; ) ctx.beginPath(), 
ctx.fillStyle = this.startPos[i][2], posX = this.startX + this.offset * (this.startPos[i][1] - 1), 
posY = this.startY + this.offset * (this.startPos[i][0] - 1), ctx.rect(posX, posY, this.offset, this.offset), 
ctx.stroke(), ctx.fill(), i++;
}
return this;
}, TronV2View.prototype.playMove = function(i, moves_array) {
var c, ctx, j, move, player, player_symbol, points, posX, posY, x1, y1;
if (player_symbol = {
g:"green",
r:"red"
}, void 0 !== moves_array[i] && i % 2 !== 1 && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (move = moves_array[i].split(" "), player = move[0], points = move[1], c = this.$("#tronV2Canvas")[0]) for (ctx = c.getContext("2d"), 
ctx.fillStyle = player_symbol[player], ctx.strokeStyle = "#333", ctx.lineWidth = 2, 
ctx.beginPath(), j = 0; points > j; ) x1 = move[2 + 2 * j], y1 = move[2 + 2 * j + 1], 
posX = this.startX + this.offset * (y1 - 1), posY = this.startY + this.offset * (x1 - 1), 
ctx.rect(posX, posY, this.offset, this.offset), ctx.fill(), ctx.stroke(), j++;
if (void 0 !== moves_array[i + 1] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i + 1]) {
if (move = moves_array[i + 1].split(" "), player = move[0], points = move[1], c = this.$("#tronV2Canvas")[0]) for (ctx = c.getContext("2d"), 
ctx.fillStyle = player_symbol[player], ctx.strokeStyle = "#333", ctx.lineWidth = 2, 
ctx.beginPath(), j = 0; points > j; ) x1 = move[2 + 2 * j], y1 = move[2 + 2 * j + 1], 
posX = this.startX + this.offset * (y1 - 1), posY = this.startY + this.offset * (x1 - 1), 
ctx.rect(posX, posY, this.offset, this.offset), ctx.fill(), ctx.stroke(), j++;
return this;
}
}
}, TronV2View;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TronV2View = TronV2View;
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
var HR, TronView, _ref;
return TronView = function(_super) {
function TronView() {
return TronView.__super__.constructor.apply(this, arguments);
}
return __extends(TronView, _super), TronView.prototype.template = "tron", TronView.prototype.className = "tron-view", 
TronView.prototype.initialize = function() {
return this.startX = 20, this.startY = 20, this.radius = 2, this.rows = 13, this.cols = 13, 
this.offset = 20, $(".player-1").children(".player-color").html("Orange"), $(".player-2").children(".player-color").html("Blue");
}, TronView.prototype.render = function() {
var c, ctx, i, j, posX, posY;
if ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), c = this.$("#tronCanvas")[0]) for (ctx = c.getContext("2d"), ctx.fillStyle = "#fff", 
ctx.strokeStyle = "#333", ctx.lineWidth = 2, i = 0; i < this.rows; ) {
for (j = 0; j < this.cols; ) ctx.beginPath(), posX = this.startX + this.offset * (j - 1), 
posY = this.startY + this.offset * (i - 1), ctx.rect(posX, posY, this.offset, this.offset), 
ctx.stroke(), ctx.fill(), j++;
i++;
}
return this;
}, TronView.prototype.playMove = function(i, moves_array) {
var c, ctx, j, move, player, player_symbol, points, posX, posY, x1, y1;
if (player_symbol = {
g:"orange",
r:"blue"
}, void 0 !== moves_array[i] && i % 2 !== 1 && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (move = moves_array[i].split(" "), player = move[0], points = move[1], c = this.$("#tronCanvas")[0]) for (ctx = c.getContext("2d"), 
ctx.fillStyle = player_symbol[player], ctx.strokeStyle = "#333", ctx.lineWidth = 2, 
ctx.beginPath(), j = 0; points > j; ) x1 = move[2 + 2 * j], y1 = move[2 + 2 * j + 1], 
posX = this.startX + this.offset * (y1 - 1), posY = this.startY + this.offset * (x1 - 1), 
ctx.rect(posX, posY, this.offset, this.offset), ctx.fill(), ctx.stroke(), j++;
if (void 0 !== moves_array[i + 1] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i + 1]) {
if (move = moves_array[i + 1].split(" "), player = move[0], points = move[1], c = this.$("#tronCanvas")[0]) for (ctx = c.getContext("2d"), 
ctx.fillStyle = player_symbol[player], ctx.strokeStyle = "#333", ctx.lineWidth = 2, 
ctx.beginPath(), j = 0; points > j; ) x1 = move[2 + 2 * j], y1 = move[2 + 2 * j + 1], 
posX = this.startX + this.offset * (y1 - 1), posY = this.startY + this.offset * (x1 - 1), 
ctx.rect(posX, posY, this.offset, this.offset), ctx.fill(), ctx.stroke(), j++;
return this;
}
}
}, TronView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TronView = TronView;
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
var HR, UltimateTicTacToeView, _ref;
return UltimateTicTacToeView = function(_super) {
function UltimateTicTacToeView() {
return UltimateTicTacToeView.__super__.constructor.apply(this, arguments);
}
return __extends(UltimateTicTacToeView, _super), UltimateTicTacToeView.prototype.template = "games/ultimatettt", 
UltimateTicTacToeView.prototype.className = "ultimate-tictactoe-view", UltimateTicTacToeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, UltimateTicTacToeView.prototype.stopGame = function() {
return $(".uttt-winline").remove();
}, UltimateTicTacToeView.prototype.playMove = function(i, moves_array) {
var BLUECOLOR, REDCOLOR, changeHighlight, diag1, diag2, first, highlight_x, highlight_y, inner_grid, inner_x, inner_y, middle, move, origin_x, origin_y, outer_x, outer_y, player, player_symbol, win_color, win_left, win_line, win_top, _ref, _ref1, _ref2;
return REDCOLOR = "rgb(150,0,0)", BLUECOLOR = "rgb(0,0,150)", player_symbol = {
0:"X",
1:"O"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (move = moves_array[i].split(":"), 
_ref = move[0].split(" "), outer_x = _ref[0], outer_y = _ref[1], _ref1 = move[1].split(" "), 
inner_x = _ref1[0], inner_y = _ref1[1], _ref2 = move[2].split(" "), highlight_x = _ref2[0], 
highlight_y = _ref2[1], player = i % 2, inner_grid = $(this.el).find(".game-grid").find('table.uttt-inner[data-grid-row="' + outer_x + '"][data-grid-column="' + outer_y + '"]'), 
inner_grid.find('td[data-grid-row="' + inner_x + '"][data-grid-column="' + inner_y + '"]').html(player_symbol[player]), 
changeHighlight = function(_this) {
return function() {
return $(_this.el).find(".game-grid").find(".uttt-inner td").removeClass("highlighted"), 
$(_this.el).find(".game-grid").find('table.uttt-inner[data-grid-row="' + highlight_x + '"][data-grid-column="' + highlight_y + '"]').find("td").addClass("highlighted");
};
}(this), setTimeout(changeHighlight, 600), 0 === i && $(".uttt-winline").remove(), 
void 0 === inner_grid.attr("data-won") && (_.times(3, function(_this) {
return function(tx) {
var first, horiz, vert, win_color, win_left, win_line, win_top;
return horiz = _.select(inner_grid.find('td[data-grid-row="' + tx + '"]'), function(elm) {
return elm.innerHTML === player_symbol[player];
}), 3 === horiz.length && void 0 === inner_grid.attr("data-won") && ($(horiz).addClass("uttt-won-" + player), 
inner_grid.attr("data-won", player), first = $(horiz[0]), win_left = first.offset().left + .33 * first.width(), 
win_top = first.offset().top + 40, win_color = REDCOLOR, 1 === player && (win_color = BLUECOLOR), 
win_line = $('<div data-view="' + _this.cid + "\" class='uttt-winline'>"), win_line.css({
position:"absolute",
top:"" + win_top + "px",
left:"" + win_left + "px",
width:"0px",
height:"4px",
background:win_color
}), $(document.body).append(win_line), win_line.animate({
width:"216px"
})), vert = _.select(inner_grid.find('td[data-grid-column="' + tx + '"]'), function(elm) {
return elm.innerHTML === player_symbol[player];
}), 3 === vert.length && void 0 === inner_grid.attr("data-won") ? ($(vert).addClass("uttt-won-" + player), 
inner_grid.attr("data-won", player), first = $(vert[0]), win_left = first.offset().left + 38, 
win_top = first.offset().top + .33 * first.width(), win_color = REDCOLOR, 1 === player && (win_color = BLUECOLOR), 
win_line = $('<div data-view="' + _this.cid + "\" class='uttt-winline'>"), win_line.css({
position:"absolute",
top:"" + win_top + "px",
left:"" + win_left + "px",
width:"4px",
height:"0px",
background:win_color
}), $(document.body).append(win_line), win_line.animate({
height:"216px"
})) :void 0;
};
}(this)), diag1 = _.chain(inner_grid.find("td")).select(function(elm) {
return $(elm).attr("data-grid-column") === $(elm).attr("data-grid-row");
}).select(function(elm) {
return elm.innerHTML === player_symbol[player];
}).value(), 3 === diag1.length && void 0 === inner_grid.attr("data-won") && ($(diag1).addClass("uttt-won-" + player), 
inner_grid.attr("data-won", player), first = $(diag1[0]), win_left = first.offset().left + .33 * first.width(), 
win_top = first.offset().top + 120, win_color = REDCOLOR, 1 === player && (win_color = BLUECOLOR), 
win_line = $('<div data-view="' + this.cid + "\" class='uttt-winline'>"), win_line.css({
position:"absolute",
top:"" + win_top + "px",
left:"" + win_left + "px",
width:"0px",
height:"4px",
background:win_color,
"-webkit-transform":"rotate(45deg)",
"-moz-transform":"rotate(45deg)",
"-o-transform":"rotate(45deg)",
"-ms-transform":"rotate(45deg)",
transform:"rotate(45deg)"
}), $(document.body).append(win_line), win_line.animate({
width:"216px"
})), diag2 = _.chain(inner_grid.find("td")).select(function(elm) {
return parseInt($(elm).attr("data-grid-column")) === 2 - parseInt($(elm).attr("data-grid-row"));
}).select(function(elm) {
return elm.innerHTML === player_symbol[player];
}).value(), 3 === diag2.length && void 0 === inner_grid.attr("data-won")) ? ($(diag2).addClass("uttt-won-" + player), 
inner_grid.attr("data-won", player), first = $(diag2[2]), middle = $(diag2[1]), 
origin_x = middle.offset().left + middle.width() / 2, origin_y = middle.offset().top + middle.height() / 2, 
win_left = first.offset().left - 18, win_top = first.offset().top - 40, win_color = REDCOLOR, 
1 === player && (win_color = BLUECOLOR), win_line = $('<div data-view="' + this.cid + "\" class='uttt-winline'>"), 
win_line.css({
position:"absolute",
top:"" + win_top + "px",
left:"" + win_left + "px",
width:"0px",
height:"4px",
background:win_color,
"-webkit-transform":"rotate(-45deg)",
"-moz-transform":"rotate(45deg)",
"-o-transform":"rotate(45deg)",
"-ms-transform":"rotate(45deg)",
transform:"rotate(45deg)"
}), $(document.body).append(win_line), win_line.animate({
width:"266px"
})) :void 0) :void 0;
}, UltimateTicTacToeView;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.UltimateTicTacToeView = UltimateTicTacToeView;
});
}.call(this), "undefined" == typeof console) var console = {
log:function() {}
};

jQuery.eachWithContext = function(context, object, callback) {
for (var i = 0, length = object.length, value = object[0]; length > i && callback.call(context, i, value) !== !1; value = object[++i]) ;
}, function($) {
$.chess = function(options, wrapper) {
this.settings = $.extend({}, $.chess.defaults, options), this.wrapper = wrapper, 
this.game = {
active_color:"w",
castling_availability:"KQkq",
en_passant_square:"-",
halfmove_clock:0,
fullmove_number:1,
halfmove_number:0,
header:[],
body:"",
moves:[],
annotations:[],
raw_annotations:[],
next_piece_id:64,
transitions:[],
board_direction:1
};
}, $.fn.chess = function(options) {
var chess = new $.chess(options, this[0]);
return chess.init(), chess;
}, $.extend($.chess, {
defaults:{
fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
square_size:43,
offsets:{
left:0,
top:0
},
board_element_selector:".chess-board",
json_annotations:!1
},
prototype:{
init:function() {
this.setUpBoard(this.parseFEN(this.settings.fen)), this.settings.pgn && this.parsePGN(this.settings.pgn), 
this.setUpBoard(this.parseFEN(this.settings.fen)), this.writeBoard();
},
boardElement:function() {
return $(this.wrapper).find(this.settings.board_element_selector);
},
boardData:function() {
return this._board;
},
setUpBoard:function(template) {
this._board = this.createBoardDataFromTemplate(template);
},
createBoardDataFromTemplate:function(template) {
var board = [];
return $.each(template, function(j, row) {
board[j] = [], $.each(row, function(k, val) {
board[j][k] = "-" != val ? {
id:k + 1 + 8 * j,
piece:template[j][k].toString()
} :"-";
});
}), board;
},
writeBoard:function() {
0 == this.boardElement().size() && $(this.wrapper).append('<div class="chess-board"></div>'), 
$.eachWithContext(this, this.boardData(), function(j, row) {
$.eachWithContext(this, row, function(k) {
var piece = this.boardData()[j][k], square = this.coord2Algebraic(j, k);
"-" != piece && this.addDomPiece(piece.id, piece.piece, square);
});
});
},
getDomPieceId:function(id) {
return this.wrapper.id + "_piece_" + id;
},
addDomPiece:function(id, piece, algebraic) {
var square = this.algebraic2Coord(algebraic);
this.game.board_direction < 0 && (square[0] = 7 - square[0], square[1] = 7 - square[1]);
var pos_top = this.settings.square_size * square[0] + this.settings.offsets.top, pos_left = this.settings.square_size * square[1] + this.settings.offsets.left, color = "b";
piece.toUpperCase() == piece && (color = "w"), this.boardElement().append('<div id="' + this.getDomPieceId(id) + '" class="' + color + piece + '"></div>'), 
$("#" + this.getDomPieceId(id)).css({
position:"absolute",
top:pos_top,
left:pos_left
});
},
moveDomPiece:function(id, move) {
var from = this.algebraic2Coord(move.from), to = this.algebraic2Coord(move.to), top = (parseInt(to[0]) - parseInt(from[0])) * this.settings.square_size * this.game.board_direction, left = (parseInt(to[1]) - parseInt(from[1])) * this.settings.square_size * this.game.board_direction;
$("#" + this.getDomPieceId(id)).animate({
top:"+=" + top + "px",
left:"+=" + left + "px"
}, "fast");
},
removeDomPiece:function(id) {
$("#" + this.getDomPieceId(id)).remove();
},
transitionTo:function(halfmove_number) {
for (;halfmove_number < this.game.halfmove_number; ) this.transitionBackward();
for (;halfmove_number > this.game.halfmove_number; ) this.transitionForward();
},
transitionForward:function() {
this.game.halfmove_number < this.game.transitions.length && (this.runTransitions(this.game.transitions[this.game.halfmove_number].forward), 
this.game.halfmove_number++);
},
transitionBackward:function() {
this.game.halfmove_number > 0 && (this.game.halfmove_number--, this.runTransitions(this.game.transitions[this.game.halfmove_number].backward));
},
runTransitions:function(transitions) {
$.eachWithContext(this, transitions, function(i, transition) {
var pieces = transition.split(":"), transition_type = pieces[0], id = pieces[1];
switch (transition_type) {
case "r":
this.removeDomPiece(id);
break;

case "m":
this.moveDomPiece(id, {
from:pieces[2],
to:pieces[3]
});
break;

case "a":
this.addDomPiece(id, pieces[2], pieces[3]);
}
});
},
clearBoard:function() {
this.boardElement().empty();
},
flipBoard:function() {
var board_length = 7 * this.settings.square_size, offsets = this.settings.offsets;
this.boardElement().children().each(function() {
var top_val = parseInt($(this).css("top")) - offsets.top, left_val = parseInt($(this).css("left")) - offsets.left;
$(this).css("top", board_length - top_val + offsets.top), $(this).css("left", board_length - left_val + offsets.left);
}), this.game.board_direction *= -1;
},
parseFEN:function(fen) {
for (var new_board = [], fen_parts = fen.replace(/^\s*/, "").replace(/\s*$/, "").split(/\/|\s/), j = 0; 8 > j; j++) {
new_board[j] = [];
for (var row = fen_parts[j].replace(/\d/g, this.replaceNumberWithDashes), k = 0; 8 > k; k++) new_board[j][k] = row.substr(k, 1);
}
return new_board;
},
validateFEN:function(fen) {
var pattern = /\s*([rnbqkpRNBQKP12345678]+\/){7}([rnbqkpRNBQKP12345678]+)\s[bw-]\s(([kqKQ]{1,4})|(-))\s(([a-h][1-8])|(-))\s\d+\s\d+\s*/;
return pattern.test(fen);
},
cantMoveFromAbsolutePin:function(piece, src_square, dst_square) {
var piece_char = piece.piece, player = piece_char == piece_char.toLowerCase() ? "b" :"w", result = this.findAbsolutePin(player, this.pieces.R.vectors, src_square, [ "R", "Q" ]);
if (null == result && (result = this.findAbsolutePin(player, this.pieces.B.vectors, src_square, [ "B", "Q" ])), 
null != result) {
var kings_square = (result[0], result[1]), pinning_pieces_square = result[2];
if (!this.inSquaresArray(dst_square, this.squaresBetweenEndPoints(kings_square, pinning_pieces_square))) return !0;
}
return !1;
},
inSquaresArray:function(square, squares) {
for (var i = 0; i < squares.length; i++) if (squares[i] == square) return !0;
return !1;
},
squaresBetweenEndPoints:function(s, e) {
var start = this.algebraic2Coord(s), end = this.algebraic2Coord(e), tmp = start, squares = [];
for (squares.push(this.coord2Algebraic(start[0], start[1])); tmp[0] != end[0] || tmp[1] != end[1]; ) tmp[0] < end[0] && (tmp[0] += 1), 
tmp[0] > end[0] && (tmp[0] -= 1), tmp[1] < end[1] && (tmp[1] += 1), tmp[1] > end[1] && (tmp[1] -= 1), 
squares.push(this.coord2Algebraic(tmp[0], tmp[1]));
return squares;
},
findAbsolutePin:function(player, vectors, src_square, pieces_that_can_pin_on_this_vector) {
var result = this.findVectorToKing(player, vectors, src_square);
if (null != result) {
var vector = result[0], kings_square = result[1], flipped_vector = this.flipVector(vector), result = this.firstPieceFromSourceAndVector(src_square, flipped_vector, flipped_vector.limit);
if (null != result) for (var pinning_pieces_square = result[1], i = 0; i < pieces_that_can_pin_on_this_vector.length; i++) {
var pinning_piece = "w" == player ? pieces_that_can_pin_on_this_vector[i].toLowerCase() :pieces_that_can_pin_on_this_vector[i].toUpperCase();
if (result[0].piece == pinning_piece) return [ vector, kings_square, pinning_pieces_square ];
}
}
return null;
},
findVectorToKing:function(player, vectors, src_square) {
for (var king = "w" == player ? "K" :"k", i = 0; i < vectors.length; i++) {
var vector = vectors[i], result = this.firstPieceFromSourceAndVector(src_square, vector, vector.limit);
if (null != result && result[0].piece == king) return [ vector, result[1] ];
}
return null;
},
findMoveSource:function(piece, src_file, src_rank, dst_file, dst_rank, player) {
if (src_file && src_rank) return src_file + src_rank;
var dst_square = dst_file + dst_rank, target_piece = "w" == player ? piece :piece.toLowerCase();
target_piece = target_piece.toString();
for (var i = 0; i < this.pieces[piece].vectors.length; i++) for (var vector = this.pieces[piece].vectors[i], size = 1; size <= vector.limit; size++) {
var result = this.pieceFromSourceAndVector(dst_square, vector, size);
if (null == result) break;
if ("-" != result[0]) {
if (result[0].piece != target_piece) break;
if (this.cantMoveFromAbsolutePin(result[0], result[1], dst_square)) break;
if (src_file) {
if (result[1].substr(0, 1).toString() == src_file) return result[1];
} else {
if (!src_rank) return result[1];
if (result[1].substr(1, 1).toString() == src_rank) return result[1];
}
}
}
},
findPawnMoveSource:function(dst_file, dst_rank, player) {
for (var dst_square = dst_file + dst_rank, target_piece = "w" == player ? "P" :"p", direction = "w" == player ? -1 :1, vector = {
x:0,
y:direction,
limit:2
}, size = 1; size <= vector.limit; size++) {
var result = this.pieceFromSourceAndVector(dst_square, vector, size);
if (null == result) break;
if (result[0].piece == target_piece) return result[1];
if ("-" != result[0]) break;
}
},
pieceFromSourceAndVector:function(source, vector, limit) {
var source_coords = this.algebraic2Coord(source), row = source_coords[0] - vector.y * limit, col = source_coords[1] - vector.x * limit;
return row >= 8 || 0 > row || col >= 8 || 0 > col ? null :piece = [ this._board[row][col], this.coord2Algebraic(row, col) ];
},
firstPieceFromSourceAndVector:function(source, vector, limit) {
for (var i = 1; limit >= i; i++) {
if (piece = this.pieceFromSourceAndVector(source, vector, i), null == piece) return null;
if ("-" != piece[0]) return piece;
}
return null;
},
pieceAt:function(algebraic) {
var square = this.algebraic2Coord(algebraic);
return this._board[square[0]][square[1]];
},
movePiece2:function(from, to) {
move = new Object(), move.from = this.coord2Algebraic(parseInt(from[0]), parseInt(from[1])), 
move.to = this.coord2Algebraic(parseInt(to[0]), parseInt(to[1]));
var piece = this.pieceAt(move.from);
this.pieceAt(move.to).piece && this.removePiece2(move.to), this._board[to[0]][to[1]] = this._board[from[0]][from[1]], 
this._board[from[0]][from[1]] = "-", this.runTransitions([ "m:" + piece.id + ":" + move.from + ":" + move.to ]);
},
movePiece:function(num, move) {
var from = this.algebraic2Coord(move.from), to = this.algebraic2Coord(move.to), piece = this.pieceAt(move.from);
this.pieceAt(move.to).piece && this.removePiece(num, move.to), this._board[to[0]][to[1]] = this._board[from[0]][from[1]], 
this._board[from[0]][from[1]] = "-", this.saveTransition({
type:"m",
num:num,
dom_id:piece.id,
from:move.from,
to:move.to
});
},
removePiece2:function(algebraic) {
var piece = this.pieceAt(algebraic), square = this.algebraic2Coord(algebraic);
this._board[square[0]][square[1]] = "-", this.runTransitions([ "r:" + piece.id ]);
},
removePiece:function(num, algebraic) {
var piece = this.pieceAt(algebraic), square = this.algebraic2Coord(algebraic);
this._board[square[0]][square[1]] = "-", this.saveTransition({
type:"r",
num:num,
dom_id:piece.id,
piece:piece.piece,
from:algebraic
});
},
addPiece:function(num, piece_char, algebraic) {
var square = this.algebraic2Coord(algebraic), id = this.getNextPieceId();
this._board[square[0]][square[1]] = {
id:id,
piece:piece_char
}, this.saveTransition({
type:"a",
num:num,
dom_id:id,
to:algebraic,
piece:piece_char
});
},
saveTransition:function(options) {
var forward = null, backward = null, num = options.num;
"a" == options.type ? (forward = [ "a:" + options.dom_id + ":" + options.piece + ":" + options.to ], 
backward = [ "r:" + options.dom_id ]) :"m" == options.type ? (forward = [ "m:" + options.dom_id + ":" + options.from + ":" + options.to ], 
backward = [ "m:" + options.dom_id + ":" + options.to + ":" + options.from ]) :"r" == options.type && (forward = [ "r:" + options.dom_id ], 
backward = [ "a:" + options.dom_id + ":" + options.piece + ":" + options.from ]), 
null == this.game.transitions[num] ? this.game.transitions[num] = {
forward:forward,
backward:backward
} :(this.game.transitions[num].forward = this.game.transitions[num].forward.concat(forward), 
this.game.transitions[num].backward = backward.concat(this.game.transitions[num].backward));
},
getNextPieceId:function() {
return ++this.game.next_piece_id;
},
getMove:function(n) {
var n = "undefined" == typeof n ? this.game.halfmove_number :n;
return this.game.moves[n - 1];
},
getFormattedMove:function(n) {
var n = "undefined" == typeof n ? this.game.halfmove_number :n, f = Math.ceil(n / 2), hellip = n % 2 == 0 ? "... " :"";
return f + ". " + hellip + this.getMove(n);
},
algebraic2Coord:function(algebraic) {
return [ this.rank2Row(algebraic.substr(1, 1)), this.file2Col(algebraic.substr(0, 1)) ];
},
coord2Algebraic:function(row, col) {
return this.col2File(col) + this.row2Rank(row);
},
rank2Row:function(rank) {
return 8 - parseInt(rank);
},
file2Col:function(file) {
return file.charCodeAt(0) - "a".charCodeAt(0);
},
row2Rank:function(row) {
return 8 - row + "";
},
col2File:function(col) {
return String.fromCharCode(col + "a".charCodeAt(0));
},
flipVector:function(v) {
return {
x:-1 * v.x,
y:-1 * v.y,
limit:v.limit
};
},
replaceNumberWithDashes:function(str) {
for (var num_spaces = parseInt(str), new_str = "", i = 0; num_spaces > i; i++) new_str += "-";
return new_str;
},
pluckAnnotation:function(str) {
this.game.raw_annotations = this.game.raw_annotations || [];
var ann_num = this.game.raw_annotations.length, annot = str.substring(1, str.length - 1);
return annot = annot.replace(/\\\{/g, "{"), annot = annot.replace(/\\\}/g, "}"), 
this.settings.json_annotations && eval("annot = " + annot), this.game.raw_annotations.push(annot), 
"annotation-" + ann_num;
},
annotation:function() {
var default_value = this.settings.json_annotations ? [] :"";
return this.game.annotations[this.game.halfmove_number] || default_value;
},
addAnnotation:function(annot) {
var current_annotations = this.annotation();
"string" == typeof current_annotations ? current_annotations += ", " + annot :current_annotations.push(annot), 
this.game.annotations[this.game.halfmove_number] = current_annotations;
},
debugBoard:function() {
$.eachWithContext(this, this.boardData(), function(j, row) {
$.eachWithContext(this, row, function() {});
});
},
patterns:{
castle_kingside:/^O-O/,
castle_queenside:/^O-O-O/,
piece_move:/^([BKNQR])/,
rank_and_file_given:/^([BKNQR])([a-h])([1-8])x?([a-h])([1-8])/,
file_given:/^([BKNQR])([a-h])x?([a-h])([1-8])/,
rank_given:/^([BKNQR])([1-8])x?([a-h])([1-8])/,
nothing_given:/^([BKNQR])x?([a-h])([1-8])/,
pawn_move:/^([a-h])([1-8])/,
pawn_capture:/^([a-h])x([a-h])([1-8])/,
pawn_queen:/=([BNQR])/
},
pieces:{
R:{
vectors:[ {
x:0,
y:1,
limit:8
}, {
x:1,
y:0,
limit:8
}, {
x:0,
y:-1,
limit:8
}, {
x:-1,
y:0,
limit:8
} ]
},
N:{
vectors:[ {
x:1,
y:2,
limit:1
}, {
x:2,
y:1,
limit:1
}, {
x:2,
y:-1,
limit:1
}, {
x:1,
y:-2,
limit:1
}, {
x:-1,
y:-2,
limit:1
}, {
x:-2,
y:-1,
limit:1
}, {
x:-2,
y:1,
limit:1
}, {
x:-1,
y:2,
limit:1
} ]
},
B:{
vectors:[ {
x:1,
y:1,
limit:8
}, {
x:1,
y:-1,
limit:8
}, {
x:-1,
y:-1,
limit:8
}, {
x:-1,
y:1,
limit:8
} ]
},
Q:{
vectors:[ {
x:0,
y:1,
limit:8
}, {
x:1,
y:0,
limit:8
}, {
x:0,
y:-1,
limit:8
}, {
x:-1,
y:0,
limit:8
}, {
x:1,
y:1,
limit:8
}, {
x:1,
y:-1,
limit:8
}, {
x:-1,
y:-1,
limit:8
}, {
x:-1,
y:1,
limit:8
} ]
},
K:{
vectors:[ {
x:0,
y:1,
limit:1
}, {
x:1,
y:0,
limit:1
}, {
x:0,
y:-1,
limit:1
}, {
x:-1,
y:0,
limit:1
}, {
x:1,
y:1,
limit:1
}, {
x:1,
y:-1,
limit:1
}, {
x:-1,
y:-1,
limit:1
}, {
x:-1,
y:1,
limit:1
} ]
}
}
}
});
}(jQuery);