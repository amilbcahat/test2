HR.appController.addTemplate("backbone/templates/tronv2", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<style>\n    .game-grid p {\n        margin: 0px;\n    }\n    h3 {\n        margin: 0px;\n    }\n    .m {\n        text-align: center !important;\n    }\n    .translucent {\n    }\n    .playgame-row {\n        position: fixed;\n    }\n    .playgame-row .btn {\n        margin-top: 70px;\n        z-index: 999;\n    }\n    .game-message {\n        font-weight: bold;\n    }\n</style>\n<div class="game-grid" style="display: block; margin: auto; border-radius: 10px;">\n    <div class="row">\n      <div class="span8 block-center text-center" style="width: 480px">\n        <div class="span4">\n          <p>Red</p>\n        </div>\n        <div class="span4">\n          <p>Green</p>\n        </div>\n      </div>\n    </div>\n\n    <table style="margin: 20px auto;">\n        <tr style="text-align: center">\n            <td style="text-align: center" class="canvasPlaceholder">\n                <canvas id="tronV2Canvas" width="260" height="260" style="border: 10px solid">\n                </canvas>\n            </td>\n        </tr>\n    </table>\n</div>\n';
return __p;
});