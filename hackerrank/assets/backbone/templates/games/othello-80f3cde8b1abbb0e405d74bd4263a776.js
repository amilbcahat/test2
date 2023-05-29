HR.appController.addTemplate("backbone/templates/games/othello", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n    .game-grid p {\n        margin: 0px;\n    }\n    h3 {\n        margin: 0px;\n    }\n    .m {\n        text-align: center !important;\n    }\n    .translucent {\n    }\n    .playgame-row {\n        position: fixed;\n    }\n    .playgame-row .btn {\n        margin-top: 70px;\n        z-index: 999;\n    }\n    .game-message {\n        font-weight: bold;\n    }\n    .cell {\n        width: 48px;\n        height: 48px;\n    }\n    .blank {\n        background-image: url(\'/assets/othello-green.png\');\n\n    }\n    .white {\n        background-image: url(\'/assets/othello-white.png\');\n\n    }\n    .black {\n        background-image: url(\'/assets/othello-black.png\');\n\n    }\n    .move {\n        background-image: url(\'/assets/othello-move.png\');\n\n    }\n\n\n</style>\n<div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n  <p style="text-align: center;">Black(<span class="player1_discs">2</span>) vs <span class="player-2">White(<span class="player2_discs">2</span>)</span> </p>\n  <table style="margin: 20px auto;">\n    ';
var rows = 8;
__p += "\n    ";
var cols = 8;
__p += "\n    ";
for (var i = 0; rows > i; i++) {
__p += '\n        <tr style="text-align: center">\n        ';
for (var j = 0; cols > j; j++) __p += '\n            <td id="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" class="blank cell"></td>\n        ';
__p += "\n        </tr>\n    ";
}
__p += "\n  </table>\n</div>\n";
}
return __p;
});