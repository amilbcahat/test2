HR.appController.addTemplate("backbone/templates/games/battleship-1p", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "<style>\n	.battleship-grid {\n		margin: 20px auto;\n		border: 4px solid #666;\n		background: #ededed;\n        width: " + (null == (__t = 26 * columns) ? "" :__t) + 'px;\n        margin: auto;\n	}\n	.battleship-row {\n		background-color: none;\n		border: none;\n        height: 26px;\n	}\n	.battleship-col {\n		height: 24px;\n		width: 24px;\n        border: 1px dotted black;\n        display: inline-block;\n		background-color: none;\n		font-size: 6px;\n		text-align: center;\n	}\n\n	.battleship-mine {\n      position: absolute;\n      left: 1px;\n      top: 2px;\n    }\n\n	.battleship-ship-init {\n      position: relative;\n      top: -1px;\n    }\n\n	.battleship-col-fire {\n		background: rgb(59, 107, 59);\n        opacity: 0.6;\n	}\n	.battleship-col-fire.battleship-col-hit {\n		background: rgb(231, 41, 41);\n        background-image-position: center;\n        background-repeat: none;\n        opacity: 0.95;\n        position: relative;\n	}\n\n    .battleship-vertical {\n      transform-origin: 0% 0%;\n      transform: rotate(90deg); \n      -webkit-transform: rotate(90deg); \n      -moz-transform: rotate(90deg); \n      -o-transform: rotate(90deg);\n      -ms-transform: rotate(90deg); \n      -webkit-transform-origin: 0% 0%;\n      -moz-transform-origin: 0% 0%;\n      -o-transform-origin: 0% 0%;\n      -ms-transform-origin: 0% 0%;\n      margin-left: 26px;\n    }\n</style>\n<div>\n    <div class="battleship-grid">', 
_.times(rows, function(row) {
__p += '<div class="battleship-row">', _.times(columns, function(column) {
__p += '<div class="battleship-col" data-row="' + (null == (__t = row) ? "" :__t) + '" data-column="' + (null == (__t = column) ? "" :__t) + '"></div>';
}), __p += "</div>";
}), __p += "</div>\n</div>\n";
return __p;
});