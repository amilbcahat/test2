HR.appController.addTemplate("backbone/templates/submission-game-collection", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "<div class=\"table-wrap text-center\">\n  <header class=\"row\">\n      <div class=\"span6\">Opponent</div>\n      <div class=\"span6\">Results<br/>(Won/Tied/Lost)</div>\n      <div class=\"span4\">Games</div>\n  </header>\n  <div class=\"table-body\">\n    <div class=\"row throbber-row\">\n      <div class='throbber text-center' style='padding: 121px 0; height: 64px;'>\n          <img src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_64x64.gif' class=\"block-center\" />\n      </div>\n    </div>\n    <div class=\"row game-view-rows\">\n      <div class='zero-content zero-content-won' style='height: 64px;'>\n          You haven't won any games, YET.\n      </div>\n      <div class='zero-content zero-content-tied' style='height: 64px;'>\n          No tied games to display\n      </div>\n      <div class='zero-content zero-content-lost' style='height: 64px;'>\n          Awesome, you haven't lost any games.\n      </div>\n      <div class='zero-content zero-content-all' style='height: 64px;'>\n          Waiting for games to be played\n      </div>\n      ", 
collection && (__p += "\n        ", _.each(collection, function(game) {
__p += "\n        ", console.log(game), __p += '\n          <div class="row">\n            <div class="span6">\n              ', 
__p += game.actors.length <= 1 ? "\n                JudgeBot\n              " :game.actors[0].hacker_username != HR.profile().get("username") ? "\n                " + (null == (__t = game.actors[0].hacker_username) ? "" :_.escape(__t)) + "\n              " :game.actors[1].hacker_username != HR.profile().get("username") ? "\n                " + (null == (__t = game.actors[1].hacker_username) ? "" :_.escape(__t)) + "\n              " :"\n                Multiple Opponents\n              ", 
__p += "\n            </div>\n              ";
for (var won = 0, lost = 0, tied = 0, i = 0; i < game.games.length; i++) {
var result = game.games[i].result;
0 == result ? tied++ :game.games[i].actors[result - 1].hacker_username == HR.profile().get("username") ? won++ :lost++;
}
__p += '\n            <div class="span6">\n              ' + (null == (__t = won) ? "" :__t) + "/" + (null == (__t = tied) ? "" :__t) + "/" + (null == (__t = lost) ? "" :__t) + '\n            </div>\n            <div class="span4">\n              <a class="btn show-gameset-button show-gameset-button-' + (null == (__t = game.id) ? "" :__t) + '">Button</a>\n            </div>\n            <div class="span16 show-gameset-container show-gameset-container-' + (null == (__t = game.id) ? "" :__t) + '" style="display:hidden;">\n            There is no round\n            </div>\n          </div>\n        ';
}), __p += "\n      "), __p += '\n    </div>\n  </div>\n</div>\n\n<div class="pagination-wrap clearfix pagination-wrapper"></div>\n</div>\n';
return __p;
});