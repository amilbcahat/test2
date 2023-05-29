HR.appController.addTemplate("backbone/templates/games/domineering", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style type="text/css" media="screen">\n    \n</style>\n<div class="domineering-grid">\n    <p class="game-message m" style="font-weight: bold;">&nbsp;</p>\n    ';
var width = 8;
__p += "\n    ";
var height = 8;
__p += "\n    ";
var table_width = 40 * width;
for (__p += '\n    <table style="margin: 20px auto; border: 2px solid #666;">\n        ', 
i = 0; width > i; i++) {
for (__p += '\n           <tr style="height: 40px; width: ' + (null == (__t = table_width) ? "" :__t) + 'px; background-color: #ddd; border: 2px solid #666;">\n               ', 
j = 0; height > j; j++) __p += '\n                  <td class="' + (null == (__t = i) ? "" :__t) + "-" + (null == (__t = j) ? "" :__t) + '" style="height: 40px; width: 40px; background-color: #eee; border: 2px solid #666; text-align: center;">&nbsp;&nbsp;</td>\n               ';
__p += "\n           </tr>\n        ";
}
__p += "\n    </table>\n</div>\n";
}
return __p;
});