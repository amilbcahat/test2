HR.appController.addTemplate("backbone/templates/games/tictactoe", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n    .moves {\n        width: 200px;\n        margin: auto;\n        border: 1px solid #333;\n        margin-bottom: 20px;\n    }\n    .moves td {\n        width: 100px;\n        border: 1px solid #333;\n    }\n    .moves tr {\n        border: 1px solid #333;\n    }\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n        ';
var rows = 3;
__p += "\n        ";
for (__p += '\n        <table style="margin: 20px auto; border: 2px solid #666;">\n            ', 
i = 0; rows > i; i++) {
for (__p += '\n            <tr style="height: 80px; width: 240px; background-color: #ddd; border: 2px solid #666;">\n                ', 
j = 0; rows > j; j++) __p += '\n                   <td class="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" style="height: 40px; width: 40px; background-color: #eee; border: 2px solid #666; padding: 20px; font-size: 40px; text-align: center;">&nbsp;</td>\n                ';
__p += "\n            </tr>\n            ";
}
__p += "\n        </table>\n    </div>\n</div>\n";
}
return __p;
});