HR.appController.addTemplate("backbone/templates/games/ultimatettt", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n  .uttt-outer {\n    margin: 0 auto;\n  }\n    .uttt-inner {\n      height: 80px;\n      width: 240px;\n      background-color: #ddd;\n    }\n    .uttt-inner td {\n      height: 40px;\n      width: 40px;\n      background-color: white;\n      border: 2px solid #666;\n      padding: 20px;\n      font-size: 40px;\n      text-align: center;\n    }\n\n    .uttt-inner td[data-grid-row="0"][data-grid-column="0"] { border-left: none; border-top: none; }\n    .uttt-inner td[data-grid-row="1"][data-grid-column="0"] { border-left: none; }\n    .uttt-inner td[data-grid-row="2"][data-grid-column="0"] { border-left: none; border-bottom: none; }\n    .uttt-inner td[data-grid-row="0"][data-grid-column="1"] { border-top: none; }\n    .uttt-inner td[data-grid-row="1"][data-grid-column="1"] { border-left: none; }\n    .uttt-inner td[data-grid-row="2"][data-grid-column="1"] { border-bottom: none; }\n    .uttt-inner td[data-grid-row="0"][data-grid-column="2"] { border-right: none; border-top: none; }\n    .uttt-inner td[data-grid-row="1"][data-grid-column="2"] { border-right: none; }\n    .uttt-inner td[data-grid-row="2"][data-grid-column="2"] { border-right: none; border-bottom: none; }\n\n    .uttt-inner td.highlighted {\n      background: rgb(210, 252, 212);\n    }\n    td.uttt-won-0 { color: rgb(150,0,0); }\n    td.uttt-won-1 { color: rgb(0, 0, 150); }\n    table[data-won="0"] td { border-color: rgb(150,0,0); }\n    table[data-won="1"] td { border-color: rgb(0,0,150); }\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n        ';
var rows = 3;
__p += "\n        ";
var columns = 3;
__p += "\n        ";
var o_rows = 3;
__p += "\n        ";
var o_columns = 3;
for (__p += '\n        <table class="uttt-outer" cellpadding="10">\n        ', o_i = 0; o_rows > o_i; o_i++) {
for (__p += '\n          <tr class="uttt-outer">\n          ', o_j = 0; o_columns > o_j; o_j++) {
for (__p += '\n          <td class="uttt-outer" data-grid-row="' + (null == (__t = o_i) ? "" :__t) + '" data-grid-column="' + (null == (__t = o_j) ? "" :__t) + '">\n          <table class="uttt-inner" data-grid-row="' + (null == (__t = o_i) ? "" :__t) + '" data-grid-column="' + (null == (__t = o_j) ? "" :__t) + '">\n                ', 
i = 0; rows > i; i++) {
for (__p += '\n                <tr class="uttt-inner">\n                    ', j = 0; columns > j; j++) __p += '\n                       <td data-grid-row="' + (null == (__t = i) ? "" :__t) + '" data-grid-column="' + (null == (__t = j) ? "" :__t) + '">&nbsp;</td>\n                    ';
__p += "\n                </tr>\n                ";
}
__p += "\n            </table>\n            </td>\n          ";
}
__p += "\n          </tr>\n        ";
}
__p += "\n        </table>\n    </div>\n</div>\n";
}
return __p;
});