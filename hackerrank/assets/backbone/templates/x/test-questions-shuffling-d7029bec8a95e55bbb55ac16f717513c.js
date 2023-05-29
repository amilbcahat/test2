HR.appController.addTemplate("backbone/templates/x/test-questions-shuffling", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        RANDOM QUESTION SHUFFLING\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">Use this to randomly shuffle the test questions for any candidate.</p>\n    <div class="clear"></div>\n    <form name="questions-shuffling-form">\n        <div class="clearfix msT">\n            <div class="mmT clearfix">\n                <label class="display-inline pull-left">Do you want to shuffle the questions?</label>\n                <div class="switch has-switch pull-left mdL">\n                    <input type="checkbox" name="questions-shuffling" id="shuffle_questions" ', 
model.shuffle_questions && "True" == model.shuffle_questions && (__p += "checked"), 
__p += ' />\n                </div>\n            </div>\n            <div class="">\n                <button type="submit" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-primary margin-large right js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right"', 
__p += ">Save</button>\n            </div>\n        </div>\n    </form>\n</div>\n";
return __p;
});