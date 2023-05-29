HR.appController.addTemplate("backbone/templates/games/oracle", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<style>\n    .ball-container\n    {\n        width:60px;\n        height:60px;\n        margin:10px 50px;\n        background-size: 60px 60px !important;\n        display: inline-block;\n    }\n    .ball1\n    {\n        background: url(assets/games/ball_black.png);\n    }\n    .ball2\n    {\n        background: url(assets/games/ball_red.png);\n    }\n    .ball3\n    {\n        background: url(assets/games/ball_blue.png);\n    }\n    .ball4\n    {\n        background: url(assets/games/ball_green.png);\n    }\n    .ball5\n    {\n        background: url(assets/games/ball_brown.png);\n    }\n    .oracle-computer\n    {\n        background: url(assets/games/oracle.png);\n        background-size: 150px 180px;\n        width:150px;\n        height:180px;\n        position: relative;\n    }\n    .oracle-text\n    {\n        position: absolute;\n        top:10px;\n        right:10px;\n        width:82px;\n        height:50px;\n    }\n</style>\n<div>\n    <div class="game-grid" style="display: block; margin: 20px auto; border-radius: 10px;">\n        <div class="span6 block-center row">\n            <div class="span3 text-center" style="margin-top:20px">\n                <div class="ball-container first">\n\n                </div>\n                <div class="ball-container second">\n\n                </div>\n            </div>\n            <div class="span3">\n                <div class="oracle-computer">\n                    <div class="oracle-text text-center">\n                        <h2>Yes</h2>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="span6 block-center row text-center">\n            <div class="oracle-lied hide">\n                <h3>Oracle Lied</h3>\n            </div>\n        </div>\n    </div>\n</div>\n';
return __p;
});