HR.appController.addTemplate("backbone/templates/games/antichess", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<style>\n    .game-grid {\n        width: 480px;\n        height: 480px;\n        display: block;\n        margin: auto;\n    }\n</style>\n<div>\n    <div class="span8 block-center text-center" style="width: 480px">\n        ' + (null == (__t = model.actors[0].hacker_username) ? "" :__t) + '\n    </div>\n    <div class="game-grid" id="chess-board-wrapper" >\n    </div>\n    <div class="span8 block-center text-center" style="width: 480px">\n        ' + (null == (__t = model.actors[1].hacker_username) ? "" :__t) + "\n    </div>\n</div>\n";
return __p;
});