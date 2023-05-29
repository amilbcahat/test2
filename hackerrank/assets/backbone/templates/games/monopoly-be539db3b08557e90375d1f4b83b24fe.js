HR.appController.addTemplate("backbone/templates/games/monopoly", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
for (__p += '<style>\n    .player-cash {\n      margin: auto;\n      width: 90px;\n    }\n\n    .a-monopoly-board {\n	    width: 805px;\n	    height: 842px;\n	    margin: auto;\n	    position: relative;\n	    background-color: rgb(249, 249, 249);\n	    background-image: -webkit-linear-gradient(center top , whitesmoke, rgb(249, 249, 249))\n	    background-image: -moz-linear-gradient(center top , whitesmoke, rgb(249, 249, 249))\n	    background-image: -ms-linear-gradient(center top , whitesmoke, rgb(249, 249, 249))\n	    background-image: -o-linear-gradient(center top , whitesmoke, rgb(249, 249, 249))\n	    background-image: linear-gradient(center top , whitesmoke, rgb(249, 249, 249))\n    }\n\n    .a-monopoly-cell {\n	    position: relative;\n	    width: 72px;\n	    height: 75px;\n	    background: none;\n	    border: 1px solid rgb(128, 128, 128);\n    }\n\n    .a-monopoly-cell-corner {\n      display: inline-block;\n      margin-left: -1px;\n      width: 72px;\n      height: 75px;\n      border: 1px solid rgb(128, 128, 128);\n      position: relative;\n    }\n    .a-monopoly-top-strip {\n	    position: absolute;\n	    top: 0px;\n	    left: 0px;\n	    width: 805px;\n	    height: 77px;\n    }\n    .a-monopoly-top-strip .a-monopoly-cell {\n	    margin-left: -1px;\n	    display: inline-block;\n    }\n\n    .a-monopoly-bottom-strip {\n	    position: absolute;\n	    top: 760px;\n	    left: 0px;\n	    width: 805px;\n	    height: 77px;\n    }\n    .a-monopoly-bottom-strip .a-monopoly-cell {\n	    position: relative;\n	    margin-left: -1px;\n	    display: inline-block;\n    }\n\n    .a-monopoly-left-strip {\n	    position: absolute;\n	    top: 77px;\n	    left: 0px;\n	    height: 685px;\n	    width: 76px;\n	    display: inline-block;\n    }\n    .a-monopoly-left-strip .a-monopoly-cell {\n	    position: relative;\n	    margin-top: -1px;\n	    display: block;\n    }\n\n    .a-monopoly-right-strip {\n	    position: absolute;\n	    top: 77px;\n	    left: 730px;\n	    height: 685px;\n	    width: 76px;\n    }\n    .a-monopoly-right-strip .a-monopoly-cell {\n	    position: relative;\n	    margin-top: -1px;\n	    display: block;\n    }\n\n    .a-monopoly-player {\n	    position: absolute;\n	    z-index: 3000;\n	    left: 0px;\n	    top: 0px;\n    }\n\n    .a-house-1 {\n	    display: none;\n	    position: absolute;\n	    z-index: 1000;\n	    left: 4px;\n	    top: 4px;\n	    width: 16px;\n	    height: 16px;\n	    padding: 0px;\n	    background: url("assets/games/house.png");\n    }\n\n    .a-house-2 {\n	    display: none;\n	    position: absolute;\n	    z-index: 1000;\n	    left: 24px;\n	    top: 4px;\n	    width: 16px;\n	    height: 16px;\n	    padding: 0px;\n	    background: url("assets/games/house.png");\n    }\n\n    .a-house-3 {\n	    display: none;\n	    position: absolute;\n	    z-index: 1000;\n	    left: 4px;\n	    top: 24px;\n	    width: 16px;\n	    height: 16px;\n	    padding: 0px;\n	    background: url("assets/games/house.png");\n    }\n\n    .a-house-4 {\n	    display: none;\n	    position: absolute;\n	    z-index: 1000;\n	    left: 24px;\n	    top: 24px;\n	    width: 16px;\n	    height: 16px;\n	    padding: 0px;\n	    background: url("assets/games/house.png");\n    }\n\n    .a-sale {\n	    display: none;\n	    background: url("assets/games/sale.png");\n	    position: absolute;\n	    z-index: 1000;\n	    top: 50px;\n	    left: 4px;\n	    width: 16px;\n	    height: 16px;\n    }\n\n    .a-mortgaged {\n	    display: none;\n	    background: url("assets/games/mortgaged.png");\n	    position: absolute;\n	    z-index: 1000;\n	    top: 50px;\n	    left: 24px;\n	    width: 16px;\n	    height: 16px;\n    }\n\n    .a-owner {\n	    display: none;\n	    background: black;\n	    position: absolute;\n	    font-weight: 1000;\n	    color: white;\n	    z-index: 1000;\n	    right: 0px;\n	    top: 0px;\n	    width: 15px;\n	    height: 19px;\n    }\n\n    .a-monopoly-color-div {\n	    position: absolute;\n	    z-index: 900;\n	    top: 0px;\n	    right: 0px;\n	    bottom: 0px;\n	    width: 15px;\n	    background-color: none;\n    }\n    .a-monopoly-cash-counters {\n	    margin: auto;\n	    position: absolute;\n	    top: 400px;\n	    left: 352px;\n    }\n</style>\n\n<div>\n	<div class="a-monopoly-board">\n		<div class="a-monopoly-top-strip">\n			<div data-cell="20" class="a-monopoly-cell-corner">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n				</div>', 
cell_id = 21; 29 >= cell_id; cell_id++) __p += '<div data-cell="' + (null == (__t = cell_id) ? "" :__t) + '" class="a-monopoly-cell">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n				</div>';
for (__p += '<div data-cell="30" class="a-monopoly-cell-corner">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n			</div>\n		</div>\n		<div class="a-monopoly-left-strip">', 
cell_id = 19; cell_id >= 11; cell_id--) __p += '<div data-cell="' + (null == (__t = cell_id) ? "" :__t) + '" class="a-monopoly-cell">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n		</div>';
for (__p += '</div>\n		<div class="a-monopoly-right-strip">', cell_id = 31; 39 >= cell_id; cell_id++) __p += '<div data-cell="' + (null == (__t = cell_id) ? "" :__t) + '" class="a-monopoly-cell">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n			</div>';
for (__p += '\n		</div>\n		<div class="a-monopoly-bottom-strip">\n			<div data-cell="10" class="a-monopoly-cell-corner">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n				</div>', 
cell_id = 9; cell_id >= 1; cell_id--) __p += '<div data-cell="' + (null == (__t = cell_id) ? "" :__t) + '" class="a-monopoly-cell">\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n				</div>';
__p += '<div data-cell="0" class="a-monopoly-cell-corner">\n				<div data-player="0" data-posn="0" class="a-monopoly-player" id="monopoly-player-1"><img src="assets/games/red-player.png" \\></div>\n				<div data-player="1" data-posn="0" class="a-monopoly-player" id="monopoly-player-2"><img src="assets/games/black-player.png" \\></div>\n				<div class="a-house a-house-1"></div><div class="a-house a-house-2"></div>\n				<div class="a-house a-house-3"></div><div class="a-house a-house-4"></div>\n				<div class="a-sale"></div><div class="a-mortgaged"></div>\n				<div class="a-owner"></div><div class="a-monopoly-color-div"></div>\n			</div>\n		</div>\n		<div class="a-monopoly-cash-counters">\n			<div id="player0-cash" class="player-cash label label-important"></div>\n			<div id="player1-cash" class="player-cash label label-inverse"></div>\n			<table style="margin-top: 120px;">\n				<tr><td><img src="assets/games/house.png" \\></td><td>House</td></tr>\n				<tr><td><img src="assets/games/sale.png" \\></td><td>For Sale</td></tr>\n				<tr><td><img src="assets/games/mortgaged.png" \\></td><td>Mortgaged</td></tr>\n				<tr><td><div style="position: relative;"><div class="a-owner" style="display: block;">1</div></div></td><td>Ownership</td></tr>\n			</table>\n		</div>\n	</div>\n</div>\n';
}
return __p;
});