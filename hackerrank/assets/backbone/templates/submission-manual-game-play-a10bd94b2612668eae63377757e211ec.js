HR.appController.addTemplate("backbone/templates/submission-manual-game-play", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", "game" == _model.kind && 0 != _model.status_code && null != _model.code && _model.player_count > 1 && (__p += '\n<div style="padding-bottom: 0px" class="clearfix">\n    <div class="pull-left"\n        <input type="hidden" id="moreplayers" style="width: 280px;"/>\n        <span class="help-prompt pull-left margin-small left"><i class="icon-info-circled"></i><span class="help-text">Search for another player and challenge their bot. The results of your battle will count for your score.</span></span>\n    </div>\n    <img class="spinner hide pull-left" src="/assets/spinner.gif" style="margin-top: 5px; margin-left: 10px;"/>\n</div>\n'), 
__p += "\n";
return __p;
});