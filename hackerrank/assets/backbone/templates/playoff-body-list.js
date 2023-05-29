HR.appController.addTemplate("backbone/templates/playoff-body-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row playoff-round">\n    <div class="span6">\n        <p class="player"><img src="' + (null == (__t = model.hacker_avatar1) ? "" :__t) + '" class="circle" height="25" width="25"> <span class="name">' + (null == (__t = model.hacker_name1) ? "" :__t), 
1 == model.winner && (__p += '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>'), 
__p += '</span></p>\n        <p class="player"><img src="' + (null == (__t = model.hacker_avatar2) ? "" :__t) + '" class="circle" height="25" width="25"> <span class="name">' + (null == (__t = model.hacker_name2) ? "" :__t), 
2 == model.winner && (__p += '<span class="win"><img src="/assets/trophy.png" alt="winner"></span>'), 
__p += '</span></p>\n    </div>\n    <div  class="span2 button-wrap">\n        ', 
__p += -1 != model.hacker_id1 && -1 != model.hacker_id2 ? '\n        <a style="cursor: pointer;" class="btn btn-primary play-game">Play Game</a>\n        ' :'\n        <a style="cursor: pointer;" class="btn" disabled="disabled">Play Game</a>\n        ', 
__p += '\n    </div>\n    <p class="span6 round-winner"><strong>Winner:</strong>\n        ', 
1 == model.winner && (__p += "" + (null == (__t = model.hacker_name1) ? "" :__t) + " "), 
__p += "\n        ", 2 == model.winner && (__p += "" + (null == (__t = model.hacker_name2) ? "" :__t) + " "), 
__p += '\n    </p>\n</div>\n<div class="row output-area-wrapper span15"></div>\n';
return __p;
});