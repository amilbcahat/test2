HR.appController.addTemplate("backbone/templates/x/test-questions-shuffling", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        RANDOM QUESTION SHUFFLING\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">Use this to randomly shuffle the test questions for any candidate.</p>\n    <div class="clear"></div>\n    <form name="questions-shuffling-form">\n        <div class="inline-block mdT">\n            <div class="span5">\n                <label class="display-inline">Do you want to shuffle the questions?</label>\n                <div class="switch">\n                    <input type="checkbox" name="questions-shuffling" id="shuffle_questions" ', 
model.shuffle_questions && "True" == model.shuffle_questions && (__p += "checked"), 
__p += ' />\n                </div>\n            </div>\n            <div class="span4 mlT">\n                <button type="submit" data-throbber="show" class="btn btn-primary margin-large right mdL">Save</button>\n            </div>\n        </div>\n    </form>\n</div>\n';
return __p;
});