HR.appController.addTemplate("backbone/templates/games/lightsout", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += "<style>\n    .moves {\n        width: 200px;\n        margin: auto;\n        border: 1px solid #333;\n        margin-bottom: 20px;\n    }\n    .moves td {\n        width: 100px;\n        border: 1px solid #333;\n    }\n    .moves tr {\n        border: 1px solid #333;\n    }\n    .lightsout-off {\n        background-position: 0 0;\n        background-image: url('/assets/lightsout.png');\n        width: 32px;\n        height: 32px;\n    }\n    .lightsout-on {\n        background-position: 0 -42px;\n        background-image: url('/assets/lightsout.png');\n        width: 32px;\n        height: 32px;\n    }\n\n</style>\n<div>\n    <div class=\"game-grid\" style=\"display: block; margin: auto; border-radius: 10px;\">\n        ";
var rows = 8;
__p += "\n        ";
var columns = 8;
for (__p += '\n        <table style="margin: 20px auto;">\n            ', i = 0; rows > i; i++) {
for (__p += '\n            <tr style="background-color: #ddd;">\n                ', 
j = 0; columns > j; j++) __p += '\n                   <td class="m ' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + ' lightsout-off"></td>\n                ';
__p += "\n            </tr>\n            ";
}
__p += "\n        </table>\n    </div>\n</div>\n";
}
return __p;
});