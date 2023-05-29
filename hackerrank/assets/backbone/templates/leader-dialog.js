HR.appController.addTemplate("backbone/templates/leader-dialog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row">\n  <div class="pull-left">\n    <div class="span2">\n      <strong>Rank</strong>\n    </div>\n    <div class="span2">\n      ' + (null == (__t = leader.rank) ? "" :__t) + '\n    </div>\n  </div>\n  <div class="pull-right">\n    <div class="span1">\n      <strong>Score</strong>\n    </div>\n    <div class="span2">\n      ' + (null == (__t = parseFloat(leader.score).toFixed(2)) ? "" :__t) + '\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="pull-left">\n    <div class="span2">\n      <strong>Languages</strong>\n    </div>\n    <div class="span4">\n      ' + (null == (__t = languages) ? "" :__t) + "\n    </div>\n  </div>\n</div>\n", 
leader.challenges && (__p += '\n<hr/>\n<div class="row">\n  <div class="span3">\n    <h5>Challenges</h5>\n  </div>\n</div>\n<hr/>\n', 
_.each(leader.challenges, function(data) {
__p += '\n<div class="row">\n  <div class="span3">\n    <strong>' + (null == (__t = data.name) ? "" :__t) + '</strong>\n  </div>\n  <div class="span2">\n    ' + (null == (__t = data.score) ? "" :__t) + '\n  </div>\n  <div class="span2">\n    ' + (null == (__t = moment(1e3 * data.timestamp).fromNow()) ? "" :__t) + "\n  </div>\n</div>\n";
}), __p += "\n"), __p += "\n";
return __p;
});