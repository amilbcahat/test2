HR.appController.addTemplate("backbone/templates/games/copsandrobbers", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n    .moves {\n        width: 200px;\n        margin: auto;\n        border: 1px solid #333;\n        margin-bottom: 20px;\n    }\n    .moves td {\n        width: 100px;\n        border: 1px solid #333;\n    }\n    .moves tr {\n        border: 1px solid #333;\n    }\n    .cops {\n        background: url(\'/assets/copsandrobber.png\') no-repeat top left;\n        background-position: 0 0;\n        width: 20px;\n        height: 20px;\n    }\n    .robber {\n        background: url(\'/assets/copsandrobber.png\') no-repeat top left;\n        background-position: 0 -30px;\n        width: 20px;\n        height: 20px;\n    }\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n    <p style="text-align: center;"><span class="player-1">Cops</span> vs <span class="player-2">Dr. Jakoof</span></p>\n        ';
var rows = 20;
__p += "\n        ";
var columns = 20;
for (__p += '\n        <table style="margin: 20px auto; border: 2px solid #666;">\n            ', 
i = 0; rows > i; i++) {
for (__p += '\n            <tr style=" background-color: #ddd; border: 2px solid #666;">\n                ', 
j = 0; columns > j; j++) __p += '\n                   <td class="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + ' m" style="height: 20px; width: 20px; background-color: #eee; border: 2px solid #666; font-size: 6px; text-align: center;">\n                   </td>\n                ';
__p += "\n            </tr>\n            ";
}
__p += "\n        </table>\n    </div>\n</div>\n";
}
return __p;
});