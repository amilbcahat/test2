HR.appController.addTemplate("backbone/templates/games/pacman", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += "<style>\n\n.pac-grid {\n	background: #aaa;\n	width: 560px;\n	height: 544px;\n	display: block;\n	margin: auto;\n       	border-radius: 10px;\n}\n\n.pac-row {\n	width: 560px;\n	height: 20px;\n}\n\n.pac-solid-cell {\n	display: inline-block;\n	background: #333;\n	width: 20px;\n	height: 20px;\n}\n\n.pac-empty-cell {\n	display: inline-block;\n	background: none;\n	width: 20px;\n	height: 20px;\n}\n\n.pac-dude {\n	height: 16px;\n	width: 16px;\n	margin: 2px;\n}\n#pac-man { background: url('static/games/pacman.png'); }\n#pac-ghost-1 { background: url('static/games/pacghost1.png'); }\n#pac-ghost-2 { background: url('static/games/pacghost2.png'); }\n#pac-ghost-3 { background: url('static/games/pacghost3.png'); }\n#pac-ghost-4 { background: url('static/games/pacghost4.png'); }\n\n.pacfood { background: url('static/games/pacfood.png') no-repeat center; }\n.pacfoodbig { background: url('static/games/pacfoodbig.png') no-repeat center; }\n</style>\n\n<div>\n	<div class=\"pac-grid\">\n		";
var pac_grid = "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%. . . . . . %%. . . . . . %%.%%%%.%%%%%.%%.%%%%%.%%%%.%%o%%%%.%%%%%.%%.%%%%%.%%%%o%%.%%%%.%%%%%.%%.%%%%%.%%%%.%%. . . . . . . . . . . . . %%.%%%%.%%.%%%%%%%%.%%.%%%%.%%.%%%%.%%.%%%%%%%%.%%.%%%%.%%. . . %%. . %%. . %%. . . %%%%%%%.%%%%% %% %%%%%.%%%%%%%%%%%%.%%%%% %% %%%%%.%%%%%%%%%%%%.%            %.%%%%%%%%%%%%.% %%%%  %%%% %.%%%%%%%     .  %        %  .     %%%%%%%.% %%%%%%%%%% %.%%%%%%%%%%%%.%            %.%%%%%%%%%%%%.% %%%%%%%%%% %.%%%%%%%. . . . . . %%. . . . . . %%.%%%%.%%%%%.%%.%%%%%.%%%%.%%.%%%%.%%%%%.%%.%%%%%.%%%%.%%o. %%. . . .  . . . .%%. o%%%%.%%.%%.%%%%%%%%.%%.%%.%%%%%%.%%.%%.%%%%%%%%.%%.%%.%%%%. . . %%. . %%. . %%. . . %%.%%%%%%%%%%.%%.%%%%%%%%%%.%%. . . . . . . . . . . . . %%%%%%%%%%%%%%%%%%%%%%%%%%%%%";
__p += "\n\n		";
var rowse = 27;
__p += "\n		";
var columns = 28;
for (__p += "\n		", i = 0; rowse > i; i++) {
for (__p += '\n		<div class="pac-row">', j = 0; columns > j; j++) __p += "", __p += "%" === pac_grid[28 * i + j] ? '<div class="pac-cell pac-solid-cell" data-x="' + (null == (__t = i) ? "" :__t) + '" data-y="' + (null == (__t = j) ? "" :__t) + '"></div>' :'<div class="pac-cell pac-empty-cell" data-x="' + (null == (__t = i) ? "" :__t) + '" data-y="' + (null == (__t = j) ? "" :__t) + '"></div>', 
__p += "";
__p += "</div>\n		";
}
__p += '\n\n		<div id="pac-man" class="pac-dude"></div>\n		<div id="pac-ghost-1" class="pac-dude"></div>\n		<div id="pac-ghost-2" class="pac-dude"></div>\n		<div id="pac-ghost-3" class="pac-dude"></div>\n		<div id="pac-ghost-4" class="pac-dude"></div>\n	</div>\n</div>\n';
}
return __p;
});