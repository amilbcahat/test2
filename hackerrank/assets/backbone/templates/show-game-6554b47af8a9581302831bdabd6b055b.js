HR.appController.addTemplate("backbone/templates/show-game", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<header class="page-title mlT">\n    <h1 class="span16">\n      ' + (null == (__t = model.challenge_name) ? "" :__t) + ":\n      " + (null == (__t = model.actors[0].hacker_username) ? "" :__t) + " ";
for (var i = 1; i < model.actors.length; i++) __p += " vs " + (null == (__t = model.actors[i].hacker_username) ? "" :__t) + " ";
__p += '\n    </h1>\n</header>\n<div class="psA">\n  <div class="game-container-wrapper"></div>\n</div>\n';
}
return __p;
});