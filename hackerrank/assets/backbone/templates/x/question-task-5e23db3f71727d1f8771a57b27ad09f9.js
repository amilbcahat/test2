HR.appController.addTemplate("backbone/templates/x/question-task", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    ', test && (__p += ' <h3 class="topbar-h3 mjL">' + (null == (__t = test.name) ? "" :_.escape(__t)) + "</h3> "), 
__p += '\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Questions</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>', 
__p += edit ? "Edit" :"Create", __p += ' task</h3>\n</div><!-- end .top-fixed-bar -->\n<div class="overflow-content" id="control-overflow">\n    <form name="task-form">\n        <div class="mjA">\n            <div class="row no-margin">\n                <div class= "span-xs-16 span-md-10">\n                    <label>TASK DESCRIPTION</label>\n                    <textarea class="editor_width texteditor" name="problem-description" id="problem-description" style="width: 100%">', 
model.question && (__p += "" + (null == (__t = model.question) ? "" :_.escape(__t))), 
__p += '</textarea>\n                    <label class="mlT">TASK SCRIPT</label>\n                    <textarea rows="15" class="editor_width scripteditor" name="script" id="script" style="width: 100%">', 
model.task_script && (__p += "" + (null == (__t = model.task_script) ? "" :_.escape(__t))), 
__p += '</textarea>\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>TASK TITLE</label>\n                    <input type="text" name="name" id="problem-name" value="', 
model.name && (__p += "" + (null == (__t = model.name) ? "" :_.escape(__t))), __p += '">\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>DURATION (Minutes)</label>\n                    <input type="text" placeholder="In minutes" id="duration" ', 
__p += model.task_duration ? 'value="' + (null == (__t = model.task_duration) ? "" :__t) + '" ' :' value="30"', 
__p += ' >\n                    <div class="clear"/>\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>SCORE</label>\n                    <input type="text" placeholder="Enter score" id="score" ', 
__p += model.score ? 'value="' + (null == (__t = model.score) ? "" :__t) + '" ' :' value="0"', 
__p += ' >\n                    <div class="clear"/>\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>CONTEXT</label>\n                    <label><input type="radio" value="user" name="context" ', 
"root" != model.task_context && (__p += "checked"), __p += ' > User</label>\n                    <label><input type="radio" value="root" name="context" ', 
"root" == model.task_context && (__p += "checked"), __p += ' > Root</label>\n                    <div class="clear"/>\n                </div>\n            </div>\n            <div class="row no-margin plT">\n                <div class="span-xs-16 span-md-16">\n                    <button type="submit" class="btn btn-primary btn-mid">Save task</button>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n';
return __p;
});