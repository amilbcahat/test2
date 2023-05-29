HR.appController.addTemplate("backbone/templates/x/question-coding-step1", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <form name="coding-question-step1-form">\n        <div class="formgroup span-xs-16 span-md-6">\n            <label>Problem name</label>\n            <input type="text" name="name" class="wide" value="', 
model.name && (__p += "" + (null == (__t = model.name) ? "" :_.escape(__t))), __p += '">\n        </div>\n        <div class="formgroup span-xs-16 span-md-10 js-tags"></div>\n\n        <div class="formgroup">\n            <label>Problem statement</label>\n            <p class="txt-alt-grey-dark span9 no-padding">Problem statement should be clear without any ambiguity. Make sure at least 2 or 3 testcases are added, so the candidates can understand the problem statement better.</p>\n            <div class="clear"></div>\n            <!-- add editor here -->\n            <div class="mdT">\n            <textarea class="editor_width texteditor" name="problem-description" id="problem-description" style="width: 100%">', 
model.question && (__p += "" + (null == (__t = model.question) ? "" :_.escape(__t))), 
__p += '</textarea>\n            </div>\n        </div>\n\n        <div class="row no-margin plT">\n            <div class="span-xs-16 span-md-16">\n                <button type="submit" class="btn btn-primary btn-mid">Save & Proceed</button>\n            </div>\n        </div>\n    </form>\n\n</div><!-- end mjA -->\n';
return __p;
});