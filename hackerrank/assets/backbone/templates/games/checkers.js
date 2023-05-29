HR.appController.addTemplate("backbone/templates/games/checkers", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n\n.white-grid {\n    background-color:#ffeebb;\n    width: 40px;\n    height: 40px;\n    vertical-align: middle;\n}\n\n.black-grid {\n    background-color:#332f25;\n    width: 40px;\n    height: 40px;\n    vertical-align: middle;\n}\n\n.black-block {\n    background-color:#998e70;\n    width:30px;\n    height:30px;\n    border-radius: 15px;\n    margin: auto;\n}\n\n.white-block {\n    background-color:#e5e4e2;\n    width:30px;\n    height:30px;\n    border-radius: 15px;\n    margin: auto;\n}\n\n.doubleblack-block {\n    background-color:#918866;\n    width:30px;\n    height:30px;\n    border-radius: 15px;\n    border-width:3px;\n    border-color:#000000;\n    margin: auto;\n}\n\n.doublewhite-block {\n    background-color:#eceae9;\n    width:30px;\n    height:30px;\n    border-radius: 15px;\n    border-width:3px;\n    border-color:#000000;\n    margin: auto;\n}\n\n.empty-block {\n    width:30px;\n    height:30px;\n}\n\ntable#graph-grid{\n    background-image: url(\'/assets/checkers.png\');\n    margin: auto;\n}\n\n</style>\n<div>\n  <div class="checkers-grid" style="display: block; margin: auto; ">\n  ';
var rows = 8;
__p += "\n  ";
var columns = 8;
__p += "\n  ";
var style = [ "white-grid", "black-grid" ];
for (__p += '\n  <div class="span8 block-center text-center" style="width: 480px">\n    ' + (null == (__t = model.actors[0].hacker_username) ? "" :__t) + '\n  </div>\n\n  <table style="margin: 20px auto; border: 2px solid #666;">\n    ', 
i = 0; rows > i; i++) {
for (__p += "\n      <tr>\n        ", j = 0; columns > j; j++) __p += "\n          ", 
grid_style = style[(i + j) % 2], __p += '\n          <td id="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" class="' + (null == (__t = grid_style) ? "" :__t) + '"></td>\n        ';
__p += "\n      </tr>\n    ";
}
__p += '\n  </table>\n  <div class="span8 block-center text-center" style="width: 480px">\n    ' + (null == (__t = model.actors[1].hacker_username) ? "" :__t) + "\n  </div>\n  </div>\n</div>\n";
}
return __p;
});