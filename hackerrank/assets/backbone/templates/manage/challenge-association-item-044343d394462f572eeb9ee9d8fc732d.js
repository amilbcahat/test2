HR.appController.addTemplate("backbone/templates/manage/challenge-association-item", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row row-clear">\n    <div class="span3">' + (null == (__t = model.challenge_name) ? "" :__t) + '</div>\n    <div class="span2"><input class="ca-attr ca-weight span2" type="text" value="' + (null == (__t = model.weight) ? "" :__t) + '" /></div>\n    <div class="span2 margin-large right"><input class="ca-attr ca-priority span2" type="text" value="' + (null == (__t = model.priority) ? "" :__t) + '" /></div>\n    <div class="span1"><input class="ca-attr ca-binary_scoring" type="checkbox" ', 
model.binary_scoring === !0 && (__p += " checked "), __p += ' /></div>\n    <div class="span2"><input class="ca-attr ca-dynamic" type="checkbox" ', 
model.dynamic === !0 && (__p += " checked "), __p += ' /></div>\n    <div class="span2 margin-large right">\n        <input class="ca-attr ca-timebound" type="checkbox" ', 
timebound && (__p += " checked "), __p += " />\n        ", timebound && (__p += "\n        <input class=\"ca-attr ca-start_time margin-small top\" type='text' placeholder='Start time' value=\"" + (null == (__t = starttime) ? "" :__t) + "\" />\n        <input class=\"ca-attr ca-end_time margin-small top\" type='text' placeholder='End time' value=\"" + (null == (__t = endtime) ? "" :__t) + '"/>\n        '), 
__p += '\n    </div>\n    <div class="span2">\n        <button class="btn btn-small delete cursor">delete</button>\n        <small class="msg"></small>\n    </div>\n</div>\n';
return __p;
});