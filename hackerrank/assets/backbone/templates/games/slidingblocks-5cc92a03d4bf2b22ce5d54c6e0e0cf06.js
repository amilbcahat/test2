HR.appController.addTemplate("backbone/templates/games/slidingblocks", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<style>\n  .game-grid {\n    position: relative;\n    padding-left: 0px !important;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    border: 3px solid black;\n  }\n  .game-block {\n    position: absolute;\n    display: inline-block;\n    background-color: #ccc;\n    margin: 1px;\n    text-align: center;\n    vertical-align: center;\n    line-height: 50px; /* block_width */\n    width: 50px; /* block_width */\n    height: 50px; /* block_width */\n  }\n\n  [data-blockid="0"] {\n    visibility: hidden;\n  }\n</style>\n\n<div>\n    ';
var rows = 3;
__p += "\n    ";
var columns = 3;
__p += "\n    ";
var block_width = 50;
__p += '\n    <div class="game-grid block-center" style="width: ' + (null == (__t = columns * (2 + block_width)) ? "" :__t) + "px; height: " + (null == (__t = rows * (2 + block_width)) ? "" :__t) + 'px;">\n    </div>\n</div>\n';
}
return __p;
});