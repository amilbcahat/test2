HR.appController.addTemplate("backbone/templates/games/botclean", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<div><div><div><div>\n\n</div></div></div></div>\n\n<style>\n    .moves {\n        width: 200px;\n        margin: auto;\n        border: 1px solid #333;\n        margin-bottom: 20px;\n    }\n    .moves td {\n        width: 100px;\n        border: 1px solid #333;\n    }\n    .moves tr {\n        border: 1px solid #333;\n    }\n    .cell{\n        background-color:none;\n    }\n    .bot{\n\n        background-image: url("static/games/bot.png");\n        background-size: 50px 50px;\n        background-position: 0px 0px;\n    }\n    .clean{\n        background-color: #F8E7D9;\n    }\n    .dirty{\n        background-color: #3E250D;\n    }\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: 20px auto; border-radius: 10px; width:250px;">\n        ';
var rows = 5;
__p += "\n        ";
for (__p += '\n        <table style="border: 2px solid #666;">\n            ', i = 0; rows > i; i++) {
for (__p += '\n            <tr style="height: 50px; width: 250px; border: 2px solid #666;">\n                ', 
j = 0; rows > j; j++) __p += '\n                   <td class="cell ' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" style="height: 50px; width: 50px; border: 2px solid #666;">&nbsp;</td>\n                ';
__p += "\n            </tr>\n            ";
}
__p += "\n        </table>\n    </div>\n</div>\n";
}
return __p;
});