HR.appController.addTemplate("backbone/templates/x/test-advanced-candidate-options", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        CANDIDATE CUSTOMIZATION\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">Use this to enable disable candidate accessibility options. </p>\n    <div class="clear"></div>\n    <form name="candidate-options-form">\n        <div class="row mdT ">\n            <div class="span6">\n                <label class="pull-left psR">Question templates visible to candidate?</label>\n                <div class="switch pull-right">\n                    <input type="checkbox" name="hide_template" id="hide_template" ', 
model.hide_template && "True" == model.hide_template || (__p += "checked"), __p += ' />\n                </div>\n            </div>\n        </div>\n        <div class="row ">\n            <div class="span6">\n                <label class="pull-left psR">Candidate can use custom testcases to run code?</label>\n                <div class="switch pull-right">\n                    <input type="checkbox" name="hide_custom_testcase" id="hide_custome_testcase" ', 
model.hide_custom_testcase && "True" == model.hide_custom_testcase || (__p += "checked"), 
__p += ' />\n                </div>\n            </div>\n        </div>\n        <div class="row ">\n            <div class="span6">\n                <label class="pull-left psR">Candidate can run code before submitting?</label>\n                <div class="switch pull-right">\n                    <input type="checkbox" name="hide_compile_test" id="hide_compile_test" ', 
model.hide_compile_test && "True" == model.hide_compile_test || (__p += "checked"), 
__p += ' />\n                </div>\n            </div>\n        </div>\n        <div class="row msB">\n            <div class="span4 msT">\n                <button type="submit" data-throbber="show" ', 
__p += model.permission < 2 ? 'class="btn btn-primary js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary"', 
__p += ">Save</button>\n            </div>\n        </div>\n    </form>\n</div>\n";
return __p;
});