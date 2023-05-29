HR.appController.addTemplate("backbone/templates/games/quarto", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n.cell {\n  height: 120px;\n  width: 120px;\n  border: 5px solid #ddd;\n  border-radius: 5px;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  margin: 10px;\n  background-color: #222;\n  vertical-align: middle;\n}\n.highlight{\n  background-color: #666;\n}\n.piece {\n  display: block;\n  width: 80px;\n  height: 80px;\n  margin: auto;\n  border-width:15px;\n  border-style: solid;\n  border-color: transparent;\n}\n.square {\n  -moz-border-radius: 15px;\n  -webkit-border-radius: 15px;\n  border-radius: 15px;\n}\n\n.circle {\n  -moz-border-radius: 55px;\n  -webkit-border-radius: 55px;\n  border-radius: 55px;\n}\n\n.thin{\n  transform: scale(0.66);\n  -webkit-transform: scale(0.66);\n  -moz-transform: scale(0.66);\n}\n\n.thick{\n  transform: scale(1);\n  -webkit-transform: scale(1);\n  -moz-transform: scale(1);\n}\n\n.solid-blue{\n  border-color: #1b6aa5;\n  background-color:#1b6aa5;\n}\n.hollow-blue{\n  border-color: #1b6aa5;\n}\n\n.solid-red{\n  border-color: #e8110f;\n  background-color:#e8110f;\n}\n.hollow-red{\n  border-color: #e8110f;\n}\n</style>\n\n<div>\n    <div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n        ';
var rows = 4;
__p += "\n        ";
var columns = 4;
for (__p += '\n        <table style="margin: 20px auto;">\n            ', i = 0; rows > i; i++) {
for (__p += "\n            <tr>\n                ", j = 0; columns > j; j++) __p += '\n                   <td class="cell"><div id="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" class="piece "></div></td>\n                ';
__p += "\n            </tr>\n            ";
}
__p += '\n        </table>\n    </div>\n    <div id="move-info" class="span8 block-center text-center" style="width: 480px">\n      Game has not started.\n    </div>\n    <div class="select-grid" style="display: block; margin: auto;">\n        <table style="margin: 20px auto;">\n            <tr><td  class="cell"><div id="pick-cell" class="piece"></div></td></tr>\n        </table>\n    </div>\n</div>\n';
}
return __p;
});