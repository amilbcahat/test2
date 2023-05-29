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
return 0 === that.$(".js-tab-content").html().length ? that.loadFirstGame() :void 0;
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
}), this.setSocialComponent(), this.setDownloadLink(), this.$(".js-tab-content").html("<div class='content game-tab'><div id='game-grid-" + tab_id + "' class='clearfix' style='clear: both;'></div></div>"), 
this.game_view.setElement(this.$("#game-grid-" + tab_id)).render(), this.add_subview(this.game_view), 
$(this.el).find("div.controls").show(), $(this.el).find(".js-tab-content").show(), 
$(this.el).find("div.waiting").hide(), $(this.el).find(".js-tab-content div.content").addClass("active");
}, GameContainerView.prototype.shiftTab = function(e) {
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :($(e.currentTarget).parent().parent().find("li").removeClass("active"), 
$(e.currentTarget).parent().addClass("active"), this.$(".js-tab-content .content").unbind().die().remove(), 
this.$(".js-tab-content").html(HR.appController.viewLoader(64)), this.renderTab(parseInt($(e.currentTarget).parent().attr("game-id")), parseInt($(e.currentTarget).parent().attr("tab-id"))));
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
error = _error, this.semaphore = 4, this.getJSON(this.model.get("" + key_prefix + "stdin"), "codechecker_stdin"), 
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
return that = this, $.getJSON(url, function(data) {
var get_siblings;
return that[binding] = data.payload, get_siblings = function(data) {
return data.next ? (that.semaphore += 1, $.getJSON("https://" + url.split("/")[2] + "/" + data.next, function(data) {
return that[binding] = that[binding].concat(data.payload), that.semaphore -= 1, 
get_siblings(data);
})) :void 0;
}, get_siblings(data), that.semaphore -= 1, 0 === that.semaphore ? (that.correct_moves(), 
that.trigger("fetched-json-data")) :void 0;
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
}, 300)), next_move = this.move ? this.move :0, this.playMove(next_move, this.model), 
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
}, GameView.prototype.unSetInfoMessage = function() {
return _.isFunction(this.parent.unSetInfoMessage) ? this.parent.unSetInfoMessage() :void 0;
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
tron:HR.TronView,
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
backgammon:HR.BackGammonView,
game2048:HR.Game2048View
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
pacmandfs:200,
pacmanbfs:200,
"pacman-ucs":200,
"pacman-astar":200,
pacman1p:100,
amazons10:1200,
uttt:1200,
snake:300
};
}, GameView.prototype.custom_steps = function() {
var return_value;
return return_value = {
prisonerdilemma:2,
discretebidding:2,
copsrobber:2
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
"cow-and-bull":1,
game2048:1
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
backgammon:!0,
game2048:!0,
pacmandfs:!0,
pacmanbfs:!0,
"pacman-ucs":!0,
"pacman-astar":!0,
battleship1p:!0,
battleship:!0,
"n-puzzle":!0,
discretebidding:!0,
clickomania:!0,
domineering:!0,
mancala6:!0,
tictactoe:!0,
tron:!0,
pipelayer:!0,
hip:!0,
copsrobber:!0,
lightsout:!0,
conway:!0,
checkers:!0,
"maze-escape":!0,
antichess:!0
};
}, GameView.prototype.correct_moves = function() {
var challenge_id, corrected_moves, move_segments, moves, pacman_ids, pacman_move, pacman_moves, search_move, search_moves, stderr, stdin, stdout, _i, _j, _len, _len1;
if (pacman_ids = [ 459, 460, 536, 537 ], challenge_id = this.model.get("challenge_id"), 
-1 !== pacman_ids.indexOf(challenge_id)) {
if (moves = this.codechecker_moves, stdin = this.codechecker_stdin, stdout = this.codechecker_stdout, 
stderr = this.codechecker_stderr, void 0 === moves[0]) return;
if ("CODECHECKER_INVALID_MOVE_ERROR" === moves[0]) return;
for (move_segments = [], move_segments = moves[0].split(":"), corrected_moves = [], 
corrected_moves[0] = "" + move_segments[0] + "," + move_segments[1], search_moves = [], 
search_moves = move_segments[2].split(","), _i = 0, _len = search_moves.length; _len > _i; _i++) search_move = search_moves[_i], 
corrected_moves.push("SEARCH " + search_move), stdin.push(stdin[0]), stdout.push(stdout[0]), 
stderr.push(stderr[0]);
for (pacman_moves = [], pacman_moves = move_segments[3].split(","), _j = 0, _len1 = pacman_moves.length; _len1 > _j; _j++) pacman_move = pacman_moves[_j], 
corrected_moves.push("GO " + pacman_move), stdin.push(stdin[0]), stdout.push(stdout[0]), 
stderr.push(stderr[0]);
return this.codechecker_moves = corrected_moves, this.codechecker_stdin = stdin, 
this.codechecker_stdout = stdout, this.codechecker_stderr = stderr;
}
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
}, this), html += "</tr>", html += "<tr class='avatar text-center'>", _.each(hackers, function(hacker, index) {
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
AntiChessView.prototype.className = "antichess-view", AntiChessView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0, this.stdin = this.parent.codechecker_stdin;
}, AntiChessView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, AntiChessView.prototype.playMove = function(i, moves_array) {
var columns, move_string, player, prev_x, prev_y, rows, x, y, _ref;
return rows = [ 8, 7, 6, 5, 4, 3, 2, 1 ], columns = [ "a", "b", "c", "d", "e", "f", "g", "h" ], 
i < this.current_move && this.parent.unSetInfoMessage(), void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (0 === i && (this.chessBoard = new ChessBoard("chess-board-wrapper"), 
this.chessBoard.start()), rows = this.stdin[i].split("\n").join("/").split(".").join("1").slice(2, -1), 
this.chessBoard.position(rows), _ref = moves_array[i].split(" "), prev_x = _ref[0], 
prev_y = _ref[1], x = _ref[2], y = _ref[3], player = _ref[4], move_string = "" + columns[prev_y] + rows[prev_x] + "-" + columns[y] + rows[x], 
this.chessBoard.move(move_string), this.current_move = i, this) :void 0;
}, AntiChessView.prototype.stopGame = function() {
return this.parent.unSetInfoMessage(), this.current_move = 0;
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
for (bar = [], bar[0] = parseInt(data[27]), bar[1] = parseInt(data[28]), i = _n = 0; 1 >= _n; i = ++_n) if ($(this.el).find(".game-grid").find("td.bar-" + i).html(""), 
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
BattleshipSinglePlayerView.prototype.className = "battleship-1p-view", BattleshipSinglePlayerView.prototype.initialize = function() {
return this.current_move = 0;
}, BattleshipSinglePlayerView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
rows:10,
columns:10
})), this;
}, BattleshipSinglePlayerView.prototype.playMove = function(i, moves_array) {
var fire_col, fire_row, img, mine_img, move, selected, ships, target, _ref, _ref1;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return 0 === i ? (selected = this.$(".battleship-col-fire"), 
selected.removeClass("battleship-col-fire"), move = moves_array[i].split(":"), ships = move.slice(1), 
_.each(ships, function(_this) {
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
}(this))) :i - this.current_move === 1 ? (mine_img = "<img src='/assets/games/battleship-mine.png' class='battleship-mine'>", 
_ref = moves_array[i].split(" "), fire_row = _ref[0], fire_col = _ref[1], target = this.$("[data-row=" + fire_row + "][data-column=" + fire_col + "]"), 
target.addClass("battleship-col-fire"), target.hasClass("battleship-col-hit") && target.append(mine_img)) :this.current_move - i === 1 && (_ref1 = moves_array[this.current_move].split(" "), 
fire_row = _ref1[0], fire_col = _ref1[1], target = this.$("[data-row=" + fire_row + "][data-column=" + fire_col + "]"), 
target.removeClass("battleship-col-fire"), img = target.find(".battleship-mine"), 
img.remove()), this.current_move = i, this;
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
BattleshipTwoPlayerView.prototype.className = "battleship-2p-view", BattleshipTwoPlayerView.prototype.initialize = function() {
return this.current_move = 0;
}, BattleshipTwoPlayerView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
rows:10,
columns:10
})), this;
}, BattleshipTwoPlayerView.prototype.playMove = function(i, moves_array) {
var fire_col, fire_row, grid, img, mine_img, move, selected, ships, target, _ref, _ref1;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return 2 > i ? (grid = this.$(".battleship-grid-" + i % 2), 
selected = this.$(".battleship-col-fire"), selected.removeClass("battleship-col-fire"), 
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
}(this))) :i - this.current_move === 1 ? (grid = this.$(".battleship-grid-" + (i + 1) % 2), 
mine_img = "<img src='/assets/games/battleship-mine.png' class='battleship-mine'>", 
_ref = moves_array[i].split(" "), fire_row = _ref[0], fire_col = _ref[1], target = grid.find("[data-row=" + fire_row + "][data-column=" + fire_col + "]"), 
target.addClass("battleship-col-fire"), target.hasClass("battleship-col-hit") && target.append(mine_img)) :this.current_move - i === 1 && (grid = this.$(".battleship-grid-" + (this.current_move + 1) % 2), 
_ref1 = moves_array[this.current_move].split(" "), fire_row = _ref1[0], fire_col = _ref1[1], 
target = grid.find("[data-row=" + fire_row + "][data-column=" + fire_col + "]"), 
target.removeClass("battleship-col-fire"), img = target.find(".battleship-mine"), 
img.remove()), this.current_move = i, this;
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
BiddingTicTacToeView.prototype.className = "biddingtictactoe-view", BiddingTicTacToeView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, BiddingTicTacToeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, BiddingTicTacToeView.prototype.playMove = function(i, moves_array) {
var bid_won, current_symbol, j, move, player1_bid, player1_left, player2_bid, player2_left, type, _results;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
for (i < this.current_move && this.parent.unSetInfoMessage(), this.current_move = i, 
move = moves_array[i].split(" "), type = move[0], "b1" === type ? (player1_left = move[1], 
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
}, BiddingTicTacToeView.prototype.stopGame = function() {
return this.current_move = 0, this.parent.unSetInfoMessage();
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
CheckersView.prototype.className = "checkers-view", CheckersView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, CheckersView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, CheckersView.prototype.playMove = function(i, moves_array) {
return void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (this.rows = moves_array[i].split("\n"), 
i < this.current_move && this.parent.unSetInfoMessage(), this.clearGrid(), this.current_move = i, 
this) :void 0;
}, CheckersView.prototype.clearGrid = function() {
var column, grid, row, style, _i, _results;
for (_results = [], row = _i = 0; 7 >= _i; row = ++_i) _results.push(function() {
var _j, _results1;
for (_results1 = [], column = _j = 0; 7 >= _j; column = ++_j) {
switch (grid = this.$("#" + row + "-" + column), style = "empty-block", this.rows[row][column]) {
case "b":
style = "black-block";
break;

case "w":
style = "white-block";
break;

case "B":
style = "doubleblack-block";
break;

case "W":
style = "doublewhite-block";
break;

default:
style = "empty-block";
}
_results1.push(grid.html("<div class='" + style + "'></div>"));
}
return _results1;
}.call(this));
return _results;
}, CheckersView.prototype.stopGame = function() {
return this.current_move = 0, this.parent.unSetInfoMessage();
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
ConwaysGameOfLifeView.prototype.className = "conwaysgameoflife-view", ConwaysGameOfLifeView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, ConwaysGameOfLifeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, ConwaysGameOfLifeView.prototype.playMove = function(i, moves_array) {
var id, j, move, move_set, player, player_images, pointX, pointY, prev_move, prev_type, type, _i, _j, _len, _ref;
if (player_images = {
W:"white",
B:"black",
A:"#ccc"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (move = moves_array[i].split(" "), type = move[0], prev_move = moves_array[this.current_move].split(" "), 
prev_type = prev_move[0], i < this.current_move && this.parent.unSetInfoMessage(), 
"I" === type) if (i >= this.current_move) pointX = move[1], pointY = move[2], player = move[3], 
id = "#" + pointX + "-" + pointY, this.$(id).css("background-color", player_images[player]); else if ("I" === prev_type) pointX = prev_move[1], 
pointY = prev_move[2], id = "#" + pointX + "-" + pointY, this.$(id).css("background-color", player_images.A); else for (_ref = moves_array.slice(0, +i + 1 || 9e9), 
_i = 0, _len = _ref.length; _len > _i; _i++) move_set = _ref[_i], move = move_set.split(" "), 
pointX = move[1], pointY = move[2], player = move[3], id = "#" + pointX + "-" + pointY, 
this.$(id).css("background-color", player_images.A), this.$(id).css("background-color", player_images[player]); else for (j = _j = 0; 840 >= _j; j = ++_j) pointX = move[1 + 3 * j], 
pointY = move[1 + 3 * j + 1], player = move[1 + 3 * j + 2], id = "#" + pointX + "-" + pointY, 
this.$(id).css("background-color", player_images[player]);
return this.current_move = i, this;
}
}, ConwaysGameOfLifeView.prototype.stopGame = function() {
return this.current_move = 0, this.parent.unSetInfoMessage();
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
CopsAndRobbersView.prototype.className = "copsandrobbers-view", CopsAndRobbersView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, CopsAndRobbersView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, CopsAndRobbersView.prototype.playMove = function(i, moves_array) {
var cop1X, cop1Y, cop2X, cop2Y, cop3X, cop3Y, j, move, player, player_images, robberX, robberY, _i;
if (player_images = {
C:"cops",
R:"robber"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] && void 0 !== moves_array[i + 1] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i + 1] && i % 2 !== 1) {
for (this.current_move > i && this.parent.unSetInfoMessage(), j = _i = 0; 1 >= _i; j = ++_i) if (move = moves_array[i + j].split(" "), 
player = move[0], "C" === player) cop1X = move[1], cop1Y = move[2], cop2X = move[3], 
cop2Y = move[4], cop3X = move[5], cop3Y = move[6], this.$(".cops").removeClass("cops"), 
this.$(".game-grid").find("td." + cop1X + "-" + cop1Y).addClass("cops").removeClass("robber"), 
this.$(".game-grid").find("td." + cop2X + "-" + cop2Y).addClass("cops").removeClass("robber"), 
this.$(".game-grid").find("td." + cop3X + "-" + cop3Y).addClass("cops").removeClass("robber"); else {
if (move[3] && "done" === move[3] && "C" === move[4]) return $(".robber").removeClass("robber"), 
this;
robberX = move[1], robberY = move[2], this.$(".robber").removeClass("robber"), this.$(".game-grid").find("td." + robberX + "-" + robberY).addClass("robber").removeClass("cops");
}
return this.current_move = i, this;
}
}, CopsAndRobbersView.prototype.stopGame = function() {
return this.current_move = 0, this.parent.unSetInfoMessage();
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
DiscreteBiddingView.prototype.className = "discretebidding-view", DiscreteBiddingView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, DiscreteBiddingView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.$(".player1_username").html(this.model.attributes.actors[0].hacker_username), 
this.$(".player2_username").html(this.model.attributes.actors[1].hacker_username), 
this.$(".playgame-row").hide(), this.$(".translucent").removeClass("translucent"), 
this.$(".player1_balance").html(100), this.$(".player2_balance").html(100), this.$(".game-message").hide(), 
this.$(".play-again-button").hide(), this;
}, DiscreteBiddingView.prototype.playMove = function(i, moves_array) {
var bid_num, blue, bulb_current_position, bulb_future_position, game, grey, player1_balance, player1_bid, player1_bounty, player1_move, player1_remaining, player1_rewinding_bid, player1_rewinding_bounty, player1_rewinding_move, player1_rewinding_won, player1_trophy, player1_won, player2_balance, player2_bid, player2_bounty, player2_move, player2_remaining, player2_rewinding_bid, player2_rewinding_bounty, player2_rewinding_move, player2_rewinding_won, player2_trophy, player2_won;
return 0 === i && (window.discrete_bidding_draw_adv = 1), i % 2 !== 1 && void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] && (i += 1, 
moves_array[i]) ? (game = moves_array, bid_num = Math.floor(i / 2) + 1, this.$(".bid-number").html(bid_num), 
this.current_move < i ? (player1_move = game[i - 1], player2_move = game[i]) :(player1_move = game[i - 1], 
player2_move = game[i]), player1_bid = player1_move ? player1_move.split(" ")[0] :0, 
player2_bid = player2_move ? player2_move.split(" ")[0] :0, "" === player1_bid && (player1_bid = 0), 
"" === player2_bid && (player2_bid = 0), player1_bid = parseInt(player1_bid), player2_bid = parseInt(player2_bid), 
player1_trophy = "", player2_trophy = "", player1_bounty = 0, player2_bounty = 0, 
player1_won = !1, player2_won = !1, player1_balance = parseInt(this.$(".player1_balance").html()), 
player2_balance = parseInt(this.$(".player2_balance").html()), player1_bid > player2_bid ? (player1_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player1_bounty = player1_bid, player1_won = !0) :player2_bid > player1_bid ? (player2_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player2_bounty = player2_bid, player2_won = !0) :player1_bid === player2_bid && (1 === window.discrete_bidding_draw_adv ? (this.current_move < i && (window.discrete_bidding_draw_adv = 2), 
player1_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player1_bounty = player1_bid, player1_won = !0) :(this.current_move < i && (window.discrete_bidding_draw_adv = 1), 
player2_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player2_bounty = player2_bid, player2_won = !0)), this.current_move < i ? (player1_remaining = player1_balance - player1_bounty, 
player2_remaining = player2_balance - player2_bounty) :(this.parent.unSetInfoMessage(), 
player1_rewinding_bounty = 0, player2_rewinding_bounty = 0, player1_rewinding_won = !1, 
player2_rewinding_won = !1, player1_rewinding_move = game[this.current_move - 1], 
player2_rewinding_move = game[this.current_move], player1_rewinding_bid = player1_rewinding_move ? player1_rewinding_move.split(" ")[0] :0, 
player2_rewinding_bid = player2_rewinding_move ? player2_rewinding_move.split(" ")[0] :0, 
"" === player1_rewinding_bid && (player1_rewinding_bid = 0), "" === player2_rewinding_bid && (player2_rewinding_bid = 0), 
player1_rewinding_bid = parseInt(player1_rewinding_bid), player2_rewinding_bid = parseInt(player2_rewinding_bid), 
player1_rewinding_bid > player2_rewinding_bid ? (player1_rewinding_bounty = player1_rewinding_bid, 
player1_rewinding_won = !0) :player2_rewinding_bid > player1_rewinding_bid ? (player2_rewinding_bounty = player2_rewinding_bid, 
player2_rewinding_won = !0) :player1_rewinding_bid === player2_rewinding_bid && (1 === window.discrete_bidding_draw_adv ? (window.discrete_bidding_draw_adv = 2, 
player2_rewinding_bounty = player2_rewinding_bid, player2_rewinding_won = !0) :(window.discrete_bidding_draw_adv = 1, 
player1_rewinding_bounty = player1_rewinding_bid, player1_rewinding_won = !0)), 
player1_remaining = player1_balance + player1_rewinding_bounty, player2_remaining = player2_balance + player2_rewinding_bounty), 
0 > player1_remaining ? (player2_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player2_won = !0, player1_trophy = "", player1_won = !1) :0 > player2_remaining && (player1_trophy = '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>', 
player1_won = !0, player2_trophy = "", player2_won = !1), this.$(".player1_current_bid").html("" + player1_bid + " " + player1_trophy), 
this.$(".player2_current_bid").html("" + player2_bid + " " + player2_trophy), bulb_current_position = parseInt(this.$(".bulb.win").attr("data-id")), 
bulb_future_position = bulb_current_position, this.current_move < i ? player1_won ? bulb_future_position = bulb_current_position - 1 :player2_won && (bulb_future_position = bulb_current_position + 1) :player1_rewinding_won ? bulb_future_position = bulb_current_position + 1 :player2_rewinding_won && (bulb_future_position = bulb_current_position - 1), 
bulb_future_position !== bulb_current_position && (grey = "/assets/bidding-blank.png", 
blue = "/assets/bidding-bottle.png", this.$(".bulbs").find("img[data-id=" + bulb_future_position + "]").attr("src", blue).addClass("win"), 
this.$(".bulbs").find("img[data-id=" + bulb_current_position + "]").attr("src", grey).removeClass("win")), 
this.$(".player1_balance").html(player1_remaining), this.$(".player2_balance").html(player2_remaining), 
0 === i && this.$("table.game-result tbody").html(""), this.$("table.game-result tbody").append("<tr><td class='m'>" + bid_num + "</td><td class='m'>" + player1_bid + " " + player1_trophy + "</td><td class='m'>" + player2_bid + " " + player2_trophy + "</td></tr>"), 
this.current_move = i, this) :void 0;
}, DiscreteBiddingView.prototype.stopGame = function() {
return this.current_move = 0;
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
DomineeringView.prototype.className = "domineering-view", DomineeringView.prototype.initialize = function(options) {
return this.current_move = 0, this.parent = options.parent;
}, DomineeringView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, DomineeringView.prototype.playMove = function(i, moves_array) {
var color, move, player_cord, player_i, player_id, player_j, that, vertical;
if ("CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return this.current_move <= i ? move = moves_array[i] :(this.parent.unSetInfoMessage(), 
move = moves_array[this.current_move]), player_cord = move.slice(0, move.length - 2), 
player_id = move.slice(move.length - 1), that = this, "1" === player_id ? (vertical = !0, 
color = "red") :"2" === player_id && (vertical = !1, color = "blue"), player_i = parseInt(player_cord.split(" ")[0]), 
player_j = parseInt(player_cord.split(" ")[1]), _.isNaN(player_i) || _.isNaN(player_j) || (this.current_move <= i ? (that.$("." + player_i + "-" + player_j).css("background-color", color), 
vertical ? that.$("." + (player_i + 1) + "-" + player_j).css("background-color", color) :that.$("." + player_i + "-" + (player_j + 1)).css("background-color", color)) :(that.$("." + player_i + "-" + player_j).css("background-color", "inherit"), 
vertical ? that.$("." + (player_i + 1) + "-" + player_j).css("background-color", "inherit") :that.$("." + player_i + "-" + (player_j + 1)).css("background-color", "inherit"))), 
this.current_move = i, this;
}, DomineeringView.prototype.stopGame = function() {
return this.current_move = 0;
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
var Game2048View, HR, _ref;
return Game2048View = function(_super) {
function Game2048View() {
return Game2048View.__super__.constructor.apply(this, arguments);
}
return __extends(Game2048View, _super), Game2048View.prototype.template = "games/game2048", 
Game2048View.prototype.className = "game2048-view", Game2048View.prototype.initialize = function(options) {
var i, _i, _results;
for (window.gameView = this, this.vectorArray = [ {
x:-1,
y:0
}, {
x:0,
y:1
}, {
x:1,
y:0
}, {
x:0,
y:-1
} ], this.board = [], this.parent = options.parent, _results = [], i = _i = 1; 4 >= _i; i = ++_i) _results.push(this.board.push([ 0, 0, 0, 0 ]));
return _results;
}, Game2048View.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, Game2048View.prototype.getClasses = function() {
var i, tile, _i;
for (tile = "", i = _i = 1; 11 >= _i; i = ++_i) tile += "tile-" + Math.pow(2, i) + " ";
return tile;
}, Game2048View.prototype.moveTile = function(x1, y1, x2, y2) {
var tile;
return tile = this.$("[data-row=" + x1 + "][data-col=" + y1 + "]"), tile.css({
left:"" + 77 * y2 + "px",
top:"" + 80 * x2 + "px"
}), tile.attr("data-row", "-" + x2), tile.attr("data-col", "-" + y2);
}, Game2048View.prototype.syncTile = function(x, y) {
var html;
return html = "&nbsp;", this.$("[data-row=" + x + "][data-col=" + y + "]").removeClass(this.getClasses()).html(html).css({
left:"" + 77 * y + "px",
top:"" + 80 * x + "px"
}), this.board[x][y] > 0 ? this.$("[data-row=" + x + "][data-col=" + y + "]").addClass("tile-" + this.board[x][y]).html(this.board[x][y]) :void 0;
}, Game2048View.prototype.cleanTiles = function() {
var x, y, _i, _results;
for (_results = [], x = _i = 0; 3 >= _i; x = ++_i) _results.push(function() {
var _j, _results1;
for (_results1 = [], y = _j = 0; 3 >= _j; y = ++_j) this.$("[data-row=-" + x + "][data-col=-" + y + "]").attr("data-row", x).attr("data-col", y).removeClass("tile-new"), 
0 === this.board[x][y] ? _results1.push(this.$("[data-row=" + x + "][data-col=" + y + "]").addClass("tile-new")) :_results1.push(void 0);
return _results1;
}.call(this));
return _results;
}, Game2048View.prototype.merge = function(direction) {
var border, borders, i, k, nx, ny, vector, x, y, _i, _j, _k, _len;
for (null == direction && (direction = 0), vector = this.vectorArray[direction], 
borders = [], i = _i = 0; 3 >= _i; i = ++_i) borders.push({
x:i,
y:-1
}), borders.push({
x:i,
y:4
}), borders.push({
x:-1,
y:i
}), borders.push({
x:4,
y:i
});
for (_j = 0, _len = borders.length; _len > _j; _j++) if (border = borders[_j], x = border.x - vector.x, 
y = border.y - vector.y, !(0 > x || 0 > y || x >= 4 || y >= 4)) for (k = _k = 1; 3 >= _k; k = ++_k) nx = x - vector.x, 
ny = y - vector.y, this.board[x][y] === this.board[nx][ny] && this.board[x][y] > 0 && (this.moveTile(nx, ny, x, y), 
this.board[nx][ny] = 0, this.board[x][y] *= 2, this.$("[data-row=-" + x + "][data-col=-" + y + "]").attr("data-row", nx).attr("data-col", ny), 
this.syncTile(nx, ny), this.syncTile(x, y)), x = nx, y = ny;
return this.cleanTiles();
}, Game2048View.prototype.gravity = function(direction) {
var i, j, k, new_pos, obstacle, pos, vector, x, y, _i, _j, _k, _l, _m, _n, _o, _p, _q, _results;
for (null == direction && (direction = 0), vector = this.vectorArray[direction], 
new_pos = Array(16), i = _i = 0; 3 >= _i; i = ++_i) for (j = _j = 0; 3 >= _j; j = ++_j) if (0 !== this.board[i][j]) {
for (x = i, y = j, obstacle = 0; x >= 0 && y >= 0 && 4 > x && 4 > y; ) 0 !== this.board[x][y] && (obstacle += 1), 
x += vector.x, y += vector.y;
for (k = _k = 1; obstacle >= 1 ? obstacle >= _k :_k >= obstacle; k = obstacle >= 1 ? ++_k :--_k) x -= vector.x, 
y -= vector.y;
new_pos[4 * i + j] = {
x:x,
y:y
};
}
for (this.temp = [], i = _l = 0; 3 >= _l; i = ++_l) this.temp.push([ 0, 0, 0, 0 ]);
for (i = _m = 0; 3 >= _m; i = ++_m) for (j = _n = 0; 3 >= _n; j = ++_n) pos = new_pos[4 * i + j], 
pos && (this.moveTile(i, j, pos.x, pos.y), this.temp[pos.x][pos.y] = this.board[i][j]);
for (this.board = this.temp, x = _o = 0; 3 >= _o; x = ++_o) for (y = _p = 0; 3 >= _p; y = ++_p) this.$("[data-row=" + x + "][data-col=" + y + "]").remove();
for (this.cleanTiles(), _results = [], x = _q = 0; 3 >= _q; x = ++_q) _results.push(function() {
var _r, _results1;
for (_results1 = [], y = _r = 0; 3 >= _r; y = ++_r) 0 === this.$("[data-row=" + x + "][data-col=" + y + "]").length ? (this.$(".tiles-container").append("<div class='game2048-cell' data-row=" + x + " data-col=" + y + "></div>"), 
_results1.push(this.syncTile(x, y))) :_results1.push(void 0);
return _results1;
}.call(this));
return _results;
}, Game2048View.prototype.parseInput = function(input) {
var rows, tiles;
return rows = input.split("\n"), tiles = [], _.each(rows, function(row) {
return tiles.push(row.split(" ").map(function(x) {
return parseInt(x);
}));
}), tiles;
}, Game2048View.prototype.displayBoard = function() {
var element, i, j, _i, _results;
for (_results = [], i = _i = 0; 3 >= _i; i = ++_i) _results.push(function() {
var _j, _results1;
for (_results1 = [], j = _j = 0; 3 >= _j; j = ++_j) element = this.$("[data-row=" + i + "][data-col=" + j + "]"), 
element.removeClass(this.getClasses), 0 !== this.board[i][j] ? _results1.push(element.html(this.board[i][j]).addClass("tile-" + this.board[i][j])) :_results1.push(this.$("[data-row=" + i + "][data-col=" + j + "]").html("&nbsp;"));
return _results1;
}.call(this));
return _results;
}, Game2048View.prototype.playMove = function(idx, moves_array) {
var dir, direction, line, new_pos, new_val, new_x, new_y, tiles;
if (void 0 !== moves_array[idx] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[idx]) return 0 === idx ? (tiles = this.parseInput(moves_array[0]), 
this.board = tiles, this.displayBoard()) :this.parent.pause ? (tiles = this.parseInput(this.parent.codechecker_stdin[idx]), 
this.board = tiles, this.displayBoard()) :(direction = moves_array[idx].split("\n")[0], 
dir = 0, "UP" === direction ? dir = 0 :"RIGHT" === direction ? dir = 1 :"DOWN" === direction ? dir = 2 :"LEFT" === direction && (dir = 3), 
this.gravity(dir), this.merge(dir), this.gravity(dir), line = moves_array[idx].split("\n")[1], 
line && (new_pos = parseInt(line.split(" ")[0]), new_x = Math.floor(new_pos / 4), 
new_y = new_pos % 4, new_val = parseInt(line.split(" ")[1]), this.board[new_x][new_y] = new_val, 
this.$("[data-row=" + new_x + "][data-col=" + new_y + "]").removeClass(this.getClasses()).addClass("tile-" + this.board[new_x][new_y] + " tile-new").html(this.board[new_x][new_y]))), 
this;
}, Game2048View;
}(window.HR.GameTemplateView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Game2048View = Game2048View;
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
GraphTraversalView.prototype.className = "graphtraversal-view", GraphTraversalView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, GraphTraversalView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, GraphTraversalView.prototype.playMove = function(i, moves_array) {
var column, move, move_type, prev_column, prev_row, previous_type, row, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (0 === i) this.initBoard(moves_array[0]), this.current_move = 0; else if (i - this.current_move === 1) _ref = moves_array[i].split(" "), 
move_type = _ref[0], row = _ref[1], column = _ref[2], row = parseInt(row), column = parseInt(column), 
"SEARCH" === move_type ? this.playMoveSearch(row, column) :"GO" === move_type && (_ref1 = moves_array[i - 1].split(" "), 
previous_type = _ref1[0], prev_row = _ref1[1], prev_column = _ref1[2], prev_row = parseInt(prev_row), 
prev_column = parseInt(prev_column), "GO" === previous_type ? (this.pac_row = row, 
this.pac_column = column, this.playMoveGo(row, column, prev_row, prev_column)) :(this.initBoard(moves_array[0], !0), 
this.pac_row = row, this.pac_column = column, this.playMoveGo(row, column, null, null))), 
this.current_move = i; else if (this.current_move - i === 1) {
if (_ref2 = moves_array[this.current_move].split(" "), move_type = _ref2[0], row = _ref2[1], 
column = _ref2[2], row = parseInt(row), column = parseInt(column), "SEARCH" === move_type) this.playBackMoveSearch(row, column); else if ("GO" === move_type) if (_ref3 = moves_array[i].split(" "), 
previous_type = _ref3[0], prev_row = _ref3[1], prev_column = _ref3[2], prev_row = parseInt(prev_row), 
prev_column = parseInt(prev_column), "GO" === previous_type) this.pac_row = prev_row, 
this.pac_column = prev_column, this.playBackMoveGo(row, column, prev_row, prev_column, i, moves_array); else {
if (this.initBoard(moves_array[0]), 1 !== i) for (_ref4 = moves_array.slice(1, +i + 1 || 9e9), 
_i = 0, _len = _ref4.length; _len > _i; _i++) move = _ref4[_i], _ref5 = move.split(" "), 
move_type = _ref5[0], row = _ref5[1], column = _ref5[2], row = parseInt(row), column = parseInt(column), 
this.game_grid[row][column] = "S";
this.drawBoard();
}
this.current_move = i;
}
return this;
}
}, GraphTraversalView.prototype.initBoard = function(first_move) {
var column, counter, game_row, grid_array, initial_state, row, _i, _j, _ref, _ref1, _ref2;
for (initial_state = first_move.split(","), grid_array = [], grid_array = initial_state[0].split(""), 
_ref = initial_state[1].split(" "), this.rows = _ref[0], this.columns = _ref[1], 
counter = 0, this.game_grid = new Array(this.rows), row = _i = 0, _ref1 = this.rows; _ref1 >= 0 ? _ref1 > _i :_i > _ref1; row = _ref1 >= 0 ? ++_i :--_i) {
for (game_row = new Array(this.columns), column = _j = 0, _ref2 = this.columns; _ref2 >= 0 ? _ref2 > _j :_j > _ref2; column = _ref2 >= 0 ? ++_j :--_j) game_row[column] = grid_array[counter], 
counter += 1;
this.game_grid[row] = game_row;
}
return this.setBoard(), this.drawBoard();
}, GraphTraversalView.prototype.playMoveSearch = function(row, column) {
return this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").addClass("pac-search"), 
this.setFoodPacman();
}, GraphTraversalView.prototype.playBackMoveSearch = function(row, column) {
return this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").removeClass("pac-search"), 
this.setFoodPacman;
}, GraphTraversalView.prototype.playMoveGo = function(row, column, prev_row, prev_column) {
return this.$("td[data-gg-row='" + prev_row + "'][data-gg-column='" + prev_column + "']").removeAttr("id"), 
this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").attr("id", "pac-man"), 
this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").addClass("pac-go"), 
this.setFoodPacman(), this.orient(row, column, prev_row, prev_column);
}, GraphTraversalView.prototype.playBackMoveGo = function(row, column, prev_row, prev_column, i, moves_array) {
var prev2_column, prev2_row, previous_type, _ref;
return this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").removeClass("pac-go pacright pacleft pacbottom pactop"), 
this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").removeAttr("id"), 
this.$("td[data-gg-row='" + prev_row + "'][data-gg-column='" + prev_column + "']").attr("id", "pac-man"), 
this.$("td[data-gg-row='" + prev_row + "'][data-gg-column='" + prev_column + "']").addClass("pac-go"), 
this.setFoodPacman(), _ref = moves_array[i - 1].split(" "), previous_type = _ref[0], 
prev2_row = _ref[1], prev2_column = _ref[2], "GO" === previous_type ? (prev2_row = parseInt(prev2_row), 
prev2_column = parseInt(prev2_column)) :(prev2_row = null, prev2_column = null), 
this.orient(prev_row, prev_column, prev2_row, prev2_column), $(this.el).css("display", "none"), 
$(this.el).css("display", "block");
}, GraphTraversalView.prototype.setBoard = function() {
var column, grid_html, row, _i, _j, _ref, _ref1;
for (grid_html = "<table id='graph-grid'>", row = _i = 0, _ref = this.rows; _ref >= 0 ? _ref > _i :_i > _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns; _ref1 >= 0 ? _ref1 > _j :_j > _ref1; column = _ref1 >= 0 ? ++_j :--_j) grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "'></td>", 
"P" === this.game_grid[row][column] && (this.pac_row = row, this.pac_column = column), 
"." === this.game_grid[row][column] && (this.food_row = row, this.food_column = column);
grid_html += "</tr>";
}
return grid_html += "</table>", this.$(".game-grid").html(grid_html);
}, GraphTraversalView.prototype.drawBoard = function() {
var cell, column, klass, row, _i, _j, _ref, _ref1;
for (row = _i = 0, _ref = this.rows; _ref >= 0 ? _ref > _i :_i > _ref; row = _ref >= 0 ? ++_i :--_i) for (column = _j = 0, 
_ref1 = this.columns; _ref1 >= 0 ? _ref1 > _j :_j > _ref1; column = _ref1 >= 0 ? ++_j :--_j) {
switch (cell = this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']"), 
cell.removeClass(), cell.addClass("graph-col"), cell.removeAttr("id"), klass = "", 
this.game_grid[row][column]) {
case "%":
klass = "graph-col-solid";
break;

case "G":
klass = "pac-go";
break;

case "S":
klass = "pac-search";
}
cell.addClass(klass);
}
return this.setFoodPacman();
}, GraphTraversalView.prototype.setFoodPacman = function() {
return this.$("td[data-gg-row='" + this.food_row + "'][data-gg-column='" + this.food_column + "']").attr("id", "pacfood"), 
this.$("td[data-gg-row='" + this.pac_row + "'][data-gg-column='" + this.pac_column + "']").removeAttr("id"), 
this.$("td[data-gg-row='" + this.pac_row + "'][data-gg-column='" + this.pac_column + "']").attr("id", "pac-man");
}, GraphTraversalView.prototype.orient = function(row, column, prev_row, prev_column) {
return null !== prev_row && null !== prev_column ? (this.$("td[data-gg-row='" + prev_row + "'][data-gg-column='" + prev_column + "']").removeClass("pacright pacleft pacbottom pactop"), 
row === prev_row && column > prev_column ? this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").addClass("pacright") :row === prev_row && prev_column > column ? this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").addClass("pacleft") :row > prev_row && column === prev_column ? this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").addClass("pacbottom") :prev_row > row && column === prev_column ? this.$("td[data-gg-row='" + row + "'][data-gg-column='" + column + "']").addClass("pactop") :void 0) :void 0;
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
HipView.prototype.initialize = function(options) {
return this.startX = 30, this.startY = 30, this.radius = 8, this.rows = 9, this.cols = 9, 
this.offset = 25, this.canvasSide = 260, this.parent = options.parent;
}, HipView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.initBoard(), this;
}, HipView.prototype.clearBoard = function() {
var c, ctx;
return c = this.$("#hipCanvas")[0], c ? (ctx = c.getContext("2d"), ctx.clearRect(0, 0, this.canvasSide, this.canvasSide)) :void 0;
}, HipView.prototype.initBoard = function() {
var c, ctx, i, j, posX, posY, _results;
if (c = this.$("#hipCanvas")[0]) {
for (ctx = c.getContext("2d"), ctx.fillStyle = "#ccc", ctx.strokeStyle = "#ccc", 
i = 0, _results = []; i < this.rows; ) {
for (j = 0; j < this.cols; ) ctx.beginPath(), posX = this.startX + 25 * j, posY = this.startY + 25 * i, 
ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), ctx.fill(), j++;
_results.push(i++);
}
return _results;
}
}, HipView.prototype.playMove = function(i, moves_array) {
var c, ctx, move, move_set, player, player_symbol, posX, posY, x, y, _i, _len, _ref;
if (player_symbol = {
1:"r",
2:"b"
}, this.clearBoard(), this.initBoard(), this.current_move > i && this.parent.unSetInfoMessage(), 
!(0 > i)) {
for (_ref = moves_array.slice(0, +i + 1 || 9e9), _i = 0, _len = _ref.length; _len > _i; _i++) {
if (move_set = _ref[_i], void 0 === move_set) return;
if ("CODECHECKER_INVALID_MOVE_ERROR" === move_set) return;
move = move_set.split(" "), x = move[0], y = move[1], player = move[2], "r" === player ? (c = this.$("#hipCanvas")[0], 
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
ctx.lineTo(30 + 25 * move[5], 30 + 25 * move[4]), ctx.stroke());
}
return this.current_move = i, this;
}
}, HipView.prototype.stopGame = function() {
return this.clearBoard(), this.initBoard(), this.parent.unSetInfoMessage(), this.current_move = 0;
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
LightsOutView.prototype.className = "lightsout-view", LightsOutView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0, this.rows = 8, this.columns = 8;
}, LightsOutView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, LightsOutView.prototype.setBoard = function(move) {
var className, i, j, row, rows, state, _i, _ref, _results;
for (state = this.parent.codechecker_stdin[move], rows = [], rows = state.split("\n"), 
_results = [], i = _i = 0, _ref = this.rows; _ref >= 0 ? _ref > _i :_i > _ref; i = _ref >= 0 ? ++_i :--_i) _results.push(function() {
var _j, _ref1, _results1;
for (_results1 = [], j = _j = 0, _ref1 = this.columns; _ref1 >= 0 ? _ref1 > _j :_j > _ref1; j = _ref1 >= 0 ? ++_j :--_j) className = "." + i + "-" + j, 
this.$(className).removeClass("lightsout-off lightsout-on"), row = rows[i + 1].split(""), 
"1" === row[j] ? _results1.push(this.$(className).addClass("lightsout-on")) :_results1.push(this.$(className).addClass("lightsout-off"));
return _results1;
}.call(this));
return _results;
}, LightsOutView.prototype.playMove = function(i, moves_array) {
var className, j, move, on_points, player, pointX, pointY, state, that, toggle_points, _i, _j, _ref;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (this.current_move > i && (this.parent.unSetInfoMessage(), this.setBoard(i)), 
move = moves_array[i].split(" "), player = move[0], that = this, "I" === player) for (on_points = parseInt(move[1], 10), 
j = _i = 0, _ref = on_points - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; j = _ref >= 0 ? ++_i :--_i) pointX = move[2 + 2 * j], 
pointY = move[2 + 2 * j + 1], className = "." + pointX + "-" + pointY, this.$(className).removeClass("lightsout-off"), 
this.$(className).addClass("lightsout-on"); else for (toggle_points = parseInt(move[1], 10), 
pointX = move[2], pointY = move[3], state = move[4], className = "." + pointX + "-" + pointY, 
1 === state ? (this.$(className).removeClass("lightsout-off"), this.$(className).addClass("lightsout-on")) :(this.$(className).removeClass("lightsout-on"), 
this.$(className).addClass("lightsout-off")), j = _j = 0; 1 >= _j; j = ++_j) pointX = move[5 + 3 * j], 
pointY = move[5 + 3 * j + 1], state = move[5 + 3 * j + 2], className = "." + pointX + "-" + pointY, 
"1" === state ? (this.$(className).removeClass("lightsout-off"), this.$(className).addClass("lightsout-on")) :(this.$(className).removeClass("lightsout-on"), 
this.$(className).addClass("lightsout-off"));
return this.current_move = i, this;
}
}, LightsOutView.prototype.stopGame = function() {
return this.current_move = 0, this.parent.unSetInfoMessage();
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
}, MazeGame.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, MazeGame.prototype.playMove = function(i, moves_array) {
var move;
if (void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) return i > this.current_move && this.parent.unSetInfoMessage(), 
this.current_move = i, move = moves_array[i].split(":"), 0 === i ? this.firstMove(i, move) :this.restMove(i, move);
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
if (this._hasCleared) this._clearGrid(); else {
for (grid_html = "<table class='graph-grid' id='graph-grid'>", row = _i = 0, _ref = this.rows - 1; _ref >= 0 ? _ref >= _i :_i >= _ref; row = _ref >= 0 ? ++_i :--_i) {
for (grid_html += "<tr class='graph-row'>", column = _j = 0, _ref1 = this.columns - 1; _ref1 >= 0 ? _ref1 >= _j :_j >= _ref1; column = _ref1 >= 0 ? ++_j :--_j) "#" === this.game_grid[row * this.columns + column] && (grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "' class='graph-col wall'></td>"), 
"e" === this.game_grid[row * this.columns + column] && (grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "' class='graph-col exit'></td>"), 
"-" === this.game_grid[row * this.columns + column] && (grid_html += "<td data-gg-row='" + row + "' data-gg-column='" + column + "' class='graph-col'></td>");
grid_html += "</tr>";
}
grid_html += "</table>", this.grid_html = grid_html, this._hasCleared = !0, this._clearGrid();
}
return {
stopGame:function() {
return this.parent.unSetInfoMessage(), this.current_move = i;
}
};
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
PipelayerView.prototype.className = "pipelayer-view", PipelayerView.prototype.initialize = function(options) {
return this.startX2 = 55, this.startX1 = 30, this.startY2 = 30, this.startY1 = 55, 
this.offset = 50, this.radius = 4, this.canvasSide = 355, this.parent = options.parent, 
this.current_move = 0;
}, PipelayerView.prototype.render = function() {
return this.$("#pipelayerCanvas").length > 0 ? void 0 :($(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.initBoard(), this);
}, PipelayerView.prototype.clearBoard = function() {
var c, ctx;
return c = this.$("#pipelayerCanvas")[0], c ? (ctx = c.getContext("2d"), ctx.clearRect(0, 0, this.canvasSide, this.canvasSide)) :void 0;
}, PipelayerView.prototype.initBoard = function() {
var c, cols, ctx, i, j, posX, posY, rows, _results;
if (c = this.$("#pipelayerCanvas")[0]) {
for (ctx = c.getContext("2d"), rows = 7, cols = 6, ctx.fillStyle = "blue", ctx.strokeStyle = "blue", 
i = 0; rows > i; ) {
for (j = 0; cols > j; ) ctx.beginPath(), posX = this.startX2 + 50 * j, posY = this.startY2 + 50 * i, 
ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), ctx.fill(), j++;
i++;
}
for (rows = 6, cols = 7, ctx.fillStyle = "red", ctx.strokeStyle = "red", i = 0, 
_results = []; rows > i; ) {
for (j = 0; cols > j; ) ctx.beginPath(), posX = this.startX1 + 50 * j, posY = this.startY1 + 50 * i, 
ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI), ctx.stroke(), ctx.fill(), j++;
_results.push(i++);
}
return _results;
}
}, PipelayerView.prototype.playMove = function(i, moves_array) {
var c, col1, col2, color, ctx1, ctx2, j, move, move_set, player, player_symbol, pointsNum, posX, posY, row1, row2, _i, _len, _ref;
if (this.clearBoard(), this.initBoard(), i < this.current_move && this.parent.unSetInfoMessage(), 
player_symbol = {
b:"blue",
r:"red"
}, -1 !== i) {
for (_ref = moves_array.slice(0, +i + 1 || 9e9), _i = 0, _len = _ref.length; _len > _i; _i++) {
if (move_set = _ref[_i], void 0 === move_set) return;
if ("CODECHECKER_INVALID_MOVE_ERROR" === move_set) return;
if (move = move_set.split(" "), row1 = move[0], col1 = move[1], row2 = move[2], 
col2 = move[3], player = move[4], color = player_symbol[player], c = this.$("#pipelayerCanvas")[0], 
c && void 0 !== player_symbol[player] && (ctx1 = c.getContext("2d"), ctx1.beginPath(), 
ctx1.fillStyle = color, ctx1.strokeStyle = color, ctx1.moveTo(30 + 25 * col1, 30 + 25 * row1), 
ctx1.lineTo(30 + 25 * col2, 30 + 25 * row2), ctx1.stroke(), void 0 !== move[5])) {
for (pointsNum = move[5], j = 0, posX = new Array(), posY = new Array(); pointsNum > j; ) posX[j] = move[6 + 2 * j], 
posY[j] = move[7 + 2 * j], j++;
for (j = 0; pointsNum - 1 > j; ) ctx2 = c.getContext("2d"), ctx2.beginPath(), ctx2.fillStyle = "black", 
ctx2.strokeStyle = "black", ctx2.moveTo(30 + 25 * posY[j], 30 + 25 * posX[j]), ctx2.lineTo(30 + 25 * posY[j + 1], 30 + 25 * posX[j + 1]), 
ctx2.stroke(), ctx2.beginPath(), ctx2.arc(30 + 25 * posY[j], 30 + 25 * posX[j], this.radius, 0, 2 * Math.PI), 
ctx2.stroke(), ctx2.fill(), j === pointsNum - 2 && (ctx2.beginPath(), ctx2.arc(30 + 25 * posY[j + 1], 30 + 25 * posX[j + 1], this.radius, 0, 2 * Math.PI), 
ctx2.stroke(), ctx2.fill()), j++;
}
}
return this.current_move = i, this;
}
}, PipelayerView.prototype.stopGame = function() {
return this.clearBoard(), this.initBoard(), this.parent.unSetInfoMessage(), this.current_move = 0;
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
SlidingBlocksView.prototype.className = "slidingblocks-view", SlidingBlocksView.prototype.initialize = function() {
return this.current_move = 0;
}, SlidingBlocksView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, SlidingBlocksView.prototype.playMove = function(i, moves_array) {
var block, block_width, blocks, board, grid_height, grid_width, left, top, _i, _k, _len, _len1, _ref1, _ref3, _results, _results1;
if (block_width = 52, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i]) {
if (board = moves_array[i].split(" "), grid_width = grid_height = Math.sqrt(board.length), 
this.$(".game-grid").css({
width:grid_width * block_width,
height:grid_height * block_width
}), 0 === i && 0 === this.current_move) {
for (blocks = new Array(), _ref1 = _.zip(function() {
_results = [];
for (var _j = 0, _ref = board.length - 1; _ref >= 0 ? _ref >= _j :_j >= _ref; _ref >= 0 ? _j++ :_j--) _results.push(_j);
return _results;
}.apply(this), board), _i = 0, _len = _ref1.length; _len > _i; _i++) block = _ref1[_i], 
top = block_width * parseInt(block[0] / grid_height), left = block_width * parseInt(block[0] % grid_width), 
blocks.push($("<div class='game-block' style='top: " + top + "px; left: " + left + "px;' data-blockid='" + block[1] + "'>" + block[1] + "</div>"));
this.$(".game-block").remove(), this.$(".game-grid").append(blocks);
} else for (_ref3 = _.zip(function() {
_results1 = [];
for (var _l = 0, _ref2 = board.length - 1; _ref2 >= 0 ? _ref2 >= _l :_l >= _ref2; _ref2 >= 0 ? _l++ :_l--) _results1.push(_l);
return _results1;
}.apply(this), board), _k = 0, _len1 = _ref3.length; _len1 > _k; _k++) block = _ref3[_k], 
this.$("[data-blockid=" + block[1] + "]").animate({
top:block_width * parseInt(block[0] / grid_height),
left:block_width * parseInt(block[0] % grid_width)
});
return this.current_move = i;
}
}, SlidingBlocksView.prototype.stopGame = function() {
return this.current_move = 0;
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
TicTacToeView.prototype.className = "tictactoe-view", TicTacToeView.prototype.initialize = function(options) {
return this.parent = options.parent, this.current_move = 0;
}, TicTacToeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, TicTacToeView.prototype.playMove = function(i, moves_array) {
var move, player, player_symbol, x, y;
return player_symbol = {
1:"X",
2:"O"
}, void 0 !== moves_array[i] && "CODECHECKER_INVALID_MOVE_ERROR" !== moves_array[i] ? (this.current_move <= i ? move = moves_array[i].split(" ") :(this.parent.unSetInfoMessage(), 
move = moves_array[this.current_move].split(" ")), x = move[0], y = move[1], player = move[2], 
this.current_move <= i ? (this.current_move = i, $(this.el).find(".game-grid").find("td." + x + "-" + y).html(player_symbol[player])) :(this.current_move = i, 
$(this.el).find(".game-grid").find("td." + x + "-" + y).html("")), this) :void 0;
}, TicTacToeView.prototype.stopGame = function() {
return this.current_move = 0;
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
TronView.prototype.initialize = function(options) {
return this.startX = 20, this.startY = 20, this.radius = 2, this.rows = 13, this.cols = 13, 
this.offset = 20, this.parent = options.parent, $(".player-1").children(".player-color").html("Orange"), 
$(".player-2").children(".player-color").html("Blue");
}, TronView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.initCanvas(), this;
}, TronView.prototype.initCanvas = function() {
var canvas, ctx, i, j, posX, posY, _results;
if (canvas = this.$("#tronCanvas")[0]) {
for (ctx = canvas.getContext("2d"), ctx.fillStyle = "#fff", ctx.strokeStyle = "#333", 
ctx.lineWidth = 2, i = 0, _results = []; i < this.rows; ) {
for (j = 0; j < this.cols; ) ctx.beginPath(), posX = this.startX + this.offset * (j - 1), 
posY = this.startY + this.offset * (i - 1), ctx.rect(posX, posY, this.offset, this.offset), 
ctx.stroke(), ctx.fill(), j++;
_results.push(i++);
}
return _results;
}
}, TronView.prototype.setColor = function(move, points, player) {
var canvas, ctx, j, player_symbol, posX, posY, x1, y1, _results;
if (player_symbol = {
g:"orange",
r:"blue"
}, canvas = this.$("#tronCanvas")[0]) {
for (ctx = canvas.getContext("2d"), ctx.fillStyle = player_symbol[player], ctx.strokeStyle = "#333", 
ctx.lineWidth = 2, ctx.beginPath(), j = 0, _results = []; points > j; ) x1 = move[2 + 2 * j], 
y1 = move[2 + 2 * j + 1], posX = this.startX + this.offset * (y1 - 1), posY = this.startY + this.offset * (x1 - 1), 
ctx.rect(posX, posY, this.offset, this.offset), ctx.fill(), ctx.stroke(), _results.push(j++);
return _results;
}
}, TronView.prototype.playMove = function(i, moves_array) {
var j, move, move_set, player, points, _i, _len, _ref;
for (this.initCanvas(), this.parent.unSetInfoMessage(), 0 === i ? (j = 0, i = 1) :j = i - 1, 
_ref = moves_array.slice(j, +i + 1 || 9e9), _i = 0, _len = _ref.length; _len > _i; _i++) {
if (move_set = _ref[_i], void 0 === move_set) return;
if ("CODECHECKER_INVALID_MOVE_ERROR" === move_set) return;
move = move_set.split(" "), player = move[0], points = move[1], this.setColor(move, points, player);
}
return this;
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
}.call(this), function() {
"use strict";
function validMove(move) {
if ("string" != typeof move) return !1;
var tmp = move.split("-");
return 2 !== tmp.length ? !1 :validSquare(tmp[0]) === !0 && validSquare(tmp[1]) === !0;
}
function validSquare(square) {
return "string" != typeof square ? !1 :-1 !== square.search(/^[a-h][1-8]$/);
}
function validPieceCode(code) {
return "string" != typeof code ? !1 :-1 !== code.search(/^[bw][KQRNBP]$/);
}
function validFen(fen) {
if ("string" != typeof fen) return !1;
fen = fen.replace(/ .+$/, "");
var chunks = fen.split("/");
if (8 !== chunks.length) return !1;
for (var i = 0; 8 > i; i++) if ("" === chunks[i] || chunks[i].length > 8 || -1 !== chunks[i].search(/[^kqrbnpKQRNBP1-8]/)) return !1;
return !0;
}
function validPositionObject(pos) {
if ("object" != typeof pos) return !1;
for (var i in pos) if (pos.hasOwnProperty(i) === !0 && (validSquare(i) !== !0 || validPieceCode(pos[i]) !== !0)) return !1;
return !0;
}
function fenToPieceCode(piece) {
return piece.toLowerCase() === piece ? "b" + piece.toUpperCase() :"w" + piece.toUpperCase();
}
function pieceCodeToFen(piece) {
var tmp = piece.split("");
return "w" === tmp[0] ? tmp[1].toUpperCase() :tmp[1].toLowerCase();
}
function fenToObj(fen) {
if (validFen(fen) !== !0) return !1;
fen = fen.replace(/ .+$/, "");
for (var rows = fen.split("/"), position = {}, currentRow = 8, i = 0; 8 > i; i++) {
for (var row = rows[i].split(""), colIndex = 0, j = 0; j < row.length; j++) if (-1 !== row[j].search(/[1-8]/)) {
var emptySquares = parseInt(row[j], 10);
colIndex += emptySquares;
} else {
var square = COLUMNS[colIndex] + currentRow;
position[square] = fenToPieceCode(row[j]), colIndex++;
}
currentRow--;
}
return position;
}
function objToFen(obj) {
if (validPositionObject(obj) !== !0) return !1;
for (var fen = "", currentRow = 8, i = 0; 8 > i; i++) {
for (var j = 0; 8 > j; j++) {
var square = COLUMNS[j] + currentRow;
fen += obj.hasOwnProperty(square) === !0 ? pieceCodeToFen(obj[square]) :"1";
}
7 !== i && (fen += "/"), currentRow--;
}
return fen = fen.replace(/11111111/g, "8"), fen = fen.replace(/1111111/g, "7"), 
fen = fen.replace(/111111/g, "6"), fen = fen.replace(/11111/g, "5"), fen = fen.replace(/1111/g, "4"), 
fen = fen.replace(/111/g, "3"), fen = fen.replace(/11/g, "2");
}
var COLUMNS = "abcdefgh".split("");
window.ChessBoard = window.ChessBoard || function(containerElOrId, cfg) {
function createId() {
return "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g, function() {
var r = 16 * Math.random() | 0;
return r.toString(16);
});
}
function deepCopy(thing) {
return JSON.parse(JSON.stringify(thing));
}
function parseSemVer(version) {
var tmp = version.split(".");
return {
major:parseInt(tmp[0], 10),
minor:parseInt(tmp[1], 10),
patch:parseInt(tmp[2], 10)
};
}
function compareSemVer(version, minimum) {
version = parseSemVer(version), minimum = parseSemVer(minimum);
var versionNum = 1e4 * version.major * 1e4 + 1e4 * version.minor + version.patch, minimumNum = 1e4 * minimum.major * 1e4 + 1e4 * minimum.minor + minimum.patch;
return versionNum >= minimumNum;
}
function error(code, msg, obj) {
if (cfg.hasOwnProperty("showErrors") === !0 && cfg.showErrors !== !1) {
var errorText = "ChessBoard Error " + code + ": " + msg;
return "console" === cfg.showErrors && "object" == typeof console && "function" == typeof console.log ? (console.log(errorText), 
arguments.length >= 2 && console.log(obj), void 0) :"alert" === cfg.showErrors ? (obj && (errorText += "\n\n" + JSON.stringify(obj)), 
window.alert(errorText), void 0) :("function" == typeof cfg.showErrors && cfg.showErrors(code, msg, obj), 
void 0);
}
}
function checkDeps() {
if ("string" == typeof containerElOrId) {
if ("" === containerElOrId) return window.alert("ChessBoard Error 1001: The first argument to ChessBoard() cannot be an empty string.\n\nExiting..."), 
!1;
var el = document.getElementById(containerElOrId);
if (!el) return window.alert('ChessBoard Error 1002: Element with id "' + containerElOrId + '" does not exist in the DOM.\n\nExiting...'), 
!1;
containerEl = $(el);
} else if (containerEl = $(containerElOrId), 1 !== containerEl.length) return window.alert("ChessBoard Error 1003: The first argument to ChessBoard() must be an ID or a single DOM node.\n\nExiting..."), 
!1;
return window.JSON && "function" == typeof JSON.stringify && "function" == typeof JSON.parse ? $.fn && $.fn.jquery && compareSemVer($.fn.jquery, MINIMUM_JQUERY_VERSION) === !0 ? !0 :(window.alert("ChessBoard Error 1005: Unable to find a valid version of jQuery. Please include jQuery " + MINIMUM_JQUERY_VERSION + " or higher on the page.\n\nExiting..."), 
!1) :(window.alert("ChessBoard Error 1004: JSON does not exist. Please include a JSON polyfill.\n\nExiting..."), 
!1);
}
function validAnimationSpeed(speed) {
return "fast" === speed || "slow" === speed ? !0 :parseInt(speed, 10) + "" != speed + "" ? !1 :speed >= 0;
}
function expandConfig() {
return ("string" == typeof cfg || validPositionObject(cfg) === !0) && (cfg = {
position:cfg
}), "black" !== cfg.orientation && (cfg.orientation = "white"), CURRENT_ORIENTATION = cfg.orientation, 
cfg.showNotation !== !1 && (cfg.showNotation = !0), cfg.draggable !== !0 && (cfg.draggable = !1), 
"trash" !== cfg.dropOffBoard && (cfg.dropOffBoard = "snapback"), cfg.sparePieces !== !0 && (cfg.sparePieces = !1), 
cfg.sparePieces === !0 && (cfg.draggable = !0), (cfg.hasOwnProperty("pieceTheme") !== !0 || "string" != typeof cfg.pieceTheme && "function" != typeof cfg.pieceTheme) && (cfg.pieceTheme = "assets/games/antichess/{piece}.png"), 
(cfg.hasOwnProperty("appearSpeed") !== !0 || validAnimationSpeed(cfg.appearSpeed) !== !0) && (cfg.appearSpeed = 200), 
(cfg.hasOwnProperty("moveSpeed") !== !0 || validAnimationSpeed(cfg.moveSpeed) !== !0) && (cfg.moveSpeed = 200), 
(cfg.hasOwnProperty("snapbackSpeed") !== !0 || validAnimationSpeed(cfg.snapbackSpeed) !== !0) && (cfg.snapbackSpeed = 50), 
(cfg.hasOwnProperty("snapSpeed") !== !0 || validAnimationSpeed(cfg.snapSpeed) !== !0) && (cfg.snapSpeed = 25), 
(cfg.hasOwnProperty("trashSpeed") !== !0 || validAnimationSpeed(cfg.trashSpeed) !== !0) && (cfg.trashSpeed = 100), 
cfg.hasOwnProperty("position") === !0 && ("start" === cfg.position ? CURRENT_POSITION = deepCopy(START_POSITION) :validFen(cfg.position) === !0 ? CURRENT_POSITION = fenToObj(cfg.position) :validPositionObject(cfg.position) === !0 ? CURRENT_POSITION = deepCopy(cfg.position) :error(7263, "Invalid value passed to config.position.", cfg.position)), 
!0;
}
function calculateSquareSize() {
var containerWidth = parseInt(containerEl.css("width"), 10);
if (!containerWidth || 0 >= containerWidth) return 0;
for (var boardWidth = containerWidth - 1; boardWidth % 8 !== 0 && boardWidth > 0; ) boardWidth--;
return boardWidth / 8;
}
function createElIds() {
for (var i = 0; i < COLUMNS.length; i++) for (var j = 1; 8 >= j; j++) {
var square = COLUMNS[i] + j;
SQUARE_ELS_IDS[square] = square + "-" + createId();
}
for (var pieces = "KQRBNP".split(""), i = 0; i < pieces.length; i++) {
var whitePiece = "w" + pieces[i], blackPiece = "b" + pieces[i];
SPARE_PIECE_ELS_IDS[whitePiece] = whitePiece + "-" + createId(), SPARE_PIECE_ELS_IDS[blackPiece] = blackPiece + "-" + createId();
}
}
function buildBoardContainer() {
var html = '<div class="' + CSS.chessboard + '">';
return cfg.sparePieces === !0 && (html += '<div class="' + CSS.sparePieces + " " + CSS.sparePiecesTop + '"></div>'), 
html += '<div class="' + CSS.board + '"></div>', cfg.sparePieces === !0 && (html += '<div class="' + CSS.sparePieces + " " + CSS.sparePiecesBottom + '"></div>'), 
html += "</div>";
}
function buildBoard(orientation) {
"black" !== orientation && (orientation = "white");
var html = "", alpha = deepCopy(COLUMNS), row = 8;
"black" === orientation && (alpha.reverse(), row = 1);
for (var squareColor = "white", i = 0; 8 > i; i++) {
html += '<div class="' + CSS.row + '">';
for (var j = 0; 8 > j; j++) {
var square = alpha[j] + row;
html += '<div class="' + CSS.square + " " + CSS[squareColor] + " square-" + square + '" style="width: ' + SQUARE_SIZE + "px; height: " + SQUARE_SIZE + 'px" id="' + SQUARE_ELS_IDS[square] + '" data-square="' + square + '">', 
cfg.showNotation === !0 && (("white" === orientation && 1 === row || "black" === orientation && 8 === row) && (html += '<div class="' + CSS.notation + " " + CSS.alpha + '">' + alpha[j] + "</div>"), 
0 === j && (html += '<div class="' + CSS.notation + " " + CSS.numeric + '">' + row + "</div>")), 
html += "</div>", squareColor = "white" === squareColor ? "black" :"white";
}
html += '<div class="' + CSS.clearfix + '"></div></div>', squareColor = "white" === squareColor ? "black" :"white", 
"white" === orientation ? row-- :row++;
}
return html;
}
function buildPieceImgSrc(piece) {
return "function" == typeof cfg.pieceTheme ? cfg.pieceTheme(piece) :"string" == typeof cfg.pieceTheme ? cfg.pieceTheme.replace(/{piece}/g, piece) :(error(8272, "Unable to build image source for cfg.pieceTheme."), 
"");
}
function buildPiece(piece, hidden, id) {
var html = '<img src="' + buildPieceImgSrc(piece) + '" ';
return id && "string" == typeof id && (html += 'id="' + id + '" '), html += 'alt="" class="' + CSS.piece + '" data-piece="' + piece + '" style="width: ' + SQUARE_SIZE + "px;height: " + SQUARE_SIZE + "px;", 
hidden === !0 && (html += "display:none;"), html += '" />';
}
function buildSparePieces(color) {
var pieces = [ "wK", "wQ", "wR", "wB", "wN", "wP" ];
"black" === color && (pieces = [ "bK", "bQ", "bR", "bB", "bN", "bP" ]);
for (var html = "", i = 0; i < pieces.length; i++) html += buildPiece(pieces[i], !1, SPARE_PIECE_ELS_IDS[pieces[i]]);
return html;
}
function animateSquareToSquare(src, dest, piece, completeFn) {
var srcSquareEl = $("#" + SQUARE_ELS_IDS[src]), srcSquarePosition = srcSquareEl.offset(), destSquareEl = $("#" + SQUARE_ELS_IDS[dest]), destSquarePosition = destSquareEl.offset(), animatedPieceId = createId();
$("body").append(buildPiece(piece, !0, animatedPieceId));
var animatedPieceEl = $("#" + animatedPieceId);
animatedPieceEl.css({
display:"",
position:"absolute",
top:srcSquarePosition.top,
left:srcSquarePosition.left
}), srcSquareEl.find("." + CSS.piece).remove();
var complete = function() {
destSquareEl.append(buildPiece(piece)), animatedPieceEl.remove(), "function" == typeof completeFn && completeFn();
}, opts = {
duration:cfg.moveSpeed,
complete:complete
};
animatedPieceEl.animate(destSquarePosition, opts);
}
function animateSparePieceToSquare(piece, dest, completeFn) {
var srcOffset = $("#" + SPARE_PIECE_ELS_IDS[piece]).offset(), destSquareEl = $("#" + SQUARE_ELS_IDS[dest]), destOffset = destSquareEl.offset(), pieceId = createId();
$("body").append(buildPiece(piece, !0, pieceId));
var animatedPieceEl = $("#" + pieceId);
animatedPieceEl.css({
display:"",
position:"absolute",
left:srcOffset.left,
top:srcOffset.top
});
var complete = function() {
destSquareEl.find("." + CSS.piece).remove(), destSquareEl.append(buildPiece(piece)), 
animatedPieceEl.remove(), "function" == typeof completeFn && completeFn();
}, opts = {
duration:cfg.moveSpeed,
complete:complete
};
animatedPieceEl.animate(destOffset, opts);
}
function doAnimations(a, oldPos, newPos) {
function onFinish() {
numFinished++, numFinished === a.length && (drawPositionInstant(), ANIMATION_HAPPENING = !1, 
cfg.hasOwnProperty("onMoveEnd") === !0 && "function" == typeof cfg.onMoveEnd && cfg.onMoveEnd(deepCopy(oldPos), deepCopy(newPos)));
}
ANIMATION_HAPPENING = !0;
for (var numFinished = 0, i = 0; i < a.length; i++) "clear" === a[i].type && $("#" + SQUARE_ELS_IDS[a[i].square] + " ." + CSS.piece).fadeOut(cfg.trashSpeed, onFinish), 
"add" === a[i].type && cfg.sparePieces !== !0 && $("#" + SQUARE_ELS_IDS[a[i].square]).append(buildPiece(a[i].piece, !0)).find("." + CSS.piece).fadeIn(cfg.appearSpeed, onFinish), 
"add" === a[i].type && cfg.sparePieces === !0 && animateSparePieceToSquare(a[i].piece, a[i].square, onFinish), 
"move" === a[i].type && animateSquareToSquare(a[i].source, a[i].destination, a[i].piece, onFinish);
}
function squareDistance(s1, s2) {
s1 = s1.split("");
var s1x = COLUMNS.indexOf(s1[0]) + 1, s1y = parseInt(s1[1], 10);
s2 = s2.split("");
var s2x = COLUMNS.indexOf(s2[0]) + 1, s2y = parseInt(s2[1], 10), xDelta = Math.abs(s1x - s2x), yDelta = Math.abs(s1y - s2y);
return xDelta >= yDelta ? xDelta :yDelta;
}
function createRadius(square) {
for (var squares = [], i = 0; 8 > i; i++) for (var j = 0; 8 > j; j++) {
var s = COLUMNS[i] + (j + 1);
square !== s && squares.push({
square:s,
distance:squareDistance(square, s)
});
}
squares.sort(function(a, b) {
return a.distance - b.distance;
});
for (var squares2 = [], i = 0; i < squares.length; i++) squares2.push(squares[i].square);
return squares2;
}
function findClosestPiece(position, piece, square) {
for (var closestSquares = createRadius(square), i = 0; i < closestSquares.length; i++) {
var s = closestSquares[i];
if (position.hasOwnProperty(s) === !0 && position[s] === piece) return s;
}
return !1;
}
function calculateAnimations(pos1, pos2) {
pos1 = deepCopy(pos1), pos2 = deepCopy(pos2);
var animations = [], squaresMovedTo = {};
for (var i in pos2) pos2.hasOwnProperty(i) === !0 && pos1.hasOwnProperty(i) === !0 && pos1[i] === pos2[i] && (delete pos1[i], 
delete pos2[i]);
for (var i in pos2) if (pos2.hasOwnProperty(i) === !0) {
var closestPiece = findClosestPiece(pos1, pos2[i], i);
closestPiece !== !1 && (animations.push({
type:"move",
source:closestPiece,
destination:i,
piece:pos2[i]
}), delete pos1[closestPiece], delete pos2[i], squaresMovedTo[i] = !0);
}
for (var i in pos2) pos2.hasOwnProperty(i) === !0 && (animations.push({
type:"add",
square:i,
piece:pos2[i]
}), delete pos2[i]);
for (var i in pos1) pos1.hasOwnProperty(i) === !0 && squaresMovedTo.hasOwnProperty(i) !== !0 && (animations.push({
type:"clear",
square:i,
piece:pos1[i]
}), delete pos1[i]);
return animations;
}
function drawPositionInstant() {
boardEl.find("." + CSS.piece).remove();
for (var i in CURRENT_POSITION) CURRENT_POSITION.hasOwnProperty(i) === !0 && $("#" + SQUARE_ELS_IDS[i]).append(buildPiece(CURRENT_POSITION[i]));
}
function drawBoard() {
boardEl.html(buildBoard(CURRENT_ORIENTATION)), drawPositionInstant(), cfg.sparePieces === !0 && ("white" === CURRENT_ORIENTATION ? (sparePiecesTopEl.html(buildSparePieces("black")), 
sparePiecesBottomEl.html(buildSparePieces("white"))) :(sparePiecesTopEl.html(buildSparePieces("white")), 
sparePiecesBottomEl.html(buildSparePieces("black"))));
}
function calculatePositionFromMoves(position, moves) {
position = deepCopy(position);
for (var i in moves) if (moves.hasOwnProperty(i) === !0 && position.hasOwnProperty(i) === !0) {
var piece = position[i];
delete position[i], position[moves[i]] = piece;
}
return position;
}
function setCurrentPosition(position) {
var oldPos = deepCopy(CURRENT_POSITION), newPos = deepCopy(position), oldFen = objToFen(oldPos), newFen = objToFen(newPos);
oldFen !== newFen && (cfg.hasOwnProperty("onChange") === !0 && "function" == typeof cfg.onChange && cfg.onChange(oldPos, newPos), 
CURRENT_POSITION = position);
}
function isXYOnSquare(x, y) {
for (var i in SQUARE_ELS_OFFSETS) if (SQUARE_ELS_OFFSETS.hasOwnProperty(i) === !0) {
var s = SQUARE_ELS_OFFSETS[i];
if (x >= s.left && x < s.left + SQUARE_SIZE && y >= s.top && y < s.top + SQUARE_SIZE) return i;
}
return "offboard";
}
function captureSquareOffsets() {
SQUARE_ELS_OFFSETS = {};
for (var i in SQUARE_ELS_IDS) SQUARE_ELS_IDS.hasOwnProperty(i) === !0 && (SQUARE_ELS_OFFSETS[i] = $("#" + SQUARE_ELS_IDS[i]).offset());
}
function removeSquareHighlights() {
boardEl.find("." + CSS.square).removeClass(CSS.highlight1 + " " + CSS.highlight2);
}
function snapbackDraggedPiece() {
function complete() {
drawPositionInstant(), draggedPieceEl.css("display", "none"), cfg.hasOwnProperty("onSnapbackEnd") === !0 && "function" == typeof cfg.onSnapbackEnd && cfg.onSnapbackEnd(DRAGGED_PIECE, DRAGGED_PIECE_SOURCE, deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION);
}
if ("spare" === DRAGGED_PIECE_SOURCE) return trashDraggedPiece(), void 0;
removeSquareHighlights();
var sourceSquarePosition = $("#" + SQUARE_ELS_IDS[DRAGGED_PIECE_SOURCE]).offset(), opts = {
duration:cfg.snapbackSpeed,
complete:complete
};
draggedPieceEl.animate(sourceSquarePosition, opts), DRAGGING_A_PIECE = !1;
}
function trashDraggedPiece() {
removeSquareHighlights();
var newPosition = deepCopy(CURRENT_POSITION);
delete newPosition[DRAGGED_PIECE_SOURCE], setCurrentPosition(newPosition), drawPositionInstant(), 
draggedPieceEl.fadeOut(cfg.trashSpeed), DRAGGING_A_PIECE = !1;
}
function dropDraggedPieceOnSquare(square) {
removeSquareHighlights();
var newPosition = deepCopy(CURRENT_POSITION);
delete newPosition[DRAGGED_PIECE_SOURCE], newPosition[square] = DRAGGED_PIECE, setCurrentPosition(newPosition);
var targetSquarePosition = $("#" + SQUARE_ELS_IDS[square]).offset(), complete = function() {
drawPositionInstant(), draggedPieceEl.css("display", "none"), cfg.hasOwnProperty("onSnapEnd") === !0 && "function" == typeof cfg.onSnapEnd && cfg.onSnapEnd(DRAGGED_PIECE_SOURCE, square, DRAGGED_PIECE);
}, opts = {
duration:cfg.snapSpeed,
complete:complete
};
draggedPieceEl.animate(targetSquarePosition, opts), DRAGGING_A_PIECE = !1;
}
function beginDraggingPiece(source, piece, x, y) {
("function" != typeof cfg.onDragStart || cfg.onDragStart(source, piece, deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION) !== !1) && (DRAGGING_A_PIECE = !0, 
DRAGGED_PIECE = piece, DRAGGED_PIECE_SOURCE = source, DRAGGED_PIECE_LOCATION = "spare" === source ? "offboard" :source, 
captureSquareOffsets(), draggedPieceEl.attr("src", buildPieceImgSrc(piece)).css({
display:"",
position:"absolute",
left:x - SQUARE_SIZE / 2,
top:y - SQUARE_SIZE / 2
}), "spare" !== source && $("#" + SQUARE_ELS_IDS[source]).addClass(CSS.highlight1).find("." + CSS.piece).css("display", "none"));
}
function updateDraggedPiece(x, y) {
draggedPieceEl.css({
left:x - SQUARE_SIZE / 2,
top:y - SQUARE_SIZE / 2
});
var location = isXYOnSquare(x, y);
location !== DRAGGED_PIECE_LOCATION && (validSquare(DRAGGED_PIECE_LOCATION) === !0 && $("#" + SQUARE_ELS_IDS[DRAGGED_PIECE_LOCATION]).removeClass(CSS.highlight2), 
validSquare(location) === !0 && $("#" + SQUARE_ELS_IDS[location]).addClass(CSS.highlight2), 
"function" == typeof cfg.onDragMove && cfg.onDragMove(location, DRAGGED_PIECE_LOCATION, DRAGGED_PIECE_SOURCE, DRAGGED_PIECE, deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION), 
DRAGGED_PIECE_LOCATION = location);
}
function stopDraggedPiece(location) {
var action = "drop";
if ("offboard" === location && "snapback" === cfg.dropOffBoard && (action = "snapback"), 
"offboard" === location && "trash" === cfg.dropOffBoard && (action = "trash"), cfg.hasOwnProperty("onDrop") === !0 && "function" == typeof cfg.onDrop) {
var newPosition = deepCopy(CURRENT_POSITION);
"spare" === DRAGGED_PIECE_SOURCE && validSquare(location) === !0 && (newPosition[location] = DRAGGED_PIECE), 
validSquare(DRAGGED_PIECE_SOURCE) === !0 && "offboard" === location && delete newPosition[DRAGGED_PIECE_SOURCE], 
validSquare(DRAGGED_PIECE_SOURCE) === !0 && validSquare(location) === !0 && (delete newPosition[DRAGGED_PIECE_SOURCE], 
newPosition[location] = DRAGGED_PIECE);
var oldPosition = deepCopy(CURRENT_POSITION), result = cfg.onDrop(DRAGGED_PIECE_SOURCE, location, DRAGGED_PIECE, newPosition, oldPosition, CURRENT_ORIENTATION);
("snapback" === result || "trash" === result) && (action = result);
}
"snapback" === action ? snapbackDraggedPiece() :"trash" === action ? trashDraggedPiece() :"drop" === action && dropDraggedPieceOnSquare(location);
}
function isTouchDevice() {
return "ontouchstart" in document.documentElement;
}
function isMSIE() {
return navigator && navigator.userAgent && -1 !== navigator.userAgent.search(/MSIE/);
}
function stopDefault(e) {
e.preventDefault();
}
function mousedownSquare(e) {
if (cfg.draggable === !0) {
var square = $(this).attr("data-square");
validSquare(square) === !0 && CURRENT_POSITION.hasOwnProperty(square) === !0 && beginDraggingPiece(square, CURRENT_POSITION[square], e.pageX, e.pageY);
}
}
function touchstartSquare(e) {
if (cfg.draggable === !0) {
var square = $(this).attr("data-square");
validSquare(square) === !0 && CURRENT_POSITION.hasOwnProperty(square) === !0 && (e = e.originalEvent, 
beginDraggingPiece(square, CURRENT_POSITION[square], e.changedTouches[0].pageX, e.changedTouches[0].pageY));
}
}
function mousedownSparePiece(e) {
if (cfg.sparePieces === !0) {
var piece = $(this).attr("data-piece");
beginDraggingPiece("spare", piece, e.pageX, e.pageY);
}
}
function touchstartSparePiece(e) {
if (cfg.sparePieces === !0) {
var piece = $(this).attr("data-piece");
e = e.originalEvent, beginDraggingPiece("spare", piece, e.changedTouches[0].pageX, e.changedTouches[0].pageY);
}
}
function mousemoveWindow(e) {
DRAGGING_A_PIECE === !0 && updateDraggedPiece(e.pageX, e.pageY);
}
function touchmoveWindow(e) {
DRAGGING_A_PIECE === !0 && (e.preventDefault(), updateDraggedPiece(e.originalEvent.changedTouches[0].pageX, e.originalEvent.changedTouches[0].pageY));
}
function mouseupWindow(e) {
if (DRAGGING_A_PIECE === !0) {
var location = isXYOnSquare(e.pageX, e.pageY);
stopDraggedPiece(location);
}
}
function touchendWindow(e) {
if (DRAGGING_A_PIECE === !0) {
var location = isXYOnSquare(e.originalEvent.changedTouches[0].pageX, e.originalEvent.changedTouches[0].pageY);
stopDraggedPiece(location);
}
}
function mouseenterSquare(e) {
if (DRAGGING_A_PIECE === !1 && cfg.hasOwnProperty("onMouseoverSquare") === !0 && "function" == typeof cfg.onMouseoverSquare) {
var square = $(e.currentTarget).attr("data-square");
if (validSquare(square) === !0) {
var piece = !1;
CURRENT_POSITION.hasOwnProperty(square) === !0 && (piece = CURRENT_POSITION[square]), 
cfg.onMouseoverSquare(square, piece, deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION);
}
}
}
function mouseleaveSquare(e) {
if (DRAGGING_A_PIECE === !1 && cfg.hasOwnProperty("onMouseoutSquare") === !0 && "function" == typeof cfg.onMouseoutSquare) {
var square = $(e.currentTarget).attr("data-square");
if (validSquare(square) === !0) {
var piece = !1;
CURRENT_POSITION.hasOwnProperty(square) === !0 && (piece = CURRENT_POSITION[square]), 
cfg.onMouseoutSquare(square, piece, deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION);
}
}
}
function addEvents() {
$("body").on("mousedown mousemove", "." + CSS.piece, stopDefault), boardEl.on("mousedown", "." + CSS.square, mousedownSquare), 
containerEl.on("mousedown", "." + CSS.sparePieces + " ." + CSS.piece, mousedownSparePiece), 
boardEl.on("mouseenter", "." + CSS.square, mouseenterSquare), boardEl.on("mouseleave", "." + CSS.square, mouseleaveSquare), 
isMSIE() === !0 ? (document.ondragstart = function() {
return !1;
}, $("body").on("mousemove", mousemoveWindow), $("body").on("mouseup", mouseupWindow)) :($(window).on("mousemove", mousemoveWindow), 
$(window).on("mouseup", mouseupWindow)), isTouchDevice() === !0 && (boardEl.on("touchstart", "." + CSS.square, touchstartSquare), 
containerEl.on("touchstart", "." + CSS.sparePieces + " ." + CSS.piece, touchstartSparePiece), 
$(window).on("touchmove", touchmoveWindow), $(window).on("touchend", touchendWindow));
}
function initDom() {
containerEl.html(buildBoardContainer()), boardEl = containerEl.find("." + CSS.board), 
cfg.sparePieces === !0 && (sparePiecesTopEl = containerEl.find("." + CSS.sparePiecesTop), 
sparePiecesBottomEl = containerEl.find("." + CSS.sparePiecesBottom));
var draggedPieceId = createId();
$("body").append(buildPiece("wP", !0, draggedPieceId)), draggedPieceEl = $("#" + draggedPieceId), 
BOARD_BORDER_SIZE = parseInt(boardEl.css("borderLeftWidth"), 10), widget.resize();
}
function init() {
checkDeps() === !0 && expandConfig() === !0 && (createElIds(), initDom(), addEvents());
}
cfg = cfg || {};
var containerEl, boardEl, draggedPieceEl, sparePiecesTopEl, sparePiecesBottomEl, SQUARE_SIZE, DRAGGED_PIECE, DRAGGED_PIECE_LOCATION, DRAGGED_PIECE_SOURCE, SQUARE_ELS_OFFSETS, MINIMUM_JQUERY_VERSION = "1.7.0", START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", START_POSITION = fenToObj(START_FEN), CSS = {
alpha:"alpha-d2270",
black:"black-3c85d",
board:"board-b72b1",
chessboard:"chessboard-63f37",
clearfix:"clearfix-7da63",
highlight1:"highlight1-32417",
highlight2:"highlight2-9c5d2",
notation:"notation-322f9",
numeric:"numeric-fc462",
piece:"piece-417db",
row:"row-5277c",
sparePieces:"spare-pieces-7492f",
sparePiecesBottom:"spare-pieces-bottom-ae20f",
sparePiecesTop:"spare-pieces-top-4028b",
square:"square-55d63",
white:"white-1e1d7"
}, widget = {}, ANIMATION_HAPPENING = !1, BOARD_BORDER_SIZE = 2, CURRENT_ORIENTATION = "white", CURRENT_POSITION = {}, DRAGGING_A_PIECE = !1, SPARE_PIECE_ELS_IDS = {}, SQUARE_ELS_IDS = {};
return widget.clear = function(useAnimation) {
widget.position({}, useAnimation);
}, widget.destroy = function() {
containerEl.html(""), draggedPieceEl.remove(), containerEl.unbind();
}, widget.fen = function() {
return widget.position("fen");
}, widget.flip = function() {
widget.orientation("flip");
}, widget.move = function() {
if (0 !== arguments.length) {
for (var useAnimation = !0, moves = {}, i = 0; i < arguments.length; i++) if (arguments[i] !== !1) if (validMove(arguments[i]) === !0) {
var tmp = arguments[i].split("-");
moves[tmp[0]] = tmp[1];
} else error(2826, "Invalid move passed to the move method.", arguments[i]); else useAnimation = !1;
var newPos = calculatePositionFromMoves(CURRENT_POSITION, moves);
return widget.position(newPos, useAnimation), newPos;
}
}, widget.orientation = function(arg) {
return 0 === arguments.length ? CURRENT_ORIENTATION :"white" === arg || "black" === arg ? (CURRENT_ORIENTATION = arg, 
drawBoard(), void 0) :"flip" === arg ? (CURRENT_ORIENTATION = "white" === CURRENT_ORIENTATION ? "black" :"white", 
drawBoard(), void 0) :(error(5482, "Invalid value passed to the orientation method.", arg), 
void 0);
}, widget.position = function(position, useAnimation) {
return 0 === arguments.length ? deepCopy(CURRENT_POSITION) :"string" == typeof position && "fen" === position.toLowerCase() ? objToFen(CURRENT_POSITION) :(useAnimation !== !1 && (useAnimation = !0), 
"string" == typeof position && "start" === position.toLowerCase() && (position = deepCopy(START_POSITION)), 
validFen(position) === !0 && (position = fenToObj(position)), validPositionObject(position) !== !0 ? (error(6482, "Invalid value passed to the position method.", position), 
void 0) :(useAnimation === !0 ? (doAnimations(calculateAnimations(CURRENT_POSITION, position), CURRENT_POSITION, position), 
setCurrentPosition(position)) :(setCurrentPosition(position), drawPositionInstant()), 
void 0));
}, widget.resize = function() {
SQUARE_SIZE = calculateSquareSize(), boardEl.css("width", 8 * SQUARE_SIZE + "px"), 
draggedPieceEl.css({
height:SQUARE_SIZE,
width:SQUARE_SIZE
}), cfg.sparePieces === !0 && containerEl.find("." + CSS.sparePieces).css("paddingLeft", SQUARE_SIZE + BOARD_BORDER_SIZE + "px"), 
drawBoard();
}, widget.start = function(useAnimation) {
widget.position("start", useAnimation);
}, init(), widget;
}, window.ChessBoard.fenToObj = fenToObj, window.ChessBoard.objToFen = objToFen;
}();