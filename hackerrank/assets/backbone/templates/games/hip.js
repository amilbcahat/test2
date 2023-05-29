HR.appController.addTemplate("backbone/templates/games/hip", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<style>\n    .game-grid p {\n        margin: 0px;\n    }\n    h3 {\n        margin: 0px;\n    }\n    .m {\n        text-align: center !important;\n    }\n    .translucent {\n    }\n    .playgame-row {\n        position: fixed;\n    }\n    .playgame-row .btn {\n        margin-top: 70px;\n        z-index: 999;\n    }\n    .game-message {\n        font-weight: bold;\n    }\n</style>\n<div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n    <p style="text-align: center;"><span class="player-1">Red</span> vs <span class="player-2">Blue</span> </p>\n    <table style="margin: 20px auto;">\n        <tr style="text-align: center">\n            <td style="text-align: center" class="canvasPlaceholder">\n                <canvas id="hipCanvas" width="260" height="252">\n                </canvas>\n            </td>\n        </tr>\n    </table>\n</div>\n';
return __p;
});