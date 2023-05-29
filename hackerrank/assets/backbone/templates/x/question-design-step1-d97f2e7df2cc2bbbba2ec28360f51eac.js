HR.appController.addTemplate("backbone/templates/x/question-design-step1", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <form name="design-question-step1-form">\n        <div class="mjA">\n            <div class="row no-margin">\n                <div class= "span-xs-16 span-md-10">\n                    <label>PROBLEM STATEMENT</label>\n                    <textarea class="editor_width texteditor" name="problem-description" id="problem-description" style="width: 100%">', 
model.question && (__p += "" + (null == (__t = model.question) ? "" :_.escape(__t))), 
__p += '</textarea>\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>PROBLEM NAME</label>\n                    <input type="text" name="name" id="problem-name" value="', 
model.name && (__p += "" + (null == (__t = model.name) ? "" :_.escape(__t))), __p += '">\n                </div>\n                <div class="span-xs-16 span-md-6">\n                    <label>SCORE</label>\n                    <input type="text" placeholder="Enter score" id="score" ', 
__p += model.score ? 'value="' + (null == (__t = model.score) ? "" :__t) + '" ' :' value="0"', 
__p += ' >\n                    <div class="clear"/>\n                    <small class="grey"><em>This score is only for reference. The score for a candidate has to be marked manually after reviewing the answer.</em></small>\n                </div>\n            </div>\n\n            <div class="row no-margin plT">\n                <div class="span-xs-16 span-md-16">\n                    <button type="submit" class="btn btn-primary btn-mid">Save & Proceed</button>\n                </div>\n            </div>\n        </div>\n    </form>\n\n</div><!-- end mjA -->\n';
return __p;
});