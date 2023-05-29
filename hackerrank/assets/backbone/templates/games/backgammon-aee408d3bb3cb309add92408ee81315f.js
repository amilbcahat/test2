HR.appController.addTemplate("backbone/templates/games/backgammon", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n    .gameback\n    {\n        width: 432px;\n        margin: auto;\n        border: 1px solid #333;\n        margin-bottom: 20px;\n        background: url("/static/games/backgammon_board.jpg");\n        height: 300px;\n        padding:14px 0px 14px 8px;\n    }\n    .dice{\n        float: left;\n        width: 32px;\n        height: 300px;\n        margin-right: 8px;\n    }\n    .dice td {\n        vertical-align: middle;\n        text-align: center;\n    }\n    .moves {\n        float: left;\n        height: 300px;\n        width: 392px;\n    }\n    .moves td {\n        width:24px !important;\n        text-align: center;\n        vertical-align: inherit;\n    }\n    .moves td:nth-child(7){\n        width:50px !important;\n    }\n    .moves td:nth-child(14){\n        width:50px !important;\n    }\n    .coin {\n        height:20px;\n        width: 20px;\n        border-radius: 12px;\n        border: 1px solid #000;\n        display: inline-block;\n    }\n    .bar-0 .coin, .bar-1 .coin, td.0-12 .coin, td.1-12 .coin {\n        margin:0 5px;\n    }\n    .coin.c2 {\n        background: #000;\n        color: #FFF;\n        border: 1px solid #FFF;\n    }\n    .coin.c1 {\n        background: #FFF;\n        color: #000;\n    }\n    .game-grid {\n    }\n    .coint {\n        height:;\n    }\n\n    .dice_coin {\n        background: url("/static/games/dice.png");\n        background-size: 160px;\n        height: 25px;\n        width:24px;\n        display: inline-block;\n    }\n    .dice_coin.n1 {\n        background-position: -11px;\n    }\n    .dice_coin.n2 {\n        background-position: -33px;\n    }\n    .dice_coin.n3 {\n        background-position: -56px;\n    }\n    .dice_coin.n4 {\n        background-position: -78px;\n    }\n    .dice_coin.n5 {\n        background-position: -100px;\n    }\n    .dice_coin.n6 {\n        background-position: -123px;\n    }\n    .player_info .active{\n        border-bottom: 2px solid green;\n    }\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n        ';
var rows = 2;
__p += "\n        ";
var columns = 13;
for (__p += '\n        <div class="gameback">\n            <table class="dice"><tr><td>\n            </td></tr></table><table class="moves">\n                ', 
i = 0; rows > i; i++) {
for (__p += '\n                <tr style="vertical-align: ' + (null == (__t = 1 == i ? "bottom" :"top") ? "" :__t) + '" >\n                    ', 
j = 0; columns > j; j++) __p += '\n                       <td class="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" style="">&nbsp;</td>\n                       ', 
5 == j && (__p += '\n                            <td class="bar-' + (null == (__t = i) ? "" :__t) + '" style="">&nbsp;</td>\n                       '), 
__p += "\n                    ";
__p += "\n                </tr>\n                ";
}
__p += '\n            </table>\n        </div>\n        <div class="player_info" style="text-align:center">\n            <div style="display:inline-block; margin:0 5px;" class="player1">\n                <div class="coin c1"></div>\n                <br/>\n                Player 1\n            </div>\n            <div style="display:inline-block; margin:0 5px;" class="player2">\n                <div class="coin c2"></div>\n                <br/>\n                Player 2\n            </div>\n        </div>\n    </div>\n</div>\n';
}
return __p;
});